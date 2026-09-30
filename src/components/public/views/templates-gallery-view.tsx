"use client";

import React from "react";
import Link from "next/link";
import {
  Palette,
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Terminal,
  Layers,
  Layout,
} from "lucide-react";

export function TemplatesGalleryView() {
  const templates = [
    {
      id: "classic-dev",
      name: "Modern Minimal Craft",
      subtitle: "Classic Editorial & Balanced Full-Stack Showcase",
      badge: "Flagship Original",
      description:
        "The balanced original design. Features a floating capsule navigation dock with theme toggle, mega editorial headline with 3D chrome sparkles, responsive showcase cards, career timeline, endorsement quotes, and a direct inquiry collaboration gateway.",
      demoUrl: "/alex-morgan",
      tags: ["Floating Capsule Nav", "Chrome Sparkle Badges", "Tech Stack Grid", "Career Milestones", "Collaboration Gateway"],
      bestFor: "Full-Stack Developers, Software Engineers, Systems Consultants, Team Leads",
    },
    {
      id: "nova-engine",
      name: "Nova Engine",
      subtitle: "Systems & Distributed Telemetry Console",
      badge: "High Density",
      description:
        "Designed for backend architects, DevOps engineers, and systems developers. Emphasizes technical throughput metrics, terminal command header, telemetry status badges, rich Markdown case studies, and categorized live stack matrix.",
      demoUrl: "/alex-morgan",
      tags: ["Terminal Command Header", "Telemetry Badges", "Category Matrix", "Log Timeline", "Inquiry Console"],
      bestFor: "Staff Engineers, Backend Architects, DevOps & Cloud Consultants, Distributed Systems Devs",
    },
    {
      id: "apex-studio",
      name: "Apex Studio",
      subtitle: "Creative Technologist & Interaction Studio",
      badge: "Awwwards Style",
      description:
        "Inspired by high-end design engineering agencies. Features bold editorial typography, floating glass dock navigation, full-bleed interactive project showcases, kinetic motion triggers, and bespoke commission consoles.",
      demoUrl: "/elena-rostova",
      tags: ["Editorial Typography", "Glass Dock Nav", "Full-Bleed Showcases", "Studio Endorsements", "Commission Gateway"],
      bestFor: "Frontend Engineers, Creative Developers, 3D WebGL Artists, Product Designers, Founders",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Palette className="w-3.5 h-3.5" />
            <span>Design System &amp; Layouts</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
            Portfolio Templates
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Every template operates with its own independent navigation bar, layout system, and footer. Change your visual presentation instantly without altering your projects, posts, or career history.
          </p>
        </div>

        {/* Templates Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 flex flex-col justify-between hover:border-primary/40 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                    {tpl.badge}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase">{tpl.id}</span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{tpl.name}</h2>
                  <div className="text-xs font-mono text-muted-foreground">{tpl.subtitle}</div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tpl.description}
                </p>

                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Features</div>
                  <div className="flex flex-wrap gap-1.5">
                    {tpl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-muted text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1 text-xs">
                  <span className="font-semibold text-foreground">Best For:</span>
                  <p className="text-muted-foreground text-[11px]">{tpl.bestFor}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Link
                  href="/admin/login"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-md shadow-primary/20"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={tpl.demoUrl}
                  target="_blank"
                  className="p-2.5 rounded-xl bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                  title="View Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-linear-to-tr from-primary/10 via-card to-card border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Ready to publish your portfolio?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sign up, choose your favorite template, and launch your dynamic portfolio in minutes.
            </p>
          </div>
          <Link
            href="/admin/login"
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 transition-all shrink-0 shadow-lg shadow-primary/20"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
