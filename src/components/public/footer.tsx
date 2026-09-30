"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-card/30 backdrop-blur-sm text-muted-foreground text-xs relative overflow-hidden mt-32">
      {/* Ambient decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10 space-y-12">
        {/* Top CTA Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-border/60">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
                Developer Portfolio Engine
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Ready to launch your bespoke developer portfolio?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Sign up free, choose between 3 visual design templates, and claim your custom public portfolio URL in under 2 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 hover:scale-102 active:scale-98 transition-all"
            >
              <span>Build Your Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-muted/80 hover:bg-muted text-foreground text-xs font-medium border border-border transition-colors"
            >
              <span>Browse 3 Templates</span>
            </Link>
          </div>
        </div>

        {/* Navigation & Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
          {/* Brand Col (4 cols) */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-mono text-xs shadow-md shadow-primary/20">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-foreground text-base tracking-tight">
                DevPortfolio SaaS
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The high-performance portfolio engine for software engineers, backend architects, and creative technologists.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-Tenant Engine v3.0 Live</span>
            </div>
          </div>

          {/* Templates (3 cols) */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
              Templates
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/alex-morgan" className="hover:text-foreground transition-colors">
                  Modern Minimal Craft
                </Link>
              </li>
              <li>
                <Link href="/alex-morgan" className="hover:text-foreground transition-colors">
                  Nova Engine (Systems)
                </Link>
              </li>
              <li>
                <Link href="/elena-rostova" className="hover:text-foreground transition-colors">
                  Apex Studio (Creative)
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-primary hover:underline transition-colors">
                  View Template Gallery &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Architecture (3 cols) */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-muted-foreground">Multi-Tenant Data Isolation</span>
              </li>
              <li>
                <span className="text-muted-foreground">Inbound Leads CRM</span>
              </li>
              <li>
                <span className="text-muted-foreground">Dynamic Slug Routing</span>
              </li>
              <li>
                <span className="text-muted-foreground">Zero-Loss Theme Switcher</span>
              </li>
            </ul>
          </div>

          {/* Account (2 cols) */}
          <div className="col-span-2 md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
              Account
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/admin/login" className="hover:text-foreground transition-colors">
                  Developer Sign In
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-foreground transition-colors">
                  Register Free
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/60 text-[11px] font-mono">
          <div>
            &copy; {currentYear} DevPortfolio SaaS Platform. Built for developers worldwide.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-foreground transition-colors">
              Platform Home
            </Link>
            <Link href="/templates" className="hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="/admin/login" className="hover:text-foreground transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
