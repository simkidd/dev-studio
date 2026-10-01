import React from "react";
import type { Metadata } from "next";
import { LoginView } from "@/components/auth";

export const metadata: Metadata = {
  title: "Sign In | DevPortfolio Platform",
  description: "Sign in to manage your portfolio, case studies, and inquiries.",
};

export default function LoginPage() {
  return <LoginView />;
}
