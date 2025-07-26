import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: null,
    portfolioUrl: '',
    linkedInUrl: '',
    salaryExpectations: '',
    noticePeriod: ''
  });
  const [savedJobs, setSavedJobs] = useState([
    { 
      id: 1,
      title: 'Senior Product Manager', 
      company: 'Tech Innovations Africa',
      location: 'Nairobi County',
      type: 'Remote · Full-time',
      salary: 'KSH 250,000 - 350,000',
      description: 'Lead product development from conception to launch, working with cross-functional teams to deliver innovative solutions for the African market.',
      requirements: '5+ years product management experience, strong analytical skills, technical background preferred',
      skills: ["Product Strategy", "Agile", "Market Research"]
    },
    { 
      id: 2,
      title: 'Senior Software Engineer', 
      company: 'Safari Developers Ltd',
      location: 'Mombasa County',
      type: 'Hybrid · Full-time',
      salary: 'KSH 300,000 - 400,000',
      description: 'Design and implement scalable software solutions for East African clients, mentor junior engineers, and collaborate on system architecture.',
      requirements: '7+ years software development, expertise in JavaScript/TypeScript, experience with cloud platforms',
      skills: ["JavaScript", "TypeScript", "Cloud Platforms"]
    }
  ]);

  const handleBack = () => {
    window.location.href = "http://localhost:5173/dashboard";
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const handleFileChange = (e) => {
    setApplicationForm({
      ...applicationForm,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleInputChange = (e) => {
    setApplicationForm({
      ...applicationForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitApplication = (jobId) => {
    console.log('Submitting application for job:', jobId, applicationForm);
    alert(`Application submitted for job ${jobId}!`);
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
                onClick={() => window.location.href = "http://localhost:5173/dashboard"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">Profile</p>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "http://localhost:5173/"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">Home</p>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "http://localhost:5173/job-applications"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">My Applications</p>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "http://localhost:5173/saved-jobs"}
              >
                <p className="text-[#0e1b13] text-sm font-medium leading-normal">Saved Jobs</p>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
                onClick={() => window.location.href = "http://localhost:5173/settings"}
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
            
            {savedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#499c6c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <p className="text-[#499c6c] text-lg mt-4">No saved jobs yet</p>
                <p className="text-[#0d1c13] text-sm mt-2">Save jobs from the job listings to view them here</p>
              </div>
            ) : (
              savedJobs.map((job) => (
                <div key={job.id} className="flex flex-col bg-[#f8fcfa] px-4 py-2 border-b border-[#cee8d9]">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-center">
                      <p className="text-[#0d1c13] text-base font-medium leading-normal line-clamp-1">{job.title}</p>
                      <p className="text-[#499c6c] text-sm font-normal leading-normal line-clamp-2">{job.company} • {job.location} • {job.type}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#e7f4ec] text-[#0d1c13] text-sm font-medium leading-normal w-fit"
                        onClick={() => toggleDropdown(job.id)}
                      >
                        <span className="truncate">{openDropdown === job.id ? 'Hide details' : 'View details'}</span>
                      </button>
                      <button 
                        onClick={() => handleRemoveSavedJob(job.id)}
                        className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 text-gray-600"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {openDropdown === job.id && (
                    <div className="mt-3 p-4 bg-white rounded-lg border border-[#cee8d9]">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[#0d1c13] text-sm"><strong>Job Description:</strong> {job.description}</p>
                            <p className="text-[#0d1c13] text-sm mt-2"><strong>Requirements:</strong> {job.requirements}</p>
                            <p className="text-[#0d1c13] text-sm mt-2"><strong>Job Type:</strong> {job.type}</p>
                          </div>
                          <div>
                            <p className="text-[#0d1c13] text-sm"><strong>Salary Range:</strong> {job.salary}</p>
                            <p className="text-[#0d1c13] text-sm mt-2"><strong>Location:</strong> {job.location}</p>
                            {job.skills && (
                              <p className="text-[#0d1c13] text-sm mt-2"><strong>Key Skills:</strong> {job.skills.join(', ')}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-6 border-t pt-4">
                          <h3 className="text-lg font-bold text-[#0d1c13] mb-4">Apply for this Position</h3>
                          <form className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">Full Name</label>
                              <input 
                                type="text" 
                                name="fullName"
                                value={applicationForm.fullName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">Email</label>
                              <input 
                                type="email" 
                                name="email"
                                value={applicationForm.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">Phone Number</label>
                              <input 
                                type="tel" 
                                name="phone"
                                value={applicationForm.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">Salary Expectations</label>
                              <input 
                                type="text" 
                                name="salaryExpectations"
                                value={applicationForm.salaryExpectations}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">Resume (PDF, DOC, DOCX, TXT)</label>
                              <input 
                                type="file" 
                                name="resume"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                                accept=".pdf,.doc,.docx,.txt"
                                required
                              />
                              <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX, TXT</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">Cover Letter (PDF, DOC, DOCX, TXT)</label>
                              <input 
                                type="file" 
                                name="coverLetter"
                                onChange={handleFileChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                                accept=".pdf,.doc,.docx,.txt"
                              />
                              <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX, TXT</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">Portfolio URL</label>
                              <input 
                                type="url" 
                                name="portfolioUrl"
                                value={applicationForm.portfolioUrl}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">LinkedIn Profile</label>
                              <input 
                                type="url" 
                                name="linkedInUrl"
                                value={applicationForm.linkedInUrl}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-[#0d1c13] mb-1">Notice Period</label>
                              <select 
                                name="noticePeriod"
                                value={applicationForm.noticePeriod}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-[#cee8d9] rounded-md"
                              >
                                <option value="">Select</option>
                                <option value="Immediately">Immediately</option>
                                <option value="1 week">1 week</option>
                                <option value="2 weeks">2 weeks</option>
                                <option value="1 month">1 month</option>
                                <option value="2 months">2 months</option>
                                <option value="3 months">3 months</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <button 
                                type="button"
                                onClick={() => handleSubmitApplication(job.id)}
                                className="w-full bg-[#06823a] text-white py-2 px-4 rounded-md hover:bg-[#056530] transition-colors"
                              >
                                Submit Application
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;