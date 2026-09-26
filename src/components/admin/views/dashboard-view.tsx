"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useDashboardStats,
  useUpdateMessageStatus,
} from "@/hooks";
import { IMessage, IProject } from "@/interfaces";
import {
  FolderGit2,
  Mail,
  MailOpen,
  TrendingUp,
  FileText,
  ArrowUpRight,
  Send,
  Building,
  Activity,
} from "lucide-react";
import { Sparkline } from "@/components/ui/sparkline";
import { SegmentedMeter } from "@/components/ui/segmented-meter";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProjectEditorDialog } from "@/components/admin";
import { formatDateTime } from "@/lib/date.utils";

export function DashboardView() {
  const router = useRouter();
  const { data: stats, isLoading: isStatsLoading, refetch } = useDashboardStats();

  const updateMessageStatus = useUpdateMessageStatus();
  const [isProjectSheetOpen, setIsProjectSheetOpen] = useState(false);

  const projects: IProject[] = stats?.recent?.projects ?? [];
  const messages: IMessage[] = stats?.recent?.messages ?? [];

  return (
    <div className="space-y-6">
      {/* Top Header & Fast Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2.5">
            <span>Portfolio Command Hub</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              Live Server v2.4
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time pipeline metrics, project showcases, and client inquiry
            telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsProjectSheetOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-medium shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
          <Link
            href="/admin/messages"
            className="px-3.5 py-2 rounded-lg bg-card hover:bg-accent border border-border text-foreground text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>View Inbound Leads</span>
          </Link>
        </div>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Total Inquiries */}
        <div className="bg-card border border-border rounded-xl p-4 relative overflow-hidden group hover:border-border/80 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Total Inquiries
            </span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 dark:text-indigo-400">
              <Mail className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground tracking-tight font-mono">
              {isStatsLoading ? "..." : (stats?.counts?.messages?.total ?? 0)}
            </span>
            <div className="flex items-center text-[11px] text-emerald-500 dark:text-emerald-400 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+18.4%</span>
            </div>
          </div>
          <div className="mt-3 h-8">
            <Sparkline
              data={[12, 18, 15, 24, 22, 35, 42, 38, 48]}
              color="indigo"
              height={32}
            />
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground flex items-center justify-between">
            <span>Unread: {stats?.counts?.messages?.unread ?? 0}</span>
            <span className="text-indigo-500 dark:text-indigo-400 font-medium">
              Active CRM Leads
            </span>
          </div>
        </div>

        {/* Live Projects */}
        <div className="bg-card border border-border rounded-xl p-4 relative overflow-hidden group hover:border-border/80 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Showcase Projects
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground tracking-tight font-mono">
              {isStatsLoading ? "..." : (stats?.counts?.projects?.total ?? 0)}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              Featured: {stats?.counts?.projects?.featured ?? 0}
            </span>
          </div>
          <div className="mt-3 h-8">
            <Sparkline
              data={[4, 6, 8, 8, 11, 14, 15, 17, 20]}
              color="emerald"
              height={32}
            />
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground flex items-center justify-between">
            <span>Published: {stats?.counts?.projects?.published ?? 0}</span>
            <span className="text-emerald-500 dark:text-emerald-400 font-medium">
              100% Case Studies
            </span>
          </div>
        </div>

        {/* Lead Response Rate */}
        <div className="bg-card border border-border rounded-xl p-4 relative overflow-hidden group hover:border-border/80 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Pipeline Response Rate
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground tracking-tight font-mono">
              94.2%
            </span>
            <span className="text-[11px] text-amber-500 dark:text-amber-400 font-medium">
              &lt; 4 hr SLA
            </span>
          </div>
          <div className="mt-4">
            <SegmentedMeter value={94} totalSegments={10} />
          </div>
          <div className="mt-3 text-[10px] text-muted-foreground flex items-center justify-between">
            <span>High-intent leads: 82%</span>
            <span className="text-amber-500 dark:text-amber-400">
              Optimized
            </span>
          </div>
        </div>

        {/* Technical Articles */}
        <div className="bg-card border border-border rounded-xl p-4 relative overflow-hidden group hover:border-border/80 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Published Insights
            </span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 dark:text-cyan-400">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground tracking-tight font-mono">
              {isStatsLoading ? "..." : (stats?.counts?.posts?.total ?? 0)}
            </span>
            <div className="flex items-center text-[11px] text-cyan-500 dark:text-cyan-400 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{stats?.counts?.posts?.totalViews ?? 0} reads</span>
            </div>
          </div>
          <div className="mt-3 h-8">
            <Sparkline
              data={[50, 65, 80, 120, 190, 240, 310, 390, 480]}
              color="cyan"
              height={32}
            />
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground flex items-center justify-between">
            <span>Skills Catalog: {stats?.counts?.skills ?? 0}</span>
            <span className="text-cyan-500 dark:text-cyan-400 font-medium">
              SEO Indexed
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Inbound Leads Stream & Live Projects Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Inbound Leads Stream */}
        <div className="lg:col-span-7 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Recent Inbound Inquiries
              </h2>
            </div>
            <Link
              href="/admin/messages"
              className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-border/60 flex-1">
            {isStatsLoading ? (
              <div className="p-4 space-y-2.5">
                <Skeleton className="h-10 w-full bg-muted" />
                <Skeleton className="h-10 w-full bg-muted" />
                <Skeleton className="h-10 w-full bg-muted" />
              </div>
            ) : messages.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-xs text-muted-foreground font-medium">
                  No inquiries received yet
                </p>
                <p className="text-[11px] text-muted-foreground/80 mt-0.5">
                  Incoming contact form submissions will appear here live.
                </p>
              </div>
            ) : (
              messages.map((msg: IMessage) => {
                const isUnread = msg.status === "unread";
                return (
                  <div
                    key={msg._id}
                    onClick={() => router.push(`/admin/messages/${msg._id}`)}
                    className={`px-3.5 py-2.5 transition-colors group cursor-pointer relative flex items-center justify-between gap-3 ${
                      isUnread
                        ? "bg-primary/[0.03] hover:bg-primary/[0.06] border-l-2 border-l-primary"
                        : "hover:bg-accent/40"
                    }`}
                  >
                    {/* Left: Avatar with Badge & Sender Info */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="relative shrink-0">
                        <Avatar className="size-7 border border-border">
                          <AvatarFallback
                            className={`text-[10px] font-bold font-mono ${
                              isUnread
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {msg.senderName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full flex items-center justify-center border border-card ${
                            isUnread
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isUnread ? (
                            <Mail className="w-2 h-2" />
                          ) : (
                            <MailOpen className="w-2 h-2" />
                          )}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-xs truncate ${
                              isUnread
                                ? "font-bold text-foreground"
                                : "font-semibold text-foreground/85"
                            }`}
                          >
                            {msg.senderName}
                          </span>
                          {msg.company && (
                            <span className="text-[9px] px-1 py-0.2 rounded bg-muted text-muted-foreground border border-border font-medium flex items-center gap-0.5 shrink-0">
                              <Building className="w-2 h-2 opacity-70" />
                              <span className="truncate max-w-[80px]">
                                {msg.company}
                              </span>
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[11px] truncate mt-0.5 ${
                            isUnread
                              ? "font-medium text-foreground/90"
                              : "text-muted-foreground"
                          }`}
                        >
                          {msg.subject || msg.message}
                        </p>
                      </div>
                    </div>

                    {/* Right: Timestamp, Badges & Quick Action */}
                    <div className="flex items-center gap-2 shrink-0">
                      {msg.budgetRange && (
                        <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {msg.budgetRange}
                        </span>
                      )}

                      <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                        {formatDateTime(msg.createdAt)}
                      </span>

                      <div className="flex items-center gap-0.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        {isUnread ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateMessageStatus.mutate({
                                id: msg._id,
                                status: "read",
                              });
                            }}
                            title="Mark as read"
                            className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-emerald-500 transition-colors cursor-pointer"
                          >
                            <MailOpen className="w-3 h-3 text-emerald-500" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateMessageStatus.mutate({
                                id: msg._id,
                                status: "unread",
                              });
                            }}
                            title="Mark as unread"
                            className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                          >
                            <Mail className="w-3 h-3 text-primary" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 5 Cols: Showcase Projects Radar */}
        <div className="lg:col-span-5 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/admin/projects"
              className="text-[11px] text-emerald-500 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium transition-colors"
            >
              <span>View Grid</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-border/60 flex-1">
            {isStatsLoading ? (
              <div className="p-4 space-y-2.5">
                <Skeleton className="h-10 w-full bg-muted" />
                <Skeleton className="h-10 w-full bg-muted" />
                <Skeleton className="h-10 w-full bg-muted" />
              </div>
            ) : projects.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <FolderGit2 className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-xs text-muted-foreground font-medium">
                  No projects added yet
                </p>
                <button
                  onClick={() => setIsProjectSheetOpen(true)}
                  className="mt-2 text-xs text-primary hover:underline cursor-pointer"
                >
                  Create your first showcase project &rarr;
                </button>
              </div>
            ) : (
              projects.map((proj: IProject) => (
                <div
                  key={proj._id}
                  onClick={() => router.push(`/admin/projects/${proj._id}`)}
                  className="px-3.5 py-2.5 hover:bg-accent/40 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-md bg-muted border border-border overflow-hidden shrink-0 relative">
                      {proj.thumbnailUrl ? (
                        <img
                          src={proj.thumbnailUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <FolderGit2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {proj.title}
                        </span>
                        {proj.isFeatured && (
                          <span className="text-[9px] font-semibold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-1 py-0.2 rounded border border-amber-500/20 shrink-0">
                            STAR
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] text-muted-foreground font-mono bg-muted px-1 py-0.2 rounded border border-border">
                          {proj.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate">
                          {proj.technologies && proj.technologies.length > 0
                            ? proj.technologies.slice(0, 3).join(" • ")
                            : proj.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-1 rounded hover:bg-muted text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Project Editor Dialog */}
      <ProjectEditorDialog
        isOpen={isProjectSheetOpen}
        onClose={() => setIsProjectSheetOpen(false)}
        onSaved={() => {
          refetch();
          setIsProjectSheetOpen(false);
        }}
      />
    </div>
  );
}
