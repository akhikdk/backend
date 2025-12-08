import React, { useState } from "react";
import Navbar from "../component/Navbar";

function ProfileCreation() {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex justify-center py-16 px-6">
      
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-10">
          Create Your Premium Profile
        </h1>

        {/* AVATAR UPLOAD */}
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 rounded-full bg-white/10 border border-white/20 flex justify-center items-center overflow-hidden shadow-lg cursor-pointer hover:opacity-80">
            {avatar ? (
              <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">Upload</span>
            )}
          </div>
          <label className="mt-4 cursor-pointer text-yellow-400 underline">
            <input
              type="file"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            Choose Avatar
          </label>
        </div>

        {/* FORM */}
        <form className="mt-10 space-y-6">

          {/* NAME */}
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="email address"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* MEMBERSHIP TIER */}
          <div>
            <label className="block text-gray-300 mb-2">Membership Tier</label>
            <select className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-xl outline-none">
              <option className="text-black">Basic</option>
              <option className="text-black">Silver</option>
              <option className="text-black">Gold</option>
              <option className="text-black">Platinum</option>
            </select>
          </div>

          {/* PREFERENCES */}
          <div>
            <label className="block text-gray-300 mb-2">Preferences</label>
            <div className="flex flex-wrap gap-3">
              {[
                "Luxury Items",
                "Tech Gadgets",
                "Fast Shipping",
                "Travel Deals",
                "Exclusive Access",
                "VIP Sales",
              ].map((pref, i) => (
                <label
                  key={i}
                  className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-gray-200 text-sm cursor-pointer hover:bg-white/20"
                >
                  <input type="checkbox" className="mr-2" />
                  {pref}
                </label>
              ))}
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <label className="block text-gray-300 mb-1">About You</label>
            <textarea
              rows="4"
              placeholder="Write something about yourself..."
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none"
            />
          </div>

          {/* SUBMIT */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="px-10 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full text-black font-semibold shadow-lg hover:shadow-2xl transition"
            >
              Create Profile
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ProfileCreation;