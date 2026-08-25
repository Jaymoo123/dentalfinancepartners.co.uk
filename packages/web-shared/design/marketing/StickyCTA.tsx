"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { btnPrimary } from "../layout-utils";

/** The substantive, behaviour-matched asset a personalised offer promotes. */
type StickyOffer = {
  kind: "tool" | "guide" | "specialist";
  /** headline shown on the surface. */
  title: string;
  /** one-line supporting copy. */
  blurb: string;
  /** where the button goes. */
  href: string;
  /** the behaviour-derived "why you're seeing this" line. */
  reason: string;
};

type StickyCTAProps = {
  /** Fallback CTA destination, shown whenever `offer` is absent. Per-site;
   *  replaces Property's `niche.config.json` `cta.variants[*].sticky.href`
   *  (resolved via `getActiveCta(niche)` in `config/niche-loader.ts`, outside
   *  web-shared). */
  href: string;
  /** Fallback headline, shown whenever `offer` is absent. Per-site; replaces
   *  `cta.variants[*].sticky.primary`. */
  primary: string;
  /** Fallback supporting copy, shown whenever `offer` is absent. Per-site;
   *  replaces `cta.variants[*].sticky.secondary`. */
  secondary: string;
  /** Fallback button label, shown whenever `offer` is absent. Per-site;
   *  replaces `cta.variants[*].sticky.button`. */
  buttonLabel: string;
  /** Tag written to `data-cta-variant` (measurement only, does not affect
   *  render). Per-site; replaces Property's raw `niche.cta.variant`, which is
   *  itself optional there so this stays optional here too. */
  ctaVariant?: string;
  /** True on sites/pages running a pricing-packages CTA model: disables the
   *  personalised `offer` (it would compete with the pricing framing) and
   *  hides the sticky bar entirely on `/pricing`. Per-site; replaces
   *  `isPackagesMode(niche)` from `config/niche-loader.ts`. Defaults to the
   *  more common lead-gen behaviour. */
  packagesMode?: boolean;
  /** Behaviour-matched offer for the current page/visitor (a real asset: a
   *  calculator, a gated guide, or a specialist), swapped in for the fallback
   *  copy above. Per-site; replaces the `offer` field of
   *  `useIntent("sticky_cta")` from Property's `IntentProvider` context
   *  (`components/intent/IntentProvider.tsx`, outside web-shared — the context
   *  itself is not reproduced here, only the value it resolved to). Absent or
   *  null renders the generic, non-tailored version. */
  offer?: StickyOffer | null;
  /** Fires once, the first time a personalised `offer` becomes visible (never
   *  in `packagesMode`). Per-site; replaces the `trackPersonalization("shown",
   *  action)` call Property makes against its own `IntentAction` — the caller
   *  closes over that action and reports it here instead of this component
   *  importing Property's analytics/intent types. */
  onOfferShown?: () => void;
  /** Fires when the CTA link is clicked while showing a personalised `offer`
   *  (never in `packagesMode`). Per-site; replaces
   *  `trackPersonalization("clicked", action)`, same reasoning as
   *  `onOfferShown`. */
  onOfferClick?: () => void;
};

export function StickyCTA({
  href,
  primary,
  secondary,
  buttonLabel,
  ctaVariant,
  packagesMode = false,
  offer = null,
  onOfferShown,
  onOfferClick,
}: StickyCTAProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();
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
    // Packages mode never renders the personalised offer, so don't count it.
    if (visible && offer && !shownRef.current && !packagesMode) {
      shownRef.current = true;
      onOfferShown?.();
    }
  }, [visible, offer, packagesMode, onOfferShown]);

  if (dismissed) return null;
  // Packages mode sends the sticky to /pricing, so never overlay /pricing itself.
  if (packagesMode && pathname.startsWith("/pricing")) return null;

  // Substantive, behaviour-matched offer (in-place swap, no layout shift). The
  // offer points at a REAL asset — the topic's calculator, its gated guide +
  // Excel, or a specialist. Falls back to the generic niche CTA when the page has
  // no topic (or the visitor is in the control arm, where offer is null).
  // Packages mode disables intent offers: they resurface free-guide/free-call
  // framing that competes with the pricing CTA.
  const activeOffer = packagesMode ? null : offer;
  const ctaHref = activeOffer ? activeOffer.href : href;
  const primaryText = activeOffer ? activeOffer.title : primary;
  const secondaryText = activeOffer ? activeOffer.blurb : secondary;
  const button = activeOffer
    ? activeOffer.kind === "tool"
      ? "Open the calculator"
      : activeOffer.kind === "guide"
        ? "Get the free guide"
        : "Talk to a specialist"
    : buttonLabel;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform border-t-4 border-primary-600 bg-slate-900 shadow-2xl transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 sm:gap-4 px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1 border-l-2 border-primary-600 pl-3 sm:pl-4">
          {activeOffer && (
            <p className="mb-0.5 hidden text-[11px] font-semibold uppercase tracking-wide text-primary-400 sm:block">
              {activeOffer.reason}
            </p>
          )}
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
            data-cta-variant={ctaVariant}
            data-cta-goal={ctaHref.startsWith("/contact") ? "form" : undefined}
            onClick={() => !packagesMode && activeOffer && onOfferClick?.()}
            className={`${btnPrimary} text-xs sm:text-sm bg-primary-600 px-4 py-2 sm:px-6 sm:py-3 min-h-[44px] flex items-center`}
          >
            {button}
          </Link>
          <button
            onClick={() => setDismissed(true)}
            data-cta="sticky_cta_close"
            data-cta-placement="sticky"
            className="flex h-11 w-11 items-center justify-center text-slate-400 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg flex-shrink-0"
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
