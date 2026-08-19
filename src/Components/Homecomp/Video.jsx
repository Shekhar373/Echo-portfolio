import React from 'react'
import InfiniteVideo from './InfiniteVideo'

const Video = () => {
  return (
    <div className='h-fit w-full mt-[20vh]'>
        <div className='h-fit w-full text-center'>
           <h1 className='text-[7vw] leading-[7vw]'>Recently Edited <br /> <span className='text-zinc-400'>Videos</span></h1>
        </div>
        <InfiniteVideo />
    </div>
  )
}

export default Video