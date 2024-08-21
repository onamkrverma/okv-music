import React, { useEffect, useState } from "react";
import "./PlayerControls.css";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsPauseCircleFill,
  BsPlayCircleFill,
} from "react-icons/bs";

const PlayerControls = ({
  audioRef,
  progress,
  audioLoading,
  volumeLevel,
  setVolumeLevel,
  handleNext,
  handlePrev,
  isPlaying,
  setIsPlaying,
  autoPlay,
  setAutoPlay,
  mapVideoId,
  currentIndex,
  isReactPlayerActive,
}) => {
  const [seekTime, setSeekTime] = useState(0);
  const [bufferedAmount, setBufferedAmount] = useState(0);

  const duration = audioRef?.current?.getDuration();

  const currentTime = progress?.played * audioRef.current?.getDuration();
  localStorage.setItem("localVolume", volumeLevel);

  //set auto play property
  useEffect(() => {
    if (autoPlay) {
      audioRef.current.autoplay = true;
    } else {
      audioRef.current.autoplay = false;
    }
    // eslint-disable-next-line
  }, [autoPlay]);

  useEffect(() => {
    audioRef.current.seekTo(seekTime);
    // eslint-disable-next-line
  }, [seekTime]);

  // get audio buffered end amount
  useEffect(() => {
    const bufferedAmount = Math.floor(progress.loaded * 100);
    setBufferedAmount(bufferedAmount);
  }, [progress.loaded]);

  return (
    <div className="player-controls-container">
      <div className="player-progress-bar-wrapper cur-pointer">
        <input
          type="range"
          title="seekbar"
          step="any"
          className="seekbar"
          value={currentTime || 0}
          min={0}
          max={duration || 0}
          onInput={(e) => setSeekTime(e.target.value)}
          style={{
            "--buffered-width": `${bufferedAmount}%`,
          }}
        />
      </div>
      <div className="player-durations-wrapper">
        <p>
          {!currentTime
            ? "00:00"
            : currentTime > 3600
            ? new Date(currentTime * 1000).toISOString().substring(11, 19)
            : new Date(currentTime * 1000).toISOString().substring(14, 19)}
        </p>
        {!duration ? (
          "00:00"
        ) : (
          <p>
            {duration > 3600
              ? new Date(duration * 1000).toISOString().substring(11, 19)
              : new Date(duration * 1000).toISOString().substring(14, 19)}
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
            {!isPlaying || progress.played === 1 ? (
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

          {audioLoading ? (
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
          ) : null}
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
        <button
          type="button"
          title="mute/unmute"
          className="audio-volume-btn next-prev-icons"
          onClick={() => setVolumeLevel(volumeLevel > 0 ? 0 : 0.5)}
        >
          {volumeLevel > 0 ? (
            <BsFillVolumeUpFill style={{ width: "100%", height: "100%" }} />
          ) : (
            <BsFillVolumeMuteFill style={{ width: "100%", height: "100%" }} />
          )}
        </button>

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
