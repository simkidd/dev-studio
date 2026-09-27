"use client";

import React from "react";
import Link from "next/link";
import {
  Layers,
  Cpu,
  Cloud,
  Zap,
  Terminal,
  ArrowUpRight,
  ShieldCheck,
  Code2,
  Database,
  Workflow,
  Sparkles,
} from "lucide-react";
import { ChromeSparkleIcon } from "@/components/ui/icons";
import { useSkills } from "@/hooks";
import { ISkill } from "@/interfaces";
import { cn } from "@/lib/utils";

interface IDiscipline {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
  techStack: string[];
}

const DISCIPLINES: IDiscipline[] = [
  {
    id: "frontend",
    icon: Layers,
    title: "Frontend Architecture & UI Engineering",
    subtitle: "Fluid, high-performance interfaces built for scale",
    description:
      "Crafting responsive web applications with state-of-the-art React and Next.js architectures, fluid micro-interactions, robust state stores, and sub-second page transitions.",
    focusAreas: [
      "Server-Side Rendering (SSR) & Static Site Generation (SSG)",
      "Design systems, fluid micro-interactions & accessibility",
      "Modular state management & reactive data caching",
      "Cross-browser performance & responsive layouts",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand"],
  },
  {
    id: "backend",
    icon: Cpu,
    title: "Backend & Distributed Systems",
    subtitle: "Resilient APIs and scalable data pipelines",
    description:
      "Designing high-concurrency microservices, clean architecture REST and GraphQL APIs, caching layers, and database schemas engineered for reliability and zero downtime.",
    focusAreas: [
      "RESTful & GraphQL API design with clean layered architecture",
      "Database schema modeling, indexing & optimization (SQL & NoSQL)",
      "High-throughput caching and in-memory stores with Redis",
      "JWT / OAuth authentication, RBAC & security compliance",
    ],
    techStack: [
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    id: "cloud-devops",
    icon: Cloud,
    title: "Cloud Infrastructure & CI/CD Pipelines",
    subtitle: "Automated, observable, and containerized deployments",
    description:
      "Setting up automated continuous integration and continuous deployment pipelines, Docker containerization, and cloud hosting infrastructure built for 99.9% uptime.",
    focusAreas: [
      "Automated GitHub Actions CI/CD workflows",
      "Docker containerization & multi-stage build optimization",
      "Cloud deployments on AWS, Vercel, and modern edge platforms",
      "Uptime monitoring, error tracing & centralized logging",
    ],
    techStack: ["Docker", "GitHub Actions", "AWS", "Vercel", "Linux"],
  },
  {
    id: "performance",
    icon: Zap,
    title: "Performance Optimization & System Auditing",
    subtitle: "Sub-second TTFB and green Core Web Vitals",
    description:
      "Profiling codebases, resolving memory leaks, optimizing database queries, and streamlining JavaScript bundles to ensure blisteringly fast load times and high conversions.",
    focusAreas: [
      "Lighthouse 95+ Core Web Vitals optimization (LCP, FID, CLS)",
      "JavaScript bundle splitting, tree-shaking & lazy loading",
      "Database query execution analysis & indexing strategy",
      "Code quality audits & technical debt refactoring",
    ],
    techStack: ["Lighthouse", "Web Vitals", "Turbopack", "Profiling Tools"],
  },
];

const PRINCIPLES = [
  {
    icon: Terminal,
    title: "Type Safety & Clean Code",
    description:
      "Strict TypeScript end-to-end with clear architectural boundaries, predictable data contracts, and maintainable modular code.",
  },
  {
    icon: Zap,
    title: "Performance by Default",
    description:
      "Zero unnecessary bloat. Optimized bundle sizes, efficient database querying, and asset caching for instant response times.",
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description:
      "Automated linting, testing, and continuous deployment so every commit is verified before hitting production.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Reliability",
    description:
      "Sanitized inputs, robust authentication flows, rate limiting, and defensive error handling across all system boundaries.",
  },
];

export function ServicesView() {
  const { data: skills = [] } = useSkills();

  // Group backend skills by category
  const categorizedSkills = skills.reduce(
    (acc, skill) => {
      const cat = skill.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, ISkill[]>,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 space-y-20 sm:space-y-28">
      {/* ─────────────────────────────────────────────────────────────
          1. EXPERTISE HERO & HEADER
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <ChromeSparkleIcon className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Services & Technical Capabilities
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Architecting for <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-500">
                Scale & Reliability.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              High-caliber technical execution across all layers of the stack.
              From rapid MVP deployments to enterprise cloud architectures and
              scalable backend microservices.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CORE DISCIPLINES
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="border-b border-border/80 pb-4">
          <div className="flex items-center gap-2 text-primary pb-1">
            <ChromeSparkleIcon className="w-3.5 h-3.5" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              Disciplines
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Core Engineering Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DISCIPLINES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-5 hover:border-primary/40 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground font-semibold">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-primary font-mono font-medium">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-border/60 space-y-2">
                  <span className="text-[11px] font-mono uppercase text-foreground font-semibold block">
                    Core Focus:
                  </span>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    {item.focusAreas.map((area) => (
                      <li key={area} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-1.5">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-muted text-[11px] font-mono text-muted-foreground font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. COMPLETE TECH STACK MATRIX (Dynamic from Backend)
      ───────────────────────────────────────────────────────────── */}
      {skills.length > 0 && (
        <section className="space-y-8">
          <div className="border-b border-border/80 pb-4">
            <div className="flex items-center gap-2 text-primary pb-1">
              <Code2 className="w-3.5 h-3.5" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                Technologies
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Technical Stack & Tooling
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categorizedSkills).map(([category, catSkills]) => (
              <div
                key={category}
                className="p-6 rounded-3xl bg-card border border-border space-y-4"
              >
                <h3 className="text-sm font-bold text-foreground capitalize flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>{category}</span>
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {catSkills.map((skill) => (
                    <span
                      key={skill._id || skill.name}
                      className="px-2.5 py-1 rounded-lg bg-muted text-xs font-mono text-foreground font-medium border border-border/60"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. ENGINEERING PRINCIPLES & STANDARDS
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="border-b border-border/80 pb-4">
          <div className="flex items-center gap-2 text-primary pb-1">
            <Workflow className="w-3.5 h-3.5" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              Standards
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            How I Build Software
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="p-6 rounded-3xl bg-card border border-border space-y-3"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-foreground">
                  {principle.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
