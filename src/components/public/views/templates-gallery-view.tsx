"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Palette,
  ArrowRight,
  ExternalLink,
  Layout,
  Terminal,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export function TemplatesGalleryView() {
  const templates = [
    {
      id: "classic-dev",
      name: "Classic Dev",
      subtitle: "Editorial & Balanced Full-Stack Showcase",
      badge: "Flagship",
      badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      description:
        "The balanced, typography-led design. Features a floating pill navigation dock, clean centered introduction, tactile project cards, and a direct inquiry collaboration gateway.",
      demoUrl: "/alex-morgan",
      tags: ["Floating Pill Nav", "Unboxed Intro", "3-Col Projects", "Career Timeline", "Contact Gateway"],
      bestFor: "Full-Stack Developers, Software Engineers, Systems Consultants, Team Leads",
      icon: Layout,
    },
    {
      id: "nova-engine",
      name: "Nova Engine",
      subtitle: "Systems & Distributed Telemetry Console",
      badge: "High Density",
      badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      description:
        "Designed for backend architects, DevOps engineers, and systems developers. Features a fixed telemetry command bar, blinking terminal prompts, metric cards, and structured directory layouts.",
      demoUrl: "/alex-morgan",
      tags: ["Fixed Command Header", "Telemetry Status", "3-Col Matrix", "Event Logs", "Direct Inbound"],
      bestFor: "Staff Engineers, Backend Architects, DevOps & Cloud Consultants, Distributed Systems Devs",
      icon: Terminal,
    },
    {
      id: "apex-studio",
      name: "Apex Studio",
      subtitle: "Creative Technologist & Interaction Studio",
      badge: "Editorial",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      description:
        "Inspired by high-end design engineering studios. Features bold uppercase typography, floating glass dock navigation, spacious 2-column editorial showcases, and amber accents.",
      demoUrl: "/elena-rostova",
      tags: ["Editorial Typography", "Floating Glass Dock", "2-Col Editorial Grid", "Unboxed Cards", "Studio Inquiries"],
      bestFor: "Frontend Engineers, Creative Developers, 3D WebGL Artists, Product Designers, Founders",
      icon: Palette,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
            <Palette className="w-3.5 h-3.5" />
            <span>Design System &amp; Layouts</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
            Portfolio Templates
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Every template operates with its own independent navigation bar, layout system, and footer. Change your visual presentation anytime without altering your projects or articles.
          </p>
        </motion.div>

        {/* Templates Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((tpl, idx) => {
            const Icon = tpl.icon;
            return (
              <motion.div
                key={tpl.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-6 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs hover:shadow-xl flex-1"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${tpl.badgeColor}`}>
                        {tpl.badge}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase">{tpl.id}</span>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{tpl.name}</h2>
                    <div className="text-xs font-mono text-muted-foreground">{tpl.subtitle}</div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {tpl.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider font-semibold">
                      Features
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-muted text-muted-foreground border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/60 space-y-1 text-xs">
                    <span className="font-semibold text-foreground">Best For:</span>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">{tpl.bestFor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Link
                      href="/admin/login"
                      className="w-full py-2.5 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-md shadow-primary/20"
                    >
                      <span>Use Template</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={tpl.demoUrl}
                      target="_blank"
                      className="p-2.5 rounded-full bg-card border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center shadow-xs"
                      title="View Live Demo"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-12 rounded-3xl bg-linear-to-tr from-primary/10 via-card to-card border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg"
        >
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Ready to publish your portfolio?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Sign up, choose your favorite template, and launch your dynamic portfolio in minutes.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/admin/login"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:opacity-95 transition-all shrink-0 shadow-lg shadow-primary/20 inline-block"
            >
              Get Started Free
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
