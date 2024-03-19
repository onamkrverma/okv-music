import React, { useEffect } from "react";
import "./About.css";
import { FaGithub } from "react-icons/fa";

const About = () => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.title = "About • Okv Music";
  }, []);

  return (
    <section className="container about-container">
      <div className="about-wrapper">
        <div className="about-header-wrapper">
          <img src="/logo.png" alt="okv-music" />
        </div>
        <div className="about-content-wrapper">
          <p>Okv Music is an open-source project and can be found on GitHub</p>
          <a
            href="https://github.com/onamkrverma/okv-music"
            target="_blank"
            rel="noreferrer"
            className="absolute-center"
          >
            <FaGithub size={25} />
            /okv-music
          </a>
          <p>
            If you appreciate my work, kindly consider giving the repository a
            star ⭐ on GitHub. Your support is greatly valued! ❤️
          </p>
        </div>

        <div className="about-footer">
          <small>
            Copyright © 2023-{currentYear} Okv-Music. All Rights Reserved.
          </small>
          <small>
            Made with ❤️ by{" "}
            <a href="https://onam.vercel.app" target="_blank" rel="noreferrer">
              onamkrverma
            </a>
          </small>
        </div>
      </div>
    </section>
  );
};

export default About;
