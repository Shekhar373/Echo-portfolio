import { useGSAP } from '@gsap/react'
import gsap, { ScrollTrigger, SplitText } from 'gsap/all'
import _SplitText from 'gsap/SplitText'
import React, { useRef } from 'react'

const Pin = () => {
    const mainvideo = useRef(null)
    gsap.registerPlugin(ScrollTrigger, SplitText)

    useGSAP(() => {
        let split = SplitText.create(".pin-color h1", {
            type: "chars",
            musk: "lines",
        });

        gsap.from(split.chars, {
            y: 150,
            stagger: {
                amount: 0.5,
                from: "random",
                //  ease: 'power2.inOut',
            },
            scrollTrigger: {
                trigger: ".pin-color",
                // markers: true,
                start: "top 40%",
                end: "bottom 100%",
                scrub: 1
            }
        });

        // Only apply video animation for screens 768px and above (not on mobile)
        gsap.matchMedia().add("(min-width: 768px)", () => {
            gsap.to(mainvideo.current, {
                scaleX: 0.25,
                scaleY: 0.25,
                y: "90vh",
                x: "35vw",
                scrollTrigger: {
                    trigger: ".pin-main",
                    // marker:true,
                    start: "top 0",
                    end: "top -100%",
                    scrub: 3
                }
            });
        });
    });



    return (

        <div className='pin-main h-[120vh] lg:h-[230vh] bg-black text-white w-full relative '>
            <div className='absolute z-30 w-full flex justify-center items-center'>
                <video ref={mainvideo} className='h-[50vh] lg:h-screen w-screen object-cover' autoPlay loop muted src="https://wethinkelastic.com/assets/videos/video-start.mp4#t=0.1"></video>
            </div>
            <div className='pin-color h-[50vh] lg:h-screen w-full relative top-[60vh] lg:top-[120vh]'>

                <div className='pin-color-text text-[10vw] inline-block font-bold leading-[9vw] pt-16 p-5 lg:p-10 '>
                    <h1 className='overflow-clip'>A NETWORK </h1>
                    <h1 className='overflow-clip'>DESIGNED</h1>
                    <h1 className='overflow-clip'>FOR</h1>
                </div>
                <div className='pin-color-text flex flex-col items-end absolute right-5 ;g"right-10 bottom-10 leading-[9vw] justify-end font-bold text-[10vw]' >
                    <h1 className='overflow-clip'>TODAY</h1>
                    <h1 className='overflow-clip'>AND</h1>
                    <h1 className='overflow-clip'>TOMORROW</h1>
                </div>
            </div>
        </div>


    )
}

export default Pin
