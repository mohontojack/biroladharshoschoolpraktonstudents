"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface LightboxImage {
  src: string;
  alt?: string;
  caption?: string;
  captionBn?: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  const currentImage = images[currentIndex];

  const resetZoom = useCallback(() => {
    setIsZoomed(false);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const goPrev = useCallback(() => {
    if (isZoomed) {
      resetZoom();
      return;
    }
    resetZoom();
    setDirection(-1);
    const newIndex =
      (currentIndex - 1 + images.length) % images.length;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate, isZoomed, resetZoom]);

  const goNext = useCallback(() => {
    if (isZoomed) {
      resetZoom();
      return;
    }
    resetZoom();
    setDirection(1);
    const newIndex = (currentIndex + 1) % images.length;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate, isZoomed, resetZoom]);

  const toggleZoom = useCallback(() => {
    if (isZoomed) {
      resetZoom();
    } else {
      setIsZoomed(true);
    }
  }, [isZoomed, resetZoom]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images.length, goPrev, goNext, onClose]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (activeThumbRef.current && thumbnailStripRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  // Swipe handlers
  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (isZoomed) return;
      const threshold = 80;
      if (info.offset.x < -threshold) {
        goNext();
      } else if (info.offset.x > threshold) {
        goPrev();
      }
    },
    [goNext, goPrev, isZoomed]
  );

  // Pan handler for zoomed state
  const handlePan = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!isZoomed) return;
      setPanOffset({ x: info.offset.x, y: info.offset.y });
    },
    [isZoomed]
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: isZoomed ? 2.5 : 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[60] flex flex-col"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={() => {
            if (isZoomed) {
              resetZoom();
            } else {
              onClose();
            }
          }}
        />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          {/* Image Counter */}
          <div className="flex items-center gap-2">
            <span className="text-gold font-mono text-sm tracking-wider bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20">
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {/* Zoom Toggle */}
          <button
            onClick={toggleZoom}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 hover:border-gold/30 transition-all duration-200"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? (
              <ZoomOut className="w-4 h-4" />
            ) : (
              <ZoomIn className="w-4 h-4" />
            )}
            <span className="text-xs font-medium hidden sm:inline">
              {isZoomed ? "Zoom Out" : "Zoom In"}
            </span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/10 hover:border-gold/30 transition-all duration-200"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Area */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden px-4">
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 hover:border-gold/30 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 hover:border-gold/30 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Image with crossfade */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2 },
                scale: { duration: isZoomed ? 0.3 : 0.3, ease: "easeOut" },
              }}
              drag={isZoomed ? true : "x"}
              dragConstraints={
                isZoomed
                  ? { left: -200, right: 200, top: -200, bottom: 200 }
                  : { left: 0, right: 0 }
              }
              dragElastic={isZoomed ? 0.1 : 0.4}
              onDragEnd={handleDragEnd}
              onDrag={handlePan}
              className="absolute cursor-grab active:cursor-grabbing"
              style={isZoomed ? { x: panOffset.x, y: panOffset.y } : undefined}
              onDoubleClick={toggleZoom}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt || `Photo ${currentIndex + 1}`}
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl select-none"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Caption Area */}
        <div className="relative z-10 text-center px-6 py-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-0.5"
            >
              {(currentImage.alt || currentImage.caption) && (
                <p className="text-white/90 text-sm sm:text-base font-medium truncate max-w-lg">
                  {currentImage.caption || currentImage.alt}
                </p>
              )}
              {currentImage.captionBn && (
                <p className="text-gold/80 text-xs sm:text-sm truncate max-w-lg">
                  {currentImage.captionBn}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Strip */}
        <div className="relative z-10 px-4 py-3 sm:px-6 sm:py-4">
          <div
            ref={thumbnailStripRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {images.map((img, idx) => (
              <button
                key={img.src}
                ref={idx === currentIndex ? activeThumbRef : undefined}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  onNavigate(idx);
                }}
                className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                  idx === currentIndex
                    ? "ring-2 ring-gold scale-110 shadow-lg shadow-gold/20"
                    : "opacity-50 hover:opacity-80 hover:scale-105"
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
