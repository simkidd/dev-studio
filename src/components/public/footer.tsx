"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowUpRight } from "lucide-react";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/40 text-muted-foreground text-xs relative mt-24 sm:mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Navigation & Directory Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Col (5 cols) */}
          <div className="col-span-2 md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-mono text-xs shadow-xs">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-foreground text-base tracking-tight group-hover:text-primary transition-colors">
                DevPortfolio
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The portfolio platform built for software engineers, systems architects, and creative technologists.
            </p>
          </div>

          {/* Product (2 cols) */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#features" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-foreground transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/alex-morgan" target="_blank" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform (3 cols) */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-foreground uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-muted-foreground/80">Markdown CMS</span>
              </li>
              <li>
                <span className="text-muted-foreground/80">1-Click Theme Engine</span>
              </li>
              <li>
                <span className="text-muted-foreground/80">Inbound Leads CRM</span>
              </li>
              <li>
                <span className="text-muted-foreground/80">Multi-Tenant Isolation</span>
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
                <Link href="/login" className="hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-foreground transition-colors">
                  Create Account
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-[11px]">
          <div className="text-muted-foreground">
            &copy; {currentYear} DevPortfolio. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-muted-foreground font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/templates" className="hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="/admin" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
