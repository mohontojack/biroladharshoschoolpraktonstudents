"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  Award,
  Clock,
  Globe,
  Phone,
  Facebook,
  Landmark,
  Star,
  Quote,
  Trophy,
  Heart,
  Flame,
  Sparkles,
  ShieldCheck,
  Microscope,
  Swords,
  HandHeart,
} from "lucide-react";
import SectionReveal from "./SectionReveal";

/* ─── School Story Data ─── */
const schoolStory = {
  establishment: {
    year: "১৯৮৮",
    date: "১লা জানুয়ারি, ১৯৮৮",
    founder: "The visionary community leaders of Biral",
    eiin: "120133",
    board: "Board of Intermediate and Secondary Education, Dinajpur",
    location: "Biral Upazila, Dinajpur District, Rangpur Division, Bangladesh",
    type: "Non-Government Secondary School",
    level: "Secondary (SSC) — Science, Business Studies & Humanities",
    area: "Biral spans 353.98 km² along the Punarbhaba and Tangon rivers",
  },
};

const biralStory = {
  title: "The Land Where Dreams Take Root — স্বপ্নের রোপণভূমি বিরল",
  paragraphs: [
    `Biral (বিরল) — a serene upazila cradled in the heart of Dinajpur District, where the Punarbhaba and Tangon rivers weave through vast emerald rice paddies, where indigenous communities like the Santal, Oraon, and Munda have lived in harmony for centuries. This sacred soil carries the blood of heroes — during the great Santal rebellion of 1855-56, this land witnessed the raw courage of those who fought for justice and dignity. And during the Liberation War of 1971, on the tragic day of November 13, thirty-seven innocent souls were martyred at Bahala — a sacrifice etched forever in our collective memory. "বিজয়ের ৫৪ বছর" — fifty-four years of victory, yet the wounds of Bahala still whisper through the bamboo groves of Biral. This is the land that taught us what sacrifice means. This is the land that raised us.`,
    `It was into this land of history, resilience, and breathtaking beauty that Biral Adarsha High School was born on January 1, 1988 — "শিক্ষার আলোয় আলোকিত বিরল." The name "Adarsha" (আদর্শ) means "Ideal" — and that is exactly what this school set out to be, and what it has become. In a region where access to quality secondary education was a distant dream for most families, BAHS emerged as a radiant beacon of hope. Children from the most remote villages — some walking barefoot for over an hour through muddy paths — found their sanctuary within these walls. Here, under tin-roofed classrooms with worn-out chalkboards, the dream of an educated Biral took its first breath. The founders didn't just build a school — they built a temple of learning where every child, regardless of their background, could dream of a brighter tomorrow.`,
    `Today, that dream has blossomed beyond imagination. From those humble beginnings, BAHS has grown into an institution that fills every Biral resident's heart with pride — "আমরা গর্বিত, আমরা বিএএইচএস." The school has produced BCS cadre officers who now serve the nation at the highest levels — Naimul Haque (45th BCS, Administration Cadre) and Afrin Brishti (49th BCS, Special Education Cadre) are living proof that children from Biral can reach the pinnacle of government service. Twenty-three students have achieved the coveted GPA-5 in recent SSC examinations. Engineers, doctors, teachers, and entrepreneurs across Bangladesh carry the BAHS name in their hearts. Every brick, every desk, every corner of this school holds a story — stories of late-night study sessions, of teachers who never gave up on a struggling student, of morning assemblies where hundreds of voices rose in unison singing "আমার সোনার বাংলা." This is not just a school. This is the pride of Biral. This is BAHS.`,
  ],
  banglaQuotes: [
    "শিক্ষার আলোয় আলোকিত বিরল — Biral illuminated by the light of education",
    "শিক্ষকদের প্রতি শ্রদ্ধা ও ভালোবাসা — Respect and love for our beloved teachers",
    "আমরা গর্বিত, আমরা বিএএইচএস — We are proud, we are BAHS",
  ],
};

