import { Canvas } from '@react-three/fiber'
import React from 'react'
import HeroScene from '../r3f/3dHero'

import { Leva } from "leva";

const HeroParent = () => {
  return (
    <div className='h-screen w-screen bg-black text-white'>
       <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          fov: 55,
          near: 0.1,
          far: 200,
        }}
      >
        <HeroScene />
      </Canvas>
    </div>
  )
}

export default HeroParent