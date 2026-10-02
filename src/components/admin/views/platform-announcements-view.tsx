"use client";

import React, { useState } from "react";
import {
  usePlatformAnnouncements,
  useCreateAnnouncement,
  useUpdateAnnouncement,
  useDeleteAnnouncement,
} from "@/hooks";
import {
  Megaphone,
  Plus,
  Trash2,
  AlertCircle,
  Info,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Calendar,
  ToggleLeft,
  ToggleRight,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IAnnouncementItem } from "@/lib/api";

export function PlatformAnnouncementsView() {
  const { data: announcements, isLoading, refetch, isRefetching } = usePlatformAnnouncements();
  const createMutation = useCreateAnnouncement();
  const updateMutation = useUpdateAnnouncement();
  const deleteMutation = useDeleteAnnouncement();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "warning" | "success" | "announcement">("info");
  const [targetAudience, setTargetAudience] = useState<"all" | "developers" | "public">("all");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const handleCreate = () => {
    if (!title.trim() || !message.trim()) {
      toast.error("Please enter a title and message.");
      return;
    }

    createMutation.mutate(
      {
        title,
        message,
        type,
        targetAudience,
        linkUrl: linkUrl.trim() || undefined,
        linkText: linkText.trim() || undefined,
      },
      {
        onSuccess: () => {
          setIsCreateOpen(false);
          setTitle("");
          setMessage("");
          setLinkUrl("");
          setLinkText("");
        },
      },
    );
  };

  const handleToggleActive = (item: IAnnouncementItem) => {
    updateMutation.mutate({
      id: item._id,
      data: { isActive: !item.isActive },
    });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const typeConfig = {
    info: { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    warning: { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    success: { icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    announcement: { icon: Sparkles, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Broadcasts & Alerts
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {announcements?.filter((a) => a.isActive).length ?? 0} live banners
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Broadcast system notices, maintenance windows, and feature releases across developer dashboards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              refetch();
              toast.success("Broadcasts refreshed");
            }}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Refresh broadcasts"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Broadcast</span>
          </button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-12 text-center text-muted-foreground font-mono text-xs">
            Loading announcements...
          </div>
        ) : announcements?.length === 0 ? (
          <div className="p-8 rounded-3xl bg-card border border-border text-center space-y-3">
            <Megaphone className="w-8 h-8 text-muted-foreground mx-auto" />
            <h3 className="text-sm font-bold text-foreground">No broadcasts published</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Create an announcement to communicate updates or maintenance to all developers on DevPortfolio.
            </p>
          </div>
        ) : (
          announcements?.map((item) => {
            const Icon = typeConfig[item.type].icon;
            const badgeClass = typeConfig[item.type].color;

            return (
              <div
                key={item._id}
                className={`p-5 rounded-2xl bg-card border transition-all ${
                  item.isActive ? "border-border shadow-xs" : "border-border/40 opacity-60"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2 rounded-xl border shrink-0 ${badgeClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-foreground">{item.title}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase border ${badgeClass}`}
                        >
                          {item.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-muted text-muted-foreground border border-border">
                          Audience: {item.targetAudience}
                        </span>
                        {item.isActive ? (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                            LIVE ON DASHBOARD
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-muted text-muted-foreground">
                            PAUSED
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.message}
                      </p>

                      {item.linkUrl && (
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline pt-1"
                        >
                          <span>{item.linkText || "Learn More"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        item.isActive
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20"
                          : "bg-muted border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.isActive ? (
                        <>
                          <ToggleRight className="w-4 h-4 text-emerald-500" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4" />
                          <span>Paused</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deleteMutation.isPending}
                      className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Delete Broadcast"
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

      {/* New Broadcast Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-primary" />
              Publish Broadcast Announcement
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              This message will display in the top banner bar for developers.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Announcement Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Apex Studio Template is Live!"
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Message Body
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Describe the update, feature, or maintenance window..."
                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Alert Style
                </label>
                <Select
                  value={type}
                  onValueChange={(val) =>
                    setType(val as "info" | "warning" | "success" | "announcement")
                  }
                >
                  <SelectTrigger className="w-full text-xs font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info (Blue)</SelectItem>
                    <SelectItem value="announcement">Feature (Purple)</SelectItem>
                    <SelectItem value="warning">Maintenance (Amber)</SelectItem>
                    <SelectItem value="success">Success (Emerald)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Target Audience
                </label>
                <Select
                  value={targetAudience}
                  onValueChange={(val) =>
                    setTargetAudience(val as "all" | "developers" | "public")
                  }
                >
                  <SelectTrigger className="w-full text-xs font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="developers">Developers Only</SelectItem>
                    <SelectItem value="public">Public Site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Action Link URL (Optional)
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Link Button Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g. Try It Now"
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={createMutation.isPending}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 transition-all cursor-pointer"
            >
              {createMutation.isPending ? "Publishing..." : "Publish Broadcast"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
