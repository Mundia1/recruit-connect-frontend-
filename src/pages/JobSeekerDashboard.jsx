import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { jobService } from '../api_service';

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
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
            onClick={() => handleNavigation("/profile")}
          >
            <p className="text-[#0e1b13] text-sm font-medium leading-normal">Profile</p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
            onClick={() => handleNavigation("/")}
          >
            <p className="text-[#0e1b13] text-sm font-medium leading-normal">Home</p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
            onClick={() => handleNavigation("/job-applications")}
          >
            <p className="text-[#0e1b13] text-sm font-medium leading-normal">My Applications</p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
            onClick={() => handleNavigation("/saved-jobs")}
          >
            <p className="text-[#0e1b13] text-sm font-medium leading-normal">Saved Jobs</p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
            onClick={() => handleNavigation("/settings")}
          >
            <p className="text-[#0e1b13] text-sm font-medium leading-normal">Settings</p>
          </div>
        </div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: `url(${user?.avatar || 'https://via.placeholder.com/150'})`,
          }}
        ></div>
      </div>
    </header>
  );
};

const UserProfile = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: `${user?.first_name} ${user?.last_name}`,
    jobTitle: user?.job_title || '',
    avatar: user?.avatar || ''
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...user,
        name: formData.name,
        job_title: formData.jobTitle,
        avatar: avatarPreview
      };
      await onUpdate(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex p-4 @container">
      <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
        <div className="flex gap-4">
          <div className="relative">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
              style={{ backgroundImage: `url(${avatarPreview || 'https://via.placeholder.com/150'})` }}
            ></div>
            {isEditing && (
              <div className="absolute bottom-0 right-0">
                <label className="cursor-pointer bg-white rounded-full p-2 shadow-md">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                  </svg>
                </label>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-[#0e1b13] text-[22px] font-bold leading-tight tracking-[-0.015em] bg-transparent border-b border-[#cee8d9] mb-2"
                />
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Job Title"
                  className="text-[#4e976d] text-base font-normal leading-normal bg-transparent border-b border-[#cee8d9]"
                />
              </>
            ) : (
              <>
                <p className="text-[#0e1b13] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  {formData.name}
                </p>
                <p className="text-[#4e976d] text-base font-normal leading-normal">
                  {formData.jobTitle || 'Add your job title'}
                </p>
              </>
            )}
            <p className="text-[#4e976d] text-base font-normal leading-normal">
              Joined {new Date(user?.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          {isEditing ? (
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#06823a] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={handleSubmit}
            >
              <span className="truncate">Save</span>
            </button>
          ) : (
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7f3ec] text-[#0e1b13] text-sm font-bold leading-normal tracking-[0.015em]"
              onClick={() => setIsEditing(true)}
            >
              <span className="truncate">Edit Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const JobDetailsSection = ({ job, onApply }) => {
  if (!job) return null;

  return (
    <div className="px-4 py-3">
      <h2 className="text-[#0d1c13] text-[32px] font-bold leading-tight px-4 pb-3">Job Details</h2>
      <div className="bg-[#f8fcfa] p-6 rounded-lg border border-[#cee8d9]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{job.title}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Salary:</strong> {job.salary || 'Not specified'}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Type:</strong> {job.type || 'Not specified'}
        </p>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        <div className="mt-8">
          <button
            onClick={onApply}
            className="bg-[#06823a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#056830] transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

const JobListings = ({ jobs, onViewDetails, savedJobs, onToggleSavedJob }) => {
  return (
    <div className="px-4 py-3">
      <h2 className="text-[#0d1c13] text-[32px] font-bold leading-tight px-4 pb-3">Available Jobs</h2>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-[#f8fcfa] p-4 rounded-lg border border-[#cee8d9]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold cursor-pointer" onClick={() => onViewDetails(job)}>
                  {job.title}
                </h3>
                <p className="text-[#4e976d]">{job.company}</p>
                <p className="text-sm text-gray-600">{job.location}</p>
              </div>
              <button
                onClick={() => onToggleSavedJob(job)}
                className={`p-2 rounded-full ${savedJobs.some(savedJob => savedJob.id === job.id) ? 'text-[#06823a]' : 'text-gray-400'}`}
              >
                {savedJobs.some(savedJob => savedJob.id === job.id) ? 'Saved' : 'Save'}
              </button>
            </div>
            <button 
              onClick={() => onViewDetails(job)}
              className="mt-3 px-4 py-2 bg-[#06823a] text-white rounded-full text-sm"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const SavedJobsSection = ({ savedJobs, onViewDetails, onRemoveSavedJob }) => {
  return (
    <div className="px-4 py-3">
      <h2 className="text-[#0d1c13] text-[32px] font-bold leading-tight px-4 pb-3">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No saved jobs yet</p>
      ) : (
        <div className="grid gap-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-[#f8fcfa] p-4 rounded-lg border border-[#cee8d9]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold cursor-pointer" onClick={() => onViewDetails(job)}>
                    {job.title}
                  </h3>
                  <p className="text-[#4e976d]">{job.company}</p>
                  <p className="text-sm text-gray-600">{job.location}</p>
                </div>
                <button
                  onClick={() => onRemoveSavedJob(job.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <button 
                onClick={() => onViewDetails(job)}
                className="mt-3 px-4 py-2 bg-[#06823a] text-white rounded-full text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function JobSeekerDashboard() {
  const { user, updateUser } = useAuthContext();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'saved'
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Load saved jobs from localStorage and check URL for active tab
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(saved);
    
    if (location.pathname === '/saved-jobs') {
      setActiveTab('saved');
    }
  }, [location]);

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    try {
      updateUser(updatedData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
  };

  const handleApplyNow = (jobId) => {
    if (!user) {
      navigate(`/signin?redirect=/jobs/${jobId}/apply`);
    } else {
      navigate(`/jobs/${jobId}/apply`);
    }
  };

  const handleToggleSavedJob = (job) => {
    setSavedJobs(prev => {
      const isAlreadySaved = prev.some(savedJob => savedJob.id === job.id);
      let newSavedJobs;
      
      if (isAlreadySaved) {
        newSavedJobs = prev.filter(savedJob => savedJob.id !== job.id);
      } else {
        newSavedJobs = [...prev, job];
      }
      
      // Save to localStorage
      localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
      return newSavedJobs;
    });
  };

  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(prev => {
      const newSavedJobs = prev.filter(job => job.id !== jobId);
      localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
      return newSavedJobs;
    });
  };

  // Modified SidebarNav to handle navigation
  const SidebarNav = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
      if (path === '/saved-jobs') {
        setActiveTab('saved');
        setSelectedJob(null);
      } else if (path === '/') {
        setActiveTab('jobs');
        setSelectedJob(null);
        navigate(path);
      }
      else {
        navigate(path);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/profile")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">Profile</p>
      </div>
      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">Home</p>
      </div>
      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/job-applications")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">My Applications</p>
      </div>
        <div 
          className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" 
          onClick={() => handleNavigation('/saved-jobs')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"></path>
          </svg>
          <p className="text-[#0e1b13] text-sm font-medium leading-normal">Saved Jobs</p>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/settings")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,6,3.94,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">Settings</p>
      </div>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] group/design-root overflow-x-hidden">
      <ProfileHeader user={user} />
      <div className="gap-1 px-6 flex flex-1 justify-center py-5">
        {/* Sidebar Navigation */}
        <div className="layout-content-container flex flex-col w-8.0">
          <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#f8fcfa] p-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  style={{
                    backgroundImage: `url(${user?.avatar || 'https://via.placeholder.com/150'})`,
                  }}
                ></div>
                <h1 className="text-[#0e1b13] text-base font-medium leading-normal">
                  {user?.first_name} {user?.last_name}
                </h1>
              </div>
              <SidebarNav />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#0e1b13] tracking-light text-[32px] font-bold leading-tight">
                {selectedJob ? 'Job Details' : activeTab === 'jobs' ? 'User Profile' : 'Saved Jobs'}
              </p>
              <p className="text-[#4e976d] text-sm font-normal leading-normal">
                {selectedJob 
                  ? 'View and apply for this position' 
                  : activeTab === 'jobs' 
                    ? 'Browse available job opportunities' 
                    : 'Your saved job opportunities'}
              </p>
            </div>
            
            {!selectedJob && (
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`px-4 py-2 rounded-full ${activeTab === 'jobs' ? 'bg-[#06823a] text-white' : 'bg-[#e7f3ec] text-[#0e1b13]'}`}
                >
                  All Jobs
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`px-4 py-2 rounded-full ${activeTab === 'saved' ? 'bg-[#06823a] text-white' : 'bg-[#e7f3ec] text-[#0e1b13]'}`}
                >
                  Saved Jobs
                </button>
              </div>
            )}
            
            {selectedJob && (
              <button
                onClick={handleBackToList}
                className="flex items-center gap-2 text-[#4e976d] hover:text-[#06823a]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </svg>
                Back to {activeTab === 'jobs' ? 'Jobs' : 'Saved Jobs'}
              </button>
            )}
          </div>

          <UserProfile user={user} onUpdate={handleUpdateProfile} />

          {selectedJob ? (
            <JobDetailsSection 
              job={selectedJob} 
              onApply={() => handleApplyNow(selectedJob.id)} 
            />
          ) : activeTab === 'jobs' ? (
            <JobListings 
              jobs={jobs} 
              onViewDetails={handleViewDetails}
              savedJobs={savedJobs}
              onToggleSavedJob={handleToggleSavedJob}
            />
          ) : (
            <SavedJobsSection 
              savedJobs={savedJobs}
              onViewDetails={handleViewDetails}
              onRemoveSavedJob={handleRemoveSavedJob}
            />
          )}
        </div>
      </div>
    </div>
  );
}