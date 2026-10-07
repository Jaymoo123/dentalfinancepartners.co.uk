"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { btnPrimary, focusRing } from "./layout-utils";
import { niche } from "@/config/niche-loader";
import { isConverted } from "@accounting-network/web-shared/analytics/visitMemory";
import { useIntent, trackPersonalization } from "@accounting-network/web-shared/support/IntentProvider";
import { ruleLabel } from "@/lib/intent/labels";

const DISMISS_KEY = "pfp_sticky_dismissed";

/**
 * Persistent bottom bar. W7 adds four things to the phase-1 bar and changes
 * none of its copy, layout or ids:
 *
 * 1. INTENT. The bar reads the kit's `useIntent("sticky_cta")` and, for a
 *    visitor with a clear topic, swaps in that topic's offer (its calculator,
 *    or a review when the topic has no calculator). The swap is gated on
 *    `visible`, which can only be true AFTER a client scroll event, so the
 *    SERVER HTML always carries the generic offer. That is deliberate: the
 *    `sticky_cta|sticky|null` and `sticky_cta_close|sticky|null` triples in
 *    cta_baseline.json are recorded from server HTML on all 55 routes (href
 *    included, T22), and a personalised href in the SSR markup would move them.
 *    No `data-cta-goal` is emitted on either control, for the same reason.
 * 2. DISMISSAL PERSISTS for the session (`pfp_sticky_dismissed`), instead of
 *    coming back on every route change.
 * 3. CONVERTED visitors never see it (shared visitMemory helper), and it no-ops
 *    on /embed/* and /admin/* in its own right, not only through PageShell.
 * 4. FOOTER OVERLAP (R1 serious). The fixed bar used to sit on top of the last
 *    footer row, which holds the site's only consent control, at 390 and 1440.
 *    The bar now slides down while the footer is in the viewport. Same
 *    IntersectionObserver-on-`footer` mechanism the kit widget uses for the
 *    same defect (packages/web-shared/support/SpecialistWidget.tsx:141-195);
 *    the widget LIFTS because its launcher must stay keyboard-reachable, while
 *    this bar is full-width and cannot be lifted clear, so it retreats. It
 *    stays in the DOM, as it already did when unscrolled, so the server-HTML
 *    CTA census is unaffected.
 *
 * 5. MUTUAL EXCLUSION (R2 B2). While the deep-scroll modal is open it sets
 *    `data-surface-open` on <html>, and the one rule in layout.tsx's capture
 *    region hides `.capture-sticky` (this bar) and `.capture-widget` (the kit
 *    widget mount) for as long as it is set, so one offer is published at a
 *    time. The bar is also already suppressed whenever a returning-bar offer
 *    exists (`returning`, below).
 *
 * The impression guard (`shownRuleRef`) fires `personalization_shown` exactly
 * once per rule and only while the bar is actually painted, so the sticky
 * funnel has a denominator. Shape from
 * generalist/web/src/components/ui/StickyCTA.tsx:99-108.
 */
export function StickyCTA() {
  const pathname = usePathname() || "";
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  // B1 (R2): at 390 the personalised heading ("Check what a pharmacy purchase
  // looks like on your numbers") wrapped one word per line beside a button that
  // does not shrink, taking the bar to 188px (21% of a 390x900 viewport) and
  // putting the kit launcher (bottom-24 = 96px) inside the bar's rectangle. The
  // personalised offer is therefore gated on >=640 as well as on `visible`: a
  // narrow bar renders exactly the pre-wave generic copy, so its height is the
  // pre-wave height (border 4 + py-3 x2 + the 44px button = 72px), which the
  // launcher's 96px offset clears. The heading is also clamped to one line, so
  // no future copy can grow the bar either.
  const [wide, setWide] = useState(false);
  const action = useIntent("sticky_cta");
  // ponytail: a returning greeting and this bar both paint the bottom edge, so
  // while the returning bar has an offer this bar stands down for the page
  // load, dismissed or not. Ceiling: a visitor who dismisses the greeting does
  // not get the sticky bar back until the next page. Upgrade path if that
  // matters: share the dismissal through the kit provider rather than guessing.
  const returning = useIntent("returning_bar");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      /* private browsing: in-memory dismissal only */
    }
  }, []);

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

  // Footer overlap: retreat while the footer is on screen, so the footer's
  // bottom row (the consent control) is never covered.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const bare = pathname.startsWith("/embed") || pathname.startsWith("/admin");
  const painted = visible && !footerInView && !dismissed && !bare && !returning;

  // One personalization_shown per rule, and only while the bar is painted.
  const shownRuleRef = useRef<string | null>(null);
  useEffect(() => {
    if (!painted || !action) return;
    if (shownRuleRef.current === action.ruleId) return;
    shownRuleRef.current = action.ruleId;
    trackPersonalization("shown", action, ruleLabel);
  }, [painted, action]);

  if (dismissed || bare || returning) return null;

  // The offer only swaps in once the bar is on screen (see note 1 above).
  const offer = wide && visible && action && !isConverted() ? action.offer : null;
  const primaryText = offer ? offer.title : niche.cta.sticky_primary;
  const secondaryText = offer ? offer.blurb : niche.cta.sticky_secondary;
  const ctaHref = offer ? offer.href : "/contact";
  const buttonLabel = offer
    ? offer.kind === "tool"
      ? "Open the calculator"
      : "Speak to a pharmacy accountant"
    : niche.cta.sticky_button;

  // P1-C, kept: `ground-dark` rebinds --focus-ring/--kit-focus-ring to white
  // inside this bar (globals.css:226), because the close button's pre-port ring
  // used the brand hex as a literal and measured 1.47 on this dark ground.
  // White on slate-900 is 17.85.
  return (
    <div
      className={`capture-sticky fixed bottom-0 left-0 right-0 z-50 transform ground-dark border-t-4 border-primary-950 bg-slate-900 shadow-2xl transition-transform duration-300 ${
        painted ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <div className="min-w-0 flex-1 border-l-2 border-primary-950 pl-3 sm:pl-4">
          <p className="line-clamp-1 text-xs font-bold text-white sm:text-sm lg:text-base">{primaryText}</p>
          <p className="mt-0.5 hidden text-xs text-slate-300 sm:block">{secondaryText}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={ctaHref}
            data-cta="sticky_cta"
            data-cta-placement="sticky"
            onClick={() => {
              if (offer && action) trackPersonalization("clicked", action, ruleLabel);
            }}
            className={`${btnPrimary} flex min-h-[44px] items-center px-4 py-2 text-xs sm:px-6 sm:py-3 sm:text-sm`}
          >
            {buttonLabel}
          </Link>
          <button
            onClick={() => {
              setDismissed(true);
              try {
                window.sessionStorage.setItem(DISMISS_KEY, "1");
              } catch {
                /* private browsing: in-memory dismissal only */
              }
              if (action) trackPersonalization("dismissed", action, ruleLabel);
            }}
            data-cta="sticky_cta_close"
            data-cta-placement="sticky"
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-white ${focusRing}`}
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
