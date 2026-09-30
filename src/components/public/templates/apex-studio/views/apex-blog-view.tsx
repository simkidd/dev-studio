"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";

interface ApexBlogViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ApexBlogView({ bundle }: ApexBlogViewProps) {
  const { portfolio, posts } = bundle;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
          Essays &amp; Musings
        </span>
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
          Writings &amp; Notes
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          Perspectives on interactive spatial design, design systems, and frontend aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 overflow-hidden shadow-xs hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            {post.coverImageUrl && (
              <div className="aspect-16/9 w-full overflow-hidden bg-stone-100 dark:bg-white/5">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold">
                  {post.tags?.[0] || "DESIGN"}
                </span>
                <h3 className="text-xl font-bold uppercase text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  <Link href={`/${portfolio.slug}/blog/${post.slug || post._id}`}>{post.title}</Link>
                </h3>
                {post.excerpt && (
                  <p className="text-xs text-stone-600 dark:text-white/60 font-light line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-stone-400 dark:text-white/40">
                  {post.readingTimeMinutes || 5} min read
                </span>
                <Link
                  href={`/${portfolio.slug}/blog/${post.slug || post._id}`}
                  className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                >
                  Read Essay &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
