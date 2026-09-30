"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { FileText, Award, Sparkles } from "lucide-react";
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

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 50%"],
  });
  const smoothTimelineProgress = useSpring(timelineProgress, { stiffness: 200, damping: 30 });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Intro */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-7 space-y-6"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            About Background
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            About Me
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            {profile?.aboutMarkdown || bio}
          </p>
          {profile?.resumeUrl && (
            <div className="pt-2">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume / CV</span>
              </motion.a>
            </div>
          )}
        </motion.div>

        {profile?.avatarUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-5 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-2 rounded-3xl bg-linear-to-tr from-primary/30 to-indigo-500/30 blur-xl group-hover:blur-2xl transition-all opacity-80" />
              <img
                src={profile.avatarUrl}
                alt={fullName}
                className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl object-cover border-2 border-border shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Technical Proficiencies */}
      {skills && skills.length > 0 && (
        <div className="space-y-8 border-t border-border/40 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="space-y-1"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              Proficiencies &amp; Stack
            </span>
            <h2 className="text-2xl font-bold text-foreground">Technical Capabilities</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -4, borderColor: "var(--primary)" }}
                className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3 shadow-xs transition-colors cursor-default"
              >
                <TechIcon name={skill.name} icon={skill.icon} className="w-5 h-5 text-primary" />
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-foreground block truncate">{skill.name}</span>
                  <span className="text-[11px] text-muted-foreground font-mono block truncate">{skill.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Career Timeline */}
      {experiences.length > 0 && (
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="space-y-10 border-t border-border/40 pt-12"
        >
          <div className="space-y-1">
            <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
              Career Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Experience &amp; Milestones</h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-border/60 space-y-10 ml-3 sm:ml-4">
            {/* Animated Scroll Line */}
            <motion.div
              style={{ scaleY: smoothTimelineProgress, originY: 0 }}
              className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-primary"
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
                  className="relative group space-y-2"
                >
                  {/* Bullet */}
                  <span className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-background transition-colors ${
                    exp.isCurrent ? "bg-primary animate-pulse" : "bg-muted-foreground/40 group-hover:bg-primary"
                  }`} />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-semibold text-primary">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground px-2.5 py-1 rounded-full bg-muted/60">
                      {startFormatted} &mdash; {endFormatted}
                    </span>
                  </div>

                  {exp.summary && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {exp.summary}
                    </p>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
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
