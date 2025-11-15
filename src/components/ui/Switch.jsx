import React from "react";
import { motion } from "framer-motion";

export default function Switch({ checked, onChange }) {
  return (
    <motion.button
      onClick={() => onChange(!checked)}
      whileTap={{ scale: 0.95 }}
      className={`
        relative w-14 h-7 rounded-full flex items-center px-1
        border border-[#ffffff40]
        shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
        transition-all
        ${checked
          ? "bg-linear-to-b from-[#ff8547] to-[#ff5b1a]"
          : "bg-linear-to-b from-[#DBDBDB] to-[#595959]/40 "
        }
      `}
      style={{
        boxShadow: checked
          ? "0px 12px 30px rgba(255,125,0,0.25)"
          : "0px 6px 18px rgba(0,0,0,0.12)",
      }}
    >
      {/* Handle */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className={`
          w-5 h-5 rounded-full
          border border-[#ffffff40]
          shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
          ${checked
            ? "bg-white translate-x-7"
            : "bg-gray-200 translate-x-0"
          }
        `}
      />
    </motion.button>
  );
}
