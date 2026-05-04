"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Film,
  Users,
  Calendar,
  ClipboardList,
  ChevronUp,
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
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-0.5"
            aria-label="Section navigation"
          >
            <button
              onClick={scrollToTop}
              className="mb-2 p-1.5 rounded-full bg-forest/5 hover:bg-forest/10 transition-colors group"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-3 h-3 text-forest/40 group-hover:text-forest transition-colors" />
            </button>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group relative flex items-center"
                  aria-label={`Go to ${item.label}`}
                >
                  {/* Tooltip */}
                  <span className="absolute left-full ml-3 px-2.5 py-1 bg-forest-dark text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                    {item.label}
                  </span>
                  {/* Dot */}
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 my-0.5 ${
                      isActive
                        ? "bg-gold scale-150 shadow-md shadow-gold/30"
                        : "bg-forest/15 hover:bg-forest/40 scale-100"
                    }`}
                  />
                </button>
              );
            })}
          </motion.nav>

          {/* Mobile: Bottom nav bar */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-forest/10 shadow-lg shadow-forest/5 safe-area-bottom"
          >
            <div className="flex items-center justify-around px-1 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
              {navItems.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex flex-col items-center gap-0.5 px-1.5 py-1.5 rounded-lg transition-all duration-200 min-w-0 min-h-[44px] ${
                      isActive
                        ? "text-forest-dark"
                        : "text-muted-foreground/60 hover:text-forest/80"
                    }`}
                    aria-label={item.label}
                  >
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-gold-dark" : ""
                      }`}
                    />
                    <span className="text-[10px] font-medium leading-tight truncate max-w-[52px]">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
