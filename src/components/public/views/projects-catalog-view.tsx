"use client";

import React from "react";
import { useProjects } from "@/hooks";
import { IProject } from "@/interfaces";
import { Layers } from "lucide-react";
import { ChromeSparkleIcon } from "@/components/ui/icons";
import { ProjectCard } from "@/components/public/cards/project-card";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <ProjectCard
              key={project._id}
              project={project}
            />
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
