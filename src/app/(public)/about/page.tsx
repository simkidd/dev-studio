import { Metadata } from "next";
import { AboutView } from "@/components/public/views/about-view";

export const metadata: Metadata = {
  title: "About & Career Journey | Senior Staff Full-Stack Architect",
  description:
    "Engineering philosophy, background story, career timeline milestones, and full-stack technical competencies.",
};

export default function AboutPage() {
  return <AboutView />;
}
