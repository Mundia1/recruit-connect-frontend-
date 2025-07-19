import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User
} from 'lucide-react';

const DashboardLayout = ({ children, currentPage = "Analytics" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, current: currentPage === 'Dashboard' },
    { name: 'Jobs', href: '/jobs', icon: Briefcase, current: currentPage === 'Jobs' },
    { name: 'Candidates', href: '/candidates', icon: Users, current: currentPage === 'Candidates' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, current: currentPage === 'Analytics' },
    { name: 'Settings', href: '/settings', icon: Settings, current: currentPage === 'Settings' },
    { name: 'Help', href: '/help', icon: HelpCircle, current: currentPage === 'Help' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-slate-900">JobBoard</h1>
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-slate-200">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-slate-900">JobBoard</h1>
            </div>
            <nav className="mt-8 flex-1 space-y-2 px-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.current
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>
          </div>
          
          {/* User section at bottom */}
          <div className="flex-shrink-0 border-t border-slate-200 p-4">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 w-full px-3 py-2 text-sm hover:bg-slate-100 rounded-lg"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-500">Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              
              {userMenuOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-white border border-slate-200 rounded-lg shadow-lg">
                  <a href="/profile" className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-slate-50">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </a>
                  <button className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 bg-white border-b border-slate-200 lg:border-none">
          <button
            type="button"
            className="px-4 border-r border-slate-200 text-slate-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1">
              <div className="flex w-full md:ml-0">
                <label htmlFor="search-field" className="sr-only">Search</label>
                <div className="relative w-full text-slate-400 focus-within:text-slate-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-0 sm:text-sm bg-transparent"
                    placeholder="Search jobs, candidates..."
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;