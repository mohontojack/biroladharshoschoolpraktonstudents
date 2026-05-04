"use client";

import { useState, useCallback, useEffect } from "react";
import SplashScreen from "@/components/landing/SplashScreen";
import HeroSection from "@/components/landing/HeroSection";
import MemorySection from "@/components/landing/MemorySection";
import VideoSection from "@/components/landing/VideoSection";
import MemoriesGallerySection from "@/components/landing/MemoriesGallerySection";
import PhotoGallerySection from "@/components/landing/PhotoGallerySection";
import TeachersSection from "@/components/landing/TeachersSection";
import AboutSchoolSection from "@/components/landing/AboutSchoolSection";
import EventDetailsSection from "@/components/landing/EventDetailsSection";
import WhyJoinSection from "@/components/landing/WhyJoinSection";
import AboutUsSection from "@/components/landing/AboutUsSection";
import RegistrationSection from "@/components/landing/RegistrationSection";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";
import AIChatbot from "@/components/landing/AIChatbot";
import BackToTop from "@/components/landing/BackToTop";
import FloatingNav from "@/components/landing/FloatingNav";

// Shared event bus for chatbot → form communication
type RegistrationDataHandler = ((data: Record<string, string>) => void) | null;
let registrationDataHandler: RegistrationDataHandler = null;

export function onRegistrationDataFromChatbot(
  handler: (data: Record<string, string>) => void
) {
  registrationDataHandler = handler;
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
      // Scroll to registration section
      setTimeout(() => {
        document
          .getElementById("registration")
          ?.scrollIntoView({ behavior: "smooth" });
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
        <MemorySection />
        <VideoSection />
        <MemoriesGallerySection />
        <PhotoGallerySection />
        <TeachersSection />
        <AboutSchoolSection />
        <EventDetailsSection />
        <WhyJoinSection />
        <AboutUsSection />
        <RegistrationSection prefilledData={chatbotData} />
      </main>
      <Footer className={showSplash ? "opacity-0" : ""} />

      {/* Floating Buttons — only after splash */}
      {!showSplash && (
        <>
          <BackToTop />
          <FloatingNav />
          <WhatsAppButton />
          <AIChatbot onRegistrationComplete={handleChatbotRegistration} />
        </>
      )}
    </div>
  );
}
