export async function fetchJobs() {
  const response = await fetch('http://localhost:5000/api/v1/jobs/');
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
}

export async function getAll() {
  const response = await fetch('http://localhost:5000/api/v1/jobs/');
  if (!response.ok) throw new Error('Failed to fetch jobs');
  return response.json();
}

export async function applyForJob(jobId, token) {
  const response = await fetch('http://localhost:5000/api/v1/applications/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ job_posting_id: jobId }),
  });
  if (!response.ok) throw new Error('Application failed');
  return response.json();
}

export async function getById(id) {
  const response = await fetch(`http://localhost:5000/api/v1/jobs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch job');
  return response.json();
}

export async function create(jobData) {
  const response = await fetch('http://localhost:5000/api/v1/jobs/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(jobData),
  });
  if (!response.ok) throw new Error('Failed to create job');
  return response.json();
}

