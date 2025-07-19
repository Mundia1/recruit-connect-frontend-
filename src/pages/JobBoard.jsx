import React, { useState, useEffect } from "react";
import { getJobs } from "../api/jobs";
import { Search } from "lucide-react";

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (locationFilter ? job.location.toLowerCase().includes(locationFilter) : true) &&
      (jobTypeFilter ? job.title.toLowerCase().includes(jobTypeFilter) : true)
    );
  });

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
            className="border border-gray-300 rounded-full pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#177245]"
          />
        </div>

        {/* Location Filter */}
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#177245]"
        >
          <option value="">All Locations</option>
          <option value="kenya">Kenya</option>
          <option value="tanzania">Tanzania</option>
          <option value="rwanda">Rwanda</option>
          <option value="uganda">Uganda</option>
        </select>

        {/* Job Type Filter */}
        <select
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#177245]"
        >
          <option value="">Job Type</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="designer">Designer</option>
          <option value="data">Data</option>
        </select>
      </div>

      {/* Jobs Grid with loading and error states */}
      {loading ? (
        <p className="text-gray-600 mt-6 text-center">Loading jobs...</p>
      ) : error ? (
        <p className="text-red-600 mt-6 text-center">{error}</p>
      ) : filteredJobs.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600 mt-1">{job.company}</p>
              <p className="text-gray-500 text-sm mt-1">{job.location}</p>
              <button className="mt-6 bg-[#177245] text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-6 text-center">No jobs match your search.</p>
      )}
    </section>
  );
}
