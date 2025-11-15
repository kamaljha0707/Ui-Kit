import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

export default function DatePicker({
  label = "Select Date",
  value,
  onChange = () => {},
  highlighted = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );

  const pickerRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const selectDate = (day) => {
    if (!day) return;
    onChange(new Date(year, month, day));
    setIsVisible(false);
  };

  return (
    <div className="relative w-full max-w-xs" ref={pickerRef}>
      {/* Label */}
      <span className="text-xs text-gray-600 ml-1">{label}</span>

      <motion.div
        animate={{
          boxShadow: isVisible
            ? "0px 12px 30px rgba(255,125,0,0.25)"
            : "0px 6px 18px rgba(0,0,0,0.12)",
        }}
        className={`rounded-lg p-1 mt-1 transition-all duration-300 
          ${
            highlighted
              ? "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80"
              : "bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
          }`}
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsVisible(!isVisible)}
          className={`w-full px-4 py-2 flex items-center justify-between 
            rounded-[6px] bg-linear-to-b from-white to-gray-50 
            border border-[#ffffff40]
            shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
            transition-all`}
        >
          <span className="text-sm text-gray-800">
            {value ? value.toDateString() : (
              <span className="text-gray-500">Pick a date...</span>
            )}
          </span>

          <CalendarIcon
  size={18}
  className={`transition-colors duration-300 ${
    isVisible ? "text-[#ff6b2b]" : "text-gray-700"
  }`}
/>
        </motion.button>
      </motion.div>

      {/* DATE PICKER  */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-full mb-3 w-full z-50 rounded-2xl
              bg-linear-to-b from-white to-gray-50 
              border border-[#ffffff40]
              shadow-[0_12px_30px_rgba(0,0,0,0.25)]
              backdrop-blur-sm p-3"
          >
            {/* MONTH HEADER */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                className="p-1 hover:bg-gray-200 rounded-lg"
              >
                <ChevronLeft size={18} />
              </button>

              <p className="font-semibold text-gray-800">
                {monthNames[month]} {year}
              </p>

              <button
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                className="p-1 hover:bg-gray-200 rounded-lg"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* WEEK DAYS */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-600 mb-2">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* DAYS GRID */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {days.map((day, i) => {
                const isSelected =
                  value &&
                  day &&
                  value.getDate() === day &&
                  value.getMonth() === month &&
                  value.getFullYear() === year;

                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.08 }}
                    className={`text-sm flex items-center justify-center h-9 rounded-xl
                      cursor-pointer transition select-none 
                      ${
                        day
                          ? isSelected
                            ? "bg-[#ff6b2b] text-white shadow-[0_4px_10px_rgba(255,125,0,0.4)]"
                            : "hover:bg-gray-200 text-gray-800"
                          : "opacity-0 pointer-events-none"
                      }`}
                    onClick={() => selectDate(day)}
                  >
                    {day}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}