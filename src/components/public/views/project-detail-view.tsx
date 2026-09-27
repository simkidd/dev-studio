"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useProjectBySlug } from "@/hooks";
import { ArrowLeft, ExternalLink, Layers, ChevronRight } from "lucide-react";
import { ChromeSparkleIcon, GithubIcon } from "@/components/ui/icons";

export function ProjectDetailView({ slug }: { slug: string }) {
  const { data: project, isLoading, error } = useProjectBySlug(slug);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded-full" />
        <div className="h-12 w-2/3 bg-muted rounded-2xl" />
        <div className="aspect-[16/9] w-full bg-muted rounded-3xl" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-36 pb-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Project Not Found
        </h1>
        <p className="text-xs text-muted-foreground">
          The requested project case study could not be found or has been moved.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Works</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 space-y-12 sm:space-y-16">
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMBS & TOP ACTIONS
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link
            href="/projects"
            className="hover:text-foreground transition-colors"
          >
            Selected Works
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">{project.title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-semibold">
                {project.category || "Full-Stack Application"}
              </span>
              {project.isFeatured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                  <ChromeSparkleIcon className="w-3 h-3" />
                  Featured Build
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 transition-all hover:scale-102 cursor-pointer"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card hover:bg-muted text-foreground border border-border text-xs font-semibold transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN HIGH-RES SHOWCASE HERO
      ───────────────────────────────────────────────────────────── */}
      <div className="relative aspect-[16/9] w-full rounded-3xl border-2 border-border bg-muted overflow-hidden shadow-2xl">
        {project.thumbnailUrl ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
            Visual Preview Unavailable
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. ARCHITECTURAL DETAILS & OVERVIEW
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left 2 Cols: Description & Solution */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              Project Architecture & Execution
            </h2>
            <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line space-y-3 font-sans">
              {project.caseStudy || project.summary}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Tech Stack & Specs Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-card border border-border space-y-6 shadow-xs">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono text-primary">
              Technical Specifications
            </h3>

            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-muted-foreground">
                  Category
                </span>
                <p className="text-xs font-semibold text-foreground">
                  {project.category || "Full-Stack"}
                </p>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-muted text-[11px] font-mono text-foreground font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. BACK NAVIGATION & CLOSING CTA
      ───────────────────────────────────────────────────────────── */}
      <div className="pt-10 border-t border-border flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Works</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
        >
          <span>Discuss a similar project ↗</span>
        </Link>
      </div>
    </div>
  );
}
