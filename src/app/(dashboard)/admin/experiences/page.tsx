import React from "react";
import type { Metadata } from "next";
import { ExperiencesView } from "@/components/admin/views/experiences-view";

export const metadata: Metadata = {
  title: "Career & Experience | Admin Studio",
  description: "Senior engineering career timeline, leadership roles, and company milestones.",
};

export default function AdminExperiencesPage() {
  return <ExperiencesView />;
}
