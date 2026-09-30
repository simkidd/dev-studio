import React from "react";
import { Metadata } from "next";
import { TemplatesView } from "@/components/admin/views/templates-view";

export const metadata: Metadata = {
  title: "Templates & Design | Portfolio Builder",
  description: "Select and customize your developer portfolio theme",
};

export default function TemplatesPage() {
  return <TemplatesView />;
}
