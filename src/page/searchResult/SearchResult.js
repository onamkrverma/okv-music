import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import SongsList from "../../components/songsList/SongsList";
import { useGetSearchItemsQuery } from "../../reduxtool/services/songsApi";
import Player from "../../components/player/Player";
import "./SearchResult.css";
import "../../components/header/Header.css";
import { BsSearch } from "react-icons/bs";

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

      <div>
        <form
          className="header-search-wrapper"
          // onSubmit={handleSearch}
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

      {q ? (
        <SongsList
          title={"Search results"}
          songsData={searchResult?.items}
          searchResult={"searchResult"}
          isLoading={isLoading}
        />
      ) : null}
      {id ? <Player /> : null}
    </div>
  );
};

export default SearchResult;
