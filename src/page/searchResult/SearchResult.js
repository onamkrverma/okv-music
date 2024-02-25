import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import SongsList from "../../components/songsList/SongsList";
import { useGetSearchItemsQuery } from "../../reduxtool/services/songsApi";
import "./SearchResult.css";

const SearchResult = () => {
  const { q } = useParams();
  const { data, isLoading } = useGetSearchItemsQuery(q);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (data) {
      setSearchResult(data.items);
    }
  }, [data]);

  return (
    <div className="search-result-container ">
      <Header />
      <SongsList
        title={"Search results"}
        songsData={searchResult}
        searchResult={"searchResult"}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SearchResult;
