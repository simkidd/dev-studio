import React from "react";

export default function Loading() {
  return (
    <div className="min-h-dvh w-full flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl border-2 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl animate-pulse" />
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs font-mono font-medium text-foreground tracking-wider uppercase">
          Loading
        </p>
        <p className="text-[11px] text-muted-foreground">
          Preparing system architecture...
        </p>
      </div>
    </div>
  );
}
