import React from "react";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/apply/${job.id}`);
  };

  return (
    <article className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between p-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
        <p className="text-gray-600 mt-1">{job.company}</p>
        <p className="text-gray-500 text-sm mt-1">{job.location}</p>
      </div>
      <button
        className="mt-6 bg-[#177245] text-white px-5 py-2 rounded-full hover:bg-green-700 transition w-full focus:outline-none focus:ring-2 focus:ring-[#177245]"
        onClick={handleApply}
        aria-label={`Apply for the ${job.title} position`}
      >
        Apply Now
      </button>
    </article>
  );
}
