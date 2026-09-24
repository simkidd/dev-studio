import React from "react";
import { PublicNavbar } from "@/components/public/navbar";
import { PublicFooter } from "@/components/public/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      {/* Ambient background glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[700px] h-[700px] bg-violet-600/8 rounded-full blur-[150px]" />
      </div>

      {/* Navigation Header */}
      <PublicNavbar />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">{children}</main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
