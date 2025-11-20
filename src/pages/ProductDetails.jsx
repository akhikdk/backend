import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../component/Navbar";

function ProductDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Category ID not specified.");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/products/category/${id}`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-xl text-gray-700 flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="p-10 text-xl text-red-500 flex justify-center items-center min-h-screen">
        {error}
      </div>
    );
  if (products.length === 0)
    return (
      <div className="p-10 text-xl text-gray-500 flex justify-center items-center min-h-screen">
        No products found in this category
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col">
      <Navbar />

      <div className="py-12 px-6 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-wide">
          Premium Collection
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((p) => (
            <Link
              to={`/singleproduct/${p._id}`}
              key={p._id}
              className="group perspective"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:-translate-y-3">
                
                {/* Image with cinematic hover effect */}
                <div className="relative h-80 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-contain transition-transform duration-700 transform group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 truncate">
                    {p.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                    {p.description || "No description available."}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-2xl font-extrabold text-indigo-600">
                      ₹{p.price}
                    </span>
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">
                      View
                    </button>
                  </div>
                </div>

                {/* Floating glow effect */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
