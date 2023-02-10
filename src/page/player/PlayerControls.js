import React,  {useState } from 'react'
import './PlayerControls.css';
import { BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs';

const PlayerControls = ({ audioRef, progress, audioLoad,audioDuration }) => {

  const [isPlay, setIsPlay] = useState(false)
  


  const handlePlayPause = () => {
    setIsPlay(!isPlay);
    if (isPlay) {
      audioRef.current.pause();
    }
    else {
      audioRef.current.play();
    }

  }

 



  return (
    <div className='player-controls-container'>
      <div className="player-progress-bar-wrapper" >
        <div className="player-progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="player-durations-wrapper">
        <p>
          {parseInt(((audioRef.current?.currentTime) / 60) % 60) + ':' + parseInt(((audioRef.current?.currentTime) % 60))}
        </p>
        {audioLoad ?'0:00':<p>
         {audioDuration?.slice(2,audioDuration.length-1).replaceAll(/[A-Z]/ig,':')}
        </p>}
      </div>


      <div className="audio-play-pause cur-pointer" onClick={handlePlayPause}>
        {!isPlay && <BsPlayCircleFill style={{ width: '100%', height: '100%' ,opacity:audioLoad && '0.9' }} />}
        {isPlay && <BsPauseCircleFill style={{ width: '100%', height: '100%' }} />}
        {audioLoad && <div className="loading-spin">
          <svg style={{ width: '100%', height: '100%' }}>
            <circle cx="25" cy="25" r="20" fill='transparent' className='svg-circle'></circle>
          </svg>
        </div>}
      </div>
    </div>
  )
}

export default PlayerControls