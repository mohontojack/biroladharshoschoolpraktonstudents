"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2, Film, Share2, Eye } from "lucide-react";
import SectionReveal from "./SectionReveal";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  embedUrl: string;
  thumbnailGradient: string;
  accent: string;
}

const videos: VideoItem[] = [
  {
    id: "video-1",
    title: "Biral Adarsha High School",
    description:
      "A glimpse into the cherished memories of our beloved school — where dreams took shape and friendships were forged under the shade of knowledge.",
    videoUrl: "https://www.facebook.com/reel/1488914912409798/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1488914912409798%2F&show_text=false&width=560&t=0",
    thumbnailGradient: "from-forest via-forest-dark to-forest",
    accent: "gold",
  },
  {
    id: "video-2",
    title: "Alumni Reunion Moments",
    description:
      "Relive the golden moments from our previous gatherings — the laughter, the tears, the embraces. These are the memories that call us back home.",
    videoUrl: "https://www.facebook.com/reel/1639838217426446/",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1639838217426446%2F&show_text=false&width=560&t=0",
    thumbnailGradient: "from-gold-dark via-gold to-gold-light",
    accent: "forest",
  },
];

function VideoCard({
  video,
  index,
}: {
  video: VideoItem;
  index: number;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: video.videoUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(video.videoUrl);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <SectionReveal delay={index * 0.15} direction={index === 0 ? "left" : "right"}>
      <div ref={cardRef} className="group relative">
        {/* The Preview Card */}
        <AnimatePresence mode="wait">
          {!isPlaying ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden border border-forest/10 hover:border-gold/25 transition-all duration-500 hover:shadow-2xl hover:shadow-forest/10 cursor-pointer"
              onClick={handlePlay}
            >
              {/* Thumbnail Area with Gradient */}
              <div
                className={`relative h-64 sm:h-72 md:h-80 bg-gradient-to-br ${video.thumbnailGradient} flex items-center justify-center overflow-hidden`}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: "url('/images/pattern.png')",
                      backgroundSize: "100px",
                    }}
                  />
                </div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl" />

                {/* Film strip decoration */}
                <div className="absolute top-4 left-4 right-4 flex items-center gap-2">
                  <Film className={`w-4 h-4 ${video.accent === 'gold' ? 'text-gold/60' : 'text-white/60'}`} />
                  <div className="flex-1 h-[1px] bg-white/10" />
                  <span className={`text-xs font-medium tracking-wider uppercase ${video.accent === 'gold' ? 'text-gold/60' : 'text-white/60'}`}>
                    Video Highlight
                  </span>
                </div>

                {/* School emblem watermark */}
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/5 p-0.5">
                  <img
                    src="/images/school-emblem.png"
                    alt=""
                    className="w-full h-full rounded-full object-cover opacity-30"
                  />
                </div>

                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10"
                >
                  <div className="relative">
                    {/* Outer ring pulse */}
                    <div className={`absolute inset-0 w-20 h-20 -m-2 rounded-full ${video.accent === 'gold' ? 'bg-gold/20' : 'bg-white/20'} animate-ping`} style={{ animationDuration: '2s' }} />
                    {/* Main play button */}
                    <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center ${video.accent === 'gold' ? 'bg-gold text-forest-dark shadow-lg shadow-gold/30' : 'bg-white text-forest shadow-lg shadow-white/20'} transition-transform duration-300 group-hover:scale-110`}>
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </motion.div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Info Section */}
              <div className="bg-white p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
                    {video.title}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare();
                    }}
                    className="flex-shrink-0 p-2.5 rounded-full bg-cream hover:bg-sage transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Share video"
                  >
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {video.description}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground/60 text-xs">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Watch on Facebook</span>
                  </div>
                  <div className="flex-1 h-px bg-forest/5" />
                  <span className="text-xs font-medium text-gold-dark/70">
                    Click to play ▶
                  </span>
                </div>
              </div>

              {/* Share toast */}
              <AnimatePresence>
                {showShareToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-forest-dark text-white text-xs px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap z-20"
                  >
                    Link copied to clipboard!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl overflow-hidden border border-forest/10 shadow-2xl shadow-forest/10"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-forest-dark/90 hover:bg-forest-dark text-white px-3 py-2 rounded-full text-xs font-medium transition-colors shadow-lg backdrop-blur-sm min-h-[44px]"
              >
                <X className="w-3.5 h-3.5" />
                Close
              </button>

              {/* Video title overlay */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-forest-dark/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                <Volume2 className="w-3.5 h-3.5 text-gold" />
                {video.title}
              </div>

              {/* Facebook Embed */}
              <div className="relative bg-forest-dark">
                <iframe
                  ref={iframeRef}
                  src={video.embedUrl}
                  width="560"
                  height="314"
                  style={{
                    border: "none",
                    overflow: "hidden",
                    width: "100%",
                    display: "block",
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={video.title}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}

export default function VideoSection() {
  const [viewCount, setViewCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate view count
          const duration = 1500;
          const steps = 60;
          const increment = 1200 / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= 1200) {
              setViewCount(1200);
              clearInterval(interval);
            } else {
              setViewCount(Math.floor(current));
            }
          }, duration / steps);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-white via-cream/50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-forest/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-forest/70 text-sm font-medium">
              Video Highlights
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-6">
            Relive the Moments
            <span className="block text-forest/60 font-light mt-2">
              Through Our Videos
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Watch the cherished memories of Biral Adarsha High School — from our
            beloved campus to the reunions that brought us back together. These
            videos carry the essence of our shared journey.
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-gold" />
              <span className="text-forest-dark font-semibold">{videos.length} Videos</span>
            </div>
            <div className="w-px h-4 bg-forest/10" />
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gold" />
              <span className="text-forest-dark font-semibold">{viewCount.toLocaleString()}+ Views</span>
            </div>
          </div>
        </SectionReveal>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <SectionReveal delay={0.4} className="text-center mt-12">
          <p className="text-muted-foreground text-sm">
            More videos and memories will be added soon. Stay tuned!
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
