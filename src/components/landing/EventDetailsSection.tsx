"use client";

import { Calendar, MapPin, Users, Sparkles, Heart, Phone, Mail, Handshake, Clock, Lightbulb } from "lucide-react";
import SectionReveal from "./SectionReveal";

const eventDetails = [
  {
    icon: Calendar,
    label: "Date",
    value: "Eid-ul-Azha 2026",
    sub: "2nd or 3rd Day of Eid",
    color: "bg-gold/10 text-gold-dark",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "Biral Adarsha High School",
    sub: "Our Beloved Campus, Dinajpur",
    color: "bg-forest/10 text-forest",
  },
  {
    icon: Users,
    label: "Attendees",
    value: "All Alumni",
    sub: "Former Students & Families Welcome",
    color: "bg-gold/10 text-gold-dark",
  },
  {
    icon: Heart,
    label: "Special Honor",
    value: "Farewell Ceremony",
    sub: "Honoring Retiring Teachers & Staff",
    color: "bg-forest/10 text-forest",
  },
  {
    icon: Sparkles,
    label: "Occasion",
    value: "Eid Reunion",
    sub: "Celebrating Togetherness & Memories",
    color: "bg-gold/10 text-gold-dark",
  },
];

export default function EventDetailsSection() {
  return (
    <section id="details" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 bg-gold rounded-full" />
            <span className="text-forest/70 text-sm font-medium">
              Event Details
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-6">
            When Time Brings Us Together,
            <span className="block text-forest/60 font-light mt-2">
              We Must Not Let It Slip Away
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A grand Eid Reunion & Farewell Ceremony organized by the alumni of
            Biral Adarsha High School — an occasion to reunite, celebrate, and
            express our heartfelt gratitude.
          </p>
        </SectionReveal>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {eventDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <SectionReveal
                key={index}
                delay={index * 0.1}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div className="group relative bg-cream rounded-2xl p-8 border border-forest/5 hover:border-gold/20 transition-all duration-500 hover:shadow-lg hover:shadow-forest/5">
                  <div className="flex items-start gap-5">
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${detail.color}`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">
                        {detail.label}
                      </p>
                      <p className="text-xl font-bold text-forest-dark mb-1">
                        {detail.value}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {detail.sub}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}

          {/* Contact Card */}
          <SectionReveal delay={0.6} direction="left">
            <div className="group relative bg-gradient-to-br from-forest to-forest-dark rounded-2xl p-8 border border-forest/10 hover:border-gold/30 transition-all duration-500 hover:shadow-lg hover:shadow-forest/20">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-gold/20">
                  <Phone className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-white/60 font-medium mb-1">
                    Contact Us
                  </p>
                  <p className="text-xl font-bold text-white mb-2">
                    Get in Touch
                  </p>
                  <a
                    href="tel:+8801705937212"
                    className="text-gold text-sm hover:text-gold-light transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    +8801705937212
                  </a>
                  <a
                    href="https://wa.me/8801705937212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold/80 text-xs hover:text-gold transition-colors mt-1 block"
                  >
                    💬 Chat on WhatsApp
                  </a>
                  <a
                    href="mailto:mohontobacklinks22@gmail.com"
                    className="text-white/50 text-xs hover:text-white/80 transition-colors mt-1 flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" />
                    mohontobacklinks22@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        {/* Note */}
        <SectionReveal delay={0.7} className="mt-10 text-center">
          <p className="text-muted-foreground text-sm">
            * Final date (2nd or 3rd day of Eid-ul-Azha), time, and detailed schedule will be
            confirmed and communicated to all registered attendees
          </p>
        </SectionReveal>

        {/* Why You Should Attend — compact sub-section */}
        <SectionReveal delay={0.8} className="pt-12">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-forest-dark mb-2">
              Why You Should Attend
            </h3>
            <p className="text-muted-foreground text-sm">
              More than a reunion — it&apos;s a celebration of who we are
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Handshake, text: "Reunite with old friends" },
              { icon: Clock, text: "Relive school memories" },
              { icon: Heart, text: "Honor our beloved teachers" },
              { icon: Lightbulb, text: "Inspire next generation" },
            ].map((reason, i) => {
              const ReasonIcon = reason.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2.5 bg-cream/60 rounded-xl p-4 border border-forest/5 hover:border-gold/20 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <ReasonIcon className="w-5 h-5 text-gold-dark" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-forest-dark text-center leading-snug">
                    {reason.text}
                  </span>
                </div>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
