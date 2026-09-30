"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";

interface NovaBlogViewProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaBlogView({ bundle }: NovaBlogViewProps) {
  const { portfolio, posts } = bundle;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-mono">
      <div className="space-y-2 max-w-3xl">
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">$ cat /var/log/whitepapers.log</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Technical Articles
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          In-depth architectural analysis, systems benchmarks, and engineering documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            {post.coverImageUrl && (
              <div className="aspect-16/9 w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="p-6 space-y-3 font-mono flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold block">
                  [{post.tags?.[0] || "TECH"}]
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  <Link href={`/${portfolio.slug}/blog/${post.slug || post._id}`}>{post.title}</Link>
                </h3>
                {post.excerpt && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500">
                  {post.readingTimeMinutes || 5}m READ
                </span>
                <Link
                  href={`/${portfolio.slug}/blog/${post.slug || post._id}`}
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                >
                  read() &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
