import React, { useState } from 'react';
import { BsChevronUp, BsFillSkipEndFill, BsFillSkipStartFill, BsPauseCircleFill, BsPlayCircleFill } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import './MiniPlayer.css';

const MiniPlayer = ({ songsInfo, videoId, isPlaying, setIsPlaying, handleNext, handlePrev, audioLoading,audioRef,songsList, OnPlayer,onMiniPlayer,setOnMiniplayer }) => {
  // const { id } = JSON.parse(localStorage.getItem('currentSongInfo'));
  // const currentSong = useSelector((state)=>state.currentSongSlice.currentSongInfo)
  // const {id} = currentSong;
  const id = videoId;
  const mapVideoId = songsList.map((songs) => songs.id.videoId)
  const index = mapVideoId.findIndex((x) => x === id)

  const [playerClose, setPlayerClose] = useState(false)

  const handleClosePlayer = ()=>{
    setPlayerClose(true)
    // setOnMiniplayer(false)
    localStorage.removeItem('currentSongInfo')
  }



  return (
    <div className='mini-player-section' style={{display:(playerClose || !id)  && 'none'}}>
      <div className="mini-player-container" >
        <div className="mini-player-image-wrapper">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            className='mini-player-image '
            alt="mini-player-poster" />
        </div>
        <div className="mini-player-song-title-channel-wrapper absolute-center">
          <div className="mini-player-song-title">
            {songsInfo[0]?.snippet?.title}
          </div>
          <div className="mini-player-song-channel">
            • {songsInfo[0]?.snippet?.channelTitle}
          </div>
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

        <div className="player-maximize-wrapper" onClick={()=>setOnMiniplayer(false)}>
        <BsChevronUp style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="player-close-wrapper player-maximize-wrapper" onClick={handleClosePlayer}>
        <RxCross2 style={{ width: '100%', height: '100%' }} />
        </div>

      </div>
    </div>
  )
}

export default MiniPlayer