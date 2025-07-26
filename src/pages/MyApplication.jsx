import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobApplications = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
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

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleBack = () => {
    window.location.href = "http://localhost:5173/dashboard";
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
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

  const applications = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Innovators Inc.",
      description: "We are looking for a passionate Software Engineer to design, develop and install software solutions.",
      requirements: "Bachelor's Degree in Computer Science, 2+ years of experience in software development.",
      salary: "KES 150,000 - KES 200,000",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "Mid-level",
      skills: ["JavaScript", "React", "Node.js"]
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Global Solutions Co.",
      description: "Lead cross-functional teams to deliver products that align with our company's vision.",
      requirements: "Bachelor's Degree, 3+ years experience as a Product Manager.",
      salary: "KES 180,000 - KES 250,000",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "Senior",
      skills: ["Product Strategy", "Agile", "Market Research"]
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Data Insights Ltd.",
      description: "Analyze data and provide actionable insights to improve business performance.",
      requirements: "Degree in Statistics, strong SQL and Python skills.",
      salary: "KES 100,000 - KES 140,000",
      location: "Mombasa, Kenya",
      type: "Contract",
      experience: "Entry-level",
      skills: ["SQL", "Python", "Data Visualization"]
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Creative Minds Studio",
      description: "Design user-centered solutions for our web and mobile applications.",
      requirements: "Proven experience in UX Design, portfolio of design projects.",
      salary: "KES 120,000 - KES 160,000",
      location: "Nairobi, Kenya",
      type: "Full-time",
      experience: "Mid-level",
      skills: ["Figma", "User Research", "Prototyping"]
    },
    {
      id: 5,
      title: "Marketing Specialist",
      company: "Marketing Masters Agency",
      description: "Develop marketing strategies and campaigns for local and international markets.",
      requirements: "Degree in Marketing or related field, 2+ years experience.",
      salary: "KES 90,000 - KES 130,000",
      location: "Kisumu, Kenya",
      type: "Part-time",
      experience: "Mid-level",
      skills: ["Digital Marketing", "Content Creation", "SEO"]
    }
  ];

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
            <h2 className="text-[#0e1b13] text-lg font-bold leading-tight tracking-[-0.015em]">Recruit Connect</h2>
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
              <p className="text-[#0d1c13] tracking-light text-[32px] font-bold leading-tight min-w-72">Jobs</p>
            </div>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#cee8d9] bg-[#f8fcfa]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#f8fcfa]">
                      <th className="px-4 py-3 text-left text-[#0d1c13] w-[400px] text-sm font-medium leading-normal">Job title</th>
                      <th className="px-4 py-3 text-left text-[#0d1c13] w-[400px] text-sm font-medium leading-normal">Company</th>
                      <th className="px-4 py-3 text-left text-[#0d1c13] w-60 text-[#499c6c] text-sm font-medium leading-normal">View application</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <React.Fragment key={app.id}>
                        <tr className="border-t border-t-[#cee8d9]">
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#0d1c13] text-sm font-normal leading-normal">
                            {app.title}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#499c6c] text-sm font-normal leading-normal">{app.company}</td>
                          <td className="h-[72px] px-4 py-2 w-60 relative">
                            <button 
                              className="text-[#499c6c] text-sm font-bold leading-normal tracking-[0.015em]" 
                              onClick={() => toggleDropdown(app.id)}
                            >
                              {openDropdown === app.id ? 'Hide details' : 'View details'}
                            </button>
                          </td>
                        </tr>
                        {openDropdown === app.id && (
                          <tr>
                            <td colSpan="3" className="p-4 bg-white border-t border-[#cee8d9]">
                              <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                  <h3 className="text-xl font-bold text-[#0d1c13]">{app.title}</h3>
                                  <button 
                                    onClick={() => toggleSaveJob(app.id)}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-md ${savedJobs.includes(app.id) ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}
                                  >
                                    <svg 
                                      xmlns="http://www.w3.org/2000/svg" 
                                      width="16" 
                                      height="16" 
                                      viewBox="0 0 24 24" 
                                      fill={savedJobs.includes(app.id) ? "currentColor" : "none"} 
                                      stroke="currentColor" 
                                      strokeWidth="2" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round"
                                    >
                                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                    </svg>
                                    {savedJobs.includes(app.id) ? 'Saved' : 'Save'}
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-[#0d1c13] text-sm"><strong>Job Description:</strong> {app.description}</p>
                                    <p className="text-[#0d1c13] text-sm mt-2"><strong>Requirements:</strong> {app.requirements}</p>
                                    <p className="text-[#0d1c13] text-sm mt-2"><strong>Job Type:</strong> {app.type}</p>
                                    <p className="text-[#0d1c13] text-sm mt-2"><strong>Experience Level:</strong> {app.experience}</p>
                                  </div>
                                  <div>
                                    <p className="text-[#0d1c13] text-sm"><strong>Salary Range:</strong> {app.salary}</p>
                                    <p className="text-[#0d1c13] text-sm mt-2"><strong>Location:</strong> {app.location}</p>
                                    <p className="text-[#0d1c13] text-sm mt-2"><strong>Key Skills:</strong> {app.skills.join(', ')}</p>
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
                                        onClick={() => handleSubmitApplication(app.id)}
                                        className="w-full bg-[#06823a] text-white py-2 px-4 rounded-md hover:bg-[#056530] transition-colors"
                                      >
                                        Submit Application
                                      </button>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplications;