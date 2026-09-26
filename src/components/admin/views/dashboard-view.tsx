"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useDashboardStats,
  useProjects,
  useMessages,
  useUpdateMessageStatus,
} from "@/hooks";
import { IMessage, IProject } from "@/interfaces";
import {
  FolderGit2,
  Mail,
  TrendingUp,
  FileText,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Sparkline } from "@/components/ui/sparkline";
import { SegmentedMeter } from "@/components/ui/segmented-meter";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectEditorDialog } from "@/components/admin";
import { formatDateTime } from "@/lib/date.utils";

export function DashboardView() {
  const { data: stats, isLoading: isStatsLoading } = useDashboardStats();
  const { data: projectsData, isLoading: isProjectsLoading } = useProjects({
    limit: 5,
  });
  const { data: messagesData, isLoading: isMessagesLoading } = useMessages({
    limit: 6,
  });

  const updateMessageStatus = useUpdateMessageStatus();
  const [isProjectSheetOpen, setIsProjectSheetOpen] = useState(false);

  const projects: IProject[] = Array.isArray(projectsData?.data)
    ? projectsData.data
    : Array.isArray((projectsData?.data as any)?.projects)
      ? (projectsData?.data as any).projects
      : [];
  const messages: IMessage[] = Array.isArray(messagesData?.data)
    ? messagesData.data
    : Array.isArray((messagesData?.data as any)?.messages)
      ? (messagesData?.data as any).messages
      : [];

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

          <div className="divide-y divide-border flex-1">
            {isMessagesLoading ? (
              <div className="p-6 space-y-3">
                <Skeleton className="h-12 w-full bg-muted" />
                <Skeleton className="h-12 w-full bg-muted" />
                <Skeleton className="h-12 w-full bg-muted" />
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
              messages.map((msg: IMessage) => (
                <div
                  key={msg._id}
                  className="p-3.5 hover:bg-muted/40 transition-colors flex items-start justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium text-foreground">
                        {msg.senderName}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {msg.senderEmail}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                          msg.status === "unread"
                            ? "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20"
                            : msg.status === "replied"
                              ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {msg.subject || msg.message}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground font-mono">
                      <span>{formatDateTime(msg.createdAt)}</span>
                      {msg.budgetRange && (
                        <span className="text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-1 rounded">
                          {msg.budgetRange}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 shrink-0">
                    {msg.status === "unread" && (
                      <button
                        onClick={() =>
                          updateMessageStatus.mutate({
                            id: msg._id,
                            status: "read",
                          })
                        }
                        title="Mark as read"
                        className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-emerald-500 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <Link
                      href={`/admin/messages`}
                      className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
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

          <div className="divide-y divide-border flex-1">
            {isProjectsLoading ? (
              <div className="p-6 space-y-3">
                <Skeleton className="h-12 w-full bg-muted" />
                <Skeleton className="h-12 w-full bg-muted" />
                <Skeleton className="h-12 w-full bg-muted" />
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
                  className="p-3.5 hover:bg-muted/40 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-muted border border-border overflow-hidden shrink-0">
                      {proj.thumbnailUrl ? (
                        <img
                          src={proj.thumbnailUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          <FolderGit2 className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground truncate">
                          {proj.title}
                        </span>
                        {proj.isFeatured && (
                          <span className="text-[9px] font-semibold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            STAR
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] text-primary font-mono bg-primary/10 px-1.5 py-0.2 rounded border border-primary/20">
                          {proj.category}
                        </span>
                        <span className="text-[10px] text-muted-foreground truncate">
                          {proj.technologies.slice(0, 3).join(" • ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/admin/projects`}
                    className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
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
          setIsProjectSheetOpen(false);
        }}
      />
    </div>
  );
}
