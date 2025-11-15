import React from "react";
import { motion } from "framer-motion";

const ToggleGroupContext = React.createContext();

export function ToggleGroupRoot({
    value,
    onValueChange,
    children,
    className = "",
    type = "single", // single | multiple
}) {
    const [internalValue, setInternalValue] = React.useState(
        value || (type === "single" ? "" : [])
    );

    const handleValueChange = (newValue) => {
        if (type === "single") {
            const final = internalValue === newValue ? "" : newValue;
            setInternalValue(final);
            onValueChange?.(final);
        } else {
            const array = Array.isArray(internalValue) ? internalValue : [];
            const final = array.includes(newValue)
                ? array.filter((v) => v !== newValue)
                : [...array, newValue];
            setInternalValue(final);
            onValueChange?.(final);
        }
    };

    React.useEffect(() => {
        if (value !== undefined) setInternalValue(value);
    }, [value]);

    return (
        <ToggleGroupContext.Provider
            value={{ value: internalValue, onValueChange: handleValueChange, type }}
        >
            <div
                className={`
          inline-flex rounded-xl p-1.5
          bg-linear-to-b from-[#DEDEDE] to-[#6A6A6A]/40
         
          shadow-[inset_0_2px_0_rgba(255,255,255,0.55)]
          backdrop-blur-sm
          ${className}
        `}
            >
                <div className="flex gap-1 p-1 rounded-lg bg-linear-to-b from-white to-gray-50 shadow-sm border border-[#ffffff40]">
                    {children}
                </div>
            </div>
        </ToggleGroupContext.Provider>
    );
}

export function ToggleGroupItem({ value, children, disabled = false }) {
    const context = React.useContext(ToggleGroupContext);
    if (!context) throw new Error("ToggleGroupItem must be inside ToggleGroupRoot");

    const { value: groupValue, onValueChange, type } = context;
    const isSelected =
        type === "single"
            ? groupValue === value
            : Array.isArray(groupValue) && groupValue.includes(value);

    return (
        <motion.button
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            onClick={() => !disabled && onValueChange(value)}
            disabled={disabled}
            className={`
        relative min-w-20 px-4 py-2 text-sm font-medium rounded-md
        transition-all select-none
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${isSelected ? "text-gray-900" : "text-gray-700"}
      `}
        >
            {isSelected && (
                <motion.div
                    layoutId="segment-highlight"
                    className="
            absolute inset-0 rounded-md
            bg-linear-to-b from-white to-gray-100
            border border-[#ffffff60]
            shadow-[0_3px_6px_rgba(0,0,0,0.12)]
          "
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
            )}

            <span className="relative z-10 tracking-wide">{children}</span>
        </motion.button>
    );
}

export function SimpleToggleGroup({ options, value, onValueChange }) {
    return (
        <ToggleGroupRoot value={value} onValueChange={onValueChange}>
            {options.map((opt) => (
                <ToggleGroupItem key={opt.value} value={opt.value}>
                    {opt.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroupRoot>
    );
}
