"use client";

/**
 * StickyCTA -- persistent dismissable bottom bar, mounted site-wide via PageShell.
 *
 * Wave-3 CRO parity: intent-aware personalisation is ON unconditionally. The
 * legacy scroll-30% stub is replaced with the wave-1/2 intent-aware pattern.
 *
 * Visibility rules:
 *  - Hidden until the user has scrolled ~500 px (or ~25% of page height).
 *  - Dismissable; persisted to sessionStorage so it stays hidden for the session.
 *  - Hidden on /admin and /embed routes.
 *  - Hidden if the visitor has already converted (shared visitMemory helper).
 *  - SSR-safe: renders nothing until mounted (no hydration mismatch).
 *
 * Storage key: ma_sticky_dismissed (ma prefix FROZEN).
 * Styled with Medical Accountants UK navy/copper brand tokens.
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { niche } from "@/config/niche-loader";
import { btnPrimary } from "@/components/ui/layout-utils";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { useIntent, trackPersonalization } from "@/components/intent/IntentProvider";

const DISMISS_KEY = "ma_sticky_dismissed";
const SCROLL_THRESHOLD = 500;

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      /* private-browsing: treat as not dismissed */
    }
  }, [mounted]);

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
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  const isExcludedRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/embed");

  // Count the personalised impression exactly once per rule.
  const shownRuleRef = useRef<string | null>(null);
  const painted =
    mounted && !isExcludedRoute && !dismissed && visible && !isConverted();
  useEffect(() => {
    if (!painted || !intentAction) return;
    if (shownRuleRef.current === intentAction.ruleId) return;
    shownRuleRef.current = intentAction.ruleId;
    trackPersonalization("shown", intentAction);
  }, [painted, intentAction]);

  if (!mounted) return null;
  if (isExcludedRoute) return null;
  if (dismissed) return null;
  if (!visible) return null;
  if (isConverted()) return null;

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
      /* sessionStorage blocked */
    }
  }

  return (
    <div
      role="region"
      aria-label="Talk to a specialist medical accountant"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--navy)] shadow-2xl"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {offer.primary}
          </p>
          <p className="mt-0.5 hidden text-xs leading-snug text-white/70 sm:block">
            {offer.secondary}
          </p>
        </div>

        <a
          href={offer.href}
          data-cta="sticky_cta"
          data-cta-placement="sticky"
          data-cta-goal={offer.href.startsWith("/contact") ? "form" : undefined}
          onClick={() => {
            if (intentAction) trackPersonalization("clicked", intentAction);
          }}
          className={`${btnPrimary} shrink-0 whitespace-nowrap`}
        >
          {offer.label}
        </a>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded p-1 text-white/50 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--copper)]"
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
