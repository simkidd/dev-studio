"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowRight, ChevronRight, ExternalLink, Code2 } from "lucide-react";

interface NovaHomeViewProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaHomeView({ bundle }: NovaHomeViewProps) {
  const { portfolio, profile, projects } = bundle;

  const headline = profile?.headline || "Full-Stack Engineer & Systems Architect";
  const bio = profile?.bio || "I build high-throughput applications and modern digital experiences.";
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="space-y-16 py-12">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-cyan-500/20 shadow-sm relative overflow-hidden space-y-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold">
              <span>$ sys.inspect --architect</span>
            </div>
            <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-slate-900 dark:text-white font-mono">
              {headline}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              {bio}
            </p>
          </div>

          {/* Telemetry Stat Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Repositories</span>
              <p className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">{projects.length}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Uptime SLA</span>
              <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">99.99%</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Architecture</span>
              <p className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">Distributed</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400">Latency Target</span>
              <p className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 mt-1">&lt;50ms</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={`/${portfolio.slug}/projects`}
              className="px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-mono font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Inspect Repositories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${portfolio.slug}/contact`}
              className="px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono text-xs border border-slate-300 dark:border-slate-700 transition-colors"
            >
              Transmit Payload
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED REPOSITORIES / SHOWCASE */}
      {featuredProjects.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-mono">
          <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">$ ls -la ./featured</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                Featured Repositories
              </h2>
            </div>
            <Link
              href={`/${portfolio.slug}/projects`}
              className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View all ({projects.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {featuredProjects.map((project) => (
              <div
                key={project._id}
                className="group rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xs hover:shadow-xl"
              >
                <Link
                  href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
                  className="aspect-16/10 w-full overflow-hidden bg-slate-950 relative border-b border-slate-200 dark:border-slate-800 block"
                >
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 dark:text-slate-500 font-mono text-xs gap-2">
                      <Code2 className="w-6 h-6 opacity-40" />
                      <span>[NO_TELEMETRY_PREVIEW]</span>
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                    {project.category || "Full-Stack"}
                  </span>
                </Link>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-cyan-600 dark:text-cyan-400">
                      <span>[{project.category || "ENGINEERING"}]</span>
                      <span>v1.0</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono">
                      <Link
                        href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
                        className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-[10px] border border-slate-200 dark:border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
                        className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold text-xs"
                      >
                        <span>inspect()</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
