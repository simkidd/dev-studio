"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import {
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Quote,
  FileText,
} from "lucide-react";
import { formatMonthYear } from "@/lib/date.utils";

interface ClassicHomeViewProps {
  bundle: IPublicPortfolioBundle;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ClassicParallaxProjectCard({
  project,
  portfolioSlug,
  index,
}: {
  project: any;
  portfolioSlug: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const imgY = useTransform(smoothProgress, [0, 1], [-15, 15]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-colors duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between"
    >
      <Link
        href={`/${portfolioSlug}/projects/${project.slug || project._id}`}
        className="aspect-16/10 w-full overflow-hidden bg-muted relative block group/img"
      >
        {project.thumbnailUrl ? (
          <motion.img
            style={{ y: imgY, scale: 1.08 }}
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 will-change-transform"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-muted to-primary/10 text-muted-foreground gap-2 p-4 text-center">
            <div className="w-10 h-10 rounded-2xl bg-background/80 border border-border flex items-center justify-center shadow-xs">
              <ArrowUpRight className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[11px] font-mono opacity-70 font-medium">Case Study Preview</span>
          </div>
        )}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-background/90 text-foreground backdrop-blur-md border border-border/80 shadow-xs">
            {project.category || "Full-Stack"}
          </span>
        </div>
      </Link>

      <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            <Link href={`/${portfolioSlug}/projects/${project.slug || project._id}`}>
              {project.title}
            </Link>
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.summary}
          </p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-muted text-muted-foreground"
              >
                <TechIcon name={tech} className="w-3 h-3 text-primary" />
                <span>{tech}</span>
              </motion.span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
            <Link
              href={`/${portfolioSlug}/projects/${project.slug || project._id}`}
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
                className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <span>Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ClassicHomeView({ bundle }: ClassicHomeViewProps) {
  const { portfolio, profile, projects, experiences, skills, testimonials } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Developer";
  const headline = profile?.headline || "Software Engineer & Interface Architect";
  const bio = profile?.bio || "I build high-throughput applications, distributed backends, and modern digital experiences.";
  const location = profile?.location || "Remote";

  const featuredProjects = projects.filter((p) => p.isFeatured).slice(0, 4);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 40]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.2]);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"],
  });
  const timelineScaleY = useSpring(timelineProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN CLASSIC CENTERED HERO WITH SCROLL PARALLAX
      ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-20 sm:pt-28 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center space-y-6"
          >
            {/* Intro / Location (Clean typography, unboxed) */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground font-medium"
            >
              <span className="text-foreground font-semibold">{fullName}</span>
              <span className="text-muted-foreground/60">•</span>
              <span>Based in {location}</span>
            </motion.div>

            {/* Headline & Bio */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
                {headline}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
                {bio}
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-3 pt-2"
            >
              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${portfolio.slug}/projects`}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-semibold shadow-md shadow-primary/20 hover:opacity-95 transition-all flex items-center gap-2"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={`/${portfolio.slug}/contact`}
                  className="px-6 py-3 rounded-full bg-card hover:bg-muted text-foreground text-xs sm:text-sm font-semibold border border-border transition-colors flex items-center gap-2 shadow-2xs"
                >
                  <span>Get in Touch</span>
                </Link>
              </motion.div>

              {profile?.resumeUrl && (
                <motion.a
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground text-xs sm:text-sm font-semibold border border-border/60 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURED CASE STUDIES WITH INNER SCROLL PARALLAX
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60 pb-6"
          >
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
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 group"
            >
              <span>View all projects ({projects.length})</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayProjects.map((project, idx) => (
              <ClassicParallaxProjectCard
                key={project._id}
                project={project}
                portfolioSlug={portfolio.slug}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CAREER MILESTONES & SKILL STACK
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Career Milestones with Scroll Progress Line */}
          <div ref={timelineRef} className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="flex items-end justify-between"
            >
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
                className="text-xs font-mono text-primary hover:underline flex items-center gap-1 font-semibold group"
              >
                <span>Full Profile</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <div className="relative pl-6 sm:pl-7 border-l-2 border-border/40 space-y-8 ml-2 sm:ml-3">
              {/* Dynamic Animated Scroll Progress Line */}
              <motion.div
                style={{ scaleY: timelineScaleY, originY: 0 }}
                className="absolute left-[-2px] top-0 bottom-0 w-0.5 bg-primary"
              />

              {experiences.map((exp, idx) => {
                const startFormatted = formatMonthYear(exp.startDate) || exp.startDate;
                const endFormatted = exp.isCurrent ? "Present" : formatMonthYear(exp.endDate) || exp.endDate;

                return (
                  <motion.div
                    key={exp._id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45, delay: idx * 0.08 }}
                    className="relative group"
                  >
                    {/* Node Dot */}
                    {exp.isCurrent ? (
                      <span className="absolute -left-[31px] sm:-left-[35px] top-1.5 flex h-3.5 w-3.5 z-10">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary border-2 border-background shadow-xs" />
                      </span>
                    ) : (
                      <span className="absolute -left-[29px] sm:-left-[33px] top-2 w-2.5 h-2.5 rounded-full bg-muted-foreground/40 border-2 border-background ring-1 ring-border group-hover:bg-primary transition-colors z-10" />
                    )}

                    <motion.div
                      whileHover={{ y: -2 }}
                      className="p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors space-y-2 shadow-xs"
                    >
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
                          {exp.achievements.slice(0, 2).map((ach, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-primary font-bold mt-0.5">&bull;</span>
                              <span className="leading-relaxed line-clamp-2">{ach}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Core Technologies */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="space-y-1"
            >
              <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                Proficiencies
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Technical Stack
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-3xl bg-card border border-border space-y-4 shadow-xs"
            >
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <motion.span
                    key={skill._id}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-muted text-foreground border border-border/40 cursor-default shadow-2xs hover:border-primary/40 hover:bg-muted/80 transition-colors"
                  >
                    <TechIcon name={skill.name} className="w-3.5 h-3.5 text-primary" />
                    <span>{skill.name}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. TESTIMONIALS (IF ANY)
      ───────────────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="space-y-2 text-center max-w-2xl mx-auto"
          >
            <span className="text-xs font-mono text-primary font-semibold uppercase tracking-widest">
              Social Proof &amp; Endorsements
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Peer &amp; Leadership Endorsements
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Direct recommendations and verified feedback from engineering leaders, product managers, and clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => {
              const projRef = typeof t.projectRef === "object" && t.projectRef ? t.projectRef : null;
              const initials = t.clientName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
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
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM INQUIRY TEASER
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-linear-to-tr from-primary/10 via-card to-card border border-primary/20 text-center space-y-6 shadow-xl"
        >
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
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href={`/${portfolio.slug}/contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-md shadow-primary/25 hover:opacity-95 transition-opacity"
              >
                <span>Initiate Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
