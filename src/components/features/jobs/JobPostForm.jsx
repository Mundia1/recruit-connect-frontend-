import React, { useState } from "react";
import { createJob } from "../../api/api";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Convert requirements string to array
      const payload = {
        ...formData,
        requirements: formData.requirements.split(",").map((req) => req.trim()),
      };

      await createJob(payload);
      setMessage("Job posted successfully!");
      setFormData({
        title: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
        description: "",
        requirements: "",
      });
    } catch (err) {
      console.error("Error posting job:", err);
      setMessage("Failed to post job. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary (e.g., $60,000/year)"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
        <input
          type="text"
          name="jobType"
          placeholder="Job Type (e.g., Full-time, Part-time)"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          rows="4"
          required
        />
        <textarea
          name="requirements"
          placeholder="Requirements (comma-separated)"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          rows="3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition w-full"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
}
