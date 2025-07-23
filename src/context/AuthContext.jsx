import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.role) {
        setUser(storedUser);
      } else {
        localStorage.removeItem("user"); // Clear invalid session
      }
    } catch (error) {
      // Silently handle error
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    try {
      let role = email.includes("admin") ? "admin" : "user";
      const newUser = { email, role, token: "fake-jwt" };

      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
