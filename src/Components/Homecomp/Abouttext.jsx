import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
// Check if you have SplitText from gsap. If you use gsap-bonus-plugins, import like below:
// import { SplitText } from 'gsap/SplitText'
// If not, you can alternatively wrap each letter/word in spans yourself for splitting

const AboutText = () => {
  const textRef = useRef(null);

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger, SplitText);

  //   // Split lines for both animation and revert
  //   let split = SplitText.create(textRef.current, {
  //     type: "lines",
  //     linesClass: "split-line",
  //     // Don't use mask & autoSplit & onSplit like in original; just handle animation below
  //   });

  //   gsap.from(split.lines, {
  //     opacity: 0,
  //     yPercent: 120,
  //     ease: "power1.out",
  //     stagger: {
  //       amount: 0.8,
  //     },
  //     scrollTrigger: {
  //       trigger: textRef.current,
  //       // markers: true,
  //       start: "top 50%",
  //       toggleActions: "play none none reverse",
  //     },
  //   });

  //   // Clean up on unmount
  //   return () => {
  //     split && split.revert();
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //   };
  // });

  return (
    <div
      className="h-[90vh] w-full flex flex-col justify-center p-5 lg:p-10 lg:mt-[20vh]"
    >
      <div className="border-b pb-[10vh] lg:pb-[20vh] flex flex-col max-md:gap-10">
      <h1 className="text-[9vw] leading-[9vw] lg:text-[5vw] lg:leading-[5vw] tracking-tighter">
        I create visuals that <br /> communicate and<br /> <span className="text-zinc-400">inspire.</span>
      </h1>

      <h1 className="text-sm lg:text-xl lg:pl-[60vw]">
        I'm a Video Editor and Graphic Designer focused on creating engaging
        visual experiences. I combine storytelling, motion, design, and
        creativity to turn ideas into content that captures attention and leaves
        an impact.
      </h1>
      </div>
      <h1 className="max-md:pt-5">LET'S WORK TOGETHER
      </h1>
    </div>
  );
};

export default AboutText;
