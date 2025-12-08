import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle password visibility

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 25;
      const y = (window.innerHeight / 2 - e.clientY) / 25;
      document.documentElement.style.setProperty("--x", `${x}px`);
      document.documentElement.style.setProperty("--y", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }

      setMessage("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4 bg-[#0a0a0a] text-white">

      <div className="relative w-full max-w-md p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-2xl border border-white/20">
        
        <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Create Account
        </h2>

        {message && <div className="text-center mb-3 text-pink-300">{message}</div>}

        <form onSubmit={handleSignup} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/20"
          />

          {/* Password with show/hide toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-black/30 border border-white/20"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white cursor-pointer text-xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?
          <a href="/login" className="text-pink-400 font-semibold hover:underline ml-1">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
