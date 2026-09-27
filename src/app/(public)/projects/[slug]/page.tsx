import { Metadata } from "next";
import { ProjectDetailView } from "@/components/public/views/project-detail-view";
import { projectsApi } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    if (!slug) throw new Error("Missing slug");

    const res = await projectsApi.getBySlug(slug);
    const project = res.data;

    if (!project) {
      return {
        title: "Project Not Found | Portfolio",
        description: "The requested project case study could not be found.",
      };
    }

    return {
      title: `${project.title} | Case Study`,
      description:
        project.summary ||
        "Detailed architecture overview, technologies used, and live demo.",
      openGraph: {
        title: `${project.title} | Case Study`,
        description: project.summary,
        images: project.thumbnailUrl ? [{ url: project.thumbnailUrl }] : [],
      },
    };
  } catch {
    return {
      title: "Project Case Study | Portfolio",
      description:
        "Detailed architecture overview, technologies used, and live demo.",
    };
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailView slug={slug} />;
}

