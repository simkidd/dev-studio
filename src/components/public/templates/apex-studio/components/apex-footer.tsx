"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";

interface ApexFooterProps {
  bundle: IPublicPortfolioBundle;
}

export function ApexFooter({ bundle }: ApexFooterProps) {
  const { profile } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-stone-200 dark:border-white/10 text-xs font-mono text-stone-500 dark:text-white/40 text-center bg-stone-100/50 dark:bg-black/30 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>&copy; {new Date().getFullYear()} {fullName}. All rights reserved.</div>
        <Link href="/" className="hover:text-stone-900 dark:hover:text-white transition-colors">
          Powered by DevPortfolio SaaS
        </Link>
      </div>
    </footer>
  );
}
