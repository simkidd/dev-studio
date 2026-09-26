import React from "react";
import type { Metadata } from "next";
import { PostDetailView } from "@/components/admin/views";

interface AdminPostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: AdminPostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Article Editorial & Metrics | Admin Studio`,
    description: `Manage markdown insights, metrics, and publication status for article ${id}.`,
  };
}

export default async function AdminPostDetailPage({
  params,
}: AdminPostDetailPageProps) {
  const { id } = await params;
  return <PostDetailView id={id} />;
}
