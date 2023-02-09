import React from 'react'
import './HeroBanner.css';
import Slider from 'react-slick';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { useNavigate } from 'react-router-dom';

const HeroBanner = ({ newSongs }) => {
  const navigate = useNavigate()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>
  };



  const handleRedirect = (videoId)=>{
    navigate(`/play/${videoId}`)
  }



  return (
    <div className='heroBanner-section container'>
      <Slider {...settings}>
        {newSongs?.slice(0,5).map((songs) =>
          <div className="heroBanner-wrapper " key={songs.etag} onClick={()=>handleRedirect(songs.snippet.resourceId.videoId)}>
            <div className="hero-image-wrapper">
              <img
                src={songs.snippet.thumbnails.maxres.url}
                className='hero-image'
                alt="hero poster" />
            </div>
            <div className="image-shadow">
              
            </div>
          </div>
        )}
      </Slider>
    </div>
  )
}

export default HeroBanner