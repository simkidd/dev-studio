"use client";

import React from "react";
import Link from "next/link";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import { Mail, ArrowUpRight } from "lucide-react";
import { useProfile } from "@/hooks";

export function PublicFooter() {
  const { data: profile } = useProfile();

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim()
    : "Alex Morgan";
  const email = profile?.socialLinks?.email || "alex@morgan.engineering";
  const github = profile?.socialLinks?.github || "https://github.com";
  const linkedin = profile?.socialLinks?.linkedin || "https://linkedin.com";
  const twitter = profile?.socialLinks?.twitter || "https://x.com";

  return (
    <footer className="bg-card border-t border-border text-muted-foreground text-xs mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black text-primary-foreground text-xs shadow-sm">
                AM
              </div>
              <span className="font-bold text-foreground text-base tracking-tight">
                {fullName}
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-md">
              Staff Full-Stack & Distributed Systems Architect specializing in high-throughput
              web platforms, Next.js / React microfrontends, multi-tenant databases, and resilient cloud infrastructure.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                title="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                title="Email Inquiry"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Architecture & Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#projects" className="hover:text-foreground transition-colors">
                  Featured Case Studies
                </Link>
              </li>
              <li>
                <Link href="/#tech-stack" className="hover:text-foreground transition-colors">
                  Technical Matrix
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-foreground transition-colors">
                  Career Timeline & Impact
                </Link>
              </li>
              <li>
                <Link href="/#articles" className="hover:text-foreground transition-colors">
                  Engineering Insights
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-foreground transition-colors">
                  Client & Peer Endorsements
                </Link>
              </li>
            </ul>
          </div>

          {/* System Status & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              System & CMS Portal
            </h4>
            <div className="p-3 rounded-lg bg-background border border-border space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-muted-foreground">API Status</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Operational
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-muted-foreground">Response SLA</span>
                <span className="text-primary font-medium">&lt; 12 Hours</span>
              </div>
            </div>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
            >
              <span>Access Admin Dashboard</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>
            &copy; {new Date().getFullYear()} {fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with Next.js 15, TypeScript, Tailwind CSS & MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
