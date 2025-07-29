import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobService } from "../api_service/jobs";

export default function ApplyRedirect() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await jobService.getJobById(id);
        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchJob();
    } else {
      setError("Invalid job ID");
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    
    try {
      if (!coverLetter.trim()) {
        throw new Error("Cover letter is required");
      }
      
      const formData = new FormData();
      formData.append("coverLetter", coverLetter);
      if (resume) formData.append("resume", resume);

      await jobService.applyForJob(id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Application submitted successfully!");
      navigate("/applications"); 
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: Add file validation here (size, type, etc.)
      setResume(file);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Apply for {job?.title}</h2>
      <p className="text-gray-600 mb-6">{job?.company} - {job?.location}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-3 rounded"
          rows="5"
          placeholder="Write your cover letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit Application
        </button>
      </form>
    </section>
  );
}
