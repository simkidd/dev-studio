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
import { Mail, ArrowUpRight, Heart } from "lucide-react";
import { useProfile } from "@/hooks";

export function PublicFooter() {
  const { data: profile } = useProfile();

  const firstName = profile?.firstName || "Alex";
  const lastName = profile?.lastName || "Morgan";
  const fullName = `${firstName} ${lastName}`.trim();
  const headline = profile?.headline || "Senior Full-Stack Architect & Systems Engineer";
  const email = profile?.socialLinks?.email || "alex@morgan.dev";
  const github = profile?.socialLinks?.github;
  const linkedin = profile?.socialLinks?.linkedin;
  const twitter = profile?.socialLinks?.twitter;
  const discord = profile?.socialLinks?.discord;
  const youtube = profile?.socialLinks?.youtube;
  const isAvailable = profile?.isAvailableForHire ?? true;

  return (
    <footer className="border-t border-border/70 bg-background/50 backdrop-blur-sm text-muted-foreground text-xs relative overflow-hidden mt-32">
      {/* Subtle bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10 space-y-12">
        {/* Top Big Statement Row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-border/60">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-primary">
              <ChromeSparkleIcon className="w-4 h-4" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
                Scaling Digital Products
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Ready to architect your next high-impact breakthrough?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Available for select staff advisory roles, cloud architecture contracts, and full-stack engineering.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 hover:scale-102 active:scale-98 transition-all cursor-pointer"
            >
              <span>Start A Project</span>
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

        {/* Middle Navigation & Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Identity & Status */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-bold text-foreground text-sm tracking-tight">
                {fullName}
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {headline}
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isAvailable ? "Available for hire" : "Busy on active builds"}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-semibold">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home (Overview)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About & Career Story
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">
                  Selected Works & Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Articles & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Presence */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-semibold">
              Connect
            </h4>
            <ul className="space-y-2 text-xs">
              {github && (
                <li>
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </li>
              )}
              {linkedin && (
                <li>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </li>
              )}
              {twitter && (
                <li>
                  <a
                    href={twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                    <span>X / Twitter</span>
                  </a>
                </li>
              )}
              {youtube && (
                <li>
                  <a
                    href={youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5" />
                    <span>YouTube</span>
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
          </div>

          {/* System & Architecture */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-foreground font-semibold">
              Platform & CMS
            </h4>
            <div className="p-3 rounded-xl bg-card border border-border/70 space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center justify-between">
                <span>Stack</span>
                <span className="text-foreground">Next.js 15 • Express</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="text-foreground">MongoDB Atlas</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Style</span>
                <span className="text-primary font-semibold">Dark / Light Mode</span>
              </div>
            </div>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline font-mono"
            >
              <span>Admin CMS Portal ↗</span>
            </Link>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground font-mono">
          <div>
            &copy; {new Date().getFullYear()} {fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with precision & purpose</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
