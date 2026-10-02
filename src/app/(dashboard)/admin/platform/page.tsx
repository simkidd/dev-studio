import React from "react";
import type { Metadata } from "next";
import { PlatformView } from "@/components/admin/views";

export const metadata: Metadata = {
  title: "Platform Command Hub | DevPortfolio Superadmin",
  description: "Global multi-tenant governance, SaaS telemetry, and developer fleet management.",
};

export default function PlatformAdminPage() {
  return <PlatformView />;
}
