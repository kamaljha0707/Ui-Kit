import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  totalPages = 10,
  currentPage = 1,
  onPageChange = () => {},
  highlighted = false,
}) {
  const createPages = () => {
    let pages = [];

    if (totalPages <= 7) {
  
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages); 

    return pages;
  };

  const pages = createPages();

  return (
    <div
      className={`inline-block px-3 py-2 rounded-2xl
        ${
          highlighted
            ? "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80 shadow-[0_10px_30px_rgba(255,125,0,0.35)]"
            : "bg-linear-to-b from-[#DBDBDB] to-[#595959]/40 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
        }`}
    >
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2
        bg-linear-to-b from-white to-gray-50
        border border-[#ffffff40]
        shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]"
      >
        {/* Prev */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded-lg bg-gray-100 border border-[#ffffff40]
          text-gray-700 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pages.map((p, i) =>
            p === "..." ? (
              <span
                key={i}
                className="px-2 text-gray-500 select-none"
              >
                ...
              </span>
            ) : (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onPageChange(p)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition
                  ${
                    p === currentPage
                      ? "bg-[#ff6b2b] text-white shadow-[0_4px_10px_rgba(255,125,0,0.4)]"
                      : "text-gray-700 hover:bg-orange-100/40 hover:text-[#ff6b2b]"
                  }`}
              >
                {p}
              </motion.button>
            )
          )}
        </div>

        {/* Next */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded-lg bg-gray-100 border border-[#ffffff40]
          text-gray-700 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
