"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { IPublicPortfolioBundle, IProject } from "@/interfaces";
import { ChevronRight, ExternalLink, Code2 } from "lucide-react";

interface NovaProjectsViewProps {
  bundle: IPublicPortfolioBundle;
}

function NovaParallaxProjectCard({
  project,
  portfolioSlug,
  index,
}: {
  project: IProject;
  portfolioSlug: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const imgY = useTransform(smoothProgress, [0, 1], [-14, 14]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-cyan-500/40 transition-colors flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-cyan-500/5"
    >
      {/* Project Image Preview */}
      <Link
        href={`/${portfolioSlug}/projects/${project.slug || project._id}`}
        className="aspect-16/10 w-full overflow-hidden bg-slate-950 relative border-b border-slate-200 dark:border-slate-800 block"
      >
        {project.thumbnailUrl ? (
          <motion.img
            style={{ y: imgY, scale: 1.08 }}
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 will-change-transform"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 dark:text-slate-500 font-mono text-xs gap-2">
            <Code2 className="w-6 h-6 opacity-40" />
            <span>[NO_TELEMETRY_PREVIEW]</span>
          </div>
        )}
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md z-10">
          {project.category || "Full-Stack"}
        </span>
      </Link>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2 font-mono">
          <div className="flex items-center justify-between text-[11px] text-cyan-600 dark:text-cyan-400">
            <span>[{project.category || "ENGINEERING"}]</span>
            <span>v1.0</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-mono">
            <Link
              href={`/${portfolioSlug}/projects/${project.slug || project._id}`}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed line-clamp-3">
            {project.summary}
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((t) => (
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
              href={`/${portfolioSlug}/projects/${project.slug || project._id}`}
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
    </motion.div>
  );
}

export function NovaProjectsView({ bundle }: NovaProjectsViewProps) {
  const { portfolio, projects } = bundle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 max-w-3xl"
      >
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">$ ls -la ./projects</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Projects &amp; Systems
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          A directory of production applications, distributed backends, and developer tools.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {projects.map((project, idx) => (
          <NovaParallaxProjectCard
            key={project._id}
            project={project}
            portfolioSlug={portfolio.slug}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
