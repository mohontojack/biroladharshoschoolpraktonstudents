"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Film,
  Users,
  Calendar,
  ClipboardList,
  ChevronUp,
  UserPlus,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "memories", label: "Memories", icon: BookOpen },
  { id: "videos", label: "Videos", icon: Film },
  { id: "teachers", label: "Teachers", icon: Users },
  { id: "details", label: "Event", icon: Calendar },
  { id: "registration", label: "Register", icon: ClipboardList },
];

export default function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);

      // Determine active section
      const sections = navItems.map((item) => item.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        // Mobile bottom nav height offset
        const offset = isMobile() ? 64 : 0;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }

      // Trigger pulse animation
      setPulseId(id);
      setTimeout(() => setPulseId(null), 600);
    },
    []
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPulseId("top");
    setTimeout(() => setPulseId(null), 600);
  };

  // Calculate the line fill percentage
  const lineFillPercent =
    navItems.length > 1
      ? (activeIndex / (navItems.length - 1)) * 100
      : 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop: Side dots navigation */}
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center"
            aria-label="Section navigation"
          >
            {/* Scroll to top button */}
            <button
              onClick={scrollToTop}
              className={`mb-3 p-1.5 rounded-full bg-forest/5 hover:bg-forest/10 transition-colors group relative ${
                pulseId === "top" ? "animate-pulse-once" : ""
              }`}
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-3 h-3 text-forest/40 group-hover:text-forest transition-colors" />
            </button>

            {/* Nav items with connecting line */}
            <div className="relative flex flex-col items-center" ref={navRef}>
              {/* Background connecting line */}
              <div className="absolute top-0 bottom-0 w-px bg-forest/10 -z-0" />

              {/* Animated fill line */}
              <div
                className="absolute top-0 w-px bg-gradient-to-b from-gold/60 to-gold -z-0 transition-all duration-500 ease-out"
                style={{
                  height:
                    navItems.length > 1
                      ? `${lineFillPercent}%`
                      : "0%",
                }}
              />

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isPulsing = pulseId === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative flex items-center my-[7px]"
                    aria-label={`Go to ${item.label}`}
                    whileTap={{ scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Tooltip with arrow */}
                    <span className="absolute left-full ml-3 z-10 pointer-events-none">
                      <span className="relative flex items-center">
                        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-forest-dark shadow-lg" />
                        <span className="relative px-3 py-1.5 bg-forest-dark text-white text-xs font-medium rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {item.label}
                        </span>
                      </span>
                    </span>

                    {/* Pulse ring animation */}
                    {isPulsing && (
                      <motion.div
                        className="absolute w-6 h-6 rounded-full bg-gold/20"
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    {/* Dot */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-gold scale-[1.6] shadow-md shadow-gold/40"
                          : "bg-forest/15 hover:bg-forest/40 scale-100"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.nav>

          {/* Mobile: Bottom nav bar */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-area-bottom"
          >
            {/* Background blur layer */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-forest/8 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]" />

            <div className="relative flex items-center justify-around px-1 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                const isPulsing = pulseId === item.id;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200 min-w-0 min-h-[44px] relative"
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    aria-label={item.label}
                  >
                    {/* Pulse overlay */}
                    {isPulsing && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gold/10"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}

                    <Icon
                      className={`w-[18px] h-[18px] transition-colors duration-200 ${
                        isActive ? "text-gold-dark" : "text-muted-foreground/50"
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium leading-tight truncate max-w-[48px] transition-colors duration-200 ${
                        isActive ? "text-forest-dark" : "text-muted-foreground/50"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-gold"
                        layoutId="mobile-nav-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Register CTA button */}
              <motion.button
                onClick={() => scrollToSection("registration")}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-h-[44px] bg-forest text-white shadow-md shadow-forest/20"
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                aria-label="Register"
              >
                <UserPlus className="w-[18px] h-[18px]" />
                <span className="text-[10px] font-semibold leading-tight">
                  Register
                </span>
              </motion.button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
