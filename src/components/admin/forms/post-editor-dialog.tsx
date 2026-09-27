"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IPost } from "@/interfaces";
import { useCreatePost, useUpdatePost } from "@/hooks";
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
import { Loader2, Plus, Trash2, X, FileText, Tag } from "lucide-react";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  canonicalUrl?: string;
  isPublished: boolean;
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

  const isSaving =
    createPostMutation.isPending || updatePostMutation.isPending;

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
      tags: [],
      canonicalUrl: "",
      isPublished: true,
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
        tags: post.tags || [],
        canonicalUrl: post.canonicalUrl || "",
        isPublished: post.isPublished,
      });
      setImagePreview(post.coverImageUrl || "");
      setSelectedImageFile(null);
    } else {
      reset({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        tags: ["Architecture", "System Design"],
        canonicalUrl: "",
        isPublished: true,
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
      { shouldValidate: true },
    );
  };

  const handleCoverSelect = (file: File) => {
    setSelectedImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (data: PostFormData) => {
    if (!data.tags || data.tags.length === 0) {
      toast.error("Please add at least one topic tag");
      setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("tags", JSON.stringify(data.tags));
    if (data.canonicalUrl?.trim()) {
      formData.append("canonicalUrl", data.canonicalUrl.trim());
    }
    formData.append("isPublished", String(data.isPublished));

    if (selectedImageFile) {
      formData.append("image", selectedImageFile);
    } else if (!imagePreview && post?.coverImageUrl) {
      formData.append("removeCoverImage", "true");
    }

    if (post) {
      updatePostMutation.mutate(
        { id: post._id, payload: formData },
        {
          onSuccess: () => {
            onSaved?.();
            onClose();
          },
        },
      );
    } else {
      createPostMutation.mutate(formData, {
        onSuccess: () => {
          onSaved?.();
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-2xl max-h-[90vh] flex flex-col bg-card border-border text-card-foreground p-0 overflow-hidden shadow-2xl gap-0 w-full min-w-0 max-w-full"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="p-6 pb-3 border-b border-border shrink-0">
          <DialogTitle className="text-base font-bold text-foreground">
            {post ? "Edit Article" : "Write Technical Article"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Publish formatted breakdowns, tutorials, and architecture case
            studies.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col min-h-0 flex-1 overflow-hidden w-full min-w-0 max-w-full"
        >
          <ScrollArea className="flex-1 min-h-0 w-full min-w-0 max-w-full overflow-y-auto overflow-x-hidden">
            <div className="p-6 space-y-4 w-full min-w-0 max-w-full overflow-x-hidden">
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

              {/* Canonical URL (optional) */}
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
                  }}
                  isUploading={isSaving}
                  label="Upload article cover banner"
                  sublabel="High-resolution banner (16:9 recommended)"
                />
              </div>

              {/* Rich Text Content */}
              <div className="space-y-1.5 w-full min-w-0 max-w-full overflow-hidden">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">
                    Article Content *
                  </label>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Rich text formatted with code blocks, headings & links
                  </span>
                </div>
                <Controller
                  name="content"
                  control={control}
                  rules={{
                    required: "Article content is required",
                  }}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Write your technical article, code breakdowns, and insights..."
                      height="h-64 sm:h-80"
                    />
                  )}
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
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="cursor-pointer text-xs px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              size="sm"
              className="cursor-pointer text-xs flex items-center gap-1.5 px-4"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{post ? "Save Changes" : "Create Article"}</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Export alias for backward compatibility
export const PostEditorSheet = PostEditorDialog;
