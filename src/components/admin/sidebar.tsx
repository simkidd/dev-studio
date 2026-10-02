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
  Palette,
  Sparkles,
  ExternalLink,
  ChevronsUpDown,
  ShieldCheck,
  Users,
  Globe,
  Megaphone,
  FileText,
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
    ...(user?.role === "superadmin"
      ? [
          {
            title: "PLATFORM (SUPERADMIN)",
            items: [
              {
                title: "Platform Hub",
                href: "/admin/platform",
                icon: ShieldCheck,
                badge: "OVERVIEW",
              },
              {
                title: "Developer Fleet",
                href: "/admin/platform/users",
                icon: Users,
              },
              {
                title: "Domain & Slugs",
                href: "/admin/platform/domains",
                icon: Globe,
              },
              {
                title: "Global Templates",
                href: "/admin/platform/templates",
                icon: Palette,
              },
              {
                title: "Broadcasts & Alerts",
                href: "/admin/platform/announcements",
                icon: Megaphone,
              },
              {
                title: "Security Logs",
                href: "/admin/platform/logs",
                icon: FileText,
              },
            ],
          },
        ]
      : []),
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
      title: "DESIGN & THEMES",
      items: [
        {
          title: "Templates",
          href: "/admin/templates",
          icon: Palette,
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
          title: "Profile & Settings",
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
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <h1 className="text-sm font-semibold text-sidebar-foreground group-hover:text-primary transition-colors leading-none">
                Dev Studio
              </h1>
              <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                {user?.role === "superadmin" ? "Platform Control" : "Portfolio Command"}
              </p>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      {/* Nav Content */}
      <SidebarContent className="p-2 gap-4">
        {navSections.map((section, idx) => (
          <SidebarGroup key={section.title || idx} className="p-0">
            {section.title && (
              <SidebarGroupLabel className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase px-2 mb-1">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : item.href === "/admin/platform"
                      ? pathname === "/admin/platform"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        onClick={closeMobileSidebar}
                        className={cn(
                          "transition-colors text-xs font-medium rounded-lg h-9 px-2.5",
                          isActive
                            ? "bg-primary/10 text-primary hover:bg-primary/15 font-semibold"
                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        )}
                      >
                        <Link href={item.href} className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={cn(
                                "w-4 h-4 shrink-0",
                                isActive ? "text-primary" : "text-muted-foreground",
                              )}
                            />
                            <span className="truncate">{item.title}</span>
                          </div>
                          {item.badge && (
                            <span
                              className={cn(
                                "px-1.5 py-0.5 text-[9px] font-mono rounded-full font-bold uppercase tracking-wider group-data-[collapsible=icon]:hidden shrink-0",
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground",
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

      {/* Footer / User Profile */}
      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-lg h-12"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.avatarUrl}
                      alt={user?.firstName || "Admin"}
                    />
                    <AvatarFallback className="rounded-lg bg-primary/15 text-primary text-xs font-bold">
                      {user?.firstName?.charAt(0).toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase() ||
                        "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold text-sidebar-foreground">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.firstName || user?.email?.split("@")[0] || "Admin"}
                    </span>
                    <span className="truncate text-[10px] text-muted-foreground font-mono">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-xs">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.avatarUrl}
                        alt={user?.firstName || "Admin"}
                      />
                      <AvatarFallback className="rounded-lg bg-primary/15 text-primary text-xs font-bold">
                        {user?.firstName?.charAt(0).toUpperCase() || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-xs leading-tight">
                      <span className="truncate font-semibold">
                        {user?.firstName} {user?.lastName}
                      </span>
                      <span className="truncate text-[10px] text-muted-foreground font-mono">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      target="_blank"
                      className="cursor-pointer text-xs flex items-center justify-between"
                    >
                      <span>Public Platform</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/profile"
                      className="cursor-pointer text-xs flex items-center justify-between"
                    >
                      <span>Settings & Bio</span>
                      <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="p-1.5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer text-xs flex items-center gap-2"
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
