"use client";

import React from "react";
import { Bell, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/stores";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlatformAnnouncementBanner } from "./platform-announcement-banner";

export function AdminHeader() {
  const { user } = useAuthStore();

  return (
    <>
      <PlatformAnnouncementBanner />
      <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left: Mobile Sidebar Trigger */}
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden text-muted-foreground hover:text-foreground hover:bg-accent p-1.5 rounded-md transition-colors" />
          {user?.role === "superadmin" && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3 h-3" />
              <span>Platform Owner</span>
            </span>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* User Pill */}
          <div className="flex items-center gap-2 pl-2">
            <Avatar className="w-7 h-7 border border-border">
              <AvatarImage
                src={user?.avatarUrl}
                alt={user?.firstName || "Admin"}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/15 text-primary text-[10px] font-bold">
                {user?.firstName?.charAt(0).toUpperCase() ||
                  user?.email?.charAt(0).toUpperCase() ||
                  "A"}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-foreground hidden md:inline-block">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.firstName || user?.email?.split("@")[0] || "Admin"}
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
