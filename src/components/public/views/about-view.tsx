"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  useProfile,
  useExperiences,
  useSkills,
  useTestimonials,
} from "@/hooks";
import { IExperience } from "@/interfaces";
import {
  ArrowUpRight,
  ExternalLink,
  MapPin,
  Briefcase,
  Layers,
  Award,
  Users,
  GitCommit,
  Quote,
  Download,
} from "lucide-react";
import {
  ChromeSparkleIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/ui/icons";
import { formatMonthYear } from "@/lib/date.utils";

export function AboutView() {
  const { data: profile } = useProfile();
  const { data: experiences = [] } = useExperiences();
  const { data: skills = [] } = useSkills();
  const { data: testimonials = [] } = useTestimonials();

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "Portfolio";
  const fullName = profile ? `${firstName} ${lastName}`.trim() : "Developer Portfolio";
  const bio =
    profile?.bio ||
    "I engineer high-throughput systems, resilient web architectures, and high-performance digital flagships.";
  const location = profile?.location || "Remote";
  const avatarUrl = profile?.avatarUrl || "";
  const resumeUrl = profile?.resumeUrl || "";
  const aboutMarkdown = profile?.aboutMarkdown || "";

  const stats = profile?.stats || {
    yearsExperience: 6,
    completedProjects: 40,
    happyClients: 25,
    codeCommits: 1200,
  };

  // Group skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  skills.forEach((skill) => {
    const category = skill.category || "General";
    if (!skillsByCategory[category]) {
      skillsByCategory[category] = [];
    }
    skillsByCategory[category].push(skill);
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 space-y-20 sm:space-y-28">
      {/* ─────────────────────────────────────────────────────────────
          1. ABOUT HERO & MASTER PORTRAIT
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <ChromeSparkleIcon className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            About & Career Journey
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="space-y-3 max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
              Engineering with <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-500">
                Precision & Clarity.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 border border-border text-xs font-mono text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>{location}</span>
              </span>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume (PDF)</span>
                </a>
              )}
            </div>
          </div>

          {/* Master Portrait Frame */}
          <div className="relative w-48 h-56 sm:w-64 sm:h-72 rounded-3xl border-2 border-border bg-card p-2 shadow-2xl shrink-0">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={fullName}
                fill
                className="object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-muted flex items-center justify-center text-4xl font-black text-primary">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. NUMERICAL IMPACT HIGHLIGHTS
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-1 text-center">
          <p className="text-3xl sm:text-4xl font-black text-primary font-mono">
            {stats.yearsExperience}+
          </p>
          <p className="text-xs font-semibold text-foreground">
            Years Experience
          </p>
          <p className="text-[11px] text-muted-foreground font-mono">
            In full-stack & cloud
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-1 text-center">
          <p className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono">
            {stats.completedProjects}+
          </p>
          <p className="text-xs font-semibold text-foreground">
            Projects Delivered
          </p>
          <p className="text-[11px] text-muted-foreground font-mono">
            Production flagships
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-1 text-center">
          <p className="text-3xl sm:text-4xl font-black text-indigo-500 font-mono">
            {stats.happyClients}+
          </p>
          <p className="text-xs font-semibold text-foreground">
            Satisfied Clients
          </p>
          <p className="text-[11px] text-muted-foreground font-mono">
            Founders & teams
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-1 text-center">
          <p className="text-3xl sm:text-4xl font-black text-amber-500 font-mono">
            {stats.codeCommits}+
          </p>
          <p className="text-xs font-semibold text-foreground">Code Commits</p>
          <p className="text-[11px] text-muted-foreground font-mono">
            GitHub contributions
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. BACKGROUND NARRATIVE & PHILOSOPHY
      ───────────────────────────────────────────────────────────── */}
      {aboutMarkdown && (
        <section className="p-8 sm:p-12 rounded-3xl bg-card/60 dark:bg-card/40 border border-border space-y-6">
          <div className="flex items-center gap-2 text-primary pb-2 border-b border-border/60">
            <ChromeSparkleIcon className="w-4 h-4" />
            <h2 className="text-lg font-bold text-foreground">
              The Background Story
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-line space-y-4 font-sans">
            {aboutMarkdown}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. COMPLETE CAREER JOURNEY & TIMELINE
      ───────────────────────────────────────────────────────────── */}
      {experiences.length > 0 && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2 text-primary pb-1">
                <ChromeSparkleIcon className="w-3.5 h-3.5" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                  Experience Record
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Work Experience & Leadership Milestones
              </h2>
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              {experiences.length} tracked roles
            </p>
          </div>

          <div className="relative border-l-2 border-border ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
            {experiences.map((exp: IExperience) => (
              <div key={exp._id} className="relative group">
                <span className="absolute -left-[32px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:scale-125 transition-transform" />

                <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 hover:border-primary/50 transition-colors space-y-3 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {exp.role}{" "}
                        <span className="text-primary">@ {exp.company}</span>
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono">
                        {exp.location || "Remote"} •{" "}
                        {exp.employmentType || "Full-time"}
                      </p>
                    </div>

                    <span className="text-xs font-mono font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 self-start sm:self-auto">
                      {formatMonthYear(exp.startDate) || exp.startDate} —{" "}
                      {exp.isCurrent
                        ? "Present"
                        : formatMonthYear(exp.endDate) || exp.endDate}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {exp.summary}
                  </p>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/60">
                      {exp.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-lg bg-muted text-[11px] font-mono text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. CATEGORIZED SKILLS & COMPETENCIES MATRIX
      ───────────────────────────────────────────────────────────── */}
      {skills.length > 0 && (
        <section className="space-y-8">
          <div className="border-b border-border pb-4">
            <div className="flex items-center gap-2 text-primary pb-1">
              <ChromeSparkleIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                Technical Matrix
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Skills, Frameworks & Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Object.entries(skillsByCategory).map(([category, items]) => (
              <div
                key={category}
                className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4"
              >
                <h3 className="text-sm font-bold text-foreground uppercase font-mono tracking-wider text-primary">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill._id}
                      className="px-3 py-1.5 rounded-xl bg-muted/70 hover:bg-muted border border-border/70 text-xs font-medium text-foreground transition-colors"
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
    </div>
  );
}
