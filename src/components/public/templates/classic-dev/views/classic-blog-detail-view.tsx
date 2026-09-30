"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ClassicBlogDetailViewProps {
  bundle: IPublicPortfolioBundle;
  subSlug?: string;
}

export function ClassicBlogDetailView({
  bundle,
  subSlug,
}: ClassicBlogDetailViewProps) {
  const { portfolio, profile, posts } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const headline = profile?.headline || "Full-Stack Engineer & Systems Architect";

  const selectedPost = subSlug
    ? posts.find((p) => p.slug === subSlug || p._id === subSlug) || posts[0]
    : posts[0];

  if (!selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <Link href={`/${portfolio.slug}/blog`} className="text-primary hover:underline text-sm">
          &larr; Return to All Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Top Navigation & Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4">
        <Link
          href={`/${portfolio.slug}/blog`}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Articles</span>
          <span className="text-border">/</span>
          <span className="text-foreground">{selectedPost.title}</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Article link copied to clipboard!");
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground border border-border transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Article</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-primary/10 text-primary border border-primary/20">
            {selectedPost.tags?.[0] || "Architecture"}
          </span>
          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {selectedPost.readingTimeMinutes || 5} min read
          </span>
          {selectedPost.publishedAt && (
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(selectedPost.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
          {selectedPost.title}
        </h1>

        {selectedPost.excerpt && (
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {selectedPost.excerpt}
          </p>
        )}

        {/* Author Byline */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border">
          {profile?.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={fullName}
              className="w-11 h-11 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              {firstName.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="text-xs font-bold text-foreground">{fullName}</h4>
            <p className="text-[11px] text-muted-foreground">{headline}</p>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {selectedPost.coverImageUrl && (
        <div className="rounded-3xl overflow-hidden border border-border shadow-xl">
          <img
            src={selectedPost.coverImageUrl}
            alt={selectedPost.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border space-y-6">
        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-foreground/90">
          <p className="whitespace-pre-line leading-relaxed">
            {selectedPost.content}
          </p>
        </div>

        {/* Tags */}
        {selectedPost.tags && selectedPost.tags.length > 0 && (
          <div className="pt-8 border-t border-border/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground mr-1">Topics:</span>
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-muted text-foreground text-xs font-mono border border-border/40"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Articles */}
      {posts.filter((p) => p._id !== selectedPost._id).length > 0 && (
        <div className="space-y-6 pt-8 border-t border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">Continue Reading</h3>
            <Link
              href={`/${portfolio.slug}/blog`}
              className="text-xs font-mono text-primary hover:underline"
            >
              All Articles &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts
              .filter((p) => p._id !== selectedPost._id)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p._id}
                  href={`/${portfolio.slug}/blog/${p.slug || p._id}`}
                  className="group block p-6 rounded-3xl bg-card border border-border hover:border-primary/40 transition-all shadow-xs hover:shadow-md"
                >
                  <span className="text-[10px] font-mono text-primary uppercase">
                    {p.tags?.[0] || "Article"}
                  </span>
                  <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mt-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">
                    {p.excerpt || p.content.slice(0, 100)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
