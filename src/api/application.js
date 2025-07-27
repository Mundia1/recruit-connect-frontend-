export async function getMyApplications(token) {
  const response = await fetch('http://localhost:5000/api/v1/applications/', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch applications');
  return response.json();
}