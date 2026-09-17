const backendBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const FETCH_TIMEOUT_MS = 8000;

// Same mirror set used for audio resolution: tried directly from the
// browser so each mirror's Cloudflare/bot checks are passed naturally.
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

const formatDuration = (totalSeconds) => {
  if (totalSeconds == null || Number.isNaN(totalSeconds)) return null;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  const mm = h ? String(m).padStart(2, "0") : String(m);
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const videoIdFromPipedUrl = (url) => {
  try {
    return new URLSearchParams(url.split("?")[1]).get("v");
  } catch {
    return null;
  }
};

const extractRelated = (info, type) => {
  if (type === "invidious") {
    return (info.recommendedVideos || [])
      .filter((v) => v.videoId)
      .map((v) => ({
        title: v.title,
        videoId: v.videoId,
        length: formatDuration(v.lengthSeconds),
        artistInfo: { artist: [{ name: v.author, browseId: v.authorId }] },
        thumbnails:
          v.videoThumbnails?.[v.videoThumbnails.length - 1]?.url ??
          v.videoThumbnails?.[0]?.url ??
          "",
      }));
  }

  if (type === "piped") {
    return (info.relatedStreams || [])
      .map((v) => ({
        title: v.title,
        videoId: videoIdFromPipedUrl(v.url || ""),
        length: formatDuration(v.duration),
        artistInfo: { artist: [{ name: v.uploaderName, browseId: v.uploaderUrl }] },
        thumbnails: v.thumbnail || "",
      }))
      .filter((v) => v.videoId);
  }

  return [];
};

const tryMirror = async (name, type, url) => {
  const res = await fetchWithTimeout(url, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${name} status ${res.status}`);

  const info = await res.json();
  const list = extractRelated(info, type);
  if (list.length === 0) throw new Error(`${name} returned no related videos`);
  return list;
};

const resolveFromMirrors = async (id) => {
  for (const { name, type, base } of SOURCES) {
    try {
      return await tryMirror(name, type, `${base}/${id}`);
    } catch (error) {
      console.warn(`${name} failed for related songs: ${error.message}`);
    }
  }
  return null;
};

const resolveFromBackend = async (id) => {
  const res = await fetchWithTimeout(`${backendBaseUrl}/related/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Backend related-songs response not OK");
  const data = await res.json();
  return data.result;
};

// Dedupe concurrent calls for the same id (e.g. React StrictMode's double
// effect invocation) into a single network round-trip against these
// already rate-limited public mirrors.
const inFlight = new Map();

export const getRelatedSongs = async (id) => {
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
