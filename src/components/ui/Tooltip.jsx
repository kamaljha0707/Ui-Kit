import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Tooltip({
  label = "Tooltip text",
  children,
  placement = "top", // top | bottom | left | right
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), 150);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  };


  const pos = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: placement === "top" ? 6 : -6, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              boxShadow: "0px 12px 30px rgba(255,125,0,0.25)",
            }}
            exit={{ opacity: 0, y: placement === "top" ? 6 : -6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`
              absolute z-50 px-3 py-1.5 rounded-lg text-sm
              bg-linear-to-b from-white to-gray-50
              border border-[#ffffff40]
              shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
              backdrop-blur-md text-gray-800
              whitespace-nowrap pointer-events-none
              ${pos[placement]}
            `}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
