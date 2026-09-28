import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PublicLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-in fade-in-50 duration-300">
      {/* Hero / Banner Skeleton */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-36 rounded-full bg-muted/70" />
          <Skeleton className="h-6 w-28 rounded-full bg-muted/60" />
        </div>
        <Skeleton className="h-12 w-3/4 max-w-xl rounded-xl bg-muted/80" />
        <Skeleton className="h-5 w-full max-w-2xl rounded-lg bg-muted/60" />
        <Skeleton className="h-5 w-2/3 max-w-lg rounded-lg bg-muted/50" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-11 w-36 rounded-xl bg-muted/70" />
          <Skeleton className="h-11 w-32 rounded-xl bg-muted/60" />
        </div>
      </div>

      {/* Grid Content Skeleton */}
      <div className="space-y-6 pt-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-48 rounded-lg bg-muted/70" />
          <Skeleton className="h-5 w-20 rounded-md bg-muted/50" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-border/80 p-5 bg-card/40 space-y-4 shadow-xs"
            >
              <Skeleton className="h-48 w-full rounded-2xl bg-muted/60" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-2/3 rounded-md bg-muted/70" />
                <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
                <Skeleton className="h-4 w-4/5 rounded-md bg-muted/50" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-5 w-16 rounded-md bg-muted/60" />
                <Skeleton className="h-5 w-16 rounded-md bg-muted/60" />
                <Skeleton className="h-5 w-16 rounded-md bg-muted/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
