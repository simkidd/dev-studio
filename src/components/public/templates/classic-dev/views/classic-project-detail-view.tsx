"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { ChromeSparkleIcon, GithubIcon } from "@/components/ui/icons";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Share2,
  Sparkles,
  Briefcase,
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Top Breadcrumb & Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">
        <Link
          href={`/${portfolio.slug}/projects`}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Projects</span>
          <span className="text-border">/</span>
          <span className="text-foreground">{selectedProject.title}</span>
        </Link>

        <button
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
        </button>
      </div>

      {/* Header Hero Banner */}
      <div className="space-y-6">
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
            <a
              href={selectedProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/25 hover:opacity-95 transition-opacity"
            >
              <span>Launch Live Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          {selectedProject.githubUrl && (
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-semibold border border-border transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {selectedProject.thumbnailUrl && (
        <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-card">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
          <img
            src={selectedProject.thumbnailUrl}
            alt={selectedProject.title}
            className="w-full h-auto object-cover max-h-[550px]"
          />
        </div>
      )}

      {/* Metrics Grid (if any) */}
      {selectedProject.metrics && selectedProject.metrics.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {selectedProject.metrics.map((m, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-card border border-border space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-primary font-mono">{m.value}</span>
              <p className="text-xs text-muted-foreground font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Main Content & Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Case Study Narrative */}
        <div className="lg:col-span-8 space-y-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              <span>Architecture &amp; System Overview</span>
            </h2>
            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed space-y-4 text-muted-foreground">
              <p className="whitespace-pre-line">
                {selectedProject.caseStudy || selectedProject.summary}
              </p>
            </div>
          </div>

          {/* Engineering Highlights */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-4">
            <h3 className="text-base font-bold text-foreground">Key Technical Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-background border border-border space-y-1.5">
                <span className="text-xs font-bold text-foreground">High Availability</span>
                <p className="text-xs text-muted-foreground">
                  Engineered for zero-downtime deployments with automated health checks and failover redundancy.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-border space-y-1.5">
                <span className="text-xs font-bold text-foreground">Optimized Performance</span>
                <p className="text-xs text-muted-foreground">
                  Sub-100ms API response latency and 95+ Google Lighthouse scores across all critical paths.
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Showcase */}
          {selectedProject.galleryImages && selectedProject.galleryImages.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                  Visual Showcase
                </span>
                <h3 className="text-lg font-bold text-foreground">Interface &amp; System Gallery</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedProject.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-2xl overflow-hidden border border-border bg-muted/40 aspect-16/10 shadow-xs hover:border-primary/40 transition-colors"
                  >
                    <img
                      src={img.url}
                      alt={`${selectedProject.title} preview ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Metadata Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-card border border-border space-y-6 sticky top-24">
            <h3 className="text-xs font-mono uppercase text-muted-foreground tracking-widest">
              Project Specifications
            </h3>

            <div className="space-y-4 text-xs divide-y divide-border/60">
              <div className="pt-2">
                <span className="text-muted-foreground block text-[11px] mb-1">Stack &amp; Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-muted text-foreground border border-border/50"
                    >
                      <TechIcon name={tech} className="w-3 h-3 text-primary" />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <span className="text-muted-foreground block text-[11px] mb-0.5">Category</span>
                <span className="font-semibold text-foreground">{selectedProject.category}</span>
              </div>

              <div className="pt-3">
                <span className="text-muted-foreground block text-[11px] mb-0.5">Deployment Target</span>
                <span className="font-semibold text-foreground">Production Cloud</span>
              </div>

              <div className="pt-3">
                <span className="text-muted-foreground block text-[11px] mb-0.5">Status</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active &amp; Deployed
                </span>
              </div>
            </div>

            {/* Consultation CTA */}
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-3">
              <span className="text-xs font-bold text-foreground block">
                Want to build something like this?
              </span>
              <p className="text-[11px] text-muted-foreground">
                Let&apos;s collaborate on your next mission-critical architecture.
              </p>
              <Link
                href={`/${portfolio.slug}/contact`}
                className="block text-center py-2 px-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs shadow-sm hover:opacity-95 transition-opacity"
              >
                Inquire Directly
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects Section */}
      {projects.filter((p) => p._id !== selectedProject._id).length > 0 && (
        <div className="space-y-6 pt-12 border-t border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Explore Other Works</h3>
            <Link
              href={`/${portfolio.slug}/projects`}
              className="text-xs font-mono text-primary hover:underline"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects
              .filter((p) => p._id !== selectedProject._id)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p._id}
                  href={`/${portfolio.slug}/projects/${p.slug || p._id}`}
                  className="group block p-6 rounded-3xl bg-card border border-border hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
                >
                  <span className="text-[10px] font-mono text-primary uppercase">{p.category}</span>
                  <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mt-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">{p.summary}</p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
