import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in-50 duration-300">
      {/* Back button */}
      <Skeleton className="h-8 w-28 rounded-lg bg-muted/60" />

      {/* Title & metadata */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full bg-muted/60" />
          <Skeleton className="h-5 w-24 rounded-full bg-muted/60" />
        </div>
        <Skeleton className="h-10 sm:h-12 w-full rounded-xl bg-muted/70" />
        <Skeleton className="h-5 w-3/4 rounded-lg bg-muted/50" />
      </div>

      {/* Cover Image */}
      <Skeleton className="h-64 sm:h-80 w-full rounded-3xl bg-muted/60" />

      {/* Article Body */}
      <div className="space-y-4 pt-4">
        <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
        <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
        <Skeleton className="h-4 w-11/12 rounded-md bg-muted/50" />
        <Skeleton className="h-4 w-4/5 rounded-md bg-muted/50" />
        <div className="py-2" />
        <Skeleton className="h-6 w-44 rounded-lg bg-muted/70" />
        <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
        <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
        <Skeleton className="h-4 w-2/3 rounded-md bg-muted/50" />
      </div>
    </div>
  );
}
