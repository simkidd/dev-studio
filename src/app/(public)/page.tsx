import { Metadata } from "next";
import { HomeView } from "@/components/public/views/home-view";

export const metadata: Metadata = {
  title: "Alex Morgan | Senior Staff Full-Stack & Distributed Systems Architect",
  description:
    "Engineering high-throughput systems, resilient web architectures, and high-performance digital flagships for enterprise and venture-backed companies.",
  keywords: [
    "Full-Stack Architect",
    "Staff Software Engineer",
    "Next.js Architect",
    "Distributed Systems",
    "TypeScript",
    "React",
    "Node.js",
  ],
  openGraph: {
    title: "Alex Morgan | Senior Staff Full-Stack Architect",
    description:
      "Engineering high-throughput systems and resilient web flagships.",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeView />;
}
