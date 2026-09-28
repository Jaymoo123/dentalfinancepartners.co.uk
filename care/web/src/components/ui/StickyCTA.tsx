"use client";

/**
 * StickyCTA -- persistent dismissable bottom bar, mounted on the homepage only
 * (Property mounts it the same way, see Property/web/src/app/page.tsx).
 *
 * ponytail: no IntentProvider/personalisation dependency -- care has neither
 * component, and the intent engine is out of scope for phase 0 (brief:
 * "the chat widget and intent engine are phase 1, skip them"). This is the
 * scroll-threshold + dismiss pattern only, reading copy straight from
 * niche.config.json `cta`.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { btnPrimary } from "./layout-utils";
import { niche } from "@/config/niche-loader";

const SCROLL_THRESHOLD_PERCENT = 30;

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPercent =
        (window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setVisible(scrollPercent > SCROLL_THRESHOLD_PERCENT);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Talk to a care sector accounts specialist"
      className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-[var(--brand-primary)] bg-[#2b2540] shadow-2xl"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{niche.cta.sticky_primary}</p>
          <p className="mt-0.5 hidden text-xs leading-snug text-white/70 sm:block">
            {niche.cta.sticky_secondary}
          </p>
        </div>
        <Link
          href="/contact"
          data-cta="sticky_cta"
          data-cta-placement="sticky"
          className={`${btnPrimary} shrink-0 whitespace-nowrap`}
        >
          {niche.cta.sticky_button}
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="shrink-0 rounded p-1 text-white/50 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
        >
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
