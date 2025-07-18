import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-[#177245]">★</span> Recruit Connect
          </h2>
          <p className="text-sm">
            Your trusted platform for job seekers and recruiters. Connect with
            opportunities and grow your career.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#177245]">Home</a></li>
            <li><a href="#" className="hover:text-[#177245]">Jobs</a></li>
            <li><a href="#" className="hover:text-[#177245]">About</a></li>
            <li><a href="#" className="hover:text-[#177245]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#177245]">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-[#177245]">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-[#177245]">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Recruit Connect. All rights reserved.
      </div>
    </footer>
  );
}
