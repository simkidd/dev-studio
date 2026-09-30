import React from "react";
import type { Metadata } from "next";
import { PublicPortfolioView } from "@/components/public/views/public-portfolio-view";

interface BlogPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const capitalizedSlug = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Articles & Technical Insights | ${capitalizedSlug}`,
    description: `Read articles, systems deep-dives, and technical insights authored by ${capitalizedSlug}.`,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const resolvedParams = await params;
  return <PublicPortfolioView slug={resolvedParams.slug} view="blog" />;
}
