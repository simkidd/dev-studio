"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMessages, useUpdateMessageStatus, useDeleteMessage } from "@/hooks";
import { IMessage } from "@/interfaces";
import {
  Mail,
  MailOpen,
  Search,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Building,
  ChevronLeft,
  ChevronRight,
  Inbox,
  X,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/date.utils";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Input } from "@/components/ui/input";

export function MessagesView() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const limit = 12;
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Reset page to 1 whenever search or filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  const {
    data: messagesResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useMessages({
    search: search || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page,
    limit,
  });

  const updateStatusMutation = useUpdateMessageStatus();
  const deleteMutation = useDeleteMessage();

  const messages: IMessage[] = useMemo(() => {
    if (Array.isArray(messagesResponse?.data)) {
      return messagesResponse.data;
    }
    if (Array.isArray((messagesResponse?.data as any)?.messages)) {
      return (messagesResponse?.data as any).messages;
    }
    return [];
  }, [messagesResponse]);

  const pagination = messagesResponse?.pagination;
  const totalItems = pagination?.total ?? messages.length;
  const totalPages = pagination?.totalPages ?? 1;
  const startItem = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalItems);

  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;

  const handleOpenMessage = (msg: IMessage) => {
    if (msg.status === "unread") {
      updateStatusMutation.mutate({
        id: msg._id,
        status: "read",
        showToast: false,
      });
    }
    router.push(`/admin/messages/${msg._id}`);
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Top Header & Fast Triage Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Inquiries & Leads CRM
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {totalItems} total
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Client project briefs, high-throughput inquiries, and proposal
            communication telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="px-3.5 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Refresh Leads"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
            <span>{isRefetching ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Filter Strip */}
      <div className="bg-card border border-border rounded-xl p-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by client name, email, company, or scope..."
            className="pl-8 pr-8 text-xs h-8"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer z-10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { label: "All Inquiries", value: "all", count: totalItems },
            { label: "Unread", value: "unread", count: unreadCount },
            { label: "Replied", value: "replied", count: repliedCount },
            { label: "Archived", value: "archived" },
          ].map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`h-8 px-3.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact Inquiries Feed */}
      <div className="bg-card border border-border rounded-xl divide-y divide-border/60 overflow-hidden shadow-xs">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-3 flex items-center justify-between gap-3 animate-pulse"
            >
              <div className="flex items-center gap-2.5 w-48 shrink-0">
                <Skeleton className="size-7 rounded-full bg-muted" />
                <div className="space-y-1">
                  <Skeleton className="h-3.5 w-24 bg-muted" />
                  <Skeleton className="h-2.5 w-20 bg-muted/60" />
                </div>
              </div>
              <Skeleton className="h-3.5 flex-1 bg-muted" />
              <div className="flex items-center gap-2 shrink-0">
                <Skeleton className="h-4 w-16 bg-muted rounded" />
                <Skeleton className="h-3 w-16 bg-muted" />
              </div>
            </div>
          ))
        ) : messages.length === 0 ? (
          <div className="py-12 text-center space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-muted/70 flex items-center justify-center mx-auto text-muted-foreground">
              <Inbox className="w-5 h-5 opacity-80" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-sm font-semibold text-foreground">
                No Inquiries Found
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                {search
                  ? "No inquiries matched your search criteria."
                  : "New portfolio contact submissions will appear here."}
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUnread = msg.status === "unread";
            const isReplied = msg.status === "replied";

            return (
              <div
                key={msg._id}
                onClick={() => handleOpenMessage(msg)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 transition-colors group cursor-pointer relative flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3 ${
                  isUnread
                    ? "bg-primary/[0.03] hover:bg-primary/[0.06] border-l-2 border-l-primary"
                    : "hover:bg-accent/40"
                }`}
              >
                {/* Left: Avatar with Envelope Badge & Sender Info */}
                <div className="flex items-center gap-2.5 min-w-0 md:w-52 shrink-0">
                  <div className="relative shrink-0">
                    <Avatar className="size-7 sm:size-7.5 border border-border">
                      <AvatarFallback
                        className={`text-[11px] font-bold font-mono ${
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
                      title={isUnread ? "Unread Message" : "Read Message"}
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
                        className={`text-xs tracking-tight truncate ${
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
                    <p className="text-[10px] text-muted-foreground font-mono truncate">
                      {msg.senderEmail}
                    </p>
                  </div>
                </div>

                {/* Middle: Subject Line & Message Preview */}
                <div className="min-w-0 flex-1 md:px-1">
                  <div className="flex items-center gap-1.5">
                    <h4
                      className={`text-xs truncate ${
                        isUnread
                          ? "font-bold text-foreground"
                          : "font-medium text-foreground/80"
                      }`}
                    >
                      {msg.subject || "Project Consultation Inquiry"}
                    </h4>
                    {msg.message && (
                      <span className="hidden lg:inline text-xs text-muted-foreground/60 truncate">
                        — {msg.message.replace(/[\r\n]+/g, " ")}
                      </span>
                    )}
                  </div>
                  {msg.message && (
                    <p className="lg:hidden text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      {msg.message}
                    </p>
                  )}
                </div>

                {/* Right: Badges, Timestamp & Action Buttons */}
                <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-border/30">
                  <div className="flex items-center gap-1 flex-wrap">
                    {isUnread && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-primary/10 text-primary border border-primary/20 shrink-0">
                        Unread
                      </span>
                    )}

                    {msg.budgetRange && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                        {msg.budgetRange}
                      </span>
                    )}

                    {isReplied && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-0.5 shrink-0">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        <span>Replied</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-auto md:ml-0">
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0 text-right whitespace-nowrap">
                      {formatDateTime(msg.createdAt)}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-0.5 shrink-0 opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      {isUnread ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatusMutation.mutate({
                              id: msg._id,
                              status: "read",
                            });
                          }}
                          className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          title="Mark Read"
                        >
                          <MailOpen className="w-3 h-3 text-emerald-500" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatusMutation.mutate({
                              id: msg._id,
                              status: "unread",
                            });
                          }}
                          className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          title="Mark Unread"
                        >
                          <Mail className="w-3 h-3 text-primary" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget({
                            id: msg._id,
                            name: msg.senderName,
                          });
                        }}
                        className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Pagination Bar */}
      {totalPages > 1 && (
        <div className="p-3 bg-card border border-border rounded-xl flex items-center justify-between shadow-xs">
          <span className="text-xs font-mono text-muted-foreground">
            Showing {startItem}-{endItem} of {totalItems} inquiries
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors border border-border"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-foreground px-2">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors border border-border"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Client Inquiry"
        description={`Are you sure you want to permanently delete the inquiry from "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Inquiry"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteMutation.mutate(deleteTarget.id, {
            onSuccess: () => {
              setDeleteTarget(null);
            },
          });
        }}
      />
    </div>
  );
}
