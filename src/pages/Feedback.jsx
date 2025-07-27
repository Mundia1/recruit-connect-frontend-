import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import feedbackService from '../api/feedback';
import { useAuthContext } from '../context/AuthContext'; 

const ratings = [1, 2, 3, 4, 5];

const ApplicationFeedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }
    if (!user) {
      toast.error("You must be logged in to submit feedback."); 
      setTimeout(() => navigate("/signin"), 3000);
      return;
    }

    setLoading(true);
    const feedbackData = {
      rating: rating,
      comment: comment,
      user_id: user.id,
      job_application_id: 1
    };

    try {
      await feedbackService.submitFeedback(feedbackData);
      
      toast.success("Thank you! Your feedback has been submitted.");

      setRating(null);
      setComment("");

      setTimeout(() => navigate("/dashboard"), 2000);

    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
      console.error("Feedback submission error:", error);
    } finally {
      setLoading(false);
    }
  };