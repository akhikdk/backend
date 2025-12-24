import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({setProducts}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [search,SetSearch]=useState("")


  const getProduct=async()=>{

    let res=await fetch(`http://localhost:8000/api/products?search=${search}`)

    let data=await res.json()

    setProducts(data)
  }


  useEffect(()=>{
    getProduct()
  })

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "/cart" },
    // { name: "Products", path: "/" },
    // { name: "Login", path: "/login" },
    // { name: "Signup", path: "/signup" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsOpen(false); // close menu on logout
  };

  return (
    <nav className="
      w-full backdrop-blur-lg bg-gradient-to-r from-blue-500/70 to-indigo-500/70
      text-white shadow-xl px-6 py-4 md:px-10
      flex flex-col md:flex-row md:justify-between md:items-center
      border-b border-white/20
    ">
      {/* Logo + Toggle */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/" className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
          Wonder<span className="text-yellow-300">Cart</span>
        </Link>

        <button
          aria-label="Toggle menu"
          className="text-white md:hidden text-3xl transition-transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Menu */}
      <div className={`
        ${isOpen ? "flex" : "hidden"}
        flex-col md:flex md:flex-row md:items-center 
        md:space-x-8 w-full md:w-auto mt-4 md:mt-0
      `}>
        {/* Search Bar */}
        <div className="relative w-full md:w-72 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search premium products..."
            className="
              w-full px-4 py-2 rounded-xl 
              bg-white/20 text-white placeholder-white/70 
              shadow-inner border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-yellow-300 
              transition-all
            "

            onChange={(e)=>SetSearch(e.target.value)}
          />
         
          <button className="absolute right-3 top-2.5 text-white/70 text-lg">🔍</button>
        </div>

        {/* Navigation Links + Logout */}
        <ul className="flex flex-col md:flex-row md:space-x-6 text-lg font-medium w-full md:w-auto">
          {menuItems.map((item) => {
            const isLogin = item.name.toLowerCase() === "login";
            const isSignup = item.name.toLowerCase() === "signup";

            return (
              <li key={item.name} className="mb-2 md:mb-0">
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-md
                    ${isLogin || isSignup
                      ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-semibold shadow-lg hover:opacity-90"
                      : "text-white hover:bg-white/20 hover:shadow-lg"
                    }
                  `}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

          {/* Logout button inside menu */}
          <li>
            <button
              onClick={handleLogout}
              className="
                w-full md:w-auto block px-4 py-2 rounded-lg 
                bg-red-500 hover:bg-red-600 text-white font-semibold 
                transition-all
              "
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
