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
  const [seekTime, setSeekTime] = useState(0);
  const [bufferedAmount, setBufferedAmount] = useState(0);

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

  useEffect(() => {
    audioRef.current.currentTime = seekTime;
    // eslint-disable-next-line
  }, [seekTime]);

  // get audio buffered end amount
  useEffect(() => {
    const bufferedLength = audioRef.current?.buffered?.length;
    const bufferedLoaded =
      typeof audioRef.current?.buffered !== "undefined" && bufferedLength > 0;

    if (!bufferedLoaded) return;
    const bufferedEnd = audioRef?.current?.buffered?.end(bufferedLength - 1);
    const bufferedAmount = Math.floor(
      (bufferedEnd / audioRef.current?.duration) * 100
    );
    setBufferedAmount(bufferedAmount);
  }, [audioRef?.current?.currentTime]);

  return (
    <div className="player-controls-container">
      <div className="player-progress-bar-wrapper cur-pointer">
        <input
          type="range"
          title="seekbar"
          step="any"
          className="seekbar"
          value={audioRef.current?.currentTime || 0}
          min={0}
          max={audioRef.current?.duration || 0}
          onInput={(e) => setSeekTime(e.target.value)}
          style={{
            "--buffered-width": `${bufferedAmount}%`,
          }}
        />
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
