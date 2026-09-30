"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";

interface ApexHomeViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ApexHomeView({ bundle }: ApexHomeViewProps) {
  const { portfolio, profile, projects } = bundle;

  const headline = profile?.headline || "Creative Technologist & Interface Architect";
  const bio = profile?.bio || "Crafting tactile digital experiences, bespoke interactive systems, and spatial interfaces.";
  const location = profile?.location || "Worldwide";

  return (
    <div className="space-y-28 pb-20">
      {/* HERO */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pt-16 sm:pt-24 space-y-10">
        <div className="space-y-6 max-w-4xl">
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
            Creative Technologist &bull; {location}
          </span>
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-stone-900 dark:text-white">
            {headline}
          </h1>
          <p className="text-base sm:text-xl text-stone-600 dark:text-white/60 leading-relaxed max-w-2xl font-light">
            {bio}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href={`/${portfolio.slug}/projects`}
            className="px-8 py-4 rounded-full bg-amber-500 dark:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 dark:hover:bg-amber-300 transition-colors shadow-md shadow-amber-500/20"
          >
            View Selected Works
          </Link>
          <Link
            href={`/${portfolio.slug}/about`}
            className="px-8 py-4 rounded-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/15 text-stone-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-stone-100 dark:hover:bg-white/10 transition-colors shadow-xs"
          >
            Creative Practice
          </Link>
        </div>
      </section>

      {/* FEATURED WORKS */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-stone-200 dark:border-white/10 pt-20">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900 dark:text-white">
              Case Studies
            </h2>
          </div>
          <Link
            href={`/${portfolio.slug}/projects`}
            className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase hover:underline font-semibold"
          >
            All Works &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project) => (
            <div key={project._id} className="group space-y-4">
              <Link
                href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
                className="aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 dark:bg-white/5 relative border border-stone-200 dark:border-white/10 shadow-xs block group/img"
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
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    <Link href={`/${portfolio.slug}/projects/${project.slug || project._id}`}>
                      {project.title}
                    </Link>
                  </h3>
                </div>
                <Link
                  href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
                  className="text-xs font-mono text-stone-500 dark:text-white/50 hover:text-stone-900 dark:hover:text-white"
                >
                  Case Study &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
