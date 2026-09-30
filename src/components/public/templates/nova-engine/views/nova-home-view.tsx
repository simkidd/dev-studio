"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Code2,
  ShieldCheck,
  Terminal,
  Activity,
  Cpu,
  CornerDownRight,
  ArrowUpRight,
} from "lucide-react";

interface NovaHomeViewProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaHomeView({ bundle }: NovaHomeViewProps) {
  const { portfolio, profile, projects, testimonials } = bundle;

  const firstName = profile?.firstName || "Operator";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const brandName = profile?.brandName?.trim() || fullName;
  const headline = profile?.headline || "Systems Engineering & High-Throughput Cloud Architecture";
  const bio = profile?.bio || "Architecting distributed backends, real-time telemetry pipelines, and fault-tolerant cloud platforms.";
  const location = profile?.location || "0.0.0.0/0 (Remote)";
  const isAvailable = profile?.isAvailableForHire ?? true;
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="space-y-24 py-12 sm:py-16">
      {/* ─────────────────────────────────────────────────────────────
          1. UNBOXED HERO: CYBERNETIC COMMAND STATION
      ───────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 font-mono">
        {/* Terminal Header Prompt */}
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold font-mono block">
          $ init --operator=&quot;{brandName}&quot; --status={isAvailable ? "ready" : "busy"}
        </span>

        {/* Expansive Display Typography */}
        <div className="space-y-6 max-w-5xl">
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-[1.04]">
            {headline}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-3xl">
            {bio}
          </p>
        </div>



        {/* Action Commands */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href={`/${portfolio.slug}/projects`}
            className="px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-102 active:scale-98"
          >
            <span>$ exec ./inspect_builds</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={`/${portfolio.slug}/contact`}
            className="px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-2"
          >
            <span>$ socket.open_comm()</span>
            <CornerDownRight className="w-3.5 h-3.5 text-cyan-500" />
          </Link>

          <Link
            href={`/${portfolio.slug}/about`}
            className="px-5 py-3.5 text-xs text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            <span>$ cat /operator_dossier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
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

      {/* TESTIMONIALS & TELEMETRY SIGNALS */}
      {testimonials && testimonials.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-mono">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>$ verify --signals=incoming --type=peer_audit</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Cryptographic Endorsements
              </h2>
            </div>
            <Link
              href={`/${portfolio.slug}/about`}
              className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>$ cat /all_reviews</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => {
              const projRef = typeof t.projectRef === "object" && t.projectRef ? t.projectRef : null;
              const indexFormatted = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={t._id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-bold">[TELEMETRY_RECORD::{indexFormatted}]</span>
                      </div>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px]">SIG_APPROVED</span>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      <span className="text-cyan-500 mr-2 font-bold">&gt;&gt;</span>
                      &ldquo;{t.quote}&rdquo;
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{t.clientName}</span>
                          {t.linkedInUrl && (
                            <a
                              href={t.linkedInUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-400 hover:text-cyan-400 transition-colors"
                              aria-label="LinkedIn"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                          [{t.clientRole}] {t.company ? `@ [${t.company}]` : ""}
                        </div>
                      </div>

                      {t.companyUrl && (
                        <a
                          href={t.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                        >
                          <span>{t.company}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>

                    {projRef && (
                      <div className="pt-1">
                        <Link
                          href={`/${portfolio.slug}/projects/${projRef.slug || projRef._id}`}
                          className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          <span>$ inspect_ref({projRef.title})</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
