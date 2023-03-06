import React from 'react'
import SongsCard from '../songsCard/SongsCard'
import './SongsList.css'

const SongsList = ({songsData,title,searchResult}) => {

  

  return (
    <div className='songs-list-container container'>
      <div className="songs-list-title">
        {title}
      </div>

      <div className="songs-list-wrapper"
       style={{flexWrap:searchResult && "wrap",justifyContent:searchResult && 'center'}}>
      {songsData && songsData.map((songs)=>
        <SongsCard songs={songs} key={songs.etag} />
      )}
      </div>
    </div>
  )
}

export default SongsList