const timelineEvents = [
  {
    year: "১৯৮৮",
    yearEn: "1988",
    era: "The Foundation — ভিত্তি স্থাপন",
    eraShort: "The Foundation",
    image: "/images/gallery/img18.jpg",
    story: `On January 1, 1988, with nothing but a dream and unwavering determination, a group of visionary community leaders and educators planted the seed that would grow into Biral Adarsha High School. The very first morning saw children arriving from distant villages — some carrying tattered bags, some walking barefoot for over an hour through kutcha roads — but every single one of them carried something far more powerful: the burning desire to learn. The school had the humblest of beginnings — tin-roofed classrooms that leaked during monsoons, a handful of chalkboards, and a small group of teachers who often went unpaid for months but never, ever lost their passion for teaching. Among those early pioneers was মোহি উদ্দিন সাহেব (Mohi Uddin Sir), whose strict discipline and towering presence would later become legendary, and আব্দুল হাকিম সাহেব (Abdul Hakim Sir), whose wisdom and gentle guidance shaped the moral compass of an entire generation. Those early days were not easy — there were days when the school operated without proper furniture, when students sat on mats on the floor. But the spirit of BAHS was already alive — a spirit that said no obstacle is too great when the cause is education. That passion, that sacrifice, that belief in the children of Biral — that became the foundation upon which thousands of futures would be built. এই ভিত্তির ওপর দাঁড়িয়ে আছে আমাদের স্বপ্নের বিদ্যালয়.`,
  },
  {
    year: "১৯৯০s",
    yearEn: "1990s",
    era: "Growing Roots — শিকড়ের বিস্তার",
    eraShort: "Growing Roots",
    image: "/images/gallery/img17.jpg",
    story: `The 1990s were the formative years when BAHS began to establish its identity as a center of academic excellence in Biral Upazila. Word spread like wildfire across surrounding villages — parents would tell each other, "আপনার ছেলেমেয়েকে বিরল আদর্শে ভর্তি করুন, ওখানে শিক্ষকরা সত্যিই পড়ান" (Enroll your children at Biral Adarsha, the teachers there truly teach). Students flocked from villages miles away — many walking through rice fields and crossing narrow bridges over the Punarbhaba, rain or shine. This was the decade when BAHS's reputation began to resonate across Dinajpur District. Annual sports days became grand community gatherings where the entire upazila turned out to watch. Cultural programs celebrating Bengali heritage — Rabindra Sangeet, Nazrul Geeti, poetry recitations — became cherished traditions that instilled deep cultural pride in young hearts. The first batches of SSC students made the entire upazila proud with their results. It was during these years that ফারজু আরা তোয়েস আপা (Farju Ara Toyes Apa) joined the school, bringing with her a compassion and warmth that made every student feel seen, every child feel valued. She didn't just teach subjects — she nurtured souls. The school wasn't just teaching mathematics and science — it was building character, fostering empathy, and nurturing the leaders of tomorrow. এই দশকে বিএএইচএস শুধু একটি স্কুল থেকে যায়নি, এটি হয়ে উঠেছিল একটি পরিবার.`,
  },
  {
    year: "২০০০s",
    yearEn: "2000s",
    era: "The Golden Age — স্বর্ণযুগ",
    eraShort: "The Golden Age",
    image: "/images/gallery/img11.jpg",
    story: `The new millennium marked the dawn of BAHS's golden era — a period when academic excellence became synonymous with the BAHS name across northern Bangladesh. Year after year, SSC results soared to new heights, with students achieving the perfect GPA-5 across Science, Business Studies, and Humanities disciplines. The school's alumni began making their mark on the national stage — engineers designing bridges in Dhaka, doctors saving lives in Chittagong, teachers inspiring the next generation, and government officers serving the people. The morning assembly became a powerful daily ritual of discipline and patriotism — hundreds of students standing in neat rows on the dusty playground, singing "আমার সোনার বাংলা, আমি তোমায় ভালোবাসি" in unison under the golden morning sun, their voices echoing across the paddy fields of Biral. It was a sight that made every parent's heart swell with pride. The Science program gained particular recognition during this decade — students began participating and excelling in regional science fairs and mathematics olympiads. Victory Day celebrations on December 16th became solemn, beautiful ceremonies where students laid floral tributes, performed patriotic songs, and remembered the martyrs of 1971 — "বিজয়ের ৫৪ বছর, আমরা ভুলবো না" (54 years of victory, we shall never forget). This was the decade that proved BAHS was not just a village school — it was an institution capable of producing national-caliber talent. স্বাধীনতার স্বপক্ষে বিএএইচএস — BAHS has always stood firmly for the spirit of independence.`,
  },
  {
    year: "২০১০s",
    yearEn: "2010s",
    era: "Spreading Wings — ডানা মেলা",
    eraShort: "Spreading Wings",
    image: "/images/gallery/img03.jpg",
    story: `As Bangladesh embraced the digital age, BAHS evolved with the times while fiercely preserving its core values of discipline, compassion, and excellence. Computer literacy was introduced into the curriculum, and the school expanded its physical facilities. But what truly defined this decade — what made it historic for BAHS — was the extraordinary, nation-level achievements of its alumni. Naimul Haque, a son of Biral who walked through these very corridors, secured the 45th BCS (Administration Cadre), proving beyond any doubt that students from Biral could not only compete but triumph at the highest levels of government service in Bangladesh. His achievement sent shockwaves of pride through every household in Biral — "বিরলের ছেলে বিসিএসে সুপারিশপ্রাপ্ত!" (A son of Biral recommended for BCS!). Not long after, Afrin Brishti followed with the 49th BCS (Special Education Cadre), further cementing BAHS's reputation as a school that doesn't just produce graduates — it produces leaders, changemakers, and nation-builders. The school's trophy cabinet overflowed with awards from science competitions, cultural events, and sports tournaments. The Facebook page "BAHS DNJ" was created during this decade, connecting thousands of alumni scattered across Bangladesh and around the world — from Dhaka to New York, from Chittagong to London — all united by their love for BAHS. শিক্ষকদের প্রতি শ্রদ্ধা ও ভালোবাসা — this was the decade when alumni returned to express their gratitude to the teachers who made everything possible.`,
  },
  {
    year: "২০২০s",
    yearEn: "2020s",
    era: "A Legacy Reborn — নতুন উদ্যম",
    eraShort: "A Legacy Reborn",
    image: "/images/gallery/img14.jpg",
    story: `Today, BAHS stands tall and proud as a pillar of education in northern Bangladesh — a living testament to what a community can achieve when it believes in the power of education. With a Facebook community rating of 4.6 out of 5 stars and an active, passionate network of thousands of alumni, the school's influence extends far beyond the boundaries of Biral. The annual SSC results continue to inspire — with 23 students achieving the perfect GPA-5 in recent examinations under the Dinajpur Board, a record that fills every student, teacher, and parent with immense pride. Victory Day celebrations on December 16th remain a cornerstone of BAHS culture — students gather at the Biral Government Pilot Model High School ground to pay solemn tribute to the martyrs of 1971, singing patriotic songs, reciting poems of freedom, and renewing their pledge to uphold the values of the Liberation War. International Mother Language Day on February 21st is observed with deep reverence, with students placing flowers at the Shaheed Minar and participating in language competitions. BDJSO School Olympiad events, hosted in collaboration with Biral Science Academy, continue to nurture young scientific minds. Now, as the alumni community prepares for the historic Eid Reunion & Farewell 2026 — honoring retiring legends like মোহি উদ্দিন সাহেব, আব্দুল হাকিম সাহেব, and ফারজু আরা তোয়েস আপা — a glorious new chapter is being written. A chapter that honors the sacrifices of the past while embracing the promise of the future. আমরা গর্বিত, আমরা বিএএইচএস — We are proud, we are BAHS, and our story is far from over.`,
  },
];

