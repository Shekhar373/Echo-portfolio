import React, { useEffect } from "react";
import Lenis from "lenis";
import Home from "./pages/Home";
import Cursor from "./Components/common/Cursor";
import Navbar from "./Components/common/Navbar";

const App = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on("scroll", (e) => {
      // console.log(e);
    });
  }, []);

  return (
    <div className="">
      {/* Make the Navbar fixed */}
      <div style={{ position: "fixed", top: 0, zIndex: 40 }}>
        <Navbar />
      </div>
      <Cursor />

      <Home />
    </div>
  );
};

export default App;
