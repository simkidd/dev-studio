"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePortfolioSettings, useUpdatePortfolioSettings, useProfile } from "@/hooks";
import { PortfolioTemplateId } from "@/interfaces";
import {
  Sparkles,
  Layout,
  CheckCircle2,
  ExternalLink,
  Eye,
  Sliders,
  Palette,
  Layers,
  ArrowRight,
  Monitor,
  Smartphone,
  Globe,
  Loader2,
  Terminal,
  Gem,
} from "lucide-react";
import { ChromeSparkleIcon } from "@/components/ui/icons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TemplateOption {
  id: PortfolioTemplateId;
  name: string;
  tagline: string;
  category: string;
  description: string;
  highlights: string[];
  recommendedFor: string;
  badge: string;
  accentGradient: string;
  previewBg: string;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: "classic-dev",
    name: "Modern Minimal Craft",
    tagline: "Classic Editorial & Balanced Full-Stack Portfolio",
    category: "Full-Stack & Generalist",
    description:
      "The flagship developer design. Features a floating capsule navigation bar, mega editorial headline with chrome sparkle accents, responsive showcase cards, career timeline, and an inquiry collaboration gateway.",
    highlights: [
      "Floating capsule navigation dock with theme switcher",
      "Mega editorial headline with 3D chrome sparklers",
      "Modular project showcase with tech badge pills",
      "Endorsement testimonials & career history timeline",
    ],
    recommendedFor: "Full-Stack Engineers, Software Developers & Consultants",
    badge: "Flagship Original",
    accentGradient: "from-blue-500 to-indigo-600",
    previewBg: "bg-slate-900",
  },
  {
    id: "nova-engine",
    name: "Nova Engine",
    tagline: "High-Performance Systems & Telemetry Console",
    category: "Engineering & Architecture",
    description:
      "A dark-mode first, command-line styled aesthetic engineered for systems developers, cloud architects, and backend engineers. Features live telemetry badges, clean grid alignments, and high data density.",
    highlights: [
      "Terminal-inspired typography & badge styling",
      "Interactive Skill Matrix with Category Filter",
      "Clean timeline milestones with tech stack tags",
      "Minimalist lead inquiry terminal",
    ],
    recommendedFor: "Backend, DevOps, Cloud & Systems Engineers",
    badge: "Most Popular for Engineers",
    accentGradient: "from-indigo-500 to-cyan-500",
    previewBg: "bg-slate-950",
  },
  {
    id: "apex-studio",
    name: "Apex Studio",
    tagline: "Creative Technologist & High-Impact Digital Design",
    category: "Design & Creative Dev",
    description:
      "A luxury editorial template built for creative technologists, frontend artists, and product creators. Features bold typographic hierarchies, curated work grids, and full-bleed visual storytelling.",
    highlights: [
      "Editorial display typography & fluid layouts",
      "Visual case study focus with rich media support",
      "Sticky navigation dock with smooth page anchors",
      "Executive client testimonial carousel",
    ],
    recommendedFor: "Creative Developers, UI/UX Engineers & Founders",
    badge: "Awwwards-Inspired",
    accentGradient: "from-violet-500 to-rose-500",
    previewBg: "bg-[#09090b]",
  },
];

