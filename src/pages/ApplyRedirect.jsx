import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ApplyRedirect() {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Can be used later if needed

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create an account or sign in to apply
        </h1>
        <p className="text-gray-600 mb-6">
          You need an account to apply for this job.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#177245] text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Create Account
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
