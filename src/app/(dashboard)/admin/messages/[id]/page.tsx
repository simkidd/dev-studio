import React from "react";
import type { Metadata } from "next";
import { MessageDetailView } from "@/components/admin/views";

interface AdminMessageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: AdminMessageDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Client Inquiry Details | Admin`,
    description: `Manage client consultation specs and transactional SMTP reply for inquiry ${id}.`,
  };
}

export default async function AdminMessageDetailPage({
  params,
}: AdminMessageDetailPageProps) {
  const { id } = await params;
  return <MessageDetailView id={id} />;
}
