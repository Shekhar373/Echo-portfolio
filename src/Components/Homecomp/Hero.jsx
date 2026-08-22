import React from "react";
import HeroGallery from "./HeroGallery";

const Hero = () => {
  return (
    <div className="h-screen w-full bg-white relative ">
      <div className="h-screen w-full absolute top-15 lg:top-0 lg:flex justify-between lg:items-center p-5 text-[10vw] max-md:leading-[11vw] lg:text-[3vw]">
        <div className="lg:tracking-tighter flex flex-col lg:flex-row lg: gap-2 max-md:font-bold">
          <h1>Creative</h1>
          <h1>Videos</h1>
        </div>

        <h1 className="tracking-tighter max-md:text-zinc-500">
          made with care
        </h1>
      </div>
      <div className="h-fit w-full absolute max-md:top-60 lg:bottom-0 flex justify-between items-center p-5">
        <h1 className="font-medium max-md:text-xl">
          Where creative editing meets bold design{" "}
          <span className="hidden md:inline">
            <br />
          </span>
          to bring every idea to life.
        </h1>
        <h1 className="text-zinc-500 hidden lg:flex">
          Drag to explore the collection
        </h1>
      </div>

      <div className="absolute bottom-67 p-5">
        <h1 className="text-zinc-500 lg:hidden flex">
          Drag to explore the collection
        </h1>
      </div>
      <HeroGallery />
    </div>
  );
};

export default Hero;
