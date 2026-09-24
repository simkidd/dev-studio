"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IProject, ProjectCategory } from "@/interfaces";
import { useCreateProject, useUpdateProject, useUploadFile } from "@/hooks";
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
import { Loader2, UploadCloud, Plus, Trash2, Save, Globe } from "lucide-react";
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      <DialogContent className="sm:max-w-2xl bg-card border-border text-foreground p-0 overflow-hidden shadow-2xl gap-0">
        <DialogHeader className="p-6 pb-3 border-b border-border">
          <DialogTitle className="text-lg font-bold text-foreground">
            {project ? "Edit Project" : "Create New Project"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Define architectural metadata, metrics, live URLs, and tech stack
            tags.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ScrollArea className="max-h-[68vh] p-6 space-y-4 overflow-y-auto">
            <div className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Project Title *
                  </label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    onChange={handleTitleChange}
                    placeholder="e.g. Distributed Task Queue Engine"
                    className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                  {errors.title && (
                    <p className="text-[11px] text-destructive mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Slug *
                  </label>
                  <input
                    {...register("slug", { required: "Slug is required" })}
                    placeholder="e.g. distributed-task-queue"
                    className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
                  />
                  {errors.slug && (
                    <p className="text-[11px] text-destructive mt-1">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Category, Order & Thumbnail URL */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Category *
                  </label>
                  <select
                    {...register("category", { required: true })}
                    className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-xs text-foreground focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="Full-Stack">Full-Stack Application</option>
                    <option value="Frontend">Frontend Architecture</option>
                    <option value="Backend">Backend & Distributed</option>
                    <option value="Mobile">Mobile (React Native)</option>
                    <option value="DevOps">Cloud & DevOps</option>
                    <option value="AI/ML">AI & Machine Learning</option>
                    <option value="System Design">System Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    {...register("order", { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Cover Image *
                  </label>
                  <label className="flex items-center justify-between gap-2 px-3 py-2 bg-background hover:bg-muted/50 border border-border rounded-lg text-xs cursor-pointer transition-colors">
                    <span className="text-muted-foreground truncate">
                      {selectedImageFile
                        ? selectedImageFile.name
                        : imagePreview
                          ? "Change current cover image..."
                          : "Choose cover image..."}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-foreground font-medium text-[11px] shrink-0 border border-border">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Browse</span>
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Cover Image Preview */}
              {imagePreview && (
                <div className="rounded-lg overflow-hidden border border-border h-36 bg-muted relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Cover Preview"
                    className="w-full h-full object-cover object-center opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-xs font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5 border border-white/20">
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Replace Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] bg-black/70 text-white font-mono">
                    {selectedImageFile ? "New Upload Selected" : "Current Cover"}
                  </span>
                </div>
              )}


              {/* Summary with 300 char counter */}
              <div>
                <div className="flex items-center justify-between mb-1">
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
                <textarea
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
                  className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                />
                {errors.summary && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.summary.message}
                  </p>
                )}
              </div>

              {/* Technologies Tags */}
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Technologies & Frameworks *
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTechnology();
                      }
                    }}
                    placeholder="e.g. Next.js 16, TypeScript, Redis"
                    className="flex-1 bg-background border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddTechnology}
                    className="px-3.5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[30px] p-2 bg-muted/40 border border-border rounded-lg">
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
                          className="text-muted-foreground hover:text-destructive cursor-pointer"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}
                </div>
                {errors.technologies && (
                  <p className="text-[11px] text-destructive mt-1">
                    {errors.technologies.message}
                  </p>
                )}
              </div>

              {/* URLs: Live & GitHub */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Live Demo URL</span>
                  </label>
                  <input
                    {...register("liveUrl")}
                    placeholder="https://demo.portfolio.dev"
                    className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1 flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>GitHub Repository URL</span>
                  </label>
                  <input
                    {...register("githubUrl")}
                    placeholder="https://github.com/alexmorgan/project"
                    className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              {/* Dynamic Metrics */}
              <div>
                <div className="flex items-center justify-between mb-2">
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
                      <input
                        {...register(`metrics.${index}.label` as const, {
                          required: true,
                        })}
                        placeholder="Metric label (e.g. Latency P99)"
                        className="flex-1 bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      />
                      <input
                        {...register(`metrics.${index}.value` as const, {
                          required: true,
                        })}
                        placeholder="Value (e.g. 18ms)"
                        className="w-32 bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono"
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
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  Full Technical Case Study (Markdown)
                </label>
                <textarea
                  {...register("caseStudy")}
                  placeholder="## Problem Statement&#10;&#10;Explain architectural decisions, challenges, and measurable solutions..."
                  rows={6}
                  className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-mono resize-y"
                />
              </div>

              {/* Flags: Featured & Published */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isFeatured")}
                    className="w-4 h-4 rounded bg-background border-border text-primary focus:ring-0"
                  />
                  <span className="text-xs font-medium text-foreground">
                    Feature on Homepage
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("isPublished")}
                    className="w-4 h-4 rounded bg-background border-border text-primary focus:ring-0"
                  />
                  <span className="text-xs font-medium text-foreground">
                    Published Live
                  </span>
                </label>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 px-6 border-t border-border bg-muted/40">
            <Button
              type="button"
              variant="outline"
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
