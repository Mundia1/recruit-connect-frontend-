import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../api_service/jobs';
import { applicationService } from '../api_service/applications';
import { toast } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await jobService.getJobById(jobId);
        setJob(response.data);
      } catch (error) {
        toast.error('Failed to load job details');
        navigate('/jobs');
      }
    };

    fetchJob();
  }, [jobId, navigate]);

  const handleApply = async () => {
    // Open a new window immediately to bypass pop-up blockers
    const newWindow = window.open('about:blank', '_blank');
    if (!newWindow) {
      toast.error('Pop-up blocked! Please allow pop-ups for this site.');
      return;
    }

    const jobPostingId = Number(jobId);
    const userId = Number(user.id);
    console.log('Submitting application with:', { job_posting_id: jobPostingId, user_id: userId });

    try {
      const response = await applicationService.submitApplication({ job_posting_id: jobPostingId, user_id: userId });  // save in DB
      console.log('Backend response:', response);
      if (response.google_form_url) {
        newWindow.location.href = response.google_form_url;
      } else {
        console.error('Google Form URL not found in backend response.', response);
        toast.error('Failed to get Google Form URL.');
        newWindow.close(); // Close the blank window if no URL
      }
    } catch (err) {
      toast.error('Application failed.');
      newWindow.close(); // Close the blank window on error
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600 text-lg">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-2"><strong>Company:</strong> {job.company_name}</p>
      <p className="text-gray-700 mb-2"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700 mb-2"><strong>Job Type:</strong> {job.job_type}</p>
      <p className="text-gray-700 mb-4"><strong>Description:</strong></p>
      <div className="text-gray-800 whitespace-pre-line mb-4">{job.description}</div>

      {/* Replace any old form with just this */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleApply}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Apply Now
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default JobDetails;