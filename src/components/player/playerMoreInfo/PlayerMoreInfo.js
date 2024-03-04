import React from "react";
import { AiFillInfoCircle, AiFillSetting } from "react-icons/ai";
import { BsThreeDotsVertical, BsYoutube } from "react-icons/bs";
import "./PlayerMoreInfo.css";

const PlayerMoreInfo = ({
  id,
  playerInfo,
  setPlayerInfo,
  audioFormat,
  setAudioFormat,
}) => {
  localStorage.setItem("audioQuality", audioFormat);
  return (
    <div>
      <button
        type="button"
        title="more-info"
        className="player-info-wrapper player-minimize-wrapper  cur-pointer"
        onClick={() =>
          setPlayerInfo({ isMoreInfoClick: !playerInfo.isMoreInfoClick })
        }
      >
        <BsThreeDotsVertical style={{ width: "100%", height: "100%" }} />
      </button>
      <div
        className="player-more-info"
        style={{ top: playerInfo.isMoreInfoClick ? "50px" : "" }}
      >
        <div className="audio-quality-wrapper  ">
          <div
            className="audio-quality absolute-center cur-pointer"
            onClick={() =>
              setPlayerInfo({
                ...playerInfo,
                isAudioQualityClick: !playerInfo.isAudioQualityClick,
              })
            }
          >
            <div className="player-more-info-icons">
              <AiFillSetting style={{ width: "100%", height: "100%" }} />
            </div>
            <span>Audio Quality</span>
          </div>
          <div
            className="audio-selection-wrapper cur-pointer"
            style={{ display: !playerInfo.isAudioQualityClick && "none" }}
          >
            <label htmlFor="select-audio-quality">Select Quality</label>
            <select
              id="select-audio-quality"
              className="cur-pointer"
              onChange={(e) => setAudioFormat(e.target.value)}
              value={audioFormat}
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="watch-video-wrapper  ">
          <a
            className="absolute-center cur-pointer"
            href={`https://youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="player-more-info-icons">
              <BsYoutube style={{ width: "100%", height: "100%" }} />
            </div>
            Watch Video
          </a>
        </div>
        <div
          className="song-details-wrapper absolute-center cur-pointer"
          onClick={() =>
            setPlayerInfo({ ...playerInfo, isSongDetailsClick: true })
          }
        >
          <div className="player-more-info-icons">
            <AiFillInfoCircle style={{ width: "100%", height: "100%" }} />
          </div>
          Song details
        </div>
      </div>
    </div>
  );
};

export default PlayerMoreInfo;
