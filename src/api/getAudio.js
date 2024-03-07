const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const getAudioUrls = async ({ id }) => {
  const res = await fetch(`${baseUrl}/song/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
