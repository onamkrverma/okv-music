import React from "react";
import Home from "./page/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResult from "./page/searchResult/SearchResult";
import PlaylistSongs from "./page/playlistSongs/PlaylistSongs";
import ScrollToTop from "./utils/ScrollToUp";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="playlistsongs/:urlTitle" element={<PlaylistSongs />} />
        <Route path="/search/:q" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
