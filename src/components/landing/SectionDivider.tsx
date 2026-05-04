"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionDividerProps {
  className?: string;
  style?: "wave" | "dots" | "line" | "curve";
  variant?: "gold" | "forest" | "subtle";
}

export default function SectionDivider({
  className = "",
  style = "wave",
  variant = "subtle",
}: SectionDividerProps) {
  const colors = {
    gold: {
      main: "rgba(200,164,94,0.2)",
      bg: "rgba(200,164,94,0.05)",
    },
    forest: {
      main: "rgba(13,59,46,0.15)",
      bg: "rgba(13,59,46,0.03)",
    },
    subtle: {
      main: "rgba(0,0,0,0.06)",
      bg: "rgba(0,0,0,0.02)",
    },
  };

  const c = colors[variant];

  if (style === "dots") {
    return (
      <div className={`flex items-center justify-center gap-1.5 py-4 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: c.main }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
    );
  }

  if (style === "curve") {
    return (
      <div className={`relative h-8 overflow-hidden ${className}`}>
        <svg viewBox="0 0 1440 40" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z"
            fill={c.bg}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.path
            d="M0,25 C360,10 1080,40 1440,25"
            fill="none"
            stroke={c.main}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
      </div>
    );
  }

  if (style === "line") {
    return (
      <div className={`relative flex items-center justify-center py-2 ${className}`}>
        <motion.div
          className="h-px bg-gradient-to-r from-transparent to-gold/20 flex-1"
          initial={{ scaleX: 0, transformOrigin: "right" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ transformOrigin: "right" }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-gold/30 mx-3"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
        />
        <motion.div
          className="h-px bg-gradient-to-l from-transparent to-gold/20 flex-1"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
      </div>
    );
  }

  // Default: wave
  return (
    <div className={`relative h-6 overflow-hidden ${className}`}>
      <svg viewBox="0 0 1440 30" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
        <motion.path
          d="M0,15 Q180,0 360,15 T720,15 T1080,15 T1440,15 L1440,30 L0,30 Z"
          fill={c.bg}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </svg>
    </div>
  );
}

// Ripple effect for buttons
export function RippleButton({
  children,
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <span className="absolute inset-0 bg-white/0 hover:bg-white/10 active:bg-white/20 transition-colors duration-200" />
    </motion.button>
  );
}
