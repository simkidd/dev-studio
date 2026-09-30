"use client";

import React, { useState } from "react";
import { IPublicPortfolioBundle } from "@/interfaces";
import { apiClient } from "@/lib/axios";
import { toast } from "sonner";
import {
  CheckCircle2,
  Terminal,
  Mail,
  Phone,
  MapPin,
  Activity,
  Send,
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DiscordIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

interface NovaContactViewProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaContactView({ bundle }: NovaContactViewProps) {
  const { portfolio, profile } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const email = profile?.contactEmail || profile?.socialLinks?.email || "contact@portfolio.dev";
  const phone = profile?.contactPhone || profile?.socialLinks?.phone;
  const location = profile?.location || "Remote Node";
  const isAvailable = profile?.isAvailableForHire ?? true;
  const availabilityNote =
    profile?.availabilityNote || "Systems online. Ready for mission-critical builds.";

  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquirySubject, setInquirySubject] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryEmail || !inquiryMessage) {
      toast.error("Required fields missing: SENDER_EMAIL or PAYLOAD_DATA");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post("/messages", {
        senderName: inquiryName || "Systems Operator",
        senderEmail: inquiryEmail,
        message: inquiryMessage,
        subject: inquirySubject || `NOVA-OS Transmission for ${fullName}`,
        portfolioSlug: portfolio.slug,
      });
      setSubmitted(true);
      toast.success("Payload transmitted successfully!");
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-10 font-mono">
      {/* Terminal Title Header */}
      <div className="space-y-2 max-w-3xl">
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">$ socket.open_stream(&quot;inquiries.crm&quot;)</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Transmit Payload
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Direct uplink to {fullName}&apos;s dashboard telemetry and message queue.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Telemetry Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            {/* System Availability */}
            <div className="space-y-2 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-500" />
                  SYSTEM_STATUS
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {isAvailable ? "ONLINE_ACTIVE" : "ENGAGED"}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                {availabilityNote}
              </p>
            </div>

            {/* Direct Comms Channels in one list */}
            <div className="space-y-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-bold">
                DIRECT_RELAYS
              </span>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400">SIGNAL_ENDPOINT</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-cyan-300 truncate group-hover:underline">{email}</p>
                </div>
              </a>

              {/* Phone (if available) */}
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400">VOICE_FREQUENCY</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-cyan-300 truncate group-hover:underline">{phone}</p>
                  </div>
                </a>
              )}

              {/* Coordinates */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400">NODE_COORDINATES</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{location}</p>
                </div>
              </div>
            </div>

            {/* Social Nodes */}
            {socialLinks.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-bold">
                  FEDERATED_RELAYS
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
                        className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Transmission Console (7 cols) */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 mx-auto" />
              <p className="text-sm font-bold tracking-wider">TRANSMISSION_ACKNOWLEDGED</p>
              <p className="text-xs font-sans text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                Payload safely committed to {fullName}&apos;s message buffer. Response dispatch scheduled.
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
                className="mt-4 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-800 dark:text-cyan-300 text-xs font-bold transition-colors cursor-pointer"
              >
                $ new_transmission
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSendMessage}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl font-sans"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                  $ exec transmission_gate
                </span>
                <span className="text-[11px] font-mono text-slate-400">TLS_1.3_ENCRYPTED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1 block">
                    OPERATOR_NAME
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Vance"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-cyan-300 focus:outline-hidden focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1 block">
                    SENDER_EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@systems.corp"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-cyan-300 focus:outline-hidden focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1 block">
                  PAYLOAD_SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Infrastructure / Core Engineering Contract"
                  value={inquirySubject}
                  onChange={(e) => setInquirySubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-cyan-300 focus:outline-hidden focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1 block">
                  PAYLOAD_DATA *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Provide parameters, tech stack requirements, timeline, and scope..."
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm font-mono text-slate-900 dark:text-cyan-300 focus:outline-hidden focus:border-cyan-500 resize-none transition-colors leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-mono font-bold text-xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>$ transmitting_stream...</span>
                ) : (
                  <>
                    <span>$ transmit_payload</span>
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
