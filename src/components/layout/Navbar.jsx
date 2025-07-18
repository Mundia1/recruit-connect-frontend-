import React, { useState } from "react";
import { StarIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        
        <div className="flex items-center gap-2 text-[#000000] font-bold text-xl">
          <StarIcon className="h-6 w-6" />
          <span>Recruit Connect</span>
        </div>

        
        <div className="hidden md:flex items-center gap-8">
          
          <ul className="flex items-center gap-6 text-gray-700 font-medium">
            <li><a href="#" className="hover:text-[#177245]">Home</a></li>
            <li><a href="#" className="hover:text-[#177245]">Jobs</a></li>
            <li><a href="#" className="hover:text-[#177245]">Contact</a></li>
          </ul>

         
          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-[#177245] font-semibold">
              Sign In
            </button>
            <button className="bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
              Sign Up
            </button>
          </div>
        </div>

       
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </nav>

      
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <li><a href="#" className="hover:text-[#177245]">Home</a></li>
            <li><a href="#" className="hover:text-[#177245]">Jobs</a></li>
            <li><a href="#" className="hover:text-[#177245]">Contact</a></li>
          </ul>
          <div className="flex flex-col gap-4 mt-4">
            <button className="text-gray-700 hover:text-[#177245] font-semibold">
              Sign In
            </button>
            <button className="bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
