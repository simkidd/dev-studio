import { Metadata } from "next";
import { PostDetailView } from "@/components/public/views/post-detail-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").toUpperCase()} | Engineering Essay`,
    description: "Technical deep-dive, architecture patterns, and engineering insights.",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostDetailView slug={slug} />;
}
