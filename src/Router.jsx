import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Details from "./pages/Details";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import Category from "./pages/Category";
import ProductDescriptionTable from "./pages/ProductDescriptionTable";
import ProductDetails from "./pages/ProductDetails";
import SingleProduct from "./pages/SingleProduct";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage showing all products */}
        <Route path="/" element={<Products />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Product details by some specific id (optional, your old Details page) */}
        <Route path="/details/:id" element={<Details />} />

        {/* Home page */}
        <Route path="/home" element={<Home />} />

        {/* Add product page */}
        <Route path="/addProduct" element={<AddProduct />} />

        {/* Category listing */}
        <Route path="/category" element={<Category />} />

        {/* Product description table */}
        <Route path="/ProductDescriptionTable" element={<ProductDescriptionTable />} />

        {/* Products by category */}
        <Route path="/productdetails/:id" element={<ProductDetails />} />

        {/* Single product page */}
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
