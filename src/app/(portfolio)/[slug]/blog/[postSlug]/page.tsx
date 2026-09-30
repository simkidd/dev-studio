import React from "react";
import type { Metadata } from "next";
import { PublicPortfolioView } from "@/components/public/views/public-portfolio-view";

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string; postSlug: string }> | { slug: string; postSlug: string };
}

export async function generateMetadata({ params }: BlogPostDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const postSlug = resolvedParams.postSlug;
  const capitalizedTitle = postSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${capitalizedTitle} | Technical Article`,
    description: `Read the full article and engineering insights on ${capitalizedTitle}.`,
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const resolvedParams = await params;
  return (
    <PublicPortfolioView
      slug={resolvedParams.slug}
      view="blog-detail"
      subSlug={resolvedParams.postSlug}
    />
  );
}
