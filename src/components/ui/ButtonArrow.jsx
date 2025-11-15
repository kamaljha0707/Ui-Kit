"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function Button({
  text = "Get Started",
  variant = "main", // 'base' | 'main'
  highlighted = true,
  size = "md", // 'sm' | 'md' | 'lg' | 'xl'
}) {
  const baseVariants = {
    rest: { scale: 1, y: 0 },
    hover: { scale: 1.04, y: -3 },
  };

  // ------- SIZE VARIANTS -------
  const sizeStyles = {
    sm: {
      padding: "px-4 py-1.5",
      font: "text-sm",
      iconBox: "w-6 h-6",
      icon: "w-4 h-4",
      gap: "gap-2",
    },
    md: {
      padding: "px-4 py-2",
      font: "text-base",
      iconBox: "w-8 h-8",
      icon: "w-5 h-5",
      gap: "gap-3",
    },
    lg: {
      padding: "px-7 py-4",
      font: "text-lg",
      iconBox: "w-10 h-10",
      icon: "w-6 h-6",
      gap: "gap-3",
    },
    xl: {
      padding: "px-9 py-5",
      font: "text-xl",
      iconBox: "w-12 h-12",
      icon: "w-7 h-7",
      gap: "gap-4",
    },
  };

  const sz = sizeStyles[size];

  // ------- STYLE VARIANTS -------
  const buttonStyles = {
    main: highlighted
      ? "bg-linear-to-b from-[#ff8547] to-[#ff5b1a] text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_8px_14px_rgba(255,125,0,0.4)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]"
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
      className={`relative overflow-hidden flex items-center justify-center rounded-lg font-bold shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_6px_10px_rgba(0,0,0,0.25)] transition-all duration-150 cursor-pointer ${sz.padding} ${sz.font} ${sz.gap} ${buttonStyles[variant]}`}
    >
      {/* Hover expanding light animation */}
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
          hover: {
            backgroundColor: highlighted ? "#ff8547" : "#000",
            color: "#fff",
            rotate: 45,
          },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`relative z-10 flex items-center justify-center rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.25)] ${sz.iconBox}`}
      >
        <ArrowUpRight className={sz.icon} />
      </motion.span>
    </motion.button>
  );
}
