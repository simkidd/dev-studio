import React from "react";
import type { Metadata } from "next";
import { PublicPortfolioView } from "@/components/public/views/public-portfolio-view";

interface AboutPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const capitalizedSlug = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `About ${capitalizedSlug} | Career Timeline & Biography`,
    description: `Read about ${capitalizedSlug}'s software engineering background, philosophy, career history, and tech leadership experience.`,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;
  return <PublicPortfolioView slug={resolvedParams.slug} view="about" />;
}
