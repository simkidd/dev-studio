"use client";

import React from "react";
import Link from "next/link";
import { usePosts } from "@/hooks";
import { IPost } from "@/interfaces";
import { ChevronRight, FileText } from "lucide-react";
import { ChromeSparkleIcon } from "@/components/ui/icons";

export function BlogCatalogView() {
  const { data: postsRes, isLoading } = usePosts();
  const posts: IPost[] = postsRes?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 space-y-12">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <ChromeSparkleIcon className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Engineering Insights & Writing
          </span>
        </div>

        <div className="space-y-2 max-w-2xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
            Architectural <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-500">
              Thoughts & Insights.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            In-depth articles covering distributed systems, Next.js optimization, design engineering, and cloud patterns.
          </p>
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
      ) : posts.length > 0 ? (
        <div className="space-y-3">
          {posts.map((post: IPost) => (
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
          <p className="text-sm font-semibold text-foreground">No articles published yet</p>
          <p className="text-xs text-muted-foreground">
            New engineering writeups and deep dives will appear here soon.
          </p>
        </div>
      )}
    </div>
  );
}
