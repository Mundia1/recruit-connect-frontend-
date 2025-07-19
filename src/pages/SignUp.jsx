import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await signUp(form);
      setSuccess(true);
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <section className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Registration successful! Redirecting...</p>}
        <button type="submit" className="bg-[#177245] text-white px-5 py-2 rounded-full w-full">
          Sign Up
        </button>
      </form>
    </section>
  );
}
