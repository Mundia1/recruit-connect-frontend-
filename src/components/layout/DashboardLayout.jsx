import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  Bell,
  Search,
  Menu,
  X,
  User as UserIcon,
  Shield,
  PlusCircle,
  FileText,
  MessageSquare,
} from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Navigation items for regular users
  const userNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Jobs', path: '/jobs', icon: <Briefcase size={18} /> },
    { name: 'Applications', path: '/applications', icon: <FileText size={18} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={18} /> },
  ];

  // Navigation items for admin
  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Job Management', path: '/admin/jobs', icon: <Briefcase size={18} /> },
    { name: 'Applicants', path: '/admin/applicants', icon: <Users size={18} /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <MessageSquare size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  const navItems = isAdminRoute ? adminNavItems : userNavItems;
  const currentPage = navItems.find(item => location.pathname === item.path)?.name || 'Dashboard';

  // Check if user is admin and handle authentication
  useEffect(() => {
    const checkAdmin = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const isUserAdmin = userData.role === 'admin';
        setIsAdmin(isUserAdmin);

        // Redirect to dashboard if non-admin tries to access admin routes
        if (isAdminRoute && !isUserAdmin) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    checkAdmin();
  }, [navigate, isAdminRoute]);

  // Toggle admin mode
  const toggleAdminMode = () => {
    if (isAdmin) {
      navigate(isAdminRoute ? '/dashboard' : '/admin/dashboard');
    }
  };

  // Check if a nav item is active
  const isActive = (path) => {
    return location.pathname === path ? 'bg-[var(--green-light)] text-[var(--green-darker)]' : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]';
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // Render navigation items
  const renderNavItems = (onItemClick = () => {}) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`group flex items-center rounded-[var(--radius-md)] px-3 py-2 text-[var(--text-sm)] font-medium lg:px-4 ${isActive(item.path)}`}
          onClick={onItemClick}
        >
          <span className="mr-3">{item.icon}</span>
          {item.name}
        </Link>
      ))}
      {isAdmin && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            toggleAdminMode();
            onItemClick();
          }}
          className="w-full justify-start"
        >
          <Shield size={18} className="mr-3" />
          {isAdminRoute ? 'Exit Admin' : 'Admin Mode'}
        </Button>
      )}
    </>
  );

  // Render user profile section
  const renderUserProfile = (showLogout = false) => (
    <div className="flex items-center">
      <Avatar>
        <span className="font-medium">
          {currentUser?.name?.charAt(0) || <UserIcon size={18} />}
        </span>
      </Avatar>
      <div className="ml-3">
        <p className="text-[var(--text-sm)] font-medium text-[var(--text-primary)]">
          {currentUser?.name || 'User'}
        </p>
        {showLogout ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-[var(--text-xs)] text-[var(--text-muted)] hover:text-[var(--text-primary)] p-0 h-auto"
          >
            Sign out
          </Button>
        ) : (
          <Badge variant="secondary" className="text-[var(--text-xs)]">
            {isAdmin ? 'Administrator' : 'User'}
          </Badge>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[var(--bg-secondary)]">
      {/* Mobile sidebar */}
      <div className={`lg:hidden ${sidebarOpen ? 'fixed inset-0 z-40 flex' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-[var(--bg-primary)]">
          <div className="flex h-16 items-center justify-between border-b border-[var(--border-light)] px-4">
            <h1 className="text-[var(--text-xl)] font-bold text-[var(--green-primary)]">
              {isAdminRoute ? 'Admin Panel' : 'RecruitConnect'}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {renderNavItems(() => setSidebarOpen(false))}
            </nav>
          </div>
          <div className="border-t border-[var(--border-light)] p-4">
            {renderUserProfile()}
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-[var(--border-light)] bg-[var(--bg-primary)]">
          <div className="flex h-16 flex-shrink-0 items-center border-b border-[var(--border-light)] px-4">
            <h1 className="text-[var(--text-xl)] font-bold text-[var(--green-primary)]">
              {isAdminRoute ? 'Admin Panel' : 'RecruitConnect'}
            </h1>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 py-4">
              {renderNavItems()}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-[var(--border-light)] p-4">
            <div className="group block w-full">
              {renderUserProfile(true)}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-[var(--bg-primary)] shadow-sm">
          <Button
            variant="ghost"
            size="sm"
            className="border-r border-[var(--border-light)] rounded-none lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              <div className="flex w-full max-w-lg lg:max-w-xs">
                <Input
                  id="search"
                  className="border-0 bg-transparent focus:ring-0"
                  placeholder="Search jobs, candidates..."
                  type="search"
                  name="search"
                  icon={<Search className="h-5 w-5 text-[var(--text-muted)]" />}
                />
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
              >
                <Bell className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-[var(--text-2xl)] font-semibold text-[var(--text-primary)]">
                {currentPage}
                {isAdminRoute && (
                  <Badge variant="secondary" className="ml-2">
                    Admin
                  </Badge>
                )}
              </h1>
              <div className="flex items-center space-x-3">
                {isAdminRoute && location.pathname === '/admin/dashboard' && (
                  <Button asChild>
                    <Link to="/admin/jobs/new">
                      <PlusCircle className="-ml-0.5 mr-1.5 h-4 w-4" />
                      New Job
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
