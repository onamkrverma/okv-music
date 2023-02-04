import React, { useEffect } from 'react'
import './Home.css'
import { useGetPlaylistItemsQuery } from '../../reduxtool/services/songsApi';
import Header from '../../components/header/Header';
import SongsList from '../../components/songsList/SongsList';
import { useDispatch, useSelector } from 'react-redux';
import { addSongs } from '../../reduxtool/slice/songsSlice';

const Home = () => {

  const playlistId = {
    newRelesedId : 'RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU',
    trendingSongsId: 'PL_yIBWagYVjwYmv3PlwYk0b4vmaaHX6aL'
  }

 const newSongs  = useGetPlaylistItemsQuery(playlistId.newRelesedId) ;
 const trendingSongs  = useGetPlaylistItemsQuery(playlistId.trendingSongsId) ;

 const dispatch = useDispatch()
 const songsData = useSelector((state)=>state.songsSlice.songsData)

  useEffect(() => {
    if(trendingSongs.data || newSongs.data){
      dispatch(addSongs({trendingSongs:trendingSongs.data, newSongs:newSongs.data}))
      // localStorage.setItem('localData',JSON.stringify(data))
    }
  }, [trendingSongs.data,newSongs.data])

  



  return (
    <div className='home-section'>
      <Header/>
      <SongsList title={'Trending Songs'} songsData={songsData.trendingSongs?.items} />
      <SongsList title={'New Released Songs'} songsData={songsData.newSongs?.items} />
    </div>
  )
}

export default Home