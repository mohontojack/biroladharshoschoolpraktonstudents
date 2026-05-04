"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  scaleOnHover?: number;
  glareEnabled?: boolean;
  borderGlow?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  scaleOnHover = 1.02,
  glareEnabled = true,
  borderGlow = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);
  const scale = useSpring(isHovering ? scaleOnHover : 1, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
      setGlarePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {children}
      {glareEnabled && isHovering && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
        />
      )}
      {borderGlow && isHovering && (
        <div
          className="absolute -inset-[1px] rounded-[inherit] pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(200,164,94,0.25) 0%, transparent 50%)`,
          }}
        />
      )}
    </motion.div>
  );
}
