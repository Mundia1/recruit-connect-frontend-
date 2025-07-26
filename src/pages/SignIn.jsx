import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { authService } from "../api/index";
import { useAuthContext } from "../context/AuthContext";

export default function SignIn() {
  const { login } = useAuthContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    

    try {
      
      const { user, access_token, refresh_token } = await authService.login(form.email, form.password);
      
      
      
      if (!user) {
        const error = new Error('Login failed - no user data');
        
        throw error;
      }
      
      // Check if email contains 'admin' for admin access
      const isAdmin = form.email.toLowerCase().includes('admin');
      const userRole = isAdmin ? 'admin' : 'job_seeker';
      
      
      
      // Store tokens first
      
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      
      // Create user data with the determined role
      const userData = {
        ...user,
        role: userRole,
        loggedIn: true,
        email: form.email
      };
      
      
      
      // Update auth context
      login(
        { 
          accessToken: access_token, 
          refreshToken: refresh_token 
        }, 
        userData
      );
      
      const redirectPath = userRole === 'admin' ? '/admin/dashboard' : from;
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
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
            Sign In
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              autoComplete="email"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#177245] text-white py-2 rounded-lg"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#177245] font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
