import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }

      if (data.token) localStorage.setItem('token', data.token);

      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/Home'), 800);

    } catch (error) {
      console.error('Network error:', error);
      setMessage('Could not connect to server. Try again later.');
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-900 flex justify-center items-center relative overflow-hidden">

      {/* Form container */}
      <div className="w-[90%] md:w-1/2 h-full flex justify-center items-center px-6 relative z-10">
        <div className="w-full md:w-4/5 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 flex flex-col items-center border border-white/20">

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">Welcome Back</h2>

          {/* Display message */}
          {message && <div className="text-white/80 mb-4">{message}</div>}

          {/* Login form */}
          <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
            
            {/* Email input */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setMessage(''); }}
              className="w-full md:w-4/5 h-14 border border-white/30 rounded-xl px-5 mb-4 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />

            {/* Password input with show/hide toggle */}
            <div className="relative w-full md:w-4/5 mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setMessage(''); }}
                className="w-full h-14 border border-white/30 rounded-xl px-5 pr-12 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                required
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
              className="w-full md:w-4/5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 mb-3"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-white/70 text-sm">
            Don't have an account?{' '}
            <a href="/signup" className="text-white font-medium hover:text-purple-300 transition">
              Sign Up
            </a>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
