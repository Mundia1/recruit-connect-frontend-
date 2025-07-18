import React from "react";
import HeroImage from "../assets/hero-image.png";
import Navbar from "../components/layout/Navbar";
import FeaturedJobs from "../components/features/jobs/FeaturedJobs";
import Footer from "../components/layout/Footer";

// --- Testimonials Data ---
const testimonials = [
  {
    name: "Jane Doe",
    role: "Frontend Developer",
    text: "Recruit Connect helped me land my dream job in Nairobi. The process was smooth and the platform is easy to use!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Smith",
    role: "Backend Engineer",
    text: "I found multiple opportunities and the application feedback was super helpful. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Mary Wanjiku",
    role: "UI/UX Designer",
    text: "The job board is always up-to-date and the filters make searching so much easier.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

// --- How It Works Steps ---
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
      {/* Navbar above hero */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-[400px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4">
          <div className="text-center text-white max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find Jobs, Manage Jobs. All in One Place.
            </h1>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#177245] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
                I'm a Job Seeker
              </button>
              <button className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-300 transition">
                I'm an Admin
              </button>
            </div>
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
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center border border-gray-100"
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />
              <p className="text-gray-700 italic mb-3">&quot;{t.text}&quot;</p>
              <div className="font-semibold text-[#177245]">{t.name}</div>
              <div className="text-gray-500 text-sm">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
