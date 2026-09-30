import React from "react";
import type { Metadata } from "next";
import { PublicPortfolioView } from "@/components/public/views/public-portfolio-view";

interface ContactPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const capitalizedSlug = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `Contact & Inquiries | ${capitalizedSlug}`,
    description: `Send an inquiry, consulting project request, or direct message to ${capitalizedSlug}.`,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const resolvedParams = await params;
  return <PublicPortfolioView slug={resolvedParams.slug} view="contact" />;
}
