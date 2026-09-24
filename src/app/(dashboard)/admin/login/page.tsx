import React from "react";
import type { Metadata } from "next";
import { LoginView } from "@/components/admin/views/login-view";

export const metadata: Metadata = {
  title: "Admin Sign In | Developer Portfolio Studio",
  description: "Secure administrative login for portfolio content and leads management.",
};

export default function AdminLoginPage() {
  return <LoginView />;
}
