"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function Button({
  text = "Get Started",
  variant = "main", // 'base' | 'main'
  highlighted = true,
}) {
  const baseVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.04, y: -3 },
  };

  // Style variants
  const buttonStyles = {
    main: highlighted
      ? "bg-linear-to-b from-[#ff8547] to-[#ff5b1a] text-white  text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_8px_14px_rgba(255,125,0,0.4)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]"
      : "bg-linear-to-b from-gray-700 to-black text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_8px_14px_rgba(0,0,0,0.3)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.25)]",

    base: highlighted
      ? "bg-linear-to-b from-[#ff8547] to-[#ff5b1a] text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_8px_14px_rgba(0,0,0,0.3)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.25)]"
      : "bg-linear-to-b from-gray-900 to-black text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_8px_14px_rgba(0,0,0,0.3)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.25)]",
  };

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={baseVariants}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-bold text-base shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_6px_10px_rgba(0,0,0,0.25)] transition-all duration-150 cursor-pointer ${buttonStyles[variant]}`}
    >
      {/* Hover Animation */}
      <motion.div
        variants={{
          rest: { scale: 0, opacity: 0 },
          hover: { scale: 12, opacity: 1 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute right-0 w-8 h-8 bg-white rounded-full pointer-events-none"
      />

      {/* Text */}
      <motion.span
        variants={{
          rest: { color: "#fff" },
          hover: { color: highlighted ? "#ff8547" : "#000" },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 font-semibold"
      >
        {text}
      </motion.span>

      {/* Arrow Icon */}
      <motion.span
        variants={{
          rest: { backgroundColor: "#fff", color: "#ff8547", rotate: 0 },
          hover: { backgroundColor: highlighted ? '#ff8547' : '#000', color: "#fff", rotate: 45 },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.25)]"
      >
        <ArrowUpRight className="w-5 h-5" />
      </motion.span>
    </motion.button>
  );
}
