import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

// Repeat videos array for infinite effect
const videos = [
  "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/113.mp4",
  "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/111.mp4",
  "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/113.mp4",
  "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/111.mp4",
  "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/113.mp4",
  "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/111.mp4",
  "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/113.mp4",
  "https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/111.mp4",
];

const HeroGallery = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  // Set mobile detection to true if width < 1024
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Scrolling logic
  const mainPos = useRef(0);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const startPointer = useRef(0);
  const startPosition = useRef(0);
  const loopLenRef = useRef(0);

  // For infinite effect, repeat video set three times
  const repeatedVideos = [...videos, ...videos, ...videos];
  const centerChunkStart = videos.length;
  const centerChunkEnd = videos.length * 2;

  // Responsive: update isMobile in real time  
  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const items = Array.from(track.children);
    const originalItems = items.slice(centerChunkStart, centerChunkEnd);

    // Functions for vertical and horizontal mode
    const getItemSize = () => {
      if (!originalItems[0]) return 0;
      const style = window.getComputedStyle(track);
      // For vertical, use .rowGap; for horizontal, use .columnGap
      const gap =
        parseFloat(
          isMobile
            ? style.columnGap || style.gap
            : style.rowGap || style.gap
        ) || 0;
      return isMobile
        ? originalItems[0].offsetWidth + gap
        : originalItems[0].offsetHeight + gap;
    };

    const getLoopLen = () => getItemSize() * videos.length;

    // Set initial scroll to start of the central (second) chunk
    mainPos.current = -getLoopLen();
    loopLenRef.current = getLoopLen();

    // Set transform based on direction
    gsap.set(track, isMobile ? { x: mainPos.current } : { y: mainPos.current });

    // Infinite wrap logic
    const wrapPosition = () => {
      const len = getLoopLen();
      if (mainPos.current <= -len * 2) {
        mainPos.current += len;
      }
      if (mainPos.current >= 0) {
        mainPos.current -= len;
      }
      gsap.set(track, isMobile ? { x: mainPos.current } : { y: mainPos.current });
    };

    let raf;
    const animate = () => {
      if (!isDragging.current) {
        mainPos.current -= isMobile ? 1 : 1;
        velocity.current *= 0.92;
        wrapPosition();
        gsap.set(track, isMobile ? { x: mainPos.current } : { y: mainPos.current });
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Pointer events (horizontal/vertical logic)
    const getPointer = (e) =>
      e.touches
        ? (isMobile ? e.touches[0].clientX : e.touches[0].clientY)
        : isMobile
        ? e.clientX
        : e.clientY;

    const onPointerDown = (e) => {
      isDragging.current = true;
      startPointer.current = getPointer(e);
      startPosition.current = mainPos.current;
      velocity.current = 0;

      gsap.killTweensOf(track);
      container.classList.add("cursor-grabbing");
      container.classList.remove("cursor-grab");
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const currentPointer = getPointer(e);
      const distance = currentPointer - startPointer.current;
      const newPos = startPosition.current + distance;
      velocity.current = newPos - mainPos.current;
      mainPos.current = newPos;
      wrapPosition();
    };

    const onPointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      container.classList.remove("cursor-grabbing");
      container.classList.add("cursor-grab");
      gsap.to(mainPos, {
        current: mainPos.current + velocity.current * 8,
        duration: 1.2,
        ease: "power3.out",
        onUpdate: () => {
          wrapPosition();
        },
      });
    };

    // Events
    container.addEventListener(isMobile ? "touchstart" : "mousedown", onPointerDown, { passive: false });
    window.addEventListener(isMobile ? "touchmove" : "mousemove", onPointerMove, { passive: false });
    window.addEventListener(isMobile ? "touchend" : "mouseup", onPointerUp);

    // Resize events
    const resize = () => {
      mainPos.current = -getLoopLen();
      loopLenRef.current = getLoopLen();
      gsap.set(track, isMobile ? { x: mainPos.current } : { y: mainPos.current });
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener(isMobile ? "touchstart" : "mousedown", onPointerDown);
      window.removeEventListener(isMobile ? "touchmove" : "mousemove", onPointerMove);
      window.removeEventListener(isMobile ? "touchend" : "mouseup", onPointerUp);
      window.removeEventListener("resize", resize);

      gsap.killTweensOf(track);
      gsap.killTweensOf(mainPos);
    };
    // eslint-disable-next-line
  }, [isMobile]);

  // --- FIX VISIBILITY ON MOBILE ---

  // Use full viewport height and correct width in each mode.
  // Adjust classnames so mobile doesn't compress videos to 1px or overflow out of bounds.
  // Remove fixed h-screen on mobile, use min-h and min-w constraints instead.

  // Mobile values: 90vw (container), each video: 80vw wide, ~25vh tall.
  // Desktop: keep as before.

  return (
    <section className="w-full h-full flex justify-center items-center overflow-hidden py-8 md:py-20 bg-white">
      <div
        ref={containerRef}
        className={`
          relative
          ${isMobile ? 'w-[96vw] min-h-[32vh] py-6' : 'h-screen w-[45vw]'}
          overflow-hidden
          cursor-grab
          select-none
          max-md:mt-[15vh]
          flex
          ${isMobile ? 'flex-row items-center touch-pan-x' : 'flex-col items-center touch-pan-y'}
        `}
        style={
          isMobile
            ? { height: "28vh" }
            : {}
        }
      >
        <div
          ref={trackRef}
          className={`
            flex
            ${isMobile ? 'flex-row w-max gap-[6vw]' : 'flex-col h-max gap-[10vh]'}
            will-change-transform
            ${isMobile ? 'min-h-[22vh]' : ''}
          `}
          style={isMobile ? { minHeight: "22vh" } : {}}
        >
          {repeatedVideos.map((video, index) => (
            <div
              key={`video-${index}`}
              className={`
                video-item
                relative
                ${
                  isMobile
                    ? 'w-[80vw] min-w-[80vw] h-[30vh]'
                    : 'w-full h-[22vh] lg:h-[33vh]'
                }
                shrink-0
                overflow-hidden
                rounded-md
                bg-black
                flex
                items-center
                justify-center
              `}
              style={isMobile ? { minWidth: "80vw" } : undefined}
            >
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                draggable={false}
                className="pointer-events-none w-full h-full object-cover"
                style={{
                  background: "black",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroGallery;