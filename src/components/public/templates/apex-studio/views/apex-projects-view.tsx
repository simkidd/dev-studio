"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";

interface ApexProjectsViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ApexProjectsView({ bundle }: ApexProjectsViewProps) {
  const { portfolio, projects } = bundle;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-16">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
          Folio Index
        </span>
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
          Selected Works &amp; Art
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          Curated index of bespoke web architectures, interactive 3D spatial design, and brand flagships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div key={project._id} className="group space-y-4">
            <Link
              href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
              className="aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-xs relative block group/img"
            >
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900/80 text-stone-400 dark:text-stone-500 gap-3 p-4">
                  <div className="w-12 h-12 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-stone-50 dark:bg-stone-800">
                    APEX
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-semibold opacity-70">
                    {project.category || "Exhibition Build"}
                  </span>
                </div>
              )}
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-stone-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                {project.category || "Featured"}
              </span>
            </Link>
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                <Link href={`/${portfolio.slug}/projects/${project.slug || project._id}`}>
                  {project.title}
                </Link>
              </h3>
              <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed">
                {project.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
