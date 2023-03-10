import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SongsCardSkeleton = ({amount}) => {

  const arrayCount = Array(amount).fill(1)



  return (
    arrayCount.map((val,index)=>
    <div className='songs-card-container cur-pointer' key={index}>
      <div className="songs-card-wrapper">
        <div className="songs-image-wrapper">
         <Skeleton height={'100%'}/>
        </div>
        <div className="songs-title-wrapper">
          <p className="songs-title">
            <Skeleton height={'8px'} count={2}/>
          </p>
        </div>
      </div>

    </div>
    )
    
  )
}

export default SongsCardSkeleton