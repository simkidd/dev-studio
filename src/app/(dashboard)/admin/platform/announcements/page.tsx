import React from "react";
import type { Metadata } from "next";
import { PlatformAnnouncementsView } from "@/components/admin/views";

export const metadata: Metadata = {
  title: "Broadcasts & Alerts | Platform Superadmin",
  description: "Publish platform notices, system alerts, and changelogs.",
};

export default function PlatformAnnouncementsPage() {
  return <PlatformAnnouncementsView />;
}
