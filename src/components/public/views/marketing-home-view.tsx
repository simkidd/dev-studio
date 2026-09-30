"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Code2,
  Palette,
  Terminal,
  Layers,
  Zap,
  ShieldCheck,
  Globe,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Laptop,
  Flame,
  Layout,
} from "lucide-react";
import { TechIcon } from "@/components/ui/tech-icon";

export function MarketingHomeView() {
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<"classic-dev" | "nova-engine" | "apex-studio">("classic-dev");

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-32 overflow-hidden px-4">
        {/* Ambient Top Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span>Multi-Tenant Developer Portfolio SaaS Platform</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.98] text-foreground">
              Create a developer portfolio that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-amber-400">feels like you</span>.
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed pt-2">
              The modern SaaS platform for software engineers, architects, and creative technologists to publish bespoke portfolio sites with zero configuration.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/admin/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Build Your Portfolio Free</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/templates"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-card border border-border hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 3 Templates</span>
              <Palette className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Multi-Tenant Data Isolation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Zero-Downtime Template Switcher</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Independent Navbars &amp; Footers</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. LIVE TEMPLATE PREVIEW BENCH (INTERACTIVE SHOWCASE)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-7xl mx-auto border-t border-border/40">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
            <Laptop className="w-3.5 h-3.5" />
            <span>Interactive Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Three Bespoke Design Engines</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Switch between curated templates anytime. Your content, projects, and articles remain completely intact.
          </p>

          {/* Template Switcher Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-muted border border-border mt-4 gap-1">
            <button
              onClick={() => setActivePreviewTemplate("classic-dev")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activePreviewTemplate === "classic-dev"
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layout className="w-4 h-4 text-blue-500" />
              <span>Modern Minimal (Classic Craft)</span>
            </button>
            <button
              onClick={() => setActivePreviewTemplate("nova-engine")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activePreviewTemplate === "nova-engine"
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="w-4 h-4 text-indigo-500" />
              <span>Nova Engine (Systems &amp; Telemetry)</span>
            </button>
            <button
              onClick={() => setActivePreviewTemplate("apex-studio")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activePreviewTemplate === "apex-studio"
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Palette className="w-4 h-4 text-rose-500" />
              <span>Apex Studio (Creative &amp; Editorial)</span>
            </button>
          </div>
        </div>

        {/* Live Mockup Window */}
        <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-2xl">
          {/* Browser Chrome Header */}
          <div className="px-4 py-3 bg-muted/70 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-background border border-border text-xs font-mono text-muted-foreground">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>
                devportfolio.com/
                {activePreviewTemplate === "classic-dev"
                  ? "alex-morgan"
                  : activePreviewTemplate === "nova-engine"
                  ? "alex-morgan"
                  : "elena-rostova"}
              </span>
            </div>

            <Link
              href={activePreviewTemplate === "apex-studio" ? "/elena-rostova" : "/alex-morgan"}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Interactive Preview Content */}
          <div className="p-8 sm:p-14 min-h-[380px] flex flex-col justify-center">
            {activePreviewTemplate === "classic-dev" ? (
              <div className="space-y-6 max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <Layout className="w-3.5 h-3.5" />
                  <span>Modern Minimal Craft &bull; Dedicated Floating Pill Navbar</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
                  Full-Stack Engineer &amp; Systems Architect
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  I engineer high-throughput systems, resilient web architectures, and high-performance digital experiences.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS"].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-muted border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : activePreviewTemplate === "nova-engine" ? (
              <div className="space-y-6 max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Nova Engine Active &bull; Dedicated Command Header</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
                  Senior Staff Systems &amp; Distributed Architect
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  10+ years architecting web platforms handling $50M+ processed ARR, sub-50ms p99 latencies, and 99.99% uptime SLAs.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {["Go", "TypeScript", "Next.js", "Redis", "Kafka", "Docker"].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-muted border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Apex Studio Active &bull; Dedicated Floating Glass Dock</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter text-foreground">
                  Creative Technologist &amp; Interaction Designer
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Crafting visceral digital experiences, WebGL interactives, and award-winning frontend architectures.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {["Three.js", "WebGL", "GLSL Shaders", "React Three Fiber", "GSAP"].map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-amber-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CORE FEATURES GRID
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto border-t border-border/40">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Built For Developers</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything You Need to Stand Out</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Strict Tenant Isolation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every project, post, and inquiry is cryptographically bounded to your account. Full backend query enforcement guarantees data security.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Instant Theme Switching</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Change templates instantly without losing your showcase projects, experience history, skills, or blog articles.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Inbound CRM &amp; Telemetry</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Capture inbound client inquiries, consulting leads, and recruiter messages directly into your private dashboard CRM with automated email alerts.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PRICING TIERS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-5xl mx-auto border-t border-border/40">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">Simple Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Built for Developers at Every Stage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <div className="p-8 rounded-3xl bg-card border border-border space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-mono text-muted-foreground uppercase">Hobby / Starter</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-foreground">$0</span>
                <span className="text-xs text-muted-foreground font-mono">/ forever</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Everything you need to launch a beautiful public developer portfolio today.
              </p>
              <ul className="space-y-2.5 text-xs text-muted-foreground pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Subdomain / slug routing (e.g. <code>/your-handle</code>)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Access to all 3 signature templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Unlimited projects &amp; case studies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Inbound contact inquiry CRM</span>
                </li>
              </ul>
            </div>
            <Link
              href="/admin/login"
              className="w-full py-3 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground text-center block transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="p-8 rounded-3xl bg-card border-2 border-primary space-y-6 flex flex-col justify-between relative shadow-xl shadow-primary/5">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-primary text-primary-foreground">
                Popular
              </span>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-mono text-primary uppercase">Pro Engineer</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-foreground">$12</span>
                <span className="text-xs text-muted-foreground font-mono">/ month</span>
              </div>
              <p className="text-xs text-muted-foreground">
                For senior engineers, contractors, and agency founders wanting custom domains and telemetry.
              </p>
              <ul className="space-y-2.5 text-xs text-muted-foreground pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Custom domain routing (e.g. <code>alex.dev</code>)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Advanced visitor telemetry &amp; analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Priority Cloudinary media transformation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Custom theme CSS &amp; brand token overrides</span>
                </li>
              </ul>
            </div>
            <Link
              href="/admin/login"
              className="w-full py-3 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 text-center block transition-opacity shadow-md"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-5xl mx-auto border-t border-border/40">
        <div className="p-10 sm:p-16 rounded-3xl bg-linear-to-tr from-primary/15 via-card to-card border border-primary/20 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase">
            Deploy your portfolio today.
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Join developers managing their online presence with DevPortfolio SaaS.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-lg transition-all"
            >
              <span>Create Your Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
