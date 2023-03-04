import React, { useEffect } from 'react'
import './Home.css'
import { useGetPlaylistItemsQuery } from '../../reduxtool/services/songsApi';
import Header from '../../components/header/Header';
import SongsList from '../../components/songsList/SongsList';
import { useDispatch, useSelector } from 'react-redux';
import { addSongs } from '../../reduxtool/slice/songsSlice';
import HeroBanner from './heroBanner/HeroBanner';
import Player from '../player/Player';

const Home = () => {

  const playlistId = {
    newRelesedId : 'RDCLAK5uy_ksEjgm3H_7zOJ_RHzRjN1wY-_FFcs7aAU',
    trendingSongsId: 'PL_yIBWagYVjwYmv3PlwYk0b4vmaaHX6aL',
    bollywoodHitsId: 'RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g'
  }
const dispatch = useDispatch()
const songsData = useSelector((state)=>state.songsSlice.songsData)
const currentSong = useSelector((state)=>state.currentSongSlice.currentSongInfo)
const {id} = currentSong;


 const newSongs  = useGetPlaylistItemsQuery(playlistId.newRelesedId,{skip: songsData.newSongs !== undefined}) ;
 const trendingSongs  = useGetPlaylistItemsQuery(playlistId.trendingSongsId,{skip: songsData.trendingSongs !== undefined});
 const bollywoodHitsSongs = useGetPlaylistItemsQuery(playlistId.bollywoodHitsId,{skip: songsData.bollywoodHitsSongs !== undefined});


  useEffect(() => {
    if(trendingSongs.data && newSongs.data && bollywoodHitsSongs.data){
      dispatch(addSongs(
        {
          trendingSongs:trendingSongs.data, 
          newSongs:newSongs.data,
         bollywoodHitsSongs: bollywoodHitsSongs.data
        }))
    }
  }, [trendingSongs.data,newSongs.data,bollywoodHitsSongs.data])

  useEffect(()=>{
    if(songsData.trendingSongs || songsData.newSongs || songsData.bollywoodHitsId){
      localStorage.setItem('homepageData',JSON.stringify(songsData))
    }
  },[songsData.trendingSongs, songsData.newSongs , songsData.bollywoodHitsId])
  



  return (
    <div className='home-section'>
      <Header />
      <HeroBanner trendingSongs={songsData.trendingSongs?.items} />
      <SongsList title={'Trending Songs'} songsData={songsData.trendingSongs?.items} />
      <SongsList title={'New Released Songs'} songsData={songsData.newSongs?.items} />
      <SongsList title={'Bollywood HitsList'} songsData={songsData.bollywoodHitsSongs?.items} />

    {/* {id && <Player/>} */}
    </div>
  )
}

export default Home