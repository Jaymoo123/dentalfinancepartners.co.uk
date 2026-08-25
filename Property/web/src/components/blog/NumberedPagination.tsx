"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { focusRing } from "@/components/ui/layout-utils";

/**
 * Shared numbered pagination bar: First / prev / a sliding window of five page
 * numbers centred on the current page / next / Last, with a "Page N of M"
 * caption. Used by the /blog archive and the category hub article grids so the
 * two cannot drift. End controls dim rather than disappear, so the row does
 * not jump around as the reader navigates.
 */
export function NumberedPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const windowStart = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const pageWindow = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => windowStart + i
  );

  const base = `inline-flex items-center justify-center min-h-12 rounded-xl border-2 font-medium transition-colors active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${focusRing}`;
  const idle =
    "border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 disabled:hover:border-[var(--border)] disabled:hover:bg-[var(--surface)]";

  return (
    <nav aria-label="Pagination">
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${base} px-4 ${idle}`}
        >
          First
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={`${base} w-12 ${idle}`}
        >
          <ChevronLeft aria-hidden className="h-5 w-5" />
        </button>
        {pageWindow.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            aria-label={`Page ${page}`}
            className={`${base} w-12 ${
              page === currentPage
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : idle
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={`${base} w-12 ${idle}`}
        >
          <ChevronRight aria-hidden className="h-5 w-5" />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`${base} px-4 ${idle}`}
        >
          Last
        </button>
      </div>
      <p className="mt-3 text-center text-sm text-[var(--muted)]">
        Page {currentPage} of {totalPages}
      </p>
    </nav>
  );
}
