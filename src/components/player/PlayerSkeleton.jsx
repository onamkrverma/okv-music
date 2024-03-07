import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PlayerSkeleton = () => {
  return (
    <>
      <div className="player-song-image-wrapper">
        <Skeleton  height={'100%'}/>
      </div>

      <div className="player-song-title-channel-wrapper absolute-center">
        <div className="player-song-title">
          <Skeleton width={'100px'}/>
        </div>
        <div className="player-song-channel">
          <Skeleton width={'20px'}/>
        </div>
      </div>
    </>
  )
}

export default PlayerSkeleton