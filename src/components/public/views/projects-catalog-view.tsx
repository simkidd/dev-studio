"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useProjects } from "@/hooks";
import { IProject } from "@/interfaces";
import { ChevronRight, Layers } from "lucide-react";
import { ChromeSparkleIcon } from "@/components/ui/icons";
import { TechIcon } from "@/components/ui/tech-icon";

export function ProjectsCatalogView() {
  const { data: projectsRes, isLoading } = useProjects();
  const projects: IProject[] = projectsRes?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 space-y-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <ChromeSparkleIcon className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Selected Works Catalog
          </span>
        </div>

        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
            Crafted with <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-500">
              Precision & Purpose.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Explore the complete archive of production flagships, scalable
            systems, and open-source packages.
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PROJECTS GRID
      ───────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-96 rounded-3xl bg-card border border-border animate-pulse"
            />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project: IProject) => (
            <div
              key={project._id}
              className="group relative rounded-3xl bg-card border border-border/80 hover:border-primary/50 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] w-full bg-muted/80 overflow-hidden">
                {project.thumbnailUrl ? (
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-xs">
                    No Preview Available
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-background/85 border border-border backdrop-blur-md text-[10px] font-mono font-semibold text-foreground">
                    {project.category || "Full-Stack"}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Tech Badges & Details Link */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {(project.technologies || [])
                      .slice(0, 3)
                      .map((tech: string) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground border border-border/40"
                        >
                          <TechIcon name={tech} size={11} />
                          <span>{tech}</span>
                        </span>
                      ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-card border border-border space-y-3">
          <Layers className="w-8 h-8 text-muted-foreground mx-auto" />
          <p className="text-sm font-semibold text-foreground">
            No projects published yet
          </p>
          <p className="text-xs text-muted-foreground">
            Flagship projects and case studies will appear here once published
            from the CMS.
          </p>
        </div>
      )}
    </div>
  );
}
