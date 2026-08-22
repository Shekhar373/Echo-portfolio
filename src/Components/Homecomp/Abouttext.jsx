import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React, { useRef } from "react";

const AboutText = () => {
  const textref = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    let split = SplitText.create(textref.current,{
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (split) => {
        return gsap.from(split.lines, {
          opacity: 0,
        yPercent: 120,
        ease: "power1.out",
        stagger: {
          amount: 0.8,
        },
        scrollTrigger: {
          trigger: textref.current,
          // markers: true,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        });
      },
      onComplete: () => split.revert(),
    });
  });

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger, SplitText);

  //   let split;

  //   // Delay SplitText until next microtask to ensure layout is stable
  //   setTimeout(() => {
  //     if (!textref.current) return;

  //     // Clean up previous splits if they exist (SplitText can break lines on hot reloads or remounts)
  //     SplitText.killTweensOf && SplitText.killTweensOf(textref.current);

  //     // Split lines of text
  //     split = SplitText.create(textref.current, {
  //       type: "lines",
  //       mask:"lines"
  //       // linesClass: "gsap-line", // add a class so CSS can keep overflow-hidden 
  //     });

  //     // Animate each line
  //     gsap.from(split.lines, {
  //       opacity: 0,
  //       yPercent: 120,
  //       ease: "power1.out",
  //       stagger: {
  //         amount: 0.8,
  //       },
  //       scrollTrigger: {
  //         trigger: textref.current,
  //         // markers: true,
  //         start: "top 70%",
  //         toggleActions: "play none none reverse",
  //       },
  //     });
  //   }, 0);

  //   // Cleanup: revert SplitText on unmount
  //   return () => {
  //     if (split && split.revert) {
  //       split.revert();
  //     }
  //   };
  // });
  return (
    <div className="h-[90vh] w-full flex flex-col justify-center p-5 lg:p-10 lg:mt-[20vh]">
      <div
        ref={textref}
        className="border-b pb-[10vh] lg:pb-[20vh] flex flex-col max-md:gap-10"
      >
        <h1 className="text-[9vw] leading-[9vw] lg:text-[5vw] lg:leading-[5vw] tracking-tighter overflow-hidden">
          I create visuals that <br /> communicate and
          <br /> <span className="text-zinc-400">inspire.</span>
        </h1>
        <h1 className="text-sm lg:text-xl lg:pl-[60vw] overflow-hidden">
          I'm a Video Editor and Graphic Designer focused on creating engaging
          visual experiences. I combine storytelling, motion, design, and
          creativity to turn ideas into content that captures attention and
          leaves an impact.
        </h1>
      </div>
      <h1 className="max-md:pt-5">LET'S WORK TOGETHER</h1>
    </div>
  );
};

export default AboutText;
