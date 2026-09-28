"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { btnPrimary } from "./layout-utils";
import { niche } from "@/config/niche-loader";

// ponytail: no intent-engine personalisation (phase 1, not built on this site
// yet); generic niche.config.json cta copy only, same shape as Property's
// fallback path.
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 30 && !dismissed) setVisible(true);
      else if (scrollPercent <= 30) setVisible(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform border-t-4 border-[#0f3a4a] bg-neutral-900 shadow-2xl transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <div className="min-w-0 flex-1 border-l-2 border-[#0f3a4a] pl-3 sm:pl-4">
          <p className="text-xs font-bold text-white sm:text-sm lg:text-base">{niche.cta.sticky_primary}</p>
          <p className="mt-0.5 hidden text-xs text-neutral-300 sm:block">{niche.cta.sticky_secondary}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            data-cta="sticky_cta"
            data-cta-placement="sticky"
            className={`${btnPrimary} flex min-h-[44px] items-center px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm`}
          >
            {niche.cta.sticky_button}
          </Link>
          <button
            onClick={() => setDismissed(true)}
            data-cta="sticky_cta_close"
            data-cta-placement="sticky"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0f3a4a] focus:ring-offset-2 focus:ring-offset-neutral-900"
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
