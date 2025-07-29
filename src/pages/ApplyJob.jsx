import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { applyForJob } from "../api/application";

export default function ApplyJob() {
  const { jobId } = useParams();
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      setMessage("You must be signed in to apply.");
      return;
    }
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("job_posting_id", jobId);
    formData.append("cover_letter", coverLetter);
    if (resume) formData.append("resume", resume);

    try {
      await applyForJob(token, user.id, jobId, formData);
      setMessage("Application submitted!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch {
      setMessage("Failed to apply. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Apply for this Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={e => setCoverLetter(e.target.value)}
          className="w-full border rounded p-3"
          rows={5}
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => setResume(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit Application
        </button>
        {message && <div className="text-center mt-2">{message}</div>}
      </form>
    </div>
  );
}