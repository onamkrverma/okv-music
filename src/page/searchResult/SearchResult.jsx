import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SongsList from "../../components/songsList/SongsList";
import "./SearchResult.css";

const SearchResult = () => {
  const { q } = useParams();

  useEffect(() => {
    document.title = `${
      q.slice(0, 1).toUpperCase() + q.slice(1)
    } -Search • Okv Music`;
  }, [q]);

  return (
    <div className="search-result-container ">
      <SongsList
        title={`Search results for "${q}"`}
        isSearchPage={true}
        searchQuery={q}
      />
    </div>
  );
};

export default SearchResult;
