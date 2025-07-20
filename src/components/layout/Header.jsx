import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
  return (
    <header className="bg-[var(--bg-primary)] shadow-sm py-[var(--spacing-md)] px-[var(--spacing-xl)] flex justify-between items-center">
      <Link to="/" className="text-[var(--text-lg)] font-bold text-[var(--green-primary)]">
        RecruitConnect
      </Link>
      <nav className="space-x-[var(--spacing-md)]">
        <Button variant="ghost" asChild>
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button asChild>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
