import React from 'react'
import Pin from '../Components/Homecomp/Pin'
import KnowUs from '../Components/Homecomp/KnowUs'
import Footer from '../Components/Homecomp/Footer'
import Servicehome from '../Components/Homecomp/Servicehome'
import Loader3 from '../Components/Homecomp/Loader3'
import Abouttext from '../Components/Homecomp/Abouttext'
import HeroParent from '../Components/Homecomp/HeroParent'
import ImageSphare from '../Components/Homecomp/ImageSphare'
import FullscreenNav from '../Components/common/FullscreenNav'
import Video from '../Components/Homecomp/Video'

const Home = () => {
  return (
    <div className='relative overflow-x-hidden'>
      {/* <Loader3 /> */}
      <FullscreenNav />
      <HeroParent />
      <Pin />
      <ImageSphare />
      <Abouttext />
      <Video />
      <Servicehome />
      <KnowUs />
      <Footer />
    </div>
  )
}

export default Home
