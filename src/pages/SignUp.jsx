import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import PasswordInput from '../components/ui/PasswordInput';
import { signUp } from "../api/auth"; // <-- Import the real API function


export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await signUp(userData); // <-- Call the API
      navigate("/signin");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 mt-10">
          <h2 className="text-3xl font-bold text-center text-[#177245] mb-6">
            Create Account
          </h2>
          {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#177245]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#177245]"
              />
            </div>            <div>
              <PasswordInput
                name="password"
                label="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#177245] text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#177245] font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
