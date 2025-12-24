import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../component/Navbar";

function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [prodLoading, setProdLoading] = useState(true);
  const [catError, setCatError] = useState("");
  const [prodError, setProdError] = useState("");

  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   const fetchData = async (
  //     url,
  //     setData,
  //     setError,
  //     setLoading,
  //     headers = {}
  //   ) => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch(url, {
  //         signal: abortController.signal,
  //         headers,
  //       });
  //       if (!res.ok) throw new Error("Failed to fetch data");
  //       const data = await res.json();
  //       setData(data);
  //     } catch (err) {
  //       if (err.name === "AbortError") {
  //         console.log("Fetch aborted:", url);
  //       } else {
  //         setError(err.message);
  //         console.error(err);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData(
  //     "http://localhost:8000/api/category",
  //     setCategories,
  //     setCatError,
  //     setCatLoading
  //   );
  //   fetchData(
  //     "http://localhost:8000/api/products",
  //     setProducts,
  //     setProdError,
  //     setProdLoading,
  //     { Authorization: `Bearer ${token}` }
  //   );

  //   return () => abortController.abort();
  // }, [token]);

  const getCategory = async () =>{
    try{

      const res = await fetch("http://localhost:8000/api/category")
      const data = await res.json();
      setCategories(data);
    }catch(err){
        console.log(err)
    }finally{
      setCatLoading(false)
    }
  }

 const getProduct = async () => {
  try {
    
    const res = await fetch("http://localhost:8000/api/products", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${res.status}`);
    }

    const data = await res.json();
    setProducts(data);
  } catch (err) {
    console.error(err);
    setProdError(err.message);
  } finally {
    setProdLoading(false);
  }
};


  useEffect(()=>{
    
    getProduct();
    getCategory();

  },[])

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans bg-gradient-to-b from-gray-100 via-white to-gray-50">
      <Navbar setProducts={setProducts}/>

      <div className="mt-20">
        {/* HERO SECTION */}
        <section className="relative flex flex-col md:flex-row items-center justify-between py-20 px-6 md:px-14 text-center md:text-left gap-10">
          <div className="w-full md:w-1/2 space-y-5 z-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradientShift leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                WonderCart
              </span>
            </h2>
            <p className="text-gray-700 text-lg md:text-xl animate-fadeIn delay-200">
              Discover high-quality products and exclusive deals — all in one
              place!
            </p>
            <Link to="/Products">
              <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-9 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 animate-fadeIn delay-400">
                🛍️ Shop Now
              </button>
            </Link>
          </div>

          <div className="w-full md:w-1/2 relative flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
              alt="Shopping illustration"
              className="w-64 sm:w-72 md:w-96 transform hover:scale-110 transition-transform duration-1000 animate-float"
              loading="lazy"
            />
            <div className="absolute -bottom-16 -right-10 w-40 h-40 sm:w-56 sm:h-56 bg-purple-300 rounded-full opacity-30 blur-3xl animate-blob"></div>
            <div className="absolute -top-20 -left-14 w-52 h-52 sm:w-64 sm:h-64 bg-pink-300 rounded-full opacity-20 blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-16 px-6 md:px-14">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Browse Categories
          </h3>

          {catLoading ? (
            <p className="text-center text-gray-700">Loading categories...</p>
          ) : catError ? (
            <p className="text-center text-red-500">{catError}</p>
          ) : categories.length === 0 ? (
            <p className="text-center text-gray-500">No categories available</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/ProductDetails/${cat._id}`}
                  className="flex flex-col items-center p-4 rounded-2xl hover:scale-105 transition-transform duration-300"
                  aria-label={`View ${cat.title} category`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mb-3 border-4"
                    loading="lazy"
                  />
                  <h4 className="text-sm sm:text-md font-semibold text-gray-900 text-center">
                    {cat.title}
                  </h4>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* PRODUCTS */}
        <section className="py-16 px-6 md:px-14 bg-gradient-to-b from-white to-gray-50">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Featured Products
          </h3>

          {prodLoading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : prodError ? (
            <p className="text-center text-red-500">{prodError}</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden group"
                >
                  <Link to={`/ProductDetails/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  </Link>

                  <div className="p-5 space-y-2">
                    <h4 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-indigo-600 font-bold text-xl">
                      ₹{item.price}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {item?.category?.title ?? "No category"}
                    </p>

                    <Link to={`/singleproduct/${item._id}`}>
                      <button
                        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                        aria-label={`Add ${item.title} to cart`}
                      >
                        Add to cart
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-600 text-white text-center py-8 mt-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 animate-blob bg-white/20 blur-3xl"></div>
          <p className="relative text-sm">
            © {new Date().getFullYear()} <b>WonderCart</b>. All rights reserved.
          </p>
          <div className="relative flex justify-center gap-6 mt-4 text-xl">
            <i className="fa-brands fa-facebook hover:text-yellow-300"></i>
            <i className="fa-brands fa-instagram hover:text-yellow-300"></i>
            <i className="fa-brands fa-twitter hover:text-yellow-300"></i>
          </div>
        </footer>
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          .animate-gradientShift { background-size: 200% 200%; animation: gradientShift 15s ease infinite; }

          @keyframes fadeIn { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
          .animate-fadeIn { animation: fadeIn 1s ease forwards; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-400 { animation-delay: 0.4s; }

          @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
          .animate-float { animation: float 6s ease-in-out infinite; }

          @keyframes blob { 0%, 100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
          .animate-blob { animation: blob 20s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}
      </style>
    </div>
  );
}

export default Home;
