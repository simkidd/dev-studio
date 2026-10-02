import React from "react";
import type { Metadata } from "next";
import { PlatformTemplatesView } from "@/components/admin/views";

export const metadata: Metadata = {
  title: "Global Template Engine | Platform Superadmin",
  description: "Manage template availability, feature badges, and tier access.",
};

export default function PlatformTemplatesPage() {
  return <PlatformTemplatesView />;
}
