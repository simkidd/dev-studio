"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePosts, useDeletePost, useTogglePublishedPost } from "@/hooks";
import { IPost } from "@/interfaces";
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Search,
  RefreshCw,
  Clock,
  Eye,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { PillFilter } from "@/components/ui/pill-filter";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/date.utils";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PostEditorDialog } from "@/components/admin";

export function PostsView() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Editor dialog state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<IPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [togglePublishedTarget, setTogglePublishedTarget] =
    useState<IPost | null>(null);

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

  const deleteMutation = useDeletePost();
  const togglePublishedMutation = useTogglePublishedPost();
  const posts: IPost[] = postsResponse?.data || [];

  const handleOpenCreate = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (post: IPost) => {
    setEditingPost(post);
    setIsEditorOpen(true);
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
            Publish technical deep-dives, architectural post-mortems, and
            engineering authority posts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
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
            <span>Write Article</span>
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
            placeholder="Search posts by title or keyword..."
            className="pl-8 text-xs h-8"
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

      {/* Table Container */}
      <div className="border border-border rounded-xl bg-card overflow-hidden shadow-xs">
        <Table className="w-full text-left border-collapse">
          <TableHeader className="border-b border-border bg-muted/50">
            <TableRow className="border-b border-border hover:bg-transparent text-[11px] font-semibold text-muted-foreground uppercase tracking-wider select-none">
              <TableHead className="px-4 py-3 text-muted-foreground">
                Article Title & Slug
              </TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">
                Tags
              </TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">
                Read Time
              </TableHead>
              <TableHead className="px-4 py-3 text-muted-foreground">
                Published Date
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border text-xs">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow
                  key={i}
                  className="animate-pulse border-b border-border"
                >
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-48 bg-muted" />
                    <Skeleton className="h-3 w-28 bg-muted mt-1" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-20 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-16 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-20 bg-muted" />
                  </TableCell>
                  <TableCell className="px-4 py-4 text-center">
                    <Skeleton className="h-5 w-16 bg-muted mx-auto rounded-full" />
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right">
                    <Skeleton className="h-6 w-16 bg-muted ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : posts.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="py-16 text-center">
                  <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold text-foreground">
                    No articles created yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Share architectural learnings, code patterns, and tutorials.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post: IPost) => (
                <TableRow
                  key={post._id}
                  className="hover:bg-muted/40 transition-colors border-b border-border"
                >
                  {/* Title */}
                  <TableCell className="px-4 py-3.5">
                    <div>
                      <span
                        className="font-semibold text-foreground hover:text-primary cursor-pointer block truncate max-w-md"
                        onClick={() => router.push(`/admin/posts/${post._id}`)}
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
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          title="More Options"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-44 bg-popover border-border text-popover-foreground text-[11px] shadow-xl p-1"
                      >
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/posts/${post._id}`)
                          }
                          className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        >
                          <Eye className="w-3 h-3 mr-2 text-muted-foreground" />{" "}
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleOpenEdit(post)}
                          className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        >
                          <Edit className="w-3 h-3 mr-2 text-muted-foreground" />{" "}
                          Edit Article
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(`/blog/${post.slug}`, "_blank")
                          }
                          className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        >
                          <ExternalLink className="w-3 h-3 mr-2 text-muted-foreground" />{" "}
                          View Public Page
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-border my-1" />

                        <DropdownMenuItem
                          onClick={() => setTogglePublishedTarget(post)}
                          className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                        >
                          {post.isPublished ? (
                            <XCircle className="w-3 h-3 mr-2 text-amber-500 dark:text-amber-400" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3 mr-2 text-emerald-500 dark:text-emerald-400" />
                          )}
                          {post.isPublished ? "Set to Draft" : "Publish Live"}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-border my-1" />

                        <DropdownMenuItem
                          onClick={() => handleDelete(post._id, post.title)}
                          className="text-[11px] py-1.5 px-2 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                        >
                          <Trash2 className="w-3 h-3 mr-2" /> Delete Article
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      {/* Post Editor Dialog Form */}
      <PostEditorDialog
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        post={editingPost}
        onSaved={() => {
          refetch();
          setIsEditorOpen(false);
        }}
      />

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

      {/* Toggle Published Confirmation Modal */}
      <ConfirmationModal
        open={!!togglePublishedTarget}
        onOpenChange={(open) => !open && setTogglePublishedTarget(null)}
        onConfirm={() => {
          if (togglePublishedTarget) {
            togglePublishedMutation.mutate(
              {
                id: togglePublishedTarget._id,
                isPublished: !togglePublishedTarget.isPublished,
              },
              {
                onSuccess: () => setTogglePublishedTarget(null),
              },
            );
          }
        }}
        title={
          togglePublishedTarget?.isPublished
            ? "Unpublish Article (Set to Draft)"
            : "Publish Article Live"
        }
        description={
          togglePublishedTarget?.isPublished
            ? `Are you sure you want to unpublish "${togglePublishedTarget?.title || ""}"? It will be hidden from public blog readers.`
            : `Are you sure you want to publish "${togglePublishedTarget?.title || ""}" live? It will become publicly visible on your engineering blog.`
        }
        confirmText={
          togglePublishedTarget?.isPublished ? "Set to Draft" : "Publish Live"
        }
        isLoading={togglePublishedMutation.isPending}
        variant={togglePublishedTarget?.isPublished ? "warning" : "success"}
      />
    </div>
  );
}
