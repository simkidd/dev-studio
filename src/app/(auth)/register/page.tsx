import React from "react";
import type { Metadata } from "next";
import { RegisterView } from "@/components/auth";

export const metadata: Metadata = {
  title: "Create Account | DevPortfolio Platform",
  description: "Create a free developer account and launch your personal portfolio.",
};

export default function RegisterPage() {
  return <RegisterView />;
}
