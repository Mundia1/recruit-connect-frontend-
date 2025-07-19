import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (credentials) => {
    const res = await signIn(credentials);
    setUser(res.user);
    localStorage.setItem("user", JSON.stringify(res.user));
    if (res.user.role === "admin") navigate("/dashboard");
    else navigate("/job-board");
  };

  const register = async (data) => {
    await signUp(data);
    navigate("/signin");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
