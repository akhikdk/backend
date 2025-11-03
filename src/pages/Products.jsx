import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Card from "../component/Card";

function Products() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => prev.filter((item) => item.Id !== id));
        setMessage(data.message);
      } else {
        setMessage(data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Error deleting product. Check console for details.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="w-full h-[12vh]">
        <Navbar />
      </div>

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
