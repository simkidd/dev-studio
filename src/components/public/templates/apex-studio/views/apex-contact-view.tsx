"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { apiClient } from "@/lib/axios";
import { toast } from "sonner";
import {
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ArrowRight,
  Send,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DiscordIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

interface ApexContactViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ApexContactView({ bundle }: ApexContactViewProps) {
  const { portfolio, profile } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const email = profile?.contactEmail || profile?.socialLinks?.email || "contact@portfolio.dev";
  const phone = profile?.contactPhone || profile?.socialLinks?.phone;
  const location = profile?.location || "Global / Remote";
  const isAvailable = profile?.isAvailableForHire ?? true;
  const availabilityNote =
    profile?.availabilityNote ||
    "Available for bespoke web architectures, creative direction, and select advisory retainers.";

  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquirySubject, setInquirySubject] = useState("Digital Flagship Commission");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail || !inquiryMessage) {
      toast.error("Please provide your email and a message.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/messages", {
        senderName: inquiryName || "Prospective Client / Brand",
        senderEmail: inquiryEmail,
        message: inquiryMessage,
        subject: inquirySubject ? `[${inquirySubject}] for ${fullName}` : `Studio Commission for ${fullName}`,
        portfolioSlug: portfolio.slug,
      });
      setSubmitted(true);
      toast.success("Inquiry dispatched successfully! I will respond promptly.");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to transmit inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "GitHub", url: profile?.socialLinks?.github, icon: GithubIcon },
    { name: "LinkedIn", url: profile?.socialLinks?.linkedin, icon: LinkedinIcon },
    { name: "Twitter", url: profile?.socialLinks?.twitter, icon: TwitterIcon },
    { name: "Discord", url: profile?.socialLinks?.discord, icon: DiscordIcon },
    { name: "YouTube", url: profile?.socialLinks?.youtube, icon: YoutubeIcon },
  ].filter((s) => Boolean(s.url));

  const commissionTypes = [
    "Digital Flagship Commission",
    "Architecture Advisory",
    "Design Engineering",
    "Full-Time Leadership",
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 max-w-3xl"
      >
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold block">
          [ INITIATE DIALOGUE &bull; PRIVATE DESK ]
        </span>
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          Available for bespoke web development, creative technology direction, and select technical advisory.
        </p>
      </motion.div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Consolidated Studio Concierge Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="p-7 rounded-3xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-6 shadow-xs backdrop-blur-md">
            {/* Availability */}
            <div className="space-y-2 pb-5 border-b border-stone-200 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                  Studio Status
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase font-mono text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {isAvailable ? "Open for Commissions" : "Selectively Booked"}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-light">
                {availabilityNote}
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 block font-bold">
                Direct Channels
              </span>

              {/* Email */}
              <motion.a
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-stone-900/60 hover:bg-amber-500/10 border border-stone-200 dark:border-white/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Direct Email</p>
                  <p className="text-xs font-bold text-stone-900 dark:text-white truncate group-hover:underline font-mono">{email}</p>
                </div>
              </motion.a>

              {/* Phone (if available) */}
              {phone && (
                <motion.a
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-stone-900/60 hover:bg-amber-500/10 border border-stone-200 dark:border-white/10 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Direct Phone</p>
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate group-hover:underline font-mono">{phone}</p>
                  </div>
                </motion.a>
              )}

              {/* Location */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/50 dark:bg-stone-900/30 border border-stone-200/60 dark:border-white/5">
                <div className="w-9 h-9 rounded-xl bg-stone-200/60 dark:bg-white/5 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Base Location</p>
                  <p className="text-xs font-medium text-stone-900 dark:text-white truncate font-mono">{location}</p>
                </div>
              </div>
            </div>

            {/* Social Network Nodes */}
            {socialLinks.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 dark:text-white/40 block">
                  Studio Outposts
                </span>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((s) => {
                    const Icon = s.icon;
                    return (
                      <motion.a
                        key={s.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/10 text-xs font-mono text-stone-700 dark:text-white/70 hover:text-amber-600 dark:hover:text-amber-400 transition-colors shadow-xs"
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{s.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Interactive Dispatch Console (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="p-8 sm:p-10 rounded-3xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-xs relative overflow-hidden backdrop-blur-md">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
                      Inquiry Dispatched
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto font-light leading-relaxed">
                      Your brief has reached {fullName}&apos;s desk. Expect an initial evaluation within 24 business hours.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryMessage("");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold font-mono uppercase tracking-wider cursor-pointer"
                  >
                    <span>Send Another Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSendMessage}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block">
                      Commission Scope
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {commissionTypes.map((type) => {
                        const isSelected = inquirySubject === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInquirySubject(type)}
                            className={`p-3 rounded-2xl text-left font-mono text-xs transition-all border cursor-pointer ${
                              isSelected
                                ? "bg-amber-500/15 border-amber-500/50 text-amber-900 dark:text-amber-300 font-bold shadow-xs"
                                : "bg-white dark:bg-stone-900/60 border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:border-amber-500/30"
                            }`}
                          >
                            <span className="block truncate">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 block font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Elena Rostova"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200 dark:border-white/10 text-xs font-mono text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 block font-semibold">
                        Email Address <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="elena@studio.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200 dark:border-white/10 text-xs font-mono text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-stone-700 dark:text-stone-300 block font-semibold">
                      Project Objective &amp; Details <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Tell me about your product vision, expected delivery timeline, technical constraints, or advisory needs..."
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-stone-900/70 border border-stone-200 dark:border-white/10 text-xs font-mono text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Action */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-mono text-xs uppercase tracking-widest font-bold hover:bg-amber-600 dark:hover:bg-amber-400 dark:hover:text-stone-900 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Transmitting Brief...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Dispatch Project Brief &rarr;</span>
                      </span>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
