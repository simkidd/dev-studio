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
  ExternalLink,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

  // Selected active message object
  const activeMessage = useMemo(() => {
    return messages.find((m) => m._id === selectedId) || null;
  }, [messages, selectedId]);

  // When clicking a message from the list
  const handleOpenMessage = (msg: IMessage) => {
    setSelectedId(msg._id);
    if (msg.status === "unread") {
      updateStatusMutation.mutate({ id: msg._id, status: "read" });
    }
  };

  const handleBackToList = () => {
    setSelectedId(null);
    setReplyText("");
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
    <div className="space-y-4 pb-16 ">
      {/* ========================================================================= */}
      {/* 1. DEDICATED INQUIRY DETAIL VIEW (When an inquiry is selected)           */}
      {/* ========================================================================= */}
      {activeMessage ? (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          {/* Top Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card border border-border rounded-xl p-4 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={handleBackToList}
                className="p-2 rounded-lg border border-border bg-background hover:bg-accent text-foreground transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Inquiries</span>
              </button>

              <div className="min-w-0 truncate">
                <h1 className="text-sm sm:text-base font-bold text-foreground truncate">
                  {activeMessage.subject || "Project Consultation Inquiry"}
                </h1>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  Inquiry from {activeMessage.senderName} (
                  {activeMessage.senderEmail})
                </p>
              </div>
            </div>

            {/* Quick Actions Header Toolbar */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              {activeMessage.status === "unread" ? (
                <button
                  onClick={() =>
                    updateStatusMutation.mutate({
                      id: activeMessage._id,
                      status: "read",
                    })
                  }
                  className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-medium text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Mark Read</span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    updateStatusMutation.mutate({
                      id: activeMessage._id,
                      status: "unread",
                    })
                  }
                  className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-medium text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>Mark Unread</span>
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
                  className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-medium text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Archive</span>
                </button>
              ) : (
                <button
                  onClick={() =>
                    updateStatusMutation.mutate({
                      id: activeMessage._id,
                      status: "read",
                    })
                  }
                  className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs font-medium text-foreground transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Inbox className="w-3.5 h-3.5 text-primary" />
                  <span>Move to Inbox</span>
                </button>
              )}

              <button
                onClick={() =>
                  setDeleteTarget({
                    id: activeMessage._id,
                    name: activeMessage.senderName,
                  })
                }
                className="px-3 py-1.5 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/15 text-xs font-medium text-destructive transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* 2-Column Responsive Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Main Column: Dossier, Message Body, & Reply Composer */}
            <div className="lg:col-span-2 space-y-4">
              {/* Sender Lead Banner */}
              <div className="p-5 rounded-xl bg-card border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <Avatar className="shrink-0 size-12 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg font-mono">
                      {activeMessage.senderName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base font-bold text-foreground">
                        {activeMessage.senderName}
                      </h2>
                      {activeMessage.company && (
                        <span className="text-xs px-2 py-0.5 rounded bg-muted border border-border text-foreground font-medium flex items-center gap-1">
                          <Building className="w-3 h-3 text-muted-foreground" />
                          {activeMessage.company}
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${activeMessage.senderEmail}`}
                      className="text-xs text-primary font-mono hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>{activeMessage.senderEmail}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {activeMessage.budgetRange && (
                    <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>{activeMessage.budgetRange}</span>
                    </div>
                  )}
                  <div className="px-3 py-1 rounded-lg bg-muted text-muted-foreground border border-border text-xs font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDateTime(activeMessage.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Message Card */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Client Inquiry Requirements
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Subject:{" "}
                    {activeMessage.subject || "Project Consultation Inquiry"}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans break-words pt-1 select-text">
                  {activeMessage.message}
                </div>
              </div>

              {/* Sent Reply History (If already replied) */}
              {activeMessage.isReplied && (
                <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Reply Dispatched via Brevo SMTP
                    </span>
                    {activeMessage.repliedAt && (
                      <span className="text-[11px] font-mono text-muted-foreground">
                        Sent on {formatDateTime(activeMessage.repliedAt)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap pl-4 border-l-2 border-emerald-500/40 break-words leading-relaxed">
                    {activeMessage.replyNotes ||
                      "A direct email reply was sent to the client."}
                  </div>
                </div>
              )}

              {/* Bottom Interactive Reply Composer */}
              <div className="p-6 rounded-xl bg-card border border-border shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-foreground">
                      {activeMessage.isReplied
                        ? "Send Follow-up Message"
                        : "Reply to Client"}
                    </span>
                  </div>

                  {/* 1-Click Smart Quick Response Templates */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 shrink-0 mr-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Templates:
                    </span>
                    {QUICK_TEMPLATES.map((tmpl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleApplyTemplate(tmpl.text)}
                        className="px-2.5 py-1 rounded-md border border-border bg-background hover:bg-muted text-[11px] text-muted-foreground hover:text-foreground font-medium transition-colors cursor-pointer shrink-0"
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="space-y-3">
                  <textarea
                    rows={6}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Compose a detailed technical reply to ${activeMessage.senderName}...`}
                    className="w-full bg-background border border-border rounded-xl p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-y min-h-[140px] leading-relaxed transition-colors"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <p className="text-xs text-muted-foreground">
                      Emails are delivered directly to{" "}
                      <strong className="text-foreground">
                        {activeMessage.senderEmail}
                      </strong>
                      .
                    </p>

                    <div className="flex items-center gap-2.5">
                      {replyText && (
                        <button
                          type="button"
                          onClick={() => setReplyText("")}
                          className="px-3.5 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          Clear Text
                        </button>
                      )}
                      <button
                        type="submit"
                        disabled={replyMutation.isPending || !replyText.trim()}
                        className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm flex items-center gap-2 disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>
                          {replyMutation.isPending
                            ? "Dispatching via SMTP..."
                            : "Send Response"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side Column: Meta Cards & Origin Security Audit */}
            <div className="space-y-4">
              {/* Lead Summary Meta Card */}
              <div className="p-5 rounded-xl bg-card border border-border shadow-xs space-y-4">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-2.5">
                  Inquiry Metadata
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">
                      Pipeline Status
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold mt-1 capitalize ${
                        activeMessage.status === "unread"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : activeMessage.status === "replied"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {activeMessage.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[11px]">
                      Budget Tier
                    </span>
                    <span className="font-mono font-medium text-foreground mt-0.5 block">
                      {activeMessage.budgetRange || "Not specified"}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[11px]">
                      Direct Contact
                    </span>
                    <a
                      href={`mailto:${activeMessage.senderEmail}?subject=Re: ${encodeURIComponent(
                        activeMessage.subject || "Project Consultation",
                      )}`}
                      className="text-primary hover:underline font-mono text-[11px] mt-0.5 block truncate"
                    >
                      {activeMessage.senderEmail}
                    </a>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[11px]">
                      Received At
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground mt-0.5 block">
                      {formatDateTime(activeMessage.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Origin Security Audit */}
              {(activeMessage.ipAddress || activeMessage.userAgent) && (
                <div className="p-4 rounded-xl bg-muted/30 border border-border/80 text-xs font-mono text-muted-foreground space-y-2">
                  <div className="flex items-center gap-1.5 font-semibold text-foreground/80">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span>Transmission Audit</span>
                  </div>
                  {activeMessage.ipAddress && (
                    <p className="text-[11px]">
                      Client IP: {activeMessage.ipAddress}
                    </p>
                  )}
                  {activeMessage.userAgent && (
                    <p className="text-[10px] break-all leading-relaxed opacity-80">
                      UA: {activeMessage.userAgent}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. FULL-PAGE INBOX LIST VIEW (When no inquiry is selected)               */
        /* ========================================================================= */
        <div className="space-y-4">
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

          {/* Full-Width Inquiries Feed */}
          <div className="space-y-2.5">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border/80 bg-card space-y-3 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-40 bg-muted" />
                    <Skeleton className="h-3.5 w-24 bg-muted" />
                  </div>
                  <Skeleton className="h-3.5 w-72 bg-muted" />
                  <Skeleton className="h-3 w-full bg-muted/60" />
                </div>
              ))
            ) : messages.length === 0 ? (
              <div className="p-16 text-center bg-card border border-border rounded-xl space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-muted/70 flex items-center justify-center mx-auto text-muted-foreground">
                  <Inbox className="w-6 h-6 opacity-80" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-foreground">
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
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all group cursor-pointer relative shadow-xs hover:border-primary/50 hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isUnread
                        ? "bg-card border-primary/30 ring-1 ring-primary/20"
                        : "bg-card border-border hover:bg-accent/20"
                    }`}
                  >
                    {/* Left: Unread dot, Avatar, Sender info */}
                    <div className="flex items-center gap-3 min-w-0 sm:w-1/3">
                      {/* Unread indicator bullet */}
                      <div
                        className={`size-2 rounded-full shrink-0 ${
                          isUnread
                            ? "bg-primary animate-pulse"
                            : "bg-transparent"
                        }`}
                      />

                      <Avatar className="shrink-0 size-8.5 border border-border">
                        <AvatarFallback
                          className={`text-xs font-bold font-mono ${
                            isUnread
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          {msg.senderName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 truncate">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`text-xs sm:text-sm tracking-tight truncate ${
                              isUnread
                                ? "font-bold text-foreground"
                                : "font-semibold text-foreground/90"
                            }`}
                          >
                            {msg.senderName}
                          </span>
                          {msg.company && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground border border-border font-medium flex items-center gap-1 shrink-0">
                              <Building className="w-2.5 h-2.5 opacity-70" />
                              {msg.company}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground font-mono truncate">
                          {msg.senderEmail}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Subject Line */}
                    <div className="min-w-0 flex-1 pl-5 sm:pl-0">
                      <h4
                        className={`text-xs sm:text-sm truncate ${
                          isUnread
                            ? "font-bold text-foreground"
                            : "font-medium text-foreground/80"
                        }`}
                      >
                        {msg.subject || "Project Consultation Inquiry"}
                      </h4>
                    </div>

                    {/* Right: Badges, Timestamp & Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center pl-5 sm:pl-0">
                      {msg.budgetRange && (
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                          {msg.budgetRange}
                        </span>
                      )}

                      {isReplied && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Replied</span>
                        </span>
                      )}

                      <span className="text-[11px] font-mono text-muted-foreground shrink-0 min-w-[75px] text-right">
                        {formatDateTime(msg.createdAt)}
                      </span>

                      {/* Hover Action Buttons */}
                      <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
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
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
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
                            <Mail className="w-3.5 h-3.5 text-primary" />
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
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
              if (selectedId === deleteTarget.id) {
                setSelectedId(null);
              }
            },
          });
        }}
      />
    </div>
  );
}
