import React from "react";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "CodeBase",
    location: "New York, USA",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignPro",
    location: "San Francisco, USA",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Jobs
      </h2>

      {/* Job Cards - Stacked Layout */}
      <div className="flex flex-col gap-6">
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
    </section>
  );
}
