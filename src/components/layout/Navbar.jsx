import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        
        <div className="text-2xl font-bold text-gray-900">
          <Link to="/">Recruit Connect</Link>
        </div>

        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-green-700 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-green-700 transition duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-green-700 transition duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <Link
            to="/signup"
            className="hidden md:inline-block bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-800 transition duration-200"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="hidden md:inline-block border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:border-green-700 hover:text-green-700 transition duration-200"
          >
            Log In
          </Link>

          <button className="md:hidden text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}