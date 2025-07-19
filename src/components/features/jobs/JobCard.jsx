import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
        <p className="text-gray-600 mt-1">{job.company}</p>
        <p className="text-gray-500 text-sm mt-1">{job.location}</p>
      </div>
      <button className="mt-6 bg-[#177245] text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
        Apply Now
      </button>
    </div>
  );
}