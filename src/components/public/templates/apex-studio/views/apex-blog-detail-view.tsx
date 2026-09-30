"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight } from "lucide-react";
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

  const { scrollYProgress: pageScrollProgress } = useScroll();
  const smoothReadingProgress = useSpring(pageScrollProgress, { stiffness: 200, damping: 30 });

  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: coverProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"],
  });
  const smoothCoverProgress = useSpring(coverProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const coverY = useTransform(smoothCoverProgress, [0, 1], [-20, 20]);

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

  // Next Post calculation
  const currentIndex = posts.findIndex((p) => p._id === selectedPost._id);
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : posts[0];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 space-y-12 relative">
      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX: smoothReadingProgress, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-50 pointer-events-none"
      />

      {/* Top Navigation & Share */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-white/10 pb-6"
      >
        <Link
          href={`/${portfolio.slug}/blog`}
          className="text-xs font-mono text-stone-500 dark:text-white/50 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-2 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Essays Index</span>
          <span className="text-stone-300 dark:text-white/20">/</span>
          <span className="text-stone-900 dark:text-white">{selectedPost.title}</span>
        </Link>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </motion.div>

      {/* Editorial Essay Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
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
        <motion.div
          whileHover={{ x: 3 }}
          className="flex items-center gap-4 pt-4 border-t border-stone-200 dark:border-white/10 text-xs font-mono"
        >
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
            {fullName.charAt(0)}
          </div>
          <div>
            <span className="text-stone-900 dark:text-white font-bold block">{fullName}</span>
            <span className="text-stone-500 dark:text-white/50 text-[11px]">Creative Technologist &amp; Principal</span>
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
          className="rounded-3xl overflow-hidden border border-stone-200 dark:border-white/10 bg-stone-100 dark:bg-white/5 shadow-2xl"
        >
          <motion.img
            style={{ y: coverY, scale: 1.05 }}
            src={selectedPost.coverImageUrl}
            alt={selectedPost.title}
            className="w-full h-auto object-cover max-h-[500px] transform-gpu will-change-transform"
          />
        </motion.div>
      )}

      {/* Essay Content Body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-8 sm:p-12 rounded-3xl bg-stone-50 dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-8 shadow-xs"
      >
        <div className="prose dark:prose-invert max-w-none font-serif text-base sm:text-lg leading-relaxed space-y-6 text-stone-800 dark:text-stone-200">
          <p className="whitespace-pre-line leading-relaxed font-sans font-light text-stone-700 dark:text-stone-300">
            {selectedPost.content}
          </p>
        </div>

        {/* Tags */}
        {selectedPost.tags && selectedPost.tags.length > 0 && (
          <div className="pt-8 border-t border-stone-200 dark:border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-stone-400 dark:text-white/40 uppercase tracking-widest mr-2">
              Thematic Tags:
            </span>
            {selectedPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1 rounded-full bg-stone-200 dark:bg-white/10 text-xs font-mono text-stone-900 dark:text-white font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Next Essay Bridge */}
      {nextPost && nextPost._id !== selectedPost._id && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-6"
        >
          <Link
            href={`/${portfolio.slug}/blog/${nextPost.slug || nextPost._id}`}
            className="block p-8 rounded-3xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 hover:border-amber-500/50 transition-all group"
          >
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block">
              Read Next Essay &rarr;
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mt-2">
              {nextPost.title}
            </h3>
            {nextPost.excerpt && (
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light mt-1">
                {nextPost.excerpt}
              </p>
            )}
          </Link>
        </motion.div>
      )}
    </div>
  );
}
