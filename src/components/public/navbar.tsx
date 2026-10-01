"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const PLATFORM_NAV_ITEMS = [
  { label: "Templates", href: "/templates" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Live Demo", href: "/alex-morgan" },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-3 sm:p-5 pointer-events-none">
      {/* Floating Capsule Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 w-full max-w-4xl",
          scrolled
            ? "bg-background/85 dark:bg-background/90 backdrop-blur-md border-border shadow-lg shadow-black/5 dark:shadow-black/25"
            : "bg-background/60 dark:bg-background/70 backdrop-blur-sm border-border/60 shadow-xs",
        )}
      >
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group text-foreground font-semibold tracking-tight text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center font-mono text-xs">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold tracking-tight text-sm sm:text-base text-foreground">
            DevPortfolio
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {PLATFORM_NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors cursor-pointer",
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Theme Toggle, Sign In, Get Started */}
        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" className="hidden md:inline-flex" />

          <Link
            href="/login"
            className="hidden sm:inline-flex text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-muted/50"
          >
            Sign In
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium shadow-xs transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto absolute top-18 inset-x-4 max-w-md mx-auto bg-popover/95 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-xl space-y-3 z-50"
          >
            <div className="flex flex-col space-y-1">
              {PLATFORM_NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border flex items-center justify-between px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground">Theme Mode</span>
                <ThemeToggle size="sm" />
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2 px-4 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-xs font-medium flex items-center justify-center"
                >
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
