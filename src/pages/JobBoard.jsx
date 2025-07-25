import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JobCard from "../components/features/jobs/JobCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://recruitconnectbackend-jnuk.onrender.com/api";

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/jobs/")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-10 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Job Board</h1>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={22} />
          <input
            type="text"
            placeholder="Search for jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-full pl-12 pr-4 py-3 w-full"
          />
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
        <div className="text-center py-12">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">No jobs found.</div>
      ) : (
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
        )}
      </section>
      <Footer />
    </>
  );
}
