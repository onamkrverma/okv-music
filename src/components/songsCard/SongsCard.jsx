import React from "react";
import { useDispatch } from "react-redux";
import { addSongInfo } from "../../reduxtool/slice/currentSongSlice";
import "./SongsCard.css";

const SongsCard = ({ songs }) => {
  const dispatch = useDispatch();

  const handleRedirect = (videoId) => {
    dispatch(addSongInfo({ id: videoId, miniPlayerActive: false }));
  };

  return (
    <div
      className="songs-card-container cur-pointer"
      onClick={() =>
        handleRedirect(
          songs.snippet.resourceId
            ? songs.snippet.resourceId.videoId
            : songs.id.videoId
        )
      }
    >
      <div className="songs-card-wrapper">
        <div className="songs-image-wrapper">
          <img
            src={
              songs?.snippet.thumbnails?.maxres
                ? songs?.snippet.thumbnails?.maxres?.url
                : songs?.snippet.thumbnails?.high?.url
            }
            className="songs-image"
            alt="song-poster"
          />
          {/* visible only in search page */}
          {songs.snippet?.liveBroadcastContent === "live" ? (
            <small className="live-content">Live</small>
          ) : null}
        </div>
        <div className="songs-title-channel-wrapper">
          <p className="songs-title">{songs.snippet.title}</p>
          {/* visible only in search page */}
          <p className="songs-channel">• {songs?.snippet?.channelTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default SongsCard;
