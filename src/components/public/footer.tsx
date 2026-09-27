"use client";

import React from "react";
import Link from "next/link";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DiscordIcon,
  YoutubeIcon,
  ChromeSparkleIcon,
} from "@/components/ui/icons";
import { Mail, ArrowUpRight, ArrowUp, MapPin } from "lucide-react";
import { useProfile } from "@/hooks";

export function PublicFooter() {
  const { data: profile } = useProfile();

  const fullName = profile?.firstName
    ? `${profile.firstName} ${profile.lastName || ""}`.trim()
    : "Developer";
  const brandName = profile?.brandName?.trim() || fullName;
  const headline =
    profile?.headline || "Full-Stack Engineer & Systems Architect";
  const location = profile?.location || "Remote";
  const email = profile?.socialLinks?.email || "contact@portfolio.dev";
  const github = profile?.socialLinks?.github;
  const linkedin = profile?.socialLinks?.linkedin;
  const twitter = profile?.socialLinks?.twitter;
  const discord = profile?.socialLinks?.discord;
  const youtube = profile?.socialLinks?.youtube;
  const isAvailable = profile?.isAvailableForHire ?? true;
  const availabilityNote =
    profile?.availabilityNote ||
    "Open for select full-time staff roles, technical advisory & contract builds.";

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border/70 bg-background/50 backdrop-blur-sm text-muted-foreground text-xs relative overflow-hidden mt-32">
      {/* Ambient decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10 space-y-12">
        {/* Top Big Statement Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-border/60">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-primary">
              <ChromeSparkleIcon className="w-4 h-4" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
                Collaboration & Inquiries
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Let&apos;s build something remarkable together.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Have an ambitious product in mind, need technical architecture
              leadership, or want to discuss full-time opportunities?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-muted/80 hover:bg-muted text-foreground text-xs font-medium border border-border transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{email}</span>
            </a>
          </div>
        </div>

        {/* Navigation & Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8">
          {/* Identity & Status (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              {profile?.logoUrl ? (
                <img
                  src={profile.logoUrl}
                  alt={brandName}
                  className="w-7 h-7 rounded-lg object-contain"
                />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              )}
              <span className="font-bold text-foreground text-sm sm:text-base tracking-tight">
                {brandName}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {headline}
            </p>
            {location && (
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{location}</span>
              </div>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {isAvailable
                  ? "Available for opportunities"
                  : "Currently occupied"}
              </span>
            </div>
          </div>

          {/* Quick Navigation (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>About & Experience</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Featured Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Capabilities</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Articles & Insights</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Socials (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-semibold">
              Connect & Socials
            </h4>
            <ul className="space-y-2.5 text-xs">
              {github && (
                <li>
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors group"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
              {linkedin && (
                <li>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors group"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
              {twitter && (
                <li>
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors group"
                  >
                    <TwitterIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span>X (Twitter)</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
              {youtube && (
                <li>
                  <a
                    href={youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors group"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span>YouTube</span>
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              )}
              {discord && (
                <li>
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <DiscordIcon className="w-3.5 h-3.5" />
                    <span>{discord}</span>
                  </span>
                </li>
              )}
            </ul>
            <p className="text-[11px] text-muted-foreground/80 leading-relaxed pt-2">
              {availabilityNote}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground font-mono">
          <div>
            &copy; {new Date().getFullYear()} {brandName || fullName}. All
            rights reserved.
          </div>

          <div className="flex items-center gap-1.5 text-center">
            <span>Designed &amp; Developed by</span>
            <a
              href={
                process.env.NEXT_PUBLIC_CREATOR_URL ||
                "https://github.com/simkidd"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground font-semibold hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              {process.env.NEXT_PUBLIC_CREATOR_NAME || "iOnidev"}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
