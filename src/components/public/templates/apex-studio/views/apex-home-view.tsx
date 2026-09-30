"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
import { IPublicPortfolioBundle, IProject } from "@/interfaces";
import { ArrowUpRight } from "lucide-react";

interface ApexHomeViewProps {
  bundle: IPublicPortfolioBundle;
}

const editorialContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const editorialItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ApexParallaxProjectCard({
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

  const imageY = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.12, 1.06, 1.12]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group space-y-4"
    >
      <Link
        href={`/${portfolioSlug}/projects/${project.slug || project._id}`}
        className="aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 dark:bg-white/5 relative border border-stone-200 dark:border-white/10 shadow-xs block"
      >
        {project.thumbnailUrl ? (
          <motion.img
            style={{ y: imageY, scale: imageScale }}
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 will-change-transform"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900/80 text-stone-400 dark:text-stone-500 gap-3 p-4">
            <div className="w-12 h-12 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-stone-50 dark:bg-stone-800">
              APEX
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest font-semibold opacity-70">
              {project.category || "Exhibition Build"}
            </span>
          </div>
        )}
        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-stone-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md z-10">
          {project.category || "Featured"}
        </span>
      </Link>
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold">
            {project.category}
          </span>
          <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            <Link href={`/${portfolioSlug}/projects/${project.slug || project._id}`}>
              {project.title}
            </Link>
          </h3>
        </div>
        <Link
          href={`/${portfolioSlug}/projects/${project.slug || project._id}`}
          className="text-xs font-mono text-stone-500 dark:text-white/50 hover:text-stone-900 dark:hover:text-white"
        >
          Case Study &rarr;
        </Link>
      </div>
    </motion.div>
  );
}

export function ApexHomeView({ bundle }: ApexHomeViewProps) {
  const { portfolio, profile, projects, testimonials } = bundle;

  const headline = profile?.headline || "Creative Technologist & Interface Architect";
  const bio = profile?.bio || "Crafting tactile digital experiences, bespoke interactive systems, and spatial interfaces.";
  const location = profile?.location || "Worldwide";

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 50]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0.1]);

  return (
    <div className="space-y-28 pb-20">
      {/* HERO WITH EDITORIAL SCROLL PARALLAX */}
      <section ref={heroRef} className="px-6 lg:px-12 max-w-7xl mx-auto pt-16 sm:pt-24 space-y-10">
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          variants={editorialContainer}
          initial="hidden"
          animate="visible"
          className="space-y-6 max-w-4xl"
        >
          <motion.span
            variants={editorialItem}
            className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold block"
          >
            Creative Technologist &bull; {location}
          </motion.span>
          <motion.h1
            variants={editorialItem}
            className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-stone-900 dark:text-white"
          >
            {headline}
          </motion.h1>
          <motion.p
            variants={editorialItem}
            className="text-base sm:text-xl text-stone-600 dark:text-white/60 leading-relaxed max-w-2xl font-light"
          >
            {bio}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href={`/${portfolio.slug}/projects`}
              className="px-8 py-4 rounded-full bg-amber-500 dark:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-400 dark:hover:bg-amber-300 transition-colors shadow-md shadow-amber-500/20 block"
            >
              View Selected Works
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href={`/${portfolio.slug}/about`}
              className="px-8 py-4 rounded-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/15 text-stone-900 dark:text-white font-bold text-xs uppercase tracking-widest hover:bg-stone-100 dark:hover:bg-white/10 transition-colors shadow-xs block"
            >
              Creative Practice
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED WORKS WITH INNER PARALLAX */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12 border-t border-stone-200 dark:border-white/10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
              Selected Works
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-stone-900 dark:text-white">
              Case Studies
            </h2>
          </div>
          <Link
            href={`/${portfolio.slug}/projects`}
            className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase hover:underline font-semibold"
          >
            All Works &rarr;
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.slice(0, 4).map((project, idx) => (
            <ApexParallaxProjectCard
              key={project._id}
              project={project}
              portfolioSlug={portfolio.slug}
              index={idx}
            />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS & ENDORSEMENTS */}
      {testimonials && testimonials.length > 0 && (
        <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 dark:border-white/10 pb-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
                Critical Endorsements
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
                Client &amp; Peer Perspectives
              </h2>
            </div>
            <Link
              href={`/${portfolio.slug}/about`}
              className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase hover:underline font-semibold"
            >
              All Feedback &rarr;
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => {
              const projRef = typeof t.projectRef === "object" && t.projectRef ? t.projectRef : null;
              const indexFormatted = String(idx + 1).padStart(2, "0");

              return (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-8 sm:p-10 rounded-3xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-6 flex flex-col justify-between relative group hover:border-amber-500/40 transition-all shadow-xs"
                >
                  <div className="space-y-4 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold tracking-widest">
                        {indexFormatted} // VERIFIED AUDIT
                      </span>
                      {t.linkedInUrl && (
                        <a
                          href={t.linkedInUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="text-base sm:text-lg font-light leading-relaxed text-stone-800 dark:text-stone-200 font-serif italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-stone-200 dark:border-white/10">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wider text-stone-900 dark:text-white">
                        {t.clientName}
                      </h4>
                      <p className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold pt-0.5">
                        {t.clientRole} {t.company ? `— ${t.company}` : ""}
                      </p>
                    </div>

                    {projRef && (
                      <div className="pt-1">
                        <Link
                          href={`/${portfolio.slug}/projects/${projRef.slug || projRef._id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                        >
                          <span>Commissioned for: {projRef.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
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
    </div>
  );
}
