import React, { useState } from "react";
import { postJob, getApplicants, approveJob, rejectJob } from "../api/admin";

export default function AdminDashboard() {
  const [jobForm, setJobForm] = useState({ title: "", company: "", location: "" });
  const [message, setMessage] = useState("");
  const [jobId, setJobId] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    try {
      await postJob(jobForm);
      setMessage("Job posted successfully!");
    } catch {
      setError("Failed to post job.");
    }
  };

  const handleGetApplicants = async () => {
    setError(null);
    setApplicants([]);
    try {
      const data = await getApplicants(jobId);
      setApplicants(data);
    } catch {
      setError("Failed to fetch applicants.");
    }
  };

  const handleApprove = async () => {
    setError(null);
    setMessage("");
    try {
      await approveJob(jobId);
      setMessage("Job approved.");
    } catch {
      setError("Failed to approve job.");
    }
  };

  const handleReject = async () => {
    setError(null);
    setMessage("");
    try {
      await rejectJob(jobId);
      setMessage("Job rejected.");
    } catch {
      setError("Failed to reject job.");
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <form onSubmit={handlePostJob} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobForm.title}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={jobForm.company}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={jobForm.location}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 w-full"
          required
        />
        <button type="submit" className="bg-[#177245] text-white px-5 py-2 rounded-full w-full">
          Post Job
        </button>
      </form>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">View Applicants</h2>
        <input
          type="text"
          placeholder="Job ID"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full mb-2"
        />
        <button onClick={handleGetApplicants} className="bg-blue-600 text-white px-4 py-2 rounded-full mr-2">
          Get Applicants
        </button>
        <button onClick={handleApprove} className="bg-green-600 text-white px-4 py-2 rounded-full mr-2">
          Approve Job
        </button>
        <button onClick={handleReject} className="bg-red-600 text-white px-4 py-2 rounded-full">
          Reject Job
        </button>
        {applicants.length > 0 && (
          <ul className="mt-4 space-y-2">
            {applicants.map((app) => (
              <li key={app.id} className="border rounded p-3">
                <div>Name: {app.name}</div>
                <div>Email: {app.email}</div>
                <div>Status: {app.status}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </section>
  );
}
