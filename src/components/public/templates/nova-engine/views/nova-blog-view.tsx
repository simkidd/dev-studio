"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle, IPost } from "@/interfaces";
import { Terminal, Clock, ArrowRight } from "lucide-react";

interface NovaBlogViewProps {
  bundle: IPublicPortfolioBundle;
}

function NovaParallaxBlogCard({
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

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  const imageY = useTransform(smoothProgress, [0, 1], [-12, 12]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-cyan-500/50 transition-all flex flex-col justify-between backdrop-blur-md"
    >
      {post.coverImageUrl && (
        <div className="aspect-16/9 w-full overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800 relative">
          <motion.img
            style={{ y: imageY, scale: 1.06 }}
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover transform-gpu will-change-transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-xs border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
            [{post.tags?.[0] || "WHITEPAPER"}]
          </div>
        </div>
      )}

      <div className="p-6 space-y-3 font-mono flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {!post.coverImageUrl && (
            <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold block">
              [{post.tags?.[0] || "TECH_NOTE"}]
            </span>
          )}
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            <Link href={`/${portfolioSlug}/blog/${post.slug || post._id}`}>{post.title}</Link>
          </h3>
          {post.excerpt && (
            <p className="text-xs text-slate-600 dark:text-slate-400 font-sans line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-[10px] text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-500" />
            {post.readingTimeMinutes || 5}m READ
          </span>
          <Link
            href={`/${portfolioSlug}/blog/${post.slug || post._id}`}
            className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1 text-xs"
          >
            <span>read_doc()</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function NovaBlogView({ bundle }: NovaBlogViewProps) {
  const { portfolio, posts } = bundle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-mono">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 max-w-3xl"
      >
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          $ cat /var/log/whitepapers.log
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Articles &amp; Whitepapers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Technical architectures, engineering blueprints, systems benchmarks, and production insights.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {posts.map((post, idx) => (
          <NovaParallaxBlogCard
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
