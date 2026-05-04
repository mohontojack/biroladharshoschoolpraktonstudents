"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Particle component for the emblem burst effect
function GoldenParticle({
  delay,
  angle,
  distance,
  size,
}: {
  delay: number;
  angle: number;
  distance: number;
  size: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * distance;
  const y = Math.sin(rad) * distance;

  return (
    <motion.div
      className="absolute rounded-full bg-gold"
      style={{ width: size, height: size }}
      initial={{
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
      }}
      animate={{
        opacity: [0, 1, 0.8, 0],
        scale: [0, 1.2, 0.8, 0],
        x: [0, x * 0.3, x * 0.7, x],
        y: [0, y * 0.3, y * 0.7, y],
      }}
      transition={{
        duration: 2,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

// Floating ambient particle (receives deterministic values from parent)
function AmbientParticle({
  size,
  left,
  animDelay,
  driftX,
  duration,
}: {
  size: number;
  left: number;
  animDelay: number;
  driftX: number;
  duration: number;
}) {
  return (
    <div
      className="absolute rounded-full bg-gold/30"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: "20%",
        animation: `particle-drift ${duration}s ease-out ${animDelay}s forwards`,
        "--drift-x": `${driftX}px`,
      } as React.CSSProperties}
    />
  );
}

// Deterministic random using seed (prevents re-render flicker)
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

// Typewriter text effect
function TypewriterText({
  text,
  startDelay,
  className,
}: {
  text: string;
  startDelay: number;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [displayedText, text, started]);

  return (
    <span className={className}>
      {displayedText}
      {displayedText.length < text.length && started && (
        <span className="inline-block w-[2px] h-[1em] bg-gold ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}

export default function SplashScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<
    "emblem" | "name" | "subtitle" | "tagline" | "exit" | "done"
  >("emblem");
  const [isExiting, setIsExiting] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  // Deterministic particle generation (won't change on re-render)
  const burstParticles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 24 + seededRandom(i + 1) * 15,
        distance: 60 + seededRandom(i + 10) * 80,
        size: seededRandom(i + 20) * 4 + 2,
        delay: 0.8 + seededRandom(i + 30) * 0.4,
      })),
    []
  );

  const ambientParticles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: seededRandom(i + 100) * 3 + 1,
        left: seededRandom(i + 200) * 100,
        animDelay: seededRandom(i + 300) * 3 + 1,
        driftX: (seededRandom(i + 400) - 0.5) * 80,
        duration: seededRandom(i + 500) * 4 + 3,
      })),
    []
  );

  const handleSkip = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 400);
  }, [onComplete]);

  // Phase transitions
  useEffect(() => {
    const t1 = setTimeout(() => setShowParticles(true), 600);
    const t2 = setTimeout(() => setPhase("name"), 1800);
    const t3 = setTimeout(() => setPhase("subtitle"), 3500);
    const t4 = setTimeout(() => setPhase("tagline"), 4500);
    const t5 = setTimeout(() => setIsExiting(true), 5500);
    const t6 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 6300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className={`fixed inset-0 z-[100] flex items-center justify-center ${
            isExiting ? "splash-exit" : ""
          }`}
          style={{
            background:
              "radial-gradient(ellipse at center, #0d3b2e 0%, #082a21 50%, #051e18 100%)",
          }}
          exit={{ opacity: 0 }}
        >
          {/* Deep background pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "url('/images/pattern.png')",
              backgroundSize: "150px",
            }}
          />

          {/* Radial ambient glow */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[100px]" />
          </div>

          {/* Ambient floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {ambientParticles.map((p) => (
              <AmbientParticle
                key={p.id}
                size={p.size}
                left={p.left}
                animDelay={p.animDelay}
                driftX={p.driftX}
                duration={p.duration}
              />
            ))}
          </div>

          {/* Main content container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* PHASE 1: Emblem */}
            <div className="relative mb-10">
              {/* Outer rotating ring */}
              <motion.div
                className="absolute -inset-6 rounded-full border border-gold/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold/40" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold/30" />
                <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 rounded-full bg-gold/30" />
                <div className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-gold/40" />
              </motion.div>

              {/* Second rotating ring */}
              <motion.div
                className="absolute -inset-10 rounded-full border border-gold/5 border-dashed"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Burst ring */}
              <AnimatePresence>
                {showParticles && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-gold/30"
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              {/* Emblem glow */}
              <motion.div
                className="absolute -inset-4 rounded-full animate-golden-pulse"
                style={{
                  background:
                    "radial-gradient(circle, rgba(200,164,94,0.15) 0%, transparent 70%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />

              {/* Emblem */}
              <motion.div
                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 animate-emblem-glow"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(200,164,94,0.4), rgba(200,164,94,0.1), rgba(200,164,94,0.3))",
                }}
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  duration: 1,
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-forest-dark p-1.5">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src="/images/school-emblem.png"
                      alt="Biral Adarsha High School Emblem"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Burst particles */}
              {showParticles &&
                burstParticles.map((p) => (
                  <GoldenParticle
                    key={p.id}
                    delay={p.delay}
                    angle={p.angle}
                    distance={p.distance}
                    size={p.size}
                  />
                ))}
            </div>

            {/* PHASE 2: School Name */}
            <AnimatePresence>
              {phase !== "emblem" && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="mb-3">
                    <TypewriterText
                      text="Biral Adarsha High School"
                      startDelay={0}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide"
                    />
                  </div>

                  <motion.div
                    className="flex items-center justify-center gap-3 mb-4"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold/50" />
                    <div className="w-2 h-2 rounded-full bg-gold/60" />
                    <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold/50" />
                  </motion.div>

                  <motion.p
                    className="text-gold/60 text-sm sm:text-base tracking-[0.25em] uppercase font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    Dinajpur, Bangladesh
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* PHASE 3: Event Title */}
            <AnimatePresence>
              {(phase === "subtitle" || phase === "tagline") && !isExiting && (
                <motion.div
                  className="text-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
                    <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent animate-text-shimmer">
                      Alumni Eid Reunion
                    </span>
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-light text-white/70">
                    & Farewell Ceremony <span className="text-gold/80 font-semibold">2026</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* PHASE 4: Bangla Tagline */}
            <AnimatePresence>
              {phase === "tagline" && !isExiting && (
                <motion.div
                  className="text-center mt-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Gold divider */}
                  <motion.div
                    className="flex items-center justify-center gap-3 mb-4"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-gold/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                    <div className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-gold/40" />
                  </motion.div>

                  {/* Bangla tagline with gold shimmer */}
                  <TypewriterText
                    text="শিক্ষার আলোয় আলোকিত বিরল — আমাদের স্মৃতি, আমাদের গর্ব, আমাদের ভালোবাসা"
                    startDelay={0.3}
                    className="block text-sm sm:text-base text-center tracking-wide font-light bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent animate-text-shimmer"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Loading bar */}
            <motion.div
              className="mt-10 w-48 sm:w-64 h-[2px] bg-white/5 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className="h-full rounded-full animate-loading-bar"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #c8a45e, #dfc07a, #c8a45e, transparent)",
                }}
              />
            </motion.div>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 z-20 text-white/30 hover:text-white/70 text-sm tracking-wider uppercase transition-colors cursor-pointer p-2 -m-2"
            aria-label="Skip intro"
          >
            Skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
