import Link from "next/link";

/**
 * Config-driven service-tier cards, extracted from Property's
 * ServiceTiers.tsx (Property stays frozen; this is a parameterised copy).
 * --brand-primary-ground: OPTIONAL per-site override for the two places the
 * brand colour is a GROUND under white text (the "Most popular" badge and the
 * featured tier CTA). Falls back to --brand-primary, so every site that does
 * not define it renders byte-identically, Property included. It exists because
 * a mid-tone brand hex can pass the 3:1 graphics floor and fail the 4.5:1 text
 * floor underneath a white label: Medical's copper #b87333 measures 3.79 that
 * way, and the featured CTA is the primary conversion button on / and /services.
 *
 * Brand colour comes from the per-site `--brand-primary` CSS token,
 * matching the MiniCapture extraction pattern (ec38f821).
 */
export interface ServiceTier {
  name: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
}

export interface ServiceTiersProps {
  tiers: ServiceTier[];
  /**
   * Badge text on the featured tier. Pass "" to keep the featured tier's
   * emphasis (its CTA colour and border) while suppressing the badge itself:
   * a site that publishes no pricing has no "most popular" plan to badge, but
   * still needs one leading call to action.
   */
  featuredBadge?: string;
}

export function ServiceTiers({ tiers, featuredBadge = "Most Popular" }: ServiceTiersProps) {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-3 items-start">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col bg-white border-2 transition-all h-full ${
            tier.featured
              ? "border-[var(--brand-primary)] shadow-lg md:scale-105"
              : "border-slate-200 hover:border-[var(--brand-primary)] hover:shadow-md"
          }`}
        >
          {tier.featured && featuredBadge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-[var(--brand-primary-ground,var(--brand-primary))] px-4 sm:px-6 py-1.5 text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
                {featuredBadge}
              </div>
            </div>
          )}
          <div className={`p-6 sm:p-8 flex flex-col h-full ${tier.featured ? "pt-8 sm:pt-10" : ""}`}>
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{tier.name}</div>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">{tier.description}</p>
            </div>
            <ul className="flex-1 space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-700">
                  <span className="text-[var(--brand-primary)] font-bold flex-shrink-0 text-base sm:text-lg">✓</span>
                  <span className={feature.endsWith(":") ? "font-bold text-slate-900" : ""}>{feature}</span>
                </li>
              ))}
            </ul>
            {/*
              These three tier CTAs are conversion buttons and shipped with NO
              focus-visible outline at all, so a keyboard user could not see
              which one they were on. Found by an adversarial review on
              ecommerce; invisible to the design-port kit-adoption gate because
              that row only greps a site's own src, and this is a legacy shared
              component outside design/.

              The ring reads --kit-focus-ring, the same property the kit's own
              design/layout-utils.ts uses, falling back to --color-primary-600
              so a site that has not opted in renders a ring where it had none
              rather than changing anything it already had. offset-2 paints the
              ring on the section ground, which is white or slate-50 wherever
              this component is mounted, so the light value is correct.

              Property is unaffected: it runs its own fork at
              Property/web/src/components/property/ServiceTiers.tsx and imports
              this file nowhere.
            */}
            <Link
              href={tier.ctaHref}
              className={`w-full text-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold transition-all border-t-4 mt-auto min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--kit-focus-ring,var(--color-primary-600))] ${
                tier.featured
                  ? "bg-[var(--brand-primary-ground,var(--brand-primary))] border-black/25 text-white hover:opacity-90 active:border-t-2 active:translate-y-0.5"
                  : "bg-slate-50 border-slate-300 text-slate-900 hover:bg-slate-100 hover:border-[var(--brand-primary)] active:border-t-2 active:translate-y-0.5"
              }`}
            >
              {tier.cta}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
