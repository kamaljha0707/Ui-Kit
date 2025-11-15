import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MenuBar({ menus = [] }) {
    const [active, setActive] = useState(null);
    const tabRefs = useRef([]);

    return (
        <div className="relative w-max">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-xl
          border border-white/10 rounded-[10px] shadow-[0_0_8px_rgba(0,0,0,0.3)]">
                {menus.map((menu, i) => {
                    const isActive = active === i;

                    return (
                        <motion.button
                            key={i}
                            ref={(el) => (tabRefs.current[i] = el)}
                            onClick={() => setActive(isActive ? null : i)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                relative px-4 py-2 text-sm font-normal rounded-md
                transition-all cursor-pointer
                ${isActive ? "text-white" : "text-black"}
              `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="menubar-bg"
                                    className="
                    absolute inset-0 rounded-md
                    bg-[#ff6b2b]
                    shadow-[0_6px_18px_rgba(255,107,43,0.45)]
                  "
                                />
                            )}

                            <span className="relative z-10">{menu.label}</span>
                        </motion.button>
                    );
                })}
            </div>


            <AnimatePresence>
                {active !== null && menus[active]?.items && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="
              absolute left-0 mt-1
              rounded-xl bg-[#F3F4F6] backdrop-blur-xl
              border border-white/10
              shadow-[0_0_18px_rgba(0,0,0,0.3)]
              p-2
              z-50
            "
                        style={{
                            top:
                                tabRefs.current[active]?.offsetTop +
                                tabRefs.current[active]?.offsetHeight +
                                4,
                            left: tabRefs.current[active]?.offsetLeft,
                            minWidth: tabRefs.current[active]?.offsetWidth + 40,
                        }}
                    >
                        <div className="flex flex-col gap-1 w-full">
                            {menus[active].items.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 6, scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => {
                                        item.action && item.action();
                                        setActive(null);
                                    }}
                                    className="
                    px-4 py-2 rounded-md cursor-pointer
                    bg-white/5 hover:bg-[#ff8547]/20
                    text-black hover:text-[#ff5b1a]
                    transition-all text-sm
                  "
                                >
                                    {item.label}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
