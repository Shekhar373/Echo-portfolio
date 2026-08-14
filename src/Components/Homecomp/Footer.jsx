import React from "react";

const mixedTextClass = "text-white mix-blend-difference";

const Footer = () => {
  return (
    <div className="relative flex h-screen w-full">
      <div className="h-full w-1/2 bg-white" />
      <div className="h-full w-1/2 bg-black" />

      <div className="absolute top-0 h-full w-full px-10">
        <div className="text-[10vw]">
          <h1 className={mixedTextClass}>Let's get in touch</h1>
        </div>
        <div className="h-[60vh] w-full flex justify-between pt-[20vh]">
          <div className="flex flex-col gap-5">
            <h1 className={`${mixedTextClass} text-2xl`}>Navigate</h1>

            <div className="text-md font-light">
              <h1 className={mixedTextClass}>Home</h1>
              <h1 className={mixedTextClass}>Work</h1>
              <h1 className={mixedTextClass}>About</h1>
              <h1 className={mixedTextClass}>Contact</h1>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className={`${mixedTextClass} text-2xl`}>Inquiries</h1>
            <div className="text-md font-light">
              <div>
                <h1 className={mixedTextClass}>Offline</h1>
                <h1 className={mixedTextClass}>Reach out to echo studio</h1>
                <h1 className={mixedTextClass}>+91 44444 99999</h1>
                <h1 className={mixedTextClass}>xyz@gmail.com</h1>
              </div>
              <div>
                <h1 className={mixedTextClass}>Online</h1>
                <h1 className={mixedTextClass}>Reach out to xyz</h1>
                <h1 className={mixedTextClass}>+91 44444 99999</h1>
                <h1 className={mixedTextClass}>xyz@gmail.com</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className={`${mixedTextClass} text-2xl`}>Work</h1>
            <div className="text-md font-light">
              <h1 className={mixedTextClass}>Send us a email</h1>
              <h1 className={mixedTextClass}>xyz@gmail.com</h1>
              <h1 className={mixedTextClass}>echo-studio.com</h1>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className={`${mixedTextClass} text-2xl`}>Social</h1>
            <div className="text-md font-light">
              <h1 className={mixedTextClass}>Instagram</h1>
              <h1 className={mixedTextClass}>Linkedin</h1>
              <h1 className={mixedTextClass}>Twitter</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
