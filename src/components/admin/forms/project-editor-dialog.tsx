"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { IProject, ProjectCategory } from "@/interfaces";
import { useCreateProject, useUpdateProject } from "@/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
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
import { FileDropzone } from "@/components/ui/file-dropzone";
import { Loader2, Plus, Trash2, Save, Globe } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { toast } from "sonner";

export interface ProjectFormData {
  title: string;
  slug: string;
  category: ProjectCategory;
  summary: string;
  caseStudy: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
  metrics: Array<{ label: string; value: string }>;
}

export interface ProjectEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project?: IProject | null;
  onSaved: () => void;
}

const CATEGORIES: ProjectCategory[] = [
  "Full-Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
  "AI/ML",
  "System Design",
];

export function ProjectEditorDialog({
  isOpen,
  onClose,
  project,
  onSaved,
}: ProjectEditorDialogProps) {
  const [techInput, setTechInput] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();

  const isSaving =
    createProjectMutation.isPending || updateProjectMutation.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      slug: "",
      category: "Full-Stack",
      summary: "",
      caseStudy: "",
      technologies: [],
      liveUrl: "",
      githubUrl: "",
      isFeatured: false,
      isPublished: true,
      order: 0,
      metrics: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "metrics",
  });

  const technologies = watch("technologies") || [];
  const summaryValue = watch("summary") || "";

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        slug: project.slug,
        category: project.category,
        summary: project.summary,
        caseStudy: project.caseStudy || "",
        technologies: project.technologies,
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        isFeatured: project.isFeatured,
        isPublished: project.isPublished,
        order: project.order ?? 0,
        metrics: project.metrics || [],
      });
      setImagePreview(project.thumbnailUrl || "");
      setSelectedImageFile(null);
    } else {
      reset({
        title: "",
        slug: "",
        category: "Full-Stack",
        summary: "",
        caseStudy: "",
        technologies: [],
        liveUrl: "",
        githubUrl: "",
        isFeatured: false,
        isPublished: true,
        order: 0,
        metrics: [
          { label: "Throughput", value: "10k req/s" },
          { label: "Latency", value: "12ms" },
        ],
      });
      setImagePreview("");
      setSelectedImageFile(null);
    }
  }, [project, reset]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleVal = e.target.value;
    setValue("title", titleVal);
    if (!project) {
      const generatedSlug = titleVal
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug);
    }
  };

  const handleAddTechnology = () => {
    if (!techInput.trim()) return;
    if (!technologies.includes(techInput.trim())) {
      setValue("technologies", [...technologies, techInput.trim()], {
        shouldValidate: true,
      });
      clearErrors("technologies");
    }
    setTechInput("");
  };

  const handleRemoveTechnology = (tech: string) => {
    setValue(
      "technologies",
      technologies.filter((t) => t !== tech),
      { shouldValidate: true },
    );
  };

  const handleCoverSelect = (file: File) => {
    setSelectedImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: ProjectFormData) => {
    if (!data.technologies || data.technologies.length === 0) {
      toast.error("Please add at least one technology tag");
      setError("technologies", {
        type: "manual",
        message: "At least one technology is required",
      });
      return;
    }

    if (!project && !selectedImageFile && !imagePreview) {
      toast.error("Please choose a cover image for the project");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("category", data.category);
    formData.append("summary", data.summary);
    formData.append("caseStudy", data.caseStudy || "");
    formData.append("technologies", JSON.stringify(data.technologies));
    formData.append("liveUrl", data.liveUrl || "");
    formData.append("githubUrl", data.githubUrl || "");
    formData.append("isFeatured", String(data.isFeatured));
    formData.append("isPublished", String(data.isPublished));
    formData.append("order", String(Number(data.order) || 0));
    formData.append("metrics", JSON.stringify(data.metrics || []));

    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    }

    if (project?.galleryImages) {
      formData.append("galleryImages", JSON.stringify(project.galleryImages));
    }

    if (project) {
      updateProjectMutation.mutate(
        { id: project._id, payload: formData },
        {
          onSuccess: () => {
            onSaved();
            onClose();
          },
        },
      );
    } else {
      createProjectMutation.mutate(formData, {
        onSuccess: () => {
          onSaved();
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-2xl max-h-[90vh] flex flex-col bg-card border-border text-foreground p-0 overflow-hidden shadow-2xl gap-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-6 pb-3 border-b border-border shrink-0">
          <DialogTitle className="text-lg font-bold text-foreground">
            {project ? "Edit Project" : "Create New Project"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Define architectural metadata, metrics, live URLs, and tech stack
            tags.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-h-0 flex-1 overflow-hidden"
        >
          <ScrollArea className="flex-1 min-h-0 w-full overflow-y-auto">
            <div className="p-6 space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Project Title *
                  </label>
                  <Input
                    {...register("title", { required: "Title is required" })}
                    onChange={handleTitleChange}
                    placeholder="e.g. Distributed Task Queue Engine"
                  />
                  {errors.title && (
                    <p className="text-[11px] text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Slug *
                  </label>
                  <Input
                    {...register("slug", { required: "Slug is required" })}
                    placeholder="e.g. distributed-task-queue"
                    className="font-mono"
                  />
                  {errors.slug && (
                    <p className="text-[11px] text-destructive">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Category, Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Category *
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Display Order
                  </label>
                  <Input
                    type="number"
                    {...register("order", { valueAsNumber: true })}
                    placeholder="0"
                    className="font-mono"
                  />
                </div>
              </div>

              {/* Cover Image Upload (React Dropzone) */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Cover Showcase Image *
                </label>
                <FileDropzone
                  previewUrl={imagePreview}
                  onFileSelect={handleCoverSelect}
                  onClear={() => {
                    setSelectedImageFile(null);
                    setImagePreview("");
                  }}
                  label="Click or drag cover image to upload"
                  sublabel="Recommended 16:9 ratio (1200x675)"
                />
              </div>

              {/* Summary with 300 char counter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">
                    Executive Summary *
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      summaryValue.length > 280
                        ? "text-destructive font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {summaryValue.length}/300
                  </span>
                </div>
                <Textarea
                  {...register("summary", {
                    required: "Summary is required",
                    maxLength: {
                      value: 300,
                      message: "Summary cannot exceed 300 characters",
                    },
                  })}
                  maxLength={300}
                  placeholder="A high-level architectural overview of what this project accomplishes..."
                  rows={3}
                  className="resize-none"
                />
                {errors.summary && (
                  <p className="text-[11px] text-destructive">
                    {errors.summary.message}
                  </p>
                )}
              </div>

              {/* Technologies Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Technologies & Frameworks *
                </label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTechnology();
                      }
                    }}
                    placeholder="e.g. Next.js 16, TypeScript, Redis (Press Enter to add)"
                    className="font-mono"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTechnology}
                    className="shrink-0 cursor-pointer"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-muted/40 border border-border rounded-lg">
                  {technologies.length === 0 ? (
                    <span className="text-[11px] text-muted-foreground italic">
                      No technologies added yet
                    </span>
                  ) : (
                    technologies.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono bg-card text-foreground border border-border"
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(t)}
                          className="text-muted-foreground hover:text-destructive cursor-pointer font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}
                </div>
                {errors.technologies && (
                  <p className="text-[11px] text-destructive">
                    {errors.technologies.message}
                  </p>
                )}
              </div>

              {/* URLs: Live & GitHub */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Live Demo URL</span>
                  </label>
                  <Input
                    {...register("liveUrl")}
                    placeholder="https://demo.portfolio.dev"
                    className="font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>GitHub Repository URL</span>
                  </label>
                  <Input
                    {...register("githubUrl")}
                    placeholder="https://github.com/alexmorgan/project"
                    className="font-mono"
                  />
                </div>
              </div>

              {/* Dynamic Metrics */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">
                    Impact Metrics & Benchmarks
                  </label>
                  <button
                    type="button"
                    onClick={() => append({ label: "", value: "" })}
                    className="text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Metric</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <Input
                        {...register(`metrics.${index}.label` as const, {
                          required: true,
                        })}
                        placeholder="Metric label (e.g. Latency P99)"
                        className="flex-1"
                      />
                      <Input
                        {...register(`metrics.${index}.value` as const, {
                          required: true,
                        })}
                        placeholder="Value (e.g. 18ms)"
                        className="w-32 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="p-1.5 text-muted-foreground hover:text-destructive cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case Study Markdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Full Technical Case Study (Markdown)
                </label>
                <Textarea
                  {...register("caseStudy")}
                  placeholder="## Problem Statement&#10;&#10;Explain architectural decisions, challenges, and measurable solutions..."
                  rows={6}
                  className="font-mono resize-y"
                />
              </div>

              {/* Flags: Featured & Published */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <Controller
                    name="isFeatured"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="isFeatured"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <label
                    htmlFor="isFeatured"
                    className="text-xs font-medium text-foreground cursor-pointer select-none"
                  >
                    Feature on Homepage
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    name="isPublished"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="isPublished"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <label
                    htmlFor="isPublished"
                    className="text-xs font-medium text-foreground cursor-pointer select-none"
                  >
                    Published Live
                  </label>
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 px-6 border-t border-border bg-muted/40 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="cursor-pointer text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              size="sm"
              className="cursor-pointer text-xs flex items-center gap-1.5"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{project ? "Update Project" : "Create Project"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Export alias for backward compatibility
export const ProjectEditorSheet = ProjectEditorDialog;
