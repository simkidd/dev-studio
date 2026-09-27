"use client";

import React, { useState } from "react";
import { getTechLogoUrl } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";

interface TechIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  icon?: string;
  className?: string;
  imgClassName?: string;
  size?: number;
}

export function TechIcon({
  name,
  icon,
  className,
  imgClassName,
  size = 20,
  ...props
}: TechIconProps) {
  const [hasError, setHasError] = useState(false);
  const logoUrl = getTechLogoUrl(name, icon);

  if (!logoUrl || hasError) {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-md bg-muted text-muted-foreground font-mono text-[10px] font-bold shrink-0 select-none",
          className,
        )}
        style={{ width: size, height: size }}
        title={name}
        {...props}
      >
        {name ? name.slice(0, 2).toUpperCase() : <Code2 className="w-3 h-3" />}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0",
        className,
      )}
      style={{ width: size, height: size }}
      title={name}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoUrl}
        alt={`${name} logo`}
        width={size}
        height={size}
        className={cn("w-full h-full object-contain pointer-events-none drop-shadow-xs", imgClassName)}
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
