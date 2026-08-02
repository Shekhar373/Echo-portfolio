import React, { useEffect } from "react";
import Lenis from "lenis";
import Home from "./pages/Home";

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
  });
  return (
    <div className="">
      <Home />
    </div>
  );
};

export default App;
