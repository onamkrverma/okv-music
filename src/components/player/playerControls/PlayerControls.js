import React, { useEffect, useRef, useState } from "react";
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
  const localVolume = localStorage.getItem("localVolume");
  const [volumeLevel, setVolumeLevel] = useState(localVolume ?? 1.0);

  useEffect(() => {
    audioRef.current.volume = volumeLevel;
    // eslint-disable-next-line
  }, [volumeLevel]);

  localStorage.setItem("localVolume", volumeLevel);

  useEffect(() => {
    try {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } catch (error) {
      setAlertMessage(error.message);
    }

    // eslint-disable-next-line
  }, [isPlaying]);

  //set auto play property
  useEffect(() => {
    if (autoPlay) {
      audioRef.current.autoplay = true;
    } else {
      audioRef.current.autoplay = false;
    }
    // eslint-disable-next-line
  }, [autoPlay]);

  const progressRef = useRef();

  const handleJumpDuration = (e) => {
    const totalWidth = progressRef.current.clientWidth;
    const offsetX = e.nativeEvent.offsetX;
    const divProgress = Math.floor((offsetX / totalWidth) * 100);
    audioRef.current.currentTime =
      (divProgress / 100) * audioRef.current.duration;
  };

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
          {!audioRef.current?.currentTime
            ? "00:00"
            : audioRef?.current?.currentTime > 3600
            ? new Date(audioRef.current?.currentTime * 1000)
                .toISOString()
                .substring(11, 19)
            : new Date(audioRef.current?.currentTime * 1000)
                .toISOString()
                .substring(14, 19)}
        </p>
        {!audioRef.current?.duration ? (
          "00:00"
        ) : (
          <p>
            {audioRef.current?.duration > 3600
              ? new Date(audioRef.current?.duration * 1000)
                  .toISOString()
                  .substring(11, 19)
              : new Date(audioRef.current?.duration * 1000)
                  .toISOString()
                  .substring(14, 19)}
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
            {(!isPlaying || progress === 100) && audioRef.current?.paused ? (
              <BsPlayCircleFill
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: audioLoading && "0.8",
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
            value={volumeLevel}
            onChange={(e) => setVolumeLevel(e.target.valueAsNumber)}
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
