import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applicationService } from "../../../api_service/applications";
import { jobService } from "../../../api_service/jobs";
import { useAuthContext } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function ApplyJob() {
  const { id } = useParams(); // jobId from URL
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const handleApply = async () => {
    setSubmitting(true);
    if (!user) {
      toast.error("You must be logged in to apply.");
      setSubmitting(false);
      return;
    }

    // Open a new window immediately to bypass pop-up blockers
    const newWindow = window.open('about:blank', '_blank');
    if (!newWindow) {
      toast.error('Pop-up blocked! Please allow pop-ups for this site.');
      setSubmitting(false);
      return;
    }

    const jobPostingId = Number(id);
    const userId = Number(user.id);
    console.log('Submitting application with:', { job_posting_id: jobPostingId, user_id: userId });

    try {
      const response = await applicationService.submitApplication({ job_posting_id: jobPostingId, user_id: userId });
      console.log('Backend response:', response);
      if (response.google_form_url) {
        newWindow.location.href = response.google_form_url;
      } else {
        console.error('Google Form URL not found in backend response.', response);
        toast.error('Failed to get Google Form URL.');
        newWindow.close(); // Close the blank window if no URL
      }
      toast.success("Application submitted successfully!");
      setTimeout(() => navigate("/applications"), 2000); // Redirect after success
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
      newWindow.close(); // Close the blank window on error
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

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p className="text-gray-700">You are about to apply for the position of <strong>{job.title}</strong> at <strong>{job.company_name}</strong>. Click the button below to proceed to the application form.</p>
        <button
          onClick={handleApply}
          disabled={submitting}
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400 w-full"
        >
          {submitting ? "Submitting..." : "Proceed to Application Form"}
        </button>
      </div>
    </div>
  );
}