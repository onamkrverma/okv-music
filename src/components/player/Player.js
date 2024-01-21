import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getAudioUrls } from "../../api/getAudio";
import { useGetSongsByIdQuery } from "../../reduxtool/services/songsApi";
import { addSongInfo } from "../../reduxtool/slice/currentSongSlice";
import MiniPlayer from "./miniPlayer/MiniPlayer";
import "./Player.css";
import PlayerControls from "./playerControls/PlayerControls";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RelatedSongs from "./relatedSongs/RelatedSongs";
import PlayerMoreInfo from "./playerMoreInfo/PlayerMoreInfo";
import SongDetailsModel from "./songDetailsModel/SongDetailsModel";

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
  const localAudioFormat = localStorage.getItem("audioQuality");
  const [audioFormat, setAudioFormat] = useState(localAudioFormat ?? "high");

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
      const response = await getAudioUrls({ id });
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

  const mapVideoId = songsList?.map((song) => song.videoId);
  const index = mapVideoId.findIndex((x) => x === id);
  const handleNext = () => {
    if (index < mapVideoId.length - 1) {
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
    if (index > 0) {
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
          <PlayerMoreInfo
            id={id}
            playerInfo={playerInfo}
            setPlayerInfo={setPlayerInfo}
            audioFormat={audioFormat}
            setAudioFormat={setAudioFormat}
          />
        </div>
      )}

      <SongDetailsModel
        id={id}
        playerInfo={playerInfo}
        setPlayerInfo={setPlayerInfo}
        songUrl={songUrl}
        songsInfo={songsInfo}
      />

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
