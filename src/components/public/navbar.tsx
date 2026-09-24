"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Code2,
  Briefcase,
  Layers,
  FileText,
  Mail,
  Lock,
} from "lucide-react";
import { useProfile } from "@/hooks";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV_LINKS = [
  { label: "Featured Work", href: "/#projects", icon: Layers },
  { label: "Tech Matrix", href: "/#tech-stack", icon: Code2 },
  { label: "Career Impact", href: "/#experience", icon: Briefcase },
  { label: "Articles", href: "/#articles", icon: FileText },
  { label: "Testimonials", href: "/#testimonials", icon: Sparkles },
  { label: "Contact", href: "/#contact", icon: Mail },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: profile } = useProfile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim()
    : "Alex Morgan";
  const title = profile?.headline || "Senior Staff Full-Stack Architect";
  const isAvailable = profile?.isAvailableForHire ?? true;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-black text-primary-foreground text-sm shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            AM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">
                {fullName}
              </span>
              {isAvailable && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              )}
            </div>
            <span className="text-[11px] text-muted-foreground font-mono block">
              {title}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-card/90 border border-border rounded-full px-4 py-1.5 shadow-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full hover:bg-accent transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/admin/login"
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Admin CMS Portal"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/#contact"
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm flex items-center gap-1.5 group transition-all"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu & Theme Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 pt-3 pb-6 space-y-3 mt-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold text-center shadow-sm"
            >
              Start a Project / Inquiry
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground text-xs text-center flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin CMS Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
