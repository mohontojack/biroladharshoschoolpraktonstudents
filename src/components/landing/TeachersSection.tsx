"use client";

import { Award, Heart, Star, Clock, BookOpen } from "lucide-react";
import SectionReveal from "./SectionReveal";

interface FarewellHonoree {
  name: string;
  title: string;
  status: string;
  description: string;
  isFeatured?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  photo?: string;
}

const honorees: FarewellHonoree[] = [
  {
    name: "Mohi Uddin Sir",
    title: "Headmaster",
    status: "Retiring: June 30, 2026",
    description:
      "Our respected Headmaster whose strict discipline, genuine affection, moral guidance, and unwavering direction continue to illuminate every step of our lives. His retirement on June 30, 2026 marks the end of a golden era — but his legacy will guide us forever.",
    isFeatured: true,
    icon: Star,
    photo: '/images/mahi-uddin-sir.jpg',
  },
  {
    name: "Abdul Hakim Sir",
    title: "Respected Teacher",
    status: "Retired",
    description:
      "After a long and distinguished career of service, Abdul Hakim Sir has completed his professional journey. His dedication to education and the countless students he nurtured will never be forgotten.",
    icon: BookOpen,
  },
  {
    name: "Farju Ara Toyes Apa",
    title: "Respected Teacher",
    status: "Retired",
    description:
      "A beloved teacher who dedicated her career to illuminating the path of knowledge for countless students. Her gentle and compassionate approach to teaching left an indelible mark on every student she guided.",
    icon: Heart,
  },
  {
    name: "Rai Kamal Sarkar Sir",
    title: "Respected Teacher",
    status: "Retired",
    description:
      "Having completed his long and meritorious professional life, Rai Kamal Sarkar Sir retired from service. His contributions to the school and his students remain deeply valued and remembered.",
    icon: Award,
    photo: '/images/rai-komol-sir.jpg',
  },
  {
    name: "Anjuwara Begum",
    title: "School Caretaker (Ayah)",
    status: "Departed",
    description:
      "She silently watched over and cared for every student like a mother. Countless times, she showered us with a mother's love and tenderness. Her selfless service to the school family will always remain in our hearts.",
    icon: Heart,
  },
];

function HonoreeCard({ honoree, index }: { honoree: FarewellHonoree; index: number }) {
  const IconComponent = honoree.icon;

  if (honoree.isFeatured) {
    return (
      <SectionReveal delay={0.1}>
        <div className="relative bg-gradient-to-br from-forest to-forest-dark rounded-3xl p-1 overflow-hidden group">
          {/* Gold border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/30 via-transparent to-gold/20 group-hover:from-gold/50 group-hover:via-gold/10 group-hover:to-gold/40 transition-all duration-700" />
          <div className="relative bg-gradient-to-br from-forest to-forest-dark rounded-3xl p-8 md:p-12 transition-all duration-500 group-hover:p-10 md:group-hover:p-14">
            {/* Featured badge */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gold fill-gold" />
                <span className="text-gold font-semibold text-sm tracking-wider uppercase">
                  Main Farewell Honor
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-gold/15 rounded-full px-3 py-1">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span className="text-gold/90 text-xs font-medium">
                  June 30, 2026
                </span>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-5 mb-6">
              {honoree.photo ? (
                <div className="w-24 h-28 rounded-xl overflow-hidden border-2 border-gold/40 shadow-lg flex-shrink-0 group-hover:border-gold/70 group-hover:shadow-gold/20 transition-all duration-500">
                  <img
                    src={honoree.photo}
                    alt={honoree.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center border-2 border-gold/40">
                  <span className="text-3xl font-bold text-gold">
                    {honoree.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {honoree.name}
                </h3>
                <p className="text-gold/80 font-medium">{honoree.title}</p>
                <p className="text-white/50 text-sm mt-1">{honoree.status}</p>
              </div>
            </div>

            <p className="text-white/75 leading-relaxed text-lg">
              {honoree.description}
            </p>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-[100px]" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-tr-[80px]" />
          </div>
        </div>
      </SectionReveal>
    );
  }

  return (
    <SectionReveal delay={0.15 + index * 0.1}>
      <div className="group relative bg-white rounded-2xl p-6 md:p-8 border border-forest/5 hover:border-gold/20 transition-all duration-500 hover:shadow-lg hover:shadow-forest/5 hover:-translate-y-1">
        {/* Subtle top accent */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex items-center gap-4 mb-4">
          {honoree.photo ? (
            <div className="w-16 h-20 rounded-lg overflow-hidden border border-forest/10 group-hover:border-gold/30 transition-colors duration-500 flex-shrink-0">
              <img
                src={honoree.photo}
                alt={honoree.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-sage flex items-center justify-center border border-forest/10 group-hover:border-gold/30 transition-colors duration-500">
              <span className="text-xl font-bold text-forest group-hover:text-forest-dark transition-colors">
                {honoree.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-forest-dark group-hover:text-forest transition-colors">
              {honoree.name}
            </h3>
            <p className="text-muted-foreground text-sm">{honoree.title}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-cream rounded-full px-3 py-1">
            <IconComponent className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground text-xs font-medium">
              {honoree.status}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {honoree.description}
        </p>

        {/* Heart icon decoration */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Heart className="w-4 h-4 text-gold/40" />
        </div>
      </div>
    </SectionReveal>
  );
}

export default function TeachersSection() {
  const featuredHonoree = honorees.find((h) => h.isFeatured);
  const otherHonorees = honorees.filter((h) => !h.isFeatured);

  return (
    <section id="teachers" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/pattern.png')",
            backgroundSize: "200px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          {/* School emblem decoration */}
          <div className="relative inline-block mb-6">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-gold/20 p-0.5 mx-auto">
              <img
                src="/images/school-emblem.png"
                alt="Biral Adarsha High School emblem"
                className="w-full h-full rounded-full object-cover opacity-60"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-forest/70 text-sm font-medium">
              With Love & Respect
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-6">
            Honoring Those Who
            <span className="block text-forest/60 font-light mt-2">
              Gave Us Everything
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Some beloved faces are gradually bidding farewell as they retire from service.
            Their contributions to our school and our lives can never be forgotten.
            This event is our opportunity to express our deepest gratitude and love.
          </p>
        </SectionReveal>

        {/* Featured Honoree - Mohi Uddin Sir */}
        {featuredHonoree && (
          <div className="mb-8 max-w-3xl mx-auto">
            <HonoreeCard honoree={featuredHonoree} index={-1} />
          </div>
        )}

        {/* Section subtitle for other honorees */}
        <SectionReveal delay={0.3} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <div className="w-8 h-px bg-forest/10" />
            <span>Also Honoring Our Retired Teachers & Staff</span>
            <div className="w-8 h-px bg-forest/10" />
          </div>
        </SectionReveal>

        {/* Other Honorees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          {otherHonorees.map((honoree, index) => (
            <HonoreeCard key={index} honoree={honoree} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
