"use client";

import React from "react";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { FileText } from "lucide-react";
import { formatMonthYear } from "@/lib/date.utils";

interface ClassicAboutViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ClassicAboutView({ bundle }: ClassicAboutViewProps) {
  const { profile, experiences, skills } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const bio = profile?.bio || "I build high-throughput applications and modern digital experiences.";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
            Biography &amp; Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            About {fullName}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            {profile?.aboutMarkdown || bio}
          </p>
          {profile?.resumeUrl && (
            <div className="pt-2">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume / CV</span>
              </a>
            </div>
          )}
        </div>

        {profile?.avatarUrl && (
          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/30 to-indigo-500/30 blur-xl" />
              <img
                src={profile.avatarUrl}
                alt={fullName}
                className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl object-cover border-2 border-border shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>

      {/* Technical Proficiencies */}
      {skills && skills.length > 0 && (
        <div className="space-y-8 border-t border-border/40 pt-12">
          <div className="space-y-1">
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              Proficiencies &amp; Stack
            </span>
            <h2 className="text-2xl font-bold text-foreground">Technical Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3 shadow-xs hover:border-primary/40 transition-colors"
              >
                <TechIcon name={skill.name} icon={skill.icon} className="w-5 h-5 text-primary" />
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-foreground block truncate">{skill.name}</span>
                  <span className="text-[11px] text-muted-foreground font-mono block truncate">{skill.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Career Timeline */}
      {experiences.length > 0 && (
        <div className="space-y-10 border-t border-border/40 pt-12">
          <div className="space-y-1">
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              History
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Career Milestones</h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/20 space-y-10 ml-3 sm:ml-4">
            {experiences.map((exp) => {
              const startFormatted = formatMonthYear(exp.startDate) || exp.startDate;
              const endFormatted = exp.isCurrent ? "Present" : formatMonthYear(exp.endDate) || exp.endDate;

              return (
                <div key={exp._id} className="relative group">
                  {/* Timeline Node Marker */}
                  {exp.isCurrent ? (
                    <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-primary border-2 border-background shadow-xs" />
                    </span>
                  ) : (
                    <span className="absolute -left-[29px] sm:-left-[37px] top-2 w-3 h-3 rounded-full bg-muted-foreground/40 border-2 border-background ring-1 ring-border group-hover:bg-primary transition-colors" />
                  )}

                  <div className="p-6 rounded-2xl bg-card border border-border group-hover:border-primary/30 transition-all space-y-3 shadow-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base sm:text-lg font-bold text-foreground">{exp.role}</h3>
                          {exp.employmentType && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize border border-border/50">
                              {exp.employmentType}
                            </span>
                          )}
                          {exp.isCurrent && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                              Current Role
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-semibold text-primary">
                          {exp.company}
                          {exp.location ? (
                            <span className="text-xs text-muted-foreground font-normal ml-2">
                              &bull; {exp.location} {exp.isRemote ? "(Remote)" : ""}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-muted text-foreground border border-border/40">
                        {startFormatted} &mdash; {endFormatted}
                      </span>
                    </div>

                    {exp.summary && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.summary}
                      </p>
                    )}

                    {/* Key Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="space-y-1.5 pt-1">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">&bull;</span>
                            <span className="leading-relaxed">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies used */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono bg-muted/60 text-muted-foreground"
                          >
                            <TechIcon name={tech} className="w-3 h-3 text-primary" />
                            <span>{tech}</span>
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
