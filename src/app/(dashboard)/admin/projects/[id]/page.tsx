import React from "react";
import type { Metadata } from "next";
import { ProjectDetailView } from "@/components/admin/views";

interface AdminProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: AdminProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Project Specs & Media Studio | Admin`,
    description: `Manage project specifications, gallery assets, and metrics for project ${id}.`,
  };
}

export default async function AdminProjectDetailPage({
  params,
}: AdminProjectDetailPageProps) {
  const { id } = await params;
  return <ProjectDetailView id={id} />;
}
