"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Heart,
  ExternalLink,
  Maximize2,
  Facebook,
  Grid3x3,
  Images,
} from "lucide-react";
import SectionReveal from "./SectionReveal";
import ImageLightbox from "./ImageLightbox";

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  captionBn: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/img01.jpg", alt: "BAHS Teachers", caption: "Our Respected Teachers", captionBn: "আমাদের শ্রদ্ধেয় শিক্ষকগণ", category: "Teachers" },
  { src: "/images/gallery/img02.jpg", alt: "BAHS Alumni Together", caption: "Alumni Bonding", captionBn: "প্রাক্তনদের মেলবন্ধন", category: "Campus" },
  { src: "/images/gallery/img03.jpg", alt: "BAHS Achievement", caption: "Proud Achievements", captionBn: "গর্বের অর্জন", category: "Achievements" },
  { src: "/images/gallery/img04.jpg", alt: "Victory Day at BAHS", caption: "Victory Day Celebration", captionBn: "বিজয় দিবসের আয়োজন", category: "Events" },
  { src: "/images/gallery/img05.jpg", alt: "Students at BAHS", caption: "Campus Moments", captionBn: "ক্যাম্পাসের মুহূর্ত", category: "Campus" },
  { src: "/images/gallery/img06.jpg", alt: "BAHS Gate", caption: "The School Gate", captionBn: "স্কুলের গেট", category: "Campus" },
  { src: "/images/gallery/img07.jpg", alt: "BAHS Office", caption: "Trophy Cabinet", captionBn: "ট্রফি ক্যাবিনেট", category: "Achievements" },
  { src: "/images/gallery/img08.jpg", alt: "Science Event", caption: "Science Exhibition", captionBn: "বিজ্ঞান মেলা", category: "Events" },
  { src: "/images/gallery/img09.jpg", alt: "Biral Landscape", caption: "Beautiful Biral", captionBn: "সুন্দর বিরল", category: "Campus" },
  { src: "/images/gallery/img10.jpg", alt: "BAHS Building", caption: "School Building", captionBn: "স্কুল ভবন", category: "Campus" },
  { src: "/images/gallery/img11.jpg", alt: "BAHS Event", caption: "School Celebration", captionBn: "স্কুলের আনন্দ উৎসব", category: "Events" },
  { src: "/images/gallery/img12.jpg", alt: "BAHS Campus View", caption: "Campus View", captionBn: "ক্যাম্পাস দৃশ্য", category: "Campus" },
  { src: "/images/gallery/img13.jpg", alt: "BAHS Group Photo", caption: "Together We Stand", captionBn: "একসাথে আমরা", category: "Campus" },
  { src: "/images/gallery/img14.jpg", alt: "Teacher Speech", caption: "Teacher's Address", captionBn: "শিক্ষকের ভাষণ", category: "Teachers" },
  { src: "/images/gallery/img15.jpg", alt: "BAHS Students", caption: "Future Leaders", captionBn: "ভবিষ্যতের নেতৃত্ব", category: "Campus" },
  { src: "/images/gallery/img16.jpg", alt: "School Trip", caption: "School Excursion", captionBn: "স্কুল ভ্রমণ", category: "Events" },
  { src: "/images/gallery/img17.jpg", alt: "BAHS Classroom", caption: "Classroom Memories", captionBn: "ক্লাসরুমের স্মৃতি", category: "Campus" },
  { src: "/images/gallery/img18.jpg", alt: "BAHS Entrance Gate", caption: "The Entrance", captionBn: "প্রধান ফটক", category: "Campus" },
  { src: "/images/gallery/img19.jpg", alt: "BAHS Alumni Group", caption: "Alumni Family", captionBn: "প্রাক্তন পরিবার", category: "Campus" },
];

const categories = ["All", "Campus", "Teachers", "Events", "Achievements"];

// Index-based height pattern for masonry visual variety
const heightClasses = ["h-48", "h-64", "h-56", "h-72", "h-48", "h-64"];

export default function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const toggleLike = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setLikedPhotos((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section
      id="photo-gallery"
      className="py-24 md:py-32 bg-gradient-to-b from-white via-cream/30 to-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-gold/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-56 h-56 bg-forest/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <Images className="w-3.5 h-3.5 text-gold" />
            <span className="text-forest/70 text-sm font-medium">
              Photo Gallery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-4">
            <Camera className="inline w-8 h-8 sm:w-10 sm:h-10 text-gold mr-2 -mt-1" />
            Photo Gallery — ফটো গ্যালারি
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            আমাদের স্কুলের স্মৃতিগুলো এখনো সতেজ — Every frame holds a
            memory, every photo tells our story.
          </p>
        </SectionReveal>

        {/* Category Filter Tabs */}
        <SectionReveal delay={0.1} className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? galleryImages.length
                  : galleryImages.filter((img) => img.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-forest text-white shadow-md shadow-forest/20"
                      : "bg-white text-muted-foreground border border-forest/10 hover:border-gold/30 hover:text-forest-dark"
                  }`}
                >
                  {cat === "All" ? (
                    <Grid3x3 className="w-3.5 h-3.5" />
                  ) : null}
                  {cat}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      selectedCategory === cat
                        ? "bg-white/20 text-white"
                        : "bg-cream text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-muted-foreground/60 text-xs">
            Showing {filteredImages.length} of {galleryImages.length} photos —
            click any photo to view in lightbox
          </p>
        </SectionReveal>

        {/* Masonry Photo Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filteredImages.map((image, index) => {
              const globalIndex = galleryImages.indexOf(image);
              const heightClass =
                heightClasses[index % heightClasses.length];
              const isLiked = likedPhotos.has(globalIndex);

              return (
                <SectionReveal
                  key={image.src}
                  delay={index * 0.04}
                  direction={
                    index % 4 === 0
                      ? "left"
                      : index % 4 === 2
                        ? "right"
                        : "up"
                  }
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group break-inside-avoid mb-0 cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <div
                      className={`relative ${heightClass} rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-forest/10 transition-all duration-500`}
                    >
                      {/* Image */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        draggable={false}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                          {image.category}
                        </span>
                      </div>

                      {/* Expand Icon */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                          <Maximize2 className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-semibold text-xs sm:text-sm drop-shadow-lg truncate">
                          {image.caption}
                        </p>
                        <p className="text-white/70 text-xs mt-0.5 truncate">
                          {image.captionBn}
                        </p>
                      </div>

                      {/* Like Button (always visible on hover) */}
                      <button
                        onClick={(e) => toggleLike(e, globalIndex)}
                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
                        aria-label={isLiked ? "Unlike" : "Like"}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 text-white ${isLiked ? "fill-red-400" : ""}`}
                        />
                      </button>
                    </div>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Facebook Link */}
        <SectionReveal delay={0.3} className="text-center mt-12">
          <a
            href="https://www.facebook.com/bahs.dnj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-forest/5 hover:bg-forest/10 border border-forest/10 hover:border-forest/20 rounded-full text-sm text-forest-dark font-medium transition-all duration-300 hover:shadow-md"
          >
            <Facebook className="w-4 h-4" />
            <span>View more on BAHS Facebook Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </a>
        </SectionReveal>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={filteredImages.map((img) => ({
          src: img.src,
          alt: img.alt,
          caption: img.caption,
          captionBn: img.captionBn,
        }))}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
