"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  usePosts,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from "@/hooks";
import { IPost } from "@/interfaces";
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Search,
  RefreshCw,
  Clock,
  Calendar,
  X,
  Tag,
  Globe,
  Heart,
  Layers,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PillFilter } from "@/components/ui/pill-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/date.utils";
import { Eye, ExternalLink, Sparkles } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string;
  isPublished: boolean;
  readingTimeMinutes: number;
}

export function PostsView() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<IPost | null>(null);

  // Article Reader Sheet State
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailPost, setDetailPost] = useState<IPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImageUrl: "",
      tags: "Architecture, Next.js",
      isPublished: true,
      readingTimeMinutes: 6,
    },
  });

  const {
    data: postsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = usePosts({
    search: search || undefined,
    status: selectedStatus !== "all" ? selectedStatus : undefined,
    page,
    limit,
  });

  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  const deleteMutation = useDeletePost();

  const posts: IPost[] = postsResponse?.data || [];

  const handleOpenCreate = () => {
    setEditingPost(null);
    reset({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImageUrl: "",
      tags: "Architecture, Next.js",
      isPublished: true,
      readingTimeMinutes: 6,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (post: IPost) => {
    setEditingPost(post);
    reset({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      coverImageUrl: post.coverImageUrl || "",
      tags: (post.tags || []).join(", "),
      isPublished: post.isPublished,
      readingTimeMinutes: post.readingTimeMinutes || 6,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: PostFormData) => {
    const tagList = data.tags
      ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const payload = {
      title: data.title,
      slug: data.slug || undefined,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.coverImageUrl || undefined,
      tags: tagList,
      isPublished: data.isPublished,
      readingTimeMinutes: Number(data.readingTimeMinutes),
    };

    if (editingPost) {
      updateMutation.mutate(
        { id: editingPost._id, payload },
        { onSuccess: () => setDialogOpen(false) }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => setDialogOpen(false),
      });
    }
  };

  const handleDelete = (id: string, postTitle: string) => {
    setDeleteTarget({ id, title: postTitle });
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Engineering Insights & Articles CMS
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {posts.length} articles
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Publish technical deep-dives, architectural post-mortems, and engineering authority posts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
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
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts by title or keyword..."
            className="w-full bg-background border border-border rounded-lg pl-8.5 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <PillFilter
            label="Status"
            value={selectedStatus}
            options={[
              { label: "All Status", value: "all" },
              { label: "Published", value: "published" },
              { label: "Drafts", value: "draft" },
            ]}
            onChange={setSelectedStatus}
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table className="w-full text-left border-collapse">
          <TableHeader className="border-b border-border bg-muted/50">
            <TableRow className="border-b border-border hover:bg-transparent text-[11px] font-semibold text-muted-foreground uppercase tracking-wider select-none">
              <TableHead className="px-4 py-3 text-muted-foreground">Article Title & Slug</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">Tags</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">Read Time</TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">Published Date</TableHead>
              <TableHead className="px-4 py-3 text-center text-muted-foreground">Status</TableHead>
              <TableHead className="px-4 py-3 text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border text-xs">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse border-b border-border">
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-48 bg-muted" />
                    <Skeleton className="h-3 w-28 bg-muted mt-1" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-24 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-16 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-20 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    <Skeleton className="h-4 w-16 mx-auto bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right">
                    <Skeleton className="h-6 w-16 ml-auto bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : posts.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="py-16 text-center">
                  <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold text-foreground">No articles created yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Share architectural learnings, code patterns, and tutorials.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post: IPost) => (
                <TableRow key={post._id} className="hover:bg-muted/40 transition-colors border-b border-border">
                  {/* Title */}
                  <TableCell className="px-4 py-3.5">
                    <div>
                      <span
                        className="font-semibold text-foreground hover:text-primary cursor-pointer block truncate max-w-md"
                        onClick={() => {
                          setDetailPost(post);
                          setDetailsOpen(true);
                        }}
                      >
                        {post.title}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        /blog/{post.slug}
                      </span>
                    </div>
                  </TableCell>

                  {/* Tags */}
                  <TableCell className="px-4 py-3.5">
                    <div className="flex items-center gap-1 flex-wrap">
                      {post.tags.slice(0, 3).map((t: string) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-foreground border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  {/* Read Time */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      {post.readingTimeMinutes || 5} min read
                    </span>
                  </TableCell>

                  {/* Published Date */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap">
                    <span className="text-xs font-mono text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </span>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        post.isPublished
                          ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setDetailPost(post);
                          setDetailsOpen(true);
                        }}
                        className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-primary cursor-pointer"
                        title="Read / Preview Article"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="p-1.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id, post.title)}
                        className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          page={page}
          limit={limit}
          total={postsResponse?.pagination?.total || posts.length}
          totalPages={postsResponse?.pagination?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>

      {/* Write / Edit Article Dialog Form with ScrollArea */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border text-foreground p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="p-6 pb-3 border-b border-border">
            <DialogTitle className="text-base font-bold text-foreground">
              {editingPost ? "Edit Technical Article" : "Write Engineering Article"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Compose markdown insights to demonstrate architectural depth and technical leadership.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ScrollArea className="max-h-[68vh] p-6 space-y-4">
              <div className="space-y-4 pr-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Article Title *</label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    placeholder="e.g. Scaling Distributed State in Next.js Server Components"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  {errors.title && (
                    <span className="text-[10px] text-destructive">{errors.title.message}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Slug (URL)</label>
                    <input
                      type="text"
                      {...register("slug")}
                      placeholder="auto-generated-from-title"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Read Time (minutes)</label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      {...register("readingTimeMinutes", { valueAsNumber: true })}
                      placeholder="6"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Summary / Excerpt *</label>
                  <textarea
                    {...register("excerpt", { required: "Excerpt is required" })}
                    placeholder="Short 2-sentence summary for search engines and social cards..."
                    rows={2}
                    className="w-full bg-background border border-border rounded-lg p-3 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                  />
                  {errors.excerpt && (
                    <span className="text-[10px] text-destructive">{errors.excerpt.message}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Tags (comma-separated)</label>
                  <input
                    type="text"
                    {...register("tags")}
                    placeholder="Architecture, Next.js, Redis, Microservices"
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Cover Image URL</label>
                  <input
                    type="url"
                    {...register("coverImageUrl")}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
                  />
                </div>

                {/* Markdown Body */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Article Content (Markdown) *</label>
                  <textarea
                    {...register("content", { required: "Content is required" })}
                    placeholder="## Introduction&#10;&#10;In this article we examine..."
                    rows={8}
                    className="w-full bg-background border border-border rounded-lg p-3 text-xs text-foreground focus:outline-none focus:border-primary font-mono resize-y"
                  />
                  {errors.content && (
                    <span className="text-[10px] text-destructive">{errors.content.message}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isPublishedPost"
                    {...register("isPublished")}
                    className="w-4 h-4 rounded bg-background border-border text-primary focus:ring-0"
                  />
                  <label htmlFor="isPublishedPost" className="text-xs text-foreground cursor-pointer">
                    Publish immediately (make visible on public engineering blog)
                  </label>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="p-4 px-6 border-t border-border bg-muted/40 flex items-center justify-end gap-2">
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
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/20 cursor-pointer"
              >
                {editingPost ? "Save Changes" : "Publish Article"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Article Reader / Details Sheet with ScrollArea */}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full max-w-xl! bg-background border-l border-border text-foreground p-0 flex flex-col h-full shadow-2xl"
        >
          {detailPost && (
            <>
              {/* Top Header Bar */}
              <SheetHeader className="px-6 py-4 border-b border-border/80 flex flex-row items-center justify-between shrink-0 bg-card/40 space-y-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  <SheetTitle className="text-xs font-semibold text-foreground tracking-normal m-0 p-0">
                    Article Preview
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Article preview and editorial analytics for {detailPost.title}
                  </SheetDescription>
                </div>
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </SheetHeader>

              {/* Scrollable Body */}
              <ScrollArea className="flex-1 px-6 py-5 overflow-y-auto">
                <div className="space-y-6 pb-6">
                  {/* Visual Cover Banner & Identity */}
                  <div className="rounded-xl overflow-hidden border border-border bg-card">
                    {detailPost.coverImageUrl ? (
                      <div className="w-full aspect-video sm:aspect-21/9 bg-muted border-b border-border overflow-hidden">
                        <img
                          src={detailPost.coverImageUrl}
                          alt={detailPost.title}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    ) : null}

                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold border ${
                            detailPost.isPublished
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {detailPost.isPublished ? "Published Live" : "Draft Mode"}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                          {detailPost.readingTimeMinutes || 5} min read
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-foreground tracking-tight">
                        {detailPost.title}
                      </h2>
                      <p className="text-xs text-muted-foreground font-mono">
                        /blog/{detailPost.slug}
                      </p>

                      {detailPost.canonicalUrl && (
                        <div className="pt-1">
                          <a
                            href={detailPost.canonicalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1 font-mono"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            <span>Canonical Source</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Publication & Readership Stats */}
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      Article Metrics & Performance
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Eye className="w-3.5 h-3.5 text-primary" />
                          <span>Total Views</span>
                        </div>
                        <span className="text-base font-bold text-foreground font-mono block">
                          {detailPost.viewsCount || 0}
                        </span>
                      </div>

                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Heart className="w-3.5 h-3.5 text-rose-500" />
                          <span>Likes / Claps</span>
                        </div>
                        <span className="text-base font-bold text-foreground font-mono block">
                          {detailPost.likesCount || 0}
                        </span>
                      </div>

                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>Read Time</span>
                        </div>
                        <span className="text-base font-bold text-foreground font-mono block">
                          {detailPost.readingTimeMinutes || 5} min
                        </span>
                      </div>

                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Published</span>
                        </div>
                        <span className="text-xs font-medium text-foreground font-mono block truncate">
                          {formatDate(detailPost.publishedAt || detailPost.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Executive Excerpt */}
                  {detailPost.excerpt && (
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        Executive Abstract
                      </h3>
                      <div className="bg-card border border-border rounded-xl p-4">
                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                          "{detailPost.excerpt}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Topics & Tags */}
                  {detailPost.tags && detailPost.tags.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-primary" />
                        Topics & Tags
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {detailPost.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-card text-foreground border border-border"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full Article Content */}
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      Article Body (Markdown Preview)
                    </h3>
                    <div className="bg-card border border-border rounded-xl p-4">
                      <div className="text-xs font-mono leading-relaxed text-foreground whitespace-pre-wrap bg-background p-3.5 rounded-lg border border-border max-h-80 overflow-y-auto">
                        {detailPost.content}
                      </div>
                    </div>
                  </div>

                  {/* Metadata Audit */}
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-muted-foreground" />
                      Publication Audit
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <span className="text-[11px] text-muted-foreground block">Created</span>
                        <span className="text-xs font-medium text-foreground font-mono block truncate">
                          {formatDate(detailPost.createdAt)}
                        </span>
                      </div>
                      <div className="bg-card border border-border rounded-xl p-3 space-y-1">
                        <span className="text-[11px] text-muted-foreground block">Last Updated</span>
                        <span className="text-xs font-medium text-foreground font-mono block truncate">
                          {formatDate(detailPost.updatedAt || detailPost.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Fixed Bottom Footer Bar */}
              <SheetFooter className="px-6 py-3.5 border-t border-border bg-card/60 flex flex-row items-center justify-end gap-2 shrink-0 mt-auto sm:justify-end">
                <button
                  onClick={() => setDetailsOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setDetailsOpen(false);
                    handleOpenEdit(detailPost);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Article</span>
                </button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

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
        title="Delete Article"
        description={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete Article"
        isLoading={deleteMutation.isPending}
        variant="destructive"
      />
    </div>
  );
}
