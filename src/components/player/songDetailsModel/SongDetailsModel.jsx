import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import "./SongDetailsModel.css";
const SongDetailsModel = ({
  id,
  playerInfo,
  songsInfo,
  setPlayerInfo,
  audioUrl,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!audioUrl) return;
    navigator.clipboard.writeText(audioUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div
      className="popup-wrapper absolute-center"
      style={{
        display: playerInfo.isSongDetailsClick ? "flex" : "none",
      }}
    >
      <div
        className="popup-overlayer"
        onClick={() =>
          setPlayerInfo({ ...playerInfo, isSongDetailsClick: false })
        }
      ></div>
      <div className="song-details-model">
        <span
          className="popup-close-btn cur-pointer"
          onClick={() =>
            setPlayerInfo({ ...playerInfo, isSongDetailsClick: false })
          }
        >
          <RxCross2 size={25} />
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
        <div className="song-details ">
          <div className="song-url-wrapper">
            <p>AudioUrl:</p>
            <button
              type="button"
              className="copy-btn"
              title="Copy Url"
              onClick={handleCopy}
            >
              {isCopied ? (
                <span className="tooltiptext">Copied to clipboard</span>
              ) : null}
              <HiOutlineClipboardDocumentCheck size={20} color="white" />
            </button>
          </div>
          <p>{audioUrl}</p>
        </div>
      </div>
    </div>
  );
};

export default SongDetailsModel;
