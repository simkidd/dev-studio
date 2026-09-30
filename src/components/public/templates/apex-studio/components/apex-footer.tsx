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
import { ArrowUpRight, ArrowUp, MapPin, Mail, Phone } from "lucide-react";

interface ApexFooterProps {
  bundle: IPublicPortfolioBundle;
}

export function ApexFooter({ bundle }: ApexFooterProps) {
  const { portfolio, profile, posts } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const brandName = profile?.brandName?.trim() || fullName;
  const headline = profile?.headline || "Creative Technologist & High-Performance Web Architect";
  const location = profile?.location || "Global Remote";
  const isAvailable = profile?.isAvailableForHire ?? true;
  const email = profile?.contactEmail || profile?.socialLinks?.email || "inquiries@apexstudio.dev";
  const phone = profile?.contactPhone || profile?.socialLinks?.phone;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-stone-200 dark:border-white/10 bg-stone-100/60 dark:bg-stone-950/80 backdrop-blur-md mt-24 text-stone-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20 space-y-16">
        {/* Top Callout Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pb-12 border-b border-stone-200 dark:border-white/10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold tracking-widest">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{isAvailable ? "Available for selective commissions" : "Selective engagements"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              Let&apos;s build something exceptional.
            </h2>
            <p className="text-xs sm:text-sm font-light text-stone-600 dark:text-white/60 max-w-lg leading-relaxed">
              {headline}
            </p>
          </div>

          <Link
            href={`/${portfolio.slug}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-stone-900 dark:bg-white hover:bg-amber-600 dark:hover:bg-amber-400 text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-amber-500/20 group shrink-0"
          >
            <span>Start Conversation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Directory & Coordinates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Monogram & Meta (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href={`/${portfolio.slug}`}
              className="inline-flex items-center gap-3 text-xl font-black uppercase tracking-tight hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              {profile?.avatarUrl && (
                <img
                  src={profile.avatarUrl}
                  alt={brandName}
                  className="w-8 h-8 rounded-full object-cover border border-stone-300 dark:border-white/20"
                />
              )}
              <span>{brandName}</span>
            </Link>

            <p className="text-xs font-mono text-stone-500 dark:text-white/50 leading-relaxed max-w-sm">
              Crafting cutting-edge digital experiences with uncompromising focus on design precision, aesthetics, and technical velocity.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-600 dark:text-white/60 pt-2">
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{location}</span>
            </div>
          </div>

          {/* Folio Index (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold tracking-widest">
              Folio Index
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase text-stone-600 dark:text-white/70">
              <li>
                <Link href={`/${portfolio.slug}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  01 // Overview
                </Link>
              </li>
              <li>
                <Link href={`/${portfolio.slug}/projects`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  02 // Selected Works
                </Link>
              </li>
              <li>
                <Link href={`/${portfolio.slug}/about`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  03 // Biography
                </Link>
              </li>
              <li>
                <Link href={`/${portfolio.slug}/services`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  04 // Capabilities
                </Link>
              </li>
              {posts && posts.length > 0 && (
                <li>
                  <Link href={`/${portfolio.slug}/blog`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    05 // Journal
                  </Link>
                </li>
              )}
              <li>
                <Link href={`/${portfolio.slug}/contact`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  06 // Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Channels & Networks (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold tracking-widest">
              Direct Channels
            </h4>

            <div className="space-y-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-xs font-mono text-stone-700 dark:text-white/80 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="truncate">{email}</span>
              </a>

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2.5 text-xs font-mono text-stone-700 dark:text-white/80 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{phone}</span>
                </a>
              )}
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-stone-500 dark:text-white/40 uppercase block pb-2">
                Network Relays
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {profile?.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-stone-200 dark:bg-white/5 text-stone-700 dark:text-white/80 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-300 dark:hover:bg-white/10 transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {profile?.socialLinks?.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-stone-200 dark:bg-white/5 text-stone-700 dark:text-white/80 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-300 dark:hover:bg-white/10 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {profile?.socialLinks?.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-stone-200 dark:bg-white/5 text-stone-700 dark:text-white/80 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-300 dark:hover:bg-white/10 transition-colors"
                    aria-label="Twitter / X"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                )}
                {profile?.socialLinks?.youtube && (
                  <a
                    href={profile.socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-stone-200 dark:bg-white/5 text-stone-700 dark:text-white/80 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-300 dark:hover:bg-white/10 transition-colors"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                )}
                {profile?.socialLinks?.discord && (
                  <a
                    href={profile.socialLinks.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-stone-200 dark:bg-white/5 text-stone-700 dark:text-white/80 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-stone-300 dark:hover:bg-white/10 transition-colors"
                    aria-label="Discord"
                  >
                    <DiscordIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500 dark:text-white/40">
          <div>
            &copy; {new Date().getFullYear()} {fullName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-[11px]">
              Powered by DevPortfolio SaaS
            </Link>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

