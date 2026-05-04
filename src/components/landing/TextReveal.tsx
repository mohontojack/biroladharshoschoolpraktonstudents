"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  as: Tag = "p",
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2, rootMargin: "-50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const words = text.split(" ");

  return (
    <div ref={ref} className="contents">
      <Tag className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(4px)" }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}

// Animated line draw component
export function AnimatedLine({
  className = "",
  color = "from-gold/0 via-gold/40 to-gold/0",
  delay = 0,
}: {
  className?: string;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative h-px w-full overflow-hidden ${className}`}>
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${color}`}
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
