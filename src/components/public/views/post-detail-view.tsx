"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePostBySlug, useProfile } from "@/hooks";
import {
  ArrowLeft,
  Share2,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export function PostDetailView({ slug }: { slug: string }) {
  const { data: post, isLoading, error } = usePostBySlug(slug);
  const { data: profile } = useProfile();

  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`.trim()
    : "Developer";
  const avatarUrl = profile?.avatarUrl || "";

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const shareData = {
      title: post?.title || "Article",
      text: post?.excerpt || post?.title || "Check out this article",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          // Fallback to clipboard if share failed
          try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Article URL copied to clipboard!");
          } catch {
            // Ignore
          }
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Article URL copied to clipboard!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-24 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-muted rounded-full" />
        <div className="h-12 w-full bg-muted rounded-2xl" />
        <div className="h-64 w-full bg-muted rounded-3xl" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-36 pb-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto text-muted-foreground">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Article Not Found</h1>
        <p className="text-xs text-muted-foreground">
          The requested engineering article could not be found or has been unpublished.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-24 space-y-10">
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMBS & ARTICLE HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold">
              {post.tags?.[0] || "Architecture"}
            </span>
            <span>•</span>
            <span>
              {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {post.readingTimeMinutes && (
              <>
                <span>•</span>
                <span>{post.readingTimeMinutes} min read</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Author Card & Share */}
          <div className="flex items-center justify-between pt-4 border-t border-border/80">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 rounded-full border border-border">
                <AvatarImage src={avatarUrl} alt={fullName} />
                <AvatarFallback className="font-bold text-xs bg-primary/15 text-primary">
                  {fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-bold text-foreground">{fullName}</p>
                <p className="text-[11px] text-muted-foreground font-mono">Author</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95"
              title="Share Article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. COVER IMAGE (IF AVAILABLE)
      ───────────────────────────────────────────────────────────── */}
      {post.coverImageUrl && (
        <div className="relative aspect-[16/9] w-full rounded-3xl border border-border overflow-hidden shadow-xl">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. ARTICLE MARKDOWN CONTENT
      ───────────────────────────────────────────────────────────── */}
      <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-foreground/90 leading-relaxed whitespace-pre-line space-y-4 font-sans">
        {post.content}
      </article>

      {/* ─────────────────────────────────────────────────────────────
          4. TAGS & FOOTER
      ───────────────────────────────────────────────────────────── */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-6 border-t border-border space-y-2">
          <p className="text-xs font-mono text-muted-foreground">Article Tags:</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-muted border border-border text-xs font-mono text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Next Step CTA */}
      <div className="p-8 rounded-3xl bg-card border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-xs font-bold text-foreground">Enjoyed this technical breakdown?</p>
          <p className="text-[11px] text-muted-foreground">Feel free to reach out to discuss system architecture.</p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shrink-0"
        >
          <span>Get in touch ↗</span>
        </Link>
      </div>
    </div>
  );
}
