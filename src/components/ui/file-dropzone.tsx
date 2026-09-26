"use client";

import React, { useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { Upload, Image as ImageIcon, FileText, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  onMultipleFilesSelect?: (files: File[]) => void;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number; // in bytes (e.g. 5 * 1024 * 1024)
  isUploading?: boolean;
  previewUrl?: string | null;
  onClear?: () => void;
  label?: string;
  sublabel?: string;
  className?: string;
  variant?: "avatar" | "banner" | "compact" | "default";
}

export function FileDropzone({
  onFileSelect,
  onMultipleFilesSelect,
  accept = { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".avif"] },
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024,
  isUploading = false,
  previewUrl,
  onClear,
  label = "Click or drag file to upload",
  sublabel = "PNG, JPG, WEBP up to 10MB",
  className,
  variant = "default",
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      if (maxFiles === 1 && acceptedFiles[0]) {
        onFileSelect(acceptedFiles[0]);
      } else if (onMultipleFilesSelect) {
        onMultipleFilesSelect(acceptedFiles);
      }
    },
    [maxFiles, onFileSelect, onMultipleFilesSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled: isUploading,
  });

  // Avatar circular dropzone
  if (variant === "avatar") {
    return (
      <div
        {...getRootProps()}
        className={cn(
          "relative group size-20 rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer transition-all overflow-hidden bg-muted/40 hover:border-primary",
          isDragActive && "border-primary bg-primary/10 ring-2 ring-primary/20",
          isDragReject && "border-destructive bg-destructive/10",
          isUploading && "pointer-events-none opacity-60",
          className
        )}
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Upload Preview" className="size-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] font-medium">
              <Upload className="w-4 h-4 mb-0.5" />
              <span>Change</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
        )}
      </div>
    );
  }

  // Compact bar dropzone
  if (variant === "compact") {
    return (
      <div
        {...getRootProps()}
        className={cn(
          "relative flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-border bg-card hover:bg-muted/50 cursor-pointer transition-all text-xs text-muted-foreground hover:text-foreground",
          isDragActive && "border-primary bg-primary/10 text-primary",
          isUploading && "pointer-events-none opacity-50",
          className
        )}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
        ) : (
          <Upload className="w-4 h-4 text-primary" />
        )}
        <span className="font-medium">{isDragActive ? "Drop file here..." : label}</span>
      </div>
    );
  }

  // Default / Banner Dropzone
  return (
    <div className={cn("space-y-2", className)}>
      {previewUrl ? (
        <div className="relative rounded-xl border border-border overflow-hidden group bg-muted/30 aspect-video max-h-56 flex items-center justify-center">
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <div
              {...getRootProps()}
              className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <input {...getInputProps()} />
              <Upload className="w-3.5 h-3.5" />
              <span>Replace</span>
            </div>
            {onClear && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="px-3 py-1.5 rounded-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-semibold cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed border-border hover:border-primary/80 rounded-xl p-6 text-center cursor-pointer transition-all bg-card/60 hover:bg-accent/40 flex flex-col items-center justify-center gap-2.5",
            isDragActive && "border-primary bg-primary/10 ring-2 ring-primary/20",
            isDragReject && "border-destructive bg-destructive/10",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-xs">
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">
              {isDragActive ? "Drop file to upload now" : label}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{sublabel}</p>
          </div>
        </div>
      )}
    </div>
  );
}
