import React from "react";
import type { Metadata } from "next";
import { PostsView } from "@/components/admin/views/posts-view";

export const metadata: Metadata = {
  title: "Engineering Articles | Admin Studio",
  description: "Publish technical deep-dives, architectural post-mortems, and engineering insights.",
};

export default function AdminPostsPage() {
  return <PostsView />;
}
