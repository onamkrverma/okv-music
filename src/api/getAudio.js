const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const secondaryServer = import.meta.env.VITE_SERVER_DOWNLOAD_BASE_URL;

const FETCH_TIMEOUT_MS = 8000;

// Resolved directly from the browser: a real browser passes each mirror's
// Cloudflare/bot checks on its own, which a server-side proxy cannot.
const SOURCES = [
  { name: "piped-ducks", type: "piped", base: "https://pipedapi.ducks.party/streams" },
  { name: "piped-coffee", type: "piped", base: "https://api.piped.private.coffee/streams" },
  { name: "invidious-schenkel", type: "invidious", base: "https://invidious.schenkel.eti.br/api/v1/videos" },
  { name: "invidious-omada", type: "invidious", base: "https://yt.omada.cafe/api/v1/videos" },
];

const fetchWithTimeout = (url, options = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timer)
  );
};

const extractAudioData = (info, type) => {
  let audios = [];
  if (type === "invidious") {
    audios = info.adaptiveFormats?.filter((f) => f.type?.startsWith("audio/")) || [];
  } else if (type === "piped") {
    audios =
      info.audioStreams?.filter((f) => f.mimeType?.startsWith("audio/")) || [];
  }

  // Prefer webm/opus (smaller, widely supported), then highest bitrate
  audios.sort((a, b) => {
    const aType = a.mimeType || a.type || "";
    const bType = b.mimeType || b.type || "";
    const aIsWebm = aType.includes("webm") ? 1 : 0;
    const bIsWebm = bType.includes("webm") ? 1 : 0;
    if (aIsWebm !== bIsWebm) return bIsWebm - aIsWebm;
    return (b.bitrate || 0) - (a.bitrate || 0);
  });

  return audios.map((item) => item.url);
};

const trySource = async (name, type, url) => {
  const res = await fetchWithTimeout(url, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${name} status ${res.status}`);

  const info = await res.json();
  const urls = extractAudioData(info, type);
  if (urls.length === 0) throw new Error(`${name} returned no usable audio streams`);
  return urls;
};

// Try each public mirror directly from the browser, falling back to the
// backend's own resolver (which tries the same mirrors server-side) as a
// last resort in case a mirror ever blocks browser-origin CORS requests.
const resolveFromMirrors = async (id) => {
  for (const { name, type, base } of SOURCES) {
    // Invidious's raw adaptiveFormats URLs point straight at googlevideo.com,
    // IP-locked to the mirror server that fetched them rather than the
    // browser that will play them, so playback fails despite a successful
    // metadata fetch. local=true makes Invidious proxy the stream through
    // its own domain instead, avoiding the IP mismatch.
    const url = type === "invidious" ? `${base}/${id}?local=true` : `${base}/${id}`;
    try {
      const urls = await trySource(name, type, url);
      return { audioFormatHigh: urls[0], audioFormatLow: urls[1] ?? urls[0] };
    } catch (error) {
      console.warn(`${name} failed: ${error.message}`);
    }
  }
  return null;
};

const resolveFromBackend = async (id) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${baseUrl}/song/${id}`, {
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error("Primary backend response not OK");
    return await res.json();
  } catch (error) {
    console.warn("Primary backend failed:", error.message ?? error);
    const res = await fetch(`${secondaryServer}/song/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Secondary backend response not OK");
    return await res.json();
  }
};

// Dedupe concurrent calls for the same id (e.g. React StrictMode's double
// effect invocation) into a single network round-trip against these
// already rate-limited public mirrors.
const inFlight = new Map();

export const getAudioUrls = async ({ id }) => {
  if (inFlight.has(id)) return inFlight.get(id);

  const promise = (async () => {
    const mirrorResult = await resolveFromMirrors(id);
    if (mirrorResult) return mirrorResult;
    return resolveFromBackend(id);
  })();

  inFlight.set(id, promise);
  try {
    return await promise;
  } finally {
    inFlight.delete(id);
  }
};