const notableAchievements = [
  {
    title: "BCS Cadre Officers — বিসিএস ক্যাডার অফিসার",
    titleBn: "বিসিএস ক্যাডারে সুপারিশপ্রাপ্ত",
    description:
      "Naimul Haque — 45th BCS Administration Cadre. Afrin Brishti — 49th BCS Special Education Cadre. These extraordinary achievements prove beyond question that students from Biral can compete and triumph at the highest national level. They are living proof that BAHS does not just educate — it empowers. বিরলের মেধা আজ জাতীয় পর্যায়ে প্রতিষ্ঠিত.",
    icon: Award,
    image: "/images/gallery/img07.jpg",
  },
  {
    title: "23 Students Achieved GPA-5 — জিপিএ-৫ অর্জন",
    titleBn: "২৩ জন শিক্ষার্থী জিপিএ-৫ অর্জন",
    description:
      "In recent SSC examinations under the Dinajpur Board, 23 students from BAHS achieved the perfect GPA score — the highest in the school's history. Science: 56 passed. Humanities: 32 passed. Business Studies: 1 passed. A testament to the school's unwavering academic standards and the tireless dedication of its teachers. শিক্ষকদের অকৃত্রিম অনুশীলনে এই সাফল্য.",
    icon: GraduationCap,
    image: "/images/gallery/img08.jpg",
  },
  {
    title: "Victory Day Heritage — বিজয় দিবসের ঐতিহ্য",
    titleBn: "বিজয়ের ৫৪ বছর — ঐতিহ্য ও দেশপ্রেম",
    description:
      "Every December 16th, BAHS organizes solemn Victory Day celebrations at the Biral Government Pilot Model High School ground. Students lay floral tributes at the memorial, participate in cultural programs honoring the martyrs, and sing the songs of freedom. The Bahala massacre of November 13, 1971 — where 37 innocent souls were martyred — is remembered with tears and pride. বিজয়ের ৫৪ বছর, আমরা ভুলবো না. স্বাধীনতার স্বপক্ষে বিএএইচএস.",
    icon: Landmark,
    image: "/images/gallery/img04.jpg",
  },
  {
    title: "Biral Science Academy — বিজ্ঞান একাডেমি",
    titleBn: "বিরল বিজ্ঞান একাডেমি ও অলিম্পিয়াড",
    description:
      "BDJSO School Olympiad events are regularly hosted at BAHS, nurturing the next generation of scientists and innovators. Students participate in mathematics olympiads, science fairs, and quiz competitions, representing BAHS at regional and national levels with distinction. The science program has become one of the school's proudest pillars. বিজ্ঞানের আলোয় এগিয়ে যাচ্ছে বিরলের ভবিষ্যৎ.",
    icon: Microscope,
    image: "/images/gallery/img05.jpg",
  },
];

