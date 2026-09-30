"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowUpRight } from "lucide-react";

interface ClassicServicesViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ClassicServicesView({ bundle }: ClassicServicesViewProps) {
  const { portfolio } = bundle;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
          Capabilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Consulting &amp; Technical Services
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Available for architecture design sprints, full-stack builds, technical advisory, and staff leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-all shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-lg font-bold text-foreground">Full-Stack Architecture</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            End-to-end web platforms engineered with Next.js, TypeScript, Node.js, and modern distributed databases.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-all shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-lg font-bold text-foreground">Systems &amp; Cloud Infrastructure</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Resilient cloud orchestration, Docker containerization, API microservices, and sub-50ms latency tuning.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-all shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-lg font-bold text-foreground">Advisory &amp; Code Auditing</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Deep code audits, performance benchmarking, scalability assessments, and technical hiring advisory.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-card border border-border text-center space-y-4">
        <h3 className="text-xl font-bold text-foreground">Have a tailored engagement in mind?</h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          Let&apos;s discuss timeline, technical scope, and architectural milestones.
        </p>
        <Link
          href={`/${portfolio.slug}/contact`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20"
        >
          <span>Schedule an Inbound Call</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
