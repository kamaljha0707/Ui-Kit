import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const PricingCard = ({ title, price, features, highlighted, ctaText }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative rounded-[28px] p-3.5 transition-all duration-300
        ${highlighted
          ? "bg-linear-to-b from-[#ff6b2b]/70 to-[#ff6b2b]/80 shadow-[0_10px_25px_rgba(255,125,0,0.3)]"
          : "bg-linear-to-b from-[#DBDBDB] to-[#595959]/40 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
        }`}
    >
      <div
        className={`rounded-xl bg-linear-to-b from-white to-gray-50 py-8 px-4 flex flex-col h-full`}
      >
        {/* Title */}
        <div className="mb-5">
          <span
            className={`inline-block text-sm font-medium px-4 py-1.5 rounded-full ${highlighted
              ? "bg-orange-100 text-orange-700"
              : "bg-gray-100 text-gray-700"
              }`}
          >
            {title}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-1 mb-6">
          <span className="text-5xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500 text-sm mb-2">/month</span>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ y: 2, scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`w-full py-3.5 rounded-lg font-bold text-sm shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_6px_10px_rgba(0,0,0,0.25)] transition-all duration-150 cursor-pointer
          ${highlighted
              ? "bg-linear-to-b from-[#ff8547] to-[#ff5b1a] text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_8px_14px_rgba(255,125,0,0.4)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.2)]"
              : "bg-linear-to-b from-gray-700 to-black text-white hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_8px_14px_rgba(0,0,0,0.3)] active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.25)]"
            }`}
        >
          {ctaText}
        </motion.button>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex-1" />
      </div>
    </motion.div>
  );
};

export default function PricingPlans({ plans = [] }) {
  return (
    <section className="max-w-7xl mx-auto bg-white rounded-2xl p-8">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 text-sm">
          Flexible pricing options to scale with your business.
        </p>
      </div>

      {/* Cards */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15, duration: 0.4 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <PricingCard {...plan} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
