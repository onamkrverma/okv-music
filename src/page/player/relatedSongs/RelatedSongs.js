import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetSearchRelatedItemsQuery } from '../../../reduxtool/services/songsApi'
import './RelatedSongs.css'

const RelatedSongs = ({ videoId }) => {
  const [relatedSongs, setRelatedSongs] = useState([])
  const [isUpClick, setIsUpClick] = useState(false)
  const { data, isLoading, isError } = useGetSearchRelatedItemsQuery(videoId)
 

  useEffect(() => {
    if(data){
      setRelatedSongs(data.items)
    }
  }, [data])



  const navigate = useNavigate();

  const handleRedirect = (videoId)=>{
    navigate(`/play/${videoId}`)
  }


  return (
    <div className='related-songs-section'>
      <div className="relate-songs-heading">Related Songs</div>
      <div className="relate-songs-heading mobile-next" onClick={()=>setIsUpClick(!isUpClick)}>
        Up Next Songs
      </div>
      <div className={`related-songs-container ${isUpClick ? 'related-songs-mobile':''}`}>

        {relatedSongs?.map((songs) =>
          <div className="related-songs-info-wrapper cur-pointer" key={songs.etag} onClick={()=>handleRedirect(songs.id.videoId)}>
            <div className="related-songs-image-wrapper">
              <img
                src={songs.snippet.thumbnails.default.url}
                className='related-songs-image'
                alt="related-song"
              />
            </div>
            <div className="related-songs-title-channel-wrapper">
              <div className="related-songs-title-wrapper">
                {songs.snippet?.title.slice(0, 50) + '...'}
              </div>
              <div className="related-songs-channel-wrapper">
                • {songs.snippet?.channelTitle}
              </div>


            </div>

          </div>
        )}


      </div>

    </div>
  )
}

export default RelatedSongs