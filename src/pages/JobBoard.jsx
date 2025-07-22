import React, { useState } from "react";
import { jobs } from "../api/jobs";
import { Search } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JobCard from "../components/features/jobs/JobCard";
import { motion } from "framer-motion";

const PAGE_SIZE = 6;

// Featured Jobs (Pick first 3 from jobs for now)
const featuredJobs = jobs.slice(0, 3);

export default function JobBoard() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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
    <>
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <section className="bg-gray-50 py-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Job Board</h1>
        <p className="text-gray-600 mb-6">
          Explore a wide range of job opportunities tailored to your skills and interests.
          Find your next career move with us.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={22} />
          <input
            type="text"
            placeholder="Search for jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}

            className="border border-gray-300 rounded-full pl-12 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#177245] transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="Search for jobs"

          />
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Jobs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <p className="text-gray-500 text-sm mb-4">{job.location}</p>
              <span className="inline-block bg-[#177245] text-white px-3 py-1 rounded-full text-sm">
                Featured
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4">

         <div className="bg-white shadow-md rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center sticky top-16 z-10 dark:bg-gray-800">
          

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}

             className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-1/3 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#177245] transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="Filter by location"

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

            className="border border-gray-300 rounded-full px-4 py-2 w-full sm:w-1/3 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#177245] transition dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-label="Filter by job type" 
         >
            <option value="">Job Type</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="designer">Designer</option>
            <option value="data">Data</option>
          </select>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        {jobsToShow.length > 0 ? (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

              {jobsToShow.map((job, index) => (
              <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <JobCard job={job} />
                </motion.div>

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

      {/* Footer */}
      <Footer />
    </>
  );
}
