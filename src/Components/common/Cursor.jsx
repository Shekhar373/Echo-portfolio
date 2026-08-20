import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Custom cursor component with GSAP animation, hidden on tablet and mobile widths
const Cursor = () => {
  const cursorRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Function to decide visibility based on window width
    const updateVisibility = () => {
      // You can adjust 1024px to your "tablet" breakpoint as needed
      if (window.innerWidth < 1024) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    updateVisibility();
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
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
  }, [visible]);

  // Styles for the cursor
  const cursorStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 40,
    background: "white",
    mixBlendMode: "difference",
    transform: "translate(-50%, -50%)",
    display: visible ? "block" : "none",
  };

  return <div ref={cursorRef} style={cursorStyle}></div>;
};

export default Cursor;