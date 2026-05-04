"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, CalendarHeart, Share2, Users, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [regCount, setRegCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Parallax scroll effect on background
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 100]);

  // Mouse tracking for glow effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    // Update CSS custom properties on the section for the glow
    sectionRef.current.style.setProperty("--mouse-x", `${mousePosRef.current.x}px`);
    sectionRef.current.style.setProperty("--mouse-y", `${mousePosRef.current.y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty("--mouse-x", "50%");
      sectionRef.current.style.setProperty("--mouse-y", "50%");
    }
  }, []);

  useEffect(() => {
    // Animate registration count
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

  const scrollToRegistration = () => {
    document
      .getElementById("registration")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToShowcase = () => {
    document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShare = async () => {
    const shareData = {
      title: "Biral Adarsha High School - Alumni Eid Reunion & Farewell 2026",
      text: "Join us for the Alumni Eid Reunion & Farewell Ceremony 2026! Register now at",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  // Particle data with varied sizes and scroll response
  // Individual scroll transforms to avoid hooks-in-loops
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
    { top: "25%", right: "25%", size: "w-2 h-2", duration: 4, delay: 0 },
    { top: "33%", left: "33%", size: "w-1 h-1", duration: 5, delay: 1 },
    { bottom: "33%", right: "33%", size: "w-3 h-3", duration: 6, delay: 2 },
    { top: "50%", left: "15%", size: "w-1.5 h-1.5", duration: 4.5, delay: 0.5 },
    { top: "15%", right: "15%", size: "w-1 h-1", duration: 5.5, delay: 1.5 },
    { top: "60%", right: "20%", size: "w-2.5 h-2.5", duration: 7, delay: 3 },
    { top: "40%", left: "50%", size: "w-1 h-1", duration: 5, delay: 0.8 },
    { top: "75%", left: "40%", size: "w-2 h-2", duration: 6.5, delay: 2.5 },
    { top: "20%", left: "60%", size: "w-1.5 h-1.5", duration: 4, delay: 1.2 },
    { top: "85%", right: "35%", size: "w-3 h-3", duration: 8, delay: 0.3 },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ touchAction: "manipulation" }}
    >
      {/* Background Image with Parallax Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg-new.jpg')", y: bgY }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest/60 to-forest-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/50 to-transparent" />
      </div>

      {/* Mouse-tracking glow effect */}
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

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/8 rounded-full blur-3xl" />

      {/* Floating particles with scroll response */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute ${p.size} bg-gold/30 rounded-full`}
          style={{ top: p.top, left: p.left, right: p.right, bottom: p.bottom, y: particleScrollYs[i] }}
          animate={{ y: [-10, 10, -10], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* School Identity Badge with Emblem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-5 py-2.5 mb-8"
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

        {/* Event Type Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6"
        >
          <CalendarHeart className="w-3.5 h-3.5 text-gold" />
          <span className="text-white/70 text-xs font-medium tracking-wide">
            Eid-ul-Azha 2026 — 2nd / 3rd Day
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
        >
          <span className="block">Alumni Eid Reunion</span>
          <span className="block mt-1 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light text-white/80">
            &
          </span>
          <span className="block mt-1 gold-gradient-text">Farewell Ceremony</span>
        </motion.h1>

        {/* Year highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-white/50 text-lg sm:text-xl font-light tracking-[0.2em] uppercase">
            2026
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Emotional Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
        >
          The school where our childhood memories were made, our dreams took shape,
          and our foundation was built — let&apos;s come together once more to reunite,
          celebrate, and honor those who gave us everything.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={scrollToRegistration}
            size="lg"
            className="relative bg-gold hover:bg-gold-dark text-forest-dark font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-gold/25 hover:shadow-gold/40 transition-all duration-300 hover:scale-105 active:scale-95 animate-subtle-pulse"
          >
            Register Now
          </Button>
          <Button
            onClick={scrollToShowcase}
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 active:scale-95"
          >
            Learn More
          </Button>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <Button
              onClick={handleShare}
              variant="ghost"
              size="lg"
              className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 px-4 py-6 rounded-full backdrop-blur-sm transition-all duration-300 active:scale-95"
              aria-label="Share this event"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Stats with animated counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-16"
        >
          {[
            { label: "Eid-ul-Azha 2026", sub: "Save the Date", icon: CalendarHeart },
            { label: "Biral Adarsha", sub: "High School Campus", icon: Heart },
            { label: `${regCount}+ Registered`, sub: "Join the Celebration", icon: Users },
            { label: `${Math.floor(regCount * 2.8)}+ Visitors`, sub: "People viewing now", icon: Eye },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="text-center cursor-default"
              >
                <div className="flex items-center justify-center gap-1.5 mb-1">
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
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8"
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={scrollToShowcase}
          className="flex flex-col items-center text-white/40 hover:text-white/70 transition-colors cursor-pointer"
          aria-label="Scroll down"
        >
          <span className="text-xs mb-1">Scroll Down</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
