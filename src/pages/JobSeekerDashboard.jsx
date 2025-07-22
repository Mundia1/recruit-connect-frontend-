import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const profileData = {
  name: "Fredrick Arara",
  role: "Software Engineer",
  joinDate: "Joined in 2025",
  avatar: "https://imgs.search.brave.com/gXeZ5DUJxGMbr6_miepFf7Y2swQNqil9wU6LYVEacL8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI0LzUvMTYv/ZTU0MDg5ZjMtZDdi/YS00OGZhLTg5Yzgt/ZTIwNDA3YTI3MTVk/LmpwZw",
};

const applications = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "Tech Innovations Inc.",
    status: "Interviewing",
    date: "2025-02-15",
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "Global Solutions Ltd.",
    status: "Rejected",
    date: "2025-04-20",
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "Creative Apps Co.",
    status: "Accepted",
    date: "2025-07-05",
  },
];

const settings = [
  {
    id: 1,
    title: "Email",
    description: "Update your email address",
  },
  {
    id: 2,
    title: "Password",
    description: "Change your password",
  },
  {
    id: 3,
    title: "Notifications",
    description: "Manage your notification preferences",
  },
];

const SidebarNav = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (path !== "/profile") {
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">Home</p>
      </div>
      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/applications")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">My Applications</p>
      </div>
      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/saved-jobs")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">Saved Jobs</p>
      </div>
      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/profile")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">Profile</p>
      </div>
      <div className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full" onClick={() => handleNavigation("/settings")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
        </svg>
        <p className="text-[#0e1b13] text-sm font-medium leading-normal">Settings</p>
      </div>
    </div>
  );
};

const ProfileHeader = () => {
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
            onClick={() => handleNavigation("/")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
            </svg>
          </div>
          <div 
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
            onClick={() => handleNavigation("/applications")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200ZM104,112a8,8,0,0,1,8-8h32a8,8,0,0,1,0,16H112A8,8,0,0,1,104,112Z"></path>
            </svg>
          </div>
          <div 
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
            onClick={() => handleNavigation("/saved-jobs")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"></path>
            </svg>
          </div>
          <div 
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
            onClick={() => handleNavigation("/profile")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z"></path>
            </svg>
          </div>
          <div 
            className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full"
            onClick={() => handleNavigation("/settings")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
            </svg>
          </div>
        </div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage: `url(${profileData.avatar})`,
          }}
        ></div>
      </div>
    </header>
  );
};

const UserProfile = ({ profile }) => {
  return (
    <div className="flex p-4 @container">
      <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
        <div className="flex gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
            style={{ backgroundImage: `url(${profile.avatar})` }}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#0e1b13] text-[22px] font-bold leading-tight tracking-[-0.015em]">{profile.name}</p>
            <p className="text-[#4e976d] text-base font-normal leading-normal">{profile.role}</p>
            <p className="text-[#4e976d] text-base font-normal leading-normal">{profile.joinDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationHistory = ({ applications }) => {
  return (
    <div className="px-4 py-3 @container">
      <h2 className="text-[#0e1b13] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Application History</h2>
      <div className="flex overflow-hidden rounded-xl border border-[#d0e7d9] bg-[#f8fcfa]">
        <table className="flex-1">
          <thead>
            <tr className="bg-[#f8fcfa]">
              <th className="table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-120 px-4 py-3 text-left text-[#0e1b13] w-[400px] text-sm font-medium leading-normal">
                Job Title
              </th>
              <th className="table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-240 px-4 py-3 text-left text-[#0e1b13] w-[400px] text-sm font-medium leading-normal">Company</th>
              <th className="table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-360 px-4 py-3 text-left text-[#0e1b13] w-60 text-sm font-medium leading-normal">Status</th>
              <th className="table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-480 px-4 py-3 text-left text-[#0e1b13] w-[400px] text-sm font-medium leading-normal">
                Date Applied
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-t border-t-[#d0e7d9]">
                <td className="table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-120 h-[72px] px-4 py-2 w-[400px] text-[#0e1b13] text-sm font-normal leading-normal">
                  {app.title}
                </td>
                <td className="table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-240 h-[72px] px-4 py-2 w-[400px] text-[#4e976d] text-sm font-normal leading-normal">
                  {app.company}
                </td>
                <td className="table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-360 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#e7f3ec] text-[#0e1b13] text-sm font-medium leading-normal w-full">
                    <span className="truncate">{app.status}</span>
                  </button>
                </td>
                <td className="table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-480 h-[72px] px-4 py-2 w-[400px] text-[#4e976d] text-sm font-normal leading-normal">
                  {app.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>
        {`
          @container(max-width:120px){.table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-120{display: none;}}
          @container(max-width:240px){.table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-240{display: none;}}
          @container(max-width:360px){.table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-360{display: none;}}
          @container(max-width:480px){.table-1b701e93-f0f3-4c9b-ab36-c37dfe0c2931-column-480{display: none;}}
        `}
      </style>
    </div>
  );
};

const SettingsSection = ({ settings }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-setting/${id}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-[#0e1b13] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Settings</h2>
      {settings.map((setting) => (
        <div key={setting.id} className="flex items-center gap-4 bg-[#f8fcfa] px-4 min-h-[72px] py-2 justify-between">
          <div className="flex flex-col justify-center">
            <p className="text-[#0e1b13] text-base font-medium leading-normal line-clamp-1">{setting.title}</p>
            <p className="text-[#4e976d] text-sm font-normal leading-normal line-clamp-2">{setting.description}</p>
          </div>
          <div className="shrink-0">
            <button 
              className="text-base font-medium leading-normal"
              onClick={() => handleEdit(setting.id)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      <div className="flex px-4 py-3 justify-start">
        <button 
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7f3ec] text-[#0e1b13] text-sm font-bold leading-normal tracking-[0.015em]"
          onClick={handleLogout}
        >
          <span className="truncate">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <ProfileHeader />
      
      <div className="gap-1 px-6 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col w-80">
          <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#f8fcfa] p-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  style={{
                    backgroundImage: `url(${profileData.avatar})`,
                  }}
                ></div>
                <h1 className="text-[#0e1b13] text-base font-medium leading-normal">{profileData.name}</h1>
              </div>
              <SidebarNav />
            </div>
          </div>
        </div>
        
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#0e1b13] tracking-light text-[32px] font-bold leading-tight">Profile</p>
              <p className="text-[#4e976d] text-sm font-normal leading-normal">Manage your profile information and settings.</p>
            </div>
          </div>
          
          <UserProfile profile={profileData} />
          <ApplicationHistory applications={applications} />
          <SettingsSection settings={settings} />
        </div>
      </div>
    </div>
  );
}