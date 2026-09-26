"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default";
}

export function ThemeToggle({ className = "", size = "default" }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const items = [
    {
      value: "light",
      label: "Light Theme",
      icon: Sun,
      activeColor: "text-amber-500 dark:text-amber-400",
    },
    {
      value: "dark",
      label: "Dark Theme",
      icon: Moon,
      activeColor: "text-indigo-500 dark:text-indigo-400",
    },
    {
      value: "system",
      label: "System Theme",
      icon: Laptop,
      activeColor: "text-primary",
    },
  ];

  if (!mounted) {
    const itemSize = size === "sm" ? "w-5.5 h-5.5" : "w-6.5 h-6.5";
    return (
      <div
        className={`inline-flex items-center bg-muted/60 border border-border/80 rounded-full p-0.5 shadow-inner opacity-70 ${className}`}
        aria-hidden="true"
      >
        <div className={`${itemSize} rounded-full`} />
        <div className={`${itemSize} rounded-full`} />
        <div className={`${itemSize} rounded-full`} />
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Select color theme"
      className={`inline-flex items-center bg-muted/80 dark:bg-muted/50 border border-border rounded-full p-0.5 shadow-inner backdrop-blur-xs transition-colors ${className}`}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = theme === item.value;

        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={item.label}
            title={item.label}
            onClick={() => setTheme(item.value)}
            className={`relative flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
              size === "sm" ? "w-5.5 h-5.5" : "w-6.5 h-6.5"
            } ${
              isActive
                ? `bg-background ${item.activeColor} shadow-xs border border-border/60 scale-105`
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            }`}
          >
            <Icon
              className={`transition-transform duration-200 ${
                size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"
              } ${isActive ? "scale-105 stroke-[2.2]" : "scale-95"}`}
            />
          </button>
        );
      })}
    </div>
  );
}
