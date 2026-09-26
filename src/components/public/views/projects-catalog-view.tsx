"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProjects } from "@/hooks";
import { IProject } from "@/interfaces";
import {
  Search,
  X,
  ExternalLink,
  ChevronRight,
  Layers,
} from "lucide-react";
import { ChromeSparkleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function ProjectsCatalogView() {
  const { data: projectsRes, isLoading } = useProjects();
  const projects: IProject[] = projectsRes?.data || [];

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p: IProject) => {
      if (p.category) set.add(p.category);
    });
    return ["all", ...Array.from(set)];
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project: IProject) => {
      const matchesCategory =
        selectedCategory === "all" ||
        project.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.summary?.toLowerCase().includes(q) ||
        project.technologies?.some((t: string) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 space-y-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & SEARCH / FILTER BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <ChromeSparkleIcon className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Selected Works Catalog
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Crafted with Precision.
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Explore the complete archive of production flagships, open-source libraries, and client systems.
            </p>
          </div>

          {/* Search Bar with Clear Button */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or title..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-border/60 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer",
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {cat === "all" ? "All Works" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. PROJECTS GRID
      ───────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-3xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: IProject) => (
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
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Tech Badges & Details Link */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    {(project.technologies || []).slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground"
                      >
                        {tech}
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
          <p className="text-sm font-semibold text-foreground">No matching projects found</p>
          <p className="text-xs text-muted-foreground">
            Try adjusting your search keywords or switching category filters.
          </p>
        </div>
      )}
    </div>
  );
}
