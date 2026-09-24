"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  BookOpen,
  Cpu,
  Briefcase,
  Quote,
  UserCheck,
  Terminal,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuthStore } from "@/stores";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navSections: NavSection[] = [
    {
      title: "GENERAL",
      items: [
        {
          title: "Overview",
          href: "/admin",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "CONTENT",
      items: [
        {
          title: "Projects",
          href: "/admin/projects",
          icon: FolderKanban,
        },
        {
          title: "Blog & Articles",
          href: "/admin/posts",
          icon: BookOpen,
        },
        {
          title: "Tech Skills",
          href: "/admin/skills",
          icon: Cpu,
        },
        {
          title: "Career Timeline",
          href: "/admin/experiences",
          icon: Briefcase,
        },
      ],
    },
    {
      title: "CRM & LEADS",
      items: [
        {
          title: "Inquiries CRM",
          href: "/admin/messages",
          icon: Mail,
        },
        {
          title: "Testimonials",
          href: "/admin/testimonials",
          icon: Quote,
        },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        {
          title: "Profile & SEO",
          href: "/admin/profile",
          icon: UserCheck,
        },
      ],
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      className="bg-sidebar border-r border-sidebar-border select-none text-sidebar-foreground"
    >
      {/* Brand Header */}
      <SidebarHeader className="p-3 border-b border-sidebar-border group-data-[collapsible=icon]:p-2">
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h1 className="text-sm font-semibold text-sidebar-foreground group-hover:text-primary transition-colors leading-none">
                Dev Studio
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                Portfolio CMS
              </p>
            </div>
          </Link>
          <Link
            href="/"
            target="_blank"
            title="View Live Portfolio"
            className="p-1.5 text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-md transition-colors group-data-[collapsible=icon]:hidden"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </SidebarHeader>

      {/* Navigation Sections */}
      <SidebarContent className="px-2 py-3 space-y-3 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-2">
        {navSections.map((section, idx) => (
          <SidebarGroup key={idx} className="p-0">
            {section.title && (
              <SidebarGroupLabel className="px-2 pb-1 text-[10px] font-mono font-semibold tracking-wider text-muted-foreground uppercase h-auto group-data-[collapsible=icon]:hidden">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={cn(
                          "flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-all group h-9",
                          "group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center mx-auto",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-border"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60",
                        )}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center justify-between w-full"
                        >
                          <div className="flex items-center gap-2.5 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center">
                            <Icon
                              className={cn(
                                "w-4 h-4 shrink-0 transition-colors",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-sidebar-foreground",
                              )}
                            />
                            <span className="group-data-[collapsible=icon]:hidden truncate">
                              {item.title}
                            </span>
                          </div>
                          {item.badge !== undefined && (
                            <span
                              className={cn(
                                "text-[10px] font-mono px-1.5 py-0.5 rounded group-data-[collapsible=icon]:hidden",
                                isActive
                                  ? "bg-primary/15 text-primary"
                                  : "bg-sidebar-accent text-muted-foreground",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer Profile & Logout */}
      <SidebarFooter className="p-2 border-t border-sidebar-border bg-sidebar/50">
        <div className="flex items-center justify-between p-1.5 rounded-lg bg-sidebar-accent/50 border border-sidebar-border group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-2">
          <div className="flex items-center gap-2.5 min-w-0 group-data-[collapsible=icon]:justify-center">
            <div
              className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm overflow-hidden"
              title={
                user?.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : user?.email || "Admin"
              }
            >
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
            <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
              <p className="text-xs font-medium text-sidebar-foreground truncate">
                {user?.firstName && user?.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user?.firstName || user?.email || "Admin"}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground font-mono capitalize">
                  {user?.headline
                    ? user.headline.split("|")[0].trim()
                    : user?.role || "superadmin"}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => logout()}
            title="Logout"
            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors cursor-pointer group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
