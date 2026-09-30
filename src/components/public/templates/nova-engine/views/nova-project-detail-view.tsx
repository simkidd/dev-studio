"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { GithubIcon } from "@/components/ui/icons";
import { ArrowLeft, ExternalLink, Share2, Terminal } from "lucide-react";
import { toast } from "sonner";

interface NovaProjectDetailViewProps {
  bundle: IPublicPortfolioBundle;
  subSlug?: string;
}

export function NovaProjectDetailView({
  bundle,
  subSlug,
}: NovaProjectDetailViewProps) {
  const { portfolio, projects } = bundle;

  const selectedProject = subSlug
    ? projects.find((p) => p.slug === subSlug || p._id === subSlug) || projects[0]
    : projects[0];

  if (!selectedProject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-mono space-y-4">
        <h2 className="text-xl font-bold text-white">$ error 404: SPEC_NOT_FOUND</h2>
        <Link href={`/${portfolio.slug}/projects`} className="text-cyan-400 hover:underline text-xs">
          &larr; $ cd ../projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-mono">
      {/* Top Telemetry Breadcrumb & Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link
          href={`/${portfolio.slug}/projects`}
          className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>$ cd ../projects</span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-cyan-700 dark:text-cyan-300">{selectedProject.slug || selectedProject._id}</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            STATUS: 200_OK
          </span>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Telemetry specification URI copied!");
              }
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>share()</span>
          </button>
        </div>
      </div>

      {/* Simulated Terminal Window */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
        {/* Window Header */}
        <div className="px-4 py-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-slate-500 ml-2 font-mono">
              spec_daemon://{selectedProject.slug || "module"}.manifest
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">ARCH: x86_64_LINUX</div>
        </div>

        {/* Main Window Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Header Meta */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 font-bold">
                [{selectedProject.category}]
              </span>
              <span className="text-slate-500">REV_ID: {selectedProject._id.slice(0, 8)}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              {selectedProject.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              {selectedProject.summary}
            </p>
          </div>

          {/* Command Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {selectedProject.liveUrl && (
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>$ curl -X GET live_endpoint</span>
              </a>
            )}
            {selectedProject.githubUrl && (
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-xs transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>$ git clone repo</span>
              </a>
            )}
          </div>

          {/* Cover Image Frame */}
          {selectedProject.thumbnailUrl && (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
              <img
                src={selectedProject.thumbnailUrl}
                alt={selectedProject.title}
                className="w-full h-auto object-cover max-h-[480px]"
              />
            </div>
          )}

          {/* Benchmark Metrics Grid */}
          {selectedProject.metrics && selectedProject.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {selectedProject.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 space-y-1"
                >
                  <span className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">{m.value}</span>
                  <p className="text-[11px] text-slate-500 font-sans">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Systems Architecture & Spec Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-200 dark:border-slate-800">
            {/* Left Column: Narrative Spec */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>Technical Architecture</span>
                </h3>
                <div className="prose dark:prose-invert max-w-none font-sans text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-4">
                  <p className="whitespace-pre-line">
                    {selectedProject.caseStudy || selectedProject.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold block">$ cat /etc/sla_guarantee</span>
                <p className="text-slate-600 dark:text-slate-400 font-sans text-xs">
                  Fault-tolerant clustering configured with automatic failover, health probing, and distributed load balancing.
                </p>
              </div>

              {/* Interface Gallery */}
              {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 && (
                <div className="space-y-3 pt-2 font-mono">
                  <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold block">
                    $ display --all /telemetry/screen_dumps/*
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 aspect-16/10 hover:border-cyan-500/40 transition-colors shadow-xs"
                      >
                        <img
                          src={img.url}
                          alt={`${selectedProject.title} dump ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Runtime Matrix */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="text-xs uppercase text-slate-500 dark:text-slate-400 tracking-wider font-bold">
                  Runtime &amp; Tech Matrix
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px] block mb-1">COMPONENTS</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-300 text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-900 flex justify-between">
                    <span className="text-slate-500">CATEGORY</span>
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">{selectedProject.category}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-900 flex justify-between">
                    <span className="text-slate-500">HEALTH CHECK</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">PASSED [0 ERRORS]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next System Selector */}
      {projects.filter((p) => p._id !== selectedProject._id).length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">$ ls -l /specs/other_nodes</span>
            <Link href={`/${portfolio.slug}/projects`} className="text-cyan-600 dark:text-cyan-400 hover:underline">
              view_all_nodes() &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects
              .filter((p) => p._id !== selectedProject._id)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p._id}
                  href={`/${portfolio.slug}/projects/${p.slug || p._id}`}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-colors block space-y-1 shadow-xs"
                >
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">[{p.category}]</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans line-clamp-1">{p.summary}</p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
