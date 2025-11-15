import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

export default function Calendar({ onDateSelect }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonth, currentYear);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelectDate = (day) => {
    const dateObj = new Date(currentYear, currentMonth, day);
    setSelectedDate(dateObj);
    onDateSelect && onDateSelect(dateObj);
  };

  return (
    <motion.div
      className="max-w-sm mx-auto rounded-[28px] p-3.5 bg-linear-to-b from-[#DBDBDB] to-[#595959]/40 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="rounded-[14px] bg-linear-to-b from-white to-gray-50 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handlePrev}
            className="p-2 rounded-lg bg-linear-to-b from-gray-800 to-black text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.2)]"
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div>
            <h2 className="text-lg font-bold text-gray-900 text-center">{months[currentMonth]}</h2>
            <p className="text-gray-600 text-center -mt-1 text-sm">{currentYear}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleNext}
            className="p-2 rounded-lg bg-linear-to-b from-gray-800 to-black text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.2)]"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-700 mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-2">{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 text-sm">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={i} className="py-2"></div>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            const isSelected = selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear;

            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectDate(day)}
                className={`py-2 rounded-lg text-center transition-all font-medium
                  ${isSelected
                    ? "bg-linear-to-b from-[#ff8547] to-[#ff5b1a] text-white shadow-[0_6px_12px_rgba(255,125,0,0.4)]"
                    : isToday
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-700 hover:bg-gray-200/70"}
                `}
              >
                {day}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
