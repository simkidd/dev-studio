"use client";

import React, { useState } from "react";
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
  const [inquirySubject, setInquirySubject] = useState("");
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
        subject: inquirySubject || `Portfolio Inquiry for ${fullName}`,
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
          Inquire &amp; Collaborate
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Direct Consultation Gateway
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Have a project, advisory inquiry, or technical challenge in mind? Send a direct message or reach out through my direct contact channels.
        </p>
      </div>

      {/* Grid Layout: Contact Info & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Unified Contact Card & Status (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
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
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-background hover:bg-muted/70 border border-border text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-mono text-muted-foreground">Email</p>
                  <p className="text-xs font-semibold truncate group-hover:underline">{email}</p>
                </div>
              </a>

              {/* Phone (if available) */}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-background hover:bg-muted/70 border border-border text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-mono text-muted-foreground">Phone / WhatsApp</p>
                    <p className="text-xs font-semibold font-mono truncate group-hover:underline">{phone}</p>
                  </div>
                </a>
              )}

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-background border border-border text-foreground">
                <div className="w-9 h-9 rounded-xl bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-mono text-muted-foreground">Location</p>
                  <p className="text-xs font-semibold truncate">{location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="pt-4 border-t border-border/60 space-y-2.5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                  Social Presence
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
                        className="px-3 py-1.5 rounded-xl bg-background hover:bg-muted border border-border text-xs text-foreground font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Message Transmission Form (7 cols) */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-10 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-center space-y-3 shadow-xl">
              <CheckCircle2 className="w-10 h-10 mx-auto" />
              <h3 className="text-lg font-bold">Message Transmitted</h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                Thank you for reaching out. Your inquiry has been routed to {firstName}&apos;s message desk and will be addressed shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setInquiryName("");
                  setInquiryEmail("");
                  setInquirySubject("");
                  setInquiryMessage("");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSendMessage}
              className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Send an Inquiry</h2>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">Direct CRM Routing</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Your Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-hidden focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-hidden focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Architecture Sprint / Advisory Role / Project Build"
                  value={inquirySubject}
                  onChange={(e) => setInquirySubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-hidden focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your project, objectives, tech stack, and timeline..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground focus:outline-hidden focus:border-primary transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting Dispatch...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
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
