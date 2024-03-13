import React from "react";
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

function App() {
  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id, miniPlayerActive } = currentSong;

  const isMiniPlayerActive = miniPlayerActive ?? true;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home miniPlayerActive={isMiniPlayerActive} />}
        />
        <Route
          path="playlistsongs/:urlTitle/:playlistId"
          element={<PlaylistSongs miniPlayerActive={isMiniPlayerActive} />}
        />
        <Route
          path="/search/:q"
          element={<SearchResult miniPlayerActive={isMiniPlayerActive} />}
        />
        <Route
          path="/trending"
          element={<Trending miniPlayerActive={isMiniPlayerActive} />}
        />
        <Route
          path="/explore"
          element={<Explore miniPlayerActive={isMiniPlayerActive} />}
        />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {id ? <Player /> : null}
    </BrowserRouter>
  );
}

export default App;
