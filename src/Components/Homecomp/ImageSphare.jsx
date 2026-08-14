import { Canvas } from "@react-three/fiber";
import React, { useRef, useState, useEffect } from "react";
import Sphare from "../r3f/Sphare";
import { OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    // Initial check in case SSR/hydration
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
};

const ImageSphare = () => {
  const colorRef = useRef(null)
  const isDesktop = useIsDesktop();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.matchMedia().add("(min-width: 768px)", () => {
      gsap.to(colorRef.current, {
        backgroundColor: "white",
        scrollTrigger: {
          trigger: colorRef.current,
          // markers:true,
          start: "top top",
          end: "top -10%",
          scrub: 2,
        },
      });
    });
  });

  return (
    <div ref={colorRef} className="h-screen lg:h-[200vh] lg:bg-black">
      <div className=" lg:pt-[70vh] p-5 lg:p-10">
        <h1 className="text-[12vw] lg:text-[8vw]">PROJECTS</h1>
      </div>
      <div className="h-screen w-full">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50, near: 0.1, far: 1000 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
          }}
        >
          <Sphare />
          {isDesktop && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableDamping
              dampingFactor={0.06}
              rotateSpeed={0.2}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          )}
        </Canvas>
      </div>
    </div>
  );
};

export default ImageSphare;
