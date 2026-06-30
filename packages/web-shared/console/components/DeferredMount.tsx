"use client";

/**
 * Defers mounting its children until they scroll near the viewport. Used to
 * keep heavy below-the-fold client widgets (recharts ResponsiveContainers) off
 * the initial hydration/main-thread path on the estate dashboard, where ~10
 * charts otherwise all mount at once and make the page feel sluggish.
 *
 * Renders a same-height placeholder before mounting so there is no layout shift
 * and no SSR/CSR hydration mismatch (server and first client render both show
 * the placeholder; children swap in after the IntersectionObserver fires).
 */
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function DeferredMount({
  children,
  minHeight = 260,
  rootMargin = "400px",
}: {
  children: ReactNode;
  /** Placeholder height (px) reserved before the children mount. */
  minHeight?: number;
  /** How far ahead of the viewport to start mounting. */
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver (very old/SSR-only env): mount immediately.
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  );
}
