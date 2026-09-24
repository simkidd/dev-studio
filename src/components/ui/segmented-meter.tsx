import React from "react";
import { cn } from "@/lib/utils";

export interface SegmentedMeterProps {
  value: number; // 0 to 100
  totalSegments?: number;
  showLabel?: boolean;
  className?: string;
}

export function SegmentedMeter({
  value,
  totalSegments = 8,
  showLabel = true,
  className,
}: SegmentedMeterProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const activeSegments = Math.round((clampedValue / 100) * totalSegments);

  const getSegmentColor = (index: number) => {
    if (index >= activeSegments) return "bg-muted";
    const ratio = (index + 1) / totalSegments;
    if (ratio <= 0.4) return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
    if (ratio <= 0.75) return "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]";
    return "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]";
  };

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-[4px] h-[12px] rounded-[1px] transition-all",
              getSegmentColor(i),
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-[11px] font-mono font-medium text-foreground min-w-[28px]">
          {clampedValue}%
        </span>
      )}
    </div>
  );
}
