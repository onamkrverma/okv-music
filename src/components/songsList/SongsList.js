import React from "react";
import SongsCard from "../songsCard/SongsCard";
import SongsCardSkeleton from "../songsCard/SongsCardSkeleton";
import "./SongsList.css";

const SongsList = ({ songsData, title, searchResult, isLoading }) => {
  return (
    <div className="songs-list-container container">
      <div className="songs-list-title">{title}</div>

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
