import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Card from "../component/Card";

function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to fetch products");
        setProducts([]);
        return;
      }

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage("Network error fetching products");
      setProducts([]);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => prev.filter((item) => item._id !== id));
        setMessage(data.message || "Product deleted");
      } else {
        setMessage(data.message || "Delete failed");
      }
    } catch (error) {
      setMessage("Error deleting product");
    }
  };

  // Add to cart
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage("Product added to cart 🛒");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />

      {message && (
        <div className="text-center mt-4 text-green-600 font-semibold">
          {message}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6 p-6">
        {products.length === 0 ? (
          <p className="text-gray-500 text-lg">No products available.</p>
        ) : (
          products.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              title={item.title}
              price={item.price}
              image={item.image}
              onDelete={handleDelete}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
