import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center font-bold w-screen justify-between relative p-5">
      <div className="text-xl">
        <h1>Echo Studio</h1>
      </div>
      <div className="hidden lg:flex gap-2 cursor-pointer ">
        <div className="flex justify-center items-center gap-10 px-10 pt-3 border-none bg-[#F3F3F3] rounded-4xl">
          <h3 className="pb-3">WORK</h3>
          <h3 className="pb-3">SERVICES</h3>
          <h3 className="pb-3">ABOUT</h3>
        </div>
   
        <div>
          <button className="px-7 py-3 border-none bg-[#C9FE6E] cursor-pointer rounded-4xl">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
