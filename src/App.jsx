import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import Feedback from "./pages/Feedback"; // <-- Import your Feedback page
import Messages from "./pages/Messages";
import Applications from "./pages/Applications";
import ResetPassword from "./pages/ResetPassword"; // <-- Import your ResetPassword page
import ResetPasswordToken from "./pages/ResetPasswordToken";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordToken />} />
        <Route path="/apply/:jobId" element={<ApplyRedirect />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/jobs" element={<AdminDashboard />} />
        <Route path="/admin/applicants" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminDashboard />} />
        <Route path="/admin/help" element={<AdminDashboard />} />
        <Route path="/admin/feedback" element={<AdminDashboard />} />
        <Route path="/feedback" element={<Feedback />} /> {/* <-- Add this line */}
        <Route path="/jobs/:id" element={<JobDetails />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<JobSeekerDashboard />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/job-applications" element={<MyApplication />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
