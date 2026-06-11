"use client";

/**
 * calc_promo_inline experiment -- generalist blog.
 *
 * Hypothesis: engaged blog readers never discover the calculators (69% of
 * sessions engage with content; roughly 0% reach /calculators). An inline
 * promo card after the first sections will lift calculator visits.
 *
 * treatment: renders a design-system-native promo card linking to /calculators.
 * control:   renders nothing visible but records exposure via an invisible
 *            intersection-observer anchor, so both arms have a denominator.
 *
 * Mount point: injected by BlogPostRenderer after a fixed structural position
 * (after the key-takeaways / summary section, before the article body prose).
 * This is post-first-content, not above-the-fold, so appearance causes no
 * layout shift for readers who have not yet scrolled.
 *
 * RSC safety: this is a "use client" leaf component. BlogPostRenderer passes
 * only serialisable props (strings) -- no functions, no non-serialisable objects.
 */

import Link from "next/link";
import { useExperiment } from "@/lib/experiments";
import {
  useExperimentInView,
  trackExperimentAction,
} from "@accounting-network/web-shared/experiments/react/exposure";
import { btnPrimary } from "@/components/ui/layout-utils";

const EXPERIMENT_KEY = "calc_promo_inline";
const SURFACE = "blog_inline";

export function CalcPromoCard() {
  const variant = useExperiment(EXPERIMENT_KEY);

  // Both arms record exposure when the position scrolls into view.
  // treatment: the card itself is the observable element.
  // control:   a zero-height invisible div at the same position.
  const treatmentRef = useExperimentInView<HTMLElement>(
    variant === "treatment" ? EXPERIMENT_KEY : "",
    SURFACE,
  );
  const controlRef = useExperimentInView<HTMLDivElement>(
    variant === null || variant === "control" ? EXPERIMENT_KEY : "",
    SURFACE,
  );

  if (variant === "treatment") {
    return (
      <aside
        ref={treatmentRef}
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
            onClick={() =>
              trackExperimentAction(EXPERIMENT_KEY, SURFACE)
            }
          >
            Try the calculators
          </Link>
        </div>
      </aside>
    );
  }

  // control + null (first render / SSR): render nothing visible.
  // The invisible anchor still fires experiment_view when scrolled into view,
  // giving the control arm its exposure denominator.
  return (
    <div
      ref={controlRef}
      aria-hidden="true"
      style={{ minHeight: 0, overflow: "hidden" }}
    />
  );
}
