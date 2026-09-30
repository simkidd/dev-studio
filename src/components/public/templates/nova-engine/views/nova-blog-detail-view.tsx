"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { toast } from "sonner";

interface NovaBlogDetailViewProps {
  bundle: IPublicPortfolioBundle;
  subSlug?: string;
}

export function NovaBlogDetailView({
  bundle,
  subSlug,
}: NovaBlogDetailViewProps) {
  const { portfolio, profile, posts } = bundle;

  const firstName = profile?.firstName || "Developer";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const selectedPost = subSlug
    ? posts.find((p) => p.slug === subSlug || p._id === subSlug) || posts[0]
    : posts[0];

  if (!selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-mono space-y-4">
        <h2 className="text-xl font-bold text-white">$ error 404: DOC_NOT_FOUND</h2>
        <Link href={`/${portfolio.slug}/blog`} className="text-cyan-400 hover:underline text-xs">
          &larr; $ cd ../whitepapers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-mono">
      {/* Top Navigation & Share */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <Link
          href={`/${portfolio.slug}/blog`}
          className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>$ cd ../whitepapers</span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-cyan-700 dark:text-cyan-300">{selectedPost.slug || selectedPost._id}</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Document link copied!");
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>share_doc()</span>
        </button>
      </div>

      {/* Document Frame */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
        {/* Header Telemetry */}
        <div className="p-6 sm:p-8 space-y-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 font-bold">
              DOC_TYPE: {selectedPost.tags?.[0] || "WHITEPAPER"}
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              {selectedPost.readingTimeMinutes || 5}m READ_TIME
            </span>
            {selectedPost.publishedAt && (
              <span className="text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {new Date(selectedPost.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {selectedPost.title}
          </h1>

          {selectedPost.excerpt && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              {selectedPost.excerpt}
            </p>
          )}

          {/* Author Daemon */}
          <div className="flex items-center gap-3 pt-2 text-xs">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              &gt;_
            </div>
            <div>
              <span className="text-slate-900 dark:text-white font-bold block">{fullName}</span>
              <span className="text-slate-500 text-[11px] font-sans">Core Author &bull; Systems Architect</span>
            </div>
          </div>
        </div>

        {/* Cover Image Frame */}
        {selectedPost.coverImageUrl && (
          <div className="p-6 bg-slate-100 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <img
                src={selectedPost.coverImageUrl}
                alt={selectedPost.title}
                className="w-full h-auto object-cover max-h-[450px]"
              />
            </div>
          </div>
        )}

        {/* Document Body */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="prose dark:prose-invert max-w-none font-sans text-sm sm:text-base leading-relaxed space-y-6 text-slate-700 dark:text-slate-300">
            <p className="whitespace-pre-line leading-relaxed">
              {selectedPost.content}
            </p>
          </div>

          {/* Tags */}
          {selectedPost.tags && selectedPost.tags.length > 0 && (
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 mr-1">$ export TAGS=</span>
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-semibold"
                >
                  &quot;{tag}&quot;
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Whitepapers */}
      {posts.filter((p) => p._id !== selectedPost._id).length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">$ cat /usr/share/related_docs.txt</span>
            <Link href={`/${portfolio.slug}/blog`} className="text-cyan-600 dark:text-cyan-400 hover:underline">
              all_whitepapers() &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts
              .filter((p) => p._id !== selectedPost._id)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p._id}
                  href={`/${portfolio.slug}/blog/${p.slug || p._id}`}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-colors block space-y-1 shadow-xs"
                >
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold">[{p.tags?.[0] || "SYS"}]</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300">{p.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans line-clamp-1">
                    {p.excerpt || p.content.slice(0, 80)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
