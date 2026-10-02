import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

/**
 * Service tiers for Probate Compass. Real copy from copy-staging/core/service-tiers.md.
 */
export const serviceTiers: ServiceTier[] = [
  {
    name: "Free tools and guides",
    description:
      "For anyone, at any stage. No sign-up, no catch. Our calculators estimate inheritance tax, check your nil rate bands, project probate costs and test your exposure to the April 2027 pension changes, all using current 2026/27 HMRC figures with the working shown. Alongside them sit plain-English guides to probate, wills and estate planning, written from gov.uk, HMRC and HMCTS sources and dated so you know they are current.",
    features: [
      "Inheritance tax and nil rate band calculators",
      "Probate cost estimator",
      "2027 pension exposure checker",
      "Plain-English guides, dated and sourced",
      "Free for everyone, always",
    ],
    cta: "Use the free calculators",
    ctaHref: "/calculators",
  },
  {
    name: "Help from one of our specialists",
    description:
      "For when your situation needs professional hands. Blended families, business assets, cross-border estates, contested wills, estates near or over the tax thresholds. Tell us about your situation and one of our estate planning specialists suited to it will take a look. No cold calls, and you remain free to walk away at any stage.",
    features: [
      "One of our own estate planning specialists",
      "Probate, estate planning or inheritance tax, whichever you need",
      "Free first conversation, no obligation",
      "No obligation to proceed",
    ],
    cta: "Speak to a specialist",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Ongoing estate planning support",
    description:
      "For estates that need attention over time, not just once. Rules change and families change. With our team, you can put in place periodic reviews of wills and estate structure, updates when legislation moves, and a standing relationship so your family already knows who to call. Where a solicitor is needed for the legal side, we work alongside a regulated firm and stay on the money side.",
    features: [
      "Periodic reviews of wills and estate structure",
      "Updates when legislation changes",
      "A standing relationship with our team",
      "You choose if and when to proceed",
    ],
    cta: "Talk to us",
    ctaHref: "/contact",
  },
];

/**
 * Stats for StatsBar. Reflects the live 7-tool calculator fleet.
 */
export const siteStats: StatItemConfig[] = [
  { icon: "🧮", value: "7", label: "Free probate and IHT calculators" },
  { icon: "📋", value: "3", label: "Ways we can help" },
  { icon: "📖", value: "gov.uk, HMRC, HMCTS", label: "Sources for every guide" },
  { icon: "⚡", value: "2027", label: "Pension IHT changes covered" },
];
