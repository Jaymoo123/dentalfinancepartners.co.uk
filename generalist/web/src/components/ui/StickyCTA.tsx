"use client";

/**
 * StickyCTA -- persistent dismissable bottom bar, mounted site-wide via PageShell.
 *
 * Owner decision (CRO parity programme): intent-aware personalisation is ON
 * unconditionally. The previous no-op stub is replaced with the intent-aware
 * implementation.
 *
 * Visibility rules:
 *  - Hidden until the user has scrolled ~500 px (or ~25% of page height).
 *  - Dismissable; persisted to sessionStorage so it stays hidden for the session.
 *  - Hidden on /admin and /embed routes.
 *  - Hidden if the visitor has already converted (shared visitMemory helper).
 *  - SSR-safe: renders nothing until mounted (no hydration mismatch).
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { niche } from "@/config/niche-loader";
import { btnPrimary } from "@/components/ui/layout-utils";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { useIntent, trackPersonalization } from "@/components/intent/IntentProvider";

const DISMISS_KEY = "hd_sticky_dismissed";
const SCROLL_THRESHOLD = 500; // px

/** Shape kept stable for a future personalisation phase. */
interface StickyOffer {
  primary: string;
  secondary: string;
  href: string;
  label: string;
}

const defaultOffer: StickyOffer = {
  primary: niche.cta.sticky_primary,
  secondary: niche.cta.sticky_secondary,
  href: "/contact",
  label: niche.cta.sticky_button,
};

export function StickyCTA() {
  const pathname = usePathname();
  const intentAction = useIntent("sticky_cta");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Mark mounted after first client render (SSR-safety gate).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Read sessionStorage only after mount to avoid SSR mismatch.
  useEffect(() => {
    if (!mounted) return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      // Private-browsing sessionStorage access denied -- treat as not dismissed.
    }
  }, [mounted]);

  // Scroll listener: show bar once user passes the threshold.
  useEffect(() => {
    if (!mounted) return;

    function onScroll() {
      const threshold = Math.min(
        SCROLL_THRESHOLD,
        document.documentElement.scrollHeight * 0.25,
      );
      if (window.scrollY >= threshold) {
        setVisible(true);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Check immediately in case the page is already scrolled (e.g. back-nav restore).
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // Suppress on specific route prefixes.
  const isExcludedRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/embed");

  // Count the personalised impression exactly once per rule, and only while the
  // bar is actually painted (DeepScrollModal/ReturningBar fire "shown" the same
  // way; without this the sticky funnel has clicks but no denominator).
  const shownRuleRef = useRef<string | null>(null);
  const painted =
    mounted && !isExcludedRoute && !dismissed && visible && !isConverted();
  useEffect(() => {
    if (!painted || !intentAction) return;
    if (shownRuleRef.current === intentAction.ruleId) return;
    shownRuleRef.current = intentAction.ruleId;
    trackPersonalization("shown", intentAction);
  }, [painted, intentAction]);

  // All visibility checks (only evaluated post-mount).
  if (!mounted) return null;
  if (isExcludedRoute) return null;
  if (dismissed) return null;
  if (!visible) return null;
  if (isConverted()) return null;

  // Use the behaviour-matched personalised offer when available (clear topic);
  // fall back to the static default offer for visitors with no topic, or the
  // pre-mount render.
  const offer: StickyOffer = intentAction
    ? {
        primary: intentAction.offer.title,
        secondary: intentAction.offer.blurb,
        href: intentAction.offer.href,
        label:
          intentAction.offer.kind === "tool"
            ? "Open calculator"
            : intentAction.offer.kind === "guide"
              ? "Get free guide"
              : "Book a free call",
      }
    : defaultOffer;

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // sessionStorage blocked -- dismiss is in-memory only for this page load.
    }
  }

  return (
    <div
      role="region"
      aria-label="Talk to a specialist accountant"
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 shadow-2xl"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Copy block */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {offer.primary}
          </p>
          <p className="mt-0.5 hidden text-xs leading-snug text-slate-300 sm:block">
            {offer.secondary}
          </p>
        </div>

        {/* CTA button */}
        <a
          href={offer.href}
          data-cta="sticky_cta"
          data-cta-placement="sticky"
          data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
          onClick={() => { if (intentAction) trackPersonalization("clicked", intentAction); }}
          className={`${btnPrimary} shrink-0 whitespace-nowrap`}
        >
          {offer.label}
        </a>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded p-1 text-slate-400 transition-colors duration-150 hover:bg-slate-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
