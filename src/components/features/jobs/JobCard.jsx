// src/components/features/jobs/JobCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

export default function JobCard({ job }) {
  console.log('JobCard received job:', job);
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const handleViewDetails = () => navigate(`/jobs/${job.id}`);

  const handleApplyNow = (e) => {
    e.stopPropagation(); // Prevent triggering handleViewDetails
    if (!user) {
      navigate(`/signin?redirect=/jobs/${job.id}/apply`);
    } else {
      navigate(`/jobs/${job.id}/apply`);
    }
  };

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
      <div className="flex justify-start mt-4">
        <button
          onClick={handleApplyNow}
          className="inline-block bg-[#177245] text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
