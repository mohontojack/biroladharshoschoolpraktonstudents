"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Phone, Mail } from "lucide-react";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={`bg-forest-dark text-white/80 relative overflow-hidden ${className || ""}`}>
      {/* Top gold line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16 mobile-nav-spacer">
        <div className="flex flex-col items-center text-center">
          {/* School Identity */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-gold/30 p-1 mb-4">
              <img
                src="/images/school-emblem.png"
                alt="Biral Adarsha High School"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-white font-bold text-lg">
              Biral Adarsha High School
            </span>
          </div>

          <p className="text-white/50 text-sm mb-8 max-w-md">
            Alumni Eid Reunion & Farewell Ceremony 2026 — A Grand Gathering
            Celebrating Friendship, Memories & Gratitude for Our Beloved Teachers
          </p>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <a
              href="tel:+8801705937212"
              className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm group"
            >
              <Phone className="w-4 h-4 group-hover:text-gold transition-colors" />
              <span>+8801705937212</span>
            </a>
            <span className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />
            <a
              href="mailto:mohontobacklinks22@gmail.com"
              className="inline-flex items-center gap-2 text-white/70 hover:text-gold transition-colors text-sm group"
            >
              <Mail className="w-4 h-4 group-hover:text-gold transition-colors" />
              <span>mohontobacklinks22@gmail.com</span>
            </a>
          </div>

          {/* Divider */}
          <div className="w-16 h-[1px] bg-gold/30 mb-8" />

          {/* Made with love */}
          <p className="text-white/30 text-sm flex items-center gap-1.5">
            Made with
            <Heart className="w-3.5 h-3.5 text-gold/60 fill-gold/60" />
            by BAHS প্রাক্তন শিক্ষার্থী
          </p>

          <p className="text-white/20 text-xs mt-2">
            &copy; 2026 Biral Adarsha High School — All Alumni Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
