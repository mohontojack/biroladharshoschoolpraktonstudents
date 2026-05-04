"use client";

import { motion } from "framer-motion";
import {
  Users,
  Heart,
  Target,
  Eye,
  Handshake,
  Globe,
  Mail,
  Phone,
  Facebook,
  MessageCircle,
  Shield,
} from "lucide-react";
import SectionReveal from "./SectionReveal";

const missionValues = [
  {
    icon: Heart,
    title: "Unity & Brotherhood",
    description:
      "Strengthening the bonds between all former students of BAHS, regardless of batch, profession, or location. We believe in the power of community and the enduring connections forged in our school days.",
  },
  {
    icon: Target,
    title: "Giving Back",
    description:
      "Contributing to the development of Biral Adarsha High School and supporting current students through mentorship, scholarships, and resources. Our success is measured by the success of those who follow.",
  },
  {
    icon: Handshake,
    title: "Teacher Appreciation",
    description:
      "Honoring and supporting our beloved teachers who dedicated their lives to shaping ours. The Alumni Eid Reunion & Farewell 2026 is our way of expressing heartfelt gratitude to those who gave us everything.",
  },
  {
    icon: Eye,
    title: "Preserving Heritage",
    description:
      "Documenting and preserving the rich history, traditions, and memories of BAHS for future generations. Every story, every photograph, every memory is a treasure worth preserving.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Connecting BAHS alumni across Bangladesh and around the world. From Dhaka to Dinajpur, from the Middle East to North America — our alumni family spans the globe.",
  },
  {
    icon: Shield,
    title: "Transparency & Trust",
    description:
      "Operating with complete transparency in all matters — from event planning to fund management. Every decision is made collectively, and every taka is accounted for.",
  },
];

const teamRoles = [
  {
    role: "Event Coordinator",
    description: "Leading the organization of the Alumni Eid Reunion & Farewell 2026 event.",
    contact: "+8801705937212",
  },
  {
    role: "Communication",
    description: "Managing social media, outreach, and keeping all alumni informed and connected.",
    contact: "bahs.dnj@facebook.com",
  },
  {
    role: "Finance & Logistics",
    description: "Handling event budget, venue arrangements, catering, and all operational logistics.",
    contact: "mohontobacklinks22@gmail.com",
  },
];

export default function AboutUsSection() {
  return (
    <section id="about-us" className="py-24 md:py-32 bg-gradient-to-b from-white via-cream/30 to-cream relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-forest/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-56 h-56 bg-gold/3 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-forest/5 rounded-full px-4 py-1.5 mb-6">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span className="text-forest/70 text-sm font-medium">
              About Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-6">
            BAHS প্রাক্তন শিক্ষার্থী
            <span className="block text-forest/60 font-light mt-2">
              The Team Behind the Reunion
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            We are a passionate group of former students of Biral Adarsha High School who
            came together with a shared dream — to organize a grand reunion that honors our
            beloved school, our respected teachers, and the enduring bonds of friendship.
          </p>
        </SectionReveal>

        {/* Who We Are */}
        <SectionReveal delay={0.1}>
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-forest/5 shadow-lg shadow-forest/5 mb-16">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest to-forest-dark flex items-center justify-center shadow-lg shadow-forest/20">
                  <Users className="w-8 h-8 text-gold" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-forest-dark mb-3">
                  Who We Are
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  BAHS প্রাক্তন শিক্ষার্থী — an informal, volunteer-driven organization formed by
                  ex-students of Biral Adarsha High School (বিরল আদর্শ উচ্চ বিদ্যালয়). We are not
                  affiliated with any political party or organization. Our sole purpose is to serve
                  the BAHS community — connecting alumni, supporting the school, and honoring the
                  teachers who shaped our lives.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  For the Alumni Eid Reunion & Farewell Ceremony 2026, we have assembled a dedicated
                  team of volunteers who are working tirelessly to make this event a memorable
                  experience for everyone. From event planning to registration, from communication
                  to logistics — every aspect is handled with care and dedication.
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Our Mission & Values */}
        <SectionReveal delay={0.15} className="mb-16">
          <h3 className="text-xl font-bold text-forest-dark mb-8 flex items-center gap-2 justify-center">
            <Heart className="w-5 h-5 text-gold" />
            Our Mission & Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionValues.map((item, i) => {
              const Icon = item.icon;
              return (
                <SectionReveal key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="group h-full bg-white rounded-2xl p-6 border border-forest/5 hover:border-gold/20 hover:shadow-lg hover:shadow-forest/5 transition-all duration-500"
                  >
                    <div className="inline-flex items-center justify-center w-11 h-11 bg-gold/10 rounded-xl mb-4 group-hover:bg-gold/15 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gold-dark" />
                    </div>
                    <h4 className="text-base font-bold text-forest-dark mb-2">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </SectionReveal>
              );
            })}
          </div>
        </SectionReveal>

        {/* Team Roles */}
        <SectionReveal delay={0.15} className="mb-16">
          <h3 className="text-xl font-bold text-forest-dark mb-8 flex items-center gap-2 justify-center">
            <Shield className="w-5 h-5 text-gold" />
            Our Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamRoles.map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-forest/5 hover:border-gold/20 hover:shadow-lg hover:shadow-forest/5 transition-all duration-500 text-center">
                  <div className="w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-forest" />
                  </div>
                  <h4 className="text-base font-bold text-forest-dark mb-2">
                    {item.role}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <p className="text-forest/60 text-xs">
                    {item.contact}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </SectionReveal>

        {/* Contact / CTA */}
        <SectionReveal delay={0.2}>
          <div className="relative bg-gradient-to-br from-forest to-forest-dark rounded-2xl p-8 md:p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
            <div className="absolute top-0 left-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Want to Join the Team?
              </h3>
              <p className="text-white/70 max-w-lg mx-auto leading-relaxed mb-8">
                We are always looking for passionate BAHS alumni who want to contribute to our
                mission. Whether you want to volunteer, suggest ideas, or simply stay connected —
                we welcome you with open arms.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://wa.me/8801705937212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dark text-forest-dark font-semibold rounded-full text-sm transition-colors shadow-lg shadow-gold/20"
                >
                  <Phone className="w-4 h-4" />
                  Contact on WhatsApp
                </a>
                <a
                  href="https://www.facebook.com/bahs.dnj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full text-sm transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  Follow on Facebook
                </a>
                <a
                  href="mailto:mohontobacklinks22@gmail.com"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white/80 border border-white/20 rounded-full text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
