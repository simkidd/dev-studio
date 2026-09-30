"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioPageView } from "@/components/public/views/public-portfolio-view";

interface ApexNavbarProps {
  bundle: IPublicPortfolioBundle;
  view?: PortfolioPageView;
}

export function ApexNavbar({ bundle, view = "home" }: ApexNavbarProps) {
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
    <header className="fixed top-4 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/90 dark:bg-black/85 backdrop-blur-2xl border border-stone-200 dark:border-white/10 shadow-2xl flex items-center justify-between gap-4">
        <Link
          href={`/${portfolio.slug}`}
          className="font-extrabold tracking-widest text-xs uppercase text-amber-600 dark:text-amber-400 shrink-0"
        >
          {fullName}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5 text-[11px] font-mono tracking-widest text-stone-600 dark:text-white/60">
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
                  "transition-colors",
                  isActive
                    ? "text-amber-600 dark:text-amber-400 font-bold"
                    : "hover:text-stone-900 dark:hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle size="sm" className="hidden md:inline-flex" />
          <Link
            href={`/${portfolio.slug}/contact`}
            className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black font-bold text-[11px] font-mono uppercase tracking-wider hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors shadow-xs"
          >
            Inquire
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-stone-700 dark:text-white/80 hover:bg-stone-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto w-full max-w-sm mt-2 rounded-3xl bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-2xl border border-stone-200 dark:border-white/10 p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
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
                    "px-4 py-2.5 rounded-2xl text-xs font-mono tracking-wider transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
                      : "text-stone-700 dark:text-white/70 hover:bg-stone-100 dark:hover:bg-white/5",
                  )}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-stone-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-white/60">
              Appearance Mode
            </span>
            <ThemeToggle size="sm" />
          </div>

          <div className="pt-1">
            <Link
              href={`/${portfolio.slug}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-4 rounded-2xl bg-amber-500 text-stone-950 font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Initiate Inquiries</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
