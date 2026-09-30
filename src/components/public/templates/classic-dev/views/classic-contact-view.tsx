"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { apiClient } from "@/lib/axios";
import { toast } from "sonner";
import {
  CheckCircle2,
  Send,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DiscordIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

interface ClassicContactViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ClassicContactView({ bundle }: ClassicContactViewProps) {
  const { portfolio, profile } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const email = profile?.contactEmail || profile?.socialLinks?.email || "contact@portfolio.dev";
  const phone = profile?.contactPhone || profile?.socialLinks?.phone;
  const location = profile?.location || "Remote / Global";
  const isAvailable = profile?.isAvailableForHire ?? true;
  const availabilityNote =
    profile?.availabilityNote ||
    "Open for full-time senior engineering, architecture advisory & contracts.";

  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquirySubject, setInquirySubject] = useState("Full-Stack Web Application");
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
        senderName: inquiryName || "Prospective Client / Partner",
        senderEmail: inquiryEmail,
        message: inquiryMessage,
        subject: inquirySubject ? `[${inquirySubject}] for ${fullName}` : `Portfolio Inquiry for ${fullName}`,
        portfolioSlug: portfolio.slug,
      });
      setSubmitted(true);
      toast.success("Message dispatched successfully! I will respond promptly.");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to transmit message.");
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

  const subjectOptions = [
    "Full-Stack Web Application",
    "Technical Architecture Advisory",
    "Design Engineering Retainer",
    "Senior Full-Time Opportunity",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 max-w-3xl"
      >
        <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          Direct Inquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Have a project in mind, an opportunity, or want to discuss technical collaboration? Send a message below or connect directly.
        </p>
      </motion.div>

      {/* Grid Layout: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Unified Contact Card & Status (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Single Unified Contact Details Card */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-5">
            {/* Availability */}
            <div className="space-y-2 pb-4 border-b border-border/60">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Availability
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {isAvailable ? "Available for Hire" : "Engaged"}
                </span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed">
                {availabilityNote}
              </p>
            </div>

            {/* Direct Contact Channels in one list */}
            <div className="space-y-3.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                Direct Channels
              </span>

              {/* Email */}
              <motion.a
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-background hover:bg-muted/70 border border-border text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-mono text-muted-foreground">Email</p>
                  <p className="text-xs font-semibold truncate group-hover:underline">{email}</p>
                </div>
              </motion.a>

              {/* Phone (if available) */}
              {phone && (
                <motion.a
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-background hover:bg-muted/70 border border-border text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-mono text-muted-foreground">Phone</p>
                    <p className="text-xs font-semibold truncate group-hover:underline">{phone}</p>
                  </div>
                </motion.a>
              )}

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border/50 text-foreground">
                <div className="w-9 h-9 rounded-xl bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-mono text-muted-foreground">Location</p>
                  <p className="text-xs font-semibold truncate">{location}</p>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            {socialLinks.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-border/60">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                  Find Me Online
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background hover:bg-muted border border-border text-xs font-medium text-foreground hover:text-primary transition-colors shadow-xs"
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

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xs relative overflow-hidden">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground">Message Dispatched!</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                      Thank you for reaching out. I&apos;ve received your note and will get back to you shortly.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setInquiryMessage("");
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <span>Send Another Note</span>
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
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-semibold uppercase text-muted-foreground block">
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {subjectOptions.map((opt) => {
                        const isSelected = inquirySubject === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setInquirySubject(opt)}
                            className={`p-2.5 rounded-xl text-left text-xs font-medium transition-all border cursor-pointer ${
                              isSelected
                                ? "bg-primary/10 border-primary text-primary font-bold shadow-xs"
                                : "bg-background border-border text-foreground hover:border-primary/40"
                            }`}
                          >
                            <span className="block truncate">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground block">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground block">
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Tell me about your project, timeline, or engineering needs..."
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-wider shadow-lg shadow-primary/25 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Send Direct Inquiry</span>
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
