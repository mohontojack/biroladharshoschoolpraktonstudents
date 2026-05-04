"use client";

import { useState, useRef, useCallback } from "react";
import { Clock, BookOpen, Heart, GraduationCap, TreePine, Laugh, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./SectionReveal";

const memories = [
  {
    icon: BookOpen,
    title: "Where It All Began",
    titleBn: "যেখানে সব শুরু হয়েছিল",
    description:
      "New books, a new bag, a brand-new world — Biral Adarsha High School was where our journey started. Under the shade of knowledge, our childhood and youth blossomed, and the foundation of our dreams was laid.",
    extendedStory:
      "Do you remember the very first day? The nervous excitement of walking through the school gate, clutching a new bag filled with pristine notebooks, the smell of fresh paper and new uniforms. The unfamiliar faces that would soon become family. The first lesson in the classroom, the first bell, the very first friend. BAHS wasn't just a school — it was the starting point of everything we would become. Growing up in rural Biral, this school was our window to the world. Every doctor, engineer, teacher, and officer who graduated from BAHS remembers that first day with a smile, knowing it was the day their future truly began.",
    image: "/images/gallery/img12.jpg",
    reactions: 47,
  },
  {
    icon: Laugh,
    title: "Moments of Joy",
    titleBn: "আনন্দের মুহূর্ত",
    description:
      "The bell would ring and we'd rush to the field — stories, games, and endless laughter with friends. Those tiffin breaks and playground moments were the golden hours that made every school day unforgettable.",
    extendedStory:
      "Between classes, during tiffin breaks, after exams — joy was everywhere at BAHS. It was in the impromptu cricket matches with tennis balls on the dusty ground, in the shared tiffin boxes where everyone grabbed a bite, in the silly jokes whispered during boring lectures. It was the collective laughter that echoed across the playground, the sound of friends chasing each other, the sight of a group sitting under a tree sharing stories. The simple pleasure of sharing a meal, the thrill of winning a match, the warmth of a friend's smile — these moments of pure, uncomplicated joy are the ones we remember most vividly. Not the exam results, not the awards, but those simple moments of happiness that money can never buy.",
    image: "/images/gallery/img05.jpg",
    reactions: 53,
  },
  {
    icon: Heart,
    title: "Eternal Friendships",
    titleBn: "চিরন্তন বন্ধুত্ব",
    description:
      "Sitting side by side, sharing notes, preparing for exams together — the bonds we forged in those classrooms and corridors are etched into our hearts. True friendships that time and distance could never break.",
    extendedStory:
      "The friendships formed at BAHS transcend time, distance, and circumstance. Friends who sat together in Class 6 are still connected decades later — some through WhatsApp groups, some through annual gatherings, and some through the invisible thread of shared memories. These friendships were forged in the fires of shared struggle — preparing for SSC exams together, walking home together through dusty roads, sharing the last bite of food, helping each other with homework under the dim light of a kerosene lamp. At BAHS, we didn't just make friends — we found brothers and sisters. We found people who knew our stories before we even told them. The Eid Reunion 2026 is, at its heart, a celebration of these unbreakable bonds that no amount of time or distance can ever sever.",
    image: "/images/gallery/img02.jpg",
    reactions: 61,
  },
  {
    icon: TreePine,
    title: "Our Beloved Campus",
    titleBn: "আমাদের প্রিয় ক্যাম্পাস",
    description:
      "Every corner of Biral Adarsha High School holds a thousand stories — the classrooms, the playground, the old trees. This campus wasn't just a school; it was our second home, our sanctuary of growth and dreams.",
    extendedStory:
      "The BAHS campus was a universe in itself. The red-bricked building that stood as a beacon of knowledge for generations. The classrooms where equations were solved and poems were memorized. The playground where legendary cricket matches were played and records were set. The trees that provided shade and shelter on scorching summer days. The flag pole where the national flag was hoisted every morning with pride. Each corner holds a thousand memories — a first crush revealed under the banyan tree, a friendship mended on the corridor steps, a dream shared on the playground bench. For those who grew up in Biral, the BAHS campus is not just a physical location — it is a state of mind, a feeling of home that never leaves you. This building shaped thousands of lives, and every brick carries the prayers and dreams of countless students.",
    image: "/images/gallery/img19.jpg",
    reactions: 44,
  },
  {
    icon: GraduationCap,
    title: "In Our Teachers' Shadow",
    titleBn: "শিক্ষকদের ছায়ায়",
    description:
      "Through their discipline, we learned responsibility. Through their love, we learned life. Teachers are the architects of our future — and everything we have achieved, we owe to their sacrifice, guidance, and unwavering dedication.",
    extendedStory:
      "শিক্ষকরা আমাদের জীবনের স্থপতি। The teachers of BAHS were architects of futures, builders of nations. They came to school before students arrived and left after students departed. They spent their own money to buy teaching materials when budgets fell short. They visited students' homes when someone stopped coming to school, walking miles through muddy village roads in the monsoon rain. They stayed after hours to help struggling students understand difficult concepts, never once asking for anything in return. Mohi Uddin Sir's strict but deeply caring approach taught us discipline and dedication. The wisdom of our senior teachers showed us the path forward. The warmth of our female teachers gave us the confidence to dream big. Each one left an indelible mark on our souls. The Alumni Eid Reunion & Farewell 2026 is our way of saying: 'We remember everything. We are forever grateful. We will never forget what you gave us.'",
    image: "/images/gallery/img15.jpg",
    reactions: 63,
  },
  {
    icon: Clock,
    title: "Memories Never Fade",
    titleBn: "স্মৃতি থেকে যায় না",
    description:
      "Years have passed since we walked these halls. Life has taken us in different directions. But the memories of Biral Adarsha High School remain as vivid as ever — calling us back home for one more gathering.",
    extendedStory:
      "Some of us became BCS officers, some became engineers, some became doctors, some went abroad to build new lives, and some stayed right here in Biral to serve the community. Life has taken us in a hundred different directions across the globe. Years have turned into decades. Gray has touched our temples. But the moment someone mentions 'BAHS' or 'বিরল আদর্শ', something stirs deep inside every alumnus — a warmth, a nostalgia, a longing to go back that words cannot express. The sound of the school bell, the smell of the chalkboard, the face of a favorite teacher, the echo of laughter on the playground — these memories are locked in a corner of our hearts that no amount of time can erode. That is exactly why we are organizing the Alumni Eid Reunion & Farewell 2026 — because some memories demand to be relived, some bonds demand to be renewed, and some beloved teachers deserve to be honored before it is too late. Come home.",
    image: "/images/gallery/img13.jpg",
    reactions: 35,
  },
];

function ReactionButton({
  initialCount,
}: {
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [hasReacted, setHasReacted] = useState(false);

  const handleReaction = () => {
    if (hasReacted) {
      setCount((c) => c - 1);
      setHasReacted(false);
    } else {
      setCount((c) => c + 1);
      setHasReacted(true);
    }
  };

  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 min-h-[36px] ${
        hasReacted
          ? "bg-red-50 text-red-500 border border-red-200"
          : "bg-cream text-muted-foreground/70 border border-forest/5 hover:border-gold/20 hover:text-gold-dark"
      }`}
    >
      <Heart
        className={`w-3 h-3 transition-all duration-300 ${
          hasReacted ? "fill-red-500 scale-110" : ""
        }`}
      />
      <span>{count}</span>
    </button>
  );
}

function MemoryCard({
  memory,
  index,
}: {
  memory: (typeof memories)[number];
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -6; // ±3 degrees
    const rotateY = (x - 0.5) * 6;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-forest/5 hover:border-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-forest/5 h-full flex flex-col"
      style={{
        perspective: "1000px",
        touchAction: "manipulation",
      }}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={memory.image}
          alt={memory.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col -mt-8 relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md shadow-forest/10 mb-4 group-hover:bg-gold/10 transition-colors duration-500 -mt-6">
          <memory.icon className="w-6 h-6 text-forest group-hover:text-gold-dark transition-colors duration-500" />
        </div>

        <h3 className="text-lg font-bold text-forest-dark mb-0.5 group-hover:text-forest transition-colors">
          {memory.title}
        </h3>
        <p className="text-gold-dark/60 text-xs font-medium mb-2">
          {memory.titleBn}
        </p>
        <p className="text-muted-foreground leading-relaxed text-sm mb-4 flex-1">
          {memory.description}
        </p>

        {/* Extended story with expand/collapse */}
        <div className="bg-cream/50 rounded-xl p-4 mb-4 border border-forest/5">
          <div className="flex items-start gap-2">
            <Quote className="w-4 h-4 text-gold/30 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.p
                  key={isExpanded ? "expanded" : "collapsed"}
                  className="text-muted-foreground/80 text-xs leading-relaxed"
                  initial={false}
                  animate={{
                    height: isExpanded ? "auto" : undefined,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isExpanded ? (
                    memory.extendedStory
                  ) : (
                    <span className="line-clamp-4">{memory.extendedStory}</span>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Read More / Read Less toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded((prev) => !prev);
            }}
            className="mt-2 ml-6 text-xs font-medium text-gold-dark/70 hover:text-gold-dark transition-colors duration-200 inline-flex items-center gap-1 cursor-pointer min-h-[36px] px-2"
          >
            {isExpanded ? (
              <>
                Read Less
                <span className="inline-block transition-transform duration-200">←</span>
              </>
            ) : (
              <>
                Read More
                <span className="inline-block transition-transform duration-200">→</span>
              </>
            )}
          </button>
        </div>

        {/* Reaction button */}
        <div className="flex items-center justify-between">
          <ReactionButton initialCount={memory.reactions} />
          <span className="text-xs text-muted-foreground/40 font-medium tracking-wider uppercase">
            Memory #{index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MemorySection() {
  return (
    <section id="showcase" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sage/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-forest/70 text-sm font-medium">
              From the Pages of Memory
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-3">
            The Memories That
            <span className="block text-forest/60 font-light mt-2">
              Still Live in Our Hearts
            </span>
          </h2>
          <p className="text-gold-dark/70 text-base sm:text-lg font-medium mb-4" lang="bn">
            যে স্মৃতিগুলো এখনো আমাদের হৃদয়ে বেঁচে আছে
          </p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            The moment you hear &ldquo;Biral Adarsha High School&rdquo;, countless
            memories come flooding back — where our childhood and youth were spent,
            where our dreams and ideals were born, where the foundation of our
            lives was built.
          </p>
        </SectionReveal>

        {/* Memory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {memories.map((memory, index) => (
            <SectionReveal
              key={index}
              delay={index * 0.12}
              direction={index % 3 === 0 ? "left" : index % 3 === 1 ? "up" : "right"}
            >
              <MemoryCard memory={memory} index={index} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
