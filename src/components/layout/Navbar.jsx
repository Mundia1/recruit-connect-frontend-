import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { StarIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Contact", path: "/contact" }, // You can create a Contact page later
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-[#000000] font-bold text-xl">
          <StarIcon className="h-6 w-6 text-[#177245]" />
          <span>Recruit Connect</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-gray-700 font-medium">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#177245] font-semibold border-b-2 border-[#177245]"
                      : "hover:text-[#177245] transition-colors duration-300"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <NavLink
              to="/signin"
              className="text-gray-700 hover:text-[#177245] font-semibold"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Sign Up
            </NavLink>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/signin"
            className="text-gray-700 hover:text-[#177245] font-semibold"
          >
    Sign In
  </NavLink>
  <NavLink
    to="/signup"
    className="bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
  >
    Sign Up
  </NavLink>
</div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-[#177245]"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 mt-4">
            <NavLink
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-[#177245] font-semibold"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
