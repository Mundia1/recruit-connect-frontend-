import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HeroImage from "../assets/hero-image.png";
import Navbar from "../components/layout/Navbar";
import FeaturedJobs from "../components/features/jobs/FeaturedJobs";
// import Footer from "../components/layout/Footer";

// --- Testimonials Data ---
const testimonials = [
  {
    name: "Jane Mutisya",
    role: "Frontend Developer",
    text: "Recruit Connect helped me land my dream job in Nairobi. The process was smooth and the platform is easy to use!",
    avatar: "https://imgs.search.brave.com/IQRnrIp9ksjCVPKSI0Q-WL8bW6WS5lYejzV7Don22_Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/MjY0LzY5Ny9zbWFs/bC9jb25maWRlbnQt/YmxhY2std29tYW4t/aW4tYS10YWlsb3Jl/ZC1ibGF6ZXItZXh1/ZGluZy1wcm9mZXNz/aW9uYWxpc20tYW5k/LXBvaXNlLXdpdGgt/YXJtcy1jcm9zc2Vk/LWFnYWluc3QtYS1u/ZXV0cmFsLWJhY2tk/cm9wLXBob3RvLkpQ/Rw",
  },
  {
    name: "John Onyango",
    role: "Backend Engineer",
    text: "I found multiple opportunities and the application feedback was super helpful. Highly recommend!",
    avatar: "https://imgs.search.brave.com/Bys1jjaAsol8CLI-MYwlIsqqL-KZEGXrlSByogICnfw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/MjYyLzQ1OC9zbWFs/bC9hLXNlcmlvdXMt/eW91bmctYmxhY2st/bWFuLWluLWEtc2hh/cnAtc3VpdC1hbmQt/eWVsbG93LXRpZS1l/eHVkaW5nLWNvbmZp/ZGVuY2UtYW5kLXBy/b2Zlc3Npb25hbGlz/bS1waG90by5KUEc",
  },
  {
    name: "Mary Wanjiku",
    role: "UI/UX Designer",
    text: "The job board is always up-to-date and the filters make searching so much easier.",
    avatar: "https://imgs.search.brave.com/u_OhY1bSCDv9GduWc9Z4HQaWFuq5rwrWmYZnWPASjyg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTQv/NTgyLzAwNy9zbWFs/bC9jb25maWRlbnQt/ZmVtYWxlLWNlby1s/ZWFkaW5nLW1vZGVy/bi1idXNpbmVzcy1p/bi1ibGFjay1zdWl0/LXByb2Zlc3Npb25h/bC13b21hbi1wb3Np/bmctb3V0ZG9vcnMt/d2l0aC1hdXRob3Jp/dHktbGVhZGVyc2hp/cC1pbi1jb3Jwb3Jh/dGUtZW52aXJvbm1l/bnQtZW1wb3dlcm1l/bnQtYW5kLXN1Y2Nl/c3MtaW4tdXJiYW4t/c2V0dGluZy1waG90/by5qcGVn",
  },
];

const steps = [
  {
    title: "1. Search Jobs",
    desc: "Browse thousands of jobs using smart filters and keywords.",
    icon: "🔍",
  },
  {
    title: "2. Apply Easily",
    desc: "Submit your application in just a few clicks.",
    icon: "📝",
  },
  {
    title: "3. Get Feedback",
    desc: "Track your application and receive feedback from recruiters.",
    icon: "💬",
  },
];

export default function LandingPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/jobs/")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white dark:bg-black">
      {/* Navbar */}
      <Navbar />


      {/* Hero Section */}
      <section
        className="relative w-full h-[400px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Find Jobs, Manage Jobs. All in One Place.
          </h1>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              to="/signin?role=admin"
              className="bg-white text-[#177245] border border-[#177245] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              I'm an Admin
            </NavLink>
            <NavLink
              to="/signin?role=job_seeker"
              className="bg-[#177245] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              I'm a Job Seeker
            </NavLink>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center w-full md:w-1/3"
            >
              <div className="text-4xl mb-4">{step.icon}</div>

              <h3 className="text-xl font-semibold mb-2 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      {loading ? (
        <div className="text-center py-12">Loading featured jobs...</div>
      ) : (
        <FeaturedJobs jobs={jobs} />
      )}

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
          Testimonials
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4 object-cover transition-all duration-300 hover:ring-2 hover:ring-[#0d3b23]"
              />

              <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                "{t.text}"
              </p>
              <div className="font-semibold text-[#177245]">{t.name}</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black mt-10">
        <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col items-center gap-3">
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <NavLink to="/about" className="hover:underline">About</NavLink>
            <NavLink to="/contact" className="hover:underline">Contact</NavLink>
            <NavLink to="/privacy-policy" className="hover:underline">Privacy Policy</NavLink>
            <NavLink to="/terms-of-service" className="hover:underline">Terms of Service</NavLink>
            <NavLink to="/faq" className="hover:underline">FAQ</NavLink>
          </nav>
          <div className="text-xs text-gray-400 text-center">
            © 2025 Recruit Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}