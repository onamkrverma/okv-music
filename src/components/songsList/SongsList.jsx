import React from "react";
import SongsCard from "../songsCard/SongsCard";
import SongsCardSkeleton from "../songsCard/SongsCardSkeleton";
import "./SongsList.css";
import { Link } from "react-router-dom";
import {
  useGetPlaylistItemsQuery,
  useGetSearchItemsQuery,
} from "../../reduxtool/services/songsApi";
import { useSelector } from "react-redux";

const SongsList = ({
  title,
  isSearchPage = false,
  playlistId,
  searchQuery,
}) => {
  const { data, isLoading } = !isSearchPage
    ? useGetPlaylistItemsQuery(playlistId)
    : useGetSearchItemsQuery(searchQuery);

  const urlTitle = !isSearchPage
    ? title?.replaceAll(" ", "-").toLowerCase()
    : null;

  return (
    <div className="songs-list-container container">
      <div className="songs-list-top-wrapper">
        <h2 className="songs-list-title">{title}</h2>
        <Link
          to={`/${urlTitle}/${playlistId}`}
          className="view-all cur-pointer"
        >
          view all
        </Link>
      </div>
      <div
        className="songs-list-wrapper"
        style={{
          flexWrap: isSearchPage ? "wrap" : "nowrap",
          justifyContent: isSearchPage ? "center" : "flex-start",
        }}
      >
        {isLoading || !data ? (
          <SongsCardSkeleton amount={6} />
        ) : (
          data.items?.map((songs) => (
            <SongsCard songs={songs} key={songs.etag} />
          ))
        )}
      </div>

      {data?.pageInfo?.totalResults === 0 ? (
        <div className="search-not-found-wrapper container">
          <h1>404</h1>
          <p className="search-query-text">Search Query: {searchQuery}</p>
          <p>Opps... This search query could not be found!</p>
        </div>
      ) : null}
    </div>
  );
};

export default SongsList;
