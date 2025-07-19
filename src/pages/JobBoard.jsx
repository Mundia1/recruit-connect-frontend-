import React, { useState } from "react";
import { jobs } from "../api/jobs";
import { Search } from "lucide-react";
import JobCard from "../components/features/jobs/JobCard";

const PAGE_SIZE = 6;

export default function JobBoard() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Helper to get job type from title
  const getJobType = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes("frontend")) return "frontend";
    if (lower.includes("backend")) return "backend";
    if (lower.includes("designer") || lower.includes("ui/ux")) return "designer";
    if (lower.includes("data")) return "data";
    return "";
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter)
      : true;
    const matchesType = jobTypeFilter
      ? getJobType(job.title) === jobTypeFilter
      : true;
    return matchesSearch && matchesLocation && matchesType;
  });

  const jobsToShow = filteredJobs.slice(0, visibleCount);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Explore Jobs
      </h1>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center sticky top-0 z-10">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-full pl-10 pr-4 py-2 w-full font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#177245] transition"
          />
        </div>

        {/* Location Filter */}
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-1/4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#177245] transition"
        >
          <option value="">All Locations</option>
          <option value="kenya">Kenya</option>
          <option value="tanzania">Tanzania</option>
          <option value="rwanda">Rwanda</option>
          <option value="uganda">Uganda</option>
          <option value="nigeria">Nigeria</option>
        </select>

        {/* Job Type Filter */}
        <select
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-1/4 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#177245] transition"
        >
          <option value="">Job Type</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="designer">Designer</option>
          <option value="data">Data</option>
        </select>
      </div>

      {/* Jobs Grid */}
      {jobsToShow.length > 0 ? (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jobsToShow.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {visibleCount < filteredJobs.length && (
            <div className="flex justify-center mt-8">
              <button
                className="bg-[#177245] text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600 mt-6 text-center">No jobs match your search.</p>
      )}
    </section>
  );
}
