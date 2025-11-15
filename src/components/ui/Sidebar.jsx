import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Sidebar({ children, width = "300px" }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarVariants = {
    closed: { x: `-${width}`, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.div
        whileHover={{
          boxShadow: "0px 12px 30px rgba(255,125,0,0.25)",
        }}
        className="
          w-fit rounded-lg p-1 transition-all
          bg-linear-to-b from-[#DBDBDB] to-[#595959]/40
          hover:from-[#ff6b2b]/70 hover:to-[#ff6b2b]/80
        "
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setSidebarOpen(true)}
          className="
            w-full px-4 py-2 flex items-center justify-center gap-2.5 
            rounded-[6px] bg-linear-to-b from-white to-gray-50 
            border border-[#ffffff40]
            shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
            transition-all cursor-pointer
          "
        >
          <Menu size={20} className="text-gray-800" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ width }}
              className="
                fixed top-0 left-0 h-full p-6 z-50
                bg-linear-to-b from-white to-gray-50
                border-r border-[#ffffff40]
                shadow-[0_12px_25px_rgba(0,0,0,0.25)]
                backdrop-blur-sm
                rounded-r-2xl
                select-none
                text-gray-800
              "
            >
              {/* Close Button */}
              <div className="flex justify-end">
                <motion.div
                  whileHover={{
                    boxShadow: "0px 12px 30px rgba(255,125,0,0.25)",
                  }}
                  className="
                    rounded-lg p-1 inline-block transition-all
                    bg-linear-to-b from-[#DBDBDB] to-[#595959]/40
                
                  "
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSidebarOpen(false)}
                    className="
                      px-3 py-2 rounded-[6px]
                      bg-linear-to-b from-white to-gray-50
                      border border-[#ffffff40]
                      shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
                      transition-all cursor-pointer
                    "
                  >
                    <X size={18} className="text-gray-700" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Sidebar Children */}
              <div className="mt-4">{children}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
