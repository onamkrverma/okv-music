const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

export const getLocalPlaylistinfo = async () => {
  const res = await fetch(`${baseUrl}/localplaylistinfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
