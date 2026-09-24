"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Trash2,
  Info,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ConfirmationVariant =
  | "destructive"
  | "warning"
  | "info"
  | "success"
  | "default";

export interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmationVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const variantConfig: Record<
  ConfirmationVariant,
  {
    iconBg: string;
    iconColor: string;
    iconBorder: string;
    defaultIcon: React.ReactNode;
    confirmButtonVariant: "destructive" | "default" | "outline" | "secondary";
    confirmButtonClass?: string;
  }
> = {
  destructive: {
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    iconBorder: "border-destructive/20",
    defaultIcon: <Trash2 className="w-5 h-5" />,
    confirmButtonVariant: "destructive",
    confirmButtonClass:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white",
  },
  warning: {
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBorder: "border-amber-500/20",
    defaultIcon: <AlertTriangle className="w-5 h-5" />,
    confirmButtonVariant: "default",
    confirmButtonClass: "bg-amber-500 text-white hover:bg-amber-600",
  },
  info: {
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    iconBorder: "border-primary/20",
    defaultIcon: <Info className="w-5 h-5" />,
    confirmButtonVariant: "default",
  },
  success: {
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBorder: "border-emerald-500/20",
    defaultIcon: <CheckCircle2 className="w-5 h-5" />,
    confirmButtonVariant: "default",
    confirmButtonClass: "bg-emerald-500 text-white hover:bg-emerald-600",
  },
  default: {
    iconBg: "bg-muted",
    iconColor: "text-foreground",
    iconBorder: "border-border",
    defaultIcon: <AlertTriangle className="w-5 h-5" />,
    confirmButtonVariant: "default",
  },
};

export function ConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText,
  cancelText = "Cancel",
  variant = "destructive",
  isLoading = false,
  icon,
}: ConfirmationModalProps) {
  const config = variantConfig[variant] || variantConfig.destructive;
  const resolvedConfirmText =
    confirmText || (variant === "destructive" ? "Delete" : "Confirm");

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    await onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={isLoading ? undefined : onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md bg-card border-border text-card-foreground p-6 gap-5 shadow-2xl"
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
              config.iconBg,
              config.iconColor,
              config.iconBorder,
            )}
          >
            {icon || config.defaultIcon}
          </div>

          <div className="flex-1 space-y-1.5 pt-0.5">
            <DialogTitle className="text-base font-semibold text-foreground tracking-tight">
              {title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </DialogDescription>
          </div>
        </div>

        <DialogFooter className="flex-row justify-end gap-2 pt-2 border-t border-border/60 sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="text-xs border-border hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={config.confirmButtonVariant}
            size="sm"
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn(
              "text-xs gap-1.5 cursor-pointer",
              config.confirmButtonClass,
            )}
          >
            {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{resolvedConfirmText}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmationModal;
