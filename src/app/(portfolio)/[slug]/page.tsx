import React from "react";
import type { Metadata } from "next";
import { PublicPortfolioView } from "@/components/public/views/public-portfolio-view";

interface PublicPortfolioPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({
  params,
}: PublicPortfolioPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const capitalizedSlug = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${capitalizedSlug} | Developer Portfolio`,
    description: `Explore ${capitalizedSlug}'s software engineering portfolio, showcase projects, tech skills, and career achievements.`,
    openGraph: {
      title: `${capitalizedSlug} | Developer Portfolio`,
      description: `Explore ${capitalizedSlug}'s software engineering portfolio, showcase projects, and career milestones.`,
      type: "profile",
    },
  };
}

export default async function PublicPortfolioPage({
  params,
}: PublicPortfolioPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return <PublicPortfolioView slug={slug} />;
}
