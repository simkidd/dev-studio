"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles, Terminal, Flame } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const PLATFORM_NAV_ITEMS = [
  { label: "Templates", href: "/templates" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Live Showcases", href: "/alex-morgan" },
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
      <div
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 shadow-xl w-full max-w-sm sm:max-w-2xl md:max-w-4xl min-w-[320px] sm:min-w-[640px] md:min-w-[700px]",
          scrolled
            ? "bg-background/85 dark:bg-background/90 backdrop-blur-md border-border shadow-black/10 dark:shadow-black/40 scale-100"
            : "bg-background/65 dark:bg-background/70 backdrop-blur-sm border-border/70 shadow-xs",
        )}
      >
        {/* SaaS Platform Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group text-foreground font-bold tracking-tight text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="w-7 h-7 rounded-lg bg-linear-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-mono text-xs shadow-md shadow-primary/20">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold tracking-tight text-sm sm:text-base text-foreground">
              DevPortfolio
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
              SaaS
            </span>
          </div>
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
                  "text-xs font-medium px-3.5 py-1.5 rounded-full transition-all cursor-pointer",
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Theme Toggle, Sign In, Get Started */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle size="sm" className="hidden md:inline-flex" />

          <Link
            href="/admin/login"
            className="hidden sm:inline-flex text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            Sign In
          </Link>

          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm transition-all"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto absolute top-16 inset-x-4 bg-popover/95 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-2xl space-y-3 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
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
            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Theme Mode</span>
              <ThemeToggle size="sm" />
            </div>
            <div className="pt-1">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Developer Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
