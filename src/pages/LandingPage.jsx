import React from "react";
import HeroImage from "../assets/hero-image.png";
import Navbar from "../components/layout/Navbar";
import FeaturedJobs from "../components/features/jobs/FeaturedJobs";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';

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
  const navigate = useNavigate();

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
        <div className="absolute inset-0 bg-[var(--text-primary)] opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-[var(--spacing-lg)]">
          <div className="text-center text-white max-w-2xl mx-auto">
            <h1 className="text-[var(--text-2xl)] sm:text-[var(--text-3xl)] md:text-[var(--text-3xl)] font-bold mb-[var(--spacing-xl)] leading-[var(--leading-tight)]">
              Find Jobs, Manage Jobs. All in One Place.
            </h1>
            <div className="flex flex-col sm:flex-row justify-center gap-[var(--spacing-md)]">
              <Button
                onClick={() => navigate("/signup")}
              >
                I'm a Job Seeker
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/signin")}
              >
                I'm an Admin
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-[var(--spacing-lg)] py-[var(--spacing-3xl)]">
        <h2 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-2xl)] text-center">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row gap-[var(--spacing-2xl)] justify-center items-center">
          {steps.map((step) => (
            <Card
              key={step.title}
              className="p-[var(--spacing-xl)] flex flex-col items-center text-center w-full md:w-1/3"
            >
              <div className="text-[var(--text-3xl)] mb-[var(--spacing-md)]">{step.icon}</div>
              <h3 className="text-[var(--text-xl)] font-semibold mb-[var(--spacing-xs)]">{step.title}</h3>
              <p className="text-[var(--text-base)] text-[var(--text-muted)]">{step.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <FeaturedJobs />

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-[var(--spacing-lg)] py-[var(--spacing-3xl)]">
        <h2 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-2xl)] text-center">
          Testimonials
        </h2>
        <div className="grid gap-[var(--spacing-2xl)] sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="p-[var(--spacing-xl)] flex flex-col items-center text-center"
            >
              <Avatar
                src={t.avatar}
                alt={t.name}
                size="md"
                className="mb-[var(--spacing-md)]"
              />
              <p className="text-[var(--text-base)] text-[var(--text-primary)] italic mb-[var(--spacing-md)]">&quot;{t.text}&quot;</p>
              <div className="font-semibold text-[var(--green-primary)]">{t.name}</div>
              <div className="text-[var(--text-sm)] text-[var(--text-muted)]">{t.role}</div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}