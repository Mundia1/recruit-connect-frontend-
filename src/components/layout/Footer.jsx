import React from "react";
import heroImage from "../../assets/hero-image.png";
// FontAwesome imports
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 pt-12 pb-6 mt-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-2 min-w-[180px]">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto"
              fill="#177245"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path d="M12 17.75l-6.172 3.245 1.179-6.881-5-4.873 6.9-1.002L12 2.25l3.093 6.989 6.9 1.002-5 4.873 1.179 6.881z"/>
            </svg>
          </span>
          <p className="text-base text-gray-400 text-center">
            Find Jobs. Manage Jobs. All in One Place.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[180px]">
          <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
          <ul className="flex flex-row items-center gap-4 text-sm">
            <li>
              <a href="/" className="hover:text-[#177245] transition-colors">Home</a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-[#177245] transition-colors">Jobs</a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#177245] transition-colors">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#177245] transition-colors">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-2 min-w-[220px]">
          <h4 className="text-lg font-semibold text-gray-900">Follow Us</h4>
          <div className="flex gap-4 justify-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-[#177245] transition">
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-[#177245] transition">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-[#177245] transition">
              <FaLinkedinIn className="w-6 h-6" />
            </a>
          </div>
          <form className="flex flex-col items-center gap-2 w-full max-w-xs">
            <label htmlFor="newsletter-email" className="text-sm text-gray-400 text-center">Subscribe to our newsletter</label>
            <div className="flex w-full">
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email"
                required
                className="rounded-l-md px-3 py-2 w-full bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#177245]"
              />
              <button
                type="submit"
                className="rounded-r-md px-4 py-2 bg-[#177245] text-white font-medium hover:bg-[#145a32] transition"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} RecruitConnect. All rights reserved.
      </div>
    </footer>
  );
}