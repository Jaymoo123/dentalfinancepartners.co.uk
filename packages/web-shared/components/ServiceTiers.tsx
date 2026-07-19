import Link from "next/link";

/**
 * Config-driven service-tier cards, extracted from Property's
 * ServiceTiers.tsx (Property stays frozen; this is a parameterised copy).
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
  /** Badge text on the featured tier. */
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
          {tier.featured && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-[var(--brand-primary)] px-4 sm:px-6 py-1.5 text-xs font-bold text-white uppercase tracking-wider whitespace-nowrap">
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
            <Link
              href={tier.ctaHref}
              className={`w-full text-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold transition-all border-t-4 mt-auto min-h-[44px] flex items-center justify-center ${
                tier.featured
                  ? "bg-[var(--brand-primary)] border-black/25 text-white hover:opacity-90 active:border-t-2 active:translate-y-0.5"
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
