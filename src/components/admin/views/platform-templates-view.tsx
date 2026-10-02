"use client";

import React, { useState } from "react";
import { usePlatformTemplates, useUpdateTemplateSetting } from "@/hooks";
import {
  Palette,
  Sparkles,
  Layers,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Sliders,
  Shield,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITemplateSettingItem } from "@/lib/api";

export function PlatformTemplatesView() {
  const { data: templates, isLoading, refetch, isRefetching } = usePlatformTemplates();
  const updateTemplateMutation = useUpdateTemplateSetting();

  const [editingTemplate, setEditingTemplate] = useState<ITemplateSettingItem | null>(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "pro" | "beta" | "maintenance">("active");
  const [isFeatured, setIsFeatured] = useState(false);

  const handleOpenEdit = (t: ITemplateSettingItem) => {
    setEditingTemplate(t);
    setDescription(t.description);
    setStatus(t.status);
    setIsFeatured(t.isFeatured);
  };

  const handleSaveEdit = () => {
    if (!editingTemplate) return;

    updateTemplateMutation.mutate(
      {
        templateId: editingTemplate.templateId,
        data: {
          description,
          status,
          isFeatured,
        },
      },
      {
        onSuccess: () => {
          setEditingTemplate(null);
        },
      },
    );
  };

  const handleQuickStatusChange = (
    templateId: string,
    newStatus: "active" | "pro" | "beta" | "maintenance",
  ) => {
    updateTemplateMutation.mutate({
      templateId,
      data: { status: newStatus },
    });
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Global Template Engine
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {templates?.length ?? 3} engines
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Control template availability, tier access (Free vs. Pro), feature flags, and engine metadata.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              refetch();
              toast.success("Templates refreshed");
            }}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Refresh templates"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-3 py-12 text-center text-muted-foreground font-mono text-xs">
            Loading template engines...
          </div>
        ) : (
          templates?.map((t) => {
            const statusBadgeColors = {
              active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
              pro: "bg-purple-500/10 text-purple-500 border-purple-500/20",
              beta: "bg-amber-500/10 text-amber-500 border-amber-500/20",
              maintenance: "bg-destructive/10 text-destructive border-destructive/20",
            };

            return (
              <div
                key={t._id || t.templateId}
                className="p-6 rounded-3xl bg-card border border-border flex flex-col justify-between space-y-6 relative overflow-hidden shadow-xs hover:border-primary/40 transition-colors"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide border ${statusBadgeColors[t.status]}`}
                      >
                        {t.status}
                      </span>
                      {t.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          FEATURED
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      ID: {t.templateId}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {t.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {t.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Switcher & Edit Button */}
                <div className="space-y-3 pt-4 border-t border-border/60">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-foreground">
                      Engine Status:
                    </span>
                    <Select
                      defaultValue={t.status}
                      onValueChange={(val) =>
                        handleQuickStatusChange(
                          t.templateId,
                          val as "active" | "pro" | "beta" | "maintenance",
                        )
                      }
                      disabled={updateTemplateMutation.isPending}
                    >
                      <SelectTrigger className="w-28 h-7 text-[11px] font-mono rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active (Free)</SelectItem>
                        <SelectItem value="pro">Pro Only</SelectItem>
                        <SelectItem value="beta">Beta Access</SelectItem>
                        <SelectItem value="maintenance">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="w-full py-2 rounded-xl bg-muted/60 hover:bg-muted border border-border text-xs font-semibold text-foreground flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit Engine Config</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Template Modal */}
      <Dialog open={Boolean(editingTemplate)} onOpenChange={() => setEditingTemplate(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              Configure {editingTemplate?.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Update global marketing description and feature flags for this template engine.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground block">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Status
                </label>
                <Select
                  value={status}
                  onValueChange={(val) =>
                    setStatus(val as "active" | "pro" | "beta" | "maintenance")
                  }
                >
                  <SelectTrigger className="w-full text-xs font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active (Free)</SelectItem>
                    <SelectItem value="pro">Pro Only</SelectItem>
                    <SelectItem value="beta">Beta Access</SelectItem>
                    <SelectItem value="maintenance">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground block">
                  Featured Badge
                </label>
                <button
                  type="button"
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    isFeatured
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isFeatured ? "Featured" : "Standard"}</span>
                </button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setEditingTemplate(null)}
              className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-semibold hover:bg-muted/80 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={updateTemplateMutation.isPending}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 transition-all cursor-pointer"
            >
              {updateTemplateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
