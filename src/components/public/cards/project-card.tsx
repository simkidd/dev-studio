"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IProject } from "@/interfaces";
import { TechIcon } from "@/components/ui/tech-icon";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: IProject;
  className?: string;
}

export function ProjectCard({
  project,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-3xl bg-card border border-border/80 hover:border-primary/50 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col",
        className
      )}
    >
      {/* Thumbnail */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative aspect-[16/10] w-full bg-muted/80 overflow-hidden block"
      >
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
      </Link>

      {/* Content Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <Link
            href={`/projects/${project.slug}`}
            className="group-hover:text-primary transition-colors block"
          >
            <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-1">
              {project.title}
            </h3>
          </Link>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tech Badges */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-1.5">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground border border-border/40"
              >
                <TechIcon name={tech} size={11} />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
