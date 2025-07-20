import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Users, Settings, FileText, MessageSquare } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'Applications', path: '/applications', icon: <FileText size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const isActive = (path) => {
    return location.pathname === path ? 'bg-[var(--green-light)] text-[var(--green-darker)]' : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]';
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex-1 flex flex-col min-h-0 border-r border-[var(--border-light)] bg-[var(--bg-primary)]">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-[var(--border-light)]">
            <h1 className="text-[var(--text-xl)] font-bold text-[var(--green-primary)]">RecruitConnect</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-[var(--text-sm)] font-medium rounded-[var(--radius-md)] ${isActive(item.path)}`}
                >
                  <span className="mr-3 flex-shrink-0">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
