"use client";

import React from "react";
import { usePublicPortfolio } from "@/hooks";
import { TemplateDispatcher } from "@/components/public/templates/template-dispatcher";
import { getStaticDemoBundle } from "@/lib/demo-data";
import { Lock, ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";

export type PortfolioPageView =
  | "home"
  | "about"
  | "projects"
  | "project-detail"
  | "services"
  | "blog"
  | "blog-detail"
  | "contact";

interface PublicPortfolioViewProps {
  slug: string;
  view?: PortfolioPageView;
  subSlug?: string;
  templateOverride?: string;
}

export function PublicPortfolioView({
  slug,
  view = "home",
  subSlug,
  templateOverride,
}: PublicPortfolioViewProps) {
  const { data: serverBundle, isLoading, isError, error } = usePublicPortfolio(slug, templateOverride);

  // Hybrid fallback: Check server data first, then static fallback
  const bundle = serverBundle || getStaticDemoBundle(slug, templateOverride);

  if (isLoading && !bundle) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
            <div className="relative w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
              <Terminal className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground font-mono">
              Resolving &apos;{slug}&apos;...
            </h2>
            <p className="text-xs text-muted-foreground">
              Compiling developer portfolio modules &amp; telemetry
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!bundle) {
    const errorMsg =
      (error as any)?.response?.data?.message ||
      "This developer portfolio could not be found or is currently private.";

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md w-full p-8 rounded-3xl bg-card border border-border space-y-6 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Portfolio Unavailable
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {errorMsg}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>DevPortfolio SaaS</span>
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              Owner Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <TemplateDispatcher bundle={bundle} view={view} subSlug={subSlug} />;
}
