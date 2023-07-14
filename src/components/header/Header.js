import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { RxCross2 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSearchClick, setIsSearchClick] = useState(false);
  const [isRotate, setIsRotate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  const handleRefesh = () => {
    setIsRotate(!isRotate);
    localStorage.removeItem("homepageData");
  };

  return (
    <div className="header-section">
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
          {!isSearchClick && (
            <BsSearch style={{ width: "100%", height: "100%" }} />
          )}
          {isSearchClick && (
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
            className="search-input"
            placeholder="Search songs"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button type="submit" className="search-btn cur-pointer">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
