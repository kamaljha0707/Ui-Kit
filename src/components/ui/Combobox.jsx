import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ComboBox({
  label = "Select option",
  options = [],
  value,
  onChange,
  width = "w-64",
  highlighted = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className={`relative ${width}`} ref={ref}>
      {/* Label */}
      <span className="text-xs text-gray-600 ml-1">{label}</span>

      <motion.div
        animate={{ 
          boxShadow: open
            ? "0px 12px 30px rgba(255,125,0,0.25)"
            : "0px 6px 18px rgba(0,0,0,0.12)"
        }}
        className={`rounded-lg p-1 mt-1 transition-all duration-300 
          ${highlighted
            ? "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80"
            : "bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
          }`}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(!open)}
          className={`w-full px-4 py-2 flex items-center justify-between 
             rounded-[6px] bg-linear-to-b from-white to-gray-50 
            border border-[#ffffff40]
            shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
            transition-all`}
        >
          <span className="text-sm text-gray-800">
            {value || <span className="text-gray-500">Choose option...</span>}
          </span>

          <ChevronDown
            className={`w-4 h-4 text-gray-700 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </motion.button>
      </motion.div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute z-50 mt-3 w-full rounded-2xl overflow-hidden
              bg-linear-to-b from-white to-gray-50 
              border border-[#ffffff40]
              shadow-[0_12px_30px_rgba(0,0,0,0.25)]
              backdrop-blur-sm p-2"
          >
            <div className="space-y-1">
              {options.map((opt, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-sm rounded-lg cursor-pointer 
                    hover:bg-[#ff8547]/20
                    hover:text-[#ff5b1a]
                    transition-all font-medium"
                >
                  {opt}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
