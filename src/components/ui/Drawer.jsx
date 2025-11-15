import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Drawer({
  drawerVisible = false,
  hideDrawer = () => {},
  side = "right",
  width = "320px",
  children,
}) {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        hideDrawer();
      }
    };

    if (drawerVisible) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => document.removeEventListener("mousedown", handleClick);
  }, [drawerVisible]);

  const direction = side === "left" ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {drawerVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            ref={drawerRef}
            initial={{ x: direction, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`absolute top-0 h-full ${side}-0`}
            style={{ width }}
          >
            {/* Outer Layer */}
            <div
              className="h-full rounded-l-3xl p-4
                bg-linear-to-b from-[#DBDBDB] to-[#595959]/40
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              {/* Inner Layer */}
              <div
                className="h-full rounded-3xl bg-linear-to-b from-white to-gray-50
                border border-[#ffffff40]
                shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]
                flex flex-col relative"
              >
                {/* Close Button */}
                <button
                  onClick={hideDrawer}
                  className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-[#ff5b1a]"
                >
                  <X size={20} />
                </button>

                {/* Drawer Content */}
                <div className="p-6 overflow-y-auto">{children}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
