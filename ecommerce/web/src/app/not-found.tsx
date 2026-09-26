import Link from "next/link";
import { btnPrimary, sectionY, contentNarrow } from "@/components/ui/layout-utils";

/**
 * Already on the standard before this phase: `contentNarrow`, `sectionY` and
 * `btnPrimary` all come from src/components/ui/layout-utils.ts, which
 * re-exports the first two verbatim from
 * packages/web-shared/design/layout-utils.ts. Nothing here is restyled.
 *
 * Renders inside the root layout, so it keeps the kit chrome (header, footer,
 * skip link, the single <main id="main">) via PageShell. No breadcrumb: this
 * page answers an arbitrary unmatched URL and has no position in the tree to
 * assert. No `.ground-dark`: the ground is white and the light --focus-ring
 * default is the correct one. text-neutral-500 on white measures 4.73, past
 * the 4.5 floor, so the small print is left alone.
 *
 * ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx - its
 * docblock scopes it to /thank-you, /book and /complete.
 * ADOPTION DECLINED: packages/web-shared/design/primitives/NoticeCard.tsx - a
 * 404 is a dead end, not an outcome state carrying a next step, and the
 * component would wrap the one CTA in a panel with no added information.
 * ADOPTION DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx,
 * marketing/LeadCTAPanel.tsx, marketing/TestimonialsSection.tsx,
 * marketing/WhatToExpectCard.tsx and marketing/StatsCounter.tsx - banned for
 * this port (an interruption, an owner-gated lead surface, another site's
 * quotes, a fee line in its default props, and a citation-free single number).
 */
export default function NotFound() {
  return (
    <div className={`${contentNarrow} ${sectionY} text-center`}>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-base leading-relaxed text-neutral-500">
        The page you requested does not exist or has moved.
      </p>
      <p className="mt-8 flex justify-center">
        <Link href="/" className={`${btnPrimary} w-full max-w-xs sm:w-auto`}>
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
