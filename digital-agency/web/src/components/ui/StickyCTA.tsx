"use client";

/**
 * Intent-aware sticky CTA bar for Agency Founder Finance.
 *
 * Hardening (parity with estate template):
 *  - data-cta="sticky_cta" + data-cta-placement="sticky" for event attribution.
 *  - z-50 (above standard content, below modals at z-[60]).
 *  - Shown-impression guard: personalization_shown fires exactly once per rule
 *    per page view, only while the bar is actually painted.
 *  - Storage key aff_sticky_dismissed (FROZEN prefix).
 *  - Target: /free-health-check (converts; kept per spec).
 *  - Personalised copy when intent resolves a topic; falls back to niche.cta.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { btnPrimary } from "./layout-utils";
import { niche } from "@/config/niche-loader";
import { useIntent, trackPersonalization } from "@/components/intent/IntentProvider";

const DISMISS_KEY = "aff_sticky_dismissed";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const shownRuleRef = useRef<string | null>(null);
  const action = useIntent("sticky_cta");

  // Restore persisted dismissal.
  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setVisible(scrollPercent > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  // Shown-impression guard: fire personalization_shown exactly once per rule
  // change and only while the bar is painted.
  useEffect(() => {
    if (!visible || dismissed || !action) return;
    if (shownRuleRef.current === action.ruleId) return;
    shownRuleRef.current = action.ruleId;
    trackPersonalization("shown", action);
  }, [visible, dismissed, action]);

  if (dismissed) return null;

  const primaryText = action?.offer.title ?? niche.cta.sticky_primary;
  const secondaryText = niche.cta.sticky_secondary;
  const href = action?.offer.href ?? "/free-health-check";
  const buttonLabel = niche.cta.sticky_button;

  return (
    <div
      data-cta="sticky_cta"
      data-cta-placement="sticky"
      className={`fixed bottom-0 left-0 right-0 z-50 transform border-t-4 border-indigo-600 bg-slate-900 shadow-2xl transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1 border-l-2 border-indigo-600 pl-3 sm:pl-4">
          <p className="text-xs sm:text-sm font-bold text-white lg:text-base">
            {primaryText}
          </p>
          <p className="mt-0.5 hidden text-xs text-slate-300 sm:block">
            {secondaryText}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={href}
            data-cta="sticky_cta"
            data-cta-goal="form"
            onClick={() => {
              if (action) trackPersonalization("clicked", action);
            }}
            className={`${btnPrimary} text-xs sm:text-sm bg-indigo-600 border-indigo-800 px-4 py-2 sm:px-6 sm:py-3 min-h-[44px] flex items-center`}
          >
            {buttonLabel}
          </Link>
          <button
            onClick={() => {
              try {
                window.localStorage.setItem(DISMISS_KEY, "1");
              } catch {
                /* ignore */
              }
              setDismissed(true);
              if (action) trackPersonalization("dismissed", action);
            }}
            className="flex h-11 w-11 items-center justify-center text-slate-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg flex-shrink-0"
            aria-label="Dismiss"
            type="button"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
