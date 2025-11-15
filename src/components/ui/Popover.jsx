import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Popover({
  triggerLabel = "Open",
  highlighted = false,
  align = "left",
  width = "w-64",
  children,
}) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);

  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (open) {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - trigger.bottom;
      const popoverHeight = 220;

      setOpenUpward(spaceBelow < popoverHeight);
    }
  }, [open]);

  useEffect(() => {
    const close = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);


  const isHighlighted = open ? true : highlighted;

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <motion.div
        animate={{
          boxShadow: open
            ? "0px 12px 30px rgba(255,125,0,0.25)"
            : "0px 6px 18px rgba(0,0,0,0.12)",
        }}
        className={`rounded-lg p-1 mt-1 transition-all
          ${
            isHighlighted
              ? "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80"
              : "bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
          }
        `}
      >
        <motion.button
          ref={triggerRef}
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(!open)}
          className="
            w-full px-4 py-2 flex items-center justify-between gap-2.5
            rounded-[6px] bg-linear-to-b from-white to-gray-50
            border border-[#ffffff40]
            shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
            transition-all cursor-pointer
          "
        >
          <span className="text-sm text-gray-800">{triggerLabel}</span>

          <ChevronDown
            className={`w-4 h-4 text-gray-700 transition-transform ${
              open ? "rotate-180 text-[#ff6b2b]" : ""
            }`}
          />
        </motion.button>
      </motion.div>

      {/* Popover Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: openUpward ? 10 : -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: openUpward ? 10 : -10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute z-50 ${width} rounded-2xl p-4
              bg-linear-to-b from-white  to-gray-50
              border border-[#ffffff40]
              shadow-[0_12px_25px_rgba(0,0,0,0.25)]
              backdrop-blur-sm 
              ${align === "right" ? "right-0" : "left-0"}
              ${openUpward ? "bottom-full mb-3" : "top-full mt-3"}
            `}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
