import React from 'react';
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import JobBoard from "./pages/JobBoard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminDashboard from './pages/AdminDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ApplyRedirect from './pages/ApplyRedirect';
import SavedJobs from './pages/SavedJobs'; 
import MyApplication from './pages/MyApplication';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/jobs" element={<JobBoard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/apply/:jobId" element={<ApplyRedirect />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/jobs" element={<AdminDashboard />} />
      <Route path="/admin/applicants" element={<AdminDashboard />} />
      <Route path="/admin/settings" element={<AdminDashboard />} />
      <Route path="/admin/help" element={<AdminDashboard />} />
      <Route path="/admin/feedback" element={<AdminDashboard />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/job-applications" element={<MyApplication />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;