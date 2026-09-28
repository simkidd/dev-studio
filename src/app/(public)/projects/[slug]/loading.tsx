import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in-50 duration-300">
      {/* Back button & Category */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-28 rounded-lg bg-muted/60" />
        <Skeleton className="h-6 w-24 rounded-full bg-muted/60" />
      </div>

      {/* Title & Metadata */}
      <div className="space-y-3">
        <Skeleton className="h-10 sm:h-12 w-4/5 rounded-xl bg-muted/70" />
        <Skeleton className="h-5 w-full max-w-2xl rounded-lg bg-muted/50" />
        <div className="flex flex-wrap gap-2 pt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-md bg-muted/60" />
          ))}
        </div>
      </div>

      {/* Cover Image / Hero Showcase */}
      <Skeleton className="h-72 sm:h-96 w-full rounded-3xl bg-muted/60" />

      {/* Content paragraphs */}
      <div className="space-y-4 pt-4">
        <Skeleton className="h-6 w-48 rounded-lg bg-muted/70" />
        <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
        <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
        <Skeleton className="h-4 w-5/6 rounded-md bg-muted/50" />
        <div className="py-2" />
        <Skeleton className="h-6 w-40 rounded-lg bg-muted/70" />
        <Skeleton className="h-4 w-full rounded-md bg-muted/50" />
        <Skeleton className="h-4 w-3/4 rounded-md bg-muted/50" />
      </div>
    </div>
  );
}
