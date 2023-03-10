import React from "react";
import Home from "./page/home/Home";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import SearchResult from "./page/searchResult/SearchResult";
import Player from "./page/player/Player";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search/:q" element={<SearchResult/>}/>
      {/* <Route path="/play/:id" element={<Player/>}/> */}
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
