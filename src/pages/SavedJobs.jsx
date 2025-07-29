import React, { useState, useEffect } from 'react';
import { jobService } from '../api_service/jobs';

const SavedJobs = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const response = await jobsService.getSavedJobs();
        setSavedJobs(response.data || []);
      } catch (err) {
        setError('Failed to fetch saved jobs.');
        console.error('Error fetching saved jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  // Redirects the user to the dashboard page when the "Back" button is clicked
  const handleBack = () => {
    window.location.href = "/dashboard";
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleApply = (jobId) => {
    alert(`Application submitted for job ID: ${jobId}`);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7f3ec] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0e1b13]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#0e1b13] text-lg font-bold leading-tight tracking-[-0.015em]">Recruit Connect Kenya</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "/dashboard"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">Profile</p>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "/"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">Home</p>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "/job-applications"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">My Applications</p>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "/saved-jobs"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">Saved Jobs</p>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "/settings"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">Settings</p>
              </div>
            </div>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://imgs.search.brave.com/gXeZ5DUJxGMbr6_miepFf7Y2swQNqil9wU6LYVEacL8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI0LzUvMTYv/ZTU0MDg5ZjMtZDdi/YS00OGZhLTg5Yzgt/ZTIwNDA3YTI3MTVk/LmpwZw")' }}
            ></div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex justify-between gap-2 px-4 py-3">
              <div className="flex gap-2">
                <button className="p-2 text-[#0d1c13]" onClick={handleBack}>
                  <div className="text-[#0d1c13]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#0d1c13] tracking-light text-[32px] font-bold leading-tight min-w-72">Saved jobs</p>
            </div>
            
            {savedJobs.map((job) => (
              <div key={job.id} className="flex flex-col bg-[#f8fcfa] px-4 py-2 border-b border-[#cee8d9]">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col justify-center">
                    <p className="text-[#0d1c13] text-base font-medium leading-normal line-clamp-1">{job.title}</p>
                    <p className="text-[#499c6c] text-sm font-normal leading-normal line-clamp-2">{job.company} • {job.location} • {job.type}</p>
                  </div>
                  <div className="shrink-0 relative">
                    <button
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#e7f4ec] text-[#0d1c13] text-sm font-medium leading-normal w-fit"
                      onClick={() => toggleDropdown(job.id)}
                    >
                      <span className="truncate">View details</span>
                    </button>
                  </div>
                </div>
                
                {openDropdown === job.id && (
                  <div className="mt-3 p-4 bg-white rounded-lg border border-[#cee8d9]">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[#0d1c13] font-medium">Job Description:</p>
                        <p className="text-[#499c6c] mt-1">{job.description}</p>
                      </div>
                      <div>
                        <p className="text-[#0d1c13] font-medium">Requirements:</p>
                        <p className="text-[#499c6c] mt-1">{job.requirements}</p>
                      </div>
                      <div>
                        <p className="text-[#0d1c13] font-medium">Salary Range:</p>
                        <p className="text-[#499c6c] mt-1">{job.salary}</p>
                      </div>
                      <div>
                        <p className="text-[#0d1c13] font-medium">Location:</p>
                        <p className="text-[#499c6c] mt-1">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <button 
                        className="px-6 py-2 bg-[#06823a] text-white rounded-full text-sm font-medium hover:bg-[#056830] transition-colors w-40"
                        onClick={() => handleApply(job.id)}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;