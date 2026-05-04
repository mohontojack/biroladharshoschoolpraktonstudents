"use client";

import { Handshake, Clock, Heart, Lightbulb } from "lucide-react";
import SectionReveal from "./SectionReveal";

const reasons = [
  {
    icon: Handshake,
    title: "Reunite After Years",
    description:
      "After so many years, this is a golden opportunity to come together again under one roof. Meet old friends, reconnect with classmates, and relive the joy of those golden school days.",
    color: "from-forest/5 to-forest/10",
    iconColor: "text-forest",
  },
  {
    icon: Clock,
    title: "Relive Old Memories",
    description:
      "Remember those carefree days — the classroom laughter, the playground games, the shared tiffin? Let's walk down memory lane together and reminisce about the beautiful days we spent at Biral Adarsha High School.",
    color: "from-gold/5 to-gold/10",
    iconColor: "text-gold-dark",
  },
  {
    icon: Heart,
    title: "Express Gratitude to Teachers",
    description:
      "An opportunity to show our respect, love, and heartfelt gratitude to the teachers who shaped our lives. Some of our most beloved teachers are retiring — let's honor them and make them feel proud.",
    color: "from-forest/5 to-sage",
    iconColor: "text-forest",
  },
  {
    icon: Lightbulb,
    title: "Inspire the Next Generation",
    description:
      "Our reunion carries a powerful message for the new generation — that the bonds formed in school last a lifetime. Let's come together to inspire those who walk the same halls we once did.",
    color: "from-gold/5 to-gold/8",
    iconColor: "text-gold-dark",
  },
];

export default function WhyJoinSection() {
  return (
    <section id="why-join" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-forest/70 text-sm font-medium">
              Why This Event Matters
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-6">
            Why You Should Be There
            <span className="block text-forest/60 font-light mt-2">
              This Is More Than Just a Gathering
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Some moments in life never come back. This reunion is one of those
            rare opportunities — a day you won&apos;t want to miss. Here&apos;s why
            this event is so important.
          </p>
        </SectionReveal>

        {/* Reason Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <SectionReveal
              key={index}
              delay={index * 0.12}
              direction={index % 2 === 0 ? "up" : "up"}
            >
              <div className="group relative h-full bg-white rounded-2xl p-8 border border-forest/5 hover:border-gold/20 transition-all duration-500 hover:shadow-xl hover:shadow-forest/5 hover:-translate-y-1 overflow-hidden">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cream group-hover:bg-white/80 transition-colors duration-500 mb-5">
                    <reason.icon
                      className={`w-6 h-6 ${reason.iconColor} group-hover:scale-110 transition-transform duration-500`}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-forest-dark mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
