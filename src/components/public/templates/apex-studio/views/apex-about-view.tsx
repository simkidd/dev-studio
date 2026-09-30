"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { ArrowUpRight, FileText } from "lucide-react";
import { formatMonthYear } from "@/lib/date.utils";

interface ApexAboutViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ApexAboutView({ bundle }: ApexAboutViewProps) {
  const { profile, experiences, skills } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const bio = profile?.bio || "Crafting tactile digital experiences, bespoke interactive systems, and spatial interfaces.";

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
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 space-y-20">
      {/* BIO HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6 max-w-3xl"
      >
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
          About
        </span>
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
          About Me
        </h1>
        <p className="text-lg text-stone-600 dark:text-white/70 font-light leading-relaxed">
          {profile?.aboutMarkdown || bio}
        </p>

        {profile?.resumeUrl && (
          <div className="pt-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV / Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        )}
      </motion.div>

      {/* CAPABILITIES & TOOLING */}
      {skills && skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="space-y-8 border-t border-stone-200 dark:border-white/10 pt-16"
        >
          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
              Capabilities &amp; Stack
            </span>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-stone-900 dark:text-white">
              Technical Tooling
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -4 }}
                className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center gap-3 shadow-xs hover:border-amber-500/40 transition-colors"
              >
                <TechIcon name={skill.name} icon={skill.icon} className="w-5 h-5 text-amber-500" />
                <div className="min-w-0">
                  <span className="text-xs font-bold uppercase text-stone-900 dark:text-white block truncate">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 dark:text-white/40 block truncate">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CAREER ENGAGEMENTS */}
      {experiences && experiences.length > 0 && (
        <div ref={timelineRef} className="space-y-10 border-t border-stone-200 dark:border-white/10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="space-y-1"
          >
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
              Track Record
            </span>
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-stone-900 dark:text-white">
              Selected Engagements
            </h2>
          </motion.div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-200 dark:border-white/10 space-y-10 ml-3 sm:ml-4">
            {/* Dynamic Animated Scroll Progress Line */}
            <motion.div
              style={{ scaleY: timelineScaleY, originY: 0 }}
              className="absolute left-[-2px] top-0 bottom-0 w-0.5 bg-amber-500"
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
                  {/* Timeline Amber Node Marker */}
                  {exp.isCurrent ? (
                    <span className="absolute -left-[31px] sm:-left-[39px] top-2 flex h-4 w-4 z-10">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-[#fafaf9] dark:border-[#09090b]" />
                    </span>
                  ) : (
                    <span className="absolute -left-[29px] sm:-left-[37px] top-2.5 w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 border-2 border-[#fafaf9] dark:border-[#09090b] group-hover:bg-amber-500 transition-colors z-10" />
                  )}

                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 group-hover:border-amber-500/40 transition-all space-y-4 shadow-xs"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold uppercase text-stone-900 dark:text-white">
                            {exp.role} <span className="text-amber-600 dark:text-amber-400 font-normal">/ {exp.company}</span>
                          </h3>
                          {exp.employmentType && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-600 dark:text-white/60 uppercase">
                              {exp.employmentType}
                            </span>
                          )}
                          {exp.isCurrent && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-semibold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        {exp.location && (
                          <div className="text-xs text-stone-500 dark:text-white/50 font-light">
                            {exp.location} {exp.isRemote ? "(Remote)" : ""}
                          </div>
                        )}
                      </div>

                      <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {startFormatted} &mdash; {endFormatted}
                      </span>
                    </div>

                    {exp.summary && (
                      <p className="text-sm text-stone-600 dark:text-white/70 font-light leading-relaxed">
                        {exp.summary}
                      </p>
                    )}

                    {/* Key Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-1.5 pt-1">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="text-xs text-stone-600 dark:text-white/75 flex items-start gap-2">
                            <span className="text-amber-500 font-bold mt-0.5">&bull;</span>
                            <span className="leading-relaxed font-light">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100 dark:border-white/5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-mono bg-stone-50 dark:bg-white/5 text-stone-700 dark:text-white/70 border border-stone-200/60 dark:border-white/10"
                          >
                            <TechIcon name={tech} className="w-3 h-3 text-amber-500" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
