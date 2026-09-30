import React from "react";
import type { Metadata } from "next";
import { PublicPortfolioView } from "@/components/public/views/public-portfolio-view";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string; projectSlug: string }> | { slug: string; projectSlug: string };
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const projectSlug = resolvedParams.projectSlug;
  const capitalizedProject = projectSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${capitalizedProject} - Case Study | Developer Portfolio`,
    description: `Deep dive into the architecture, stack decisions, and implementation of ${capitalizedProject}.`,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = await params;
  return (
    <PublicPortfolioView
      slug={resolvedParams.slug}
      view="project-detail"
      subSlug={resolvedParams.projectSlug}
    />
  );
}
