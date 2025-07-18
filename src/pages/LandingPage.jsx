import React from "react";
import HeroImage from "../assets/hero-image.png"; // Background image

export default function LandingPage() {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center flex items-end justify-center"
      style={{ backgroundImage: `url(${HeroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white mb-10 px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Find Jobs, Manage Jobs. All in One Place.
        </h1>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-[#177245] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
            I'm a Job Seeker
          </button>
          <button className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition">
            I'm an Admin
          </button>
        </div>
      </div>
    </section>
  );
}
