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
  playerRef,
  audioLoading,
  handleNext,
  handlePrev,
  playerState,
  setPlayerState,
  autoPlay,
  setAutoPlay,
  mapVideoId,
  currentIndex,
}) => {
  const [seekTime, setSeekTime] = useState(0);
  const [bufferedAmount, setBufferedAmount] = useState(0);

  const duration = playerRef?.current?.getDuration();

  const currentTime = playerState?.played * playerRef.current?.getDuration();
  localStorage.setItem("localVolume", playerState.volume);

  useEffect(() => {
    playerRef.current?.seekTo(seekTime);
    // eslint-disable-next-line
  }, [seekTime]);

  // get audio buffered end amount
  useEffect(() => {
    const bufferedAmount = Math.floor(playerState.loaded * 100);
    setBufferedAmount(bufferedAmount);
  }, [playerState.loaded]);

  return (
    <div className="player-controls-container">
      <div className="progress-duration-wrapper">
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
      </div>

      <div className="player-controls-wrapper absolute-center">
        <button
          type="button"
          title="prev"
          className="audio-prev-wrapper next-prev-icons cur-pointer"
          style={{ opacity: currentIndex <= 0 && "0.5" }}
          onClick={handlePrev}
        >
          <BsFillSkipStartFill style={{ width: "100%", height: "100%" }} />
        </button>

        <div className="audio-play-pause-wrapper">
          <button
            type="button"
            title="play/pause"
            className="audio-play-pause  cur-pointer"
            onClick={() =>
              setPlayerState({ ...playerState, playing: !playerState.playing })
            }
          >
            {!playerState.playing || playerState.played === 1 ? (
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
          </button>

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

        <button
          type="button"
          title="next"
          className="audio-next-wrapper next-prev-icons cur-pointer"
          style={{ opacity: currentIndex >= mapVideoId.length - 1 && "0.5" }}
          onClick={handleNext}
        >
          <BsFillSkipEndFill style={{ width: "100%", height: "100%" }} />
        </button>
      </div>

      <div className="volume-autoplay-wrapper">
        <div className="audio-volume-wrapper">
          <button
            type="button"
            title="mute/unmute"
            className="audio-volume-btn"
            onClick={() =>
              setPlayerState({
                ...playerState,
                volume: playerState.volume > 0 ? 0 : 0.5,
              })
            }
          >
            {playerState.volume > 0 ? (
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
              value={playerState.volume}
              onChange={(e) =>
                setPlayerState({
                  ...playerState,
                  volume: e.target.valueAsNumber,
                })
              }
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
                  <BsPauseCircleFill
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
