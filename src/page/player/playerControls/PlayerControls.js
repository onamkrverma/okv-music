import React, { useEffect, useRef } from 'react'
import './PlayerControls.css';
import { BsFillSkipEndFill, BsFillSkipStartFill, BsFillVolumeUpFill, BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PlayerControls = ({ audioRef, progress, audioLoading, audioDuration, songsList, setAlertMessage, audioEnded, handleNext, handlePrev, isPlaying, setIsPlaying }) => {


  const { id } = useParams()
  // const currentSong = useSelector((state)=>state.currentSongSlice.currentSongInfo)
  // const {id} = currentSong;

  useEffect(() => {
    try {

      if (isPlaying) {
        audioRef.current.pause();
      }
      else {
        audioRef.current.play();
      }
    }
    catch (error) {
      console.log(error)
      setAlertMessage(error.message)
    }

  }, [isPlaying])







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

  const navigate = useNavigate()
  const mapVideoId = songsList.map((songs) => songs.id.videoId)
  const index = mapVideoId.findIndex((x) => x === id)

  // const handlePrev = () => {
  //   console.log(songsList)
  //   console.log('current', id)
  //   console.log(index)


  //   if (index > 0) {
  //     console.log(mapVideoId[index - 1])
  //     navigate(`/play/${mapVideoId[index - 1]}`)
  //     // setIsPlaying(false)
  //   }
  //   else {
  //     console.log('you reached at first')
  //     setAlertMessage('you reached at first')
  //     setTimeout(() => {
  //       setAlertMessage('')
  //     }, 3000)
  //   }

  // }



  // audio controls from web media api

  navigator.mediaSession.setActionHandler('play', () => { setIsPlaying(false) });
  navigator.mediaSession.setActionHandler('pause', () => { setIsPlaying(true) });

  if (index > 0) {
    navigator.mediaSession.setActionHandler('previoustrack', () => { handlePrev() });
  }
  else {
    // Unset the "previoustrack" action handler at the end of a list.
    navigator.mediaSession.setActionHandler('previoustrack', null);
  }

  if (index < mapVideoId.length - 1) {
    navigator.mediaSession.setActionHandler('nexttrack', () => { handleNext() });
  }
  else {
    // Unset the "nexttrack" action handler at the end of a playlist.
    navigator.mediaSession.setActionHandler('nexttrack', null);
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
        {!audioRef.current?.duration ? '0:00' : <p>
          {/* {audioDuration?.slice(2, audioDuration.length - 1).replaceAll(/[A-Z]/ig, ':')} */}
          {parseInt(((audioRef.current?.duration) / 60) % 60) + ':' + parseInt(((audioRef.current?.duration) % 60))}

        </p>}
      </div>

      <div className="audio-controls-wrapper absolute-center">

        <div className="audio-prev-wrapper next-prev-icons" style={{ opacity: index <= 0 && '0.5' }} onClick={handlePrev}>
          <BsFillSkipStartFill style={{ width: '100%', height: '100%' }} />
        </div>


        <div className="audio-play-pause-wrapper">
          <div className="audio-play-pause  cur-pointer" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <BsPlayCircleFill style={{ width: '100%', height: '100%', opacity: audioLoading && '0.9' }} />
              : <BsPauseCircleFill style={{ width: '100%', height: '100%' }} />
            }
          </div>

          {(audioLoading || !audioRef.current?.duration) &&
            <div className="loading-spin">
              <svg style={{ width: '100%', height: '100%' }}>
                <circle cx="35" cy="35" r="30" fill='transparent' className='svg-circle'></circle>
              </svg>
            </div>
          }

        </div>

        <div className="audio-next-wrapper next-prev-icons " style={{ opacity: index >= (mapVideoId.length - 1) && '0.5' }} onClick={handleNext}>
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