// src/pages/ApplicationFeedback.jsx

import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FORM_ENDPOINT = "https://formspree.io/f/your_form_id"; // <-- replace this with your actual Formspree endpoint
const ratings = [1, 2, 3, 4, 5];

const ApplicationFeedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("submitted_from", "ApplicationFeedback Page");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        toast.success("Thank you! Your feedback has been submitted.");
        setRating(null);
        setComment("");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Formspree error:", error);
      toast.error("Failed to send feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7FCFA] min-h-screen">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20">
        <div className="max-w-2xl text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Rate your application experience
          </h1>
          <p className="text-gray-600 mt-2">
            Your feedback helps us improve the application process for everyone.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          <div className="flex justify-center space-x-3">
            {ratings.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className={`
                  w-12 h-12 flex items-center justify-center rounded-lg text-lg font-medium transition-colors
                  ${
                    rating === num
                      ? 'bg-[#21C259] text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }
                `}
              >
                {num}
              </button>
            ))}
          </div>
          
          <div>
            <textarea
              className="w-full border border-[#D1E5D9] rounded-xl p-4 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-[#21C259] bg-white"
              placeholder="Tell us more about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#12783D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#05823B] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationFeedback;