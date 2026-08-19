import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React, { useRef } from "react";

const KnowUs = () => {
  const horiscroll = useRef(null);
  gsap.registerPlugin(ScrollTrigger, SplitText);
  useGSAP(() => {
    const split = SplitText.create(".horizontal-text", {
      type: "chars, words",
    });

    const scrollTween = gsap.to(horiscroll.current, {
      xPercent: -146,
      scrollTrigger: {
        trigger: horiscroll.current,
        // markers: true,
        start: "top 0%",
        end: "top -700%",
        pin: true,
        scrub: 1, 
      },
    });

    split.chars.forEach((char) => {
      gsap.from(char, {
        yPercent: "random(-200, 200)",
        rotation: "random(-50, 50)",
        opacity: 0,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          // markers:true,
          start: "left 150%",
          end: "left 90%",
          scrub: 1,
        },
      });
    });
  });
  return (
    <div
      ref={horiscroll}
      className=" horizontal-text tracking-tight h-screen pl-[185vw]  whitespace-nowrap  flex justify-center items-center text-[13vw]"
    >
      <h1>Brands Don't Whisper They Echo</h1>
    </div>
  );
};

export default KnowUs;
