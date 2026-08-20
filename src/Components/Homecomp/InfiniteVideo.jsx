import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// It's better to repeat the videos array 3 times to truly support infinite looping
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

const InfiniteVideo = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const x = useRef(0);
  const velocity = useRef(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startPosition = useRef(0);

  // Used to keep track of loop width for the infinite effect
  const loopWidthRef = useRef(0);

  // Create the repeated array for a truly infinite effect
  // (at least 3x, so you can wrap in both directions)
  const repeatedVideos = [...videos, ...videos, ...videos];
  
  // The indexes of the "central" chunk, for logic convenience
  const centerChunkStart = videos.length;
  const centerChunkEnd = videos.length * 2;

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // Grab only the main repeated chunk for measurements
    const items = Array.from(track.children);

    // Only the "center" chunk's items for gap/width calculation
    const originalItems = items.slice(centerChunkStart, centerChunkEnd);

    const getItemWidth = () => {
      const first = originalItems[0];
      if (!first) return 0;

      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap) || 0;

      return first.offsetWidth + gap;
    };

    const getLoopWidth = () => {
      return getItemWidth() * videos.length;
    };

    // Set initial scroll to start of the central (second) chunk
    x.current = -getLoopWidth();
    loopWidthRef.current = getLoopWidth();

    gsap.set(track, { x: x.current });

    // --------------------------------
    // INFINITE LOOP logic
    // --------------------------------
    const wrapPosition = () => {
      const loopWidth = getLoopWidth();
      // left boundary through entire first chunk
      if (x.current <= -loopWidth * 2) {
        x.current += loopWidth;
      }
      // right boundary through entire last chunk
      if (x.current >= 0) {
        x.current -= loopWidth;
      }
      gsap.set(track, { x: x.current });
    };

    // --------------------------------
    // AUTOSCROLL
    // --------------------------------
    let raf;
    const animate = () => {
      if (!isDragging.current) {
        x.current -= 1;
        velocity.current *= 0.92;
        wrapPosition();
        gsap.set(track, { x: x.current });
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // --------------------------------
    // DRAG START/DRAG MOVE/DRAG END
    // --------------------------------
    const getPointerX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

    const onPointerDown = (e) => {
      isDragging.current = true;
      startX.current = getPointerX(e);
      startPosition.current = x.current;
      velocity.current = 0;

      gsap.killTweensOf(track);
      container.classList.add("cursor-grabbing");
      container.classList.remove("cursor-grab");
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const currentX = getPointerX(e);
      const distance = currentX - startX.current;
      const newX = startPosition.current + distance;
      velocity.current = newX - x.current;
      x.current = newX;
      wrapPosition();
    };

    const onPointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      container.classList.remove("cursor-grabbing");
      container.classList.add("cursor-grab");
      gsap.to(x, {
        current: x.current + velocity.current * 8,
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
      x.current = -getLoopWidth();
      loopWidthRef.current = getLoopWidth();
      gsap.set(track, { x: x.current });
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
      gsap.killTweensOf(x);
    };
  }, []);

  return (
    <section className="w-full overflow-hidden py-20">
      <div
        ref={containerRef}
        className="
          relative
          w-full
          overflow-hidden
          cursor-grab
          select-none
          touch-pan-y
        "
      >
        <div
          ref={trackRef}
          className="
            flex
            w-max
            gap-4
            will-change-transform
          "
        >
          {repeatedVideos.map((video, index) => (
            <div
              key={`video-${index}`}
              className="
                video-item
                relative
                h-[25vh]
                w-[90vw]
                lg:h-[50vh]
                lg:w-[45vw]
                shrink-0
                overflow-hidden
                rounded-sm
                bg-black
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

export default InfiniteVideo;