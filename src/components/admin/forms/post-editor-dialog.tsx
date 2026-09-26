"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IPost } from "@/interfaces";
import { useCreatePost, useUpdatePost, useUploadFile } from "@/hooks";
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
import { FileDropzone } from "@/components/ui/file-dropzone";
import { Loader2, Plus, Trash2, Save, X, FileText, Tag } from "lucide-react";
import { toast } from "sonner";

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  canonicalUrl?: string;
  isPublished: boolean;
  readingTimeMinutes: number;
}

export interface PostEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post?: IPost | null;
  onSaved?: () => void;
}

export function PostEditorDialog({
  isOpen,
  onClose,
  post,
  onSaved,
}: PostEditorDialogProps) {
  const [tagInput, setTagInput] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const uploadFileMutation = useUploadFile();

  const isSaving =
    createPostMutation.isPending ||
    updatePostMutation.isPending ||
    uploadFileMutation.isPending;

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
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImageUrl: "",
      tags: [],
      canonicalUrl: "",
      isPublished: true,
      readingTimeMinutes: 5,
    },
  });

  const tags = watch("tags") || [];
  const excerptValue = watch("excerpt") || "";

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content,
        coverImageUrl: post.coverImageUrl || "",
        tags: post.tags || [],
        canonicalUrl: post.canonicalUrl || "",
        isPublished: post.isPublished,
        readingTimeMinutes: post.readingTimeMinutes || 5,
      });
      setImagePreview(post.coverImageUrl || "");
      setSelectedImageFile(null);
    } else {
      reset({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImageUrl: "",
        tags: ["Architecture", "System Design"],
        canonicalUrl: "",
        isPublished: true,
        readingTimeMinutes: 5,
      });
      setImagePreview("");
      setSelectedImageFile(null);
    }
  }, [post, reset, isOpen]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleVal = e.target.value;
    setValue("title", titleVal, { shouldValidate: true });
    if (!post) {
      const generatedSlug = titleVal
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      setValue("tags", [...tags, trimmed], { shouldValidate: true });
      clearErrors("tags");
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tagToRemove),
      { shouldValidate: true }
    );
  };

  const handleCoverSelect = (file: File) => {
    setSelectedImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: PostFormData) => {
    if (!data.tags || data.tags.length === 0) {
      toast.error("Please add at least one topic tag");
      setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
      return;
    }

    let finalCoverUrl = data.coverImageUrl;

    // If a new local file was selected, upload it first
    if (selectedImageFile) {
      try {
        const uploadRes = await uploadFileMutation.mutateAsync({
          file: selectedImageFile,
          folder: "posts",
        });
        if (uploadRes?.url) {
          finalCoverUrl = uploadRes.url;
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to upload cover image");
        return;
      }
    }

    const payload = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: finalCoverUrl || undefined,
      tags: data.tags,
      canonicalUrl: data.canonicalUrl?.trim() || undefined,
      isPublished: data.isPublished,
      readingTimeMinutes: Number(data.readingTimeMinutes) || 5,
    };

    if (post) {
      updatePostMutation.mutate(
        { id: post._id, payload },
        {
          onSuccess: () => {
            onSaved?.();
            onClose();
          },
        }
      );
    } else {
      createPostMutation.mutate(payload, {
        onSuccess: () => {
          onSaved?.();
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col bg-card border-border text-foreground p-0 overflow-hidden shadow-2xl gap-0">
        <DialogHeader className="p-6 pb-3 border-b border-border shrink-0">
          <DialogTitle className="text-lg font-bold text-foreground">
            {post ? "Edit Technical Article" : "Write Engineering Article"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Compose markdown insights to demonstrate architectural depth and technical leadership.
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
                    Article Title *
                  </label>
                  <Input
                    {...register("title", { required: "Title is required" })}
                    onChange={handleTitleChange}
                    placeholder="e.g. Scaling Distributed State in Next.js"
                    className="text-xs h-9"
                  />
                  {errors.title && (
                    <p className="text-[11px] text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Slug (URL) *
                  </label>
                  <Input
                    {...register("slug", { required: "Slug is required" })}
                    placeholder="e.g. scaling-distributed-state"
                    className="text-xs h-9 font-mono"
                  />
                  {errors.slug && (
                    <p className="text-[11px] text-destructive">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Reading Time & Canonical URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Read Time (minutes) *
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={120}
                    {...register("readingTimeMinutes", {
                      valueAsNumber: true,
                      required: "Read time is required",
                    })}
                    placeholder="5"
                    className="text-xs h-9 font-mono"
                  />
                  {errors.readingTimeMinutes && (
                    <p className="text-[11px] text-destructive">
                      {errors.readingTimeMinutes.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Canonical URL (optional)
                  </label>
                  <Input
                    type="url"
                    {...register("canonicalUrl")}
                    placeholder="https://medium.com/@..."
                    className="text-xs h-9 font-mono"
                  />
                </div>
              </div>

              {/* Executive Summary / Excerpt */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">
                    Summary / Excerpt *
                  </label>
                  <span
                    className={`text-[11px] font-mono ${
                      excerptValue.length > 280
                        ? "text-destructive font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    {excerptValue.length}/300
                  </span>
                </div>
                <Textarea
                  {...register("excerpt", {
                    required: "Summary is required",
                    maxLength: {
                      value: 300,
                      message: "Summary cannot exceed 300 characters",
                    },
                  })}
                  maxLength={300}
                  placeholder="Short 2-sentence executive summary for search engines and social cards..."
                  rows={2}
                  className="text-xs resize-none"
                />
                {errors.excerpt && (
                  <p className="text-[11px] text-destructive">
                    {errors.excerpt.message}
                  </p>
                )}
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">
                  Topics & Tags *
                </label>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add topic (e.g. Next.js, Redis, Microservices)"
                    className="text-xs h-9"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleAddTag}
                    className="cursor-pointer shrink-0 text-xs h-9"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Add
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-muted text-foreground border border-border"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="hover:text-destructive text-muted-foreground cursor-pointer ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {errors.tags && (
                  <p className="text-[11px] text-destructive">
                    {errors.tags.message}
                  </p>
                )}
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Article Cover Banner
                </label>
                <FileDropzone
                  variant="banner"
                  previewUrl={imagePreview}
                  onFileSelect={handleCoverSelect}
                  onClear={() => {
                    setSelectedImageFile(null);
                    setImagePreview("");
                    setValue("coverImageUrl", "");
                  }}
                  isUploading={uploadFileMutation.isPending}
                  label="Upload article cover banner"
                  sublabel="High-resolution banner (16:9 recommended)"
                />
              </div>

              {/* Markdown Content */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">
                  Article Content (Markdown) *
                </label>
                <Textarea
                  {...register("content", {
                    required: "Article content is required",
                  })}
                  placeholder="## Architecture Overview&#10;&#10;In this article we examine..."
                  rows={8}
                  className="text-xs font-mono resize-y min-h-[160px]"
                />
                {errors.content && (
                  <p className="text-[11px] text-destructive">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* Publication Status Checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <Controller
                  name="isPublished"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="isPublishedPost"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <label
                  htmlFor="isPublishedPost"
                  className="text-xs font-medium text-foreground cursor-pointer select-none"
                >
                  Publish immediately (visible on public engineering blog)
                </label>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 px-6 border-t border-border bg-muted/40 shrink-0">
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
              <span>{post ? "Update Article" : "Publish Article"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Export alias for backward compatibility
export const PostEditorSheet = PostEditorDialog;
