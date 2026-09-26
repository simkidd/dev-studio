"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useSkills,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
} from "@/hooks";
import { ISkill, SkillCategory } from "@/interfaces";
import { Code2, Plus, Trash2, Edit, Search, RefreshCw } from "lucide-react";
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
import { Input } from "@/components/ui/input";

import SkillEditorDialog from "../skill-editor-dialog";

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps/Cloud",
  "Architecture",
  "Tools",
];

export function SkillsView() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<ISkill | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const {
    data: skills = [],
    isLoading,
    refetch,
    isRefetching,
  } = useSkills(selectedCategory !== "all" ? selectedCategory : undefined);

  const deleteSkillMutation = useDeleteSkill();

  const filteredSkills = skills.filter((s: ISkill) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleOpenCreate = () => {
    setEditingSkill(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (skill: ISkill) => {
    setEditingSkill(skill);
    setDialogOpen(true);
  };

  const handleDelete = (id: string, skillName: string) => {
    setDeleteTarget({ id, name: skillName });
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Technical Matrix & Skills CMS
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {skills.length} skills
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure competencies, mastery percentages, and domain
            specializations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
            title="Refresh skills"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills by name..."
            className="pl-8 text-xs h-8"
          />
        </div>

        <div className="flex items-center gap-2">
          <PillFilter
            label="Category"
            value={selectedCategory}
            options={[
              { label: "All Categories", value: "all" },
              ...CATEGORIES.map((c) => ({ label: c, value: c })),
            ]}
            onChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-4 space-y-3"
            >
              <Skeleton className="h-4 w-32 bg-muted" />
              <Skeleton className="h-2 w-full bg-muted" />
            </div>
          ))
        ) : filteredSkills.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-card border border-border rounded-xl">
            <Code2 className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-60" />
            <p className="text-sm font-semibold text-foreground">
              No skills found
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add your key programming languages, frameworks, and architecture
              tools.
            </p>
          </div>
        ) : (
          filteredSkills.map((skill: ISkill) => (
            <div
              key={skill._id}
              className="bg-card border border-border hover:border-primary/40 rounded-xl p-4 transition-all group relative shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">
                      {skill.name}
                    </span>
                    {skill.isTopSkill && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        TOP
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-primary">
                    {skill.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id, skill.name)}
                    className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar & Proficiency */}
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground">
                    {skill.level || "Proficiency"}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {skill.proficiency ?? 90}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-emerald-400 rounded-full"
                    style={{ width: `${skill.proficiency ?? 90}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Skill Dialog Form with ScrollArea */}
      <SkillEditorDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        skill={editingSkill}
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
            deleteSkillMutation.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            });
          }
        }}
        title="Delete Skill"
        description={`Are you sure you want to delete the skill "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete Skill"
        isLoading={deleteSkillMutation.isPending}
        variant="destructive"
      />
    </div>
  );
}
