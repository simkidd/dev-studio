import React from "react";
import type { Metadata } from "next";
import { DashboardView } from "@/components/admin/views/dashboard-view";

export const metadata: Metadata = {
  title: "Command Hub | Admin Studio",
  description: "Executive developer portfolio performance dashboard and real-time lead telemetry.",
};

export default function AdminDashboardPage() {
  return <DashboardView />;
}
