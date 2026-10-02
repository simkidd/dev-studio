import React from "react";
import type { Metadata } from "next";
import { PlatformDomainsView } from "@/components/admin/views";

export const metadata: Metadata = {
  title: "Domain & Slug Registry | Platform Superadmin",
  description: "Manage system reserved keywords and custom domain routing.",
};

export default function PlatformDomainsPage() {
  return <PlatformDomainsView />;
}
