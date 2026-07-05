/**
 * Inline calculator promo card, generalist blog.
 *
 * Formerly the calc_promo_inline experiment. CONCLUDED 2026-07-05 (estate
 * experiments wind-down): treatment locked in for every reader. Final read:
 * control 509 sessions with zero promo clicks and zero conversions; treatment
 * 460 sessions with 2 clicks and 2 converted sessions. Directional rather than
 * significant at this traffic, but control produced literally nothing, so the
 * card ships hardcoded. Instrumentation now rides the standard data-cta click
 * tracking (no experiment envelope).
 *
 * Mount point: injected by BlogPostRenderer after the key-takeaways / summary
 * section, before the article body prose. Post-first-content, so appearance
 * causes no layout shift for readers who have not yet scrolled.
 */

import Link from "next/link";
import { btnPrimary } from "@/components/ui/layout-utils";

export function CalcPromoCard() {
  return (
    <aside
      className="my-8 not-prose rounded-lg border border-orange-200 bg-[#fafaf7] p-6 sm:p-7"
      aria-label="Try our free calculators"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-orange-600">
        Free tool
      </p>
      <h2 className="mt-2 text-xl font-bold leading-snug text-neutral-900 sm:text-2xl">
        Check your numbers in 60 seconds
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        Our free calculators cover take-home pay, employer NI, pension
        optimisation, VAT schemes, R&amp;D credits and more. No sign-up
        required.
      </p>
      <div className="mt-5">
        <Link
          href="/calculators"
          className={btnPrimary}
          data-cta="calc_promo_inline"
          data-cta-placement="blog_inline"
          data-cta-goal="calculator"
        >
          Try the calculators
        </Link>
      </div>
    </aside>
  );
}
