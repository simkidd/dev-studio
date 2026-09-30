"use client";

import React from "react";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { Download, Terminal, Cpu, FileText } from "lucide-react";
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10 font-mono">
      {/* Top Standalone Page Header */}
      <div className="space-y-2 max-w-3xl">
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">
          $ whoami --verbose
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          About Me
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Background, experience, and core technical stack for {fullName}.
        </p>
      </div>

      {/* 1. OPERATOR OVERVIEW CARD */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6 font-sans shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1.5 font-mono">
            <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold block">
              [IDENTIFIER: SYSTEM_OPERATOR]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono">
              {fullName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{profile?.headline}</p>
          </div>

          {profile?.avatarUrl && (
            <div className="shrink-0">
              <img
                src={profile.avatarUrl}
                alt={fullName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-cyan-500/30 shadow-md"
              />
            </div>
          )}
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          {profile?.aboutMarkdown || bio}
        </p>

        {profile?.resumeUrl && (
          <div className="pt-2 font-mono">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>$ fetch --payload=resume.pdf</span>
            </a>
          </div>
        )}
      </div>

      {/* 2. INSTALLED PACKAGES / SKILLS SECTION */}
      {skills && skills.length > 0 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5 font-mono shadow-xs">
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
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5"
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. KERNEL MILESTONES / EXPERIENCE TIMELINE */}
      {experiences && experiences.length > 0 && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6 font-mono shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <Cpu className="w-4 h-4" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                $ systemctl status --milestones
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">chronological telemetry</span>
          </div>

          <div className="relative pl-6 sm:pl-7 border-l-2 border-cyan-500/30 space-y-8 ml-2 sm:ml-3">
            {experiences.map((exp) => {
              const startFormatted = formatMonthYear(exp.startDate) || exp.startDate;
              const endFormatted = exp.isCurrent ? "NOW" : formatMonthYear(exp.endDate) || exp.endDate;

              return (
                <div key={exp._id} className="relative group">
                  {/* Node Terminal Dot */}
                  {exp.isCurrent ? (
                    <span className="absolute -left-[31px] sm:-left-[35px] top-2 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-slate-900" />
                    </span>
                  ) : (
                    <span className="absolute -left-[29px] sm:-left-[33px] top-2.5 w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-700 border-2 border-slate-900 group-hover:bg-cyan-500 transition-colors" />
                  )}

                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 group-hover:border-cyan-500/40 transition-all">
                    <div className="flex flex-wrap justify-between items-baseline gap-2 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {exp.role}
                        </span>
                        <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                          @{exp.company}
                        </span>
                        {exp.employmentType && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300 uppercase">
                            {exp.employmentType}
                          </span>
                        )}
                      </div>

                      <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                        {startFormatted} &mdash; {endFormatted}
                      </span>
                    </div>

                    {exp.summary && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                        {exp.summary}
                      </p>
                    )}

                    {/* Kernel Execution Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-1 pt-1 font-sans text-xs">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <span className="text-cyan-500 font-mono">&gt;</span>
                            <span className="leading-relaxed">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60">
                        {exp.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[10px] border border-slate-200 dark:border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
