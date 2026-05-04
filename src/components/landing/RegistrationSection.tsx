"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Phone,
  Mail,
  Briefcase,
  MapPin,
  Users,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertCircle,
  MessageCircle,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SectionReveal from "./SectionReveal";
import SectionDivider from "./SectionDivider";

interface FormData {
  name: string;
  batch: string;
  phone: string;
  email: string;
  profession: string;
  location: string;
  attending: string;
  guests: string;
  message: string;
}

interface FormErrors {
  name?: string;
  batch?: string;
  phone?: string;
  email?: string;
  guests?: string;
}

const initialFormData: FormData = {
  name: "",
  batch: "",
  phone: "",
  email: "",
  profession: "",
  location: "",
  attending: "yes",
  guests: "0",
  message: "",
};

interface RegistrationSectionProps {
  prefilledData?: Record<string, string> | null;
}

// Confetti particles data
const confettiParticles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.8,
  size: Math.random() * 6 + 3,
  color: [
    "bg-forest",
    "bg-gold",
    "bg-gold-light",
    "bg-forest-light",
    "bg-sage",
    "bg-cream-dark",
  ][Math.floor(Math.random() * 6)],
  duration: Math.random() * 1.5 + 1.5,
  rotation: Math.random() * 360,
  drift: (Math.random() - 0.5) * 60,
}));

// Shake animation keyframes
const shakeAnimation = {
  x: [0, -8, 8, -6, 6, -3, 3, 0],
  transition: { duration: 0.5, ease: "easeInOut" },
};

