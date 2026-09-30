"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle, IPost } from "@/interfaces";

interface ApexBlogViewProps {
  bundle: IPublicPortfolioBundle;
}

function ApexParallaxBlogCard({
  post,
  portfolioSlug,
  index,
}: {
  post: IPost;
  portfolioSlug: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const imageY = useTransform(smoothProgress, [0, 1], [-18, 18]);
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.12, 1.06, 1.12]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group space-y-4 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <Link
          href={`/${portfolioSlug}/blog/${post.slug || post._id}`}
          className="aspect-16/10 rounded-2xl overflow-hidden bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 shadow-xs relative block"
        >
          {post.coverImageUrl ? (
            <motion.img
              style={{ y: imageY, scale: imageScale }}
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 will-change-transform"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900/80 text-stone-400 dark:text-stone-500 gap-3 p-4">
              <div className="w-12 h-12 rounded-full border border-stone-300 dark:border-stone-700 flex items-center justify-center font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-stone-50 dark:bg-stone-800">
                ESSAY
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold opacity-70">
                {post.tags?.[0] || "Architecture"}
              </span>
            </div>
          )}
          <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-stone-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md z-10">
            {post.tags?.[0] || "Essay"}
          </span>
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">
            <span>{post.tags?.[0] || "ESSAY"}</span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-stone-500 dark:text-stone-400 font-normal">
              {post.readingTimeMinutes || 5} min read
            </span>
          </div>
          <h3 className="text-2xl font-bold uppercase tracking-tight text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            <Link href={`/${portfolioSlug}/blog/${post.slug || post._id}`}>
              {post.title}
            </Link>
          </h3>
          <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed font-light line-clamp-3">
            {post.excerpt || post.content.slice(0, 140)}
          </p>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href={`/${portfolioSlug}/blog/${post.slug || post._id}`}
          className="text-xs font-mono text-amber-600 dark:text-amber-400 hover:underline font-semibold uppercase inline-flex items-center gap-1"
        >
          <span>Read Essay</span>
          <span>&rarr;</span>
        </Link>
      </div>
    </motion.div>
  );
}

export function ApexBlogView({ bundle }: ApexBlogViewProps) {
  const { portfolio, posts } = bundle;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 max-w-3xl"
      >
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
          Writing
        </span>
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
          Notes &amp; Essays
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          Perspectives on design systems, frontend architecture, and digital craft.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post, idx) => (
          <ApexParallaxBlogCard
            key={post._id}
            post={post}
            portfolioSlug={portfolio.slug}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}
