import React from "react";
import { Terminal } from "lucide-react";

export default function PortfolioLoading() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg">
            <Terminal className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground font-mono">
            Loading Portfolio...
          </h2>
          <p className="text-xs text-muted-foreground">
            Assembling developer showcase &amp; telemetry
          </p>
        </div>
      </div>
    </div>
  );
}
