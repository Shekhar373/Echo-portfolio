import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
// Check if you have SplitText from gsap. If you use gsap-bonus-plugins, import like below:
// import { SplitText } from 'gsap/SplitText'
// If not, you can alternatively wrap each letter/word in spans yourself for splitting

const AboutText = () => {
  const textRef = useRef(null);

  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger, SplitText)


    let split = SplitText.create(textRef.current, {
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
            trigger: textRef.current,
            // markers: true,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        });
      },
      onComplete: () => split.revert(),
    });
  });

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] p-10 pr-[30vw] bg-white">
      <h2
        ref={textRef}
        className="text-4xl"
      >
        Every brand has a story worth telling. My role is to translate that
        story into visuals that inspire, engage, and build trust. With a focus
        on branding, visual identity, digital design, and creative direction, I
        design experiences that not only look exceptional but also communicate
        with purpose. I believe great design is where creativity meets strategy,
        creating lasting connections between brands and their audience.
      </h2>
    </div>
  );
};

export default AboutText;
