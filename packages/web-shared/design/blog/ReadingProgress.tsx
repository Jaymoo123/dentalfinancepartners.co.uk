"use client";

import { useState, useEffect } from "react";

/**
 * `className` is appended LAST to the bar's own classes, so a host can move it
 * off `top-0` (`"top-16"`) or below a sticky header's stacking context
 * (`"z-30"`) without a local fork. Unset = the exact class string this
 * component always rendered, so every existing caller is byte-identical
 * (2026-09-29). The bar is `fixed`, so it paints over a `sticky top-0 z-40`
 * kit header's top edge unless the host says otherwise.
 */
export function ReadingProgress({ className = "" }: { className?: string } = {}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-1 bg-[var(--border)] z-50${className ? ` ${className}` : ""}`}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-[var(--primary,var(--brand-primary,#0f172a))] transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
