import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { applyForJob } from "../../../api/application";

export default function FeaturedJobs({ jobs }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!jobs || jobs.length === 0) return null;

  // Pick first 3 jobs as featured
  const featuredJobs = jobs.slice(0, 3);

  const handleApply = async () => {
    setError("");
    setLoading(true);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("recruit_connect_user"));
    if (!token) {
      navigate("/signin");
      return;
    }
    try {
      await applyForJob(token, user.id, selectedJob.id);
      setLoading(false);
      setModalOpen(false);
      navigate("/dashboard"); // or "/my-applications"
    } catch (err) {
      setLoading(false);
      setError("Failed to apply for job.");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Jobs
      </h2>

      {/* Job Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-y-auto pr-2">
        {featuredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <button
              className="mt-4 bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition block w-full"
              onClick={() => {
                setSelectedJob(job);
                setModalOpen(true);
              }}
            >
              View Details & Apply
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
            <p className="text-gray-700 mb-2">
              {selectedJob.company} &mdash; {selectedJob.location}
            </p>
            <div className="mb-4">
              <h4 className="font-semibold">Description</h4>
              <p className="text-gray-600">{selectedJob.description}</p>
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              className="bg-[#177245] text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition w-full"
              onClick={handleApply}
              disabled={loading}
            >
              {loading ? "Applying..." : "Apply Now"}
            </button>
          </div>
        </div>
      )}

      {/* View All Jobs */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/jobs")}
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          View All Jobs
        </button>
      </div>
    </section>
  );
}
