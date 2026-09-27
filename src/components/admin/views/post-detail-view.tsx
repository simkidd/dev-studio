"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  usePostById,
  useUpdatePost,
  useDeletePost,
  useTogglePublishedPost,
} from "@/hooks";
import {
  FileText,
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  Trash2,
  RefreshCw,
  Eye,
  Heart,
  Globe,
  Tag,
  Copy,
  Check,
  Layers,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { PostEditorDialog } from "@/components/admin";
import { formatDate } from "@/lib/date.utils";
import { toast } from "sonner";

export interface PostDetailViewProps {
  id: string;
}

export function PostDetailView({ id }: PostDetailViewProps) {
  const router = useRouter();
  const { data: post, isLoading, refetch, isRefetching } = usePostById(id);
  const updateMutation = useUpdatePost();
  const deleteMutation = useDeletePost();
  const togglePublishedMutation = useTogglePublishedPost();

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTogglePublishedOpen, setIsTogglePublishedOpen] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);

  const handleTogglePublished = () => {
    if (!post) return;
    togglePublishedMutation.mutate(
      { id: post._id, isPublished: !post.isPublished },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const copySlugToClipboard = () => {
    if (!post) return;
    navigator.clipboard.writeText(`/blog/${post.slug}`);
    setCopiedSlug(true);
    toast.success("Blog URL path copied to clipboard");
    setTimeout(() => setCopiedSlug(false), 2000);
  };

  const copyMarkdownToClipboard = () => {
    if (!post?.content) return;
    navigator.clipboard.writeText(post.content);
    setCopiedContent(true);
    toast.success("Markdown content copied to clipboard");
    setTimeout(() => setCopiedContent(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 pb-6">
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

  if (!post) {
    return (
      <div className="py-20 text-center bg-card border border-border rounded-xl max-w-lg mx-auto">
        <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-60" />
        <h2 className="text-base font-bold text-foreground">Article Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          The requested engineering article could not be found or has been removed.
        </p>
        <button
          onClick={() => router.push("/admin/posts")}
          className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles List</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/admin/posts"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Articles List</span>
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-foreground border border-border">
              {post.readingTimeMinutes || 5} min read
            </span>
            <span className="text-muted-foreground text-xs">/</span>
            <h1 className="text-xl font-bold text-foreground tracking-tight truncate max-w-sm sm:max-w-md">
              {post.title}
            </h1>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage article editorial, publication status, markdown insights, and SEO metadata.
          </p>
        </div>

        {/* Header Action Buttons */}
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
            onClick={() => setIsTogglePublishedOpen(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              post.isPublished
                ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                : "bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                post.isPublished ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span>{post.isPublished ? "Published (Live)" : "Draft (Hidden)"}</span>
          </button>

          <button
            onClick={() => setIsEditDialogOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-lg shadow-primary/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Article</span>
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="p-2 rounded-lg border border-destructive/20 bg-destructive/10 hover:bg-destructive/20 text-xs font-medium text-destructive transition-colors cursor-pointer"
            title="Delete article"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Total Views</span>
          <span className="font-mono font-bold text-foreground text-sm flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-primary" />
            {post.viewsCount || 0}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Likes & Claps</span>
          <span className="font-mono font-bold text-rose-500 text-sm flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            {post.likesCount || 0}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Estimated Read</span>
          <span className="font-mono font-bold text-amber-500 dark:text-amber-400 text-sm flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTimeMinutes || 5} min
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Published Date</span>
          <span className="font-mono font-bold text-foreground text-xs truncate">
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
        </div>
      </div>

      {/* Main Content Layout (7 cols Left / 5 cols Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Cover Media & Full Markdown Article */}
        <div className="lg:col-span-7 space-y-4">
          {/* Cover Banner & Identity Card */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
            {post.coverImageUrl && (
              <div className="relative w-full aspect-video sm:aspect-21/9 bg-muted border-b border-border overflow-hidden">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 700px"
                  priority
                />
              </div>
            )}

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                      post.isPublished
                        ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {post.isPublished ? "Live Published" : "Draft Mode"}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                    {post.readingTimeMinutes || 5} min read
                  </span>
                </div>

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
                  <span>/blog/{post.slug}</span>
                </button>
              </div>

              <h2 className="text-xl font-bold text-foreground tracking-tight">
                {post.title}
              </h2>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Abstract / Excerpt Card */}
          {post.excerpt && (
            <div className="bg-card border border-border rounded-xl p-5 space-y-2 shadow-xs">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>Executive Summary / Abstract</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                "{post.excerpt}"
              </p>
            </div>
          )}

          {/* Full Markdown Article Content */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-border flex items-center justify-between bg-muted/40">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Article Body (Markdown)
                </h3>
              </div>
              <button
                type="button"
                onClick={copyMarkdownToClipboard}
                className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium transition-colors cursor-pointer"
              >
                {copiedContent ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copiedContent ? "Copied" : "Copy Markdown"}</span>
              </button>
            </div>

            <div className="p-5">
              <div className="text-xs font-mono leading-relaxed text-foreground whitespace-pre-wrap bg-background p-4 rounded-lg border border-border max-h-[500px] overflow-y-auto">
                {post.content}
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Publishing Specs, SEO Card & Metadata Audit */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Publish Card */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span>Publication Status</span>
              </h3>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  post.isPublished ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-foreground">
                  {post.isPublished ? "Published (Public)" : "Draft (Hidden)"}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border">
                <span className="text-muted-foreground">URL Slug</span>
                <span className="font-mono text-xs text-primary truncate max-w-[180px]">
                  /blog/{post.slug}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border">
                <span className="text-muted-foreground">Estimated Read</span>
                <span className="font-mono text-xs text-foreground">
                  {post.readingTimeMinutes || 5} minutes
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setIsEditDialogOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Full Article</span>
              </button>
              <button
                onClick={() => setIsTogglePublishedOpen(true)}
                className="w-full py-2 px-3 rounded-lg border border-border bg-muted hover:bg-accent text-foreground text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {post.isPublished ? (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Unpublish (Move to Drafts)</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Publish Immediately</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SEO & Search Card Preview */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Search Engine SERP Preview</span>
            </h3>

            <div className="bg-background border border-border rounded-lg p-3.5 space-y-1">
              <div className="text-[11px] text-muted-foreground font-mono truncate">
                https://portfolio.dev/blog/{post.slug}
              </div>
              <h4 className="text-sm font-semibold text-primary truncate hover:underline cursor-pointer">
                {post.title} | Engineering Insights
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {post.excerpt || post.content.slice(0, 140)}...
              </p>
            </div>
          </div>

          {/* Audit Timestamps Card */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Publication History</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">First Created</span>
                <span className="font-mono text-foreground">{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-mono text-foreground">
                  {formatDate(post.updatedAt || post.createdAt)}
                </span>
              </div>
              {post.publishedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Published At</span>
                  <span className="font-mono text-emerald-500 dark:text-emerald-400">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Editor Dialog Form */}
      <PostEditorDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        post={post}
        onSaved={() => {
          refetch();
          setIsEditDialogOpen(false);
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={() => {
          deleteMutation.mutate(post._id, {
            onSuccess: () => {
              toast.success("Article deleted successfully");
              router.push("/admin/posts");
            },
          });
        }}
        title="Delete Article"
        description={`Are you sure you want to permanently delete "${post.title}"? This action cannot be undone.`}
        confirmText="Delete Article"
        isLoading={deleteMutation.isPending}
        variant="destructive"
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
          post.isPublished
            ? "Unpublish Article (Set to Draft)"
            : "Publish Article Live"
        }
        description={
          post.isPublished
            ? `Are you sure you want to unpublish "${post.title}"? It will be hidden from public blog readers.`
            : `Are you sure you want to publish "${post.title}" live? It will become publicly visible on your engineering blog.`
        }
        confirmText={post.isPublished ? "Set to Draft" : "Publish Live"}
        isLoading={togglePublishedMutation.isPending}
        variant={post.isPublished ? "warning" : "success"}
      />
    </div>
  );
}
