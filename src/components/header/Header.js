import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const navigate =  useNavigate();

  const handleSearch = ()=>{
    navigate(`/search/${searchQuery}`)
    // console.log(searchQuery)
  }



  return (
    <div className='header-section'>
      <div className="header-container container">
        <div className="header-logo">OKV Music</div>
        <div className="header-search-wrapper">
          <input
           type="text" 
           className='search-input'
           placeholder='Search songs'
           onChange={(e)=>setSearchQuery(e.target.value)}
           value={searchQuery}
            />
           <button 
           type='button'
           className='search-btn cur-pointer'
            onClick={handleSearch}>Search</button> 
        </div>
      </div>
    </div>
  )
}

export default Header