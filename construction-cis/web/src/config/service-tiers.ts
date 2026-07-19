import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

/**
 * Service tiers for Trade Tax Specialists.
 * Services match exactly what is covered on /services — no invented services.
 * CTA routes: DIY tier → /calculators (live tool gallery), others → /contact.
 */
export const serviceTiers: ServiceTier[] = [
  {
    name: "DIY",
    description:
      "Use our free CIS calculators to estimate your refund, check GPS eligibility and work out your take-home pay. No obligation.",
    features: [
      "CIS refund estimator",
      "Gross payment status eligibility checker",
      "Take-home pay calculator",
      "CIS deduction and invoice splitter tools",
      "12 free calculators in total",
      "No account needed",
    ],
    cta: "Open free calculators",
    ctaHref: "/calculators",
  },
  {
    name: "Assisted",
    description:
      "We review your CIS position and file your Self Assessment return, making sure every allowable expense is claimed.",
    features: [
      "CIS deduction history review",
      "Self Assessment return prepared and filed",
      "Materials split verified across deduction slips",
      "Mileage at 55p per mile (from April 2026)",
      "Tools, van costs and PPE claimed",
      "Fixed fee, quoted before we start",
    ],
    cta: "Get a free call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Done for you",
    description:
      "Full ongoing CIS accounting: contractor returns, GPS application and maintenance, limited company EPS reclaims and MTD compliance.",
    features: [
      "Monthly CIS300 contractor returns",
      "Nil returns from April 2026 (mandatory)",
      "GPS application and compliance maintenance",
      "EPS real-time reclaim for limited companies",
      "VAT domestic reverse charge advice",
      "MTD ITSA quarterly submissions",
      "Annual accounts and Corporation Tax (CT600)",
    ],
    cta: "Talk to us",
    ctaHref: "/contact",
  },
];

/**
 * Stats for StatsBar.
 * Verification notes:
 * - "12 free calculators" — 12 entries in src/lib/calculators/registry.ts GENERIC array.
 * - "7 specialist services" — 7 service cards in src/app/services/page.tsx services array.
 * - "57+ guides" — site memory notes ~57 posts; also visible in blog content files.
 * - "24h response" — stated on homepage keyStats, /contact, /cis-refund, /gross-payment-status pages.
 */
export const siteStats: StatItemConfig[] = [
  { icon: "🧮", value: "12", label: "Free CIS calculators" },
  { icon: "📋", value: "7", label: "Specialist services" },
  { icon: "📖", value: "57+", label: "CIS guides and articles" },
  { icon: "⚡", value: "24h", label: "Response guarantee" },
];