export default function RegistrationSection({ prefilledData }: RegistrationSectionProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [prefillNotice, setPrefillNotice] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Calculate form progress
  const requiredFields = ["name", "batch", "phone"];
  const optionalFields = ["email", "profession", "location", "message"];
  const filledRequired = requiredFields.filter((f) => formData[f as keyof FormData].trim()).length;
  const filledOptional = optionalFields.filter((f) => formData[f as keyof FormData].trim()).length;
  const formProgress = Math.round(((filledRequired * 2 + filledOptional) / (requiredFields.length * 2 + optionalFields.length)) * 100);

  // Auto-fill form when chatbot provides data
  useEffect(() => {
    if (prefilledData && Object.keys(prefilledData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        name: prefilledData.name || prev.name,
        batch: prefilledData.batch || prev.batch,
        phone: prefilledData.phone || prev.phone,
        email: prefilledData.email || prev.email,
        profession: prefilledData.profession || prev.profession,
        location: prefilledData.location || prev.location,
        attending: prefilledData.attending || prev.attending,
        guests: prefilledData.guests || prev.guests,
        message: prefilledData.message || prev.message,
      }));
      setPrefillNotice(true);
      // Clear the notice after 5 seconds
      setTimeout(() => setPrefillNotice(false), 5000);
    }
  }, [prefilledData]);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name is required (at least 2 characters)";
    }
    if (!formData.batch.trim()) {
      newErrors.batch = "Batch/Passing year is required";
    }
    // BD phone: starts with 01, then 9 digits
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid BD number (e.g., 01XXXXXXXXX)";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    const guestCount = parseInt(formData.guests);
    if (isNaN(guestCount) || guestCount < 0 || guestCount > 10) {
      newErrors.guests = "Guests must be between 0 and 10";
    }

    setErrors(newErrors);

    // Trigger shake if there are errors
    if (Object.keys(newErrors).length > 0) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          guests: parseInt(formData.guests) || 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed. Please try again.");
      }

      setIsSubmitted(true);
      setShowConfetti(true);
      // Stop confetti after a few seconds
      setTimeout(() => setShowConfetti(false), 4000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input wrapper class for expanding ring effect
  const inputWrapperClass = () => "relative group/input";

  if (isSubmitted) {
    return (
      <section
        id="registration"
        className="py-16 md:py-20 bg-white relative overflow-hidden"
      >
        {/* Confetti particles */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {confettiParticles.map((p) => (
              <motion.div
                key={p.id}
                className={`absolute ${p.color} rounded-sm`}
                style={{
                  left: `${p.x}%`,
                  top: "-10px",
                  width: p.size,
                  height: p.size,
                }}
                initial={{ y: 0, opacity: 1, rotate: p.rotation, x: 0 }}
                animate={{
                  y: "110vh",
                  opacity: [1, 1, 0.6, 0],
                  rotate: p.rotation + 720,
                  x: p.drift,
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeIn",
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            {/* Success animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="inline-flex items-center justify-center w-24 h-24 bg-forest/5 rounded-full mb-8"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
              >
                <CheckCircle2 className="w-14 h-14 text-forest" />
              </motion.div>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-forest-dark mb-4">
              Registration Successful!
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Thank you, <span className="font-semibold text-forest">{formData.name}</span>.
              Your registration for the Alumni Eid Reunion & Farewell 2026 has been
              completed successfully. We will keep you updated with all event details.
            </p>

            <div className="inline-flex items-center gap-2 bg-sage rounded-full px-5 py-2.5">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-forest font-medium">
                Batch: {formData.batch}
              </span>
            </div>

            {/* Contact info after registration */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/8801705937212"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-forest/70 hover:text-forest transition-colors"
              >
                💬 WhatsApp: +8801705937212
              </a>
              <span className="hidden sm:block w-1 h-1 bg-forest/20 rounded-full" />
              <a
                href="mailto:mohontobacklinks22@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-forest/70 hover:text-forest transition-colors"
              >
                📧 mohontobacklinks22@gmail.com
              </a>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(initialFormData);
                }}
                className="text-muted-foreground hover:text-forest text-sm underline underline-offset-4 transition-colors"
              >
                Register another person
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="registration"
      className="py-16 md:py-20 bg-gradient-to-b from-cream to-white relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 mb-6 border border-forest/10 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-forest/5 border border-forest/10 p-0.5 flex-shrink-0">
              <img
                src="/images/school-emblem.png"
                alt="Biral Adarsha High School emblem"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-forest-dark font-semibold text-sm leading-tight">
                Register Now
              </span>
              <span className="text-muted-foreground text-xs">
                Biral Adarsha High School Alumni
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-6">
            Secure Your Spot
            <span className="block text-forest/60 font-light mt-2">
              Join the Grand Celebration
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            All former students of Biral Adarsha High School are invited.
            Complete your registration in just a few minutes and we&apos;ll keep
            you updated with all event details.
          </p>
        </SectionReveal>

        {/* Section Divider before form */}
        <SectionDivider style="line" variant="gold" className="mb-10" />

        {/* Registration Form */}
        <SectionReveal delay={0.2}>
          <motion.form
            onSubmit={handleSubmit}
            animate={isShaking ? shakeAnimation : { x: 0 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-forest/5 shadow-xl shadow-forest/5"
            noValidate
          >
            {/* Form progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {formProgress === 100 ? "All set! Ready to submit" : formProgress > 50 ? "Almost there!" : "Fill in your details"}
                </span>
                <span className={`text-xs font-semibold ${formProgress === 100 ? "text-green-600" : "text-forest"}`}>
                  {formProgress}%
                </span>
              </div>
              <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-colors duration-300 ${
                    formProgress === 100 ? "bg-green-500" : formProgress > 50 ? "bg-gold" : "bg-forest/40"
                  }`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${formProgress}%`,
                    boxShadow: formProgress === 100 ? "0 0 12px rgba(34,197,94,0.4)" : "0 0 0px transparent",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              {/* Pulse effect when at 100% */}
              {formProgress === 100 && (
                <motion.div
                  className="mt-1 h-0.5 bg-green-400/40 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: [0, 1, 0.8, 1], opacity: [0, 0.6, 0.3, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                />
              )}
            </div>

            {/* Prefill notice from chatbot */}
            <AnimatePresence>
              {prefillNotice && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex items-center gap-3 bg-forest/5 text-forest-dark rounded-xl p-4 border border-forest/10"
                >
                  <MessageCircle className="w-5 h-5 flex-shrink-0 text-forest" />
                  <div>
                    <p className="text-sm font-medium">Form filled by AI Assistant</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Please review the information below and click &quot;Complete Registration&quot; to confirm.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex items-center gap-3 bg-destructive/10 text-destructive rounded-xl p-4"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{submitError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Required fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-forest-dark font-medium flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <div className={inputWrapperClass()}>
                  {/* Expanding ring effect */}
                  <div className={`absolute -inset-0.5 rounded-xl border-2 border-forest/0 pointer-events-none transition-all duration-500 ${focusedField === "name" ? "border-forest/15 -inset-1" : ""}`} />
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 bg-cream/50 border-forest/10 focus:border-forest/30 placeholder:text-muted-foreground/50 transition-all duration-200 relative z-[1] ${errors.name ? "border-destructive focus:border-destructive" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-destructive text-xs flex items-center gap-1 overflow-hidden"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Batch */}
              <div className="space-y-2">
                <Label
                  htmlFor="batch"
                  className="text-forest-dark font-medium flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  Batch / Passing Year <span className="text-destructive">*</span>
                </Label>
                <div className={inputWrapperClass()}>
                  <div className={`absolute -inset-0.5 rounded-xl border-2 border-forest/0 pointer-events-none transition-all duration-500 ${focusedField === "batch" ? "border-forest/15 -inset-1" : ""}`} />
                  <Input
                    id="batch"
                    autoComplete="organization-title"
                    placeholder="e.g., SSC 2010, HSC 2012"
                    value={formData.batch}
                    onChange={(e) => updateField("batch", e.target.value)}
                    onFocus={() => setFocusedField("batch")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 bg-cream/50 border-forest/10 focus:border-forest/30 placeholder:text-muted-foreground/50 transition-all duration-200 relative z-[1] ${errors.batch ? "border-destructive focus:border-destructive" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {errors.batch && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-destructive text-xs flex items-center gap-1 overflow-hidden"
                    >
                      {errors.batch}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-forest-dark font-medium flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <div className={inputWrapperClass()}>
                  <div className={`absolute -inset-0.5 rounded-xl border-2 border-forest/0 pointer-events-none transition-all duration-500 ${focusedField === "phone" ? "border-forest/15 -inset-1" : ""}`} />
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="01[3-9][0-9]{8}"
                    maxLength={11}
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 bg-cream/50 border-forest/10 focus:border-forest/30 placeholder:text-muted-foreground/50 transition-all duration-200 relative z-[1] ${errors.phone ? "border-destructive focus:border-destructive" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-destructive text-xs flex items-center gap-1 overflow-hidden"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-forest-dark font-medium flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  Email <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <div className={inputWrapperClass()}>
                  <div className={`absolute -inset-0.5 rounded-xl border-2 border-forest/0 pointer-events-none transition-all duration-500 ${focusedField === "email" ? "border-forest/15 -inset-1" : ""}`} />
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`h-12 bg-cream/50 border-forest/10 focus:border-forest/30 placeholder:text-muted-foreground/50 transition-all duration-200 relative z-[1] ${errors.email ? "border-destructive focus:border-destructive" : ""}`}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      className="text-destructive text-xs flex items-center gap-1 overflow-hidden"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Profession */}
              <div className="space-y-2">
                <Label
                  htmlFor="profession"
                  className="text-forest-dark font-medium flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  Profession <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <div className={inputWrapperClass()}>
                  <div className={`absolute -inset-0.5 rounded-xl border-2 border-forest/0 pointer-events-none transition-all duration-500 ${focusedField === "profession" ? "border-forest/15 -inset-1" : ""}`} />
                  <Input
                    id="profession"
                    autoComplete="organization"
                    placeholder="Your current profession"
                    value={formData.profession}
                    onChange={(e) => updateField("profession", e.target.value)}
                    onFocus={() => setFocusedField("profession")}
                    onBlur={() => setFocusedField(null)}
                    className="h-12 bg-cream/50 border-forest/10 focus:border-forest/30 placeholder:text-muted-foreground/50 transition-all duration-200 relative z-[1]"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-forest-dark font-medium flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Current Location <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <div className={inputWrapperClass()}>
                  <div className={`absolute -inset-0.5 rounded-xl border-2 border-forest/0 pointer-events-none transition-all duration-500 ${focusedField === "location" ? "border-forest/15 -inset-1" : ""}`} />
                  <Input
                    id="location"
                    autoComplete="address-level2"
                    placeholder="Where are you currently living?"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    onFocus={() => setFocusedField("location")}
                    onBlur={() => setFocusedField(null)}
                    className="h-12 bg-cream/50 border-forest/10 focus:border-forest/30 placeholder:text-muted-foreground/50 transition-all duration-200 relative z-[1]"
                  />
                </div>
              </div>
            </div>

            {/* Attending */}
            <div className="mt-6 space-y-2">
              <Label className="text-forest-dark font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                Will you attend the event?
              </Label>
              <div className="flex gap-4">
                {[
                  { value: "yes", label: "Yes, I'll be there" },
                  { value: "no", label: "No, I can't make it" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border cursor-pointer transition-all duration-300 ${
                      formData.attending === option.value
                        ? "bg-forest text-white border-forest shadow-md shadow-forest/20"
                        : "bg-cream/50 text-muted-foreground border-forest/10 hover:border-forest/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value={option.value}
                      checked={formData.attending === option.value}
                      onChange={(e) => updateField("attending", e.target.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Guests */}
            <div className="mt-6 space-y-2">
              <Label
                htmlFor="guests"
                className="text-forest-dark font-medium flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-muted-foreground" />
                Number of Guests <span className="text-muted-foreground font-normal">(family members accompanying you)</span>
              </Label>
              <div className={inputWrapperClass()}>
                <div className={`absolute -inset-0.5 rounded-xl border-2 border-forest/0 pointer-events-none transition-all duration-500 ${focusedField === "guests" ? "border-forest/15 -inset-1" : ""}`} />
                <Input
                  id="guests"
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max="10"
                  value={formData.guests}
                  onChange={(e) => updateField("guests", e.target.value)}
                  onFocus={() => setFocusedField("guests")}
                  onBlur={() => setFocusedField(null)}
                  className={`h-12 bg-cream/50 border-forest/10 focus:border-forest/30 placeholder:text-muted-foreground/50 w-32 transition-all duration-200 relative z-[1] ${errors.guests ? "border-destructive focus:border-destructive" : ""}`}
                />
              </div>
              <AnimatePresence>
                {errors.guests && (
                  <motion.p
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-destructive text-xs flex items-center gap-1 overflow-hidden"
                  >
                    {errors.guests}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Message */}
            <div className="mt-6 space-y-2">
              <Label
                htmlFor="message"
                className="text-forest-dark font-medium flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                Memory / Message <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <div className={inputWrapperClass()}>
                <div className={`absolute -inset-0.5 rounded-xl border-2 border-forest/0 pointer-events-none transition-all duration-500 ${focusedField === "message" ? "border-forest/15 -inset-1" : ""}`} />
                <Textarea
                  id="message"
                  placeholder="Share a school memory or a message for your teachers..."
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  className="bg-cream/50 border-forest/10 focus:border-forest/30 placeholder:text-muted-foreground/50 resize-none transition-all duration-200 relative z-[1]"
                />
              </div>
            </div>

            {/* Submit Button with hover scale */}
            <div className="mt-8">
              <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full h-14 bg-forest hover:bg-forest-light text-white font-semibold text-lg rounded-2xl shadow-lg shadow-forest/20 hover:shadow-forest/30 transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Registering...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Complete Registration
                    </span>
                  )}
                </Button>
              </motion.div>
            </div>

            <p className="text-center text-muted-foreground/60 text-xs mt-4">
              Your information is completely safe and confidential
            </p>
          </motion.form>
        </SectionReveal>

        {/* Join Our Team CTA */}
        <SectionReveal delay={0.4} className="mt-10">
          <div className="bg-forest rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-forest/10">
            <p className="text-white text-sm font-medium text-center sm:text-left">
              Want to help organize the event?
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/8801705937212"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                aria-label="Contact via WhatsApp"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://facebook.com/bahs.dnj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                aria-label="Visit Facebook page"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
              <a
                href="mailto:mohontobacklinks22@gmail.com"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                aria-label="Send email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
