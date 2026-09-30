"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { GithubIcon } from "@/components/ui/icons";
import { ArrowLeft, ArrowUpRight, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface ApexProjectDetailViewProps {
  bundle: IPublicPortfolioBundle;
  subSlug?: string;
}

export function ApexProjectDetailView({
  bundle,
  subSlug,
}: ApexProjectDetailViewProps) {
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
  const imageY = useTransform(smoothImageProgress, [0, 1], [-25, 25]);
  const imageScale = useTransform(smoothImageProgress, [0, 1], [1.08, 1.02]);

  if (!selectedProject) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center font-mono space-y-4">
        <h2 className="text-2xl font-bold uppercase">Folio Item Not Found</h2>
        <Link href={`/${portfolio.slug}/projects`} className="text-amber-600 dark:text-amber-400 hover:underline text-xs">
          &larr; Return to Folio
        </Link>
      </div>
    );
  }

  // Next Project calculation for continuous reading
  const currentIndex = projects.findIndex((p) => p._id === selectedProject._id);
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 space-y-16">
      {/* Top Navigation & Share */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-white/10 pb-6"
      >
        <Link
          href={`/${portfolio.slug}/projects`}
          className="text-xs font-mono text-stone-500 dark:text-white/50 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-2 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Folio Archive</span>
          <span className="text-stone-300 dark:text-white/20">/</span>
          <span className="text-stone-900 dark:text-white">{selectedProject.title}</span>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Case study link copied!");
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-xs font-mono text-stone-700 dark:text-white/70 hover:text-amber-600 dark:hover:text-amber-400 border border-stone-200 dark:border-white/10 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Story</span>
        </motion.button>
      </motion.div>

      {/* Editorial Hero Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest block font-semibold">
          [ CASE STUDY &bull; {selectedProject.category} ]
        </span>
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-stone-900 dark:text-white">
          {selectedProject.title}
        </h1>
        <p className="text-lg sm:text-2xl text-stone-600 dark:text-white/70 font-light max-w-4xl leading-relaxed">
          {selectedProject.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          {selectedProject.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors shadow-2xl"
            >
              <span>Launch Experience</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          )}
          {selectedProject.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-100 dark:bg-white/5 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider border border-stone-200 dark:border-white/10 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Repository</span>
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Full-Bleed Media Stage with Parallax */}
      {selectedProject.thumbnailUrl && (
        <motion.div
          ref={heroImageRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-white/5 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10 hidden dark:block" />
          <motion.img
            style={{ y: imageY, scale: imageScale }}
            src={selectedProject.thumbnailUrl}
            alt={selectedProject.title}
            className="w-full h-auto object-cover max-h-[650px] transform-gpu will-change-transform"
          />
        </motion.div>
      )}

      {/* Luxury Editorial Metadata Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 font-mono text-xs shadow-xs"
      >
        <div className="space-y-1">
          <span className="text-stone-400 dark:text-white/40 uppercase tracking-widest text-[10px] block">Client / Scope</span>
          <span className="text-stone-900 dark:text-white font-bold text-sm block">Studio Commission</span>
        </div>
        <div className="space-y-1">
          <span className="text-stone-400 dark:text-white/40 uppercase tracking-widest text-[10px] block">Discipline</span>
          <span className="text-amber-600 dark:text-amber-400 font-bold text-sm block">{selectedProject.category}</span>
        </div>
        <div className="space-y-1">
          <span className="text-stone-400 dark:text-white/40 uppercase tracking-widest text-[10px] block">Year</span>
          <span className="text-stone-900 dark:text-white font-bold text-sm block">2026</span>
        </div>
        <div className="space-y-1">
          <span className="text-stone-400 dark:text-white/40 uppercase tracking-widest text-[10px] block">Stack</span>
          <span className="text-stone-900 dark:text-white font-bold text-sm block truncate">
            {selectedProject.technologies.slice(0, 3).join(", ")}
          </span>
        </div>
      </motion.div>

      {/* Narrative Story Chapters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 space-y-12"
        >
          {/* Main Case Content */}
          <div className="prose dark:prose-invert max-w-none font-serif text-base sm:text-lg leading-relaxed text-stone-800 dark:text-stone-200 space-y-6">
            <p className="whitespace-pre-line leading-relaxed font-sans font-light text-stone-700 dark:text-stone-300">
              {selectedProject.caseStudy || selectedProject.summary}
            </p>
          </div>
        </motion.div>

        {/* Right Rail: Technologies & Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 space-y-8"
        >
          {/* Tech Stack Pills */}
          <div className="p-6 rounded-3xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-white/50 block font-bold">
              Applied Architecture
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-white/10 text-xs font-mono font-semibold text-stone-900 dark:text-white shadow-xs cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Next Case Study Preview */}
          {nextProject && nextProject._id !== selectedProject._id && (
            <Link
              href={`/${portfolio.slug}/projects/${nextProject.slug || nextProject._id}`}
              className="block p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/20 hover:border-amber-500/40 transition-all group"
            >
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest block font-bold">
                Next Folio Entry &rarr;
              </span>
              <h4 className="text-base font-black uppercase text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mt-1">
                {nextProject.title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mt-1 font-light">
                {nextProject.summary}
              </p>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
