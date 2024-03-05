import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongsList from "../../components/songsList/SongsList";
import { useGetSearchItemsQuery } from "../../reduxtool/services/songsApi";
import "./SearchResult.css";

const SearchResult = () => {
  const { q } = useParams();
  const { data, isLoading } = useGetSearchItemsQuery(q);
  const [searchResult, setSearchResult] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    setIsNotFound(false);
    if (data) {
      setSearchResult(data.items);
      if (!data.items?.length) {
        setIsNotFound(true);
      }
    }
  }, [data]);

  useEffect(() => {
    document.title = `${
      q.slice(0, 1).toUpperCase() + q.slice(1)
    } -Search • Okv Music"`;
  }, [q]);

  return (
    <div className="search-result-container ">
      <SongsList
        title={"Search results"}
        songsData={searchResult}
        searchResult={"searchResult"}
        isLoading={isLoading}
      />

      {!isLoading && isNotFound ? (
        <div className="search-not-found-wrapper container">
          <h1>404</h1>
          <p className="search-query-text">Search Query: {q}</p>
          <p>Opps... This search query could not be found!</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchResult;
