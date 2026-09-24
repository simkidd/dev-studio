"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  X,
  Building,
  Clock,
  Layers,
} from "lucide-react";
import { PillFilter } from "@/components/ui/pill-filter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/date.utils";
import { Eye, DollarSign, Calendar, Sparkles } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export interface MessageReplyFormData {
  reply: string;
}

export function MessagesView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<IMessage | null>(null);

  // Lead Details Sheet State
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailMessage, setDetailMessage] = useState<IMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MessageReplyFormData>({
    defaultValues: {
      reply: "",
    },
  });

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

  const messages: IMessage[] = Array.isArray(messagesResponse?.data)
    ? messagesResponse.data
    : Array.isArray((messagesResponse?.data as any)?.messages)
    ? (messagesResponse?.data as any).messages
    : [];

  const handleOpenReply = (message: IMessage) => {
    setSelectedMessage(message);
    reset({
      reply: `Hi ${message.senderName},\n\nThank you for reaching out regarding "${
        message.subject || "your project inquiry"
      }". I've reviewed your request and would love to schedule a brief discovery call to discuss the architecture and timeline.\n\nBest regards,\nAlex Morgan`,
    });
    setReplyDialogOpen(true);

    if (message.status === "unread") {
      updateStatusMutation.mutate({ id: message._id, status: "read" });
    }
  };

  const onSubmitReply = (data: MessageReplyFormData) => {
    if (!selectedMessage || !data.reply.trim()) return;

    replyMutation.mutate(
      { id: selectedMessage._id, reply: data.reply },
      {
        onSuccess: () => {
          setReplyDialogOpen(false);
          setSelectedMessage(null);
          reset({ reply: "" });
        },
      }
    );
  };

  const handleDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const unreadCount = messages.filter((m: IMessage) => m.status === "unread").length;
  const repliedCount = messages.filter((m: IMessage) => m.status === "replied").length;

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Inbound Inquiries & CRM Leads
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {messages.length} leads
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Direct high-intent client leads, project proposals, and recruiter inquiries with one-click email dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
            title="Refresh leads"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`} />
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Status Filter */}
      <div className="bg-card border border-border rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, keyword..."
            className="w-full bg-background border border-border rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <PillFilter
            label="Status"
            value={statusFilter}
            options={[
              { label: "All Leads", value: "all" },
              { label: `Unread (${unreadCount})`, value: "unread" },
              { label: "Read", value: "read" },
              { label: `Replied (${repliedCount})`, value: "replied" },
              { label: "Archived", value: "archived" },
            ]}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table className="w-full text-left border-collapse">
          <TableHeader className="border-b border-border bg-muted/50">
            <TableRow className="border-b border-border hover:bg-transparent text-[11px] font-semibold text-muted-foreground uppercase tracking-wider select-none">
              <TableHead className="px-4 py-3 text-muted-foreground">Lead & Contact</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">Subject & Message Preview</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">Budget Range</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">Timestamp</TableHead>
              <TableHead className="px-4 py-3 text-center text-muted-foreground">Status</TableHead>
              <TableHead className="px-4 py-3 text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border text-xs">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse border-b border-border">
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-36 bg-muted" />
                    <Skeleton className="h-3 w-28 bg-muted mt-1" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-64 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-20 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-24 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    <Skeleton className="h-4 w-16 mx-auto bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right">
                    <Skeleton className="h-6 w-16 ml-auto bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : messages.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="py-16 text-center">
                  <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold text-foreground">
                    No inbound inquiries found
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Submitted contact forms and client proposals will appear here.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              messages.map((msg: IMessage) => (
                <TableRow
                  key={msg._id}
                  className={`hover:bg-accent/40 transition-colors group border-b border-border ${
                    msg.status === "unread" ? "bg-primary/5 font-medium" : ""
                  }`}
                >
                  {/* Contact info */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer"
                        onClick={() => {
                          setDetailMessage(msg);
                          setDetailsOpen(true);
                        }}
                      >
                        {msg.senderName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-semibold text-foreground hover:text-primary cursor-pointer"
                            onClick={() => {
                              setDetailMessage(msg);
                              setDetailsOpen(true);
                            }}
                          >
                            {msg.senderName}
                          </span>
                          {msg.status === "unread" && (
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                        <a
                          href={`mailto:${msg.senderEmail}`}
                          className="text-[11px] font-mono text-muted-foreground hover:text-primary"
                        >
                          {msg.senderEmail}
                        </a>
                      </div>
                    </div>
                  </TableCell>

                  {/* Message Preview */}
                  <TableCell className="px-4 py-3.5 max-w-md">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setDetailMessage(msg);
                        setDetailsOpen(true);
                      }}
                    >
                      <span className="font-medium text-foreground block truncate hover:text-primary">
                        {msg.subject || "Project Consultation"}
                      </span>
                      <p className="text-muted-foreground text-xs truncate mt-0.5">
                        {msg.message}
                      </p>
                    </div>
                  </TableCell>

                  {/* Budget & Timeline */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap">
                    <div className="space-y-0.5">
                      {msg.budgetRange ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {msg.budgetRange}
                        </span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">Unspecified</span>
                      )}
                    </div>
                  </TableCell>

                  {/* Timestamp */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {formatDateTime(msg.createdAt)}
                    </span>
                  </TableCell>

                  {/* Status Pill */}
                  <TableCell className="px-4 py-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        msg.status === "unread"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : msg.status === "replied"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : msg.status === "archived"
                          ? "bg-muted text-muted-foreground border border-border"
                          : "bg-muted text-foreground border border-border"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </TableCell>

                  {/* Action buttons */}
                  <TableCell className="px-4 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setDetailMessage(msg);
                          setDetailsOpen(true);
                        }}
                        className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                        title="View Full Lead Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenReply(msg)}
                        className="px-2.5 py-1 rounded bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 transition-all text-xs font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Reply</span>
                      </button>
                      {msg.status !== "archived" ? (
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              id: msg._id,
                              status: "archived",
                            })
                          }
                          className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          title="Archive"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateStatusMutation.mutate({
                              id: msg._id,
                              status: "read",
                            })
                          }
                          className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          title="Unarchive"
                        >
                          <Inbox className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg._id, msg.senderName)}
                        className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          page={page}
          limit={limit}
          total={messagesResponse?.pagination?.total || messages.length}
          totalPages={messagesResponse?.pagination?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>

      {/* Quick Reply & Email Dispatch Dialog with ScrollArea */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-xl bg-card border-border text-card-foreground p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-6 pb-3 border-b border-border">
            <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>Reply to {selectedMessage?.senderName}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Dispatches a transactional email directly to{" "}
              <strong className="text-foreground">{selectedMessage?.senderEmail}</strong> via Brevo SMTP.
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <form onSubmit={handleSubmit(onSubmitReply)}>
              <ScrollArea className="max-h-[65vh] p-6 space-y-4">
                <div className="space-y-4 pr-2">
                  {/* Original Message Card */}
                  <div className="p-3 rounded-lg bg-muted/40 border border-border space-y-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Original Inquiry
                    </span>
                    <p className="text-xs text-foreground italic whitespace-pre-wrap">
                      "{selectedMessage.message}"
                    </p>
                  </div>

                  {/* Reply Body */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                      Email Response Body *
                    </label>
                    <textarea
                      {...register("reply", { required: "Reply message is required" })}
                      rows={8}
                      placeholder="Write your response proposal here..."
                      className="w-full bg-background border border-border rounded-lg p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none font-sans"
                    />
                    {errors.reply && (
                      <span className="text-[10px] text-destructive">{errors.reply.message}</span>
                    )}
                  </div>
                </div>
              </ScrollArea>

              <DialogFooter className="p-4 px-6 border-t border-border bg-muted/30 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplyDialogOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replyMutation.isPending || isSubmitting}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{replyMutation.isPending ? "Sending..." : "Dispatch Email Reply"}</span>
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Lead / Message Details Sheet with ScrollArea */}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full max-w-xl! bg-background border-l border-border text-foreground p-0 flex flex-col h-full shadow-2xl"
        >
          {detailMessage && (
            <>
              {/* Top Header Bar */}
              <SheetHeader className="px-6 py-4 border-b border-border/80 flex flex-row items-center justify-between shrink-0 bg-card/40 space-y-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <SheetTitle className="text-xs font-semibold text-foreground tracking-normal m-0 p-0">
                    Client Inquiry Dossier
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Lead CRM dossier and message history for {detailMessage.senderName}
                  </SheetDescription>
                </div>
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </SheetHeader>

              {/* Scrollable Body */}
              <ScrollArea className="flex-1 px-6 py-5 overflow-y-auto">
                <div className="space-y-6 pb-6">
                  {/* Sender Profile Header */}
                  <div className="bg-card border border-border rounded-xl p-4.5 space-y-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 font-bold text-lg text-primary font-mono shadow-xs">
                        {detailMessage.senderName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-lg font-bold text-foreground tracking-tight truncate">
                            {detailMessage.senderName}
                          </h2>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${
                              detailMessage.status === "unread"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : detailMessage.status === "replied"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                                : detailMessage.status === "read"
                                ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20"
                                : "bg-muted text-muted-foreground border-border"
                            }`}
                          >
                            {detailMessage.status}
                          </span>
                        </div>

                        {detailMessage.company && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <Building className="w-3.5 h-3.5 opacity-70" />
                            <span>{detailMessage.company}</span>
                          </p>
                        )}

                        <div className="pt-1.5">
                          <a
                            href={`mailto:${detailMessage.senderEmail}`}
                            className="text-xs text-primary hover:underline font-mono inline-flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{detailMessage.senderEmail}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Specifications */}
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-primary" />
                      Inquiry Details
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Budget Range</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono block truncate">
                          {detailMessage.budgetRange || "Negotiable / TBD"}
                        </span>
                      </div>

                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Received</span>
                        </div>
                        <span className="text-xs font-medium text-foreground font-mono block truncate">
                          {formatDateTime(detailMessage.createdAt)}
                        </span>
                      </div>

                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          <span>Status</span>
                        </div>
                        <span className="text-xs font-semibold text-foreground block truncate">
                          {detailMessage.isReplied ? "Replied" : "Pending Reply"}
                        </span>
                      </div>

                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Channel</span>
                        </div>
                        <span className="text-xs font-medium text-foreground block truncate">
                          Portfolio Form
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subject Line */}
                  {detailMessage.subject && (
                    <div className="space-y-1.5">
                      <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                        Subject Line
                      </h3>
                      <div className="bg-card border border-border rounded-xl px-4 py-2.5">
                        <p className="text-xs font-semibold text-foreground">
                          {detailMessage.subject}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Full Message Body */}
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      Inquiry Message
                    </h3>
                    <div className="bg-card border border-border rounded-xl p-4">
                      <div className="text-xs leading-relaxed text-foreground whitespace-pre-wrap bg-background p-4 rounded-lg border border-border">
                        {detailMessage.message}
                      </div>
                    </div>
                  </div>

                  {/* Sent Reply Notes (if replied) */}
                  {detailMessage.isReplied && (
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Reply Sent ({detailMessage.repliedAt ? formatDateTime(detailMessage.repliedAt) : "Dispatched"})
                      </h3>
                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-xs text-foreground leading-relaxed">
                          {detailMessage.replyNotes || "Email response was sent directly to client."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Origin & Audit Details */}
                  {(detailMessage.ipAddress || detailMessage.userAgent) && (
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                        Origin Audit
                      </h3>
                      <div className="bg-card border border-border rounded-xl p-3 text-[11px] font-mono text-muted-foreground space-y-1">
                        {detailMessage.ipAddress && (
                          <p>Client IP: {detailMessage.ipAddress}</p>
                        )}
                        {detailMessage.userAgent && (
                          <p className="truncate">Client Agent: {detailMessage.userAgent}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Fixed Bottom Footer Bar */}
              <SheetFooter className="px-6 py-3.5 border-t border-border bg-card/60 flex flex-row items-center justify-end gap-2 shrink-0 mt-auto sm:justify-end">
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setDetailsOpen(false);
                    handleOpenReply(detailMessage);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{detailMessage.isReplied ? "Send Another Reply" : "Reply to Lead"}</span>
                </button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            });
          }
        }}
        title="Delete Message"
        description={`Are you sure you want to delete the message from "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Message"
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </div>
  );
}
