import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", first_name: "", last_name: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.email || !form.password || !form.first_name || !form.last_name) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email address.");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Connect to backend API
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/signin");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch {
      setError("Network error.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-secondary)] p-[var(--spacing-lg)]">
      <Card className="w-full max-w-md p-[var(--spacing-xl)]">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-[var(--spacing-md)]">
            <Input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {error && <div className="text-red-500 text-[var(--text-sm)]">{error}</div>}
            <Button
              type="submit"
              className="w-full"
            >
              Sign Up
            </Button>
          </form>
          <div className="mt-[var(--spacing-md)] text-center text-[var(--text-sm)]">
            Already have an account? <Link to="/signin" className="text-[var(--green-primary)] font-semibold">Sign In</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
