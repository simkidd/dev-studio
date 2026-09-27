"use client";

import React, { useState } from "react";
import { useProfile, useSubmitContactMessage } from "@/hooks";
import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  Copy,
  Check,
  MapPin,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  ChromeSparkleIcon,
} from "@/components/ui/icons";
import { toast } from "sonner";

export function ContactView() {
  const { data: profile } = useProfile();
  const submitMessageMutation = useSubmitContactMessage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const directEmail = profile?.socialLinks?.email || "hello@portfolio.dev";
  const location = profile?.location || "Remote";
  const isAvailable = profile?.isAvailableForHire ?? true;
  const availabilityNote =
    profile?.availabilityNote ||
    "Open for full-time senior roles, technical advisory & contract builds";

  const github = profile?.socialLinks?.github;
  const linkedin = profile?.socialLinks?.linkedin;
  const twitter = profile?.socialLinks?.twitter;

  const handleCopyEmail = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(directEmail);
      setCopied(true);
      toast.success("Email address copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in your name, email, and message details.");
      return;
    }

    submitMessageMutation.mutate(
      {
        senderName: name.trim(),
        senderEmail: email.trim(),
        subject: subject.trim() || "Inquiry from /contact page",
        message: message.trim(),
      },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        },
      },
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 space-y-12 sm:space-y-16">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & INTRO
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4 max-w-2xl">
        <div className="flex items-center gap-2 text-primary">
          <ChromeSparkleIcon className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Get In Touch
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
          Let&apos;s Build Something <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-500">
            Remarkable Together.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Whether you are exploring a new product flagship, modernizing legacy
          architectures, or seeking technical advisory, I would love to connect.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TWO-COLUMN LAYOUT: INFO CARDS & FORM
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left 2 Cols: Availability & Quick Channels */}
        <div className="lg:col-span-2 space-y-4">
          {/* Availability Card */}
          <div className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-foreground uppercase tracking-wider">
                Availability Status
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-foreground">
                {isAvailable ? "Open for New Engagements" : "Currently Engaged"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {availabilityNote}
              </p>
            </div>

            <div className="pt-3 border-t border-border/60 flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location}</span>
            </div>
          </div>

          {/* Copy Email Card */}
          <div className="p-6 rounded-3xl bg-card border border-border space-y-3 shadow-xs">
            <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">
              Direct Contact
            </span>

            <div className="flex items-center justify-between gap-2 p-2.5 rounded-2xl bg-muted/60 border border-border">
              <span className="text-xs font-mono text-foreground truncate pl-1">
                {directEmail}
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-background hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-colors cursor-pointer shrink-0"
                title="Copy email address"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Social Channels */}
          <div className="p-6 rounded-3xl bg-card border border-border space-y-3 shadow-xs">
            <span className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">
              Social Channels
            </span>

            <div className="flex flex-wrap gap-2 pt-1">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-2xl bg-muted/60 hover:bg-muted border border-border text-foreground transition-colors flex items-center gap-2 text-xs font-medium"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-2xl bg-muted/60 hover:bg-muted border border-border text-foreground transition-colors flex items-center gap-2 text-xs font-medium"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-2xl bg-muted/60 hover:bg-muted border border-border text-foreground transition-colors flex items-center gap-2 text-xs font-medium"
                >
                  <TwitterIcon className="w-4 h-4" />
                  <span>X (Twitter)</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right 3 Cols: Interactive Inquiry Form */}
        <div className="lg:col-span-3 p-6 sm:p-10 rounded-3xl bg-card border border-border shadow-xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground">
              Send a Message
            </h2>
            <p className="text-xs text-muted-foreground">
              Share details about your product goals, team needs, or technical
              requirements.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Subject / Opportunity
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Senior Full-Stack Role / Platform Re-architecture / Contract Build"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Message & Context *
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your tech stack, project goals, timeline, or team role..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Direct delivery to Inquiries CRM</span>
              </div>

              <button
                type="submit"
                disabled={submitMessageMutation.isPending}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {submitMessageMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
