import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, getCurrentUser } from "../api/auth";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null); // "admin" or "jobseeker"

  const user = getCurrentUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signIn(form.email, form.password);
      localStorage.setItem("token", result.access_token);
      localStorage.setItem("user", JSON.stringify(result.user));
      // Redirect employer to employer dashboard
      if (result.user.role === "employer") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 mt-10">
          <h2 className="text-3xl font-bold text-center text-[#177245] mb-6">
            Sign In
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
          )}
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                selectedRole === "admin"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleRoleClick("admin")}
            >
              I'm Admin
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${
                selectedRole === "jobseeker"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleRoleClick("jobseeker")}
            >
              I'm a Jobseeker
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#177245]"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#177245]"
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
            <Link
              to="/signup"
              className="text-[#177245] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}