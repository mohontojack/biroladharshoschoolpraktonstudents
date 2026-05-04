"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SplashScreen from "@/components/landing/SplashScreen";
import HeroSection from "@/components/landing/HeroSection";
import MemoriesGallerySection from "@/components/landing/MemoriesGallerySection";
import VideoSection from "@/components/landing/VideoSection";
import TeachersSection from "@/components/landing/TeachersSection";
import EventDetailsSection from "@/components/landing/EventDetailsSection";
import RegistrationSection from "@/components/landing/RegistrationSection";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import AIChatbot from "@/components/landing/AIChatbot";
import BackToTop from "@/components/landing/BackToTop";
import FloatingNav from "@/components/landing/FloatingNav";
import SectionDivider from "@/components/landing/SectionDivider";

// Shared event bus for chatbot → form communication
type RegistrationDataHandler = ((data: Record<string, string>) => void) | null;
let registrationDataHandler: RegistrationDataHandler = null;

export function onRegistrationDataFromChatbot(
  handler: (data: Record<string, string>) => void
) {
  registrationDataHandler = handler;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold-light to-gold z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [chatbotData, setChatbotData] = useState<Record<string, string> | null>(null);

  // Lock body scroll while splash is visible
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  // When chatbot completes registration, scroll to form and fill it
  const handleChatbotRegistration = useCallback(
    (data: Record<string, string>) => {
      setChatbotData(data);
      // Scroll to registration section with mobile nav offset
      setTimeout(() => {
        const el = document.getElementById("registration");
        if (el) {
          const isMobile = window.innerWidth < 768;
          const offset = isMobile ? 70 : 0;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 500);
    },
    []
  );

  // Expose handler for RegistrationSection
  useEffect(() => {
    if (chatbotData) {
      registrationDataHandler?.(chatbotData);
    }
  }, [chatbotData]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <main className={`flex-1 ${!showSplash ? "page-reveal" : "opacity-0"}`}>
        <HeroSection />
        <SectionDivider style="dots" variant="gold" />
        <MemoriesGallerySection />
        <SectionDivider style="wave" variant="subtle" />
        <VideoSection />
        <SectionDivider style="dots" variant="forest" />
        <TeachersSection />
        <SectionDivider style="line" variant="gold" />
        <EventDetailsSection />
        <SectionDivider style="curve" variant="subtle" />
        <RegistrationSection prefilledData={chatbotData} />
      </main>
      <Footer className={showSplash ? "opacity-0" : ""} />

      {/* Floating Buttons — only after splash */}
      {!showSplash && (
        <>
          <ScrollProgress />
          <BackToTop />
          <FloatingNav />
          <WhatsAppButton />
          <AIChatbot onRegistrationComplete={handleChatbotRegistration} />
        </>
      )}
    </div>
  );
}
