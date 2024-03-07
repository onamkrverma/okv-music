const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const postFeedback = async ({ name, email, subject, message }) => {
  const response = await fetch(`${baseUrl}/feedback`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    }),
  });
  return response;
};
