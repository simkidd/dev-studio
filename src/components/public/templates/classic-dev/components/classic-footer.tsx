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
import { MapPin, Mail, Phone, ArrowUp } from "lucide-react";

interface ClassicFooterProps {
  bundle: IPublicPortfolioBundle;
}

export function ClassicFooter({ bundle }: ClassicFooterProps) {
  const { portfolio, profile, posts } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const brandName = profile?.brandName?.trim() || fullName;
  const headline = profile?.headline || "Full-Stack Engineer & Systems Architect";
  const location = profile?.location || "Remote";
  const isAvailable = profile?.isAvailableForHire ?? true;
  const email = profile?.contactEmail || profile?.socialLinks?.email || "contact@portfolio.dev";
  const phone = profile?.contactPhone || profile?.socialLinks?.phone;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-card/60 backdrop-blur-md border-t border-border mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Availability */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              href={`/${portfolio.slug}`}
              className="inline-flex items-center gap-2 text-foreground font-bold tracking-tight text-lg"
            >
              {profile?.avatarUrl && (
                <img
                  src={profile.avatarUrl}
                  alt={brandName}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-border"
                />
              )}
              <span>{brandName}</span>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              {headline}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{location}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isAvailable ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                  }`}
                />
                <span>{isAvailable ? "Available for hire" : "Busy on contracts"}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Directory
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href={`/${portfolio.slug}`} className="hover:text-primary transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href={`/${portfolio.slug}/projects`} className="hover:text-primary transition-colors">
                  Case Studies &amp; Projects
                </Link>
              </li>
              <li>
                <Link href={`/${portfolio.slug}/about`} className="hover:text-primary transition-colors">
                  Biography &amp; Career
                </Link>
              </li>
              <li>
                <Link href={`/${portfolio.slug}/services`} className="hover:text-primary transition-colors">
                  Consulting &amp; Services
                </Link>
              </li>
              {posts.length > 0 && (
                <li>
                  <Link href={`/${portfolio.slug}/blog`} className="hover:text-primary transition-colors">
                    Articles &amp; Insights
                  </Link>
                </li>
              )}
              <li>
                <Link href={`/${portfolio.slug}/contact`} className="hover:text-primary transition-colors">
                  Direct Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Direct Contact
            </h4>
            <div className="space-y-2">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">{email}</span>
              </a>

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{phone}</span>
                </a>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              {profile?.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
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
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
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
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
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
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
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
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label="Discord"
                >
                  <DiscordIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} {fullName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground transition-colors text-[11px]">
              Powered by DevPortfolio SaaS
            </Link>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[11px] hover:text-foreground transition-colors cursor-pointer"
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
