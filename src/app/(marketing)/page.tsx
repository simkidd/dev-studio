import React from "react";
import type { Metadata } from "next";
import { MarketingHomeView } from "@/components/public/views/marketing-home-view";

export const metadata: Metadata = {
  title: "DevPortfolio SaaS | The Modern Developer Portfolio Engine",
  description:
    "Create, customize, and publish your professional developer portfolio website in minutes with multi-theme architecture, instant switching, and built-in CRM.",
  openGraph: {
    title: "DevPortfolio SaaS | The Modern Developer Portfolio Engine",
    description:
      "Create, customize, and publish your professional developer portfolio website in minutes with multi-theme architecture.",
    type: "website",
  },
};

export default function SaasLandingPage() {
  return <MarketingHomeView />;
}
