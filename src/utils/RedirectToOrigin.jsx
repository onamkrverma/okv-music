import { useEffect } from "react";

const RedirectToOrigin = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const origin = "https://okv-music.netlify.app";

    if (window.location.origin === origin) return;

    const metaTag = document.createElement("meta");
    metaTag.httpEquiv = "refresh";
    metaTag.content = "0;url=https://okv-music.netlify.app/";
    document.head.appendChild(metaTag);

    const scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.innerHTML =
      'window.location.href = "https://okv-music.netlify.app/"';
    document.head.appendChild(scriptTag);

    return () => {
      document.head.removeChild(metaTag);
      document.head.removeChild(scriptTag);
    };
  }, []);

  return null;
};

export default RedirectToOrigin;
