"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IPublicPortfolioBundle, IPost } from "@/interfaces";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

interface ClassicBlogViewProps {
  bundle: IPublicPortfolioBundle;
}

function ClassicParallaxBlogCard({
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
  const imageY = useTransform(smoothProgress, [0, 1], [-14, 14]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-all flex flex-col justify-between shadow-xs hover:shadow-xl"
    >
      {post.coverImageUrl && (
        <div className="aspect-16/9 w-full overflow-hidden bg-muted border-b border-border/60 relative">
          <motion.img
            style={{ y: imageY, scale: 1.06 }}
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover transform-gpu will-change-transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/60 text-[10px] font-mono uppercase font-semibold text-primary">
            {post.tags?.[0] || "Engineering"}
          </div>
        </div>
      )}

      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {!post.coverImageUrl && (
            <span className="text-[10px] font-mono text-primary uppercase font-semibold block">
              {post.tags?.[0] || "Engineering"}
            </span>
          )}
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
            <Link href={`/${portfolioSlug}/blog/${post.slug || post._id}`}>
              {post.title}
            </Link>
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt || post.content.slice(0, 120)}
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {post.readingTimeMinutes || 5} min read
          </span>
          <Link
            href={`/${portfolioSlug}/blog/${post.slug || post._id}`}
            className="font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ClassicBlogView({ bundle }: ClassicBlogViewProps) {
  const { portfolio, posts } = bundle;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 max-w-3xl"
      >
        <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          Writing &amp; Research
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Articles &amp; Thoughts
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Deep dives into software architecture, frontend performance, developer productivity, and full-stack systems design.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <ClassicParallaxBlogCard
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
