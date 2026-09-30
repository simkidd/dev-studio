"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  DiscordIcon,
} from "@/components/ui/icons";
import { Terminal, ArrowUp, Activity, Mail, Phone, MapPin, CornerDownRight } from "lucide-react";

interface NovaFooterProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaFooter({ bundle }: NovaFooterProps) {
  const { portfolio, profile, posts } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const brandName = profile?.brandName?.trim() || fullName;
  const headline = profile?.headline || "Systems Engineering & Cloud Infrastructure";
  const location = profile?.location || "0.0.0.0/0 (Remote)";
  const isAvailable = profile?.isAvailableForHire ?? true;
  const email = profile?.contactEmail || profile?.socialLinks?.email || "dev@nova-engine.net";
  const phone = profile?.contactPhone || profile?.socialLinks?.phone;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/90 backdrop-blur-md mt-24 font-mono text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* Terminal Header Prompt */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-semibold">$ sys.telemetry --daemon=online --node=nova_kernel_v2.4</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span>CONTRACTS::{isAvailable ? "OPEN" : "BUSY"}</span>
            </span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="text-slate-500">PING::14ms</span>
          </div>
        </div>

        {/* Telemetry Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Node Identity (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href={`/${portfolio.slug}`}
              className="inline-flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {profile?.avatarUrl && (
                <img
                  src={profile.avatarUrl}
                  alt={brandName}
                  className="w-6 h-6 rounded-md object-cover border border-cyan-500/40"
                />
              )}
              <span>{brandName}</span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-normal">::[NODE_ROOT]</span>
            </Link>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {headline}
            </p>

            <div className="space-y-1 text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-cyan-500" />
                <span>LOCATION: {location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-cyan-500" />
                <span>PROTOCOL: TLS_v1.3 // AES_256_GCM</span>
              </div>
            </div>
          </div>

          {/* Subroutines Index (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
              // SUBROUTINES
            </span>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  href={`/${portfolio.slug}`}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <CornerDownRight className="w-3 h-3 text-cyan-500/60" />
                  <span>$ cd /overview</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${portfolio.slug}/projects`}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <CornerDownRight className="w-3 h-3 text-cyan-500/60" />
                  <span>$ cd /projects</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${portfolio.slug}/about`}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <CornerDownRight className="w-3 h-3 text-cyan-500/60" />
                  <span>$ cd /about</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${portfolio.slug}/services`}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <CornerDownRight className="w-3 h-3 text-cyan-500/60" />
                  <span>$ cd /services</span>
                </Link>
              </li>
              {posts && posts.length > 0 && (
                <li>
                  <Link
                    href={`/${portfolio.slug}/blog`}
                    className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <CornerDownRight className="w-3 h-3 text-cyan-500/60" />
                    <span>$ cd /logs</span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={`/${portfolio.slug}/contact`}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <CornerDownRight className="w-3 h-3 text-cyan-500/60" />
                  <span>$ cd /comms</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Comms & Relays (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
              // TRANSMISSION_ENDPOINTS
            </span>

            <div className="space-y-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span className="truncate">{email}</span>
              </a>

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>{phone}</span>
                </a>
              )}
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-500 uppercase block pb-2">
                SIGNAL_RELAYS:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {profile?.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {profile?.socialLinks?.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {profile?.socialLinks?.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors"
                    aria-label="Twitter / X"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {profile?.socialLinks?.youtube && (
                  <a
                    href={profile.socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {profile?.socialLinks?.discord && (
                  <a
                    href={profile.socialLinks.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500/40 transition-colors"
                    aria-label="Discord"
                  >
                    <DiscordIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Command Line Terminal Footer Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {fullName} &bull; NOVA-OS_v2.4
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              POWERED_BY::DevPortfolio_SaaS
            </Link>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer text-[11px]"
            >
              <span>$ exec return_top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

