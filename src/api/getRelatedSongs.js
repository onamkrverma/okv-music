const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const getRelatedSongs = async ({ id }) => {
  const res = await fetch(`${baseUrl}/related/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
