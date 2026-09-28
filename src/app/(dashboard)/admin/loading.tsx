import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="space-y-6 pb-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <Skeleton className="h-7 w-48 rounded-lg bg-muted/70" />
          <Skeleton className="h-4 w-72 rounded-md bg-muted/50" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28 rounded-lg bg-muted/60" />
          <Skeleton className="h-9 w-32 rounded-lg bg-muted/70" />
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-card border border-border space-y-3"
          >
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24 rounded bg-muted/60" />
              <Skeleton className="h-8 w-8 rounded-lg bg-muted/60" />
            </div>
            <Skeleton className="h-8 w-16 rounded-md bg-muted/70" />
            <Skeleton className="h-3 w-32 rounded bg-muted/50" />
          </div>
        ))}
      </div>

      {/* Table / List Skeleton */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-36 rounded bg-muted/70" />
          <Skeleton className="h-8 w-24 rounded-lg bg-muted/60" />
        </div>
        <div className="space-y-3 pt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-xl bg-muted/30 border border-border/40 flex items-center px-4 justify-between"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-lg bg-muted/60" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-36 rounded bg-muted/70" />
                  <Skeleton className="h-3 w-24 rounded bg-muted/50" />
                </div>
              </div>
              <Skeleton className="h-6 w-16 rounded-full bg-muted/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
