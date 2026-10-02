"use client";

import React, { useState } from "react";
import { useActiveAnnouncements } from "@/hooks";
import {
  Info,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  X,
  ExternalLink,
} from "lucide-react";

export function PlatformAnnouncementBanner() {
  const { data: announcements } = useActiveAnnouncements();
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const activeAnnouncements = announcements?.filter(
    (a) => !dismissedIds.includes(a._id),
  );

  if (!activeAnnouncements || activeAnnouncements.length === 0) {
    return null;
  }

  const latest = activeAnnouncements[0];

  const typeConfig = {
    info: {
      bg: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
      icon: Info,
    },
    warning: {
      bg: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
      icon: AlertCircle,
    },
    success: {
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      icon: CheckCircle2,
    },
    announcement: {
      bg: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
      icon: Sparkles,
    },
  };

  const currentConfig = typeConfig[latest.type] || typeConfig.info;
  const Icon = currentConfig.icon;

  const handleDismiss = () => {
    setDismissedIds((prev) => [...prev, latest._id]);
  };

  return (
    <div
      className={`w-full px-4 py-2 border-b flex items-center justify-between text-xs transition-colors ${currentConfig.bg}`}
    >
      <div className="flex items-center gap-2 max-w-4xl mx-auto truncate">
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span className="font-bold shrink-0">{latest.title}:</span>
        <span className="truncate text-foreground/80">{latest.message}</span>
        {latest.linkUrl && (
          <a
            href={latest.linkUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold underline hover:opacity-80 shrink-0 ml-1"
          >
            <span>{latest.linkText || "View"}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <button
        onClick={handleDismiss}
        className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer ml-2"
        title="Dismiss notice"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
