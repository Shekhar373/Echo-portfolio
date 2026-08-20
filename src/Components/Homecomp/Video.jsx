import React from 'react'
import InfiniteVideo from './InfiniteVideo'

const Video = () => {
  return (
    <div className='h-fit w-full lg:mt-[20vh]'>
        <div className='h-fit w-full text-center'>
           <h1 className='text-[10vw] leading-[10vw] lg:text-[7vw] lg:leading-[7vw] tracking-tighter'>Recently Edited <br /> <span className='text-zinc-400'>Videos</span></h1>
        </div>
        <InfiniteVideo />
    </div>
  )
}

export default Video