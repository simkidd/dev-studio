"use client";

import React, { useState } from "react";
import {
  usePlatformUsers,
  useUpdateUserRole,
  useDeletePlatformUser,
  useImpersonateUser,
} from "@/hooks";
import {
  Users,
  Search,
  ExternalLink,
  Trash2,
  UserCheck,
  Shield,
  Eye,
  Calendar,
  Layers,
  Globe,
  Sparkles,
  AlertTriangle,
  FolderKanban,
  Mail,
  RefreshCw,
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
import { IPlatformUserItem } from "@/lib/api";

export function PlatformUsersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [userToDelete, setUserToDelete] = useState<IPlatformUserItem | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<IPlatformUserItem | null>(null);

  const {
    data: usersData,
    isLoading,
    refetch,
    isRefetching,
  } = usePlatformUsers({
    page,
    limit: 20,
    search: searchTerm,
    role: selectedRole === "all" ? undefined : selectedRole,
  });

  const updateRoleMutation = useUpdateUserRole();
  const deleteUserMutation = useDeletePlatformUser();
  const impersonateMutation = useImpersonateUser();

  const handleRoleChange = (userId: string, newRole: "user" | "admin" | "superadmin") => {
    updateRoleMutation.mutate({ userId, role: newRole });
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    deleteUserMutation.mutate(userToDelete._id, {
      onSuccess: () => {
        setUserToDelete(null);
      },
    });
  };

  const handleImpersonate = (user: IPlatformUserItem) => {
    impersonateMutation.mutate(user._id);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Developer Fleet
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {usersData?.pagination.total ?? 0} records
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Inspect registered developers, manage roles, login in support mode, and moderate accounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              refetch();
              toast.success("User directory refreshed");
            }}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Refresh directory"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email or slug..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/60 border border-border text-xs w-full sm:w-auto justify-center">
          {(["all", "user", "admin", "superadmin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors capitalize cursor-pointer text-xs ${
                selectedRole === r
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r === "all" ? "All Users" : r === "user" ? "Developers" : r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="border border-border rounded-3xl bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Developer</th>
                <th className="py-3.5 px-4 font-semibold">Portfolio Claim</th>
                <th className="py-3.5 px-4 font-semibold text-center">Projects</th>
                <th className="py-3.5 px-4 font-semibold">Role Tier</th>
                <th className="py-3.5 px-4 font-semibold">Joined Date</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground font-mono">
                    Loading developer fleet...
                  </td>
                </tr>
              ) : usersData?.users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No developers match the specified criteria.
                  </td>
                </tr>
              ) : (
                usersData?.users.map((u) => {
                  const initials = `${u.firstName?.[0] || ""}${u.lastName?.[0] || ""}`.toUpperCase() || "U";
                  return (
                    <tr key={u._id} className="hover:bg-muted/30 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8 rounded-xl border border-border">
                            <AvatarImage src={u.profile?.avatarUrl} />
                            <AvatarFallback className="font-mono text-xs font-bold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <button
                              onClick={() => setSelectedUserDetail(u)}
                              className="font-bold text-foreground hover:text-primary transition-colors text-left cursor-pointer"
                            >
                              {u.firstName} {u.lastName}
                            </button>
                            <div className="text-[11px] text-muted-foreground font-mono">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Portfolio Slug */}
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
                              title="View live portfolio"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                            {u.portfolio.isPublished ? (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                                Live
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded text-[9px] bg-muted text-muted-foreground">
                                Draft
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">Pending Onboarding</span>
                        )}
                      </td>

                      {/* Project Count */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        <span className="px-2 py-0.5 rounded-md bg-muted text-foreground font-semibold">
                          {u.projectCount}
                        </span>
                      </td>

                      {/* Role Selector */}
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

                      {/* Joined Date */}
                      <td className="py-3.5 px-4 text-muted-foreground font-mono text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Support Impersonation Button */}
                          <button
                            onClick={() => handleImpersonate(u)}
                            disabled={impersonateMutation.isPending}
                            className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                            title="Log in as this user (Support Mode)"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View As</span>
                          </button>

                          {/* Delete Account */}
                          <button
                            onClick={() => setUserToDelete(u)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            title="Delete Account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Inspector Modal */}
      <Dialog open={Boolean(selectedUserDetail)} onOpenChange={() => setSelectedUserDetail(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-primary" />
              Developer Tenant Details
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Detailed account metadata and portfolio configuration.
            </DialogDescription>
          </DialogHeader>

          {selectedUserDetail && (
            <div className="space-y-4 py-2 text-xs">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border border-border">
                <Avatar className="w-12 h-12 rounded-xl border border-border">
                  <AvatarImage src={selectedUserDetail.profile?.avatarUrl} />
                  <AvatarFallback className="font-mono text-sm font-bold">
                    {selectedUserDetail.firstName?.[0]}
                    {selectedUserDetail.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-foreground">
                    {selectedUserDetail.firstName} {selectedUserDetail.lastName}
                  </div>
                  <div className="text-muted-foreground font-mono">{selectedUserDetail.email}</div>
                  <div className="text-[11px] text-primary">
                    {selectedUserDetail.profile?.headline || "No headline set"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-3 rounded-xl bg-muted/30 border border-border space-y-1">
                  <span className="text-muted-foreground uppercase text-[10px]">Portfolio Slug</span>
                  <div className="text-foreground font-bold">
                    /{selectedUserDetail.portfolio?.slug || "pending"}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border space-y-1">
                  <span className="text-muted-foreground uppercase text-[10px]">Template Engine</span>
                  <div className="text-foreground font-bold capitalize">
                    {selectedUserDetail.portfolio?.templateId || "classic-dev"}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border space-y-1">
                  <span className="text-muted-foreground uppercase text-[10px]">Total Projects</span>
                  <div className="text-foreground font-bold">{selectedUserDetail.projectCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-muted/30 border border-border space-y-1">
                  <span className="text-muted-foreground uppercase text-[10px]">User Role</span>
                  <div className="text-foreground font-bold capitalize">{selectedUserDetail.role}</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <button
              onClick={() => setSelectedUserDetail(null)}
              className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={Boolean(userToDelete)} onOpenChange={() => setUserToDelete(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Delete User Account
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground pt-1 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-foreground">
                {userToDelete?.firstName} {userToDelete?.lastName} ({userToDelete?.email})
              </strong>
              ? This will wipe all associated projects, posts, skills, and portfolio settings.
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
