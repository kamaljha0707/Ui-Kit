import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

// Provider Component
export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, options = {}) => {
    const id = Date.now();
    const { duration = 3000, type = "default" } = options;
    
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {/* Toast Container - Bottom Right Stack */}
      <div className="fixed bottom-6 right-6 z-9999 flex flex-col-reverse gap-3 items-end">
        <AnimatePresence mode="popLayout">
          {toasts.map(({ id, message, type }, index) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
              }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ 
                duration: 0.35, 
                ease: "easeOut",
                layout: { duration: 0.3 }
              }}
              className="relative"
            >
              {/* Background wrapper with theme styling */}
              <motion.div
                animate={{
                  boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
                }}
                className="rounded-lg p-1 bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
              >
                <div
                  className={`
                    rounded-[6px] px-4 py-3 min-w-[220px] max-w-[320px]
                    bg-linear-to-b from-white to-gray-50
                    border border-[#ffffff40]
                    shadow-[inset_0_2px_0_rgba(255,255,255,0.5)]
                    backdrop-blur-sm
                    text-gray-800 font-normal
                    select-none pointer-events-auto
                    ${type === "success" ? "border-l-4 border-l-green-500" : ""}
                    ${type === "error" ? "border-l-4 border-l-red-500" : ""}
                    ${type === "warning" ? "border-l-4 border-l-orange-500" : ""}
                    ${type === "info" ? "border-l-4 border-l-blue-500" : ""}
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm flex-1 pr-2">{message}</p>
                    
                    {/* Close Button */}
                    <motion.div
                      animate={{
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                      }}
                      className="rounded-lg p-0.5 shrink-0 bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
                    >
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeToast(id)}
                        className="
                          w-5 h-5 rounded-lg flex items-center justify-center
                          bg-linear-to-b from-white to-gray-50
                          border border-[#ffffff40]
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]
                          transition-all cursor-pointer
                          hover:bg-gray-100
                        "
                      >
                        <X size={12} className="text-gray-700" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}