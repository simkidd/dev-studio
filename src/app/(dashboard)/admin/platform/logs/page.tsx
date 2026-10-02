import React from "react";
import type { Metadata } from "next";
import { PlatformLogsView } from "@/components/admin/views";

export const metadata: Metadata = {
  title: "Audit & Security Logs | Platform Superadmin",
  description: "Inspect immutable audit logs of administrative actions and security events.",
};

export default function PlatformLogsPage() {
  return <PlatformLogsView />;
}
