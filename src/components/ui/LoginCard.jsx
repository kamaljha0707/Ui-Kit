import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginCard({
  title = "Welcome Back",
  subtitle = "Login to your account",
  onSubmit = () => {},
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-md w-full mx-auto p-4"
    >
      {/* Outer Gradient Glass Wrapper */}
      <div
        className="rounded-3xl p-4 bg-linear-to-b from-[#DBDBDB] to-[#595959]/40 
        shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
      >
        {/* Inner Smooth Card */}
        <div
          className="rounded-[12px] bg-linear-to-b from-white to-gray-50 p-8
          border border-[#ffffff40] 
          shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]"
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500 text-sm mt-1">{subtitle}</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-2.5 text-sm rounded-lg 
                bg-[#F2F2F2] backdrop-blur-md
                border border-[#d9d9d9] 
                focus:outline-none focus:ring-2 focus:ring-[#ff6b2b]/80
                transition"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-4 py-2.5 text-sm rounded-lg 
                bg-[#F2F2F2] backdrop-blur-md
                border border-[#d9d9d9] 
                focus:outline-none focus:ring-2 focus:ring-[#ff5b1a]/80
                transition"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm
              bg-linear-to-b from-[#ff8547] to-[#ff5b1a] cursor-pointer
              shadow-[0_8px_16px_rgba(255,125,0,0.32)]
              hover:shadow-[0_10px_20px_rgba(255,125,0,0.42)]
              transition"
            >
              Login
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
