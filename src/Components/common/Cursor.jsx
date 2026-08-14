import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Simple custom cursor component with GSAP animation
const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
          y: e.clientY,
          duration: 1,
          // ease: "expo.out",
          ease: "power4.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  // Styles for the cursor
  const cursorStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    background:"white",
    mixBlendMode: "difference",
    transform: "translate(-50%, -50%)",
  };

  return <div ref={cursorRef} style={cursorStyle}></div>;
};

export default Cursor;