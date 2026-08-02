import React from 'react'
import Navbar from '../Components/common/Navbar'
import Hero from '../Components/Homecomp/Hero'
import Pin from '../Components/Homecomp/Pin'
import Hori from '../Components/Homecomp/Hori'
import KnowUs from '../Components/Homecomp/KnowUs'
import Footer from '../Components/Homecomp/Footer'
import Services from '../Components/Homecomp/Services'
import Servicehome from '../Components/Homecomp/Servicehome'
import About from '../Components/Homecomp/About'
import Loader from '../Components/Homecomp/Loader'
import Loader3 from '../Components/Homecomp/Loader3'
import Abouttext from '../Components/Homecomp/Abouttext'
import { Canvas } from '@react-three/fiber'
import HeroScene from '../Components/r3f/3dHero'
import HeroParent from '../Components/Homecomp/HeroParent'
import ImageSphare from '../Components/Homecomp/ImageSphare'
import FullscreenNav from '../Components/common/FullscreenNav'

const Home = () => {
  return (
    <div className='relative overflow-x-hidden'>
      <Loader3 />
      <FullscreenNav />
      <HeroParent />
      <Pin />
      {/* <Hori /> */}
      <ImageSphare />
      <Abouttext />
      <Servicehome />
      <KnowUs />
      <Footer />
    </div>
  )
}

export default Home
