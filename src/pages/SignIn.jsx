import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic and redirect
    navigate("/admin-dashboard"); // Temporary redirect
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 mt-10">
          <h2 className="text-3xl font-bold text-center text-[#177245] mb-6">
            Sign In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#177245]"
                aria-label="Email Address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                id="password"
                type="password"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#177245]"
                aria-label="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#177245] text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#177245] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
