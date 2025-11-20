import React from 'react';

function Login() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-900 via-blue-800 to-purple-900 flex justify-center items-center relative overflow-hidden">

      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob -top-32 -left-32"></div>
        <div className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob -bottom-32 -right-32 animation-delay-2000"></div>
      </div>

      {/* Sparkles for premium effect */}
      <div className="absolute w-full h-full pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white rounded-full opacity-70 animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Left side illustration for medium+ screens */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
        <div className="w-4/5 h-4/5 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center animate-float">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Shopping Illustration"
            className="w-3/4 h-3/4 object-contain"
          />
        </div>
      </div>

      {/* Glassmorphic login form */}
      <div className="w-[90%] md:w-1/2 h-full flex justify-center items-center px-6 relative z-10">
        <div className="w-full md:w-4/5 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 flex flex-col items-center border border-white/20">

          {/* WONDER CART branding */}
          <div className="flex items-center mb-8 relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
              alt="Cart Icon"
              className="w-10 h-10 mr-3 animate-bounce"
            />
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text animate-textGlow">
              WONDER CART
            </h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-white/90">
            Welcome Back
          </h2>

          <input
            type="email"
            placeholder="Email address"
            className="w-full md:w-4/5 h-14 border border-white/30 rounded-xl px-5 mb-4 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full md:w-4/5 h-14 border border-white/30 rounded-xl px-5 mb-6 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            required
          />

          <button className="w-full md:w-4/5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-xl transition-all duration-300 mb-4 transform hover:-translate-y-1 hover:scale-105">
            Log In
          </button>

          <a
            href="#"
            className="text-white/80 hover:text-white text-sm no-underline hover:underline"
          >
            Forgot your password?
          </a>

          <p className="mt-6 text-white/70 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-white font-medium hover:text-purple-300 transition">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      {/* Tailwind custom animation for gradient glow */}
      <style>
        {`
          @keyframes textGlow {
            0%, 100% {
              background-position: 0% 50%;
              text-shadow: 0 0 10px rgba(255,255,255,0.5);
            }
            50% {
              background-position: 100% 50%;
              text-shadow: 0 0 20px rgba(255,255,255,0.8);
            }
          }
          .animate-textGlow {
            background-size: 200% 200%;
            animation: textGlow 3s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes blob {
            0%, 100% { transform: translate(0px,0px) scale(1); }
            33% { transform: translate(30px,-50px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 8s infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Login;
