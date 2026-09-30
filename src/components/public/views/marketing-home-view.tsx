"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import {
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
  Layout,
  Eye,
  Activity,
  ArrowUpRight,
  FolderGit2,
  BookOpen,
  Mail,
  Check,
  Database,
  Inbox,
  Cpu,
  Sparkles,
  Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureTabId = "theme-engine" | "cms-workflow" | "crm-inbox";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function MarketingHomeView() {
  const [activeFeatureTab, setActiveFeatureTab] =
    useState<FeatureTabId>("theme-engine");

  // Hero Parallax Setup
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothHeroProgress = useSpring(heroScrollProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const heroContentY = useTransform(smoothHeroProgress, [0, 1], [0, 40]);
  const heroOpacity = useTransform(smoothHeroProgress, [0, 0.75], [1, 0]);
  const heroMockupY = useTransform(smoothHeroProgress, [0, 1], [0, -35]);
  const heroMockupRotate = useTransform(smoothHeroProgress, [0, 1], [4, 0]);
  const heroMockupScale = useTransform(
    smoothHeroProgress,
    [0, 1],
    [0.98, 1.02],
  );

  // Floating depth parallax layers
  const floatBgY1 = useTransform(smoothHeroProgress, [0, 1], [0, -100]);
  const floatBgY2 = useTransform(smoothHeroProgress, [0, 1], [0, -60]);

  // Architecture Section Scroll Setup
  const archRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: archScrollProgress } = useScroll({
    target: archRef,
    offset: ["start end", "end start"],
  });
  const archGlowY = useTransform(archScrollProgress, [0, 1], [-40, 40]);

  return (
    <div className="min-h-screen text-foreground selection:bg-primary/20 selection:text-primary">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION WITH MULTI-PLANE PARALLAX
      ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-28 pb-20 sm:pt-36 sm:pb-32 overflow-hidden px-4 sm:px-6"
      >
        {/* Subtle Ambient Parallax Floating Marks */}
        <motion.div
          style={{ y: floatBgY1 }}
          className="absolute top-24 left-8 sm:left-24 text-muted/30 pointer-events-none -z-10 hidden sm:block"
        >
          <div className="w-16 h-16 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-3xs flex items-center justify-center">
            <Terminal className="w-7 h-7 text-muted-foreground/30" />
          </div>
        </motion.div>

        <motion.div
          style={{ y: floatBgY2 }}
          className="absolute top-36 right-8 sm:right-28 text-muted/30 pointer-events-none -z-10 hidden sm:block"
        >
          <div className="w-14 h-14 rounded-2xl border border-border/40 bg-card/20 backdrop-blur-3xs flex items-center justify-center">
            <Layers className="w-6 h-6 text-muted-foreground/30" />
          </div>
        </motion.div>

        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="inline-flex">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Developer Portfolio Platform</span>
            </span>
          </motion.div>

          {/* Main Headline & Subtitle */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground">
              The portfolio platform built for developers.
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed pt-2">
              Publish production case studies, showcase your tech stack, and
              receive client inquiries. Decoupled from design—switch themes
              anytime in one click.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/admin/login"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-95 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Create Your Portfolio</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/alex-morgan"
                target="_blank"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold bg-card border border-border hover:border-primary/40 hover:bg-muted/40 transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>View Live Demo</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Markdown Case Studies</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>1-Click Theme Switching</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Inbound Leads Inbox</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Custom Domain Support</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Interactive 3D Perspective Sandbox Mockup */}
        <motion.div
          style={{
            y: heroMockupY,
            rotateX: heroMockupRotate,
            scale: heroMockupScale,
            transformPerspective: 1200,
          }}
          className="max-w-5xl mx-auto mt-14 sm:mt-18 rounded-2xl sm:rounded-3xl border border-border bg-card/80 backdrop-blur-md p-2 sm:p-3 shadow-2xl relative z-20"
        >
          <div className="rounded-xl sm:rounded-2xl border border-border/70 bg-background/90 overflow-hidden">
            {/* Top Mockup Browser Chrome */}
            <div className="px-4 py-3 bg-muted/40 border-b border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-muted/60 border border-border/50 text-[11px] font-mono text-muted-foreground">
                <Globe className="w-3 h-3 text-primary" />
                <span>alexmorgan.dev</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-500 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Active</span>
              </div>
            </div>

            {/* Mockup Preview Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2 p-4 rounded-xl bg-card border border-border/60">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-semibold">
                    THEME ENGINE
                  </span>
                  <Palette className="w-3.5 h-3.5 text-primary" />
                </div>
                <h4 className="text-xs font-bold text-foreground">
                  Apex Studio Applied
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Editorial 2-column layout active with high-fashion typography
                  and dock.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-card border border-border/60">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-semibold">
                    PROJECTS CMS
                  </span>
                  <Code2 className="w-3.5 h-3.5 text-primary" />
                </div>
                <h4 className="text-xs font-bold text-foreground">
                  4 Case Studies Live
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Distributed streaming, real-time telemetry engine, and
                  microservices.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-card border border-border/60">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-semibold">
                    INBOUND LEADS
                  </span>
                  <Inbox className="w-3.5 h-3.5 text-primary" />
                </div>
                <h4 className="text-xs font-bold text-foreground">
                  3 Inquiries Received
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Verified leads from hiring managers and contract founders in
                  dashboard.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. PLATFORM WORKFLOW SHOWCASE
      ───────────────────────────────────────────────────────────── */}
      <section
        id="features"
        className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4 mb-12"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            Features
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            How DevPortfolio Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Manage your engineering profile with purpose-built tools designed
            for modern developers.
          </p>

          {/* Workflow Tabs */}
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-full bg-muted/80 border border-border mt-4 gap-1 shadow-2xs">
            <button
              onClick={() => setActiveFeatureTab("theme-engine")}
              className={cn(
                "relative px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer",
                activeFeatureTab === "theme-engine"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {activeFeatureTab === "theme-engine" && (
                <motion.div
                  layoutId="marketing-workflow-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Palette className="w-3.5 h-3.5" />
              <span>Theme Engine</span>
            </button>

            <button
              onClick={() => setActiveFeatureTab("cms-workflow")}
              className={cn(
                "relative px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer",
                activeFeatureTab === "cms-workflow"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {activeFeatureTab === "cms-workflow" && (
                <motion.div
                  layoutId="marketing-workflow-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Projects &amp; Case Studies</span>
            </button>

            <button
              onClick={() => setActiveFeatureTab("crm-inbox")}
              className={cn(
                "relative px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer",
                activeFeatureTab === "crm-inbox"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {activeFeatureTab === "crm-inbox" && (
                <motion.div
                  layoutId="marketing-workflow-pill"
                  className="absolute inset-0 rounded-full bg-primary shadow-sm -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Inbox className="w-3.5 h-3.5" />
              <span>Inquiries &amp; Messages</span>
            </button>
          </div>
        </motion.div>

        {/* Live Feature Preview Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          layout
          className="rounded-3xl border border-border bg-card overflow-hidden shadow-xl transition-all"
        >
          {/* Console Header */}
          <div className="px-4 sm:px-6 py-3 bg-muted/60 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/70" />
              <div className="w-3 h-3 rounded-full bg-amber-500/70" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
            </div>

            <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-background border border-border text-xs font-mono text-muted-foreground shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>
                {activeFeatureTab === "theme-engine" &&
                  "devportfolio.com/templates"}
                {activeFeatureTab === "cms-workflow" &&
                  "devportfolio.com/dashboard/projects"}
                {activeFeatureTab === "crm-inbox" &&
                  "devportfolio.com/dashboard/messages"}
              </span>
            </div>

            <Link
              href="/alex-morgan"
              target="_blank"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Console Content */}
          <div className="p-6 sm:p-12 min-h-[400px] bg-background/50 flex flex-col justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              {activeFeatureTab === "theme-engine" && (
                <motion.div
                  key="theme-engine"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8 max-w-4xl mx-auto w-full text-center"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                      Decoupled Content &amp; Layouts
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                      Switch themes without rewriting your content
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                      Your showcase projects, career milestones, and articles
                      live independently from the UI. Pick any theme from our
                      library and your portfolio adapts instantly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-2xs hover:border-primary/40 transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xs font-mono">
                        01
                      </div>
                      <h4 className="font-bold text-sm text-foreground">
                        Classic Dev
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Clean typography-led layout with floating capsule
                        navigation.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-2xs hover:border-primary/40 transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold text-xs font-mono">
                        02
                      </div>
                      <h4 className="font-bold text-sm text-foreground">
                        Nova Engine
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        High-density console with terminal prompts and telemetry
                        stats.
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -4 }}
                      className="p-5 rounded-2xl bg-card border border-border space-y-2 shadow-2xs hover:border-primary/40 transition-all"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs font-mono">
                        03
                      </div>
                      <h4 className="font-bold text-sm text-foreground">
                        Apex Studio
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        High-fashion brutalist theme with floating glass dock
                        and editorial cards.
                      </p>
                    </motion.div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/templates"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>Explore all available themes in the gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === "cms-workflow" && (
                <motion.div
                  key="cms-workflow"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8 max-w-4xl mx-auto w-full text-center"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                      Developer CMS
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                      Structured Case Studies &amp; Projects
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                      Publish featured repositories, live URLs, technology tags,
                      and technical case studies through an intuitive management
                      panel.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-card border border-border text-left space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-foreground">
                          Distributed Stream Processor
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 font-semibold">
                        Published
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-muted-foreground block">
                          CATEGORY
                        </span>
                        <span className="font-semibold text-foreground">
                          Backend &amp; Distributed
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-muted-foreground block">
                          TECH STACK
                        </span>
                        <span className="font-semibold text-foreground">
                          Go, Kafka, Redis, Docker
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-muted-foreground block">
                          LIVE DEMO
                        </span>
                        <span className="font-semibold text-primary">
                          stream-edge.dev &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeatureTab === "crm-inbox" && (
                <motion.div
                  key="crm-inbox"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8 max-w-4xl mx-auto w-full text-center"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                      Inbound Leads Inbox
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground">
                      Capture high-value project inquiries
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                      Every contact form inquiry routes directly to your private
                      dashboard inbox with notification alerts, status tracking,
                      and spam protection.
                    </p>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span className="text-xs font-bold text-foreground">
                            Sarah Jenkins &bull; VP Engineering at NextScale
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          &quot;Looking for staff architectural consulting for
                          our Q4 Kubernetes migration sprint...&quot;
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                        New Inquiry
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-card border border-border flex items-center justify-between shadow-2xs opacity-80">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                          <span className="text-xs font-bold text-foreground">
                            David Miller &bull; Founder at Lattice Labs
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          &quot;Interested in full-stack contract lead role for
                          high-throughput streaming platform...&quot;
                        </p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                        Replied
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CORE ARCHITECTURAL PILLARS (SCROLL-TRIGGERED STAGGER)
      ───────────────────────────────────────────────────────────── */}
      <section
        ref={archRef}
        className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4 mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Built for Developers
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Everything you need to launch and maintain your public presence with
            zero operational overhead.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            custom={0}
            variants={cardStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-colors shadow-xs hover:shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Multi-Tenant Isolation
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every project, post, and inquiry is isolated to your account.
                Query enforcement guarantees secure data boundaries.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-primary font-semibold">
              Security Enforced &rarr;
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={cardStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-colors shadow-xs hover:shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Zero-Loss Theme Swaps
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Switch themes as your career evolves. Your Markdown case
                studies, career milestones, and blog posts format automatically.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-primary font-semibold">
              Zero Reconfiguration &rarr;
            </div>
          </motion.div>

          <motion.div
            custom={2}
            variants={cardStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-card border border-border space-y-4 hover:border-primary/40 transition-colors shadow-xs hover:shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                Fast Edge Performance
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Built with Next.js App Router streaming, edge caching, automated
                SEO meta-tags, and lightweight styling.
              </p>
            </div>
            <div className="pt-2 text-xs font-mono text-primary font-semibold">
              Optimized TTFB &rarr;
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. PRICING TIERS (VIEWPORT STAGGER)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4 mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Simple, Transparent Plans
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            Get started for free or upgrade for custom domains and advanced
            telemetry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="p-8 rounded-3xl bg-card border border-border space-y-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
          >
            <div className="space-y-5">
              <span className="text-xs font-mono text-muted-foreground uppercase font-semibold">
                Starter / Hobby
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-foreground">$0</span>
                <span className="text-xs text-muted-foreground font-mono">
                  / forever
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Everything you need to launch a high-performance public
                developer portfolio today.
              </p>
              <ul className="space-y-3 text-xs text-muted-foreground pt-3 border-t border-border">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    Public handle routing (<code>/{"{your-slug}"}</code>)
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Full access to all current and future templates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited projects, case studies &amp; articles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Integrated contact inquiry management</span>
                </li>
              </ul>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/admin/login"
                className="w-full py-3.5 rounded-full text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground text-center block transition-colors border border-border shadow-2xs"
              >
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="p-8 rounded-3xl bg-card border-2 border-primary space-y-6 flex flex-col justify-between relative shadow-lg shadow-primary/10 transition-all"
          >
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-primary text-primary-foreground shadow-xs">
                Popular
              </span>
            </div>
            <div className="space-y-5">
              <span className="text-xs font-mono text-primary uppercase font-semibold">
                Pro Engineer
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-foreground">$12</span>
                <span className="text-xs text-muted-foreground font-mono">
                  / month
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                For senior engineers, contractors, and consultants wanting
                custom domains and telemetry.
              </p>
              <ul className="space-y-3 text-xs text-muted-foreground pt-3 border-t border-border">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    Custom domain routing (<code>alex.dev</code>)
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Visitor analytics &amp; lead tracking telemetry</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Priority media transformation &amp; CDN caching</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Custom CSS token overrides &amp; styling</span>
                </li>
              </ul>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/admin/login"
                className="w-full py-3.5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:opacity-95 text-center block transition-opacity shadow-md shadow-primary/20"
              >
                Upgrade to Pro
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto border-t border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="p-10 sm:p-16 rounded-3xl bg-card border border-border text-center space-y-6 shadow-xs"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Deploy your portfolio today.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Join software engineers managing their online presence with
            DevPortfolio.
          </p>
          <div className="pt-2 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-95 shadow-md shadow-primary/20 transition-all"
              >
                <span>Create Your Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
