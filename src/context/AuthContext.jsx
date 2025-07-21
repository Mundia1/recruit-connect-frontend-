import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const loginUser = async (credentials) => {
    const res = await login(credentials);
    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    if (res.user.role === "admin") navigate("/admin-dashboard");
    else navigate("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
