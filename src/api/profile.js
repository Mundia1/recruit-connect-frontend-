export async function createApplication(data, token) {
  const response = await fetch('http://localhost:5000/api/v1/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to apply');
  return response.json();
}

export async function getApplications(token) {
  const response = await fetch('http://localhost:5000/api/v1/applications', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch applications');
  return response.json();
}

export async function getProfile(token) {
  const res = await fetch("http://localhost:5000/api/v1/profile/", {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return await res.json();
}
