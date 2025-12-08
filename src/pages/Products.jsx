import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Card from "../component/Card";

function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

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
      console.error("Error fetching products:", error);
      setMessage("Network error fetching products");
      setProducts([]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

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
        setMessage(data.message);
      } else {
        setMessage(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product.");
    }
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
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
