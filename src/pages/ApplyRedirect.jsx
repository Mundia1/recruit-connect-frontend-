import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jobs } from "../api/jobs"; 
import Navbar from "../components/layout/Navbar"; 

export default function ApplyRedirect() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const job = jobs.find((j) => j.id === parseInt(jobId));

  return (
    <>
      {/*Navbar */}
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 pt-20">
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {job
              ? `You're applying for ${job.title}`
              : "Create an account or sign in to apply"}
          </h1>

          {job && (
            <p className="text-lg text-gray-600 mb-6">
              at <span className="font-semibold">{job.company}</span>
            </p>
          )}

          <p className="text-gray-500 mb-8">
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
    </>
  );
}
