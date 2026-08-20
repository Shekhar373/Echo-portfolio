import React from 'react'
import HeroGallery from './HeroGallery'

const Hero = () => {
  return (
    <div className='h-screen w-full bg-white'>
      <div className='h-screen w-full absolute top-0 flex justify-between items-center p-10 text-[3vw]'>
        <h1 className='tracking-tighter'>Creative Videos </h1>
        <h1 className='tracking-tighter'>made with care</h1>

      </div>
    <HeroGallery />
    </div>
  )
}

export default Hero