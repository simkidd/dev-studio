"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { GithubIcon } from "@/components/ui/icons";
import { ArrowLeft, ExternalLink, Share2, Terminal, CheckCircle2 } from "lucide-react";
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

  const heroImageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imageProgress } = useScroll({
    target: heroImageRef,
    offset: ["start end", "end start"],
  });
  const smoothImageProgress = useSpring(imageProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const imageY = useTransform(smoothImageProgress, [0, 1], [-20, 20]);

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

  // Next Project
  const currentIndex = projects.findIndex((p) => p._id === selectedProject._id);
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-mono">
      {/* Top Telemetry Breadcrumb & Share */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4"
      >
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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
          </motion.button>
        </div>
      </motion.div>

      {/* Simulated Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl backdrop-blur-md"
      >
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
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>$ curl -X GET live_endpoint</span>
              </motion.a>
            )}
            {selectedProject.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 text-xs transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>$ git clone repo</span>
              </motion.a>
            )}
          </div>

          {/* Cover Image Frame with Parallax */}
          {selectedProject.thumbnailUrl && (
            <motion.div
              ref={heroImageRef}
              className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-xl"
            >
              <motion.img
                style={{ y: imageY, scale: 1.06 }}
                src={selectedProject.thumbnailUrl}
                alt={selectedProject.title}
                className="w-full h-auto object-cover max-h-[480px] transform-gpu will-change-transform"
              />
            </motion.div>
          )}

          {/* Architectural System Manifest */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-bold">DISCIPLINE:</span>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{selectedProject.category}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-bold">PIPELINE:</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">CI/CD Automated Build</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-bold">RUNTIME:</span>
              <span className="text-xs font-bold text-emerald-500">PRODUCTION_STABLE</span>
            </div>
          </div>

          {/* Detailed Specification Breakdown */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold block">
              $ cat /manifest/technical_specification.md
            </span>
            <div className="prose dark:prose-invert max-w-none font-sans text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-4">
              <p className="whitespace-pre-line leading-relaxed">
                {selectedProject.caseStudy || selectedProject.summary}
              </p>
            </div>
          </div>

          {/* Stack Nodes */}
          <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs text-slate-400 block">$ export ACTIVE_STACK=</span>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Next Project Link */}
          {nextProject && nextProject._id !== selectedProject._id && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <Link
                href={`/${portfolio.slug}/projects/${nextProject.slug || nextProject._id}`}
                className="block p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors group"
              >
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold block">
                  $ next_spec &rarr;
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mt-0.5">
                  {nextProject.title}
                </h4>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