export function TemplatesView() {
  const { data: portfolio, isLoading } = usePortfolioSettings();
  const { data: profile } = useProfile();
  const updateSettingsMutation = useUpdatePortfolioSettings();

  const currentTemplateId = (portfolio?.templateId || "classic-dev") as PortfolioTemplateId;
  const userSlug = portfolio?.slug || "preview";

  const handleApplyTemplate = async (templateId: PortfolioTemplateId) => {
    try {
      await updateSettingsMutation.mutateAsync({
        templateId,
      });
      const selected = TEMPLATES.find((t) => t.id === templateId)?.name || templateId;
      toast.success(`Template updated to "${selected}"!`, {
        description: "Your live portfolio presentation has been refreshed immediately.",
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to switch template");
    }
  };

  const handleTogglePublish = async () => {
    if (!portfolio) return;
    try {
      await updateSettingsMutation.mutateAsync({
        isPublished: !portfolio.isPublished,
      });
      toast.success(
        portfolio.isPublished
          ? "Portfolio unpublished. It is now private (draft)."
          : "Portfolio published! It is now accessible worldwide.",
      );
    } catch (err: any) {
      toast.error("Failed to update publication status");
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Live Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Portfolio Design &amp; Templates
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
              3 Distinct Visual Engines
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Switch between the 3 bespoke design templates anytime. Your bio, showcase projects, skill tags, career history, and testimonials remain 100% intact while the presentation adapts automatically.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleTogglePublish}
            disabled={updateSettingsMutation.isPending || isLoading}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2",
              portfolio?.isPublished
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20"
                : "bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20",
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                portfolio?.isPublished ? "bg-emerald-500 animate-pulse" : "bg-amber-500",
              )}
            />
            <span>{portfolio?.isPublished ? "Status: Live" : "Status: Draft (Private)"}</span>
          </button>

          <Link
            href={`/${userSlug}`}
            target="_blank"
            className="px-3.5 py-1.5 rounded-lg bg-card hover:bg-accent border border-border text-foreground text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-primary" />
            <span>Open Public Site</span>
          </Link>
        </div>
      </div>

      {/* Templates Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => {
          const isActive = currentTemplateId === tmpl.id;
          const isPending = updateSettingsMutation.isPending;

          return (
            <div
              key={tmpl.id}
              className={cn(
                "bg-card border rounded-2xl overflow-hidden flex flex-col transition-all relative group",
                isActive
                  ? "border-primary shadow-xl shadow-primary/5 ring-1 ring-primary/30"
                  : "border-border hover:border-border/80 hover:shadow-md",
              )}
            >
              {/* Active Badge */}
              {isActive && (
                <div className="absolute top-3.5 right-3.5 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground shadow-lg">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active Theme
                  </span>
                </div>
              )}

              {/* Template Mockup Preview */}
              <div
                className={cn(
                  "h-48 p-5 border-b border-border/80 flex flex-col justify-between relative overflow-hidden",
                  tmpl.previewBg,
                )}
              >
                {/* Visual Ambient Glow */}
                <div
                  className={cn(
                    "absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 bg-gradient-to-br",
                    tmpl.accentGradient,
                  )}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                    {tmpl.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    {tmpl.badge}
                  </span>
                </div>

                {/* Mock UI Elements */}
                <div className="relative z-10 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-white text-xs">
                      {profile?.firstName?.charAt(0) || "D"}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold tracking-tight truncate max-w-[180px]">
                        {profile?.firstName ? `${profile.firstName} ${profile?.lastName || ""}` : "Developer"}
                      </h4>
                      <p className="text-[11px] text-white/60 font-mono truncate max-w-[200px]">
                        {profile?.headline || "Full-Stack Engineer"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="h-1.5 w-10 rounded-full bg-white/20" />
                    <span className="h-1.5 w-16 rounded-full bg-white/15" />
                    <span className="h-1.5 w-12 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3.5">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{tmpl.name}</h3>
                    <p className="text-xs text-primary font-medium mt-0.5">{tmpl.tagline}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                      Included Architecture
                    </span>
                    <div className="space-y-1.5 pt-1">
                      {tmpl.highlights.map((hl, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-[11px] text-foreground/80 bg-muted/40 px-2.5 py-1 rounded-lg border border-border/50"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/30 border border-border/50 rounded-lg p-2.5 text-[10px] text-muted-foreground flex items-center justify-between">
                    <span className="font-medium">Best for:</span>
                    <span className="text-foreground font-semibold truncate ml-2">{tmpl.recommendedFor}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 pt-2 border-t border-border">
                  {isActive ? (
                    <button
                      disabled
                      className="flex-1 py-2 px-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-semibold flex items-center justify-center gap-2 cursor-default"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active Theme
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApplyTemplate(tmpl.id)}
                      disabled={isPending}
                      className="flex-1 py-2 px-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Applying...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Activate</span>
                        </>
                      )}
                    </button>
                  )}

                  <Link
                    href={`/${userSlug}`}
                    target="_blank"
                    className="py-2 px-3 rounded-xl bg-card hover:bg-accent border border-border text-foreground text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Preview</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content vs Presentation Architecture Guarantee Note */}
      <div className="bg-card border border-border rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-bold text-foreground">
              Strict Presentation &amp; Content Independence
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Each of the 3 templates operates with its own independent navigation bar, layout system, component structure, and footer. Changing your template instantly updates your public website presentation while strictly keeping all your projects, experiences, skills, articles, and bio data completely untouched.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
