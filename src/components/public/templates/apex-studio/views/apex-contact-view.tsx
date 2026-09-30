"use client";

import React, { useState } from "react";
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
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
          Commission Studio
        </span>
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
          Initiate Inquiries
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          Available for bespoke web architectures, interactive 3D digital experiences, and creative engineering leadership.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Consolidated Studio Concierge Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-6 shadow-xs">
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

            {/* Direct Contact Channels in one list */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 block font-bold">
                Direct Channels
              </span>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-stone-900/60 hover:bg-amber-500/10 border border-stone-200 dark:border-white/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Direct Email</p>
                  <p className="text-xs font-bold text-stone-900 dark:text-white truncate group-hover:underline font-mono">{email}</p>
                </div>
              </a>

              {/* Phone (if available) */}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-stone-900/60 hover:bg-amber-500/10 border border-stone-200 dark:border-white/10 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Phone / WhatsApp</p>
                    <p className="text-xs font-bold text-stone-900 dark:text-white truncate group-hover:underline font-mono">{phone}</p>
                  </div>
                </a>
              )}

              {/* Base Location */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-white/10">
                <div className="w-9 h-9 rounded-xl bg-stone-200/60 dark:bg-white/10 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Location Base</p>
                  <p className="text-xs font-bold text-stone-900 dark:text-white truncate">{location}</p>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            {socialLinks.length > 0 && (
              <div className="pt-4 border-t border-stone-200 dark:border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400 block font-bold">
                  Network & Handles
                </span>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900/60 hover:bg-amber-500/10 border border-stone-200 dark:border-white/10 text-xs font-mono text-stone-800 dark:text-stone-200 font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-amber-500" />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Commission Form (7 cols) */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-10 rounded-3xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 dark:border-amber-400/30 text-amber-800 dark:text-amber-300 text-center space-y-4 shadow-xl">
              <CheckCircle2 className="w-12 h-12 mx-auto text-amber-600 dark:text-amber-400" />
              <h3 className="text-xl font-black uppercase tracking-tight">Inquiry Dispatched</h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto font-light">
                Thank you. Your inquiry has been transmitted to {fullName}&apos;s desk and will receive priority review.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setInquiryName("");
                  setInquiryEmail("");
                  setInquiryMessage("");
                }}
                className="mt-4 px-6 py-2.5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSendMessage}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-2xl space-y-6"
            >
              {/* Type selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400 block tracking-wider">
                  Scope of Inquiry
                </label>
                <div className="flex flex-wrap gap-2">
                  {commissionTypes.map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setInquirySubject(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                        inquirySubject === type
                          ? "bg-amber-500 text-stone-950 font-bold shadow-xs"
                          : "bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/10"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400 mb-1.5 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Marc Jacobs"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-white/10 text-sm text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400 mb-1.5 block">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marc@studio.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-white/10 text-sm text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400 mb-1.5 block">
                  Project Brief & Objectives *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your vision, brand objectives, timeline, and scope..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-white/10 text-sm text-stone-900 dark:text-white focus:outline-hidden focus:border-amber-400 resize-none transition-colors leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-amber-500 dark:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-widest hover:bg-amber-400 dark:hover:bg-amber-300 transition-colors cursor-pointer shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Dispatching Inquiry..."
                ) : (
                  <>
                    <span>Submit Commission</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
