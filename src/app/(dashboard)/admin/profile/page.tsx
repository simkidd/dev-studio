import React from "react";
import type { Metadata } from "next";
import { ProfileView } from "@/components/admin/views/profile-view";

export const metadata: Metadata = {
  title: "Settings & Identity | Admin Studio",
  description: "Configure developer bio, availability status, social connectivity, and SEO metadata.",
};

export default function AdminProfilePage() {
  return <ProfileView />;
}
