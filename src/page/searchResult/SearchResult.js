import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import SongsList from "../../components/songsList/SongsList";
import { useGetSearchItemsQuery } from "../../reduxtool/services/songsApi";
import Player from "../../components/player/Player";
import "./SearchResult.css";

const SearchResult = () => {
  const { q } = useParams();
  const { data, isLoading } = useGetSearchItemsQuery(q, {
    skip: q === undefined,
  });
  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id } = currentSong;

  const [searchResult, setSearchResult] = useState({});

  useEffect(() => {
    if (data) {
      setSearchResult(data);
    }
  }, [data]);

  return (
    <div className="search-result-container ">
      <Header />
      <SongsList
        title={"Search results"}
        songsData={searchResult?.items}
        searchResult={"searchResult"}
        isLoading={isLoading}
      />
      {id ? <Player /> : null}
    </div>
  );
};

export default SearchResult;
