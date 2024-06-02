import React, { useEffect, useState } from "react";
import Home from "./page/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
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

function App() {
  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id, miniPlayerActive } = currentSong;

  const isMiniPlayerActive = miniPlayerActive ?? true;

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
    return !isOffline ? (
      <PageRoute miniPlayerActive={isMiniPlayerActive} />
    ) : (
      <OfflineBanner />
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={OnlineRoute(Home)} />
        <Route
          path="playlistsongs/:urlTitle/:playlistId"
          element={OnlineRoute(PlaylistSongs)}
        />
        <Route path="/search/:q" element={OnlineRoute(SearchResult)} />
        <Route path="/trending" element={OnlineRoute(Trending)} />
        <Route path="/explore" element={OnlineRoute(Explore)} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {id ? <Player /> : null}
    </BrowserRouter>
  );
}

export default App;
