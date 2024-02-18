import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { RxCross2 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { HiHome, HiMagnifyingGlass, HiBars3BottomRight } from "react-icons/hi2";

const Header = () => {
  const [isSearchClick, setIsSearchClick] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target[0].value;
    navigate(`/search/${searchQuery}`);
  };

  const handleRefesh = () => {
    setIsRotate(!isRotate);
    localStorage.removeItem("homepageData");
  };

  const navLinks = [
    { title: "Home", link: "/", icon: <HiHome size="100%" /> },
    {
      title: "Search",
      link: "/search",
      icon: <HiMagnifyingGlass size="100%" />,
    },
    { title: "More", link: "/more", icon: <HiBars3BottomRight size="100%" /> },
  ];

  const currentPath = window.location.pathname;

  return (
    <div className="header-nav-container">
      <header className="header-section">
        <div className="header-container container">
          <Link to="/" className="header-logo-wrapper">
            <img className="header-logo" src={logo} alt="logo" />
          </Link>

          <div
            className={`header-logo-wrapper refress-data-wrapper cur-pointer ${
              isRotate && "rotate-logo"
            }`}
            onClick={handleRefesh}
          >
            <img className="header-logo" src={logo} alt="logo" />
          </div>

          <div
            className="search-icon-wrapper mobile-search-icon absolute-center"
            onClick={() => setIsSearchClick(!isSearchClick)}
          >
            {!isSearchClick ? (
              <BsSearch style={{ width: "100%", height: "100%" }} />
            ) : (
              <RxCross2 style={{ width: "100%", height: "100%" }} />
            )}
          </div>
          <form
            className={`header-search-wrapper ${
              isSearchClick ? "mobile-search" : ""
            }`}
            onSubmit={handleSearch}
          >
            <div className="search-icon-wrapper absolute-center">
              <BsSearch
                style={{ width: "100%", height: "100%", color: "black" }}
              />
            </div>

            <input
              type="text"
              name="search"
              className="search-input"
              placeholder="Search songs"
            />
            <button type="submit" className="search-btn cur-pointer">
              Search
            </button>
          </form>
        </div>
      </header>
      {/* bottom navigantion options  */}
      <nav className="bottom-nav-container">
        <div className="bottom-nav-wrapper">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              title={item.title}
              className={`bottom-nav-link absolute-center ${
                currentPath === item.link ? "active-link" : ""
              }`}
            >
              {item.icon}
              <span
                className={`${
                  currentPath === item.link ? "bottom-nav-text" : "hide"
                }`}
              >
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Header;
