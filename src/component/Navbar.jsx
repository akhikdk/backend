import React from 'react';

function Navbar() {
  return (
    <div className="w-full h-full bg-blue-400 text-white flex justify-between items-center px-8 py-4">
      
     
      <div className="w-[20%]">
        <h1 className="text-xl font-bold">WonderCart</h1>
      </div>

     
      <div className="w-[40%]">
        <input
          type="text"
          placeholder="Search products"
          id="search"
          className="rounded-md w-[75%] p-2 bg-white text-black outline-none"
        />
      </div>

      <div className="w-[40%]">
        <ul className="flex justify-evenly font-medium">
          <li className="cursor-pointer hover:bg-black">Home</li>
          <li className="cursor-pointer hover:bg-black">Cart</li>
          <li className="cursor-pointer hover:bg-black">Profile</li>
          <li className="cursor-pointer hover:bg-black">Products</li>
        </ul>
      </div>
      
    </div>
  );
}

export default Navbar;
