import React from "react";
import { jobs } from "../api/jobs";

export default function JobBoard() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Job Board</h1>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2"
        />
        <select className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4">
          <option value="">All Locations</option>
          <option value="kenya">Kenya</option>
          <option value="tanzania">Tanzania</option>
          <option value="rwanda">Rwanda</option>
          <option value="uganda">Uganda</option>
        </select>
        <select className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/4">
          <option value="">Job Type</option>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <button className="mt-4 bg-[#177245] text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
