import Link from "next/link";

/**
 * Small end-of-article pricing promo (pkg_pricing_v1 blog surface).
 *
 * Server-component-safe: a plain card + link, no client JS. The click is
 * captured by the sites' data-cta auto-capture as cta_click with
 * cta=pricing_promo, so the blog surface is measurable against the nav and
 * homepage placements without new event names.
 */
export function PricingPromoCard({
  fromPrice,
  blurb,
  headline = "Fixed monthly accounting",
}: {
  /** Display price of the cheapest tier, e.g. "£24". */
  fromPrice: string;
  /** One line of niche-appropriate copy. */
  blurb: string;
  headline?: string;
}) {
  return (
    <aside className="my-10 rounded-2xl border-l-4 border-[var(--brand-primary)] bg-slate-50 p-6 sm:p-8">
      <p className="text-lg font-bold text-slate-900 sm:text-xl">
        {headline}, from {fromPrice} + VAT a month
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{blurb}</p>
      <Link
        href="/pricing"
        data-cta="pricing_promo"
        data-cta-placement="blog_post"
        data-cta-goal="pricing"
        className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[var(--brand-primary)] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:opacity-90"
      >
        See pricing
      </Link>
    </aside>
  );
}
