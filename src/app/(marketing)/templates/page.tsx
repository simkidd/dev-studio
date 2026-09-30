import React from "react";
import type { Metadata } from "next";
import { TemplatesGalleryView } from "@/components/public/views/templates-gallery-view";

export const metadata: Metadata = {
  title: "Templates Gallery | DevPortfolio SaaS",
  description:
    "Explore 3 bespoke developer portfolio templates: Modern Minimal Craft, Nova Engine, and Apex Studio.",
  openGraph: {
    title: "Templates Gallery | DevPortfolio SaaS",
    description: "Explore 3 signature developer portfolio templates.",
    type: "website",
  },
};

export default function TemplatesGalleryPage() {
  return <TemplatesGalleryView />;
}
