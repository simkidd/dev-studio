"use client";

import React from "react";
import Link from "next/link";
import { IPublicPortfolioBundle } from "@/interfaces";
import { Clock } from "lucide-react";

interface ClassicBlogViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ClassicBlogView({ bundle }: ClassicBlogViewProps) {
  const { portfolio, posts } = bundle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
          Writing
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Articles &amp; Thoughts
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Thoughts on software engineering, web performance, and modern technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="group rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
          >
            {post.coverImageUrl && (
              <div className="aspect-16/9 w-full overflow-hidden bg-muted border-b border-border/60">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-primary uppercase font-semibold">
                  {post.tags?.[0] || "Engineering"}
                </span>
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  <Link href={`/${portfolio.slug}/blog/${post.slug || post._id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.excerpt || post.content.slice(0, 120)}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" />
                  {post.readingTimeMinutes || 5} min read
                </span>
                <Link
                  href={`/${portfolio.slug}/blog/${post.slug || post._id}`}
                  className="font-semibold text-primary hover:underline"
                >
                  Read &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
