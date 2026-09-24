import React from "react";
import type { Metadata } from "next";
import { ProjectsView } from "@/components/admin/views/projects-view";

export const metadata: Metadata = {
  title: "Projects Data Grid | Admin Studio",
  description: "High-density engineering project database and interactive case study management.",
};

export default function AdminProjectsPage() {
  return <ProjectsView />;
}
