"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ShieldCheck,
  Sparkles,
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
  const [inquirySubject, setInquirySubject] = useState("ENGINEERING_COMMISSION");
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
        subject: inquirySubject ? `[${inquirySubject}] for ${fullName}` : `NOVA Transmission for ${fullName}`,
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

  const packetTypes = [
    "ENGINEERING_COMMISSION",
    "ARCHITECTURE_AUDIT",
    "CLOUD_OPTIMIZATION",
    "FULL_TIME_ROLE",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-10 font-mono">
      {/* Terminal Title Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 max-w-3xl"
      >
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          $ netstat --listen --direct-comms
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Open a direct socket communication stream or reach out via authenticated relays.
        </p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Telemetry Card (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 backdrop-blur-md">
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
              <motion.a
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
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
              </motion.a>

              {/* Phone (if available) */}
              {phone && (
                <motion.a
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-400">VOICE_CHANNEL</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-cyan-300 truncate group-hover:underline">{phone}</p>
                  </div>
                </motion.a>
              )}

              {/* Location */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/60">
                <div className="w-8 h-8 rounded-lg bg-slate-200/50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-slate-400">NODE_LOCATION</p>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{location}</p>
                </div>
              </div>
            </div>

            {/* Social Relays */}
            {socialLinks.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">
                  EXTERNAL_NODES
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
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
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

        {/* Right Form: Simulated Transmission Interface (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden backdrop-blur-md">
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
                    className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20"
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      TRANSMISSION_ACKNOWLEDGED
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-sans max-w-sm mx-auto">
                      Payload received and enqueued in {fullName}&apos;s priority queue.
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>$ reset_buffer()</span>
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
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-bold">
                      PACKET_TYPE:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {packetTypes.map((type) => {
                        const isSelected = inquirySubject === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setInquirySubject(type)}
                            className={`p-2.5 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                              isSelected
                                ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-700 dark:text-cyan-300 font-bold"
                                : "bg-slate-50 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-cyan-500/30"
                            }`}
                          >
                            <span className="block truncate font-mono">{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-bold">
                        OPERATOR_NAME
                      </label>
                      <input
                        type="text"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-bold">
                        RETURN_SOCKET (Email) <span className="text-cyan-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="user@network.io"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block font-bold">
                      PAYLOAD_DATA (Message) <span className="text-cyan-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Describe system specifications, architecture requirements, or project objectives..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-mono text-xs uppercase tracking-wider font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>$ transmitting_stream...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>$ emit_payload --encrypt</span>
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
