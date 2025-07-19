import React from "react";
import heroImage from "../../assets/hero-image.png";
// FontAwesome imports
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 pt-12 pb-6 mt-12 border-t border-gray-200">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="flex gap-6 text-sm">
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
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-[#177245] transition"
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 hover:text-[#177245] transition"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-[#177245] transition"
              >
                <FaLinkedinIn className="w-6 h-6" />
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