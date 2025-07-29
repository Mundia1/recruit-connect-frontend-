// filepath: /home/userbrian/5/recruit-connect-frontend-/src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { resetPassword } from "../api/auth";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await resetPassword(email);
      setMessage("✅ Check your email for reset instructions.");
    } catch {
      setMessage("❌ Failed to send reset email. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Reset Password</h2>
        <p className="mb-6 text-gray-600 text-center">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#177245] transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#177245] text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          {message && (
            <div className="text-center mt-2 text-sm">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}