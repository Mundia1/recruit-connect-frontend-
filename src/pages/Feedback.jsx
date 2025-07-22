import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';

const faces = [
  { label: "Very Dissatisfied", emoji: "😠", value: 1 },
  { label: "Dissatisfied", emoji: "😞", value: 2 },
  { label: "Neutral", emoji: "😐", value: 3 },
  { label: "Satisfied", emoji: "😊", value: 4 },
  { label: "Very Satisfied", emoji: "😍", value: 5 }
];

const Feedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment });   
    // Optional: Submit to backend
    setRating(null);
    setComment("");
  };
  

return (
    <DashboardLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
          <h2 className="text-green-600 text-xl font-bold mb-4">We want your opinion!</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-800 font-medium mb-2">
                How satisfied are you with our platform?
              </label>
              <div className="flex justify-between">
                {faces.map((face) => (
                  <button
                    key={face.value}
                    type="button"
                    onClick={() => setRating(face.value)}
                    className={`text-3xl transition-transform ${
                      rating === face.value ? 'scale-110' : 'opacity-70'
                    } hover:scale-110`}
                    aria-label={face.label}
                  >
                    {face.emoji}
                  </button>
                ))}
              </div>
            </div>