"use client";

import React from "react";
import { AuthGuard } from "@/guards";
import { AdminSidebar, AdminHeader } from "@/components/admin";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export interface AdminDashboardShellProps {
  children: React.ReactNode;
}

export function AdminDashboardShell({ children }: AdminDashboardShellProps) {
  const pathname = usePathname();

  // If on onboarding setup wizard, protect route with AuthGuard without rendering sidebar/header
  if (pathname === "/onboarding") {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <AuthGuard>
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0 bg-background text-foreground font-sans">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background p-4 sm:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}

export default AdminDashboardShell;
