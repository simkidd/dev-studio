"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";

interface NovaFooterProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaFooter({ bundle }: NovaFooterProps) {
  const { profile } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 py-6 px-4 font-mono text-xs text-slate-500 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} {fullName} &bull; NOVA-OS_v2.4
        </div>
        <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
          POWERED_BY::DevPortfolio_SaaS
        </Link>
      </div>
    </footer>
  );
}
