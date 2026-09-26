"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  useMessages,
  useUpdateMessageStatus,
  useReplyMessage,
  useDeleteMessage,
} from "@/hooks";
import { IMessage } from "@/interfaces";
import {
  Mail,
  Search,
  CheckCircle2,
  Trash2,
  Send,
  RefreshCw,
  Archive,
  Inbox,
  Building,
  Clock,
  ArrowLeft,
  DollarSign,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/date.utils";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Input } from "@/components/ui/input";

const QUICK_TEMPLATES = [
  {
    label: "Discovery Call",
    text: (name: string, subject?: string) =>
      `Hi ${name},\n\nThank you for reaching out regarding "${
        subject || "your project inquiry"
      }". I've reviewed your specifications and would love to schedule a brief 20-minute discovery call to discuss the technical scope and timeline.\n\nPlease feel free to let me know your preferred availability this week.\n\nBest regards,\nAlex Morgan`,
  },
  {
    label: "Proposal & Scope",
    text: (name: string, subject?: string) =>
      `Hi ${name},\n\nThanks for contacting me! Based on the details provided in "${
        subject || "your inquiry"
      }", this aligns closely with previous production architectures I've delivered.\n\nI am currently preparing an estimate and preliminary roadmap for your review. Would you have any additional requirement documents or design mocks to include?\n\nBest regards,\nAlex Morgan`,
  },
  {
    label: "Fully Booked / Referral",
    text: (name: string) =>
      `Hi ${name},\n\nThank you for considering me for your project. I am currently fully committed on active client milestones and unavailable for new contracts at this moment.\n\nI would be happy to reconnect in the upcoming quarter or recommend a trusted senior engineer within my network if needed.\n\nBest regards,\nAlex Morgan`,
  },
];

export function MessagesView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 15;
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
  const replyMutation = useReplyMessage();
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

  // Selected message object
  const activeMessage = useMemo(() => {
    return messages.find((m) => m._id === selectedId) || null;
  }, [messages, selectedId]);

  // Automatically select the first message on desktop when loaded
  useEffect(() => {
    if (!selectedId && messages.length > 0) {
      // Auto-select on wide screens
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        setSelectedId(messages[0]._id);
      }
    }
  }, [messages, selectedId]);

  // When clicking a message
  const handleSelectMessage = (msg: IMessage) => {
    setSelectedId(msg._id);
    if (msg.status === "unread") {
      updateStatusMutation.mutate({ id: msg._id, status: "read" });
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMessage || !replyText.trim()) return;

    replyMutation.mutate(
      { id: activeMessage._id, reply: replyText.trim() },
      {
        onSuccess: () => {
          setReplyText("");
        },
      },
    );
  };

  const handleApplyTemplate = (
    templateFn: (name: string, subject?: string) => string,
  ) => {
    if (!activeMessage) return;
    const generated = templateFn(
      activeMessage.senderName,
      activeMessage.subject,
    );
    setReplyText(generated);
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;

  return (
    <div className="space-y-3 pb-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Messaging & CRM Inbox
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
              {messages.length} leads
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage incoming portfolio inquiries, client proposals, and dispatch
            replies directly via Brevo SMTP.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="px-3 py-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Refresh Leads"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
            <span>{isRefetching ? "Refreshing..." : "Refresh"}</span>
          </button>
        </div>
      </div>

      {/* 2-Pane Workspace Container */}
      <div className="bg-card border border-border rounded-xl shadow-xs overflow-hidden h-[calc(100vh-210px)] min-h-[580px] flex min-w-0 max-w-full">
        {/* PANE 1: Message List (Left) */}
        <div
          className={`w-full md:w-[380px] lg:w-[410px] shrink-0 border-r border-border flex flex-col bg-card/40 h-full min-h-0 ${
            activeMessage ? "hidden md:flex" : "flex"
          }`}
        >
          {/* List Search Bar & Filter Strip */}
          <div className="p-3 border-b border-border space-y-2.5 bg-card/70 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search leads, emails, specs..."
                className="pl-8 pr-8 text-xs h-8.5"
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

            {/* Quick Status Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
              {[
                { label: "All", value: "all", count: messages.length },
                { label: "Unread", value: "unread", count: unreadCount },
                { label: "Replied", value: "replied", count: repliedCount },
                { label: "Archived", value: "archived" },
              ].map((tab) => {
                const isActive = statusFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setStatusFilter(tab.value)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
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

          {/* Scrollable Message Items */}
          <ScrollArea className="flex-1 min-h-0 h-full w-full">
            {isLoading ? (
              <div className="p-3 space-y-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3.5 w-28 bg-muted" />
                      <Skeleton className="h-3 w-16 bg-muted" />
                    </div>
                    <Skeleton className="h-3 w-40 bg-muted" />
                    <Skeleton className="h-3 w-full bg-muted/60" />
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                  <Inbox className="w-5 h-5 opacity-70" />
                </div>
                <p className="text-xs font-semibold text-foreground">
                  No inquiries found
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {search
                    ? "No matches for your search filter"
                    : "New contact form submissions will appear here"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {messages.map((msg) => {
                  const isSelected = selectedId === msg._id;
                  const isUnread = msg.status === "unread";

                  return (
                    <div
                      key={msg._id}
                      onClick={() => handleSelectMessage(msg)}
                      className={`p-3.5 transition-all cursor-pointer relative group ${
                        isSelected
                          ? "bg-accent/80 border-l-3 border-l-primary"
                          : "hover:bg-accent/40 bg-transparent"
                      } ${isUnread ? "bg-primary/4 font-medium" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <Avatar size="default" className="shrink-0 size-8">
                          <AvatarFallback
                            className={`text-xs font-bold font-mono ${
                              isSelected
                                ? "bg-primary text-primary-foreground font-semibold"
                                : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors"
                            }`}
                          >
                            {msg.senderName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        {/* Info Block */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                className={`text-xs truncate block ${
                                  isUnread
                                    ? "font-bold text-foreground"
                                    : "font-semibold text-foreground/90"
                                }`}
                              >
                                {msg.senderName}
                              </span>
                              {isUnread && (
                                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 animate-pulse" />
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                              {formatDateTime(msg.createdAt).split(" ")[0]}
                            </span>
                          </div>

                          <p className="text-xs text-foreground/85 font-medium truncate block w-full">
                            {msg.subject || "Project Inquiry"}
                          </p>

                          <p className="text-[11px] text-muted-foreground truncate block w-full">
                            {msg.message}
                          </p>

                          {/* Pills Footer */}
                          <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                            {msg.budgetRange && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                <DollarSign className="w-2.5 h-2.5" />
                                {msg.budgetRange}
                              </span>
                            )}
                            {msg.isReplied && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-medium bg-primary/10 text-primary border border-primary/20">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                Replied
                              </span>
                            )}
                            {msg.company && (
                              <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                                @{msg.company}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          {/* Left Pane Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-2.5 px-3.5 border-t border-border bg-card/70 flex items-center justify-between text-xs text-muted-foreground shrink-0 select-none">
              <span className="text-[11px] font-mono">
                <strong className="text-foreground">
                  {startItem}-{endItem}
                </strong>{" "}
                of <strong className="text-foreground">{totalItems}</strong>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors border border-border/50"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono text-foreground/80 px-1">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors border border-border/50"
                  title="Next Page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PANE 2: Reading & Reply Pane (Right) */}
        <div
          className={`flex-1 flex flex-col bg-background/40 h-full overflow-hidden min-w-0 max-w-full ${
            !activeMessage ? "hidden md:flex" : "flex"
          }`}
        >
          {activeMessage ? (
            <>
              {/* Reading Pane Header Bar */}
              <div className="p-3.5 px-5 border-b border-border bg-card/60 flex items-center justify-between gap-3 shrink-0 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setSelectedId(null)}
                    className="md:hidden p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
                    title="Back to inbox"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="truncate min-w-0">
                    <h2 className="text-sm font-bold text-foreground truncate">
                      {activeMessage.subject || "Project Consultation Inquiry"}
                    </h2>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-mono truncate">
                      <span className="truncate">
                        From: {activeMessage.senderName}
                      </span>
                      <span>•</span>
                      <a
                        href={`mailto:${activeMessage.senderEmail}`}
                        className="text-primary hover:underline truncate"
                      >
                        {activeMessage.senderEmail}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {activeMessage.status === "unread" ? (
                    <button
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: activeMessage._id,
                          status: "read",
                        })
                      }
                      className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent text-xs transition-colors cursor-pointer"
                      title="Mark as Read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: activeMessage._id,
                          status: "unread",
                        })
                      }
                      className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent text-xs transition-colors cursor-pointer"
                      title="Mark as Unread"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {activeMessage.status !== "archived" ? (
                    <button
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: activeMessage._id,
                          status: "archived",
                        })
                      }
                      className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent text-xs transition-colors cursor-pointer"
                      title="Archive"
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: activeMessage._id,
                          status: "read",
                        })
                      }
                      className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent text-xs transition-colors cursor-pointer"
                      title="Move to Inbox"
                    >
                      <Inbox className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setDeleteTarget({
                        id: activeMessage._id,
                        name: activeMessage.senderName,
                      })
                    }
                    className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs transition-colors cursor-pointer"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Reading Pane Scrollable Content */}
              <ScrollArea className="flex-1 min-h-0 h-full w-full">
                <div className="p-5 space-y-5 max-w-3xl pr-4">
                  {/* Lead Dossier Card */}
                  <div className="p-4 rounded-xl bg-card border border-border/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar size="lg" className="shrink-0 size-11">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-base font-mono">
                          {activeMessage.senderName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-foreground">
                            {activeMessage.senderName}
                          </span>
                          {activeMessage.company && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Building className="w-3 h-3 opacity-70" />
                              {activeMessage.company}
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${activeMessage.senderEmail}`}
                          className="text-xs text-primary font-mono hover:underline truncate block"
                        >
                          {activeMessage.senderEmail}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {activeMessage.budgetRange && (
                        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          <span>{activeMessage.budgetRange}</span>
                        </div>
                      )}
                      <div className="px-2.5 py-1 rounded-lg bg-muted text-muted-foreground border border-border text-xs font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDateTime(activeMessage.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Body Box */}
                  <div className="p-5 rounded-xl bg-card border border-border space-y-2.5 shadow-xs">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3 text-primary" />
                      Inquiry Message
                    </span>
                    <div className="text-xs text-foreground leading-relaxed whitespace-pre-wrap font-sans break-words">
                      {activeMessage.message}
                    </div>
                  </div>

                  {/* Sent Reply History (if replied) */}
                  {activeMessage.isReplied && (
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Reply Dispatched via Brevo SMTP
                        </span>
                        {activeMessage.repliedAt && (
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {formatDateTime(activeMessage.repliedAt)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-foreground/90 whitespace-pre-wrap pl-5 border-l-2 border-emerald-500/30 break-words">
                        {activeMessage.replyNotes ||
                          "A direct email reply was sent to the client."}
                      </p>
                    </div>
                  )}

                  {/* Origin Security Audit */}
                  {(activeMessage.ipAddress || activeMessage.userAgent) && (
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/60 text-[10px] font-mono text-muted-foreground space-y-0.5">
                      <div className="flex items-center gap-1 font-semibold text-foreground/70">
                        <ShieldCheck className="w-3 h-3 text-muted-foreground" />
                        <span>Inbound Transmission Audit</span>
                      </div>
                      {activeMessage.ipAddress && (
                        <p>Client IP: {activeMessage.ipAddress}</p>
                      )}
                      {activeMessage.userAgent && (
                        <p className="truncate">
                          User Agent: {activeMessage.userAgent}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Bottom Inline Reply Composer */}
              <div className="p-4 border-t border-border bg-card/70 shrink-0 space-y-3 min-w-0 max-w-full">
                {/* Smart Quick Response Template Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 min-w-0 max-w-full">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 shrink-0 mr-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Templates:
                  </span>
                  {QUICK_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyTemplate(tmpl.text)}
                      className="px-2 py-0.5 rounded-md border border-border bg-background hover:bg-muted text-[10px] text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer shrink-0"
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>

                {/* Reply Form */}
                <form
                  onSubmit={handleSendReply}
                  className="space-y-2 min-w-0 max-w-full"
                >
                  <div className="relative min-w-0 w-full">
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Write a response to ${activeMessage.senderName}...`}
                      className="w-full max-w-full box-border bg-background border border-border rounded-lg p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none transition-colors"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 min-w-0">
                    <p className="text-[10px] text-muted-foreground truncate">
                      Replies are sent directly to{" "}
                      <strong className="text-foreground">
                        {activeMessage.senderEmail}
                      </strong>
                    </p>

                    <div className="flex items-center gap-2 shrink-0">
                      {replyText && (
                        <button
                          type="button"
                          onClick={() => setReplyText("")}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={replyMutation.isPending || !replyText.trim()}
                        className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs flex items-center gap-1.5 disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>
                          {replyMutation.isPending
                            ? "Dispatching..."
                            : "Send Reply"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            /* Empty State when no conversation is selected */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
                <Mail className="w-7 h-7" />
              </div>
              <div className="max-w-xs space-y-1">
                <h3 className="text-sm font-bold text-foreground">
                  No Inquiry Selected
                </h3>
                <p className="text-xs text-muted-foreground">
                  Select a message from the list on the left to review proposal
                  specs and dispatch email replies.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget.id, {
              onSuccess: () => {
                setDeleteTarget(null);
                if (selectedId === deleteTarget.id) {
                  setSelectedId(null);
                }
              },
            });
          }
        }}
        title="Delete Inquiry Message"
        description={`Are you sure you want to delete the message from "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Message"
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </div>
  );
}