const schoolFacts = [
  { icon: Calendar, label: "Established", value: "January 1, 1988", valueBn: "১লা জানুয়ারি, ১৯৮৮" },
  { icon: Award, label: "EIIN Number", value: "120133", valueBn: "১২০১৩৩" },
  { icon: Landmark, label: "Education Board", value: "Dinajpur", valueBn: "দিনাজপুর" },
  { icon: BookOpen, label: "Education Level", value: "Secondary (SSC)", valueBn: "মাধ্যমিক (এসএসসি)" },
  { icon: GraduationCap, label: "Disciplines", value: "Science, Business, Humanities", valueBn: "বিজ্ঞান, ব্যবসা, মানবিক" },
  { icon: Globe, label: "School Type", value: "Non-Government", valueBn: "বেসরকারি" },
  { icon: MapPin, label: "Location", value: "Biral, Dinajpur", valueBn: "বিরল, দিনাজপুর" },
  { icon: Star, label: "Facebook Rating", value: "4.6 / 5.0 ★", valueBn: "৪.৬ / ৫.০ ★" },
];

const teacherHonors = [
  {
    name: "মোহি উদ্দিন সাহেব",
    nameEn: "Mohi Uddin Sir",
    trait: "Strict Discipline & Iron Will",
    traitBn: "কঠোর শৃঙ্খলা ও লৌহ মানসিকতা",
    description: "The backbone of BAHS discipline. His commanding presence in the corridor made every student stand taller. He taught us that excellence demands sacrifice, that true education begins with self-control. Decades later, his students still straighten their posture when they remember him.",
    icon: ShieldCheck,
  },
  {
    name: "আব্দুল হাকিম সাহেব",
    nameEn: "Abdul Hakim Sir",
    trait: "Wisdom & Moral Guidance",
    traitBn: "প্রজ্ঞা ও নৈতিক দিকনির্দেশনা",
    description: "A teacher whose words carried the weight of generations. He didn't just teach from textbooks — he taught from the heart. His gentle guidance shaped the moral compass of countless students who now serve this nation with integrity. His wisdom echoes in every corner of BAHS.",
    icon: Sparkles,
  },
  {
    name: "ফারজু আরা তোয়েস আপা",
    nameEn: "Farju Ara Toyes Apa",
    trait: "Compassion & Motherly Care",
    traitBn: "স্নেহ ও মাতৃসুলভ যত্ন",
    description: "Every student who walked through her classroom door felt seen, felt valued, felt loved. She was more than a teacher — she was a mother to those who needed one, a friend to those who felt alone, and a guiding light when the path seemed dark. Her compassion left an indelible mark on thousands of lives.",
    icon: HandHeart,
  },
];

