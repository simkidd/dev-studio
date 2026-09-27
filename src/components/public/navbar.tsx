"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sparkles, Lock } from "lucide-react";
import { useProfile } from "@/hooks";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Works", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Articles", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: profile } = useProfile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brandName =
    profile?.brandName?.trim() ||
    (profile?.firstName
      ? `${profile.firstName} ${profile.lastName || ""}`.trim()
      : "Developer");

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
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group text-foreground font-bold tracking-tight text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          {profile?.logoUrl ? (
            <Image
              src={profile.logoUrl}
              alt={brandName}
              width={28}
              height={28}
              className="w-7 h-7 rounded-lg object-contain shrink-0"
            />
          ) : null}
          <span className="font-bold tracking-tight text-sm sm:text-base text-foreground">
            {brandName}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
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

        {/* Actions: Theme Toggle, Admin, CTA */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center">
            <ThemeToggle size="sm" />
          </div>

          <Link
            href="/admin/login"
            className="hidden sm:inline-flex p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
            title="Admin CMS"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs hover:shadow-primary/20 transition-all cursor-pointer"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed top-20 left-4 right-4 max-w-sm mx-auto bg-popover border border-border rounded-2xl p-4 shadow-2xl space-y-3 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-xs font-semibold text-foreground">
              Navigation
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 text-muted-foreground hover:text-foreground rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 font-mono"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
            <ThemeToggle size="sm" />
          </div>
        </div>
      )}
    </header>
  );
}
