"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { btnPrimary } from "./layout-utils";
import { niche } from "@/config/niche-loader";
import { useIntent, trackPersonalization } from "@/components/intent/IntentProvider";

type StickyCTAProps = {
  href?: string;
  primary?: string;
  secondary?: string;
  buttonLabel?: string;
};

export function StickyCTA({
  href = "/contact",
  primary,
  secondary,
  buttonLabel,
}: StickyCTAProps = {}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const action = useIntent("sticky_cta");
  const shownRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 30 && !dismissed) {
        setVisible(true);
      } else if (scrollPercent <= 30) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  // Log a personalization impression the first time a tailored sticky shows.
  useEffect(() => {
    if (visible && action && !shownRef.current) {
      shownRef.current = true;
      trackPersonalization("shown", action);
    }
  }, [visible, action]);

  if (dismissed) return null;

  // Intent-tailored copy + destination (in-place swap, no layout shift). Falls
  // back to the generic niche CTA when the page has no topic.
  const useCalc = !!action && action.variant !== "escalate" && !!action.calculatorSlug;
  const ctaHref = action ? (useCalc ? `/calculators/${action.calculatorSlug}` : "/contact") : href;
  const primaryText = action ? action.ctaCopy : (primary ?? niche.cta.sticky_primary);
  const secondaryText = secondary ?? niche.cta.sticky_secondary;
  const button = action ? (useCalc ? "Open the calculator" : niche.cta.sticky_button) : (buttonLabel ?? niche.cta.sticky_button);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform border-t-4 border-emerald-600 bg-slate-900 shadow-2xl transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1 border-l-2 border-emerald-600 pl-3 sm:pl-4">
          <p className="text-xs sm:text-sm font-bold text-white lg:text-base">
            {primaryText}
          </p>
          <p className="mt-0.5 hidden text-xs text-slate-300 sm:block">
            {secondaryText}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={ctaHref}
            data-cta="sticky_cta"
            data-cta-placement="sticky"
            onClick={() => action && trackPersonalization("clicked", action)}
            className={`${btnPrimary} text-xs sm:text-sm bg-emerald-600 border-emerald-800 px-4 py-2 sm:px-6 sm:py-3 min-h-[44px] flex items-center`}
          >
            {button}
          </Link>
          <button
            onClick={() => setDismissed(true)}
            data-cta="sticky_cta_close"
            data-cta-placement="sticky"
            className="flex h-11 w-11 items-center justify-center text-slate-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg flex-shrink-0"
            aria-label="Dismiss"
            type="button"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
