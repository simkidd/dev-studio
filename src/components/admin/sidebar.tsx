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
  Settings,
  Terminal,
  LogOut,
  ExternalLink,
  ChevronsUpDown,
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

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
          title: "Settings",
          href: "/admin/profile",
          icon: Settings,
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
        <div className="flex items-center group-data-[collapsible=icon]:justify-center">
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
                        onClick={closeMobileSidebar}
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

      {/* Footer User Profile & Dropdown Menu */}
      <SidebarFooter className="p-2 border-t border-sidebar-border bg-sidebar/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/80 transition-colors cursor-pointer rounded-lg p-1.5 w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarImage
                        src={user?.avatarUrl}
                        alt={user?.firstName || "Admin"}
                      />
                      <AvatarFallback className="bg-primary/15 text-primary font-bold text-xs">
                        {user?.firstName?.charAt(0).toUpperCase() ||
                          user?.email?.charAt(0).toUpperCase() ||
                          "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold text-sidebar-foreground">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.firstName ||
                            user?.email?.split("@")[0] ||
                            "Admin"}
                      </span>
                      <span className="truncate text-[10px] text-muted-foreground font-mono">
                        {user?.email || "admin@portfolio.dev"}
                      </span>
                    </div>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden shrink-0" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-64 min-w-56 rounded-xl bg-popover border-border p-2 text-popover-foreground shadow-2xl"
                side="top"
                align="start"
                sideOffset={8}
              >
                {/* User Info Header */}
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2.5 px-1 py-1.5 text-left text-xs">
                    <Avatar className="h-8 w-8 rounded-lg border border-border">
                      <AvatarImage
                        src={user?.avatarUrl}
                        alt={user?.firstName || "Admin"}
                        className="object-cover rounded-lg"
                      />
                      <AvatarFallback className="rounded-lg bg-primary/15 text-primary text-xs font-bold">
                        {user?.firstName?.charAt(0).toUpperCase() ||
                          user?.email?.charAt(0).toUpperCase() ||
                          "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-xs leading-tight">
                      <span className="truncate font-semibold text-foreground">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.firstName || "Admin"}
                      </span>
                      <span className="truncate text-[10px] text-muted-foreground font-mono">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1.5 bg-border" />

                {/* Theme Selector Section */}
                <div className="px-2 py-1.5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    Theme
                  </span>
                  <ThemeToggle size="sm" />
                </div>

                <DropdownMenuSeparator className="my-1.5 bg-border" />

                {/* Quick Navigation Items */}
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer text-xs py-1.5 px-2"
                    onClick={closeMobileSidebar}
                  >
                    <Link
                      href="/admin/profile"
                      className="flex items-center gap-2"
                    >
                      <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer text-xs py-1.5 px-2"
                  >
                    <Link
                      href="/"
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>View Live Portfolio</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-1.5 bg-border" />

                {/* Logout Action */}
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="cursor-pointer text-xs py-1.5 px-2 text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
