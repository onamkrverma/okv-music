const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const secondaryServer = import.meta.env.VITE_SERVER_DOWNLOAD_BASE_URL;

export const getAudioUrls = async ({ id }) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

  try {
    const primaryServerRes = await fetch(`${baseUrl}/song/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!primaryServerRes.ok) {
      throw new Error("Primary server response not OK");
    }

    return primaryServerRes;
  } catch (error) {
    error.name === "AbortError"
      ? console.error("Primary server failed:", error.message)
      : console.error("Primary server failed:", error);

    const secondaryServerRes = await fetch(`${secondaryServer}/song/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return secondaryServerRes;
  }
};
