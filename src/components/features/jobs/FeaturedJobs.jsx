import React from "react";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Safaricom PLC",
    location: "Nairobi, Kenya",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "M-Pesa Africa",
    location: "Dar es Salaam, Tanzania",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "BRCK",
    location: "Nairobi, Kenya",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Twiga Foods",
    location: "Nairobi, Kenya",
  },
  {
    id: 5,
    title: "Full Stack Developer",
    company: "Cellulant",
    location: "Lagos, Nigeria (Remote)",
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "iHub",
    location: "Kigali, Rwanda",
  },
  {
    id: 7,
    title: "Digital Marketing Specialist",
    company: "Andela",
    location: "Nairobi, Kenya",
  },
  {
    id: 8,
    title: "Cloud Engineer",
    company: "Equity Bank",
    location: "Nairobi, Kenya",
  },
  {
    id: 9,
    title: "DevOps Engineer",
    company: "KCB Bank Group",
    location: "Nairobi, Kenya",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Jobs
      </h2>

      {/* Scrollable Job Cards Grid */}
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

      {/* View All Jobs Button */}
      <div className="mt-8 text-center">
        <button className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
          View All Jobs
        </button>
      </div>
    </section>
  );
}
