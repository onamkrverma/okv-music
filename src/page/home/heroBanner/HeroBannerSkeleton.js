import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HeroBannerSkeleton = () => {
  return (
      <div className="heroBanner-wrapper " >
        <div className="hero-image-wrapper">
          <Skeleton height={'100%'}/>
        </div>
      </div>
  )
}

export default HeroBannerSkeleton