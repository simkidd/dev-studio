import React from "react";
import { PublicNavbar } from "@/components/public/navbar";
import { PublicFooter } from "@/components/public/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary relative">
      {/* Navigation Header */}
      <PublicNavbar />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">{children}</main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
