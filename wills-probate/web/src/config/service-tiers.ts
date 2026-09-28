import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

/**
 * Service tiers. Real copy from copy-staging/core/service-tiers.md, converted to the firm
 * voice on 2026-09-28 (owner decision: the brand IS the firm).
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
    name: "Our accountants on your estate",
    description:
      "For when the numbers need professional hands. Blended families, business assets, cross-border estates, estates near or over the tax thresholds. Tell us about your situation and one of our accountants takes the money side: the valuations, the inheritance tax position and the estate return. Where the matter also needs a solicitor, we introduce you to a regulated firm we work with. You remain free to walk away at any stage.",
    features: [
      "One of our accountants on the money side",
      "Valuations, inheritance tax and the estate return",
      "A regulated solicitor introduced where the matter needs one",
      "No obligation to proceed",
    ],
    cta: "Tell us about your situation",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Ongoing estate planning support",
    description:
      "For estates that need attention over time, not just once. Rules change and families change. We review the estate and the tax position periodically, tell you when legislation moves the numbers, and stay the standing relationship your family already knows to call. Where the documents themselves need redrafting, we introduce you to a regulated solicitor we work with.",
    features: [
      "Periodic reviews of wills and estate structure",
      "Updates when legislation changes",
      "A standing relationship with your accountant",
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
