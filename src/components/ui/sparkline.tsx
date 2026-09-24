import React from "react";
import { cn } from "@/lib/utils";

export interface SparklineProps {
  data?: number[];
  width?: number;
  height?: number;
  color?: "emerald" | "indigo" | "amber" | "rose" | "cyan";
  className?: string;
}

export function Sparkline({
  data = [12, 18, 14, 25, 22, 35, 30, 48, 42, 55],
  width = 72,
  height = 20,
  color = "emerald",
  className,
}: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const colorMap = {
    emerald: {
      stroke: "#10b981",
      fill: "rgba(16, 185, 129, 0.15)",
    },
    indigo: {
      stroke: "#6366f1",
      fill: "rgba(99, 102, 241, 0.15)",
    },
    amber: {
      stroke: "#f59e0b",
      fill: "rgba(245, 158, 11, 0.15)",
    },
    rose: {
      stroke: "#f43f5e",
      fill: "rgba(244, 63, 94, 0.15)",
    },
    cyan: {
      stroke: "#06b6d4",
      fill: "rgba(6, 182, 212, 0.15)",
    },
  };

  const selectedColor = colorMap[color] || colorMap.emerald;

  // Closed polygon for area gradient
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <div className={cn("inline-flex items-center", className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={selectedColor.stroke} stopOpacity="0.35" />
            <stop offset="100%" stopColor={selectedColor.stroke} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        <polygon points={areaPoints} fill={`url(#grad-${color})`} />
        <polyline
          fill="none"
          stroke={selectedColor.stroke}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    </div>
  );
}
