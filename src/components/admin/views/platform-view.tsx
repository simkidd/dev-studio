"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  usePlatformStats,
  usePlatformUsers,
  useUpdateUserRole,
  useDeletePlatformUser,
} from "@/hooks";
import {
  ShieldCheck,
  Users,
  Globe,
  FolderKanban,
  Mail,
  Server,
  Activity,
  Search,
  ExternalLink,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  Database,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PlatformView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState<{ id: string; name: string } | null>(null);

  const {
    data: stats,
    isLoading: isStatsLoading,
    refetch: refetchStats,
    isRefetching: isStatsRefetching,
  } = usePlatformStats();

  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = usePlatformUsers({
    page,
    limit: 15,
    search: searchTerm,
    role: selectedRole === "all" ? undefined : selectedRole,
  });

  const updateRoleMutation = useUpdateUserRole();
  const deleteUserMutation = useDeletePlatformUser();

  const handleRoleChange = (userId: string, newRole: "user" | "admin" | "superadmin") => {
    updateRoleMutation.mutate({ userId, role: newRole });
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    deleteUserMutation.mutate(userToDelete.id, {
      onSuccess: () => {
        setUserToDelete(null);
      },
    });
  };

  const formatUptime = (seconds?: number) => {
    if (!seconds) return "0m";
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (d > 0) return `${d}d ${h}h ${m}m`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  const metrics = stats?.metrics;
  const sys = stats?.systemInfo;
  const templateDist = stats?.templateDistribution;

  const totalTemplatesCount =
    (templateDist?.["classic-dev"] || 0) +
    (templateDist?.["nova-engine"] || 0) +
    (templateDist?.["apex-studio"] || 0) || 1;

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Platform Command Hub
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              Superadmin
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Global SaaS telemetry, multi-tenant fleet governance, and platform health.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              refetchStats();
              refetchUsers();
              toast.success("Platform telemetry refreshed");
            }}
            disabled={isStatsRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Refresh telemetry"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isStatsRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-card border border-border space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Registered Developers
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold tracking-tight text-foreground">
              {isStatsLoading ? "..." : metrics?.totalUsers ?? 0}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
              <span className="text-emerald-500 font-semibold">
                {stats?.roleDistribution.user ?? 0} devs
              </span>
              <span>&bull;</span>
              <span>{stats?.roleDistribution.superadmin ?? 0} owners</span>
            </div>
          </div>
        </motion.div>

        {/* Live Portfolios */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-5 rounded-2xl bg-card border border-border space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Live Portfolios
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold tracking-tight text-foreground">
              {isStatsLoading ? "..." : metrics?.publishedPortfolios ?? 0}
            </div>
            <div className="text-[11px] text-muted-foreground font-mono">
              out of {metrics?.totalPortfolios ?? 0} total created
            </div>
          </div>
        </motion.div>

        {/* Platform Projects */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl bg-card border border-border space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Global Project Fleet
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold tracking-tight text-foreground">
              {isStatsLoading ? "..." : metrics?.totalProjects ?? 0}
            </div>
            <div className="text-[11px] text-muted-foreground font-mono">
              across all developer portfolios
            </div>
          </div>
        </motion.div>

        {/* Inbound Leads / Messages */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-5 rounded-2xl bg-card border border-border space-y-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
              Inbound CRM Leads
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold tracking-tight text-foreground">
              {isStatsLoading ? "..." : metrics?.totalMessages ?? 0}
            </div>
            <div className="text-[11px] text-muted-foreground font-mono">
              recruiter inquiries routed
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 2: Template Adoption & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Template Adoption Breakdown */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-card border border-border space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold tracking-tight text-foreground">
                Template Adoption Dispatcher
              </h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              {metrics?.totalPortfolios ?? 0} portfolios
            </span>
          </div>

          <div className="space-y-4">
            {/* Nova Engine */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  Nova Engine (Interactive Canvas / Systems)
                </span>
                <span className="font-mono text-muted-foreground">
                  {templateDist?.["nova-engine"] || 0} (
                  {Math.round(((templateDist?.["nova-engine"] || 0) / totalTemplatesCount) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(((templateDist?.["nova-engine"] || 0) / totalTemplatesCount) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Apex Studio */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Apex Studio (Executive Editorial / Monospace)
                </span>
                <span className="font-mono text-muted-foreground">
                  {templateDist?.["apex-studio"] || 0} (
                  {Math.round(((templateDist?.["apex-studio"] || 0) / totalTemplatesCount) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(((templateDist?.["apex-studio"] || 0) / totalTemplatesCount) * 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Classic Dev */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Classic Dev (Minimal Clean / Terminal)
                </span>
                <span className="font-mono text-muted-foreground">
                  {templateDist?.["classic-dev"] || 0} (
                  {Math.round(((templateDist?.["classic-dev"] || 0) / totalTemplatesCount) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.round(((templateDist?.["classic-dev"] || 0) / totalTemplatesCount) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-500" />
              <h2 className="text-sm font-bold tracking-tight text-foreground">
                Platform Infrastructure
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Server Uptime
              </span>
              <div className="text-sm font-bold text-foreground font-mono">
                {formatUptime(sys?.uptimeSeconds)}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Node Runtime
              </span>
              <div className="text-sm font-bold text-foreground font-mono">
                {sys?.nodeVersion || "v20.x"}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Heap Memory
              </span>
              <div className="text-sm font-bold text-foreground font-mono">
                {sys?.memoryHeapUsedMb ?? 0} MB / {sys?.memoryHeapTotalMb ?? 0} MB
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                Environment
              </span>
              <div className="text-sm font-bold text-foreground font-mono capitalize">
                {sys?.environment || "development"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Global User Fleet Directory Table */}
      <div className="p-6 rounded-3xl bg-card border border-border space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              <h2 className="text-base font-bold tracking-tight text-foreground">
                Registered Developer Fleet
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Search, manage permissions, inspect claimed portfolio slugs, or delete accounts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search name or email..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Role Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/60 border border-border text-xs">
              {(["all", "user", "admin", "superadmin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors capitalize cursor-pointer text-[11px] ${
                    selectedRole === r
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r === "all" ? "All" : r === "user" ? "Devs" : r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto border border-border rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">Developer</th>
                <th className="py-3 px-4 font-semibold">Portfolio Slug</th>
                <th className="py-3 px-4 font-semibold text-center">Projects</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isUsersLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground font-mono">
                    Loading developer fleet...
                  </td>
                </tr>
              ) : usersData?.users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No users matching criteria.
                  </td>
                </tr>
              ) : (
                usersData?.users.map((u) => {
                  const initials = `${u.firstName?.[0] || ""}${u.lastName?.[0] || ""}`.toUpperCase() || "U";
                  return (
                    <tr key={u._id} className="hover:bg-muted/30 transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 rounded-xl border border-border">
                            <AvatarImage src={u.profile?.avatarUrl} />
                            <AvatarFallback className="font-mono text-xs font-bold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <div className="font-bold text-foreground">
                              {u.firstName} {u.lastName}
                            </div>
                            <div className="text-[11px] text-muted-foreground font-mono">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Portfolio Slug & Live Link */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {u.portfolio?.slug ? (
                          <div className="flex items-center gap-2">
                            <span className="text-foreground font-semibold">
                              /{u.portfolio.slug}
                            </span>
                            <Link
                              href={`/${u.portfolio.slug}`}
                              target="_blank"
                              className="text-primary hover:underline inline-flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                            {u.portfolio.isPublished && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                Live
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">Pending Onboarding</span>
                        )}
                      </td>

                      {/* Projects count */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-muted text-foreground font-semibold">
                          {u.projectCount}
                        </span>
                      </td>

                      {/* Role Modifier Dropdown */}
                      <td className="py-3.5 px-4">
                        <Select
                          defaultValue={u.role}
                          onValueChange={(val) =>
                            handleRoleChange(u._id, val as "user" | "admin" | "superadmin")
                          }
                          disabled={updateRoleMutation.isPending}
                        >
                          <SelectTrigger className="w-32 h-7 text-[11px] font-mono rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User (Dev)</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="superadmin">Superadmin</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>

                      {/* Delete Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() =>
                            setUserToDelete({
                              id: u._id,
                              name: `${u.firstName} ${u.lastName} (${u.email})`,
                            })
                          }
                          className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={Boolean(userToDelete)} onOpenChange={() => setUserToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-destructive flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete User Account
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-foreground">{userToDelete?.name}</strong>?
              This will erase their portfolio, case studies, posts, and inquiries. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <button
              onClick={() => setUserToDelete(null)}
              className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={deleteUserMutation.isPending}
              className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-semibold hover:opacity-90 transition-all cursor-pointer"
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Permanently Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
