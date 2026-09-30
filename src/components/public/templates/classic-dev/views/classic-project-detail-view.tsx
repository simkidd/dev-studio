"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { ChromeSparkleIcon, GithubIcon } from "@/components/ui/icons";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Share2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface ClassicProjectDetailViewProps {
  bundle: IPublicPortfolioBundle;
  subSlug?: string;
}

export function ClassicProjectDetailView({
  bundle,
  subSlug,
}: ClassicProjectDetailViewProps) {
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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <Link href={`/${portfolio.slug}/projects`} className="text-primary hover:underline text-sm">
          &larr; Return to All Projects
        </Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p._id === selectedProject._id);
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Top Breadcrumb & Share */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4"
      >
        <Link
          href={`/${portfolio.slug}/projects`}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Projects</span>
          <span className="text-border">/</span>
          <span className="text-foreground">{selectedProject.title}</span>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Case study link copied to clipboard!");
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground border border-border transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Case Study</span>
        </motion.button>
      </motion.div>

      {/* Header Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
            {selectedProject.category}
          </span>
          {selectedProject.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured Architecture
            </span>
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground flex items-center gap-3">
            <span>{selectedProject.title}</span>
            <ChromeSparkleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-pulse" />
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {selectedProject.summary}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {selectedProject.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/25 hover:opacity-95 transition-opacity"
            >
              <span>Launch Live Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          )}
          {selectedProject.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-semibold border border-border transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Featured Image with Parallax */}
      {selectedProject.thumbnailUrl && (
        <motion.div
          ref={heroImageRef}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-card"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
          <motion.img
            style={{ y: imageY, scale: 1.06 }}
            src={selectedProject.thumbnailUrl}
            alt={selectedProject.title}
            className="w-full h-auto object-cover max-h-[550px] transform-gpu will-change-transform"
          />
        </motion.div>
      )}

      {/* Metrics Grid (if any) */}
      {selectedProject.metrics && selectedProject.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {selectedProject.metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-card border border-border space-y-1 shadow-xs"
            >
              <span className="text-[11px] font-mono text-muted-foreground uppercase">{m.label}</span>
              <span className="text-xl sm:text-2xl font-black text-primary block">{m.value}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Case Study Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Project Overview</h2>
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 text-foreground/90">
              <p className="whitespace-pre-line leading-relaxed">
                {selectedProject.caseStudy || selectedProject.summary}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Rail: Technologies & Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground block">
              Core Technologies
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 rounded-xl bg-background border border-border text-xs font-medium text-foreground shadow-xs cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Next Project Bridge */}
          {nextProject && nextProject._id !== selectedProject._id && (
            <Link
              href={`/${portfolio.slug}/projects/${nextProject.slug || nextProject._id}`}
              className="block p-5 rounded-3xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-primary tracking-wider block">
                Next Case Study &rarr;
              </span>
              <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mt-1">
                {nextProject.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {nextProject.summary}
              </p>
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
