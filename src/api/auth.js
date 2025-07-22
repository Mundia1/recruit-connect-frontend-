// src/api/auth.js

// Simulated user storage for demo purposes
const USER_KEY = "recruit_connect_user";

export const login = async ({ email, password }) => {
  // Example static logic (replace with API call in production)
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Simulate role detection (admin if email contains 'admin')
  const role = email.includes("admin") ? "admin" : "user";

  const user = {
    email,
    role,
    token: "fake-jwt-token",
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const signup = async ({ email, password }) => {
  // Example static logic (replace with API call in production)
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = {
    email,
    role: "user",
    token: "fake-jwt-token",
  };

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === "admin";
};
