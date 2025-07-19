import React from "react";
import { Link } from "react-router-dom";
import { jobs } from "../../../api/jobs";

export default function FeaturedJobs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Jobs
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-y-auto pr-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <button className="mt-4 bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/jobs"
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          View All Jobs
        </Link>
      </div>
    </section>
  );
}
