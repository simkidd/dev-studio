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
import {
  Code2,
  Plus,
  Trash2,
  Edit,
  Search,
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "DevOps/Cloud",
  "Architecture",
  "Tools",
];

export interface SkillFormData {
  name: string;
  category: SkillCategory;
  proficiency: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  isTopSkill: boolean;
  icon: string;
}

export function SkillsView() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<ISkill | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormData>({
    defaultValues: {
      name: "",
      category: "Languages",
      proficiency: 90,
      level: "Expert",
      isTopSkill: false,
      icon: "",
    },
  });

  const proficiency = watch("proficiency");

  const { data: skills = [], isLoading, refetch, isRefetching } = useSkills(
    selectedCategory !== "all" ? selectedCategory : undefined
  );

  const createSkillMutation = useCreateSkill();
  const updateSkillMutation = useUpdateSkill();
  const deleteSkillMutation = useDeleteSkill();

  const filteredSkills = skills.filter((s: ISkill) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingSkill(null);
    reset({
      name: "",
      category: "Languages",
      proficiency: 90,
      level: "Expert",
      isTopSkill: false,
      icon: "",
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (skill: ISkill) => {
    setEditingSkill(skill);
    reset({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency ?? 90,
      level: skill.level || "Expert",
      isTopSkill: skill.isTopSkill,
      icon: skill.icon || "",
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: SkillFormData) => {
    const payload = {
      name: data.name,
      category: data.category,
      proficiency: Number(data.proficiency),
      level: data.level,
      isTopSkill: data.isTopSkill,
      icon: data.icon,
    };

    if (editingSkill) {
      updateSkillMutation.mutate(
        { id: editingSkill._id, payload },
        {
          onSuccess: () => setDialogOpen(false),
        }
      );
    } else {
      createSkillMutation.mutate(payload, {
        onSuccess: () => setDialogOpen(false),
      });
    }
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
            Configure competencies, mastery percentages, and domain specializations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title="Refresh skills"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`} />
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
            className="pl-8 text-xs h-9"
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
            <p className="text-sm font-semibold text-foreground">No skills found</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add your key programming languages, frameworks, and architecture tools.
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
                  <span className="text-muted-foreground">{skill.level || "Proficiency"}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {skill.proficiency ?? 90}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                    style={{ width: `${skill.proficiency ?? 90}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Skill Dialog Form with ScrollArea */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col bg-card border-border text-card-foreground p-0 overflow-hidden shadow-2xl gap-0">
          <DialogHeader className="p-6 pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-base font-bold text-foreground">
              {editingSkill ? "Edit Skill" : "Add Technical Skill"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Showcase specific tools, languages, and systems in your interactive tech stack matrix.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col min-h-0 flex-1 overflow-hidden">
            <ScrollArea className="flex-1 min-h-0 w-full p-6">
              <div className="space-y-4 pr-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Skill Name *</label>
                  <Input
                    type="text"
                    {...register("name", { required: "Skill name is required" })}
                    placeholder="e.g. Next.js, Kubernetes, Rust"
                    className="text-xs h-9"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-destructive">{errors.name.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Category</label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="text-xs h-9">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((c) => (
                              <SelectItem key={c} value={c}>
                                {c}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Mastery Level</label>
                    <Controller
                      name="level"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="text-xs h-9">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <label className="font-medium text-foreground">Proficiency Percentage</label>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{proficiency}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    {...register("proficiency", { valueAsNumber: true })}
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Controller
                    name="isTopSkill"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="featSkill"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <label htmlFor="featSkill" className="text-xs text-foreground cursor-pointer select-none">
                    Highlight as Top Skill on Homepage
                  </label>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="p-4 px-6 border-t border-border bg-muted/30 flex items-center justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm cursor-pointer"
              >
                {editingSkill ? "Save Changes" : "Create Skill"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
