import React from "react";
import HeroGallery from "./HeroGallery";

const Hero = () => {
  return (
    <div className="h-screen w-full bg-white relative ">
      <div className="h-screen w-full absolute top-0 flex justify-between items-center p-5 text-[3vw]">
        <h1 className="tracking-tighter">Creative Videos </h1>
        <h1 className="tracking-tighter">made with care</h1>
        
      </div>
      <div className="h-fit w-full absolute bottom-0 flex justify-between items-center p-5">
          <h1 className="font-medium">
          Where creative editing meets bold design <br /> to bring every idea to life.
          </h1>
          <h1 className="text-zinc-500">Drag to explore the collection</h1>
        </div>
      <HeroGallery />
    </div>
  );
};

export default Hero;
