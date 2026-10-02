"use client";

import React, { useState } from "react";
import { useAuditLogs } from "@/hooks";
import {
  FileText,
  Shield,
  Search,
  Filter,
  RefreshCw,
  User,
  Clock,
  Terminal,
  AlertTriangle,
  Globe,
  Palette,
  Megaphone,
} from "lucide-react";
import { toast } from "sonner";

export function PlatformLogsView() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);

  const { data: logsData, isLoading, refetch, isRefetching } = useAuditLogs({
    page,
    limit: 25,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    auth: Shield,
    user_management: User,
    domain: Globe,
    template: Palette,
    announcement: Megaphone,
    system: Terminal,
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Security & Audit Logs
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {logsData?.pagination.total ?? 0} events
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Immutable audit trail of administrative actions, role elevations, deletions, and security occurrences.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              refetch();
              toast.success("Audit trail refreshed");
            }}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Refresh audit trail"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted/60 border border-border text-xs overflow-x-auto">
        {[
          { id: "all", label: "All Events" },
          { id: "user_management", label: "User Management" },
          { id: "auth", label: "Authentication" },
          { id: "domain", label: "Domain & Slugs" },
          { id: "template", label: "Templates" },
          { id: "announcement", label: "Announcements" },
          { id: "system", label: "System" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedCategory(tab.id);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap cursor-pointer text-xs ${
              selectedCategory === tab.id
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="border border-border rounded-3xl bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Action Event</th>
                <th className="py-3.5 px-4 font-semibold">Performed By</th>
                <th className="py-3.5 px-4 font-semibold">Target / Details</th>
                <th className="py-3.5 px-4 font-semibold">IP Address</th>
                <th className="py-3.5 px-4 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground font-mono">
                    Loading security audit logs...
                  </td>
                </tr>
              ) : logsData?.logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    No audit logs recorded for this category yet.
                  </td>
                </tr>
              ) : (
                logsData?.logs.map((log) => {
                  const Icon = categoryIcons[log.category] || Terminal;
                  return (
                    <tr key={log._id} className="hover:bg-muted/30 transition-colors">
                      {/* Action */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-muted border border-border text-muted-foreground shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-mono font-bold text-foreground text-[11px]">
                            {log.action}
                          </span>
                        </div>
                      </td>

                      {/* Performed By */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <div className="font-bold text-foreground">
                          {log.performedBy?.firstName} {log.performedBy?.lastName}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {log.performedBy?.email}
                        </div>
                      </td>

                      {/* Details / Target */}
                      <td className="py-3.5 px-4">
                        <div className="font-mono text-[11px] text-muted-foreground max-w-md truncate">
                          {log.targetUser ? (
                            <span>
                              Target: <strong className="text-foreground">{log.targetUser.email}</strong>{" "}
                            </span>
                          ) : null}
                          {Object.keys(log.details || {}).length > 0 ? (
                            <span>{JSON.stringify(log.details)}</span>
                          ) : (
                            <span>—</span>
                          )}
                        </div>
                      </td>

                      {/* IP */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-muted-foreground">
                        {log.ipAddress || "127.0.0.1"}
                      </td>

                      {/* Timestamp */}
                      <td className="py-3.5 px-4 text-right font-mono text-[11px] text-muted-foreground">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
