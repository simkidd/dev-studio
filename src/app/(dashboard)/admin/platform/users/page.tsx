import React from "react";
import type { Metadata } from "next";
import { PlatformUsersView } from "@/components/admin/views";

export const metadata: Metadata = {
  title: "Developer Fleet | Platform Superadmin",
  description: "Manage registered developer accounts, role tiers, and tenancy.",
};

export default function PlatformUsersPage() {
  return <PlatformUsersView />;
}
