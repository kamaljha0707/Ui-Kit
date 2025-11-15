import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function DropdownMenu({
  triggerLabel = "Menu",
  items = [],
  highlighted = false,
  align = "left",
}) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);

  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Auto detect up / down
  useEffect(() => {
    if (open) {
      const trigger = triggerRef.current?.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - trigger.bottom;
      const menuHeight = 180;

      setOpenUpward(spaceBelow < menuHeight);
    }
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const close = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative inline-block">

      <motion.div
        animate={{
          boxShadow: open
            ? "0px 12px 30px rgba(255,125,0,0.25)"
            : "0px 6px 18px rgba(0,0,0,0.12)",
        }}
        className={`rounded-lg p-1 transition-all duration-300 mt-1
          ${
            highlighted
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
            w-full px-4 py-2 flex gap-2.5 items-center justify-between 
            rounded-[6px] bg-linear-to-b from-white to-gray-50 
            border border-[#ffffff40]
            shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
            transition-all
          "
        >
          <span className="text-sm text-gray-800">
            {triggerLabel || (
              <span className="text-gray-500">Choose option...</span>
            )}
          </span>

          <ChevronDown
            className={`w-4 h-4 text-gray-700 transition-transform ${
              open ? "rotate-180 text-[#ff6b2b]" : ""
            }`}
          />
        </motion.button>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{
              opacity: 0,
              y: openUpward ? 6 : -6,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: openUpward ? 6 : -6,
              scale: 0.95,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute z-50 w-40 rounded-2xl p-2
              bg-linear-to-b from-white to-gray-50
              border border-[#ffffff40]
              shadow-[0_12px_25px_rgba(0,0,0,0.25)]
              backdrop-blur-sm
              ${align === "right" ? "right-0" : "left-0"}
              ${openUpward ? "bottom-full mb-2" : "top-full mt-2"}
            `}
          >
            <div className="flex flex-col gap-1">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                  className="
                    px-3 py-2 text-sm rounded-lg cursor-pointer 
                    hover:bg-[#ff8547]/20
                    hover:text-[#ff5b1a]
                    transition-all
                  "
                >
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
