
// src/api/profile.js
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