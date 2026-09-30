"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from "lucide-react";
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

  const { scrollYProgress: pageScrollProgress } = useScroll();
  const smoothReadingProgress = useSpring(pageScrollProgress, { stiffness: 200, damping: 30 });

  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: coverProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"],
  });
  const smoothCoverProgress = useSpring(coverProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const coverY = useTransform(smoothCoverProgress, [0, 1], [-18, 18]);

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

  const currentIndex = posts.findIndex((p) => p._id === selectedPost._id);
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : posts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative">
      {/* Top Reading Progress Line */}
      <motion.div
        style={{ scaleX: smoothReadingProgress, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 pointer-events-none"
      />

      {/* Top Navigation & Share */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-4"
      >
        <Link
          href={`/${portfolio.slug}/blog`}
          className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Articles</span>
          <span className="text-border">/</span>
          <span className="text-foreground">{selectedPost.title}</span>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </motion.div>

      {/* Article Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="space-y-6"
      >
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
        <motion.div
          whileHover={{ x: 2 }}
          className="flex items-center gap-3.5 p-4 rounded-2xl bg-card border border-border"
        >
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
        </motion.div>
      </motion.div>

      {/* Cover Image with Parallax */}
      {selectedPost.coverImageUrl && (
        <motion.div
          ref={coverRef}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden border border-border shadow-xl bg-muted"
        >
          <motion.img
            style={{ y: coverY, scale: 1.05 }}
            src={selectedPost.coverImageUrl}
            alt={selectedPost.title}
            className="w-full h-auto object-cover max-h-[500px] transform-gpu will-change-transform"
          />
        </motion.div>
      )}

      {/* Article Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-10 rounded-3xl bg-card border border-border space-y-6 shadow-xs"
      >
        <div className="prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-foreground/90">
          <p className="whitespace-pre-line leading-relaxed">
            {selectedPost.content}
          </p>
        </div>

        {/* Tags */}
        {selectedPost.tags && selectedPost.tags.length > 0 && (
          <div className="pt-6 border-t border-border/50 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground mr-1">Related Topics:</span>
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Next Article Card */}
      {nextPost && nextPost._id !== selectedPost._id && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-2"
        >
          <Link
            href={`/${portfolio.slug}/blog/${nextPost.slug || nextPost._id}`}
            className="block p-6 rounded-3xl bg-card border border-border hover:border-primary/40 transition-colors group"
          >
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider block">
              Read Next Article &rarr;
            </span>
            <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-1">
              {nextPost.title}
            </h4>
            {nextPost.excerpt && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {nextPost.excerpt}
              </p>
            )}
          </Link>
        </motion.div>
      )}
    </div>
  );
}