/* ─── Animated Counter ─── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Timeline Section ─── */
function TimelineSection() {
  return (
    <div className="max-w-4xl mx-auto">
      {timelineEvents.map((event, i) => (
        <SectionReveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
          <div className="relative flex flex-col md:flex-row gap-6 mb-12 last:mb-0 group">
            {/* Timeline line & dot */}
            <div className="hidden md:flex flex-col items-center flex-shrink-0 w-16">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-forest to-forest-dark flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-forest/30 z-10 group-hover:shadow-gold/30 group-hover:scale-110 transition-all duration-500">
                {event.year}
              </div>
              {i < timelineEvents.length - 1 && (
                <div className="w-0.5 flex-1 bg-gradient-to-b from-forest/30 to-forest/5 mt-3" />
              )}
            </div>

            {/* Content Card */}
            <div className="flex-1 relative">
              {/* Year badge for mobile */}
              <div className="md:hidden inline-flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-forest text-white text-xs font-bold rounded-full">
                  {event.yearEn}
                </span>
                <span className="text-gold-dark text-sm font-semibold">{event.eraShort}</span>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden border border-forest/5 hover:border-gold/20 hover:shadow-xl hover:shadow-forest/8 transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.eraShort}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="hidden md:inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                      {event.yearEn}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1 drop-shadow-lg">
                      {event.era}
                    </h3>
                  </div>
                </div>

                {/* Story */}
                <div className="p-6 md:p-8">
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {event.story}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      ))}
    </div>
  );
}

/* ─── Achievement Card ─── */
function AchievementCard({
  item,
  index,
}: {
  item: (typeof notableAchievements)[0];
  index: number;
}) {
  const Icon = item.icon;
  return (
    <SectionReveal delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group bg-white rounded-2xl overflow-hidden border border-forest/5 hover:border-gold/25 hover:shadow-xl hover:shadow-forest/8 transition-all duration-500 h-full"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-forest-dark/20 to-transparent" />
          <div className="absolute top-3 right-3">
            <div className="w-10 h-10 rounded-xl bg-gold/90 flex items-center justify-center shadow-lg">
              <Icon className="w-5 h-5 text-forest-dark" />
            </div>
          </div>
          <div className="absolute bottom-4 left-5 right-5">
            <h3 className="text-white font-bold text-base drop-shadow-lg">{item.title}</h3>
            <p className="text-white/70 text-xs mt-0.5">{item.titleBn}</p>
          </div>
        </div>
        <div className="p-5">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </motion.div>
    </SectionReveal>
  );
}

/* ─── Teacher Honor Card ─── */
function TeacherHonorCard({
  teacher,
  index,
}: {
  teacher: (typeof teacherHonors)[0];
  index: number;
}) {
  const Icon = teacher.icon;
  return (
    <SectionReveal delay={index * 0.12}>
      <motion.div
        whileHover={{ y: -3 }}
        className="group relative bg-gradient-to-br from-forest/5 via-cream/80 to-white rounded-2xl p-6 border border-forest/5 hover:border-gold/20 hover:shadow-lg hover:shadow-forest/5 transition-all duration-500 h-full"
      >
        {/* Decorative corner */}
        <div className="absolute top-3 right-3 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <Heart className="w-8 h-8 text-gold" />
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
            <Icon className="w-6 h-6 text-gold-dark" />
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-bold text-forest-dark">{teacher.name}</h4>
            <p className="text-xs text-gold-dark/70 font-medium">{teacher.nameEn}</p>
            <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-forest/5 rounded-full">
              <span className="text-xs font-semibold text-forest/70">{teacher.trait}</span>
            </div>
            <p className="text-xs text-gold-dark/50 mt-0.5">{teacher.traitBn}</p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mt-4">
          {teacher.description}
        </p>
      </motion.div>
    </SectionReveal>
  );
}

