import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown, BsThreeDotsVertical, BsYoutube } from "react-icons/bs";
import { AiFillInfoCircle, AiFillSetting } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../api/getAudio";
import { useGetSongsByIdQuery } from "../../reduxtool/services/songsApi";
import { addSongInfo } from "../../reduxtool/slice/currentSongSlice";
import MiniPlayer from "./miniPlayer/MiniPlayer";
import "./Player.css";
import PlayerControls from "./playerControls/PlayerControls";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RelatedSongs from "./relatedSongs/RelatedSongs";
import { RxCross2 } from "react-icons/rx";

const Player = () => {
  const [songUrl, setSongUrl] = useState("");
  const [songsInfo, setSongsInfo] = useState([]);
  const [audioLoading, setAudioLoading] = useState(true);
  const [songsList, setSongsList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [playerInfo, setPlayerInfo] = useState({
    isMoreInfoClick: false,
    isAudioQualityClick: false,
    isSongDetailsClick: false,
  });
  const [audioFormat, setAudioFormat] = useState("low");

  // const { id } = JSON.parse(localStorage.getItem('currentSongInfo'));
  const dispatch = useDispatch();
  const currentSong = useSelector(
    (state) => state.currentSongSlice.currentSongInfo
  );
  const { id, onMiniPlayer } = currentSong;

  const { data, isLoading } = useGetSongsByIdQuery(id);

  const [progress, setProgress] = useState(0);

  const audioRef = useRef();

  // get songs url
  const getSongUrl = async () => {
    try {
      const response = await fetch(`${baseUrl}/song/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      // console.log(data)
      if (audioFormat === "high") {
        setSongUrl(data.audioFormatHigh);
        setAudioLoading(false);
        setIsPlaying(false);
      } else {
        setSongUrl(data.audioFormatLow);
        setAudioLoading(false);
        setIsPlaying(false);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setAlertMessage(error.message);
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };
  useEffect(() => {
    getSongUrl();
    // eslint-disable-next-line
  }, [id, audioFormat]);

  useEffect(() => {
    if (data) {
      setSongsInfo(data.items);
    }
  }, [data]);

  useEffect(() => {
    if (songsInfo[0]?.snippet?.liveBroadcastContent === "live") {
      setAlertMessage("can't play live stream");
      setTimeout(() => {
        setAlertMessage("");
      }, 5000);
    }
  }, [songsInfo]);

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const currTime = audioRef.current.currentTime;
    // console.log(duration,currTime)
    setProgress((currTime / duration) * 100);
  };

  //  reset state on song changed
  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
    setAudioLoading(true);
  }, [id]);

  // console.log({ isPlaying, audioLoading })

  const mapVideoId = songsList.map((songs) => songs.id.videoId);
  const index = mapVideoId.findIndex((x) => x === id);

  const handleNext = () => {
    // console.log(songsList)
    // console.log('current', id)
    // console.log(index)

    if (index < mapVideoId.length - 1) {
      // console.log(mapVideoId[index + 1]);
      // navigate(`/play/${mapVideoId[index + 1]}`, { replace: true })
      // setCurrentSongInfo({ id: mapVideoId[index + 1] })
      dispatch(addSongInfo({ ...currentSong, id: mapVideoId[index + 1] }));
    } else {
      console.log("you reached at end");
      setAlertMessage("you reached at end");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  const handlePrev = () => {
    // console.log(songsList)
    // console.log('current', id)
    // console.log(index)

    if (index > 0) {
      // console.log(mapVideoId[index - 1]);
      // navigate(`/play/${mapVideoId[index - 1]}`, { replace: true })
      // setCurrentSongInfo({ id: mapVideoId[index - 1] })
      dispatch(addSongInfo({ ...currentSong, id: mapVideoId[index - 1] }));
    } else {
      setAlertMessage("you reached at first");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    localStorage.setItem("currentSongInfo", JSON.stringify(currentSong));
  }, [currentSong]);

  // web media session

  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songsInfo[0]?.snippet?.title,
      album: songsInfo[0]?.snippet?.channelTitle,
      artwork: [
        {
          src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    });
  }

  useEffect(() => {
    if (!onMiniPlayer) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [onMiniPlayer]);

  return (
    <div
      className={`player-page-section ${
        onMiniPlayer ? "miniplayer-active" : ""
      }`}
    >
      {/* <Header /> */}
      {!onMiniPlayer && (
        <div className="top-player-controll-wrapper">
          <div
            className="player-minimize-wrapper cur-pointer"
            onClick={() =>
              dispatch(addSongInfo({ ...currentSong, onMiniPlayer: true }))
            }
          >
            <BsChevronDown style={{ width: "100%", height: "100%" }} />
          </div>
          <div
            className="player-info-wrapper player-minimize-wrapper  cur-pointer"
            onClick={() =>
              setPlayerInfo({ isMoreInfoClick: !playerInfo.isMoreInfoClick })
            }
          >
            <BsThreeDotsVertical style={{ width: "100%", height: "100%" }} />
          </div>
          <div
            className="player-more-info"
            style={{ top: playerInfo.isMoreInfoClick && "25px" }}
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
                <label htmlFor="audio-quality">Select Quality</label>
                <select
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
      )}

      <div
        className="song-details-model-wrapper absolute-center"
        style={{ display: playerInfo.isSongDetailsClick ? "flex" : "none" }}
      >
        <div className="song-details-model">
          <div
            className="song-details-model-close cur-pointer"
            onClick={() =>
              setPlayerInfo({ ...playerInfo, isSongDetailsClick: false })
            }
          >
            <RxCross2 style={{ width: "100%", height: "100%" }} />
          </div>
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

      <div
        className={`player-section ${onMiniPlayer && "mini-player-active "} `}
      >
        <div className="player-container">
          <div className="player-song-image-wrapper">
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt="song-poster"
              className="player-song-image"
            />
          </div>

          {isLoading ? (
            <div className="player-song-title-channel-wrapper absolute-center">
              <Skeleton width={"200px"} />
            </div>
          ) : (
            <div className="player-song-title-channel-wrapper absolute-center">
              <div className="player-song-title">
                {songsInfo[0]?.snippet?.title.slice(0, 70) + "..."}
              </div>
              <div className="player-song-channel">
                • {songsInfo[0]?.snippet?.channelTitle}
              </div>
            </div>
          )}

          <audio
            src={songUrl}
            ref={audioRef}
            onTimeUpdate={onPlaying}
            onCanPlay={() => setAudioLoading(false)}
            onEnded={() => autoPlay && handleNext()}
            autoPlay={autoPlay}
          />

          <PlayerControls
            audioRef={audioRef}
            progress={progress}
            audioLoading={audioLoading}
            audioDuration={songsInfo[0]?.contentDetails?.duration}
            songsList={songsList}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            autoPlay={autoPlay}
            setAutoPlay={setAutoPlay}
            currentIndex={index}
            mapVideoId={mapVideoId}
          />

          <div className={`${alertMessage ? "alert-message-wrapper" : "hide"}`}>
            <div className="alert-message">{alertMessage}</div>
          </div>
        </div>

        <RelatedSongs
          videoId={id}
          songsList={songsList}
          setSongsList={setSongsList}
          setIsPlaying={setIsPlaying}
        />
      </div>

      {onMiniPlayer && (
        <MiniPlayer
          songsInfo={songsInfo}
          videoId={id}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          handleNext={handleNext}
          handlePrev={handlePrev}
          audioLoading={audioLoading}
          audioRef={audioRef}
          songsList={songsList}
          mapVideoId={mapVideoId}
          currentIndex={index}
        />
      )}
    </div>
  );
};

export default Player;
