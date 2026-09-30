import React from "react";
import type { Metadata } from "next";
import { PublicPortfolioView } from "@/components/public/views/public-portfolio-view";

interface ProjectsPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const capitalizedSlug = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Projects & Case Studies | ${capitalizedSlug}`,
    description: `Explore production software architecture, open source projects, and case studies built by ${capitalizedSlug}.`,
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const resolvedParams = await params;
  return <PublicPortfolioView slug={resolvedParams.slug} view="projects" />;
}
