"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { ArrowUpRight, Cpu, Layers, ShieldCheck } from "lucide-react";

interface ClassicServicesViewProps {
  bundle: IPublicPortfolioBundle;
}

export function ClassicServicesView({ bundle }: ClassicServicesViewProps) {
  const { portfolio } = bundle;

  const services = [
    {
      num: "01",
      title: "Full-Stack Architecture",
      icon: Layers,
      color: "text-primary bg-primary/10",
      description:
        "End-to-end web platforms engineered with Next.js, TypeScript, Node.js, and modern distributed databases.",
      features: ["Custom Web Apps & Portals", "Real-Time WebSocket Backends", "Modern State Architecture"],
    },
    {
      num: "02",
      title: "Systems & Cloud Infrastructure",
      icon: Cpu,
      color: "text-indigo-500 bg-indigo-500/10",
      description:
        "Resilient cloud orchestration, Docker containerization, API microservices, and sub-50ms latency tuning.",
      features: ["Container Orchestration", "Edge Caching & CDN Optimization", "Zero-Downtime CI/CD Pipelines"],
    },
    {
      num: "03",
      title: "Advisory & Code Auditing",
      icon: ShieldCheck,
      color: "text-emerald-500 bg-emerald-500/10",
      description:
        "Deep code audits, performance benchmarking, scalability assessments, and technical hiring advisory.",
      features: ["Performance & Bundle Audits", "Security Posture Reviews", "Team Mentorship & Roadmaps"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4 max-w-3xl"
      >
        <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
          Services
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          What I Do
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Available for full-stack web engineering, frontend architecture, and technical consulting.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-card border border-border space-y-5 hover:border-primary/40 transition-colors shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${service.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground">{service.num}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-border/50">
                <span className="text-[11px] font-mono text-primary font-semibold block">Key Deliverables</span>
                <ul className="space-y-1">
                  {service.features.map((feat) => (
                    <li key={feat} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5 }}
        className="p-8 sm:p-10 rounded-3xl bg-card border border-border text-center space-y-4 shadow-xs"
      >
        <h3 className="text-xl font-bold text-foreground">Have a tailored engagement in mind?</h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          Let&apos;s discuss timeline, technical scope, and architectural milestones.
        </p>
        <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block pt-1">
          <Link
            href={`/${portfolio.slug}/contact`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 hover:opacity-95 transition-opacity"
          >
            <span>Schedule an Inbound Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
