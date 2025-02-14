import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { RxCross2 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiHome, HiBars3BottomRight } from "react-icons/hi2";
import { IoCompass, IoTrendingUp } from "react-icons/io5";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdFeedback } from "react-icons/md";
import { PiPlaylist, PiMicrophoneFill } from "react-icons/pi";
import Popup from "../popup/Popup";
import useSpeechToText from "../../utils/useSpeechToText";

const Header = () => {
  const [isSearchClick, setIsSearchClick] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isMoreOptions, setIsMoreOptions] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  const {
    isListening,
    startListening,
    stopListening,
    transcript,
    speakText,
    error,
  } = useSpeechToText();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target[0].value;
    e.target.reset();
    setIsSearchClick(false);
    const isYoutubeSharedLink = searchQuery.indexOf("https://youtu.be");
    const isYoutubeURLLink = searchQuery.indexOf("https://www.youtube.com");
    if (isYoutubeSharedLink !== -1) {
      const parts = searchQuery.split(".be/");
      const videoId = parts[1].split("?")[0];
      return navigate(`/search/${videoId}`);
    } else if (isYoutubeURLLink !== -1) {
      const url = new URL(searchQuery);
      const videoId = url.searchParams.get("v");
      return navigate(`/search/${videoId}`);
    }
    navigate(`/search/${searchQuery}`);
  };

  const navLinks = [
    { title: "Home", link: "/", icon: <HiHome size="100%" /> },
    {
      title: "Trending",
      link: "/trending",
      icon: <IoTrendingUp size="100%" />,
    },
    {
      title: "Explore",
      link: "/explore",
      icon: <IoCompass size="100%" />,
    },
    {
      title: "Playlist",
      link: "/imported-playlist",
      icon: <PiPlaylist size="100%" />,
    },
    { title: "More", icon: <HiBars3BottomRight size="100%" /> },
  ];
  const moreOptions = [
    { title: "Feedback", link: "/feedback", icon: <MdFeedback size={25} /> },
    { title: "About", link: "/about", icon: <AiFillInfoCircle size={25} /> },
  ];

  const currentPath = window.location.pathname;

  useEffect(() => {
    if (isSearchClick) {
      inputRef.current?.focus();
    }
  }, [isSearchClick]);

  useEffect(() => {
    document.body.style.overflow = isMoreOptions ? "hidden" : "";
  }, [isMoreOptions]);

  useEffect(() => {
    if (!isListening && transcript.length) {
      speakText(transcript);
      navigate(`/search/${transcript}`);
      stopListening({ isClearResult: true });
      setIsPopup(false);
      setIsSearchClick(false);
    }
  }, [isListening]);

  return (
    <>
      <header className="header-section">
        <div className="header-container container">
          <Link to="/" className="header-logo-wrapper">
            <img className="header-logo" src="/logo.png" alt="okv-music" />
          </Link>
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
              ref={inputRef}
            />
            <button
              type="button"
              className="mic-container absolute-center cur-pointer"
              onClick={() => setIsPopup(true)}
            >
              <PiMicrophoneFill size={25} />
            </button>
            <button type="submit" className="search-btn cur-pointer">
              Search
            </button>
          </form>
        </div>
      </header>
      {/* bottom navigantion options  */}
      <nav className="bottom-nav-container ">
        <div className="bottom-nav-wrapper container">
          {navLinks.map((item, index) =>
            item.link ? (
              <Link
                key={index}
                to={item.link}
                title={item.title}
                className={`bottom-nav-link absolute-center ${
                  currentPath === item.link && !isMoreOptions
                    ? "active-link"
                    : ""
                }`}
              >
                {item.icon}
                <span
                  className={`${
                    currentPath === item.link && !isMoreOptions
                      ? "bottom-nav-text"
                      : "hide"
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            ) : (
              <button
                key={index}
                title={item.title}
                className={`bottom-nav-link more-btn absolute-center ${
                  isMoreOptions ? "active-link" : ""
                }`}
                onClick={() => setIsMoreOptions(true)}
              >
                {item.icon}
                <span
                  className={`${isMoreOptions ? "bottom-nav-text" : "hide"}`}
                >
                  {item.title}
                </span>
              </button>
            )
          )}
        </div>
      </nav>

      {/* More options container */}
      <div
        className={`more-options-container ${
          isMoreOptions
            ? "more-options-container-visible"
            : "more-options-container-hide"
        }`}
      >
        <div
          className="more-options-overlayer model-overlayer"
          onClick={() => setIsMoreOptions(false)}
        ></div>
        <div
          className={`more-options-model ${
            !isMoreOptions ? "more-options-model-inActive" : ""
          }`}
        >
          <div className="more-options-logo-wrapper">
            <img className="header-logo" src="/logo.png" alt="okv-music" />
            <button
              type="button"
              title="close"
              className="close-btn absolute-center"
              onClick={() => setIsMoreOptions(false)}
            >
              <RxCross2 size={25} />
            </button>
          </div>
          <div className="more-options-list">
            {moreOptions.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={() => setIsMoreOptions(false)}
                className="more-option  absolute-center"
              >
                {item.icon} {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {isPopup && (
        <Popup
          isPopup={isPopup}
          setIsPopup={setIsPopup}
          title={"Speak to Search"}
          subtitle={transcript}
          isListening={isListening}
          startListening={startListening}
          stopListening={stopListening}
          variant="voice-search"
          errorMessage={error}
        />
      )}
    </>
  );
};

export default Header;
