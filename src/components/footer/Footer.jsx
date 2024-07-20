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
          title: "Bollywood Hits",
          link: "/bollywood-hits/RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g",
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
        <small>
          © {new Date().getFullYear()} Okv-Music All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
