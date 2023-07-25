import React from "react";
import SongsCard from "../songsCard/SongsCard";
import SongsCardSkeleton from "../songsCard/SongsCardSkeleton";
import "./SongsList.css";
import { useNavigate } from "react-router-dom";

const SongsList = ({
  songsData,
  title,
  searchResult,
  isLoading,
  playlistId,
}) => {
  const urlTitle = title?.replaceAll(" ", "-").toLowerCase();
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/playlistsongs/${urlTitle}`, {
      state: { playlistId },
    });
  };

  return (
    <div className="songs-list-container container">
      <div className="songs-list-top-wrapper">
        <p className="songs-list-title">{title}</p>
        <button
          type="button"
          className="view-all cur-pointer"
          onClick={handleRedirect}
        >
          view all
        </button>
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
