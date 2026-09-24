import React from "react";
import type { Metadata } from "next";
import { TestimonialsView } from "@/components/admin/views/testimonials-view";

export const metadata: Metadata = {
  title: "Testimonials & Social Proof | Admin Studio",
  description: "Manage client testimonials, founder endorsements, and ratings.",
};

export default function AdminTestimonialsPage() {
  return <TestimonialsView />;
}
