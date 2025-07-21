import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#177245] text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        RecruitConnect
      </div>
      <nav className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/jobs" className="hover:underline">Jobs</Link>
        <Link to="/signin" className="hover:underline">Sign In</Link>
        <Link to="/signup" className="hover:underline">Sign Up</Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;