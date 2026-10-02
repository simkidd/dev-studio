"use client";

import React, { useState } from "react";
import { useReservedSlugs, useAddReservedSlug, useDeleteReservedSlug } from "@/hooks";
import {
  Globe,
  Plus,
  Trash2,
  Lock,
  Search,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  Server,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PlatformDomainsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newSlug, setNewSlug] = useState("");
  const [newReason, setNewReason] = useState("");

  const { data: slugs, isLoading, refetch, isRefetching } = useReservedSlugs();
  const addSlugMutation = useAddReservedSlug();
  const deleteSlugMutation = useDeleteReservedSlug();

  const filteredSlugs = slugs?.filter(
    (s) =>
      s.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.reason?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddSlug = () => {
    if (!newSlug.trim()) {
      toast.error("Please enter a slug name.");
      return;
    }

    addSlugMutation.mutate(
      { slug: newSlug, reason: newReason },
      {
        onSuccess: () => {
          setIsAddOpen(false);
          setNewSlug("");
          setNewReason("");
        },
      },
    );
  };

  const handleDeleteSlug = (id: string, isSystem: boolean) => {
    if (isSystem) {
      toast.error("Protected system routes cannot be deleted.");
      return;
    }
    deleteSlugMutation.mutate(id);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Domain & Slug Registry
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {slugs?.length ?? 0} records
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage system reserved keywords, blacklist brand names, and configure custom domain rules.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              refetch();
              toast.success("Registry refreshed");
            }}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Refresh registry"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Reserve Keyword</span>
          </button>
        </div>
      </div>

      {/* Grid: Reserved Slugs Table + Custom Domain Configuration info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Reserved Slugs Blacklist */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-card border border-border space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="text-sm font-bold tracking-tight text-foreground">
                Reserved Slugs & Keyword Blacklist
              </h2>
              <p className="text-xs text-muted-foreground">
                Developers cannot register or change their portfolio slug to any keyword in this list.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter keywords..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
              />
            </div>
          </div>

          <div className="border border-border rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 border-b border-border text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-semibold">Slug Keyword</th>
                  <th className="py-3 px-4 font-semibold">Category / Reason</th>
                  <th className="py-3 px-4 font-semibold text-center">Type</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground font-mono">
                      Loading reserved slug registry...
                    </td>
                  </tr>
                ) : filteredSlugs?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-muted-foreground">
                      No reserved slugs found.
                    </td>
                  </tr>
                ) : (
                  filteredSlugs?.map((item) => (
                    <tr key={item._id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-foreground">
                        /{item.slug}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-[11px]">
                        {item.reason}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {item.isSystem ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <Lock className="w-2.5 h-2.5" />
                            SYSTEM
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-muted text-foreground border border-border">
                            CUSTOM
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {!item.isSystem && (
                          <button
                            onClick={() => handleDeleteSlug(item._id, item.isSystem)}
                            disabled={deleteSlugMutation.isPending}
                            className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            title="Remove reservation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Custom Domain & Edge Routing Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold tracking-tight text-foreground">
                Custom Domain Architecture
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When developers connect custom domains (e.g. <code className="font-mono text-primary">alex.dev</code>), the platform router resolves the host to their portfolio slug.
            </p>

            <div className="space-y-3 pt-2 font-mono text-[11px]">
              <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-1">
                <span className="text-muted-foreground text-[10px] uppercase">CNAME Record Target</span>
                <div className="text-foreground font-bold select-all">
                  cname.devportfolio.app
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-1">
                <span className="text-muted-foreground text-[10px] uppercase">Apex A Record (IPv4)</span>
                <div className="text-foreground font-bold select-all">
                  76.76.21.21
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-1 text-emerald-600 dark:text-emerald-400">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Automatic SSL Provisioning</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Let&apos;s Encrypt wildcard certificates are issued automatically when DNS propagates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Reserved Keyword Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Reserve Keyword / Slug
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add a keyword to prevent any developer from claiming it as a portfolio URL.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Slug Keyword
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">
                  /
                </span>
                <input
                  type="text"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  placeholder="e.g. security, meta, billing"
                  className="w-full pl-7 pr-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Reason / Note
              </label>
              <input
                type="text"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                placeholder="e.g. Protected brand keyword or future internal route"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSlug}
              disabled={addSlugMutation.isPending}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 transition-all cursor-pointer"
            >
              {addSlugMutation.isPending ? "Reserving..." : "Add to Blacklist"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
