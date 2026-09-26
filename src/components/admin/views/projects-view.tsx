"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useAdminProjects,
  useToggleFeaturedProject,
  useDeleteProject,
  useUpdateProject,
  useTogglePublishedProject,
  useReorderProjects,
} from "@/hooks";
import { IProject } from "@/interfaces";
import {
  Search,
  Plus,
  ExternalLink,
  MoreHorizontal,
  Trash2,
  Edit,
  FolderGit2,
  Star,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Eye,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Sparkline } from "@/components/ui/sparkline";
import { SegmentedMeter } from "@/components/ui/segmented-meter";
import { PillFilter } from "@/components/ui/pill-filter";
import { ProjectEditorDialog } from "@/components/admin";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { formatMonthYear } from "@/lib/date.utils";
import { Input } from "@/components/ui/input";

export function ProjectsView() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("order");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Editor Dialog state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [togglePublishedTarget, setTogglePublishedTarget] =
    useState<IProject | null>(null);

  const {
    data: projectsResponse,
    isLoading,
    refetch,
    isRefetching,
  } = useAdminProjects();

  const toggleFeaturedMutation = useToggleFeaturedProject();
  const togglePublishedMutation = useTogglePublishedProject();
  const deleteProjectMutation = useDeleteProject();
  const reorderMutation = useReorderProjects();

  const handleMove = (projId: string, direction: "up" | "down") => {
    const list = [...sortedProjects];
    const currentIndex = list.findIndex((p) => p._id === projId);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[currentIndex];
    list[currentIndex] = list[targetIndex];
    list[targetIndex] = temp;

    const orders = list.map((item, idx) => ({
      id: item._id,
      order: idx + 1,
    }));

    if (sortBy !== "order") {
      setSortBy("order");
    }

    reorderMutation.mutate(orders);
  };

  const allProjects: IProject[] = projectsResponse?.data || [];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p: IProject) => {
      if (search) {
        const q = search.toLowerCase();
        const matchTitle = p.title?.toLowerCase().includes(q);
        const matchSummary = p.summary?.toLowerCase().includes(q);
        const matchTech = p.technologies?.some((t) =>
          t.toLowerCase().includes(q),
        );
        if (!matchTitle && !matchSummary && !matchTech) return false;
      }
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus === "published" && !p.isPublished) return false;
      if (selectedStatus === "draft" && p.isPublished) return false;
      if (featuredFilter === "featured" && !p.isFeatured) return false;
      return true;
    });
  }, [allProjects, search, selectedCategory, selectedStatus, featuredFilter]);

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (sortBy === "order") {
        return (a.order ?? 0) - (b.order ?? 0);
      }
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "featured") {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      return 0;
    });
  }, [filteredProjects, sortBy]);

  const totalFiltered = sortedProjects.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / limit));
  const paginatedProjects = sortedProjects.slice(
    (page - 1) * limit,
    page * limit,
  );

  const handleOpenNew = () => {
    setEditingProject(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (project: IProject) => {
    setEditingProject(project);
    setIsEditorOpen(true);
  };

  const handleOpenDetails = (project: IProject) => {
    router.push(`/admin/projects/${project._id}`);
  };

  const handleDelete = (id: string, title: string) => {
    setDeleteTarget({ id, title });
  };

  const handleToggleFeatured = (project: IProject) => {
    toggleFeaturedMutation.mutate(project._id);
  };

  const handleTogglePublished = (project: IProject) => {
    setTogglePublishedTarget(project);
  };

  const totalProjects = allProjects.length;
  const publishedCount = allProjects.filter(
    (p: IProject) => p.isPublished,
  ).length;
  const featuredCount = allProjects.filter(
    (p: IProject) => p.isFeatured,
  ).length;

  return (
    <div className="space-y-4 pb-12">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Showcase Projects Grid
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-muted text-muted-foreground border border-border">
              {totalProjects} records
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage high-authority engineering case studies, live demos, and
            interactive metrics.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title="Refresh records"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin text-primary" : ""}`}
            />
          </button>
          <button
            onClick={handleOpenNew}
            className="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Showcase Project</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Total Projects</span>
          <span className="font-mono font-bold text-foreground text-sm">
            {totalProjects}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Live Published</span>
          <span className="font-mono font-bold text-emerald-500 dark:text-emerald-400 text-sm">
            {publishedCount}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Featured Stars</span>
          <span className="font-mono font-bold text-amber-500 dark:text-amber-400 text-sm">
            {featuredCount}
          </span>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Drafts</span>
          <span className="font-mono font-bold text-muted-foreground text-sm">
            {totalProjects - publishedCount}
          </span>
        </div>
      </div>

      {/* Control Bar: Filter Pills, Search & Sort */}
      <div className="bg-card border border-border rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Search input */}
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter projects by title, stack, keyword..."
            className="pl-8 pr-8 text-xs h-8"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-sm hover:bg-muted transition-colors cursor-pointer z-10"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Tokenized Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <PillFilter
            label="Category"
            value={selectedCategory}
            options={[
              { label: "All Categories", value: "all" },
              { label: "Full-Stack", value: "Full-Stack" },
              { label: "Frontend", value: "Frontend" },
              { label: "Backend", value: "Backend" },
              { label: "Mobile", value: "Mobile" },
              { label: "DevOps", value: "DevOps" },
              { label: "AI/ML", value: "AI/ML" },
              { label: "System Design", value: "System Design" },
            ]}
            onChange={(val) => {
              setSelectedCategory(val);
              setPage(1);
            }}
          />

          <PillFilter
            label="Status"
            value={selectedStatus}
            options={[
              { label: "All Status", value: "all" },
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
            ]}
            onChange={(val) => {
              setSelectedStatus(val);
              setPage(1);
            }}
          />

          <PillFilter
            label="Featured"
            value={featuredFilter}
            options={[
              { label: "All", value: "all" },
              { label: "Star Featured", value: "featured" },
            ]}
            onChange={(val) => {
              setFeaturedFilter(val);
              setPage(1);
            }}
          />

          <PillFilter
            label="Sort"
            value={sortBy}
            options={[
              { label: "Display Order", value: "order" },
              { label: "Newest First", value: "newest" },
              { label: "Featured First", value: "featured" },
            ]}
            onChange={setSortBy}
          />
        </div>
      </div>

      {/* High-Density Data Grid Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table className="w-full text-left border-collapse">
          <TableHeader className="border-b border-border bg-muted/50">
            <TableRow className="border-b border-border hover:bg-transparent text-[11px] font-semibold text-muted-foreground uppercase tracking-wider select-none">
              <TableHead className="w-16 px-3.5 py-3 text-center text-muted-foreground">
                Order
              </TableHead>
              <TableHead className="px-3.5 py-3 text-muted-foreground">
                Project & Case Study
              </TableHead>
              <TableHead className="px-3.5 py-3 text-muted-foreground">
                Domain
              </TableHead>
              <TableHead className="px-3.5 py-3 text-muted-foreground">
                Tech Stack
              </TableHead>
              <TableHead className="px-3.5 py-3 text-muted-foreground">
                Impact Metrics
              </TableHead>
              <TableHead className="px-3.5 py-3 text-muted-foreground">
                Readiness
              </TableHead>
              <TableHead className="px-3.5 py-3 text-center text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-3.5 py-3 text-right text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-border text-xs">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow
                  key={i}
                  className="animate-pulse border-b border-border"
                >
                  <TableCell className="px-3.5 py-4 text-center">
                    <Skeleton className="w-8 h-4 mx-auto bg-muted" />
                  </TableCell>
                  <TableCell className="px-3.5 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-lg bg-muted" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-3.5 w-48 bg-muted" />
                        <Skeleton className="h-2.5 w-28 bg-muted" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-3.5 py-4">
                    <Skeleton className="h-4 w-20 bg-muted" />
                  </TableCell>
                  <TableCell className="px-3.5 py-4">
                    <Skeleton className="h-4 w-32 bg-muted" />
                  </TableCell>
                  <TableCell className="px-3.5 py-4">
                    <Skeleton className="h-4 w-24 bg-muted" />
                  </TableCell>
                  <TableCell className="px-3.5 py-4">
                    <Skeleton className="h-3 w-28 bg-muted" />
                  </TableCell>
                  <TableCell className="px-3.5 py-4">
                    <Skeleton className="h-4 w-16 mx-auto bg-muted" />
                  </TableCell>
                  <TableCell className="px-3.5 py-4">
                    <Skeleton className="h-6 w-16 ml-auto bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedProjects.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={8} className="py-16 text-center">
                  <FolderGit2 className="w-10 h-10 text-muted-foreground mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-semibold text-foreground">
                    No showcase projects match your filters
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    Try clearing your search query or add a new project to start
                    populating your portfolio.
                  </p>
                  <button
                    onClick={handleOpenNew}
                    className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Project</span>
                  </button>
                </TableCell>
              </TableRow>
            ) : (
              paginatedProjects.map((proj: IProject) => {
                return (
                  <TableRow
                    key={proj._id}
                    className="hover:bg-muted/40 transition-colors group border-b border-border"
                  >

                    {/* Order / Reorder buttons */}
                    <TableCell className="px-2 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-mono text-[11px] text-muted-foreground font-semibold min-w-5 text-center">
                          #{proj.order ?? (sortedProjects.findIndex((p) => p._id === proj._id) + 1)}
                        </span>
                        <div className="flex flex-col -space-y-0.5">
                          <button
                            type="button"
                            onClick={() => handleMove(proj._id, "up")}
                            disabled={
                              sortedProjects.findIndex((p) => p._id === proj._id) === 0 ||
                              reorderMutation.isPending
                            }
                            className="p-0.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:pointer-events-none cursor-pointer transition-colors"
                            title="Move Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(proj._id, "down")}
                            disabled={
                              sortedProjects.findIndex((p) => p._id === proj._id) ===
                                sortedProjects.length - 1 || reorderMutation.isPending
                            }
                            className="p-0.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:pointer-events-none cursor-pointer transition-colors"
                            title="Move Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </TableCell>

                    {/* Title & Details */}
                    <TableCell className="px-3.5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-lg bg-muted border border-border overflow-hidden shrink-0 relative group cursor-pointer"
                          onClick={() => handleOpenDetails(proj)}
                        >
                          {proj.thumbnailUrl ? (
                            <Image
                              src={proj.thumbnailUrl}
                              alt={proj.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="44px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <FolderGit2 className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="font-semibold text-foreground truncate hover:text-primary cursor-pointer"
                              onClick={() => handleOpenDetails(proj)}
                            >
                              {proj.title}
                            </span>
                            {proj.isFeatured && (
                              <button
                                onClick={() => handleToggleFeatured(proj)}
                                title="Featured on Portfolio Homepage"
                                className="text-amber-500 dark:text-amber-400 hover:text-amber-300 cursor-pointer"
                              >
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-muted-foreground">
                              /{proj.slug}
                            </span>
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-primary"
                                title="Open Live Site"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-foreground"
                                title="GitHub Source"
                              >
                                <GithubIcon className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Domain Category */}
                    <TableCell className="px-3.5 py-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-muted text-foreground border border-border">
                        {proj.category}
                      </span>
                    </TableCell>

                    {/* Stack Matrix */}
                    <TableCell className="px-3.5 py-3.5 max-w-[200px]">
                      <div className="flex items-center gap-1 flex-wrap">
                        {proj.technologies.slice(0, 3).map((tech: string) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                        {proj.technologies.length > 3 && (
                          <span className="text-[10px] text-muted-foreground font-mono">
                            +{proj.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Impact Metrics Sparkline */}
                    <TableCell className="px-3.5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Sparkline
                          data={[12, 19, 15, 27, 32, 45, 52]}
                          width={44}
                          height={14}
                          color="indigo"
                        />
                        <div className="text-[11px] font-mono">
                          {proj.metrics && proj.metrics.length > 0 ? (
                            <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
                              {proj.metrics[0].value}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">
                              10k req/s
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* Readiness Meter */}
                    <TableCell className="px-3.5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <SegmentedMeter
                          value={proj.isPublished ? 100 : 75}
                          totalSegments={5}
                          className="w-16"
                        />
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {proj.isPublished ? "100%" : "75%"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Status Pill */}
                    <TableCell className="px-3.5 py-3.5 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublished(proj)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors cursor-pointer ${
                          proj.isPublished
                            ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            proj.isPublished ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        <span>{proj.isPublished ? "Published" : "Draft"}</span>
                      </button>
                    </TableCell>

                    {/* Context Action Menu */}
                    <TableCell className="px-3.5 py-3.5 text-right whitespace-nowrap">
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
                            onClick={() => handleOpenDetails(proj)}
                            className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                          >
                            <Eye className="w-3 h-3 mr-2 text-muted-foreground" />{" "}
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(proj)}
                            className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                          >
                            <Edit className="w-3 h-3 mr-2 text-muted-foreground" />{" "}
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              window.open(`/projects/${proj.slug}`, "_blank")
                            }
                            className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                          >
                            <ExternalLink className="w-3 h-3 mr-2 text-muted-foreground" />{" "}
                            View Public Page
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-border my-1" />

                          <DropdownMenuItem
                            onClick={() => handleToggleFeatured(proj)}
                            className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                          >
                            <Star className="w-3 h-3 mr-2 text-amber-500 dark:text-amber-400" />
                            {proj.isFeatured
                              ? "Unstar Highlight"
                              : "Feature on Homepage"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleTogglePublished(proj)}
                            className="text-[11px] py-1.5 px-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
                          >
                            {proj.isPublished ? (
                              <XCircle className="w-3 h-3 mr-2 text-amber-500 dark:text-amber-400" />
                            ) : (
                              <CheckCircle2 className="w-3 h-3 mr-2 text-emerald-500 dark:text-emerald-400" />
                            )}
                            {proj.isPublished ? "Set to Draft" : "Publish Live"}
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-border my-1" />

                          <DropdownMenuItem
                            onClick={() => handleDelete(proj._id, proj.title)}
                            className="text-[11px] py-1.5 px-2 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                          >
                            <Trash2 className="w-3 h-3 mr-2" /> Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          page={page}
          limit={limit}
          total={totalFiltered}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Project Editor Dialog Form with ScrollArea */}
      <ProjectEditorDialog
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        project={editingProject}
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
            deleteProjectMutation.mutate(deleteTarget.id, {
              onSuccess: () => setDeleteTarget(null),
            });
          }
        }}
        title="Delete Project"
        description={`Are you sure you want to delete the project "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete Project"
        isLoading={deleteProjectMutation.isPending}
        variant="destructive"
      />

      {/* Toggle Published Confirmation Modal */}
      <ConfirmationModal
        open={!!togglePublishedTarget}
        onOpenChange={(open) => !open && setTogglePublishedTarget(null)}
        onConfirm={() => {
          if (togglePublishedTarget) {
            togglePublishedMutation.mutate(togglePublishedTarget._id, {
              onSuccess: () => setTogglePublishedTarget(null),
            });
          }
        }}
        title={
          togglePublishedTarget?.isPublished
            ? "Unpublish Project"
            : "Publish Project"
        }
        description={`Are you sure you want to ${
          togglePublishedTarget?.isPublished
            ? "unpublish and set this project to draft"
            : "publish this showcase project live"
        }?`}
        confirmText={
          togglePublishedTarget?.isPublished ? "Set to Draft" : "Publish Live"
        }
        isLoading={togglePublishedMutation.isPending}
        variant={togglePublishedTarget?.isPublished ? "destructive" : "default"}
      />
    </div>
  );
}
