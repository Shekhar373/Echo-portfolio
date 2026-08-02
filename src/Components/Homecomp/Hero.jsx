import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import React from 'react'

const Hero = () => {
  
  useGSAP(() => {
    gsap.from(".hero-text", {
      opacity: 0,
      yPercent: 120,
      ease: "expo.inOut",
      delay: 4.2,
      duration: 2,
      stagger: 0.1,
    })
  })
  return (
    <div className='h-screen md:h-[110vh]'>
      <div className='h-screen relative'>
        <h1 className='hero-text text-[46vw] text-[#D14836]  absolute bottom-0 leading-[32vw] font-medium '>Echo</h1>
      </div>
    </div>
  )
}

export default Hero
