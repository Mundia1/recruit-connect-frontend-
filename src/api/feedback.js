// src/api/feedback.js
export async function submitFeedback(data, token) {
  const response = await fetch('http://localhost:5000/api/v1/feedback/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit feedback');
  return response.json();
}

export async function getFeedbackForApplication(applicationId, token) {
  const response = await fetch(`http://localhost:5000/api/v1/feedback/application/${applicationId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch feedback');
  return response.json();
}