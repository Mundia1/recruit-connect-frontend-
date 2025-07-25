// src/components/features/jobs/JobCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const handleViewDetails = () => navigate(`/jobs/${job._id}`);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
      <h3
        className="text-xl font-semibold text-gray-800 cursor-pointer hover:underline"
        onClick={handleViewDetails}
      >
        {job.title}
      </h3>
      <p className="text-gray-600 mt-2">{job.company}</p>
      <p className="text-gray-500 text-sm mt-1">{job.location}</p>
      <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
      <button
        onClick={handleViewDetails}
        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        View Details
      </button>
    </div>
  );
}
