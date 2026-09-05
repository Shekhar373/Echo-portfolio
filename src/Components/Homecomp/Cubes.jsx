import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

const Cubes = () => {
  const cubeRefs = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(cubeRefs.current, {
      opacity: 0,
      stagger: {
        from: "random",
        each: 0.1
      },
      scrollTrigger: {
        trigger: cubeRefs.current[0],
        start: "top 80%",
        end: "bottom top",
        // markers: true,
        scrub: true
      }
    });
  }, []);

  return (
      <div className="w-screen h-[50vh] grid grid-cols-20 grid-rows-5 bg-black">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            ref={el => (cubeRefs.current[i] = el)}
            key={i}
            className="bg-white"
          />
        ))}
      </div>
  );
};

export default Cubes;
