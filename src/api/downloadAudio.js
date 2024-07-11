const baseUrl = import.meta.env.VITE_SERVER_DOWNLOAD_BASE_URL;

export const getDownloadAudio = ({ id }) => {
  const a = document.createElement("a");
  a.href = `${baseUrl}/download/${id}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
