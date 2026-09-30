"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { Download, Terminal, Cpu, ShieldCheck, Activity } from "lucide-react";
import { formatMonthYear } from "@/lib/date.utils";

interface NovaAboutViewProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaAboutView({ bundle }: NovaAboutViewProps) {
  const { profile, experiences, skills } = bundle;
  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const bio = profile?.bio || "I build high-throughput applications and modern digital experiences.";

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 50%"],
  });
  const smoothTimelineProgress = useSpring(timelineProgress, { stiffness: 200, damping: 30 });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10 font-mono">
      {/* Top Standalone Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 max-w-3xl"
      >
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          $ whoami --verbose --diagnostics
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          About Me
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Background, architectural focus, and runtime telemetry for {fullName}.
        </p>
      </motion.div>

      {/* 1. OPERATOR OVERVIEW CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6 font-sans shadow-xs relative overflow-hidden backdrop-blur-md"
      >
        {/* Subtle scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.02)_51%)] bg-[length:100%_4px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800 relative z-10">
          <div className="space-y-1.5 font-mono">
            <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold block flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              [IDENTIFIER: SYSTEM_OPERATOR // AUTH_OK]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono">
              {fullName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{profile?.headline}</p>
          </div>

          {profile?.avatarUrl && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="shrink-0"
            >
              <img
                src={profile.avatarUrl}
                alt={fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-cyan-500/40 shadow-lg shadow-cyan-500/10"
              />
            </motion.div>
          )}
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans relative z-10">
          {profile?.aboutMarkdown || bio}
        </p>

        {profile?.resumeUrl && (
          <div className="pt-2 font-mono relative z-10">
            <motion.a
              whileHover={{ scale: 1.03, x: 2 }}
              whileTap={{ scale: 0.97 }}
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>$ fetch --payload=resume.pdf</span>
            </motion.a>
          </div>
        )}
      </motion.div>

      {/* 2. INSTALLED PACKAGES / SKILLS SECTION */}
      {skills && skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5 font-mono shadow-xs backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <Terminal className="w-4 h-4" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                $ dpkg-query -l --status=active
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">{skills.length} packages active</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
                whileHover={{ y: -2, borderColor: "rgba(6,182,212,0.6)" }}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 transition-colors cursor-default"
              >
                <TechIcon name={skill.name} icon={skill.icon} className="w-4 h-4 text-cyan-500" />
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white block truncate">
                    {skill.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                    {skill.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 3. KERNEL MILESTONES / EXPERIENCE TIMELINE */}
      {experiences && experiences.length > 0 && (
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6 font-mono shadow-xs backdrop-blur-md relative"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <Cpu className="w-4 h-4" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                $ systemctl status --milestones
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-cyan-500" />
              chronological telemetry
            </span>
          </div>

          <div className="relative pl-6 sm:pl-7 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 ml-2 sm:ml-3">
            {/* Dynamic animated progress line over the border */}
            <motion.div
              style={{ scaleY: smoothTimelineProgress, originY: 0 }}
              className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 to-indigo-500"
            />

            {experiences.map((exp, idx) => {
              const startFormatted = formatMonthYear(exp.startDate) || exp.startDate;
              const endFormatted = exp.isCurrent ? "NOW" : formatMonthYear(exp.endDate) || exp.endDate;

              return (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="relative group space-y-2"
                >
                  {/* Node Terminal Dot */}
                  {exp.isCurrent ? (
                    <span className="absolute -left-[31px] sm:-left-[35px] top-2 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-slate-900" />
                    </span>
                  ) : (
                    <span className="absolute -left-[29px] sm:-left-[33px] top-2.5 w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-700 border-2 border-slate-900 group-hover:bg-cyan-500 transition-colors" />
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-mono group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {exp.role}
                      </span>
                      <span className="text-xs text-slate-400">&bull;</span>
                      <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                        {exp.company}
                      </span>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 font-mono">
                      [{startFormatted} &rarr; {endFormatted}]
                    </span>
                  </div>

                  {exp.summary && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                      {exp.summary}
                    </p>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
