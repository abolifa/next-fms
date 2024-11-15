import React from "react";
import { ModeToggle } from "./Mode-toggle";

const Navbar = () => {
  return (
    <div className="w-full h-14 flex items-center justify-between border border-r-0 px-10">
      <div className="text-xl font-black">Fms</div>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
