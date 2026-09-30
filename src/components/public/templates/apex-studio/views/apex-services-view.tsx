"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";

interface ApexServicesViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ApexServicesView({ bundle }: ApexServicesViewProps) {
  const { portfolio } = bundle;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
          Studio Capabilities
        </span>
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
          Bespoke Offerings
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          Comprehensive creative direction, bespoke interactive engineering, and high-performance frontend systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-4 shadow-xs">
          <span className="text-2xl font-mono text-amber-600 dark:text-amber-400">01</span>
          <h3 className="text-lg font-bold uppercase text-stone-900 dark:text-white">Creative Direction</h3>
          <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed">
            High-impact digital aesthetics, bespoke typography, and design sprints.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-4 shadow-xs">
          <span className="text-2xl font-mono text-amber-600 dark:text-amber-400">02</span>
          <h3 className="text-lg font-bold uppercase text-stone-900 dark:text-white">Interactive 3D / WebGL</h3>
          <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed">
            Three.js, GLSL custom shaders, and visceral interactive spatial experiences.
          </p>
        </div>
        <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-4 shadow-xs">
          <span className="text-2xl font-mono text-amber-600 dark:text-amber-400">03</span>
          <h3 className="text-lg font-bold uppercase text-stone-900 dark:text-white">Frontend Architecture</h3>
          <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed">
            Fluid Next.js/React applications with 60fps kinetic motion pipelines.
          </p>
        </div>
      </div>

      <div className="p-10 rounded-3xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center space-y-4">
        <h3 className="text-2xl font-bold uppercase text-stone-900 dark:text-white">Initiate a Commission</h3>
        <p className="text-sm text-stone-600 dark:text-white/70 max-w-md mx-auto">
          Currently taking select engagements for Q3/Q4. Let&apos;s build something memorable.
        </p>
        <Link
          href={`/${portfolio.slug}/contact`}
          className="inline-block px-8 py-3.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors shadow-lg"
        >
          Commission Studio
        </Link>
      </div>
    </div>
  );
}
