import React, { useEffect, useState } from "react";
import Home from "./page/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResult from "./page/searchResult/SearchResult";
import PlaylistSongs from "./page/playlistSongs/PlaylistSongs";
import ScrollToTop from "./utils/ScrollToUp";
import PageNotFound from "./page/pageNotFound/PageNotFound";
import Trending from "./page/trending/Trending";
import Player from "./components/player/Player";
import { useSelector } from "react-redux";
import Explore from "./page/explore/Explore";
import Header from "./components/header/Header";
import Feedback from "./page/feedback/Feedback";
import About from "./page/about/About";
import OfflineBanner from "./components/offlineBanner/OfflineBanner";
import Footer from "./components/footer/Footer";
import RedirectToOrigin from "./utils/RedirectToOrigin";
import ImportedPlaylist from "./page/importedPlaylist/ImportedPlaylist";

function App() {
  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id } = currentSong;

  // offline status
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    window.addEventListener("offline", (e) => {
      setIsOffline(true);
    });
    window.addEventListener("online", (e) => {
      setIsOffline(false);
    });
  }, []);

  const OnlineRoute = (PageRoute) => {
    return !isOffline ? <PageRoute /> : <OfflineBanner />;
  };

  return (
    <BrowserRouter>
      <RedirectToOrigin />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={OnlineRoute(Home)} />
        <Route
          path="/:urlTitle/:playlistId"
          element={OnlineRoute(PlaylistSongs)}
        />
        <Route path="/search/:q" element={OnlineRoute(SearchResult)} />
        <Route path="/trending" element={OnlineRoute(Trending)} />
        <Route path="/explore" element={OnlineRoute(Explore)} />
        <Route
          path="/imported-playlist"
          element={OnlineRoute(ImportedPlaylist)}
        />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      {id ? <Player /> : null}
    </BrowserRouter>
  );
}

export default App;
