import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { useNavigate } from "react-router-dom";

const ratings = [1, 2, 3, 4, 5];


const ApplicationFeedback = () => {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    console.log({ rating, comment });
    alert("Feedback submitted successfully!");
    navigate("/");
    };

return (
    <DashboardLayout>
      <div className="px-6 py-4 border-b bg-white">
         <button
           onClick={() => navigate(-1)}
           className="flex items-center text-gray-600 hover:text-gray-800"
         >
           <ArrowLeft className="h-5 w-5 mr-1" />
           Back
         </button>


       </div>
       <div className="flex flex-col items-center h-full py-8 bg-gray-100">
         <div className="max-w-2xl text-center mb-6">
           <h1 className="text-3xl font-bold text-gray-900">
             Rate your application experience
           </h1>
           <p className="text-gray-600 mt-2">
             Your feedback helps us improve the application process for everyone.
           </p>
         </div>
         <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
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

            <div>
              <textarea
                className="w-full border-2 border-black rounded-xl p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Please fill in your answer"
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>


<div className="flex justify-center mt-6">
           <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-1/2 rounded-full"
              >
                Submit Feedback
              </Button>
          </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};


export default Feedback;

