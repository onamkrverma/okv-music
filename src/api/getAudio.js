const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
const secondaryServer = import.meta.env.VITE_SERVER_DOWNLOAD_BASE_URL;

export const getAudioUrls = async ({ id }) => {
  let response = {};
  const primaryServerRes = await fetch(`${baseUrl}/song/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  response = primaryServerRes;

  if (!primaryServerRes.ok) {
    const secondaryServerRes = await fetch(`${secondaryServer}/song/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = secondaryServerRes;
  }
  return response;
};
