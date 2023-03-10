import React from 'react'
import { useDispatch } from 'react-redux';
import { addSongInfo } from '../../reduxtool/slice/currentSongSlice';
import './SongsCard.css'


const SongsCard = ({ songs }) => {
 const dispatch =  useDispatch()

  const handleRedirect = (videoId) => {
    dispatch(addSongInfo(
      {id:videoId,
      onMiniPlayer: false
      }
      ))
  }



  return (
    <div className='songs-card-container cur-pointer'
    onClick={()=>handleRedirect(songs.snippet.resourceId ? songs.snippet.resourceId.videoId:songs.id.videoId)}>
      <div className="songs-card-wrapper">
        <div className="songs-image-wrapper">
          <img src={songs.snippet.thumbnails.high.url}
            className='songs-image'
            alt="song-poster" />
        </div>
        <div className="songs-title-wrapper">
          <p className="songs-title">{songs.snippet.title.slice(0, 50) + '...'}</p>
        </div>
      </div>

    </div>
  )
}

export default SongsCard