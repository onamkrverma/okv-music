import React, { useEffect, useRef, useState } from 'react'
import { BsPlayCircleFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSearchRelatedItemsQuery } from '../../../reduxtool/services/songsApi'
import './RelatedSongs.css'

const RelatedSongs = ({ videoId, songsList, setSongsList,setIsPlaying }) => {
  const { id } = useParams()
  // const getRealated = JSON.parse(localStorage.getItem('related'));
  // const currentSong = useSelector((state)=>state.currentSongSlice.currentSongInfo)
  // const {id} = currentSong;
  const [relatedSongs, setRelatedSongs] = useState([])
  const [isUpClick, setIsUpClick] = useState(false)
  const { data, isLoading, isError } = useGetSearchRelatedItemsQuery(videoId, { skip: songsList.length > 11 })
  // const { data, isLoading, isError } = useGetSearchRelatedItemsQuery


  useEffect(() => {
    if (data) {
      setRelatedSongs(data.items) 
      const relatedEtag  = relatedSongs.map((song)=>song.etag);
      const uniqueEtag = data.items.filter((val)=> relatedEtag.indexOf(val.etag) < 0)
      // console.log(uniqueEtag)
      setSongsList([...relatedSongs, ...uniqueEtag])

    }
  }, [data])


  // console.log('relatedSongs',relatedSongs)
  // console.log(songsList)


  const navigate = useNavigate();

  const handleRedirect = (videoId) => {
    navigate(`/play/${videoId}`,{replace:true})
    localStorage.setItem('currentSong',JSON.stringify({id:videoId}))
    // setIsPlaying(false)

  }

  const upNextRef = useRef()

  window.onclick = (e)=>{
    if(e.target !== upNextRef.current){
      setIsUpClick(false)
    }
  }


  return (
    <div className='related-songs-section' >
      <div className="relate-songs-heading">Related Songs</div>
      <div className="relate-songs-heading mobile-next" ref={upNextRef} onClick={() => setIsUpClick(!isUpClick)}>
        Up Next Songs
      </div>
      <div className={`related-songs-container ${isUpClick ? 'related-songs-mobile' : ''}`}>

        {songsList?.map((songs, index) =>
          <div className="related-songs-info-wrapper cur-pointer" key={songs.etag} onClick={() => handleRedirect(songs.id.videoId)}>
            <div className="related-songs-image-wrapper">
              <img
                src={songs.snippet.thumbnails.default.url}
                className='related-songs-image'
                alt="related-song"
              />
              {(id === songs.id.videoId) && <div className="playing-status-wrapper">
                <BsPlayCircleFill style={{width:'100%',height:'100%'}}/>
              </div>}
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