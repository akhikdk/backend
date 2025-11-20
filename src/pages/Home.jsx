import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://localhost:8000/api/category", { signal: abortController.signal }),
          fetch("http://localhost:8000/api/products", { signal: abortController.signal }),
        ]);

        if (!catRes.ok || !prodRes.ok) throw new Error("Failed to fetch data");

        const [catData, prodData] = await Promise.all([catRes.json(), prodRes.json()]);
        setCategories(catData);
        setProducts(prodData);
      } catch (err) {
        if (!abortController.signal.aborted) setError("Something went wrong! Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col font-sans bg-gradient-to-b from-gray-100 via-white to-gray-50">

      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between py-32 px-8 md:px-16 overflow-hidden">
        <div className="md:w-1/2 space-y-6 z-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradientShift">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">WonderCart</span>
          </h2>
          <p className="text-gray-700 text-lg md:text-xl animate-fadeIn delay-200">
            Discover high-quality products and exclusive deals — all in one place!
          </p>
          <Link to="/products">
            <button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-10 py-4 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 animate-fadeIn delay-400">
              🛍️ Shop Now
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
            alt="Shopping illustration"
            className="w-full max-w-lg mx-auto transform hover:scale-110 transition-transform duration-1000 animate-float"
          />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob"></div>
          <div className="absolute -top-24 -left-16 w-72 h-72 bg-pink-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-8 md:px-16">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fadeIn">
          Browse by Categories
        </h3>

        {loading ? (
          <p className="text-center text-gray-700">Loading categories...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/ProductDetails/${cat._id}`}
                className="flex flex-col items-center p-5 rounded-3xl bg-white/70 backdrop-blur-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fadeIn"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-24 h-24 object-cover rounded-full mb-3 border-4 border-white shadow-lg"
                />
                <h4 className="text-md font-semibold text-gray-900">{cat.title}</h4>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Products Section */}
      <section className="py-20 px-8 md:px-16 bg-gradient-to-b from-white to-gray-50">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fadeIn">
          Featured Products
        </h3>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((item) => (
              <div
                key={item._id}
                className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group animate-fadeIn"
              >
                <Link to={`/ProductDetails/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </Link>
                <div className="p-6 space-y-2">
                  <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                  <p className="text-indigo-600 font-bold text-xl">₹{item.price}</p>
                  <p className="text-gray-500 text-sm">{item?.category?.title ?? "No category"}</p>
                  <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 text-white text-center py-8 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 animate-blob bg-white/20 blur-3xl"></div>
        <p className="relative text-sm">© {new Date().getFullYear()} <b>WonderCart</b>. All rights reserved.</p>
        <div className="relative flex justify-center gap-6 mt-4 text-xl">
          <i className="fa-brands fa-facebook hover:text-yellow-300 transition-transform transform hover:scale-110"></i>
          <i className="fa-brands fa-instagram hover:text-yellow-300 transition-transform transform hover:scale-110"></i>
          <i className="fa-brands fa-twitter hover:text-yellow-300 transition-transform transform hover:scale-110"></i>
        </div>
      </footer>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradientShift {
            background-size: 200% 200%;
            animation: gradientShift 15s ease infinite;
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease forwards;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }

          @keyframes blob {
            0%, 100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 20s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}
      </style>
    </div>
  );
}

export default Home;
