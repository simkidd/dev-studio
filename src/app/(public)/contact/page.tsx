import { Metadata } from "next";
import { ContactView } from "@/components/public/views/contact-view";

export const metadata: Metadata = {
  title: "Contact & Project Inquiries | Senior Staff Full-Stack Architect",
  description:
    "Direct inquiry portal for contract engineering, staff advisory, and full-stack web architectures.",
};

export default function ContactPage() {
  return <ContactView />;
}
