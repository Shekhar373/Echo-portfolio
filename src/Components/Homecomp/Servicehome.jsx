import gsap from "gsap";
import React, { useRef } from "react";

const Servicehome = () => {
  const imageRefs = useRef([]);

  // Service items
  const services = [
    {
      heading: "BRAND IDENTITY",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam ",
    },
    {
      heading: "VIDEO EDITING",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam ",
    },
    {
      heading: "SOCIAL MEDIA CREATIVE",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam ",
    },
    {
      heading: "SOCIAL MEDIA STRATERGY",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam ",
    },
    {
      heading: "SOCIAL MEDIA STRATERGY",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta quos quibusdam ",
    },
  ];

  // Ensure the refs array matches the services array
  imageRefs.current = services.map(
    (_, i) => imageRefs.current[i] || React.createRef(),
  );

  return (
    <>
    <div className="h-fit w-full p-5 lg:pt-[30vh]">
        <h1 className="text-[12vw] lg:text-[8vw]">SERVICES</h1>
    </div>
      <div className="lg:h-[120vh] w-full flex flex-col justify-center pt-[10vh]">
        {services.map((service, idx) => (
          <div
            key={idx}
            onMouseEnter={() =>
              gsap.to(imageRefs.current[idx].current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power4.out",
              })
            }
            onMouseLeave={() =>
              gsap.to(imageRefs.current[idx].current, {
                clipPath: "inset(100% 0% 0% 0%)",
                duration: 0.8,
                ease: "power4.out",
              })
            }
            className="h-fit lg:h-[25vh] w-full flex flex-col max-md:gap-5 lg:flex-row p-5 relative"
          >
            <div
              ref={imageRefs.current[idx]}
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <img
                src="https://i.pinimg.com/1200x/d3/e6/3f/d3e63f10189138a30544c2e2d923b338.jpg"
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <div className="h-full w-full lg:w-3/4 text-[5vw] lg:text-[3vw] relative z-10 font-light flex">
              <h1 className="text-black mix-blend-difference">{service.heading}</h1>
            </div>
            <div className="h-full w-full lg:w-1/4 max-md:text-xs font-medium relative z-10 flex items-center">
              <h1 className="mix-blend-difference">{service.description}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Servicehome;
