import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { latestPlaylists } from "../../utils/latestPlaylists";
const Footer = () => {
  const footerLinkList = [
    {
      title: "Latest",
      links: latestPlaylists,
      type: "playlists",
    },
    {
      title: "Browse",
      type: "songs",
      links: [
        {
          title: "Trending Songs",
          link: "/trending-songs/OLAK5uy_lSTp1DIuzZBUyee3kDsXwPgP25WdfwB40",
        },
        {
          title: "Bollywood Romance",
          link: "bollywood-love-aaj-kal/RDCLAK5uy_kvB-Tek1AZcCVmlbyA8iDfBgD4hPxgec8",
        },

        {
          title: "India Trends",
          link: "/trending?loc=india",
        },
        {
          title: "Global Trends ",
          link: "/trending?loc=global",
        },
      ],
    },
    {
      title: "About",
      type: "pages",
      links: [
        {
          title: "About App",
          link: "/about",
        },
        {
          title: "Feedback",
          link: "/feedback",
        },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="container footer-container">
      <nav className="footer-content-wrapper">
        {footerLinkList.map((item, index) => (
          <div key={index} className="footer-content">
            <h6>{item.title}</h6>
            {item.links.map((linkItem, index) => (
              <Link
                key={index}
                to={
                  item.type === "playlists"
                    ? `/${linkItem.title?.replaceAll(" ", "-").toLowerCase()}/${
                        linkItem.id
                      }`
                    : linkItem.link
                }
              >
                {linkItem.title}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="footer-copyright">
        <small>© 2023-{currentYear} Okv-Music All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
