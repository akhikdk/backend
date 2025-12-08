import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For programmatic navigation
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      if (!id) {
        setError("Product ID not provided.");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/products/single/${id}`
      );

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      setProduct(data.product || data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Failed to load product.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({
      id: product._id || id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    // Navigate to cart page
    navigate("/cart");
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 animate-pulse p-6">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-80 bg-gray-300 rounded-lg" />
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="h-8 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-xl text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={fetchProduct}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 text-xl text-red-500 font-semibold">
        Product not found.
      </div>
    );
  }

  const { image, title, description, price, category } = product;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 bg-white p-6 rounded-lg shadow-md">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img src={image} alt={title} className="max-h-[500px] object-contain" />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-2xl text-blue-600 font-semibold">₹{price}</p>

          <p className="text-gray-500">
            Category: <span className="font-medium">{category?.title || "No Category"}</span>
          </p>

          <p className="text-gray-700 mt-4">{description || "No description available."}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition text-center"
            >
              Add to Cart
            </button>

            {/* Back to Category */}
            <Link
              to={`/category/${category?._id || ""}`}
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition text-center"
            >
              Back to Category
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