/* ─── Main Component ─── */
export default function AboutSchoolSection() {
  return (
    <section id="about-school" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sage/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-forest/70 text-sm font-medium">
              আমাদের গর্বের প্রতিষ্ঠান — Our Beloved Institution
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-2">
            About Biral Adarsha
            <span className="block text-forest/60 font-light mt-2">
              High School
            </span>
          </h2>
          <p className="text-gold-dark/80 text-lg md:text-xl font-medium mt-3 mb-6">
            বিরল আদর্শ উচ্চ বিদ্যালয়
          </p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Established in 1988, BAHS has been the pride of Biral, Dinajpur for over three decades.
            From a humble village school with tin-roofed classrooms to an institution that has produced
            BCS officers, doctors, engineers, and national leaders — শিক্ষার আলোয় আলোকিত বিরল.
          </p>
        </SectionReveal>

        {/* ── Hero Banner with Real Photo ── */}
        <SectionReveal delay={0.1}>
          <div className="relative rounded-3xl overflow-hidden mb-16 group">
            <div className="relative h-64 sm:h-80 md:h-96">
              <img
                src="/images/gallery/img12.jpg"
                alt="Biral Adarsha High School Campus — Teacher at campus with building"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/80 via-forest-dark/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/40 to-transparent" />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
              <div className="max-w-xl">
                {/* Emblem */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 border-2 border-gold/40 p-1 shadow-lg shadow-gold/10 mb-6 backdrop-blur-sm">
                  <img
                    src="/images/school-emblem.png"
                    alt="BAHS Emblem"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <h3 className="text-2xl md:text-4xl font-bold text-white mb-1">
                  বিরল আদর্শ উচ্চ বিদ্যালয়
                </h3>
                <p className="text-gold/90 text-lg md:text-xl mb-4 font-medium">
                  Biral Adarsha High School
                </p>
                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 max-w-md">
                  বিরলের গর্ব, দিনাজপুরের আভিজাত্য — A prestigious non-government secondary school
                  nurturing young minds since January 1, 1988 under the Dinajpur Education Board.
                  শিক্ষার আলোয় আলোকিত বিরল, আমরা গর্বিত, আমরা বিএএইচএস.
                </p>

                {/* Quick Links */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.facebook.com/bahs.dnj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium transition-colors"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                    facebook.com/bahs.dnj
                  </a>
                  <a
                    href="tel:+8801714803764"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 rounded-full text-white text-xs font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    01714-803764
                  </a>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-white/70 text-xs">
                    <MapPin className="w-3.5 h-3.5" />
                    Biral, Dinajpur 5210
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-0 right-0 p-6 hidden md:block">
              <div className="flex gap-6">
                {[
                  { value: 37, suffix: "+", label: "Years of Excellence", labelBn: "বছরের শ্রেষ্ঠত্ব" },
                  { value: 23, suffix: "", label: "GPA-5 Achievers", labelBn: "জিপিএ-৫ অর্জনকারী" },
                  { value: 4, suffix: ".6", label: "FB Rating (★)", labelBn: "রেটিং (★)" },
                ].map((stat, i) => (
                  <div key={i} className="text-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/15">
                    <p className="text-gold font-bold text-xl">
                      <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-white/60 text-xs font-medium mt-0.5">{stat.label}</p>
                    <p className="text-white/40 text-xs">{stat.labelBn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ── The Story of BAHS & Biral (বিরলের গল্প) ── */}
        <SectionReveal delay={0.15} className="mb-16">
          <div className="bg-gradient-to-br from-cream to-white rounded-3xl p-8 md:p-12 border border-forest/5 relative overflow-hidden">
            {/* Decorative quote */}
            <div className="absolute top-4 right-8 text-gold/10">
              <Quote className="w-24 h-24" />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-forest-dark">
                  {biralStory.title}
                </h3>
                <p className="text-gold-dark/60 text-xs font-medium mt-0.5">বিরলের গল্প — The Story of Our Homeland</p>
              </div>
            </div>

            <div className="space-y-5">
              {biralStory.paragraphs.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-[1.8] text-[15px]">
                  {para}
                </p>
              ))}
            </div>

            {/* Bangla Quotes */}
            <div className="mt-6 space-y-2">
              {biralStory.banglaQuotes.map((quote, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Flame className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
                  <p className="text-forest/70 text-sm font-medium italic">{quote}</p>
                </div>
              ))}
            </div>

            {/* Biral Landscape Image */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-forest/5">
              <img
                src="/images/gallery/img09.jpg"
                alt="Beautiful countryside of Biral, Dinajpur — home of BAHS"
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="bg-forest/5 px-5 py-3 flex items-center justify-between">
                <p className="text-forest/70 text-xs font-medium">
                  📍 The countryside of Biral, Dinajpur — home of BAHS
                </p>
                <p className="text-muted-foreground/50 text-xs">
                  বিরল, দিনাজপুর — আমাদের প্রিয় মাতৃভূমি
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* ── School Information Cards ── */}
        <SectionReveal delay={0.2} className="mb-16">
          <h3 className="text-xl font-bold text-forest-dark mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gold" />
            School Information — স্কুল সম্পর্কিত তথ্য
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {schoolFacts.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <SectionReveal key={i} delay={i * 0.06}>
                  <div className="group flex items-center gap-3 p-3 rounded-xl bg-cream/50 border border-forest/5 hover:border-gold/20 hover:bg-cream transition-all duration-300">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-forest/5 group-hover:bg-gold/10 flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-4 h-4 text-forest group-hover:text-gold-dark transition-colors duration-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">{fact.label}</p>
                      <p className="text-sm font-semibold text-forest-dark truncate">{fact.value}</p>
                      <p className="text-xs text-gold-dark/50 truncate">{fact.valueBn}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </SectionReveal>

        {/* ── Honoring Our Teachers — শিক্ষকদের প্রতি শ্রদ্ধা ── */}
        <SectionReveal delay={0.2} className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-forest-dark mb-2 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-gold" />
              Honoring Our Teachers — শিক্ষকদের প্রতি শ্রদ্ধা ও ভালোবাসা
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Behind every successful student stands a teacher who believed in them. These are the
              legendary educators who built BAHS with their sweat, tears, and unconditional love.
              শিক্ষকদের প্রতি আমাদের চিরকৃতজ্ঞতা.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {teacherHonors.map((teacher, i) => (
              <TeacherHonorCard key={i} teacher={teacher} index={i} />
            ))}
          </div>
        </SectionReveal>

        {/* ── Journey Through the Years (Timeline with Real Photos) ── */}
        <SectionReveal delay={0.2} className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-forest-dark mb-2 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              Our Journey Through the Years — সময়ের সাথে আমাদের যাত্রা
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              From a humble beginning in 1988 to producing national-level achievers —
              every decade of BAHS tells a story of resilience, sacrifice, and excellence.
              প্রতিটি দশকের গল্প আমাদের গর্বিত করে.
            </p>
          </div>
          <TimelineSection />
        </SectionReveal>

        {/* ── Notable Achievements (with Real Photos) ── */}
        <SectionReveal delay={0.2} className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-forest-dark mb-2 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-gold" />
              Pride of BAHS — Notable Achievements
            </h3>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              গর্বের স্মৃতি — From BCS officers to GPA-5 achievers, from Victory Day heritage to
              Science Olympiads — BAHS continues to make its mark on Bangladesh.
              আমরা গর্বিত, আমরা বিএএইচএস.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notableAchievements.map((item, i) => (
              <AchievementCard key={i} item={item} index={i} />
            ))}
          </div>
        </SectionReveal>

        {/* ── School Hours ── */}
        <SectionReveal delay={0.3}>
          <div className="bg-cream rounded-2xl p-6 border border-forest/5">
            <h4 className="text-sm font-bold text-forest-dark mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              School Hours — স্কুলের সময়সূচী
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
              {[
                { day: "Saturday", hours: "7AM – 4PM", dayBn: "শনিবার" },
                { day: "Sunday", hours: "7AM – 4PM", dayBn: "রবিবার" },
                { day: "Monday", hours: "7AM – 4PM", dayBn: "সোমবার" },
                { day: "Tuesday", hours: "7AM – 4PM", dayBn: "মঙ্গলবার" },
                { day: "Wednesday", hours: "7AM – 2PM", dayBn: "বুধবার" },
              ].map((item, i) => (
                <div key={i} className="py-2">
                  <p className="text-xs font-semibold text-forest-dark">{item.day}</p>
                  <p className="text-xs text-muted-foreground">{item.hours}</p>
                  <p className="text-xs text-gold-dark/50 mt-0.5">{item.dayBn}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
