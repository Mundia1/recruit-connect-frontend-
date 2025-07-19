import React from "react";
import heroImage from "../../assets/hero-image.png"; // Replace with your logo asset

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo + Description */}
        <div className="flex flex-col items-start">
          <img
            src={heroImage}
            alt="RecruitConnect Logo"
            className="w-12 h-12 mb-4"
          />
          <p className="text-base text-gray-400">
            Find Jobs. Manage Jobs. All in One Place.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/"
                className="hover:text-[#177245] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/jobs"
                className="hover:text-[#177245] transition-colors"
              >
                Jobs
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-[#177245] transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-[#177245] transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook">
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="w-6 h-6 grayscale hover:grayscale-0 transition"
                />
              </a>
              <a href="#" aria-label="Twitter">
                <img
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className="w-6 h-6 grayscale hover:grayscale-0 transition"
                />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="w-6 h-6 grayscale hover:grayscale-0 transition"
                />
              </a>
            </div>
          </div>
          <form className="flex flex-col gap-2">
            <label
              htmlFor="newsletter-email"
              className="text-sm text-gray-400"
            >
              Subscribe to our newsletter
            </label>
            <div className="flex">
              <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email"
                required
                className="rounded-l-md px-3 py-2 w-full bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#177245]"
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