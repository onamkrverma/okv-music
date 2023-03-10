import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Header from '../../components/header/Header';
import SongsList from '../../components/songsList/SongsList';
import { useGetSearchItemsQuery } from '../../reduxtool/services/songsApi';
import Player from '../player/Player';
import './SearchResult.css'


const SearchResult = () => {
  const { q } = useParams()
  const { data,isLoading } = useGetSearchItemsQuery(q)
  const currentSong = useSelector((state) => state.currentSongSlice.currentSongInfo)
  const { id } = currentSong;

  const [searchResult, setSearchResult] = useState({})

  // console.log(q)
  // console.log(searchResult)

  

  useEffect(() => {
    if (data) {
      setSearchResult(data)
    }
  }, [data])



  return (
    <div className='search-result-container '>
      <Header />
      <SongsList title={'Search result'} songsData={searchResult?.items} searchResult={'searchResult'} isLoading={isLoading} />
      {id && <Player />}
    </div>
  )
}

export default SearchResult