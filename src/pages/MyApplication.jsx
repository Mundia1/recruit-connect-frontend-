import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyApplications } from '../api/application';
//import JobCard from '../components/features/jobs/JobCard';

const JobApplications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Active');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('recruit_connect_user'));

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };


  const handleBack = () => {
    window.location.href = 'http://localhost:5173/dashboard';
  };

  useEffect(() => {
    let didCancel = false;
    async function fetchApplications() {
      try {
        const res = await getMyApplications(token, user.id);
        console.log("Applications API response:", res);
        if (!didCancel) setApplications(Array.isArray(res) ? res : []);
      } catch (err) {
        if (!didCancel) setError('Failed to load applications');
      } finally {
        if (!didCancel) setLoading(false);
      }
    }
    if (token && user?.id) fetchApplications();
    return () => { didCancel = true; };
  }, []); // Only on mount

  const filteredApplications = applications.filter((app) =>
    activeTab === 'Active' ? app.isActive : !app.isActive
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className='relative flex size-full min-h-screen flex-col bg-[#f8fcfa] group/design-root overflow-x-hidden'
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className='layout-container flex h-full grow flex-col'>
        <header className='flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7f3ec] px-10 py-3'>
          <div className='flex items-center gap-4 text-[#0e1b13]'>
            <div className='size-4'>
              <svg
                viewBox='0 0 48 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
            <h2 className='text-[#0e1b13] text-lg font-bold leading-tight tracking-[-0.015em]'>
              Recruit Connect
            </h2>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex gap-4'>
              <div
                className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full'
                onClick={() => (window.location.href = 'http://localhost:5173/dashboard')}
              >
                <p className='text-[#0e1b13] text-sm font-medium leading-normal'>
                  Profile
                </p>
              </div>
              <div
                className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full'
                onClick={() => (window.location.href = 'http://localhost:5173/')}
              >
                <p className='text-[#0e1b13] text-sm font-medium leading-normal'>
                  Home
                </p>
              </div>
              <div
                className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full'
                onClick={() => (window.location.href = 'http://localhost:5173/job-applications')}
              >
                <p className='text-[#0e1b13] text-sm font-medium leading-normal'>
                  My Applications
                </p>
              </div>
              <div
                className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full'
                onClick={() => (window.location.href = 'http://localhost:5173/saved-jobs')}
              >
                <p className='text-[#0e1b13] text-sm font-medium leading-normal'>
                  Saved Jobs
                </p>
              </div>
              <div
                className='flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full'
                onClick={() => (window.location.href = 'http://localhost:5173/settings')}
              >
                <p className='text-[#0e1b13] text-sm font-medium leading-normal'>
                  Settings
                </p>
              </div>
            </div>
            <div
              className='bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10'
              style={{
                backgroundImage:
                  'url("https://imgs.search.brave.com/gXeZ5DUJxGMbr6_miepFf7Y2swQNqil9wU6LYVEacL8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI0LzUvMTYv/ZTU0MDg5ZjMtZDdi/YS00OGZhLTg5Yzgt/ZTIwNDA3YTI3MTVk/LmpwZw")',
              }}
            ></div>
          </div>
        </header>
        <div className='px-40 flex flex-1 justify-center py-5'>
          <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
            <div className='flex justify-between gap-2 px-4 py-3'>
              <div className='flex gap-2'>
                <button className='p-2 text-[#0d1c13]' onClick={handleBack}>
                  <div className='text-[#0d1c13]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24px'
                      height='24px'
                      fill='currentColor'
                      viewBox='0 0 256 256'
                    >
                      <path
                        d='M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z'
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <div className='flex flex-wrap justify-between gap-3 p-4'>
              <p className='text-[#0d1c13] tracking-light text-[32px] font-bold leading-tight min-w-72'>
                My applications
              </p>
            </div>
            <div className='pb-3'>
              <div className='flex border-b border-[#cee8d9] px-4 gap-8'>
                <button
                  className={`flex flex-col items-center justify-center border-b-[3px] ${
                    activeTab === 'Active'
                      ? 'border-b-[#06823a] text-[#0d1c13]'
                      : 'border-b-transparent text-[#499c6c]'
                  } pb-[13px] pt-4`}
                  onClick={() => setActiveTab('Active')}
                >
                  <p className='text-sm font-bold leading-normal tracking-[0.015em]'>
                    Active
                  </p>
                </button>
                <button
                  className={`flex flex-col items-center justify-center border-b-[3px] ${
                    activeTab === 'Archived'
                      ? 'border-b-[#06823a] text-[#0d1c13]'
                      : 'border-b-transparent text-[#499c6c]'
                  } pb-[13px] pt-4`}
                  onClick={() => setActiveTab('Archived')}
                >
                  <p className='text-sm font-bold leading-normal tracking-[0.015em]'>
                    Archived
                  </p>
                </button>
              </div>
            </div>
            <div className='px-4 py-3 @container'>
              <div className='flex overflow-hidden rounded-xl border border-[#cee8d9] bg-[#f8fcfa]'>
                <table className='flex-1'>
                  <thead>
                    <tr className='bg-[#f8fcfa]'>
                      <th className='px-4 py-3 text-left text-[#0d1c13] w-[400px] text-sm font-medium leading-normal'>
                        Job title
                      </th>
                      <th className='px-4 py-3 text-left text-[#0d1c13] w-[400px] text-sm font-medium leading-normal'>
                        Company
                      </th>
                      <th className='px-4 py-3 text-left text-[#0d1c13] w-[400px] text-sm font-medium leading-normal'>
                        Date applied
                      </th>
                      <th className='px-4 py-3 text-left text-[#0d1c13] w-60 text-sm font-medium leading-normal'>
                        Status
                      </th>
                      <th className='px-4 py-3 text-left text-[#0d1c13] w-60 text-[#499c6c] text-sm font-medium leading-normal'>
                        View application
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <React.Fragment key={app.id}>
                        <tr className="border-t border-t-[#cee8d9]">
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#0d1c13] text-sm font-normal leading-normal">
                            {app.title}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#499c6c] text-sm font-normal leading-normal">
                            {app.company}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#499c6c] text-sm font-normal leading-normal">
                            {app.applied_at}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                            <button
                              className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 ${
                                app.status === 'Accepted'
                                  ? 'bg-[#e7f4ec] text-[#06823a]'
                                  : app.status === 'Rejected'
                                  ? 'bg-[#fce8e8] text-[#d33]'
                                  : 'bg-[#e7f4ec] text-[#0d1c13]'
                              } text-sm font-medium leading-normal w-full`}
                            >
                              <span className="truncate">{app.status}</span>
                            </button>
                          </td>
                          <td className="h-[72px] px-4 py-2 w-60 relative">
                            <button
                              className="text-[#499c6c] text-sm font-bold leading-normal tracking-[0.015em]"
                              onClick={() => toggleDropdown(app.id)}
                            >
                              View Status
                            </button>
                          </td>
                        </tr>
                        {openDropdown === app.id && (
                          <tr>
                            <td colSpan={5} className="bg-[#f8fcfa] px-4 py-4 border-t border-[#cee8d9]">
                              <div>
                                <p className="text-[#0d1c13] font-medium mb-2">Application Status:</p>
                                <p className="text-[#499c6c] text-base font-bold">{app.status}</p>
                                {/* Add more details here if needed */}
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