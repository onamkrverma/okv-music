import React from "react";
import { RxCross2 } from "react-icons/rx";
import "./SongDetailsModel.css";
const SongDetailsModel = ({
  id,
  playerInfo,
  songsInfo,
  setPlayerInfo,
  songUrl,
}) => {
  return (
    <div
      className="song-details-model-wrapper absolute-center"
      style={{
        display: playerInfo.isSongDetailsClick ? "flex" : "none",
      }}
    >
      <div
        className="model-overlayer"
        onClick={() =>
          setPlayerInfo({ ...playerInfo, isSongDetailsClick: false })
        }
      ></div>
      <div className="song-details-model">
        <span
          className="song-details-model-close cur-pointer"
          onClick={() =>
            setPlayerInfo({ ...playerInfo, isSongDetailsClick: false })
          }
        >
          <RxCross2 style={{ width: "100%", height: "100%" }} />
        </span>
        <p className="song-details">Id: {songsInfo[0]?.id}</p>
        <p className="song-details">
          Channel: {songsInfo[0]?.snippet?.channelTitle}
        </p>
        <p className="song-details">
          PublishedAt: {songsInfo[0]?.snippet?.publishedAt}
        </p>
        <p className="song-details">
          Duration: {songsInfo[0]?.contentDetails?.duration}
        </p>
        <p className="song-details">Title: {songsInfo[0]?.snippet?.title}</p>
        <p className="song-details">
          Image: {`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        </p>
        <p className="song-details">songUrl: {songUrl}</p>
      </div>
    </div>
  );
};

export default SongDetailsModel;
