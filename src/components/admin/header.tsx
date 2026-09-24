"use client";

import React from "react";
import { Bell } from "lucide-react";
import { useAuthStore } from "@/stores";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function AdminHeader() {
  const { user } = useAuthStore();

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Sidebar Trigger */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden text-muted-foreground hover:text-foreground hover:bg-accent p-1.5 rounded-md transition-colors" />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <button
          title="Notifications"
          className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm overflow-hidden">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.firstName || "Admin"}
                className="w-full h-full object-cover"
              />
            ) : (
              user?.firstName?.charAt(0).toUpperCase() ||
              user?.email?.charAt(0).toUpperCase() ||
              "A"
            )}
          </div>
          <span className="text-xs font-medium text-foreground hidden md:inline-block">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : user?.firstName || user?.email?.split("@")[0] || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}
