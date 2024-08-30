import React from "react";
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      {/* <div className="h-[80px] w-full flex justify between items-center max-w-7xl px-3 mx-auto">
        <h2 className="text-gray-500 text-3xl"> Weather </h2>
        <p className="flex items-center justify-center gap-2">
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </p>
        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Enter location"
          />
        </section>
      </div> */}
      {/* abdffghehtghyrhyjj */}

      <div className="flex items-center justify-between">
        {/* Left side: Weather text and sun icon */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Weather</span>
          <MdWbSunny className="text-xl text-yellow-500" />
        </div>

        {/* Right side: Location icon, input field, and search button */}
        <div className="flex items-center gap-2">
          <MdMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter location"
          />
          <button className="p-2 bg-blue-500 text-white rounded">
            <IoMdSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
