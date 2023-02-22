import React, { useRef, useState } from 'react'
import './PlayerControls.css';
import { BsFillSkipEndFill, BsFillSkipStartFill, BsFillVolumeUpFill, BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs';


const PlayerControls = ({ audioRef, progress, audioLoading, audioDuration }) => {

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (isPlaying) {
      audioRef.current.pause();
    }
    else {
      audioRef.current.play();
    }
  }



  const progressRef = useRef()

  const handleJumpDuration = (e) => {
    const totalWidth = progressRef.current.clientWidth
    const offsetX = e.nativeEvent.offsetX;
    const divProgress = Math.floor((offsetX / totalWidth) * 100);
    audioRef.current.currentTime = (divProgress / 100) * audioRef.current.duration;
  }

  const handleVolume = (e) => {
    audioRef.current.volume = e.target.valueAsNumber;
  }


  return (
    <div className='player-controls-container'>
      <div className="player-progress-bar-wrapper cur-pointer" onClick={handleJumpDuration} ref={progressRef}>
        <div className="player-progress " style={{ width: `${progress}%` }}></div>
        <span className='player-progess-thumb' style={{ left: `${progress - 1}%` }}></span>
      </div>
      <div className="player-durations-wrapper">
        <p>
          {parseInt(((audioRef.current?.currentTime) / 60) % 60) + ':' + parseInt(((audioRef.current?.currentTime) % 60))}
        </p>
        {audioLoading ? '0:00' : <p>
          {/* {audioDuration?.slice(2, audioDuration.length - 1).replaceAll(/[A-Z]/ig, ':')} */}
          {parseInt(((audioRef.current?.duration) / 60) % 60) + ':' + parseInt(((audioRef.current?.duration) % 60))}

        </p>}
      </div>

      <div className="audio-controls-wrapper absolute-center">

        <div className="audio-prev-wrapper next-prev-icons" style={{opacity:'0.5'}}>
          <BsFillSkipStartFill style={{ width: '100%', height: '100%' }} />
        </div>


        <div className="audio-play-pause-wrapper">
          <div className="audio-play-pause  cur-pointer" onClick={handlePlayPause}>
            {!isPlaying ? <BsPlayCircleFill style={{ width: '100%', height: '100%', opacity: audioLoading && '0.9' }} />
              : <BsPauseCircleFill style={{ width: '100%', height: '100%' }} />
            }
          </div>

          {audioLoading &&
            <div className="loading-spin">
              <svg style={{ width: '100%', height: '100%' }}>
                <circle cx="35" cy="35" r="30" fill='transparent' className='svg-circle'></circle>
              </svg>
            </div>
          }

        </div>

        <div className="audio-next-wrapper next-prev-icons " style={{opacity:'0.5'}}>
          <BsFillSkipEndFill style={{ width: '100%', height: '100%' }} />
        </div>
      </div>

      <div className="audio-volume-wrapper">
        <div className="audio-volume-icon next-prev-icons">
          <BsFillVolumeUpFill style={{ width: '100%', height: '100%' }} />
        </div>

        <div className="audio-volume">
          <input
            type="range"
            className="volume-input cur-pointer"
            min={0.0}
            max={1.0}
            step={0.01}
            onChange={handleVolume}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerControls