"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function AlertDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  highlighted = false,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          {/* Outer Card Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative w-full max-w-md rounded-[28px] p-2.5 transition-all duration-300
              ${highlighted
                ? "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80 shadow-[0_10px_25px_rgba(255,125,0,0.3)]"
                : "bg-[#DBDBDB]/40 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              }`}
          >
            {/* Inner Content */}
            <div className="relative rounded-[28px] bg-linear-to-b from-white to-gray-50 p-6 pt-10 text-center">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-black cursor-pointer transition"
              >
                <X size={20} />
              </button>

              {/* Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-6 leading-snug">
                {description}
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-3">
                {/* Cancel */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-[#F3F4F6] text-gray-900 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
                >
                  {cancelText}
                </motion.button>

                {/* Confirm */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onConfirm}
                  className={`px-5 py-2.5 cursor-pointer rounded-lg font-semibold text-sm transition-all shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_6px_10px_rgba(0,0,0,0.25)] bg-linear-to-b from-[#ff8547] to-[#ff5b1a] text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_8px_14px_rgba(255,125,0,0.4)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]`}
                     
                >
                  {confirmText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
