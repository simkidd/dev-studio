"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  useMessageById,
  useUpdateMessageStatus,
  useReplyMessage,
  useDeleteMessage,
} from "@/hooks";
import {
  Mail,
  MailOpen,
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
  ExternalLink,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/date.utils";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

const QUICK_TEMPLATES = [
  {
    label: "Discovery Call",
    text: (name: string, subject?: string) =>
      `Hi ${name},\n\nThank you for reaching out regarding "${
        subject || "your project inquiry"
      }". I've reviewed your specifications and would love to schedule a brief 20-minute discovery call to discuss the technical scope and timeline.\n\nPlease feel free to let me know your preferred availability this week.\n\nBest regards,`,
  },
  {
    label: "Proposal & Scope",
    text: (name: string, subject?: string) =>
      `Hi ${name},\n\nThanks for contacting me! Based on the details provided in "${
        subject || "your inquiry"
      }", this aligns closely with previous production architectures I've delivered.\n\nI am currently preparing an estimate and preliminary roadmap for your review. Would you have any additional requirement documents or design mocks to include?\n\nBest regards,`,
  },
  {
    label: "Fully Booked / Referral",
    text: (name: string) =>
      `Hi ${name},\n\nThank you for considering me for your project. I am currently fully committed on active client milestones and unavailable for new contracts at this moment.\n\nI would be happy to reconnect in the upcoming quarter or recommend a trusted senior engineer within my network if needed.\n\nBest regards,`,
  },
];

export interface MessageDetailViewProps {
  id: string;
}

export function MessageDetailView({ id }: MessageDetailViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [replyText, setReplyText] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    data: message,
    isLoading,
    refetch,
    isRefetching,
  } = useMessageById(id);

  const updateStatusMutation = useUpdateMessageStatus();
  const replyMutation = useReplyMessage();
  const deleteMutation = useDeleteMessage();

  // Invalidate queries so list view reflects read status when navigating back
  useEffect(() => {
    if (message) {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    }
  }, [message?._id, queryClient]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !replyText.trim()) return;

    replyMutation.mutate(
      { id: message._id, reply: replyText.trim() },
      {
        onSuccess: () => {
          setReplyText("");
          refetch();
        },
      },
    );
  };

  const handleApplyTemplate = (
    templateFn: (name: string, subject?: string) => string,
  ) => {
    if (!message) return;
    const generated = templateFn(message.senderName, message.subject);
    setReplyText(generated);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-6 w-56 bg-muted" />
            <Skeleton className="h-3.5 w-40 bg-muted" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24 bg-muted rounded-lg" />
            <Skeleton className="h-9 w-24 bg-muted rounded-lg" />
            <Skeleton className="h-9 w-20 bg-muted rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-24 w-full rounded-xl bg-muted" />
            <Skeleton className="h-64 w-full rounded-xl bg-muted" />
            <Skeleton className="h-56 w-full rounded-xl bg-muted" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-56 w-full rounded-xl bg-muted" />
            <Skeleton className="h-28 w-full rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="py-20 text-center bg-card border border-border rounded-xl max-w-lg mx-auto">
        <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-60" />
        <h2 className="text-base font-bold text-foreground">Inquiry Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          The requested client inquiry could not be found or has been removed.
        </p>
        <Link
          href="/admin/messages"
          className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Inquiries</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header & Action Controls (Matches Project & Post Detail Standard) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/admin/messages"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Inquiries</span>
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-muted text-foreground border border-border">
              {message.budgetRange || "Inquiry"}
            </span>
            <span className="text-muted-foreground text-xs">/</span>
            <h1 className="text-xl font-bold text-foreground tracking-tight truncate max-w-sm sm:max-w-md">
              {message.subject || "Project Consultation Inquiry"}
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            From {message.senderName} ({message.senderEmail}) &bull; Received {formatDateTime(message.createdAt)}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shadow-xs"
            title="Refresh record"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>

          {message.status === "unread" ? (
            <button
              onClick={() =>
                updateStatusMutation.mutate({
                  id: message._id,
                  status: "read",
                })
              }
              className="px-3.5 py-2 rounded-lg bg-card border border-border hover:bg-accent text-xs font-medium text-foreground transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <MailOpen className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mark Read</span>
            </button>
          ) : (
            <button
              onClick={() =>
                updateStatusMutation.mutate({
                  id: message._id,
                  status: "unread",
                })
              }
              className="px-3.5 py-2 rounded-lg bg-card border border-border hover:bg-accent text-xs font-medium text-foreground transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>Mark Unread</span>
            </button>
          )}

          <button
            onClick={() =>
              updateStatusMutation.mutate({
                id: message._id,
                status: message.status !== "archived" ? "archived" : "read",
              })
            }
            className="px-3.5 py-2 rounded-lg bg-card border border-border hover:bg-accent text-xs font-medium text-foreground transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {message.status !== "archived" ? (
              <>
                <Archive className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Archive</span>
              </>
            ) : (
              <>
                <Inbox className="w-3.5 h-3.5 text-primary" />
                <span>Move to Inbox</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="px-3.5 py-2 rounded-lg border border-destructive/30 bg-destructive/5 hover:bg-destructive/15 text-xs font-medium text-destructive transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Main Column: Lead Banner, Message Body, & Reply Composer */}
        <div className="lg:col-span-2 space-y-4">
          {/* Sender Lead Banner */}
          <div className="p-5 rounded-xl bg-card border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <Avatar className="shrink-0 size-12 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg font-mono">
                  {message.senderName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base font-bold text-foreground">
                    {message.senderName}
                  </h2>
                  {message.company && (
                    <span className="text-xs px-2 py-0.5 rounded bg-muted border border-border text-foreground font-medium flex items-center gap-1">
                      <Building className="w-3 h-3 text-muted-foreground" />
                      {message.company}
                    </span>
                  )}
                </div>
                <a
                  href={`mailto:${message.senderEmail}`}
                  className="text-xs text-primary font-mono hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>{message.senderEmail}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {message.budgetRange && (
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{message.budgetRange}</span>
                </div>
              )}
              <div className="px-3 py-1 rounded-lg bg-muted text-muted-foreground border border-border text-xs font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDateTime(message.createdAt)}</span>
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
                Subject: {message.subject || "Project Consultation Inquiry"}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap font-sans break-words pt-1 select-text">
              {message.message}
            </div>
          </div>

          {/* Sent Reply History (If already replied) */}
          {message.isReplied && (
            <div className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Reply Dispatched via Brevo SMTP
                </span>
                {message.repliedAt && (
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Sent on {formatDateTime(message.repliedAt)}
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap pl-4 border-l-2 border-emerald-500/40 break-words leading-relaxed">
                {message.replyNotes || "A direct email reply was sent to the client."}
              </div>
            </div>
          )}

          {/* Bottom Interactive Reply Composer */}
          <div className="p-6 rounded-xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-foreground">
                  {message.isReplied ? "Send Follow-up Message" : "Reply to Client"}
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
                placeholder={`Compose a detailed technical reply to ${message.senderName}...`}
                className="w-full bg-background border border-border rounded-xl p-4 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-y min-h-[140px] leading-relaxed transition-colors"
              />

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <p className="text-xs text-muted-foreground">
                  Emails are delivered directly to{" "}
                  <strong className="text-foreground">{message.senderEmail}</strong>.
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
                      {replyMutation.isPending ? "Dispatching via SMTP..." : "Send Response"}
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
                    message.status === "unread"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : message.status === "replied"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {message.status}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block text-[11px]">
                  Budget Tier
                </span>
                <span className="font-mono font-medium text-foreground mt-0.5 block">
                  {message.budgetRange || "Not specified"}
                </span>
              </div>

              <div>
                <span className="text-muted-foreground block text-[11px]">
                  Direct Contact
                </span>
                <a
                  href={`mailto:${message.senderEmail}?subject=Re: ${encodeURIComponent(
                    message.subject || "Project Consultation",
                  )}`}
                  className="text-primary hover:underline font-mono text-[11px] mt-0.5 block truncate"
                >
                  {message.senderEmail}
                </a>
              </div>

              <div>
                <span className="text-muted-foreground block text-[11px]">
                  Received At
                </span>
                <span className="font-mono text-[11px] text-muted-foreground mt-0.5 block">
                  {formatDateTime(message.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Origin Security Audit */}
          {(message.ipAddress || message.userAgent) && (
            <div className="p-4 rounded-xl bg-muted/30 border border-border/80 text-xs font-mono text-muted-foreground space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-foreground/80">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span>Transmission Audit</span>
              </div>
              {message.ipAddress && (
                <p className="text-[11px]">Client IP: {message.ipAddress}</p>
              )}
              {message.userAgent && (
                <p className="text-[10px] break-all leading-relaxed opacity-80">
                  UA: {message.userAgent}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Client Inquiry"
        description={`Are you sure you want to permanently delete the inquiry from "${message.senderName}"? This action cannot be undone.`}
        confirmText="Delete Inquiry"
        variant="destructive"
        isLoading={deleteMutation.isPending}
        onConfirm={() => {
          deleteMutation.mutate(message._id, {
            onSuccess: () => {
              setIsDeleteOpen(false);
              router.push("/admin/messages");
            },
          });
        }}
      />
    </div>
  );
}
