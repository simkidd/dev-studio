"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { Search, ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassicProjectsViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ClassicProjectsView({ bundle }: ClassicProjectsViewProps) {
  const { portfolio, projects } = bundle;

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const projectCategories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects = projects.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
          Selected Works
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Selected Works &amp; Systems
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Explore production case studies, distributed architectures, developer tools, and client platforms.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-full bg-card border border-border text-xs focus:outline-hidden focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="group rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-all shadow-xs hover:shadow-xl flex flex-col justify-between"
          >
            <Link
              href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
              className="aspect-16/10 w-full overflow-hidden bg-muted relative block group/img"
            >
              {project.thumbnailUrl ? (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-muted to-primary/10 text-muted-foreground gap-2 p-4 text-center">
                  <div className="w-10 h-10 rounded-2xl bg-background/80 border border-border flex items-center justify-center shadow-xs">
                    <ArrowUpRight className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-[11px] font-mono opacity-70 font-medium">Case Study Preview</span>
                </div>
              )}
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-background/90 text-foreground backdrop-blur-md border border-border/80 shadow-xs">
                {project.category || "Full-Stack"}
              </span>
            </Link>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  <Link href={`/${portfolio.slug}/projects/${project.slug || project._id}`}>
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
                    href={`/${portfolio.slug}/projects/${project.slug || project._id}`}
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
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-[11px]"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
