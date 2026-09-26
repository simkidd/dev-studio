"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FilterOption {
  label: string;
  value: string;
}

export interface PillFilterProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PillFilter({
  label,
  options,
  value,
  onChange,
  className,
}: PillFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center h-8 gap-1.5 px-2.5 rounded-lg text-xs transition-all border select-none shrink-0",
            "bg-card text-muted-foreground border-border hover:border-border/80 hover:text-foreground",
            "cursor-pointer",
            isOpen &&
              "border-primary/50 ring-1 ring-primary/20 text-foreground",
            className,
          )}
        >
          <span className="text-muted-foreground font-medium">{label}:</span>
          <span className="font-semibold text-foreground">
            {selectedOption?.label}
          </span>
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
              isOpen && "transform rotate-180 text-foreground",
            )}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="min-w-[140px] bg-popover border border-border p-1 shadow-2xl text-popover-foreground rounded-lg"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors",
              option.value === value
                ? "bg-primary/15 text-primary font-semibold"
                : "hover:bg-accent hover:text-accent-foreground text-foreground",
            )}
          >
            <span>{option.label}</span>
            {option.value === value && (
              <Check className="w-3.5 h-3.5 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
