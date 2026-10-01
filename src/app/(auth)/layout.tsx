import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | DevPortfolio Platform",
  description: "Sign in or create your developer portfolio account.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
