"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle, IProject } from "@/interfaces";
import { ExternalLink, ArrowUpRight } from "lucide-react";

interface ClassicProjectsViewProps {
  bundle: IPublicPortfolioBundle;
}

function ClassicParallaxProjectCard({
  project,
  portfolioSlug,
  index,
}: {
  project: IProject;
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

  const imgY = useTransform(smoothProgress, [0, 1], [-14, 14]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-colors shadow-xs hover:shadow-2xl flex flex-col justify-between"
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
        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-background/90 text-foreground backdrop-blur-md border border-border/80 shadow-xs z-10">
          {project.category || "Full-Stack"}
        </span>
      </Link>

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            <Link href={`/${portfolioSlug}/projects/${project.slug || project._id}`}>
              {project.title}
            </Link>
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-border/50">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <Link
              href={`/${portfolioSlug}/projects/${project.slug || project._id}`}
              className="font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-[11px] transition-colors"
              >
                <span>Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ClassicProjectsView({ bundle }: ClassicProjectsViewProps) {
  const { portfolio, projects } = bundle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 max-w-3xl"
      >
        <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
          Portfolio
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Projects
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          A collection of web applications, systems, and open-source tools I&apos;ve built.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <ClassicParallaxProjectCard
            key={project._id}
            project={project}
            portfolioSlug={portfolio.slug}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
