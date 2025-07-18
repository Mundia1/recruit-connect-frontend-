import React from "react";
import { StarIcon } from "@heroicons/react/24/solid"; 

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-20">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <StarIcon className="h-6 w-6 text-[#177245]" />
          <span>Recruit Connect</span>
        </div>

        
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          <li><a href="#" className="hover:text-[#177245]">Home</a></li>
          <li><a href="#" className="hover:text-[#177245]">Jobs</a></li>
          <li><a href="#" className="hover:text-[#177245]">Contact</a></li>
        </ul>

        
        <div className="hidden md:flex items-center gap-4">
          <button className="text-white hover:text-[#177245] font-semibold">
            Sign In
          </button>
          <button className="bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">
            Sign Up
          </button>
        </div>

       
        <div className="md:hidden text-white">
          ☰
        </div>
      </nav>
    </header>
  );
}
