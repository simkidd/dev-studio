"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { ChromeSparkleIcon, GithubIcon } from "@/components/ui/icons";
import {
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Briefcase,
  Layers,
  Quote,
  Send,
} from "lucide-react";
import { formatMonthYear } from "@/lib/date.utils";

interface ClassicHomeViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ClassicHomeView({ bundle }: ClassicHomeViewProps) {
  const { portfolio, profile, projects, experiences, skills, testimonials } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const headline = profile?.headline || "Full-Stack Engineer & Systems Architect";
  const bio = profile?.bio || "I build high-throughput applications and modern digital experiences.";
  const location = profile?.location || "Remote";

  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 4);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ─────────────────────────────────────────────────────────────
          1. MEGA HEADLINE HERO
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 sm:pt-32 pb-12 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 border border-border/80 text-xs font-medium text-muted-foreground backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Based in {location} &bull; Open for worldwide contracts</span>
            </div>

            {/* Mega Headline with Chrome Sparkles */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
                <span className="inline-flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
                  <span>{headline}</span>
                  <ChromeSparkleIcon className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary animate-pulse inline-block" />
                </span>
              </h1>
            </div>

            {/* Bio Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
              {bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <Link
                href={`/${portfolio.slug}/projects`}
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-lg shadow-primary/20 hover:opacity-95 transition-all flex items-center gap-2"
              >
                <span>Explore Showcase</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href={`/${portfolio.slug}/contact`}
                className="px-6 py-3 rounded-full bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-semibold border border-border transition-all flex items-center gap-2 shadow-xs"
              >
                <span>Direct Inquiries</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURED CASE STUDIES
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                Curated Works
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Featured Case Studies
              </h2>
            </div>
            <Link
              href={`/${portfolio.slug}/projects`}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View all projects ({projects.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayProjects.map((project) => (
              <div
                key={project._id}
                className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <Link
                  href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
                  className="aspect-16/10 w-full overflow-hidden bg-muted relative block group/img"
                >
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-muted to-primary/10 text-muted-foreground gap-2 p-4 text-center">
                      <div className="w-10 h-10 rounded-2xl bg-background/80 border border-border flex items-center justify-center shadow-xs">
                        <ArrowUpRight className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[11px] font-mono opacity-70 font-medium">Case Study Preview</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-background/90 text-foreground backdrop-blur-md border border-border/80 shadow-xs">
                      {project.category || "Full-Stack"}
                    </span>
                  </div>
                </Link>

                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      <Link href={`/${portfolio.slug}/projects/${project.slug || project._id}`}>
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-muted text-muted-foreground"
                        >
                          <TechIcon name={tech} className="w-3 h-3 text-primary" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                      <Link
                        href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
                        className="font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <span>Inspect Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                        >
                          <span>Live</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CAREER MILESTONES & SKILL STACK
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Career Milestones */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                  Track Record
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  Career History
                </h2>
              </div>
              <Link
                href={`/${portfolio.slug}/about`}
                className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Full Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="relative pl-6 sm:pl-7 border-l-2 border-primary/20 space-y-8 ml-2 sm:ml-3">
              {experiences.map((exp) => {
                const startFormatted = formatMonthYear(exp.startDate) || exp.startDate;
                const endFormatted = exp.isCurrent ? "Present" : formatMonthYear(exp.endDate) || exp.endDate;

                return (
                  <div key={exp._id} className="relative group">
                    {/* Node Dot */}
                    {exp.isCurrent ? (
                      <span className="absolute -left-[31px] sm:-left-[35px] top-1.5 flex h-3.5 w-3.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary border-2 border-background shadow-xs" />
                      </span>
                    ) : (
                      <span className="absolute -left-[29px] sm:-left-[33px] top-2 w-2.5 h-2.5 rounded-full bg-muted-foreground/40 border-2 border-background ring-1 ring-border group-hover:bg-primary transition-colors" />
                    )}

                    <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all space-y-2 shadow-xs">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-foreground">
                          {exp.role} &bull; <span className="text-primary">{exp.company}</span>
                        </h3>
                        <span className="text-xs font-mono text-muted-foreground">
                          {startFormatted} – {endFormatted}
                        </span>
                      </div>
                      {exp.summary && (
                        <p className="text-xs text-muted-foreground leading-relaxed">{exp.summary}</p>
                      )}

                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-1 pt-1">
                          {exp.achievements.slice(0, 2).map((ach, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-primary font-bold mt-0.5">&bull;</span>
                              <span className="leading-relaxed line-clamp-2">{ach}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core Technologies */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                Proficiencies
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Technical Stack
              </h2>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-xs">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill._id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-muted text-foreground border border-border/40"
                  >
                    <TechIcon name={skill.name} className="w-3.5 h-3.5 text-primary" />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. TESTIMONIALS (IF ANY)
      ───────────────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-primary font-semibold uppercase tracking-widest">
              Social Proof &amp; Endorsements
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Peer &amp; Leadership Endorsements
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Direct recommendations and verified feedback from engineering leaders, product managers, and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => {
              const projRef = typeof t.projectRef === "object" && t.projectRef ? t.projectRef : null;
              const initials = t.clientName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <div
                  key={t._id}
                  className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 hover:border-primary/40 transition-all shadow-xs hover:shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <div className="w-9 h-9 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
                        <Quote className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-muted border border-border/60 text-muted-foreground">
                        Verified Review
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border/60">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-mono text-xs font-bold shadow-xs">
                          {initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs sm:text-sm font-bold text-foreground">
                              {t.clientName}
                            </h4>
                            {t.linkedInUrl && (
                              <a
                                href={t.linkedInUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="LinkedIn"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            {t.clientRole} {t.company ? `@ ${t.company}` : ""}
                          </p>
                        </div>
                      </div>

                      {t.companyUrl && (
                        <a
                          href={t.companyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1 hidden sm:flex"
                        >
                          <span>{t.company}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {projRef && (
                      <div className="pt-1">
                        <Link
                          href={`/${portfolio.slug}/projects/${projRef.slug || projRef._id}`}
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          <span>Case study: {projRef.title}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM INQUIRY TEASER
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-primary/10 via-card to-card border border-primary/20 text-center space-y-6 shadow-xl">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
            Open For Collaborations
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground max-w-xl mx-auto">
            Ready to engineer your next mission-critical platform?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
            Reach out directly for architecture sprints, full-stack builds, and advisory contracts.
          </p>
          <div className="pt-2">
            <Link
              href={`/${portfolio.slug}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-md shadow-primary/25 hover:opacity-95 transition-opacity"
            >
              <span>Initiate Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
