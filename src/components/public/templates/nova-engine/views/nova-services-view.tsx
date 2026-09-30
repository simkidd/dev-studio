"use client";

import React from "react";
import { IPublicPortfolioBundle } from "@/interfaces";
import { Cpu, Activity, Code2 } from "lucide-react";

interface NovaServicesViewProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaServicesView({ bundle }: NovaServicesViewProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-mono">
      <div className="space-y-2 max-w-3xl">
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">$ systemctl list-services</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Active Capabilities
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Engineering specializations in distributed systems, telemetry pipelines, and resilient full-stack platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <Cpu className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">01. Distributed Systems</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            High-throughput microservices, event pipelines, and distributed databases.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">02. Cloud Telemetry</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Kubernetes orchestration, automated CI/CD, and real-time observability.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">03. Full-Stack Platforms</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Resilient Next.js/TypeScript frontend architectures and robust backend APIs.
          </p>
        </div>
      </div>
    </div>
  );
}
