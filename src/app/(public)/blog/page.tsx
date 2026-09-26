import { Metadata } from "next";
import { BlogCatalogView } from "@/components/public/views/blog-catalog-view";

export const metadata: Metadata = {
  title: "Engineering Insights & Articles | Senior Staff Full-Stack Architect",
  description:
    "Technical essays, tutorials, and architectural breakdowns on distributed systems, Next.js, and cloud engineering.",
};

export default function BlogPage() {
  return <BlogCatalogView />;
}
