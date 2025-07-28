// src/components/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500 text-sm">{job.location}</p>

      <Link
        to={`/apply/${job._id || job.id}`}
        aria-label={`Apply for ${job.title}`}
        className="mt-4 inline-block bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Apply Now
      </Link>
    </div>
  );
}
