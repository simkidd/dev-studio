"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowLeft, Clock, Calendar, Share2, Terminal } from "lucide-react";
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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-mono space-y-4">
        <h2 className="text-xl font-bold text-white">$ error 404: DOC_NOT_FOUND</h2>
        <Link href={`/${portfolio.slug}/blog`} className="text-cyan-400 hover:underline text-xs">
          &larr; $ cd ../whitepapers
        </Link>
      </div>
    );
  }

  const currentIndex = posts.findIndex((p) => p._id === selectedPost._id);
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : posts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-mono relative">
      {/* Top Cyan Reading Progress Bar */}
      <motion.div
        style={{ scaleX: smoothReadingProgress, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 shadow-sm shadow-cyan-400/50 z-50 pointer-events-none"
      />

      {/* Top Navigation & Share */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4"
      >
        <Link
          href={`/${portfolio.slug}/blog`}
          className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>$ cd ../whitepapers</span>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-cyan-700 dark:text-cyan-300">{selectedPost.slug || selectedPost._id}</span>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </motion.div>

      {/* Document Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl backdrop-blur-md"
      >
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

        {/* Cover Image Frame with Parallax */}
        {selectedPost.coverImageUrl && (
          <div ref={coverRef} className="p-6 bg-slate-100 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <motion.img
                style={{ y: coverY, scale: 1.05 }}
                src={selectedPost.coverImageUrl}
                alt={selectedPost.title}
                className="w-full h-auto object-cover max-h-[450px] transform-gpu will-change-transform"
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
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-cyan-700 dark:text-cyan-400 font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Next Document Link */}
      {nextPost && nextPost._id !== selectedPost._id && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-2"
        >
          <Link
            href={`/${portfolio.slug}/blog/${nextPost.slug || nextPost._id}`}
            className="block p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-colors group"
          >
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold block">
              $ cat ../next_whitepaper &rarr;
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mt-1">
              {nextPost.title}
            </h4>
            {nextPost.excerpt && (
              <p className="text-xs text-slate-600 dark:text-slate-400 font-sans mt-1">
                {nextPost.excerpt}
              </p>
            )}
          </Link>
        </motion.div>
      )}
    </div>
  );
}
