"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Terminal, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioPageView } from "@/components/public/views/public-portfolio-view";

interface NovaNavbarProps {
  bundle: IPublicPortfolioBundle;
  view?: PortfolioPageView;
}

export function NovaNavbar({ bundle, view = "home" }: NovaNavbarProps) {
  const { portfolio, profile, posts } = bundle;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const navLinks = [
    { label: "Home", href: `/${portfolio.slug}` },
    { label: "Projects", href: `/${portfolio.slug}/projects` },
    { label: "About", href: `/${portfolio.slug}/about` },
    { label: "Services", href: `/${portfolio.slug}/services` },
    ...(posts.length > 0 ? [{ label: "Blog", href: `/${portfolio.slug}/blog` }] : []),
    { label: "Contact", href: `/${portfolio.slug}/contact` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-cyan-500/20 bg-white/90 dark:bg-[#07090e]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between font-mono text-xs">
        {/* Brand / Daemon ID */}
        <Link href={`/${portfolio.slug}`} className="flex items-center gap-2.5 group shrink-0">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500/20 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
          </motion.div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-600 dark:text-cyan-400 tracking-wider">NOVA-OS</span>
            <span className="text-slate-400 dark:text-slate-500">::</span>
            <span className="text-slate-800 dark:text-slate-300 font-semibold truncate max-w-[140px] sm:max-w-none">
              {fullName}
            </span>
          </div>
        </Link>

        {/* Desktop Telemetry Nav */}
        <nav className="hidden md:flex items-center gap-2 text-[11px] font-mono tracking-wider relative">
          {navLinks.map((link) => {
            const isActive =
              link.href === `/${portfolio.slug}`
                ? view === "home"
                : link.href.endsWith(`/${view}`) ||
                  (view.startsWith("project") && link.label === "Projects") ||
                  (view.startsWith("blog") && link.label === "Blog");

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 rounded-lg transition-colors",
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400 font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200",
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nova-nav-active-pill"
                    className="absolute inset-0 rounded-lg bg-cyan-500/10 border border-cyan-500/30 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span>&gt; {link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status Badge, Theme Switcher, & Mobile Trigger */}
        <div className="flex items-center gap-2.5">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>DAEMON_RUNNING</span>
          </span>
          <ThemeToggle size="sm" className="hidden md:inline-flex" />

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg border border-slate-200 dark:border-cyan-500/30 text-slate-700 dark:text-cyan-400 hover:bg-slate-100 dark:hover:bg-cyan-500/10 transition-colors cursor-pointer"
            aria-label="Toggle system terminal menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Terminal Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 dark:border-cyan-500/30 bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-2xl px-4 py-4 space-y-3 font-mono text-xs"
          >
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono pb-1 border-b border-slate-100 dark:border-slate-800">
              <span>$ sys.routing --active-tree</span>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === `/${portfolio.slug}`
                    ? view === "home"
                    : link.href.endsWith(`/${view}`) ||
                      (view.startsWith("project") && link.label === "Projects") ||
                      (view.startsWith("blog") && link.label === "Blog");

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between",
                      isActive
                        ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-cyan-500/60">&gt;</span>
                      <span>{link.label}</span>
                    </span>
                    {isActive ? (
                      <span className="text-[10px] text-cyan-600 dark:text-cyan-400">[ACTIVE]</span>
                    ) : (
                      <ArrowRight className="w-3 h-3 opacity-40" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-200 dark:border-cyan-500/20 flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400 text-[11px]">$ sys.theme_mode</span>
              <ThemeToggle size="sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
