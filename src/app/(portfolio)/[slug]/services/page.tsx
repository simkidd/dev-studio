import React from "react";
import type { Metadata } from "next";
import { PublicPortfolioView } from "@/components/public/views/public-portfolio-view";

interface ServicesPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const capitalizedSlug = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Consulting & Services | ${capitalizedSlug}`,
    description: `Explore engineering consulting, technical architecture advisory, and full-stack development services offered by ${capitalizedSlug}.`,
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const resolvedParams = await params;
  return <PublicPortfolioView slug={resolvedParams.slug} view="services" />;
}
