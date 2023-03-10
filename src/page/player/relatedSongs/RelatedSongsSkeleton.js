import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const RelatedSongsSkeleton = ({ amount }) => {
  const arrayCount = Array(amount).fill(1)


  return (
    arrayCount.map((val, index) =>
      <div className="related-songs-info-wrapper cur-pointer" key={index} >
        <div className="related-songs-image-wrapper">
          <Skeleton width={'100px'} height={'55px'} />
        </div>
        <div className="related-songs-title-channel-wrapper">
          <div className="related-songs-title-wrapper">
            <Skeleton width={'200px'}/>
          </div>
          <div className="related-songs-channel-wrapper">
            <Skeleton width={'50px'}/>
          </div>
        </div>
      </div>
    )
  )
}

export default RelatedSongsSkeleton