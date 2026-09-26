"use client";

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
  useReorderExperiences,
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
  ChevronUp,
  ChevronDown,
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

export interface ExperienceFormData {
  company: string;
  role: string;
  location: string;
  employmentType: ExperienceType;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  summary: string;
  technologies: string;
  achievements: { value: string }[];
}

export function ExperiencesView() {
  const [selectedType, setSelectedType] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<IExperience | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceFormData>({
    defaultValues: {
      company: "",
      role: "",
      location: "",
      employmentType: "full-time",
      startDate: "",
      endDate: "",
      isCurrent: false,
      summary: "",
      technologies: "TypeScript, React, Node.js",
      achievements: [{ value: "Architected core microservices leading to 40% latency drop" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const isCurrent = watch("isCurrent");

  const {
    data: experiences = [],
    isLoading,
    refetch,
    isRefetching,
  } = useExperiences(selectedType !== "all" ? selectedType : undefined);

  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();
  const reorderMutation = useReorderExperiences();

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;

    const newExperiences = [...experiences];
    const [moved] = newExperiences.splice(index, 1);
    newExperiences.splice(targetIndex, 0, moved);

    const orders = newExperiences.map((item, idx) => ({
      id: item._id,
      order: idx + 1,
    }));

    reorderMutation.mutate(orders);
  };

  const handleOpenCreate = () => {
    setEditingExp(null);
    reset({
      company: "",
      role: "",
      location: "",
      employmentType: "full-time",
      startDate: "",
      endDate: "",
      isCurrent: false,
      summary: "",
      technologies: "TypeScript, React, Node.js",
      achievements: [{ value: "" }],
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (exp: IExperience) => {
    setEditingExp(exp);
    reset({
      company: exp.company,
      role: exp.role,
      location: exp.location || "",
      employmentType: exp.employmentType || "full-time",
      startDate: exp.startDate ? exp.startDate.split("T")[0] : "",
      endDate: exp.endDate ? exp.endDate.split("T")[0] : "",
      isCurrent: exp.isCurrent,
      summary: exp.summary || "",
      technologies: (exp.technologies || []).join(", "),
      achievements:
        exp.achievements && exp.achievements.length > 0
          ? exp.achievements.map((h) => ({ value: h }))
          : [{ value: "" }],
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: ExperienceFormData) => {
    const techList = data.technologies
      ? data.technologies.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const achievementList = data.achievements
      .map((a) => a.value.trim())
      .filter((v) => v.length > 0);

    const payload = {
      company: data.company,
      role: data.role,
      location: data.location,
      employmentType: data.employmentType,
      isRemote: data.location.toLowerCase().includes("remote"),
      startDate: new Date(data.startDate).toISOString(),
      endDate:
        data.isCurrent || !data.endDate
          ? undefined
          : new Date(data.endDate).toISOString(),
      isCurrent: data.isCurrent,
      summary: data.summary,
      technologies: techList,
      achievements: achievementList,
      order: editingExp ? (editingExp.order ?? 0) : experiences.length + 1,
    };

    if (editingExp) {
      updateMutation.mutate(
        { id: editingExp._id, payload },
        { onSuccess: () => setDialogOpen(false) }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => setDialogOpen(false),
      });
    }
  };

  const handleDelete = (id: string, companyName: string) => {
    setDeleteTarget({ id, name: companyName });
  };

  return (
    <div className="space-y-4 pb-20">
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
            Document senior engineering roles, leadership milestones, and quantifiable impact.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
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
            <p className="text-sm font-semibold text-foreground">No experiences listed</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Add your current and previous engineering roles.
            </p>
          </div>
        ) : (
          experiences.map((exp: IExperience, idx: number) => (
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
                  {/* Reorder Up / Down */}
                  <div className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5 mr-1">
                    <button
                      type="button"
                      disabled={idx === 0 || reorderMutation.isPending}
                      onClick={() => handleMove(idx, "up")}
                      className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                      title="Move position up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === experiences.length - 1 || reorderMutation.isPending}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                      title="Move position down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col bg-card border-border text-card-foreground p-0 overflow-hidden shadow-2xl gap-0">
          <DialogHeader className="p-6 pb-3 border-b border-border shrink-0">
            <DialogTitle className="text-base font-bold text-foreground">
              {editingExp ? "Edit Career Experience" : "Add Career Experience"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Highlight quantified achievements, architecture leadership, and engineering impact.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col min-h-0 flex-1 overflow-hidden">
            <ScrollArea className="flex-1 min-h-0 w-full p-6">
              <div className="space-y-4 pr-2">
                {/* Company & Role */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Company Name *</label>
                    <Input
                      type="text"
                      {...register("company", { required: "Company is required" })}
                      placeholder="e.g. Stripe, Vercel"
                      className="text-xs h-9"
                    />
                    {errors.company && (
                      <span className="text-[10px] text-destructive">{errors.company.message}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Job Title / Role *</label>
                    <Input
                      type="text"
                      {...register("role", { required: "Role is required" })}
                      placeholder="e.g. Staff Full-Stack Engineer"
                      className="text-xs h-9"
                    />
                    {errors.role && (
                      <span className="text-[10px] text-destructive">{errors.role.message}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Location</label>
                    <Input
                      type="text"
                      {...register("location")}
                      placeholder="e.g. San Francisco, CA (Remote)"
                      className="text-xs h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Type</label>
                    <Controller
                      name="employmentType"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="text-xs h-9">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-Time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="part-time">Part-Time</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Start Date *</label>
                    <Input
                      type="date"
                      {...register("startDate", { required: "Start date is required" })}
                      className="text-xs h-9"
                    />
                    {errors.startDate && (
                      <span className="text-[10px] text-destructive">{errors.startDate.message}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">End Date</label>
                    <Input
                      type="date"
                      {...register("endDate")}
                      disabled={isCurrent}
                      className="text-xs h-9 disabled:opacity-40"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    name="isCurrent"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="isCurrentExp"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <label htmlFor="isCurrentExp" className="text-xs text-foreground cursor-pointer select-none">
                    I currently work in this role
                  </label>
                </div>

                {/* Technologies */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Technologies (comma-separated)</label>
                  <Input
                    type="text"
                    {...register("technologies")}
                    placeholder="TypeScript, React, GraphQL, Tailwind CSS"
                    className="text-xs h-9 font-mono"
                  />
                </div>

                {/* Summary */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Role Summary</label>
                  <Textarea
                    {...register("summary")}
                    placeholder="High-level description of responsibilities and scope..."
                    rows={2}
                    className="text-xs resize-none"
                  />
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-foreground">
                      Key Achievements / Impact Bullets
                    </label>
                    <button
                      type="button"
                      onClick={() => append({ value: "" })}
                      className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add Bullet
                    </button>
                  </div>
                  {fields.map((field, i) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <Input
                        type="text"
                        {...register(`achievements.${i}.value` as const)}
                        placeholder="e.g. Led migration to Next.js reducing bundle size by 55%"
                        className="flex-1 text-xs h-9"
                      />
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(i)}
                          className="text-muted-foreground hover:text-destructive p-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
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
                {editingExp ? "Save Changes" : "Create Record"}
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
