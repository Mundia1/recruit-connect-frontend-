import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jobs as jobsApi } from "../api/index";
import Navbar from "../components/layout/Navbar";

export default function ApplyRedirect() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobsApi
      .getById(jobId)
      .then((data) => setJob(data.data || data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [jobId]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 pt-20 flex flex-col items-center">
        <div className="w-full max-w-lg mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#177245] hover:text-green-700 font-semibold"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
          {loading ? (
            <div>Loading...</div>
          ) : job ? (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                You're applying for {job.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                at <span className="font-semibold">{job.company}</span>
              </p>
              <p className="text-gray-500 mb-8">
                You need an account to apply for this job.
              </p>
            </>
          ) : (
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Job not found
            </h1>
          )}

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
