import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { latestPlaylists } from "../../utils/latestPlaylists";
const Footer = () => {
  const footerLinkList = [
    {
      title: "Latest",
      links: latestPlaylists,
    },
  ];

  return (
    <footer className="container footer-container">
      <nav className="footer-content-wrapper">
        {footerLinkList.map((item, index) => (
          <div key={index} className="footer-content">
            <h6>{item.title}</h6>
            {item.links.map((linkItem, index) => (
              <Link
                key={index}
                to={`/playlistsongs/${linkItem.title
                  ?.replaceAll(" ", "-")
                  .toLowerCase()}/${linkItem.id}`}
              >
                {linkItem.title}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
