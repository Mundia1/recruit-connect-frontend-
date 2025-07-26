import React, { useState } from 'react';

const SettingsPage = () => {
  const [openSetting, setOpenSetting] = useState(null);
  const [formData, setFormData] = useState({
    email: 'fredrick@example.com',
    password: '',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const handleEdit = (id) => {
    setOpenSetting(openSetting === id ? null : id);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSetting(null);
  };

const handleBack = () => {
  window.location.href = "/dashboard";
};

  const handleLogout = () => {
    window.location.href = "/";
  };

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

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8fcfa] group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      {/* Navigation header */}
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
              onClick={() => window.location.href = "/profile"}
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
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#e7f3ec] rounded-full bg-[#e7f3ec]"
              onClick={() => window.location.href = "/settings"}
            >
              <p className="text-[#0e1b13] text-sm font-medium leading-normal">Settings</p>
            </div>
          </div>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage: `url("https://imgs.search.brave.com/gXeZ5DUJxGMbr6_miepFf7Y2swQNqil9wU6LYVEacL8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI0LzUvMTYv/ZTU0MDg5ZjMtZDdi/YS00OGZhLTg5Yzgt/ZTIwNDA3YTI3MTVk/LmpwZw")`,
            }}
          ></div>
        </div>
      </header>

      {/* Settings Content */}
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Back Button */}
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
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-[#0e1b13] tracking-light text-[32px] font-bold leading-tight">Settings</p>
              <p className="text-[#4e976d] text-sm font-normal leading-normal">Manage your account preferences and security settings.</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-[#0e1b13] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Account Settings</h2>
            {settings.map((setting) => (
              <div key={setting.id} className="relative">
                <div className="flex items-center gap-4 bg-[#f8fcfa] px-4 min-h-[72px] py-2 justify-between">
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

                {openSetting === setting.id && (
                  <div className="p-4 bg-white border border-[#cee8d9] rounded-lg mt-2">
                    {setting.id === 1 && (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-[#0d1c13] font-medium mb-2">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-[#cee8d9] rounded"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#06823a] text-white rounded-full text-sm font-medium"
                        >
                          Update Email
                        </button>
                      </form>
                    )}

                    {setting.id === 2 && (
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-[#0d1c13] font-medium mb-2">Current Password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            onChange={handleChange}
                            className="w-full p-2 border border-[#cee8d9] rounded"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-[#0d1c13] font-medium mb-2">New Password</label>
                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="w-full p-2 border border-[#cee8d9] rounded"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#06823a] text-white rounded-full text-sm font-medium"
                        >
                          Update Password
                        </button>
                      </form>
                    )}

                    {setting.id === 3 && (
                      <div>
                        <h3 className="text-[#0d1c13] font-bold mb-4">Notification Preferences</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="emailNotifications"
                              name="email"
                              checked={formData.notifications.email}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <label htmlFor="emailNotifications">Email Notifications</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="pushNotifications"
                              name="push"
                              checked={formData.notifications.push}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <label htmlFor="pushNotifications">Push Notifications</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="smsNotifications"
                              name="sms"
                              checked={formData.notifications.sms}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <label htmlFor="smsNotifications">SMS Notifications</label>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h4 className="text-[#0d1c13] font-medium mb-2">Notification Schedule</h4>
                          <p className="text-[#499c6c] mb-4">Receive notifications daily at 9:00 AM</p>
                          <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-[#06823a] text-white rounded-full text-sm font-medium"
                          >
                            Save Preferences
                          </button>
                        </div>
                      </div>
                    )}
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

export default SettingsPage;