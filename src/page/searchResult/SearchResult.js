import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/header/Header';
import SongsList from '../../components/songsList/SongsList';
import { useGetSearchItemsQuery } from '../../reduxtool/services/songsApi';
import './SearchResult.css'


const SearchResult = () => {
  const { q } = useParams()
  const {data} = useGetSearchItemsQuery(q) 

 const [searchResult, setSearchResult] = useState({})

  // console.log(q)
  // console.log(searchResult)

  useEffect(()=>{
    if(data){
      setSearchResult(data)
    }
  },[data])

  return (
    <div className='search-result-container '>
      <Header/>
      <SongsList title={'Search result'} songsData={searchResult?.items} searchResult={'searchResult'}/>
    </div>
  )
}

export default SearchResult