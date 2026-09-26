"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePosts } from "@/hooks";
import { IPost } from "@/interfaces";
import {
  Search,
  X,
  ChevronRight,
  FileText,
} from "lucide-react";
import { ChromeSparkleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function BlogCatalogView() {
  const { data: postsRes, isLoading } = usePosts();
  const posts: IPost[] = postsRes?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p: IPost) => {
      p.tags?.forEach((t: string) => set.add(t));
    });
    return ["all", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post: IPost) => {
      const matchesTag =
        selectedTag === "all" ||
        post.tags?.some((t: string) => t.toLowerCase() === selectedTag.toLowerCase());

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q) ||
        post.tags?.some((t: string) => t.toLowerCase().includes(q));

      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 space-y-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & SEARCH / FILTER
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <ChromeSparkleIcon className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Engineering Insights & Writing
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Architectural Thoughts.
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              In-depth articles covering distributed systems, Next.js optimization, design engineering, and cloud patterns.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & tags..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground hover:text-foreground rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-border/60 pb-4">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all cursor-pointer",
                selectedTag === tag
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {tag === "all" ? "All Topics" : `#${tag}`}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ARTICLES LIST
      ───────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-card border border-border animate-pulse" />
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-3">
          {filteredPosts.map((post: IPost) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group p-6 sm:p-8 rounded-3xl bg-card/60 dark:bg-card/40 hover:bg-card border border-border/80 hover:border-primary/50 transition-all duration-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                  <span>
                    {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span className="text-primary font-semibold uppercase">{post.tags?.[0] || "Engineering"}</span>
                  {post.readingTimeMinutes && (
                    <>
                      <span>•</span>
                      <span>{post.readingTimeMinutes} min read</span>
                    </>
                  )}
                </div>

                <h3 className="text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-mono text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors shrink-0 self-start sm:self-center">
                <span>Read Full Post</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-card border border-border space-y-3">
          <FileText className="w-8 h-8 text-muted-foreground mx-auto" />
          <p className="text-sm font-semibold text-foreground">No matching articles found</p>
          <p className="text-xs text-muted-foreground">
            Try searching for a different keyword or topic tag.
          </p>
        </div>
      )}
    </div>
  );
}
