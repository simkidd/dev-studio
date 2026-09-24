import React from "react";
import type { Metadata } from "next";
import { AdminDashboardShell } from "@/components/admin/dashboard-shell";

export const metadata: Metadata = {
  title: "Admin Studio | Portfolio Command Hub",
  description: "Executive developer portfolio administration and CRM telemetry.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminDashboardShell>{children}</AdminDashboardShell>;
}
