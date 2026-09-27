import React from "react";
import { Metadata } from "next";
import { ServicesView } from "@/components/public/views/services-view";

export const metadata: Metadata = {
  title: "Expertise & Capabilities | Full-Stack Engineering",
  description:
    "Explore full-stack architectures, distributed backend systems, cloud DevOps pipelines, and technical capabilities.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
