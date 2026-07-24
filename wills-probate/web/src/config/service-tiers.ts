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
    name: "Guided handoff to a specialist",
    description:
      "For when your situation needs professional hands. Blended families, business assets, cross-border estates, contested wills, estates near or over the tax thresholds. Tell us about your situation and we will connect you with a vetted specialist firm suited to it. Your details are shared only with your consent, and you remain free to walk away at any stage.",
    features: [
      "Matched to a vetted specialist firm",
      "Wills and probate practitioners, estate planners or tax specialists as needed",
      "Shared only with your consent",
      "No obligation to proceed",
    ],
    cta: "Get connected with a specialist",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Ongoing estate planning support via partners",
    description:
      "For estates that need attention over time, not just once. Rules change and families change. Through our partner firms, you can put in place periodic reviews of wills and estate structure, updates when legislation moves, and a standing relationship so your family already knows who to call. We provide the information and the introductions; the professional work sits with the specialist firm you choose.",
    features: [
      "Periodic reviews of wills and estate structure",
      "Updates when legislation changes",
      "A standing relationship with a specialist firm",
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
