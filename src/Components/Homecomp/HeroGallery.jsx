import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Repeat videos array for infinite vertical effect
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

  const y = useRef(0);
  const velocity = useRef(0);

  const isDragging = useRef(false);
  const startY = useRef(0);
  const startPosition = useRef(0);

  // Used to keep track of loop height for the infinite effect
  const loopHeightRef = useRef(0);

  // Repeat videos for infinite vertical loop (at least 3x)
  const repeatedVideos = [...videos, ...videos, ...videos];

  // The indexes of the "central" chunk, for logic convenience
  const centerChunkStart = videos.length;
  const centerChunkEnd = videos.length * 2;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const items = Array.from(track.children);
    const originalItems = items.slice(centerChunkStart, centerChunkEnd);

    const getItemHeight = () => {
      const first = originalItems[0];
      if (!first) return 0;

      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.rowGap || style.gap) || 0;

      return first.offsetHeight + gap;
    };

    const getLoopHeight = () => {
      return getItemHeight() * videos.length;
    };

    // Set initial scroll to start of the central (second) chunk
    y.current = -getLoopHeight();
    loopHeightRef.current = getLoopHeight();

    gsap.set(track, { y: y.current });

    // INFINITE LOOP logic (vertical)
    const wrapPosition = () => {
      const loopHeight = getLoopHeight();
      // up boundary through entire first chunk
      if (y.current <= -loopHeight * 2) {
        y.current += loopHeight;
      }
      // down boundary through entire last chunk
      if (y.current >= 0) {
        y.current -= loopHeight;
      }
      gsap.set(track, { y: y.current });
    };

    // AUTOSCROLL (vertical)
    let raf;
    const animate = () => {
      if (!isDragging.current) {
        y.current -= 1;
        velocity.current *= 0.92;
        wrapPosition();
        gsap.set(track, { y: y.current });
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // DRAG logic (vertical)
    const getPointerY = (e) => (e.touches ? e.touches[0].clientY : e.clientY);

    const onPointerDown = (e) => {
      isDragging.current = true;
      startY.current = getPointerY(e);
      startPosition.current = y.current;
      velocity.current = 0;

      gsap.killTweensOf(track);
      container.classList.add("cursor-grabbing");
      container.classList.remove("cursor-grab");
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const currentY = getPointerY(e);
      const distance = currentY - startY.current;
      const newY = startPosition.current + distance;
      velocity.current = newY - y.current;
      y.current = newY;
      wrapPosition();
    };

    const onPointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      container.classList.remove("cursor-grabbing");
      container.classList.add("cursor-grab");
      gsap.to(y, {
        current: y.current + velocity.current * 8,
        duration: 1.2,
        ease: "power3.out",
        onUpdate: () => {
          wrapPosition();
        }
      });
    };

    // Mouse events
    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    // Touch events
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Resize events
    const resize = () => {
      y.current = -getLoopHeight();
      loopHeightRef.current = getLoopHeight();
      gsap.set(track, { y: y.current });
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);

      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);

      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      window.removeEventListener("resize", resize);

      gsap.killTweensOf(track);
      gsap.killTweensOf(y);
    };
  }, []);

  return (
    <section className="w-full h-full flex justify-center items-center overflow-hidden py-20">
      <div
        ref={containerRef}
        className="
          relative
          h-screen
          w-[90vw]
          lg:w-[45vw]
          overflow-hidden
          cursor-grab
          select-none
          touch-pan-y
          flex
          flex-col
          items-center
        "
      >
        <div
          ref={trackRef}
          className="
            flex flex-col
            h-max
            gap-[10vh]
            will-change-transform
          "
        >
          {repeatedVideos.map((video, index) => (
            <div
              key={`video-${index}`}
              className="
                video-item
                relative
                h-[22vh]
                lg:h-[33vh]
                w-full
                shrink-0
                overflow-hidden
                rounded-sm
                bg-black
                flex
                items-center
                justify-center
              "
            >
              <video
                src={video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                draggable={false}
                className="pointer-events-none h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroGallery;