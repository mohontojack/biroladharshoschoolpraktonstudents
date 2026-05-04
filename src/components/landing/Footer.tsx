"use client";

import { motion } from "framer-motion";
import { Heart, Phone, Mail, ArrowUp } from "lucide-react";

export default function Footer({ className }: { className?: string }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`bg-forest-dark text-white/80 relative overflow-hidden ${className || ""}`}
    >
      {/* Wave divider at top */}
      <div className="relative h-8 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 40"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C240,30 480,40 720,25 C960,10 1200,5 1440,20 L1440,0 L0,0 Z"
            fill="#0A1F19"
          />
        </svg>
      </div>

      {/* Subtle gold line */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Fade-in wrapper */}
      <motion.div
        className="max-w-6xl mx-auto px-6 py-10 mobile-nav-spacer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center text-center">
          {/* School Identity */}
          <div className="flex flex-col items-center mb-3">
            <div className="w-14 h-14 rounded-full bg-white/5 border-2 border-gold/30 p-0.5 mb-3">
              <img
                src="/images/school-emblem.png"
                alt="Biral Adarsha High School"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-white font-bold text-base">
              Biral Adarsha High School
            </span>
          </div>

          <p className="text-white/45 text-xs mb-6 max-w-md leading-relaxed">
            Alumni Eid Reunion & Farewell Ceremony 2026 — A Grand Gathering
            Celebrating Friendship, Memories & Gratitude for Our Beloved Teachers
          </p>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <a
              href="tel:+8801705937212"
              className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm group"
            >
              <Phone className="w-3.5 h-3.5 group-hover:text-gold transition-colors" />
              <span className="relative">
                +8801705937212
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </span>
            </a>
            <span className="hidden sm:block w-1 h-1 bg-white/15 rounded-full" />
            <a
              href="mailto:mohontobacklinks22@gmail.com"
              className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors text-sm group"
            >
              <Mail className="w-3.5 h-3.5 group-hover:text-gold transition-colors" />
              <span className="relative">
                mohontobacklinks22@gmail.com
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </span>
            </a>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-gold/20 mb-5" />

          {/* Back to top link */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-gold transition-colors text-xs mb-5 group"
          >
            <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
            <span className="relative">
              Back to top
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </span>
          </button>

          {/* Made with love */}
          <p className="text-white/25 text-xs flex items-center gap-1.5">
            Made with
            <Heart className="w-3 h-3 text-gold/50 fill-gold/50" />
            by BAHS প্রাক্তন শিক্ষার্থী
          </p>

          <p className="text-white/15 text-[10px] mt-1.5">
            &copy; 2026 Biral Adarsha High School — All Alumni Rights Reserved
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
