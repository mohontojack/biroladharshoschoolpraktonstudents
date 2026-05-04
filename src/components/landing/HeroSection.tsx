"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ChevronDown,
  CalendarHeart,
  Share2,
  Users,
  Heart,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── tiny magnetic-pull hook for buttons ─── */
function useMagneticPull(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      x.set(dx);
      y.set(dy);
    },
    [strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, springX, springY, handleMouse, reset };
}

/* ─── stagger helper ─── */
const stagger = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Ripple wrapper for stat cards ─── */
function RippleCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 800);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={stagger}
      custom={index}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onMouseDown={handleClick}
      className="relative overflow-hidden rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] px-5 py-3.5 cursor-default text-center select-none"
    >
      {/* ripple layers */}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="pointer-events-none absolute rounded-full bg-gold/20 animate-[burst_0.8s_ease-out_forwards]"
          style={{
            left: rp.x - 60,
            top: rp.y - 60,
            width: 120,
            height: 120,
          }}
        />
      ))}
      {/* glow on hover */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-gold/10 to-transparent" />
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const [regCount, setRegCount] = useState(0);
  const [displayYear, setDisplayYear] = useState(2020);
  const sectionRef = useRef<HTMLElement>(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });

  /* ── Parallax scroll ── */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 80]);

  /* ── Mouse tracking ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mousePosRef.current = { x: nx, y: ny };
    sectionRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    sectionRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    sectionRef.current.style.setProperty("--mouse-nx", `${nx}`);
    sectionRef.current.style.setProperty("--mouse-ny", `${ny}`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty("--mouse-x", "50%");
      sectionRef.current.style.setProperty("--mouse-y", "50%");
      sectionRef.current.style.setProperty("--mouse-nx", "0.5");
      sectionRef.current.style.setProperty("--mouse-ny", "0.5");
    }
  }, []);

  /* ── Registration count animation ── */
  useEffect(() => {
    const target = 150;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setRegCount(target);
          clearInterval(interval);
        } else {
          setRegCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  /* ── Year counting animation: 2020 → 2026 ── */
  useEffect(() => {
    const start = 2020;
    const end = 2026;
    let frame = 0;
    const totalFrames = 90; // ~1.5 s at 60 fps
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayYear(Math.round(start + (end - start) * eased));
        if (frame >= totalFrames) {
          setDisplayYear(end);
          clearInterval(interval);
        }
      }, 1000 / 60);
      return () => clearInterval(interval);
    }, 800); // start slightly before main title
    return () => clearTimeout(timeout);
  }, []);

  /* ── Navigation helpers ── */
  const scrollToRegistration = () =>
    document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
  const scrollToShowcase = () =>
    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });

  const handleShare = async () => {
    const shareData = {
      title: "Biral Adarsha High School - Alumni Eid Reunion & Farewell 2026",
      text: "Join us for the Alumni Eid Reunion & Farewell Ceremony 2026! Register now at",
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  /* ── Particle scroll parallax transforms ── */
  const psy0 = useTransform(scrollY, [0, 800], [0, 9]);
  const psy1 = useTransform(scrollY, [0, 800], [0, 15]);
  const psy2 = useTransform(scrollY, [0, 800], [0, 6]);
  const psy3 = useTransform(scrollY, [0, 800], [0, 12]);
  const psy4 = useTransform(scrollY, [0, 800], [0, 18]);
  const psy5 = useTransform(scrollY, [0, 800], [0, 9]);
  const psy6 = useTransform(scrollY, [0, 800], [0, 15]);
  const psy7 = useTransform(scrollY, [0, 800], [0, 6]);
  const psy8 = useTransform(scrollY, [0, 800], [0, 12]);
  const psy9 = useTransform(scrollY, [0, 800], [0, 3]);
  const particleScrollYs = [psy0, psy1, psy2, psy3, psy4, psy5, psy6, psy7, psy8, psy9];

  const particles = [
    { top: "25%", right: "25%", size: "w-2 h-2", dur: 4, delay: 0, mx: 25, my: -20 },
    { top: "33%", left: "33%", size: "w-1 h-1", dur: 5, delay: 1, mx: -30, my: 15 },
    { bottom: "33%", right: "33%", size: "w-3 h-3", dur: 6, delay: 2, mx: 20, my: 25 },
    { top: "50%", left: "15%", size: "w-1.5 h-1.5", dur: 4.5, delay: 0.5, mx: -20, my: -10 },
    { top: "15%", right: "15%", size: "w-1 h-1", dur: 5.5, delay: 1.5, mx: 15, my: -25 },
    { top: "60%", right: "20%", size: "w-2.5 h-2.5", dur: 7, delay: 3, mx: 30, my: 10 },
    { top: "40%", left: "50%", size: "w-1 h-1", dur: 5, delay: 0.8, mx: -15, my: 20 },
    { top: "75%", left: "40%", size: "w-2 h-2", dur: 6.5, delay: 2.5, mx: -25, my: -15 },
    { top: "20%", left: "60%", size: "w-1.5 h-1.5", dur: 4, delay: 1.2, mx: 10, my: 30 },
    { top: "85%", right: "35%", size: "w-3 h-3", dur: 8, delay: 0.3, mx: -10, my: -30 },
  ];

  /* ── Magnetic button instances ── */
  const mag1 = useMagneticPull(0.3);
  const mag2 = useMagneticPull(0.25);
  const mag3 = useMagneticPull(0.2);

  /* ── Stat items ── */
  const stats = [
    { label: "Eid-ul-Azha 2026", sub: "Save the Date", icon: CalendarHeart },
    { label: "Biral Adarsha", sub: "High School Campus", icon: Heart },
    { label: `${regCount}+ Registered`, sub: "Join the Celebration", icon: Users },
    { label: `${Math.floor(regCount * 2.8)}+ Visitors`, sub: "People viewing now", icon: Eye },
  ];

  /* ═══════════ RENDER ═══════════ */
  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
      style={{ touchAction: "manipulation" }}
    >
      {/* ── 1. Background image + parallax ── */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg-new.jpg')", y: bgY }}
        />

        {/* ── 7. Animated gradient overlay that shifts ── */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(8,42,33,0.75) 0%, rgba(13,59,46,0.55) 50%, rgba(8,42,33,0.80) 100%)",
              "linear-gradient(160deg, rgba(13,59,46,0.70) 0%, rgba(8,42,33,0.60) 50%, rgba(26,92,70,0.70) 100%)",
              "linear-gradient(115deg, rgba(8,42,33,0.72) 0%, rgba(13,59,46,0.58) 50%, rgba(8,42,33,0.78) 100%)",
              "linear-gradient(135deg, rgba(8,42,33,0.75) 0%, rgba(13,59,46,0.55) 50%, rgba(8,42,33,0.80) 100%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/50 to-transparent" />
      </div>

      {/* ── Mouse-tracking glow ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        aria-hidden="true"
      >
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px]"
          style={{
            left: "var(--mouse-x, 50%)",
            top: "var(--mouse-y, 50%)",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(200,164,94,0.8) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Decorative blurred orbs ── */}
      <motion.div
        animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-gold/8 rounded-full blur-3xl"
      />

      {/* ── 3. Floating particles with mouse-reactive parallax ── */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.size} bg-gold/30 rounded-full`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            y: particleScrollYs[i],
            // mouse-reactive parallax via CSS custom properties
            translateX: `calc((var(--mouse-nx, 0.5) - 0.5) * ${p.mx}px)`,
            translateY: `calc((var(--mouse-ny, 0.5) - 0.5) * ${p.my}px)`,
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* ══════════ CONTENT ══════════ */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* ── School Identity Badge ── */}
        <motion.div
          variants={stagger}
          custom={0}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-2.5 mb-6"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 p-0.5 flex-shrink-0">
            <img
              src="/images/school-emblem.png"
              alt="Biral Adarsha High School"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-white/95 text-sm font-semibold tracking-wide leading-tight">
              বিরল আদর্শ উচ্চ বিদ্যালয়
            </span>
            <span className="text-gold/70 text-xs font-medium tracking-wider">
              প্রাক্তন শিক্ষার্থী
            </span>
          </div>
        </motion.div>

        {/* ── Event Type Badge ── */}
        <motion.div
          variants={stagger}
          custom={1}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5"
        >
          <CalendarHeart className="w-3.5 h-3.5 text-gold" />
          <span className="text-white/70 text-xs font-medium tracking-wide">
            Eid-ul-Azha 2026 — 2nd / 3rd Day
          </span>
        </motion.div>

        {/* ── Main Title ── */}
        <motion.h1
          variants={stagger}
          custom={2}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-3"
        >
          <span className="block">Alumni Eid Reunion</span>
          <span className="block mt-1 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light text-white/80">
            &
          </span>
          <span className="block mt-1 gold-gradient-text">Farewell Ceremony</span>
        </motion.h1>

        {/* ── 4. Year counting animation 2020 → 2026 ── */}
        <motion.div
          variants={stagger}
          custom={3}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-3 mb-5"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-white/50 text-lg sm:text-xl font-light tracking-[0.2em] uppercase tabular-nums">
            {displayYear}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* ── Emotional Subtitle ── */}
        <motion.p
          variants={stagger}
          custom={4}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-9 leading-relaxed font-light"
        >
          The school where our childhood memories were made, our dreams took shape,
          and our foundation was built — let&apos;s come together once more to reunite,
          celebrate, and honor those who gave us everything.
        </motion.p>

        {/* ── 2. CTA Buttons with magnetic pull ── */}
        <motion.div
          variants={stagger}
          custom={5}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div style={{ x: mag1.springX, y: mag1.springY }}>
            <Button
              ref={mag1.ref as React.Ref<HTMLButtonElement>}
              onClick={scrollToRegistration}
              size="lg"
              onMouseMove={mag1.handleMouse}
              onMouseLeave={mag1.reset}
              className="relative bg-gold hover:bg-gold-dark text-forest-dark font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300 hover:scale-105 active:scale-95 animate-subtle-pulse"
            >
              Register Now
            </Button>
          </motion.div>

          <motion.div style={{ x: mag2.springX, y: mag2.springY }}>
            <Button
              ref={mag2.ref as React.Ref<HTMLButtonElement>}
              onClick={scrollToShowcase}
              variant="outline"
              size="lg"
              onMouseMove={mag2.handleMouse}
              onMouseLeave={mag2.reset}
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 active:scale-95"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div style={{ x: mag3.springX, y: mag3.springY }}>
            <motion.div
              variants={stagger}
              custom={6}
              initial="hidden"
              animate="visible"
            >
              <Button
                ref={mag3.ref as React.Ref<HTMLButtonElement>}
                onClick={handleShare}
                variant="ghost"
                size="lg"
                onMouseMove={mag3.handleMouse}
                onMouseLeave={mag3.reset}
                className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 px-4 py-6 rounded-full backdrop-blur-sm transition-all duration-300 active:scale-95"
                aria-label="Share this event"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── 5. Stat cards with ripple effect ── */}
        <motion.div
          variants={stagger}
          custom={7}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 sm:gap-5 mt-14"
        >
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <RippleCard key={i} index={i}>
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <Icon className="w-3.5 h-3.5 text-gold/60" />
                  <p className="text-gold font-semibold text-base sm:text-lg">{item.label}</p>
                  {i === 3 && (
                    <span className="relative flex h-2 w-2 ml-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                  )}
                </div>
                <p className="text-white/50 text-xs sm:text-sm">{item.sub}</p>
              </RippleCard>
            );
          })}
        </motion.div>

        {/* ── Contact hint ── */}
        <motion.div
          variants={stagger}
          custom={8}
          initial="hidden"
          animate="visible"
          className="mt-7"
        >
          <a
            href="https://wa.me/8801705937212"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 hover:text-gold text-sm transition-colors"
          >
            📞 +8801705937212 (WhatsApp)
          </a>
        </motion.div>
      </div>

      {/* ── 6. Morphing scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <button
          onClick={scrollToShowcase}
          className="flex flex-col items-center text-white/40 hover:text-white/70 transition-colors cursor-pointer group"
          aria-label="Scroll down"
        >
          <span className="text-[10px] mb-1.5 tracking-widest uppercase">Scroll</span>

          {/* SVG mouse shape with morphing dot inside */}
          <svg width="22" height="34" viewBox="0 0 22 34" fill="none" className="group-hover:scale-110 transition-transform duration-300">
            <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
            {/* Morphing inner dot */}
            <motion.circle
              cx="11"
              cy="11"
              r="3"
              fill="currentColor"
              className="text-gold"
              animate={{
                cy: [11, 21, 11],
                r: [3, 2.5, 3],
                opacity: [1, 0.4, 1],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
