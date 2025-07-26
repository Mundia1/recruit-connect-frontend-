import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { authService } from "../api/index";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", first_name: "", last_name: "" });
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
      first_name: formData.get("name").split(" ")[0],
      last_name: formData.get("name").split(" ")[1],
      role: selectedRole || "job_seeker"
    };

    try {
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      const userData = {
        email: form.email,
        password: form.password,
        first_name: form.first_name,
        last_name: form.last_name,
        password_confirmation: form.confirmPassword, // Or password_confirm depending on backend
      };
      await authService.register(userData);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 mt-10">
          <h2 className="text-3xl font-bold text-center text-[#177245] mb-6">
            Create Account
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleRoleClick("job_seeker")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  selectedRole === "job_seeker"
                    ? "bg-[#177245] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>👤</span>
                <span>I'm a Job Seeker</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleClick("employer")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  selectedRole === "employer"
                    ? "bg-[#177245] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>🏢</span>
                <span>I'm an Employer</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#177245] text-white py-2 rounded-lg"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-[#177245] font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
