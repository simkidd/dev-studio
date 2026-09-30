"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { GithubIcon } from "@/components/ui/icons";
import { ArrowLeft, ArrowUpRight, Share2 } from "lucide-react";
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

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 space-y-16">
      {/* Top Navigation & Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-white/10 pb-6">
        <Link
          href={`/${portfolio.slug}/projects`}
          className="text-xs font-mono text-stone-500 dark:text-white/50 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-2 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Folio Archive</span>
          <span className="text-stone-300 dark:text-white/20">/</span>
          <span className="text-stone-900 dark:text-white">{selectedProject.title}</span>
        </Link>

        <button
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
        </button>
      </div>

      {/* Editorial Hero Title */}
      <div className="space-y-6">
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
            <a
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors shadow-2xl"
            >
              <span>Launch Experience</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {selectedProject.githubUrl && (
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-100 dark:bg-white/5 text-stone-900 dark:text-white text-xs font-bold uppercase tracking-wider border border-stone-200 dark:border-white/10 hover:bg-stone-200 dark:hover:bg-white/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Repository</span>
            </a>
          )}
        </div>
      </div>

      {/* Full-Bleed Media Stage */}
      {selectedProject.thumbnailUrl && (
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-white/5 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10 hidden dark:block" />
          <img
            src={selectedProject.thumbnailUrl}
            alt={selectedProject.title}
            className="w-full h-auto object-cover max-h-[650px]"
          />
        </div>
      )}

      {/* Luxury Editorial Metadata Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 font-mono text-xs shadow-xs">
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
          <span className="text-stone-900 dark:text-white font-bold text-sm block">
            {selectedProject.technologies.slice(0, 3).join(", ")}
          </span>
        </div>
      </div>

      {/* Narrative Story Chapters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-6">
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest block font-semibold">
              01 / CONCEPT &amp; CREATIVE DIRECTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-stone-900 dark:text-white">
              Spatial Balance &amp; Digital Craft
            </h3>
            <div className="prose dark:prose-invert max-w-none text-base sm:text-lg font-light leading-relaxed text-stone-700 dark:text-white/80 space-y-4">
              <p className="whitespace-pre-line leading-relaxed">
                {selectedProject.caseStudy || selectedProject.summary}
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-4 shadow-xs">
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest block font-semibold">
              02 / KINETIC ENGINEERING
            </span>
            <p className="text-sm text-stone-600 dark:text-white/70 font-light leading-relaxed">
              Engineered with 60fps kinetic fluid motion, hardware-accelerated animations, and responsive micro-interactions across viewport breakpoints.
            </p>
          </div>

          {/* 03 / Visual Artifacts Gallery */}
          {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 && (
            <div className="space-y-6">
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest block font-semibold">
                03 / VISUAL ARTIFACTS &amp; GALLERY
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {selectedProject.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-3xl overflow-hidden border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-white/5 aspect-16/10 shadow-md hover:border-amber-500/40 transition-colors"
                  >
                    <img
                      src={img.url}
                      alt={`${selectedProject.title} artifact ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Technologies & Accolades */}
        <div className="lg:col-span-4 space-y-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-6 shadow-xs">
            <h4 className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 tracking-widest font-semibold">
              Crafted With
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-900 dark:text-white text-xs font-mono border border-stone-200 dark:border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 space-y-3">
            <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 tracking-widest block font-semibold">
              Commission Work
            </span>
            <h4 className="text-base font-bold uppercase text-stone-900 dark:text-white">Need a bespoke digital artifact?</h4>
            <Link
              href={`/${portfolio.slug}/contact`}
              className="inline-block mt-2 px-6 py-2.5 rounded-full bg-amber-500 dark:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 dark:hover:bg-white transition-colors"
            >
              Initiate Contact &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Giant Next Case Study Magnetic Banner */}
      {projects.filter((p) => p._id !== selectedProject._id).length > 0 && (
        <div className="pt-16 border-t border-stone-200 dark:border-white/10">
          {projects
            .filter((p) => p._id !== selectedProject._id)
            .slice(0, 1)
            .map((nextProject) => (
              <Link
                key={nextProject._id}
                href={`/${portfolio.slug}/projects/${nextProject.slug || nextProject._id}`}
                className="group relative block p-8 sm:p-14 lg:p-16 rounded-3xl bg-gradient-to-br from-white via-stone-50/80 to-amber-500/10 dark:from-white/5 dark:via-white/[0.07] dark:to-amber-500/15 border border-stone-200 dark:border-white/15 hover:border-amber-500/60 dark:hover:border-amber-400/60 transition-all duration-300 space-y-4 shadow-sm hover:shadow-2xl hover:shadow-amber-500/10"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <span>NEXT CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-stone-200/60 dark:bg-white/10 text-stone-700 dark:text-stone-300 border border-stone-300/60 dark:border-white/10 font-semibold">
                    {nextProject.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {nextProject.title}
                </h3>

                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light line-clamp-2 max-w-3xl leading-relaxed">
                  {nextProject.summary}
                </p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
