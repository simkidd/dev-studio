"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IPublicPortfolioBundle } from "@/interfaces";
import { Cpu, Activity, Code2, Terminal, ArrowRight, ShieldCheck } from "lucide-react";

interface NovaServicesViewProps {
  bundle: IPublicPortfolioBundle;
}

export function NovaServicesView({ bundle }: NovaServicesViewProps) {
  const { portfolio } = bundle;

  const services = [
    {
      id: "01",
      cmd: "$ exec core.distributed_systems",
      title: "Distributed Systems & Cloud",
      icon: Cpu,
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
      status: "SYSTEM_NOMINAL // 99.99% UPTIME",
      desc: "High-throughput microservices, event-driven pipelines, Kafka streams, and distributed SQL/NoSQL databases with sub-millisecond data replication.",
      specs: ["Distributed Lock Managers", "Event-Driven Microservices", "Zero-Data-Loss Failovers"],
    },
    {
      id: "02",
      cmd: "$ exec observability.telemetry_daemon",
      title: "Observability & Infrastructure",
      icon: Activity,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      status: "ACTIVE_PROBING // 12ms LATENCY",
      desc: "Production-grade Kubernetes clusters, automated zero-downtime CI/CD deployment pipelines, Prometheus/Grafana dashboards, and distributed tracing.",
      specs: ["Kubernetes & Helm Orchestration", "Real-Time Metric Collectors", "Auto-Scaling Engine Policies"],
    },
    {
      id: "03",
      cmd: "$ exec ui.nextjs_platform_engine",
      title: "High-Performance Web Platforms",
      icon: Code2,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      status: "BUILD_OPTIMIZED // 100 LIGHTHOUSE",
      desc: "Resilient Next.js, React, and TypeScript web applications with server components, edge compute caching, and tactile responsive design systems.",
      specs: ["Next.js App Router Architecture", "Real-Time WebSocket Channels", "Sub-Second Global TTFB"],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10 font-mono">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 max-w-3xl"
      >
        <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" />
          $ systemctl list-units --type=service
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
          Capabilities &amp; Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
          Specialized systems engineering, backend scalability, and high-performance digital architectures.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {services.map((svc, idx) => {
          const Icon = svc.icon;
          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs flex flex-col justify-between hover:border-cyan-500/50 transition-all group backdrop-blur-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono">
                  <div className={`p-2.5 rounded-xl border ${svc.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    MODULE_{svc.id}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 block">{svc.cmd}</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-mono group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {svc.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  {svc.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 font-mono">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold block">BENCHMARK_SPECS:</span>
                  {svc.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                      <span className="text-cyan-500">&gt;</span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[10px] text-emerald-500 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{svc.status}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Terminal Command Dispatch Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4 shadow-xl relative overflow-hidden"
      >
        <div className="space-y-2">
          <span className="text-[11px] text-cyan-400 font-mono flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            READY_FOR_COMMISSION // INITIATE_HANDSHAKE
          </span>
          <h3 className="text-xl font-bold text-white font-mono">Need a systems architect for your next mission?</h3>
          <p className="text-xs text-slate-400 font-sans max-w-md mx-auto">
            Direct telemetry lines are open for consulting, cloud refactoring, and senior technical engagements.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block pt-1">
          <Link
            href={`/${portfolio.slug}/contact`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
          >
            <span>$ open_channel --target=contact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
