import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function NativeSelect({
  label = "Select option",
  value = "",
  onChange = () => {},
  options = [],
  highlighted = false,
}) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  return (
    <div className="relative inline-block w-fit">
      {/* Outer Shadow Box */}
      <motion.div
        animate={{
          boxShadow: open
            ? "0px 12px 30px rgba(255,125,0,0.25)"
            : "0px 6px 18px rgba(0,0,0,0.12)",
        }}
        transition={{ duration: 0.3 }}
        className={`rounded-lg p-1 mt-1
          ${
            highlighted
              ? "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80"
              : "bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
          }
        `}
      >
        {/* Fake trigger UI */}
        <motion.div
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setOpen(true);
            selectRef.current?.focus();
          }}
          className="
            w-full px-4 py-2 flex items-center justify-between gap-2.5
            rounded-[6px] bg-linear-to-b from-white to-gray-50
            border border-[#ffffff40]
            shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
            cursor-pointer select-none
          "
        >
          <span className="text-sm text-gray-800">
            {value
              ? options.find((opt) => opt.value === value)?.label
              : label}
          </span>

          <ChevronDown
            className={`w-4 h-4 text-gray-700 transition-transform ${
              open ? "rotate-180 text-[#ff6b2b]" : ""
            }`}
          />
        </motion.div>

        {/* Native Select Overlaid */}
        <select
          ref={selectRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(false);
          }}
          onBlur={() => setOpen(false)}
          className="
            absolute inset-0 w-full h-full opacity-0 cursor-pointer
          "
        >
          <option value="" disabled hidden>
            {label}
          </option>
          {options.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </motion.div>
    </div>
  );
}
