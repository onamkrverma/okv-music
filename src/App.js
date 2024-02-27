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

function App() {
  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id } = currentSong;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="playlistsongs/:urlTitle" element={<PlaylistSongs />} />
        <Route path="/search/:q" element={<SearchResult />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/explore" element={<Explore />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {id ? <Player /> : null}
    </BrowserRouter>
  );
}

export default App;
