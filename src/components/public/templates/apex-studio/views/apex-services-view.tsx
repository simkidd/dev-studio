"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowUpRight } from "lucide-react";

interface ApexServicesViewProps {
  bundle: IPublicPortfolioBundle;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ApexServicesView({ bundle }: ApexServicesViewProps) {
  const { portfolio } = bundle;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 max-w-3xl"
      >
        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest font-semibold">
          Services
        </span>
        <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tight text-stone-900 dark:text-white">
          Capabilities
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-light leading-relaxed">
          Full-stack web engineering, design systems, and frontend architecture.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6 }}
          className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-4 shadow-xs hover:border-amber-500/40 transition-all flex flex-col justify-between"
        >
          <div className="space-y-4">
            <span className="text-2xl font-mono text-amber-600 dark:text-amber-400 font-bold">01</span>
            <h3 className="text-lg font-bold uppercase text-stone-900 dark:text-white">Creative Direction</h3>
            <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed">
              High-impact digital aesthetics, bespoke typography, and design sprints.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold">Scope: Brand &amp; UI</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6 }}
          className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-4 shadow-xs hover:border-amber-500/40 transition-all flex flex-col justify-between"
        >
          <div className="space-y-4">
            <span className="text-2xl font-mono text-amber-600 dark:text-amber-400 font-bold">02</span>
            <h3 className="text-lg font-bold uppercase text-stone-900 dark:text-white">Interactive 3D / WebGL</h3>
            <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed">
              Three.js, GLSL custom shaders, and visceral interactive spatial experiences.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold">Scope: Spatial Web</span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -6 }}
          className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 space-y-4 shadow-xs hover:border-amber-500/40 transition-all flex flex-col justify-between"
        >
          <div className="space-y-4">
            <span className="text-2xl font-mono text-amber-600 dark:text-amber-400 font-bold">03</span>
            <h3 className="text-lg font-bold uppercase text-stone-900 dark:text-white">Frontend Architecture</h3>
            <p className="text-xs text-stone-600 dark:text-white/60 leading-relaxed">
              Fluid Next.js/React applications with 60fps kinetic motion pipelines.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-semibold">Scope: Systems Core</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="p-10 sm:p-12 rounded-3xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 text-center space-y-4 shadow-xs"
      >
        <h3 className="text-2xl sm:text-3xl font-bold uppercase text-stone-900 dark:text-white">Initiate a Commission</h3>
        <p className="text-sm text-stone-600 dark:text-white/70 max-w-md mx-auto">
          Currently taking select engagements for Q3/Q4. Let&apos;s build something memorable.
        </p>
        <div className="pt-2">
          <Link
            href={`/${portfolio.slug}/contact`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors shadow-lg"
          >
            <span>Commission Studio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
