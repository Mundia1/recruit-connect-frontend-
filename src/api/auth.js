// src/api/auth.js

// Simulated user storage for demo purposes
const USER_KEY = "recruit_connect_user";

export const logout = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === "admin";
};

export async function signUp(userData) {
  const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Sign up failed');
  return response.json();
}

export async function signIn(email, password) {
  const response = await fetch('http://localhost:5000/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Sign in failed');
  const result = await response.json();
  localStorage.setItem("token", result.access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(result.user));
  return result;
}

export async function resetPassword(email) {
  const response = await fetch('http://localhost:5000/api/v1/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Reset failed');
  return response.json();
}


