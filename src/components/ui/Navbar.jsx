import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ButtonArrow from "../ui/ButtonArrow";

const defaultItems = [
  "Ongoing",
  "Refresh",
  "Sessions",
  "Overview",
  "Monitor",
  "Report",
  "Settings",
];

export default function Navbar({
  items = defaultItems,
  active = 0,
  onChange = () => {},
  className = "",
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile breakpoint
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

    //   MOBILE VERSION 
  if (isMobile) {
    return (
      <>
        <div className={`fixed top-0 left-0 right-0 z-50 p-3 ${className}`}>
          <motion.div
            animate={{ boxShadow: "0px 8px 25px rgba(0,0,0,0.2)" }}
            className="rounded-2xl p-1 bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
          >
            <div className="flex items-center justify-between rounded-xl bg-linear-to-b from-white to-gray-50 border border-[#ffffff40] shadow-[inset_0_2px_0_rgba(255,255,255,0.5)] backdrop-blur-sm px-4 py-3">

              {/* Logo */}
              <div className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer" title="logo"></div>

              {/* Active Name */}
              <span className="text-sm font-semibold text-gray-800">
                {items[active]}
              </span>

              {/* Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg bg-linear-to-b from-white to-gray-50 border border-[#ffffff40] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
              >
                <Menu size={18} className="text-gray-700" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="fixed top-20 left-4 right-4 z-50"
              >
                <motion.div
                  animate={{ boxShadow: "0px 12px 30px rgba(0,0,0,0.25)" }}
                  className="rounded-2xl p-1 bg-linear-to-b from-[#DBDBDB] to-[#595959]/40"
                >
                  <div className="rounded-xl bg-linear-to-b from-white to-gray-50 border border-[#ffffff40] shadow-[inset_0_2px_0_rgba(255,255,255,0.5)] backdrop-blur-sm p-4">

                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Navigation
                      </h3>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2 rounded-lg bg-linear-to-b from-white to-gray-50 border border-[#ffffff40] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                      >
                        <X size={18} className="text-gray-700" />
                      </motion.button>
                    </div>

                    <div className="space-y-1">
                      {items.map((item, index) => {
                        const isActive = index === active;

                        return (
                          <motion.button
                            key={index}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              onChange(index);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-linear-to-b from-white to-gray-100 border border-[#ffffff40] shadow-[0_2px_8px_rgba(0,0,0,0.1)] text-gray-800 font-semibold"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {item}
                          </motion.button>
                        );
                      })}

                      {/* CTA */}
                      <div className="pt-2">
                        <ButtonArrow text="Get Started" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

    //   DESKTOP VERSION 
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-4"
      } ${className}`}
    >
      <div className="flex justify-center px-4">
        <motion.div
          animate={{
            boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
            maxWidth: "1200px",
          }}
          className="rounded-full p-1 bg-linear-to-b from-[#DBDBDB] to-[#595959]/40 transition-all duration-300 mx-auto w-fit"
        >
          <div className="flex items-center gap-4 px-4 py-1">

            {/* Logo */}
            <div className="w-9 h-9 rounded-full bg-white/80 flex justify-center items-center shrink-0 cursor-pointer" title="logo" />

            {/* AUTO-SIZE NAV PILLS */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-linear-to-b from-white to-gray-50 border border-[#ffffff40] shadow-[inset_0_2px_0_rgba(255,255,255,0.5)] backdrop-blur-sm overflow-x-auto scrollbar-hide w-fit">
              {items.map((item, index) => {
                const isActive = index === active;

                return (
                  <motion.button
                    key={index}
                    onClick={() => onChange(index)}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-6 py-3 text-sm font-medium whitespace-nowrap rounded-full transition-all duration-300 shrink-0"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="absolute inset-0 rounded-full bg-linear-to-b from-white to-gray-100 border border-[#ffffff40] shadow-[0_2px_8px rgba(0,0,0,0.15)]"
                      />
                    )}

                    <span
                      className={`relative z-10 ${
                        isActive
                          ? "text-gray-800 font-semibold"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {item}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* CTA */}
            <div className="shrink-0 pl-3">
              <ButtonArrow size="md" text="Get Started" />
            </div>

          </div>
        </motion.div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
