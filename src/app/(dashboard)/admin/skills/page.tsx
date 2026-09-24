import React from "react";
import type { Metadata } from "next";
import { SkillsView } from "@/components/admin/views/skills-view";

export const metadata: Metadata = {
  title: "Skills & Matrix | Admin Studio",
  description: "Technical competency matrix, proficiencies, and engineering stack management.",
};

export default function AdminSkillsPage() {
  return <SkillsView />;
}
