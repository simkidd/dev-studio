import { Metadata } from "next";
import { ProjectsCatalogView } from "@/components/public/views/projects-catalog-view";

export const metadata: Metadata = {
  title: "Selected Works & Case Studies | Senior Staff Full-Stack Architect",
  description:
    "Complete portfolio catalog of production web applications, open-source libraries, cloud architectures, and client projects.",
};

export default function ProjectsPage() {
  return <ProjectsCatalogView />;
}
