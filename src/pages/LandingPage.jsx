import React from "react";
import HeroImage from "../assets/hero-image.png";
import Navbar from "../components/layout/Navbar";
import FeaturedJobs from "../components/features/jobs/FeaturedJobs";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  return (
    <div>
      {/* Navbar above hero */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
         {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-end justify-center h-full mb-10 px-4">
          <div className="text-center text-white">
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
        </div>
      </section>

      {/* Featured Jobs Section */}
      <FeaturedJobs />
      <Footer />
    </div>
  );
}
