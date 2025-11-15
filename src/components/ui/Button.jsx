"use client"
import React from "react"
import { motion } from "framer-motion"

export default function Button({
  text = "Get Started",
  highlighted = true,
  onClick,
  fullWidth = true,
  size = "md",
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "py-3.5 text-base",
    lg: "py-4 text-lg",
  }

  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ y: 2, scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      onClick={onClick}
      className={`
        px-6
        ${sizeClasses[size]}
        rounded-lg font-bold shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_6px_10px_rgba(0,0,0,0.25)]
        transition-all duration-150 cursor-pointer select-none
        ${
          highlighted
            ? "bg-linear-to-b from-[#ff8547] to-[#ff5b1a] text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_8px_14px_rgba(255,125,0,0.4)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]"
            : "bg-linear-to-b from-gray-700 to-black text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_8px_14px_rgba(0,0,0,0.3)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.25)]"
        }
      `}
    >
      {text}
    </motion.button>
  )
}
