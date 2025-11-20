import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-blue-400 text-white flex justify-between items-center px-8 py-4">

      {/* Logo */}
      <div className="w-[20%]">
        <h1 className="text-xl font-bold">WonderCart</h1>
      </div>

      {/* Search Bar */}
      <div className="w-[40%]">
        <input
          type="text"
          placeholder="Search products"
          className="rounded-md w-[75%] p-2 bg-white text-black outline-none"
        />
      </div>

      {/* Navigation Links */}
      <div className="w-[40%]">
        <ul className="flex justify-evenly font-medium">
          <li>
            <Link to="/" className="cursor-pointer hover:bg-black px-2 py-1 rounded">
              Home
            </Link>
          </li>

          <li>
            <Link to="/cart" className="cursor-pointer hover:bg-black px-2 py-1 rounded">
              Cart
            </Link>
          </li>

          <li>
            <Link to="/profile" className="cursor-pointer hover:bg-black px-2 py-1 rounded">
              Profile
            </Link>
          </li>

          <li>
            <Link to="/products" className="cursor-pointer hover:bg-black px-2 py-1 rounded">
              Products
            </Link>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Navbar;
