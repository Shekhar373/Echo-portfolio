import React from "react";

const mixedTextClass = "text-white mix-blend-difference";

const Footer = () => {
  return (
    <div className="relative overflow-hidden flex h-[80vh] lg:h-screen w-full">
      <div className="h-full w-1/2 bg-white" />
      <div className="h-full w-1/2 bg-black" />

      <div className="absolute top-0 h-full w-full px-5 lg:px-10 flex flex-col gap-15 max-md:pt-5">
        <div className="text-[10vw]">
          <h1 className={mixedTextClass}>Let's get in touch</h1>
        </div>
        <div className=" h-fit lg:h-[60vh] w-full flex justify-between ">
          <div className="w-1/2 flex flex-col gap-5 lg:flex-row lg:justify-between ">
          <div className="flex flex-col gap-2 lg:gap-5">
            <h1 className={`${mixedTextClass} text-2xl`}>Navigate</h1>

            <div className="text-sm lg:text-md font-light">
              <h1 className={mixedTextClass}>Home</h1>
              <h1 className={mixedTextClass}>Work</h1>
              <h1 className={mixedTextClass}>About</h1>
              <h1 className={mixedTextClass}>Contact</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:gap-5 lg:pr-[6vw]">
            <h1 className={`${mixedTextClass} text-2xl`}>Inquiries</h1>
            <div className="text-sm lg:text-md font-light">
              <div>
                <h1 className={`${mixedTextClass} font-medium text-md`}>Offline</h1>
                <h1 className={mixedTextClass}>Reach out to echo studio</h1>
                <h1 className={mixedTextClass}>+91 44444 99999</h1>
                <h1 className={mixedTextClass}>xyz@gmail.com</h1>
              </div>
              <div>
                <h1 className={`${mixedTextClass} font-medium text-md`}>Online</h1>
                <h1 className={mixedTextClass}>Reach out to xyz</h1>
                <h1 className={mixedTextClass}>+91 44444 99999</h1>
                <h1 className={mixedTextClass}>xyz@gmail.com</h1>
              </div>
            </div>
          </div>
          </div>
          <div className="w-1/2 flex flex-col gap-5 lg:flex-row lg:justify-between pl-[10vw]">
          <div className="flex flex-col gap-2 lg:gap-5">
            <h1 className={`${mixedTextClass} text-2xl`}>Work</h1>
            <div className="text-sm lg:text-md font-light">
              <h1 className={mixedTextClass}>Send us a email</h1>
              <h1 className={mixedTextClass}>xyz@gmail.com</h1>
              <h1 className={mixedTextClass}>echo-studio.com</h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:gap-5 max-md:pt-5">
            <h1 className={`${mixedTextClass} text-2xl`}>Social</h1>
            <div className="text-sm lg:text-md font-light">
              <h1 className={mixedTextClass}>Instagram</h1>
              <h1 className={mixedTextClass}>Linkedin</h1>
              <h1 className={mixedTextClass}>Twitter</h1>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
