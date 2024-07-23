import React from "react";
import SongsCard from "../songsCard/SongsCard";
import SongsCardSkeleton from "../songsCard/SongsCardSkeleton";
import "./SongsList.css";
import { Link } from "react-router-dom";

const SongsList = ({
  songsData,
  title,
  searchResult,
  isLoading,
  playlistId,
}) => {
  const urlTitle = title?.replaceAll(" ", "-").toLowerCase();

  return (
    <div className="songs-list-container container">
      <div className="songs-list-top-wrapper">
        <h1 className="songs-list-title">{title}</h1>
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
          flexWrap: searchResult && "wrap",
          justifyContent: searchResult && "center",
        }}
      >
        {isLoading || !songsData ? (
          <SongsCardSkeleton amount={6} />
        ) : (
          songsData.map((songs) => <SongsCard songs={songs} key={songs.etag} />)
        )}
      </div>
    </div>
  );
};

export default SongsList;
