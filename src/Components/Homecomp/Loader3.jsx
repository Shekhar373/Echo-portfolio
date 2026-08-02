import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const Loader3 = () => {
    const words = ["Brands", "Don't Whisper", "They","Echo"];
    const refs = useRef([]);

    useEffect(() => {
        // start hidden
        gsap.set(refs.current, { opacity: 0, y: 30 });
    
        const tl = gsap.timeline();

        tl.to(".loader",{
          duration:0.5
        })
    
        words.forEach((_, i) => {
          // enter
          tl.to(refs.current[i], {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
    
          // exit ONLY if it's NOT the last word
          if (i !== words.length - 1) {
            tl.to(refs.current[i], {
              opacity: 0,
              y: -30,
              duration: 0.5,
              ease: "power3.in",
            //   delay: 0.1,
            });
            
          }

          
        });

        tl.to(".loader",{
            yPercent:-100,
            ease: "expo.inOut",
            duration:1.5
        }
        )
        tl.to(".loader",{
            display:"none"
        })
      }, []);

    return (
        <div className='loader fixed z-50 h-screen w-full items-center text-white bg-[#D14836]'>
            <h1 className="text-[8vw] flex justify-center text-center font-bold">
            {words.map((word, i) => (
                <span
                    key={i}
                    ref={(el) => (refs.current[i] = el)}
                    className="absolute top-[40%]"
                >
                    {word}
                </span>
            ))}
        </h1>
        </div>
    );
}

export default Loader3