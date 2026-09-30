"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ApexBlogDetailViewProps {
  bundle: IPublicPortfolioBundle;
  subSlug?: string;
}

export function ApexBlogDetailView({
  bundle,
  subSlug,
}: ApexBlogDetailViewProps) {
  const { portfolio, profile, posts } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const selectedPost = subSlug
    ? posts.find((p) => p.slug === subSlug || p._id === subSlug) || posts[0]
    : posts[0];

  if (!selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center font-mono space-y-4">
        <h2 className="text-2xl font-bold uppercase">Essay Not Found</h2>
        <Link href={`/${portfolio.slug}/blog`} className="text-amber-600 dark:text-amber-400 hover:underline text-xs">
          &larr; Return to Essays
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 space-y-12">
      {/* Top Navigation & Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-white/10 pb-6">
        <Link
          href={`/${portfolio.slug}/blog`}
          className="text-xs font-mono text-stone-500 dark:text-white/50 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-2 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Essays Index</span>
          <span className="text-stone-300 dark:text-white/20">/</span>
          <span className="text-stone-900 dark:text-white">{selectedPost.title}</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Essay link copied!");
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-xs font-mono text-stone-700 dark:text-white/70 hover:text-amber-600 dark:hover:text-amber-400 border border-stone-200 dark:border-white/10 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Essay</span>
        </button>
      </div>

      {/* Editorial Essay Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
          <span className="uppercase tracking-widest">[ {selectedPost.tags?.[0] || "ESSAY"} ]</span>
          <span className="text-stone-300 dark:text-white/40">&bull;</span>
          <span className="text-stone-600 dark:text-white/60 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {selectedPost.readingTimeMinutes || 5} min read
          </span>
          {selectedPost.publishedAt && (
            <>
              <span className="text-stone-300 dark:text-white/40">&bull;</span>
              <span className="text-stone-600 dark:text-white/60 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(selectedPost.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </>
          )}
        </div>

        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight leading-tight text-stone-900 dark:text-white">
          {selectedPost.title}
        </h1>

        {selectedPost.excerpt && (
          <p className="text-lg sm:text-2xl text-stone-600 dark:text-white/70 font-light leading-relaxed">
            {selectedPost.excerpt}
          </p>
        )}

        {/* Author Signature */}
        <div className="flex items-center gap-4 pt-4 border-t border-stone-200 dark:border-white/10 text-xs font-mono">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
            {fullName.charAt(0)}
          </div>
          <div>
            <span className="text-stone-900 dark:text-white font-bold block">{fullName}</span>
            <span className="text-stone-500 dark:text-white/50 text-[11px]">Creative Technologist &amp; Principal</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {selectedPost.coverImageUrl && (
        <div className="rounded-3xl overflow-hidden border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-white/5 shadow-2xl">
          <img
            src={selectedPost.coverImageUrl}
            alt={selectedPost.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Essay Body */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-8 shadow-xs">
        <div className="prose dark:prose-invert max-w-none text-base sm:text-lg font-light leading-relaxed text-stone-700 dark:text-white/80 space-y-6">
          <p className="whitespace-pre-line leading-relaxed">
            {selectedPost.content}
          </p>
        </div>

        {/* Tags */}
        {selectedPost.tags && selectedPost.tags.length > 0 && (
          <div className="pt-8 border-t border-stone-200 dark:border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-stone-400 dark:text-white/40 mr-1">DISCIPLINES:</span>
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-stone-100 dark:bg-white/10 text-stone-900 dark:text-white text-xs font-mono border border-stone-200 dark:border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Next Essay Transition */}
      {posts.filter((p) => p._id !== selectedPost._id).length > 0 && (
        <div className="pt-12 border-t border-stone-200 dark:border-white/10">
          {posts
            .filter((p) => p._id !== selectedPost._id)
            .slice(0, 1)
            .map((nextPost) => (
              <Link
                key={nextPost._id}
                href={`/${portfolio.slug}/blog/${nextPost.slug || nextPost._id}`}
                className="group block p-10 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-amber-400/50 transition-all space-y-3 shadow-xs hover:shadow-md"
              >
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
                  NEXT ESSAY &rarr;
                </span>
                <h4 className="text-2xl sm:text-4xl font-bold uppercase text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {nextPost.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-white/60 font-light line-clamp-2">
                  {nextPost.excerpt || nextPost.content.slice(0, 120)}
                </p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
