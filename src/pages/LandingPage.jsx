import React from "react";
import { NavLink } from "react-router-dom";
import HeroImage from "../assets/hero-image.png";
import Navbar from "../components/layout/Navbar";
import FeaturedJobs from "../components/features/jobs/FeaturedJobs";
import Footer from "../components/layout/Footer";

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
  return (
    <div>
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
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Find Jobs, Manage Jobs. All in One Place.
          </h1>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink
              to="/jobs"
              className="bg-[#177245] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              I'm a Job Seeker
            </NavLink>
            <NavLink
              to="/signin?role=admin"
              className="bg-white text-[#177245] border border-[#177245] px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              I'm an Admin
            </NavLink>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center w-full md:w-1/3"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <FeaturedJobs />

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Testimonials
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-gray-100
                        transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:border-[#177245]"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4 object-cover transition-all duration-300 hover:ring-2 hover:ring-[#177245]"
              />
              <p className="text-gray-700 italic mb-3 hover:text-gray-900 transition-colors duration-300">
                &quot;{t.text}&quot;
              </p>
              <div className="font-semibold text-[#177245] hover:text-[#125a3a] transition-colors duration-300">
                {t.name}
              </div>
              <div className="text-gray-500 text-sm hover:text-gray-700 transition-colors duration-300">
                {t.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}