import React from "react";
import type { Metadata } from "next";
import { ProfileView } from "@/components/admin/views/profile-view";

export const metadata: Metadata = {
  title: "Profile & Identity | Admin Studio",
  description: "Configure developer bio, availability status, social connectivity, and resume.",
};

export default function AdminProfilePage() {
  return <ProfileView />;
}
