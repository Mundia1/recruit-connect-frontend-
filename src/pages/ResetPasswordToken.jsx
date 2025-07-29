import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPasswordToken() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        setMessage("✅ Password reset! Redirecting to sign in...");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setMessage("❌ " + (result.message || "Reset failed."));
      }
    } catch {
      setMessage("❌ Reset failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Set New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="New password"
            className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#177245] transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#177245] text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
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