import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";

function Category() {
  const API_URL = "http://localhost:8000/api/category";

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching products");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, price, image, description } = form;

    if (!title || !image) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add product");
      const data = await res.json();

      setProducts((prev) => [...prev, data.product]);
      setForm({ title: "", image: "" });
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-400">
        Category Manager
      </h1>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[70%] lg:w-[60%] bg-white shadow-lg rounded-lg  p-6 mb-10"
      >
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Add New Product Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          <input
            type="text"
            name="title"
            placeholder=" Category"
            value={form.title}
            onChange={handleChange}
            className="border rounded-md px-4 py-4 focus:ring-7 border-cyan-600 focus:ring-indigo-400 m -[50px]"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="border rounded-md px-4 py-4 focus:ring-7 border-cyan-600 focus:ring-indigo-400 m -[50px]"
          />

          <br />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-sky-500 transition-colors disabled:bg-gray-400  "
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* Product Table */}
      <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 ">No</th>
              <th className="px-4 py-3 ">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
      
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-gray-700 text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-14 h-14 object-contain rounded-md border mx-auto"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800 text-left">
                    {product.title}
                  </td>
                
                  <td className="px-4 py-3 text-left">{product.description}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-500 hover:text-red-700 text-2xl"
                      title="Delete Product"
                    >
                      <TiDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
