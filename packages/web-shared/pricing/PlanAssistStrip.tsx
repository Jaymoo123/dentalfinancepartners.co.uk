/**
 * Sales-assist strip for the packages funnel: repositions the free call as the
 * step inside the pricing decision ("not sure which plan?") rather than a
 * competing offer. Rendered below PackagesSection on homepages (packages mode)
 * and below the plan grid on /pricing (both modes).
 *
 * Server-safe (no hooks). Visual language mirrors PackagesSection: slate text,
 * var(--brand-primary) accent, so it inherits each site's brand colour.
 */

const DEFAULT_HEADING = "Not sure which plan fits?";
const DEFAULT_BODY =
  "Book a free 15-minute call and we will recommend the right plan for your situation. No obligation, no hard sell.";
const DEFAULT_LABEL = "Book a 15-minute call";

export function PlanAssistStrip({
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
  linkLabel = DEFAULT_LABEL,
  href = "/contact",
  dataCta,
  ctaVariant,
}: {
  heading?: string;
  body?: string;
  linkLabel?: string;
  href?: string;
  /** Stable analytics id, e.g. "home_assist_call" | "pricing_assist_call". */
  dataCta: string;
  /** Active cta.variant, stamped as data-cta-variant for segmentable CTR. */
  ctaVariant?: string;
}) {
  return (
    <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 px-6 py-6 sm:px-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
      <div className="min-w-0">
        <p className="text-base font-semibold text-slate-900">{heading}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
      </div>
      <a
        href={href}
        data-cta={dataCta}
        data-cta-placement="assist_strip"
        data-cta-goal="contact"
        data-cta-variant={ctaVariant}
        className="mt-4 inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md border-2 border-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] sm:mt-0"
      >
        {linkLabel}
      </a>
    </div>
  );
}
