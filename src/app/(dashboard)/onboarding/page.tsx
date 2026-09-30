import React from "react";
import type { Metadata } from "next";
import { OnboardingView } from "@/components/admin/views/onboarding-view";

export const metadata: Metadata = {
  title: "Onboarding Setup | DevPortfolio SaaS",
  description: "Claim your developer portfolio slug, select your template, and publish your site.",
};

export default function OnboardingPage() {
  return <OnboardingView />;
}
