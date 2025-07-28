import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const API_BASE = import.meta.env.VITE_API_URL; 

export default function JobDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API_BASE}/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10 text-gray-600">Loading job details...</div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10 text-red-500">{error}</div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10 text-gray-500">Job not found.</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-gray-700 mt-6 leading-relaxed">{job.description}</p>

        <div className="mt-8">
          <button
            onClick={() => navigate(`/jobs/${job._id}/apply`)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Apply Now
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
