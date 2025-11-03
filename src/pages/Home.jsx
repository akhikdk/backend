import React from "react";

function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50 font-sans">
      <nav className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-wrap justify-between items-center px-8 py-4 shadow-lg">
        <div className="w-auto">
          <h1 className="text-3xl font-extrabold tracking-wide">WonderCart</h1>
        </div>

        <div className="w-full md:w-[40%] my-3 md:my-0">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full md:w-[80%] p-2 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
        </div>

        <ul className="flex flex-wrap justify-evenly w-full md:w-[35%] font-medium gap-3 md:gap-0">
          {["Home", "Cart", "Profile", "Products"].map((item) => (
            <li
              key={item}
              className="cursor-pointer px-4 py-2 rounded-md hover:bg-white hover:text-blue-600 transition-all"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      <section className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-8 md:px-16">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Shop the Latest <span className="text-yellow-300">Trends</span>
          </h2>
          <p className="text-lg text-gray-100 max-w-md">
            Discover top-quality products, exclusive deals, and new arrivals —
            all in one place. Elevate your shopping experience today.
          </p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition">
            Shop Now
          </button>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1606813902913-47c15f43c6b4?auto=format&fit=crop&w=900&q=80"
            alt="Shopping"
            className="rounded-xl shadow-2xl w-full md:w-3/4"
          />
        </div>
      </section>

      <section className="py-16 px-8 md:px-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured <span className="text-blue-600">Products</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all p-5 border border-gray-100"
            >
              <img
                src={`https://source.unsplash.com/random/300x300?product,${item}`}
                alt={`Product ${item}`}
                className="rounded-md mb-5 w-full h-56 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-700 mb-1">
                Product {item}
              </h4>
              <p className="text-blue-600 font-medium mb-3">₹299</p>
              <button className="w-full bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 hover:scale-[1.02] transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-6 mt-auto">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">WonderCart</span>. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
