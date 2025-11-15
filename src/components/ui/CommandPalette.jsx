import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

export default function CommandPalette({
  isCommandOpen = false,
  openCommand = () => {},
  closeCommand = () => {},
  commandItems = [],
}) {
  const [searchText, setSearchText] = useState("");
  const paletteRef = useRef(null);


  useEffect(() => {
    const handleKeys = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openCommand();
      }


      if (e.key === "Escape") {
        closeCommand();
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);


  useEffect(() => {
    const handleClick = (e) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target)) {
        closeCommand();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Filter list
  const filteredItems = commandItems.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-28 px-4"
        >
          {/* Outer Card */}
          <motion.div
            ref={paletteRef}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-xl rounded-3xl p-4
              bg-linear-to-b from-[#DBDBDB] to-[#595959]/40
              shadow-[0_12px_28px_rgba(0,0,0,0.25)]"
          >
            {/* Inner Layer */}
            <div
              className="rounded-xl bg-linear-to-b from-white to-gray-50
              border border-[#ffffff40]
              shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]
              overflow-hidden"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200/80">
                <Search size={18} className="text-gray-500" />
                <input
                  autoFocus
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Type a command or search..."
                  className="w-full text-sm bg-transparent outline-none text-gray-700"
                />
                <X
                  size={18}
                  className="text-gray-500 cursor-pointer hover:text-black transition"
                  onClick={closeCommand}
                />
              </div>

              {/* Command List */}
              <div className="max-h-72 overflow-hidden py-2">
                {filteredItems.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-4">
                    No results found
                  </p>
                ) : (
                  filteredItems.map((cmd, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        x: 4,
                        backgroundColor: "rgba(255,133,71,0.08)",
                      }}
                      className="px-4 py-2 text-sm cursor-pointer flex justify-between items-center
                        transition rounded-lg"
                      onClick={() => {
                        cmd.action();
                        closeCommand();
                      }}
                    >
                      <span>{cmd.label}</span>

                      {cmd.shortcut && (
                        <span className="text-[11px] px-2 py-1 rounded-md bg-gray-200 text-gray-600">
                          {cmd.shortcut}
                        </span>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
