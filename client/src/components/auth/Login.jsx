import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      // Save token and user data to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("Login successful:", res.data.token);
      navigate("/"); // redirect to homepage
    } catch (err) {
      console.error("Login failed:", err.response?.data?.error || err.message);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center">
    <div className="max-w-md mx-auto p-6 bg-slate-800 rounded-xl shadow-lg text-center">
      <h1 className="bg-slate-800 text-xl font-semibold font-serif">Welcome Back to ShortLink</h1>
      <h2 className="text-2xl font-bold text-gray-300 mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Sign up
        </button>
      </p>
    </div>
    </div>
  );
};

export default Login;
