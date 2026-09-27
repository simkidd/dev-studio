import { Metadata } from "next";
import { PostDetailView } from "@/components/public/views/post-detail-view";
import { postsApi } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    if (!slug) throw new Error("Missing slug");

    const res = await postsApi.getBySlug(slug);
    const post = res.data;

    if (!post) {
      return {
        title: "Article Not Found | Portfolio",
        description: "The requested engineering essay could not be found.",
      };
    }

    return {
      title: `${post.title} | Engineering Essay`,
      description:
        post.excerpt ||
        "Technical deep-dive, architecture patterns, and engineering insights.",
      openGraph: {
        title: `${post.title} | Engineering Essay`,
        description: post.excerpt,
        images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
      },
    };
  } catch {
    return {
      title: "Engineering Essay | Portfolio",
      description:
        "Technical deep-dive, architecture patterns, and engineering insights.",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PostDetailView slug={slug} />;
}
