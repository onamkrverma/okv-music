import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../api/getAudio';
import Header from '../../components/header/Header';
import { useGetSongsByIdQuery } from '../../reduxtool/services/songsApi';
import './Player.css'
import PlayerControls from './playerControls/PlayerControls';
import RelatedSongs from './relatedSongs/RelatedSongs';


const Player = () => {
  const [songUrl, setSongUrl] = useState('');
  const [songsInfo, setSongsInfo] = useState([]);
  const [audioLoading, setAudioLoading] = useState(true);
  const [songsList, setSongsList] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const { id } = useParams()
  const { data, isError } = useGetSongsByIdQuery(id);

  const [progress, setProgress] = useState(0);

  const audioRef = useRef();
  const navigate = useNavigate()

  // get songs url
  const getSongUrl = async () => {
    try {
      const response = await fetch(`${baseUrl}/song/${id}`, {
        method: "GET",
      })
      const data = await response.json()
      // console.log(data)
      setSongUrl(data)
      setAudioLoading(false)

    } catch (error) {
      console.log(error)
      console.log(error.message)
      setAlertMessage(error.message)
      setTimeout(() => {
        setAlertMessage('')
      }, 300);
    }
  }
  useEffect(() => {
    getSongUrl();
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if (data) {
      setSongsInfo(data.items)
    }
  }, [data])


  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const currTime = audioRef.current.currentTime;
    // console.log(duration,currTime)
    setProgress(currTime / duration * 100);

  }

  //  reset state on song changed
  useEffect(() => {
    setProgress(0)
    setAudioLoading(true)
  }, [id])

  useEffect(() => {

  }, [songUrl])


  // console.log({ isPlaying, audioLoading })



  const handleNext = () => {
    // console.log(songsList)
    console.log('current', id)
    const mapVideoId = songsList.map((songs) => songs.id.videoId)
    const index = mapVideoId.findIndex((x) => x === id)
    console.log(index)


    if (index < mapVideoId.length - 1) {
      console.log(mapVideoId[index + 1])
      navigate(`/play/${mapVideoId[index + 1]}`)
      setIsPlaying(false)
    }
    else {
      console.log('you reached at end')
      setAlertMessage('you reached at end')
      setTimeout(() => {
        setAlertMessage('')
      }, 3000)
    }
  }


  // web media session 

  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songsInfo[0]?.snippet?.title,
      album: songsInfo[0]?.snippet?.channelTitle,
      artwork: [
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '96x96', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '128x128', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '192x192', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '256x256', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '384x384', type: 'image/png' },
        { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, sizes: '512x512', type: 'image/png' },
      ]
    });
  }







  return (
    <div className="player-page-section">
      <Header />
      <div className='player-section '>

        <div className="player-container">
          <div className="player-song-image-wrapper">
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt="song-poster"
              className='player-song-image'
            />
          </div>
          <div className="player-song-title-channel-wrapper absolute-center">
            <div className="player-song-title">
              {songsInfo[0]?.snippet?.title}
            </div>
            <div className="player-song-channel">
              • {songsInfo[0]?.snippet?.channelTitle}
            </div>
          </div>

          <audio src={songUrl} ref={audioRef} onTimeUpdate={onPlaying} 
            onCanPlay={() => setAudioLoading(false)} onEnded={handleNext} autoPlay />

          <PlayerControls audioRef={audioRef}
            progress={progress} audioLoading={audioLoading}
            audioDuration={songsInfo[0]?.contentDetails?.duration}
            songsList={songsList}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
          />

          {alertMessage && <div className="alert-message-wrapper">
            <div className="alert-message">
              {alertMessage}
            </div>
          </div>}
        </div>
        {isError && <div>{isError}</div>}


        <RelatedSongs videoId={id} songsList={songsList} setSongsList={setSongsList} setIsPlaying={setIsPlaying} />
      </div>


    </div>
  )
}

export default Player