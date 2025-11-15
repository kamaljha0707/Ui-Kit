import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <motion.div
      layout
      className="bg-linear-to-b from-white to-gray-50 rounded-2xl mb-3 shadow-[0_5px_15px_rgba(0,0,0,0.15)] overflow-hidden"
      transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
    >
      <motion.button
        layout="position"
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-gray-800 text-lg font-medium">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="text-[#FF6B2B] w-5 h-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            layout
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-gray-600">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-100 rounded-3xl p-6 shadow-[0_8px_25px_rgba(0,0,0,0.2)]">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
