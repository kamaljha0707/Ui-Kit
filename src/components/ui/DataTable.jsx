import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, MoreVertical } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  hiddenOnMobile = [],  
  highlighted = false,
}) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const sortData = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return data;
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`rounded-[28px] p-3.5 transition-all w-full
        ${
          highlighted
            ? "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80 shadow-[0_12px_28px_rgba(255,125,0,0.35)]"
            : "bg-linear-to-b from-[#DBDBDB] to-[#595959]/40 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
        }`}
    >
      <div
        className="rounded-[14px] bg-linear-to-b from-white to-gray-50 
        border border-[#ffffff40] 
        shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]
        overflow-hidden w-full"
      >
        <div className="overflow-x-auto md:overflow-visible">
          <table className="w-full text-left text-gray-800 min-w-[600px] md:min-w-0">
            
            {/* HEADER */}
            <thead className="bg-gray-100/60 border-b border-gray-200">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    onClick={() => sortData(col.accessor)}
                    className={`px-5 py-3 text-[13px] font-semibold cursor-pointer select-none 
                      hover:text-[#ff6b2b] transition relative whitespace-nowrap
                      ${hiddenOnMobile.includes(col.accessor) ? "hidden md:table-cell" : ""}
                    `}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortField === col.accessor ? (
                        sortOrder === "asc" ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )
                      ) : (
                        <ChevronUp size={14} className="opacity-0" />
                      )}
                    </div>
                  </th>
                ))}

                {/* ACTION BUTTON HEAD */}
                <th className="px-5 py-3 text-[13px] font-semibold text-right">Actions</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {sortedData.map((row, i) => (
                <motion.tr
                  key={i}
                  whileHover={{
                    scale: 1.003,
                    backgroundColor: "rgba(255,133,71,0.06)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-100/70"
                >
                  {columns.map((col, idx) => (
                    <td
                      key={idx}
                      className={`px-5 py-3 text-sm whitespace-nowrap
                        ${hiddenOnMobile.includes(col.accessor) ? "hidden md:table-cell" : ""}
                      `}
                    >
                      {row[col.accessor]}
                    </td>
                  ))}

                  {/* DOTTED MENU BUTTON */}
                  <td className="px-5 py-3 text-right relative">
                    <button
                      className="p-2 rounded-full hover:bg-gray-200/60 transition"
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === i ? null : i)
                      }
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* MENU */}
                    <AnimatePresence>
                      {openMenuIndex === i && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-5 top-12 z-20
                            bg-white rounded-xl shadow-xl border border-[#e3e3e3] 
                            w-36 overflow-hidden"
                        >
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                            View
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                            Edit
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100">
                            Delete
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
