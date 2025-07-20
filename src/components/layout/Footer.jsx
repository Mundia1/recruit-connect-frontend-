import React from "react";
import heroImage from "../../assets/hero-image.png"; // Replace with your logo asset
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function Footer() {
  return (
    <footer className="bg-[var(--text-primary)] text-[var(--bg-primary)] pt-[var(--spacing-3xl)] pb-[var(--spacing-xl)] mt-[var(--spacing-3xl)]">
      <div className="max-w-7xl mx-auto px-[var(--spacing-lg)] grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-3xl)]">
        {/* Logo + Description */}
        <div className="flex flex-col items-start">
          <img
            src={heroImage}
            alt="RecruitConnect Logo"
            className="w-[var(--avatar-sm)] h-[var(--avatar-sm)] mb-[var(--spacing-md)]"
          />
          <p className="text-[var(--text-base)] text-[var(--text-muted)]">
            Find Jobs. Manage Jobs. All in One Place.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--bg-primary)] mb-[var(--spacing-md)]">Quick Links</h3>
          <ul className="space-y-[var(--spacing-xs)] text-[var(--text-sm)]">
            <li>
              <a
                href="/"
                className="hover:text-[var(--green-primary)] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/jobs"
                className="hover:text-[var(--green-primary)] transition-colors"
              >
                Jobs
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-[var(--green-primary)] transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-[var(--green-primary)] transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div className="flex flex-col gap-[var(--spacing-xl)]">
          <div>
            <h4 className="text-[var(--text-lg)] font-semibold text-[var(--bg-primary)] mb-[var(--spacing-md)]">Follow Us</h4>
            <div className="flex gap-[var(--spacing-md)]">
              <a href="#" aria-label="Facebook">
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="w-6 h-6 grayscale hover:grayscale-0 transition"
                />
              </a>
              <a href="#" aria-label="Twitter">
                <img
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className="w-6 h-6 grayscale hover:grayscale-0 transition"
                />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="w-6 h-6 grayscale hover:grayscale-0 transition"
                />
              </a>
            </div>
          </div>
          <form className="flex flex-col gap-[var(--spacing-xs)]">
            <label
              htmlFor="newsletter-email"
              className="text-[var(--text-sm)] text-[var(--text-muted)]"
            >
              Subscribe to our newsletter
            </label>
            <div className="flex">
              <Input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email"
                required
                className="rounded-l-[var(--radius-md)] px-[var(--spacing-md)] py-[var(--spacing-xs)] w-full bg-[var(--text-secondary)] border border-[var(--border-light)] text-[var(--bg-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)]"
              />
              <Button
                type="submit"
                className="rounded-r-[var(--radius-md)] px-[var(--spacing-lg)] py-[var(--spacing-xs)] bg-[var(--green-primary)] text-[var(--bg-primary)] font-medium hover:bg-[var(--green-dark)]"
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-[var(--spacing-3xl)] text-center text-[var(--text-sm)] text-[var(--text-muted)]">
        &copy; {new Date().getFullYear()} RecruitConnect. All rights reserved.
      </div>
    </footer>
  );
}