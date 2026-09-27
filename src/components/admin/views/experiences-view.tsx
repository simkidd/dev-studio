"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from "@/hooks";
import { IExperience, ExperienceType } from "@/interfaces";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit,
  Calendar,
  MapPin,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PillFilter } from "@/components/ui/pill-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { formatMonthYear } from "@/lib/date.utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExperienceEditorDialog from "../forms/experience-editor-dialog";

export function ExperiencesView() {
  const [selectedType, setSelectedType] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<IExperience | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const {
    data: rawExperiences = [],
    isLoading,
    refetch,
    isRefetching,
  } = useExperiences(selectedType !== "all" ? selectedType : undefined);

  // Auto-sort reverse-chronologically: Present roles first, newest start date first
  const experiences = React.useMemo(() => {
    return [...rawExperiences].sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) return -1;
      if (!a.isCurrent && b.isCurrent) return 1;

      const timeA = new Date(a.startDate).getTime();
      const timeB = new Date(b.startDate).getTime();
      if (timeA !== timeB) return timeB - timeA;

      const endA = a.endDate ? new Date(a.endDate).getTime() : 0;
      const endB = b.endDate ? new Date(b.endDate).getTime() : 0;
      return endB - endA;
    });
  }, [rawExperiences]);

  const deleteMutation = useDeleteExperience();

  const handleOpenCreate = () => {
    setEditingExp(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (exp: IExperience) => {
    setEditingExp(exp);
    setDialogOpen(true);
  };

  const handleDelete = (id: string, companyName: string) => {
    setDeleteTarget({ id, name: companyName });
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Career Timeline & Experience CMS
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {experiences.length} positions
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Document senior engineering roles, leadership milestones, and
            quantifiable impact.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
            title="Refresh"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isRefetching ? "animate-spin text-primary" : ""
              }`}
            />
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Position</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-xl p-3 flex items-center gap-2">
        <PillFilter
          label="Employment Type"
          value={selectedType}
          options={[
            { label: "All Types", value: "all" },
            { label: "Full-Time", value: "full-time" },
            { label: "Contract", value: "contract" },
            { label: "Freelance", value: "freelance" },
          ]}
          onChange={setSelectedType}
        />
      </div>

      {/* Timeline List */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5 space-y-3 animate-pulse"
            >
              <Skeleton className="h-5 w-48 bg-muted" />
              <Skeleton className="h-4 w-32 bg-muted" />
              <Skeleton className="h-3 w-full bg-muted" />
            </div>
          ))
        ) : experiences.length === 0 ? (
          <div className="py-16 text-center bg-card border border-border rounded-xl">
            <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-60" />
            <p className="text-sm font-semibold text-foreground">
              No experiences listed
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add your current and previous engineering roles.
            </p>
          </div>
        ) : (
          experiences.map((exp: IExperience) => (
            <div
              key={exp._id}
              className="bg-card border border-border hover:border-primary/40 rounded-xl p-5 transition-all group shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-base font-bold text-foreground">
                      {exp.role}
                    </span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                      @{exp.company}
                    </span>
                    {exp.isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Current Position
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      {formatMonthYear(exp.startDate)} -{" "}
                      {exp.isCurrent
                        ? "Present"
                        : exp.endDate
                          ? formatMonthYear(exp.endDate)
                          : "Present"}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 opacity-80 group-hover:opacity-100">
                  <button
                    onClick={() => handleOpenEdit(exp)}
                    className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Edit experience"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id, exp.company)}
                    className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                    title="Delete experience"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              {exp.summary && (
                <p className="mt-3 text-xs text-foreground/80 leading-relaxed">
                  {exp.summary}
                </p>
              )}

              {/* Achievements & Bullet Points */}
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-xs text-foreground/80 list-disc list-inside">
                  {exp.achievements.map((h: string, i: number) => (
                    <li key={i} className="leading-relaxed">
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack Chips */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mt-4 pt-3 border-t border-border">
                  {exp.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Experience Dialog Form with ScrollArea */}
      <ExperienceEditorDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        exp={editingExp}
        onSaved={() => {
          refetch();
          setDialogOpen(false);
        }}
      />

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
        title="Delete Career Position"
        description={`Are you sure you want to delete the experience at "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Position"
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </div>
  );
}
