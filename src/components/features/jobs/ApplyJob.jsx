import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applicationService } from "../../../api_service/applications";
import { jobService } from "../../../api_service/jobs";
import { useAuthContext } from "../../../context/AuthContext";

export default function ApplyJob() {
  const { id } = useParams(); // jobId from URL
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    coverLetter: "",
    resume: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch Job Details for context
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await jobService.getJobById(id);
        setJob(res.data);
      } catch (err) {
        setError("Failed to load job details.");
        console.error('ApplyJob fetchJob error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle resume file upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  // ✅ Submit Application
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    console.log('Submitting application with:', {
      ...formData,
      userId: user?.id,
      jobId: id,
    });

    if (!user) {
      setMessage("❌ You must be logged in to apply.");
      setSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("job_posting_id", id);
      data.append("user_id", user.id);
      data.append("cover_letter", formData.coverLetter);
      if (formData.resume) {
        data.append("resume", formData.resume);
      }

      await applicationService.createApplication(data);
      setMessage("✅ Application submitted successfully!");
      setTimeout(() => navigate("/applications"), 2000); // Redirect after success
    } catch (err) {
      setMessage("❌ Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading job...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!job) return <div className="text-center text-gray-500 py-10">Job not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Apply for {job.title}
      </h1>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Cover Letter</label>
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            rows="4"
            placeholder="Write a short message..."
            className="w-full border px-4 py-2 rounded-lg focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 w-full"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}