"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  TableFooter,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface DataTablePaginationProps {
  page: number;
  limit?: number;
  total: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  colSpan?: number;
  asFooter?: boolean;
  className?: string;
}

export function DataTablePagination({
  page,
  limit,
  total,
  totalPages,
  onPageChange,
  colSpan = 10,
  asFooter = false,
  className,
}: DataTablePaginationProps) {
  const maxPages = Math.max(totalPages, 1);
  const startItem = total === 0 ? 0 : limit ? (page - 1) * limit + 1 : (page - 1) * 10 + 1;
  const endItem = limit ? Math.min(page * limit, total) : total;

  // Generate page numbers with ellipsis windowing
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (maxPages <= 5) {
      for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) {
        pages.push("ellipsis");
      }
      const start = Math.max(2, page - 1);
      const end = Math.min(maxPages - 1, page + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (page < maxPages - 2) {
        pages.push("ellipsis");
      }
      pages.push(maxPages);
    }
    return pages;
  };

  const paginationControls = (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-card border-t border-border text-xs text-muted-foreground select-none",
        className
      )}
    >
      {/* Records Count */}
      <div className="flex items-center gap-2">
        <span>
          Showing{" "}
          <strong className="text-foreground font-mono font-medium">
            {limit ? `${startItem}-${endItem}` : total}
          </strong>{" "}
          of{" "}
          <strong className="text-foreground font-mono font-medium">{total}</strong> records
        </span>
      </div>

      {/* Shadcn Pagination Controls */}
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <span className="text-[11px] font-mono text-muted-foreground mr-2 hidden md:inline-block">
          Page <strong className="text-foreground">{page}</strong> of{" "}
          <strong className="text-foreground">{maxPages}</strong>
        </span>

        <Pagination className="w-auto mx-0">
          <PaginationContent className="gap-1">
            {/* Previous Page */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                text=""
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) onPageChange(page - 1);
                }}
                className={cn(
                  "h-7 w-7 p-0 justify-center rounded bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted",
                  page <= 1 && "pointer-events-none opacity-30"
                )}
              />
            </PaginationItem>

            {/* Dynamic Pages */}
            {getPageNumbers().map((p, idx) => (
              <PaginationItem key={idx}>
                {p === "ellipsis" ? (
                  <PaginationEllipsis className="h-7 w-7 text-muted-foreground" />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(p);
                    }}
                    className={cn(
                      "min-w-7 h-7 px-2 text-[11px] font-mono font-medium rounded cursor-pointer",
                      p === page
                        ? "bg-primary text-primary-foreground font-bold hover:bg-primary/90 border-transparent"
                        : "bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {p}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {/* Next Page */}
            <PaginationItem>
              <PaginationNext
                href="#"
                text=""
                onClick={(e) => {
                  e.preventDefault();
                  if (page < maxPages) onPageChange(page + 1);
                }}
                className={cn(
                  "h-7 w-7 p-0 justify-center rounded bg-background border border-border text-muted-foreground hover:text-foreground hover:bg-muted",
                  page >= maxPages && "pointer-events-none opacity-30"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );

  if (asFooter) {
    return (
      <TableFooter className="bg-transparent border-t-0 p-0">
        <TableRow className="hover:bg-transparent border-none">
          <TableCell colSpan={colSpan} className="p-0 border-none">
            {paginationControls}
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  }

  return paginationControls;
}
