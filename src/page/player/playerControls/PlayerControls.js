import React, { useEffect, useRef } from "react";
import "./PlayerControls.css";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillVolumeUpFill,
  BsPauseCircleFill,
  BsPlayCircleFill,
} from "react-icons/bs";

const PlayerControls = ({
  audioRef,
  progress,
  audioLoading,
  setAlertMessage,
  handleNext,
  handlePrev,
  isPlaying,
  setIsPlaying,
  autoPlay,
  setAutoPlay,
  mapVideoId,
  currentIndex,
}) => {
  useEffect(() => {
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage(error.message);
    }

    // eslint-disable-next-line
  }, [isPlaying]);

  const progressRef = useRef();

  const handleJumpDuration = (e) => {
    const totalWidth = progressRef.current.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const divProgress = Math.floor((offsetX / totalWidth) * 100);
    audioRef.current.currentTime =
      (divProgress / 100) * audioRef.current.duration;
  };

  const handleVolume = (e) => {
    audioRef.current.volume = e.target.valueAsNumber;
  };

  function updatePositionState() {
    if ("setPositionState" in navigator.mediaSession) {
      navigator.mediaSession.setPositionState({
        duration: audioRef.current.duration,
        playbackRate: audioRef.current.playbackRate,
        position: audioRef.current.currentTime,
      });
    }
  }

  if ("mediaSession" in navigator) {
    navigator.mediaSession.setPositionState({
      duration: audioRef.current.duration,
      playbackRate: audioRef.current.playbackRate,
      position: audioRef.current.currentTime,
    });
  } else {
    navigator.mediaSession.setPositionState(null);
  }

  navigator.mediaSession.setActionHandler("play", () => {
    setIsPlaying(false);
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    setIsPlaying(true);
  });
  navigator.mediaSession.setActionHandler("stop", () => {
    setIsPlaying(true);
    audioRef.current.currentTime = 0;
  });

  if (currentIndex > 0) {
    navigator.mediaSession.setActionHandler("previoustrack", () => {
      handlePrev();
    });
  } else {
    // Unset the "previoustrack" action handler at the end of a list.
    navigator.mediaSession.setActionHandler("previoustrack", null);
  }

  if (currentIndex < mapVideoId.length - 1) {
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      handleNext();
    });
  } else {
    // Unset the "nexttrack" action handler at the end of a playlist.
    navigator.mediaSession.setActionHandler("nexttrack", null);
  }

  // When user wants to seek to a specific time, update position.
  navigator.mediaSession.setActionHandler("seekto", () => {
    handleJumpDuration();
    updatePositionState();
  });

  return (
    <div className="player-controls-container">
      <div
        className="player-progress-bar-wrapper cur-pointer"
        onClick={handleJumpDuration}
        ref={progressRef}
      >
        <div
          className="player-progress "
          style={{ width: `${progress}%` }}
        ></div>
        <span
          className="player-progess-thumb"
          style={{ left: `${progress - 1}%` }}
        ></span>
      </div>
      <div className="player-durations-wrapper">
        <p>
          {parseInt((audioRef.current?.currentTime / 60) % 60) +
            ":" +
            parseInt(audioRef.current?.currentTime % 60)}
        </p>
        {!audioRef.current?.duration ? (
          "0:00"
        ) : (
          <p>
            {/* {audioDuration?.slice(2, audioDuration.length - 1).replaceAll(/[A-Z]/ig, ':')} */}
            {parseInt((audioRef.current?.duration / 60) % 60) +
              ":" +
              parseInt(audioRef.current?.duration % 60)}
          </p>
        )}
      </div>

      <div className="audio-controls-wrapper absolute-center">
        <div
          className="audio-prev-wrapper next-prev-icons cur-pointer"
          style={{ opacity: currentIndex <= 0 && "0.5" }}
          onClick={handlePrev}
        >
          <BsFillSkipStartFill style={{ width: "100%", height: "100%" }} />
        </div>

        <div className="audio-play-pause-wrapper">
          <div
            className="audio-play-pause  cur-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying || progress === 100 ? (
              <BsPlayCircleFill
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: audioLoading && "0.9",
                }}
              />
            ) : (
              <BsPauseCircleFill style={{ width: "100%", height: "100%" }} />
            )}
          </div>

          {(audioLoading || !audioRef.current?.duration) && (
            <div className="loading-spin">
              <svg style={{ width: "100%", height: "100%" }}>
                <circle
                  cx="35"
                  cy="35"
                  r="30"
                  fill="transparent"
                  className="svg-circle"
                ></circle>
              </svg>
            </div>
          )}
        </div>

        <div
          className="audio-next-wrapper next-prev-icons cur-pointer"
          style={{ opacity: currentIndex >= mapVideoId.length - 1 && "0.5" }}
          onClick={handleNext}
        >
          <BsFillSkipEndFill style={{ width: "100%", height: "100%" }} />
        </div>
      </div>

      <div className="audio-volume-wrapper">
        <div className="audio-volume-icon next-prev-icons">
          <BsFillVolumeUpFill style={{ width: "100%", height: "100%" }} />
        </div>

        <div className="audio-volume">
          <input
            type="range"
            title="volume"
            className="volume-input cur-pointer"
            min={0.0}
            max={1.0}
            step={0.01}
            onChange={handleVolume}
          />
        </div>
      </div>

      <div className="audio-autoplay-wrapper">
        <div className="audio-autoplay-title">AutoPlay</div>
        <label className="audio-autoplay">
          <input
            type="checkbox"
            title="autoplay"
            aria-label="autoplay"
            placeholder="autoplay"
            checked={autoPlay}
            onChange={() => setAutoPlay(!autoPlay)}
          />
          <span className="autoplay-slider" title="autoplay">
            <span className="autoplay-icons">
              {autoPlay ? (
                <BsPlayCircleFill style={{ width: "100%", height: "100%" }} />
              ) : (
                <BsPauseCircleFill style={{ width: "100%", height: "100%" }} />
              )}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default PlayerControls;
