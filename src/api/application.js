export async function getMyApplications(token, userId) {
  const res = await fetch(`http://localhost:5000/api/v1/applications/?user_id=${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch applications');
  return await res.json();
}

export async function applyForJob(token, userId, jobId) {
  const res = await fetch('http://localhost:5000/api/v1/applications/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: userId,
      job_posting_id: jobId,
    }),
  });
  if (!res.ok) throw new Error('Failed to apply');
  return await res.json();
}