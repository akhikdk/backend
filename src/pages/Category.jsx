import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";

function Category() {
  const API_URL = "http://localhost:8000/api/category";

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching categories");
    }
  };

  // Input for title
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Input for image
  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // Submit new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.image) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title); // FIXED KEY
      formData.append("image", form.image);

      const res = await fetch(API_URL, {
        method: "POST",
        body: formData, // Auto sets multipart/form-data
      });

      if (!res.ok) throw new Error("Failed to add category");

      const data = await res.json();

      // Add new category to UI
      setCategories((prev) => [...prev, data.category]);

      // Reset form
      setForm({ title: "", image: null });

    } catch (error) {
      console.error(error);
      alert("Error adding category");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete category");

      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-5">

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-red-400">
        Category Manager
      </h1>

      {/* Add Category Form */}
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-[70%] lg:w-[60%] bg-white shadow-xl rounded-xl p-8 mb-10 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-red-700 mb-6">
          Add New Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Category Name</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter category name"
              value={form.title}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Image Upload</span>
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="input input-bordered w-full"
            />
          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary mt-6 px-8"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>

      {/* Categories Table */}
      <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-4 py-3 text-center">No</th>
              <th className="px-4 py-3 text-center">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length ? (
              categories.map((cat, index) => (
                <tr
                  key={cat._id}
                  className="border-b hover:bg-indigo-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-center">{index + 1}</td>

                  <td className="px-4 py-3 text-center">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-14 h-14 object-contain rounded-md border mx-auto"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {cat.title}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteCategory(cat._id)}
                      className="text-red-500 hover:text-red-700 text-2xl"
                      title="Delete Category"
                    >
                      <TiDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No categories found
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
