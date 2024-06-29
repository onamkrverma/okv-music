import React, { useEffect, useState } from "react";
import { AiFillInfoCircle, AiFillSetting } from "react-icons/ai";
import { BiSolidDownload } from "react-icons/bi";
import { BsThreeDotsVertical, BsYoutube, BsDownload } from "react-icons/bs";
import "./PlayerMoreInfo.css";
import { getDownloadAudio } from "../../../api/downloadAudio";
import { useGetServerStatusQuery } from "../../../reduxtool/services/activateDownloadApi";

const PlayerMoreInfo = ({
  id,
  playerInfo,
  setPlayerInfo,
  audioFormat,
  setAudioFormat,
  setAlertMessage,
}) => {
  localStorage.setItem("audioQuality", audioFormat);
  const [isDownloadServerActive, setIsDownloadServerActive] = useState(false);

  const { isSuccess } = useGetServerStatusQuery({
    skip: isDownloadServerActive,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsDownloadServerActive(isSuccess);
    }
  }, [isSuccess]);

  const handleDownload = async () => {
    try {
      await getDownloadAudio({ id: id });
    } catch (error) {
      setAlertMessage("Downloading audio failed!");
      console.error("Error downloading audio:", error);
    }
  };

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
          <button
            type="button"
            title="audio quality"
            className="player-more-info-btn absolute-center cur-pointer"
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
          </button>
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

        <a
          className="watch-video absolute-center cur-pointer"
          href={`https://youtube.com/watch?v=${id}`}
          target="_blank"
          title="watch video"
          rel="noopener noreferrer"
        >
          <div className="player-more-info-icons">
            <BsYoutube style={{ width: "100%", height: "100%" }} />
          </div>
          Watch Video
        </a>

        <button
          type="button"
          title="download"
          className="player-more-info-btn absolute-center cur-pointer"
          onClick={handleDownload}
          disabled={!isDownloadServerActive}
        >
          <span className="player-more-info-icons">
            <BiSolidDownload style={{ width: "100%", height: "100%" }} />
          </span>
          {!isDownloadServerActive ? "connecting server.." : "Download"}
        </button>

        <button
          type="button"
          title="song details"
          className="player-more-info-btn absolute-center cur-pointer"
          onClick={() =>
            setPlayerInfo({ ...playerInfo, isSongDetailsClick: true })
          }
        >
          <div className="player-more-info-icons">
            <AiFillInfoCircle style={{ width: "100%", height: "100%" }} />
          </div>
          Song details
        </button>
      </div>
    </div>
  );
};

export default PlayerMoreInfo;
