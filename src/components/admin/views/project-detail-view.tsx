"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import {
  useProjectById,
  useUpdateProject,
  useUploadMultipleFiles,
  useDeleteProject,
  useToggleFeaturedProject,
  useTogglePublishedProject,
  useDeleteGalleryImage,
} from "@/hooks";
import { ProjectEditorDialog } from "@/components/admin";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkline } from "@/components/ui/sparkline";
import { SegmentedMeter } from "@/components/ui/segmented-meter";
import {
  ArrowLeft,
  Globe,
  Calendar,
  Edit,
  Layers,
  Clock,
  ExternalLink,
  Cpu,
  ImageIcon,
  UploadCloud,
  Loader2,
  Trash2,
  Star,
  Activity,
  Copy,
  Check,
  FolderGit2,
  RefreshCw,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Zap,
  Sparkles,
  Share2,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { formatDate } from "@/lib/date.utils";
import { toast } from "sonner";
import { IProject } from "@/interfaces";

export interface ProjectDetailViewProps {
  id: string;
}

export function ProjectDetailView({ id }: ProjectDetailViewProps) {
  const router = useRouter();
  const {
    data: project,
    isLoading,
    refetch,
    isRefetching,
  } = useProjectById(id);
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const toggleFeaturedMutation = useToggleFeaturedProject();
  const togglePublishedMutation = useTogglePublishedProject();
  const deleteGalleryImageMutation = useDeleteGalleryImage();
  const uploadMultipleMutation = useUploadMultipleFiles();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isToggleFeaturedOpen, setIsToggleFeaturedOpen] = useState(false);
  const [isTogglePublishedOpen, setIsTogglePublishedOpen] = useState(false);
  const [deleteImageIndex, setDeleteImageIndex] = useState<number | null>(null);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [copiedCaseStudy, setCopiedCaseStudy] = useState(false);

  // Gallery Lightbox Modal state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(
    null,
  );

  const isUploading =
    uploadMultipleMutation.isPending || updateProjectMutation.isPending;

  const currentGallery = project?.galleryImages || [];
  const metrics = project?.metrics || [];

  // Dropzone handler using react-dropzone
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!project || acceptedFiles.length === 0) return;

      uploadMultipleMutation.mutate(
        { files: acceptedFiles, folder: "projects/gallery" },
        {
          onSuccess: (data) => {
            if (Array.isArray(data)) {
              const newItems = data
                .filter((item) => item.url)
                .map((item) => ({ url: item.url, publicId: item.publicId }));
              const newGallery = [...currentGallery, ...newItems];
              const formData = new FormData();
              formData.append("galleryImages", JSON.stringify(newGallery));
              updateProjectMutation.mutate(
                { id: project._id, payload: formData },
                {
                  onSuccess: () => {
                    toast.success(
                      `${newItems.length} screenshot${newItems.length > 1 ? "s" : ""} added to gallery`,
                    );
                  },
                },
              );
            }
          },
        },
      );
    },
    [project, currentGallery, uploadMultipleMutation, updateProjectMutation],
  );


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    disabled: isUploading,
  });

  const handleDeleteImage = (indexToRemove: number) => {
    if (!project) return;
    const target = currentGallery[indexToRemove];
    const publicId = typeof target === "string" ? undefined : target?.publicId;

    if (!publicId) {
      toast.error("Screenshot public ID not found");
      return;
    }

    deleteGalleryImageMutation.mutate({
      projectId: project._id,
      publicId,
    });

    if (activeLightboxIndex === indexToRemove) {
      setActiveLightboxIndex(null);
    }
  };



  const handleToggleFeatured = () => {
    if (!project) return;
    toggleFeaturedMutation.mutate(project._id);
  };

  const handleTogglePublished = () => {
    if (!project) return;
    togglePublishedMutation.mutate(project._id);
  };



  const copySlugToClipboard = () => {
    if (!project) return;
    navigator.clipboard.writeText(`/projects/${project.slug}`);
    setCopiedSlug(true);
    toast.success("Project URL path copied to clipboard");
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const copyCaseStudyToClipboard = () => {
    if (!project?.caseStudy) return;
    navigator.clipboard.writeText(project.caseStudy);
    setCopiedCaseStudy(true);
    toast.success("Case study copied to clipboard");
    setTimeout(() => setCopiedCaseStudy(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 pb-16">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-6 w-56 bg-muted" />
            <Skeleton className="h-3.5 w-40 bg-muted" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20 bg-muted rounded-lg" />
            <Skeleton className="h-9 w-28 bg-muted rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl bg-muted" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <Skeleton className="h-64 w-full rounded-xl bg-muted" />
            <Skeleton className="h-48 w-full rounded-xl bg-muted" />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <Skeleton className="h-48 w-full rounded-xl bg-muted" />
            <Skeleton className="h-64 w-full rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-20 text-center bg-card border border-border rounded-xl max-w-lg mx-auto">
        <FolderGit2 className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-60" />
        <h2 className="text-base font-bold text-foreground">
          Project Not Found
        </h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          The requested showcase project could not be found or has been removed.
        </p>
        <button
          onClick={() => router.push("/admin/projects")}
          className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Grid</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16">
      {/* Top Header & Fast Actions (Matches ProjectsView standard) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/admin/projects"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Projects Grid</span>
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-muted text-foreground border border-border">
              {project.category}
            </span>
            <span className="text-muted-foreground text-xs">/</span>
            <h1 className="text-xl font-bold text-foreground tracking-tight truncate max-w-sm sm:max-w-md">
              {project.title}
            </h1>
            {project.isFeatured && (
              <button
                onClick={() => setIsToggleFeaturedOpen(true)}
                title="Featured on Portfolio Homepage"
                className="text-amber-500 dark:text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                <Star className="w-4 h-4 fill-amber-400" />
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage showcase case study, engineering stack, performance metrics,
            and media gallery.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Refresh record"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>

          <button
            onClick={() => setIsToggleFeaturedOpen(true)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              project.isFeatured
                ? "bg-amber-500/10 border-amber-500/20 text-amber-500 dark:text-amber-400 hover:bg-amber-500/20"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Star
              className={`w-3.5 h-3.5 ${
                project.isFeatured ? "fill-amber-400" : ""
              }`}
            />
            <span>{project.isFeatured ? "Featured" : "Set Featured"}</span>
          </button>

          <button
            onClick={() => setIsTogglePublishedOpen(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              project.isPublished
                ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                : "bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.isPublished ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span>
              {project.isPublished ? "Published (Live)" : "Draft (Hidden)"}
            </span>
          </button>

          <button
            onClick={() => setIsEditorOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Project</span>
          </button>

          <button
            onClick={() => setIsDeleteOpen(true)}
            className="p-2 rounded-lg border border-destructive/20 bg-destructive/10 hover:bg-destructive/20 text-xs font-medium text-destructive transition-colors cursor-pointer"
            title="Delete project"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Summary KPI Badges (Exact match to /admin/projects 4-card grid style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Domain Category</span>
          <span className="font-mono font-bold text-foreground text-xs uppercase">
            {project.category}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Display Order</span>
          <span className="font-mono font-bold text-primary text-sm">
            #{project.order ?? 0}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Tech Stack Tags</span>
          <span className="font-mono font-bold text-foreground text-sm">
            {project.technologies.length}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Gallery Media</span>
          <span className="font-mono font-bold text-amber-500 dark:text-amber-400 text-sm">
            {currentGallery.length}
          </span>
        </div>
      </div>

      {/* Main Content Layout (7 cols Left / 5 cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Project Overview & Deep Technical Case Study */}
        <div className="lg:col-span-7 space-y-4">
          {/* Card 1: Project Overview & Specs */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-primary" />
                <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Project Overview & Specs
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copySlugToClipboard}
                  className="text-[10px] font-mono text-muted-foreground hover:text-foreground bg-muted px-2 py-0.5 rounded border border-border flex items-center gap-1 transition-colors cursor-pointer"
                  title="Click to copy slug"
                >
                  {copiedSlug ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>/{project.slug}</span>
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Cover Image & Quick Links */}
              <div className="space-y-3">
                <div className="relative w-full h-48 sm:h-56 rounded-lg bg-muted border border-border overflow-hidden group">
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs gap-2">
                      <FolderGit2 className="w-6 h-6 opacity-60" />
                      <span>No cover thumbnail uploaded</span>
                    </div>
                  )}

                  {/* Badges in cover */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/70 text-white backdrop-blur-xs border border-white/10">
                      {project.category}
                    </span>
                    {project.isFeatured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500 text-white flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-white" />
                        <span>Featured Star</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* External Action Links */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium flex items-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Production Demo</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-muted hover:bg-accent border border-border text-foreground text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub Source Repository</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Summary Description */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  Executive Summary
                </span>
                <p className="text-xs text-foreground leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Tech Stack Matrix */}
              <div className="space-y-2 pt-2 border-t border-border">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  Engineering Stack ({project.technologies.length})
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border hover:border-primary/40 hover:text-foreground transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timestamps */}
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono pt-2 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Created {formatDate(project.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    Updated {formatDate(project.updatedAt || project.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Technical Case Study & Architecture Spec */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Technical Case Study & Architecture Spec
                </h2>
              </div>
              {project.caseStudy && (
                <button
                  type="button"
                  onClick={copyCaseStudyToClipboard}
                  className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  {copiedCaseStudy ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedCaseStudy ? "Copied" : "Copy Spec"}</span>
                </button>
              )}
            </div>

            <div className="p-5">
              {project.caseStudy ? (
                <div className="text-xs font-mono leading-relaxed text-foreground whitespace-pre-wrap bg-background p-4 rounded-lg border border-border max-h-96 overflow-y-auto">
                  {project.caseStudy}
                </div>
              ) : (
                <div className="py-10 text-center space-y-2">
                  <Cpu className="w-8 h-8 text-muted-foreground mx-auto opacity-50" />
                  <p className="text-xs text-muted-foreground font-medium">
                    No technical case study provided
                  </p>
                  <p className="text-[11px] text-muted-foreground/80 max-w-sm mx-auto">
                    Document system architecture design decisions, throughput
                    benchmarks, and implementation challenges.
                  </p>
                  <button
                    onClick={() => setIsEditorOpen(true)}
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-accent border border-border text-foreground text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Add Technical Case Study</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Performance Benchmarks & Media Gallery */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 3: Impact & Performance Benchmarks */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Live Performance Benchmarks
                </h2>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">
                {metrics.length} metrics
              </span>
            </div>

            <div className="p-4 space-y-3">
              {/* Readiness status bar */}
              <div className="bg-background border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Deployment Readiness
                  </span>
                  <span className="font-mono font-bold text-foreground">
                    {project.isPublished
                      ? "100% (Production)"
                      : "75% (Staging)"}
                  </span>
                </div>
                <SegmentedMeter
                  value={project.isPublished ? 100 : 75}
                  totalSegments={5}
                />
              </div>

              {/* Dynamic metric stats */}
              {metrics.length > 0 ? (
                <div className="space-y-2">
                  {metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="bg-background border border-border rounded-lg p-3 flex items-center justify-between gap-3 hover:border-border/80 transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[11px] text-muted-foreground block truncate">
                          {metric.label}
                        </span>
                        <span className="text-sm font-bold text-foreground font-mono block mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Sparkline
                          data={[15, 22, 18, 30, 28, 42, 50]}
                          width={48}
                          height={16}
                          color="emerald"
                        />
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground space-y-1.5">
                  <Activity className="w-6 h-6 mx-auto opacity-50 text-emerald-500" />
                  <p className="text-xs font-medium text-foreground">
                    No metrics configured
                  </p>
                  <p className="text-[11px] text-muted-foreground max-w-xs mx-auto">
                    Add quantifiable performance counters (e.g., &quot;99.9%
                    Uptime&quot;, &quot;&lt;40ms Latency&quot;).
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Card 4: Showcase Media Gallery (Single unified react-dropzone) */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Showcase Media Gallery
                </h2>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                {currentGallery.length}{" "}
                {currentGallery.length === 1 ? "image" : "images"}
              </span>
            </div>

            <div className="p-4 space-y-3">
              {/* react-dropzone upload area */}
              <div
                {...getRootProps()}
                className={`border border-dashed rounded-lg p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isDragActive
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 bg-muted/20 hover:bg-muted/40 text-muted-foreground"
                } ${isUploading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`}
              >
                <input {...getInputProps()} />
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      Uploading screenshots to storage...
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-5 h-5 opacity-70" />
                    <div className="text-xs font-medium text-foreground">
                      {isDragActive
                        ? "Drop images here..."
                        : "Drag & drop screenshots here, or click to browse"}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      Supports PNG, JPG, WebP, SVG (multi-file)
                    </span>
                  </>
                )}
              </div>

              {/* Gallery Screenshots Grid with Next.js Image Optimization */}
              {currentGallery.length > 0 && (
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {currentGallery.map((item, i) => {
                    const imgUrl = typeof item === "string" ? item : item.url;
                    return (
                      <div
                        key={i}
                        className="group relative rounded-lg overflow-hidden border border-border aspect-video bg-muted shadow-2xs"
                      >
                        <Image
                          src={imgUrl}
                          alt={`Screenshot ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          onClick={() => setActiveLightboxIndex(i)}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-2xs z-10">
                          <button
                            type="button"
                            onClick={() => setActiveLightboxIndex(i)}
                            className="p-1.5 rounded bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                            title="Zoom preview"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteImageIndex(i)}
                            disabled={isUploading}
                            className="p-1.5 rounded bg-destructive/80 hover:bg-destructive text-white transition-colors cursor-pointer"
                            title="Delete screenshot"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Preview Modal */}
      {activeLightboxIndex !== null && currentGallery[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
            title="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation */}
          {currentGallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex(
                    (activeLightboxIndex - 1 + currentGallery.length) %
                      currentGallery.length,
                  )
                }
                className="absolute left-5 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex(
                    (activeLightboxIndex + 1) % currentGallery.length,
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="max-w-4xl w-full flex flex-col items-center gap-3">
            <div className="relative w-full h-[70vh]">
              {(() => {
                const activeItem = currentGallery[activeLightboxIndex];
                const activeUrl =
                  typeof activeItem === "string" ? activeItem : activeItem?.url;
                return activeUrl ? (
                  <Image
                    src={activeUrl}
                    alt={`Gallery preview ${activeLightboxIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 90vw, 1000px"
                    priority
                  />
                ) : null;
              })()}
            </div>
            <div className="flex items-center justify-center text-xs font-mono text-white/80">
              <span>
                {activeLightboxIndex + 1} of {currentGallery.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Dialog */}
      <ProjectEditorDialog
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        project={project}
        onSaved={() => {
          refetch();
          setIsEditorOpen(false);
        }}
      />

      {/* Delete Project Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => {
          deleteProjectMutation.mutate(project._id, {
            onSuccess: () => {
              router.push("/admin/projects");
            },
          });
        }}
        title="Delete Showcase Project"
        description={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
        confirmText="Delete Project"
        isLoading={deleteProjectMutation.isPending}
        variant="destructive"
      />

      {/* Delete Screenshot Confirmation Modal */}
      <ConfirmationModal
        open={deleteImageIndex !== null}
        onOpenChange={(open) => !open && setDeleteImageIndex(null)}
        onConfirm={() => {
          if (deleteImageIndex !== null) {
            handleDeleteImage(deleteImageIndex);
            setDeleteImageIndex(null);
          }
        }}
        title="Remove Screenshot"
        description="Are you sure you want to remove this screenshot from the gallery? This action cannot be undone."
        confirmText="Remove Screenshot"
        isLoading={deleteGalleryImageMutation.isPending}
        variant="destructive"
      />


      {/* Toggle Featured Confirmation Modal */}
      <ConfirmationModal
        open={isToggleFeaturedOpen}
        onOpenChange={setIsToggleFeaturedOpen}
        onConfirm={() => {
          handleToggleFeatured();
          setIsToggleFeaturedOpen(false);
        }}
        title={project.isFeatured ? "Unset Featured Project" : "Feature Project"}
        description={
          project.isFeatured
            ? `Are you sure you want to remove "${project.title}" from featured highlights on the portfolio homepage?`
            : `Are you sure you want to mark "${project.title}" as a featured highlight on the portfolio homepage?`
        }
        confirmText={project.isFeatured ? "Unset Featured" : "Set Featured"}
        isLoading={toggleFeaturedMutation.isPending}
        variant={project.isFeatured ? "warning" : "info"}
      />

      {/* Toggle Published Confirmation Modal */}
      <ConfirmationModal
        open={isTogglePublishedOpen}
        onOpenChange={setIsTogglePublishedOpen}
        onConfirm={() => {
          handleTogglePublished();
          setIsTogglePublishedOpen(false);
        }}
        title={
          project.isPublished
            ? "Unpublish Project (Set to Draft)"
            : "Publish Project Live"
        }
        description={
          project.isPublished
            ? `Are you sure you want to unpublish "${project.title}"? It will be hidden from public portfolio visitors.`
            : `Are you sure you want to publish "${project.title}" live? It will become publicly visible on your portfolio.`
        }
        confirmText={project.isPublished ? "Set to Draft" : "Publish Live"}
        isLoading={togglePublishedMutation.isPending}
        variant={project.isPublished ? "warning" : "success"}
      />

    </div>
  );
}
