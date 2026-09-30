"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortfolioPageView } from "@/components/public/views/public-portfolio-view";

interface ClassicNavbarProps {
  bundle: IPublicPortfolioBundle;
  view?: PortfolioPageView;
}

export function ClassicNavbar({ bundle, view = "home" }: ClassicNavbarProps) {
  const { portfolio, profile, posts } = bundle;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim() || "Developer";
  const brandName = profile?.brandName?.trim() || fullName;

  const navItems = [
    { label: "Home", href: `/${portfolio.slug}` },
    { label: "Projects", href: `/${portfolio.slug}/projects` },
    { label: "About", href: `/${portfolio.slug}/about` },
    { label: "Services", href: `/${portfolio.slug}/services` },
    ...(posts.length > 0 ? [{ label: "Blog", href: `/${portfolio.slug}/blog` }] : []),
    { label: "Contact", href: `/${portfolio.slug}/contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-none">
      <div
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 shadow-xl w-full max-w-4xl",
          scrolled
            ? "bg-background/85 backdrop-blur-md border-border shadow-black/10 dark:shadow-black/40 scale-100"
            : "bg-background/65 backdrop-blur-sm border-border/70 shadow-xs",
        )}
      >
        {/* Brand / Logo */}
        <Link
          href={`/${portfolio.slug}`}
          className="flex items-center gap-2.5 group text-foreground font-bold tracking-tight text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={brandName}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-border"
            />
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          )}
          <span className="font-bold tracking-tight text-sm sm:text-base text-foreground">
            {brandName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item) => {
            const isItemActive =
              item.href === `/${portfolio.slug}`
                ? view === "home"
                : item.href.endsWith(`/${view}`) ||
                  (view.startsWith("project") && item.label === "Projects") ||
                  (view.startsWith("blog") && item.label === "Blog");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors cursor-pointer z-10",
                  isItemActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isItemActive && (
                  <motion.div
                    layoutId="classic-nav-active-pill"
                    className="absolute inset-0 rounded-full bg-muted border border-border/60 shadow-xs -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" className="hidden md:inline-flex" />

          <Link
            href={`/${portfolio.slug}/contact`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm transition-all"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden pointer-events-auto absolute top-16 inset-x-4 bg-popover/95 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-2xl space-y-3 z-50"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Theme Mode</span>
                <ThemeToggle size="sm" />
              </div>
              <div className="pt-1">
                <Link
                  href={`/${portfolio.slug}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
