import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../user/authcontext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 404) {
          setError("User not found");
        } else {
          setError(data.error || "Login failed");
        }
        return;
      }
      login(data.user);
      navigate("/groups");
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Login
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;
