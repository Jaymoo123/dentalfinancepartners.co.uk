import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

// Services drawn from digital-agency/web/src/app/services/page.tsx (6 named services).
// DIY tier CTA: /calculators (route exists at src/app/calculators/).
// Other CTAs: /contact.
export const serviceTiers: ServiceTier[] = [
  {
    name: "Self-serve",
    description:
      "Use our free calculators to model your salary and dividend split, R&D credits, BADR CGT and agency valuation. No sign-up required.",
    features: [
      "8 free tax and finance calculators",
      "Salary and dividend optimiser",
      "R&D tax credit estimator",
      "Agency valuation tool",
      "BADR and CGT calculator",
    ],
    cta: "Open the calculators",
    ctaHref: "/calculators",
  },
  {
    name: "Compliance",
    description:
      "Annual accounts, corporation tax, self assessment and IR35 compliance handled by agency specialists. Fixed fee, no surprises.",
    features: [
      "Annual accounts and CT return",
      "Directors personal tax return",
      "IR35 status assessment",
      "Companies House filings",
      "Unlimited email support",
    ],
    cta: "Get a quote",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Advisory",
    description:
      "Full management accounts, tax planning, growth strategy and exit planning. For agencies scaling towards a sale or MBO.",
    features: [
      "Monthly management accounts",
      "Salary and dividend modelling",
      "Cash flow forecasting",
      "Growth and exit planning",
      "BADR and CGT structuring",
      "R&D credits assessment",
    ],
    cta: "Book a free call",
    ctaHref: "/contact",
  },
];

// Stat verification notes (do not surface to users):
// icon "🧮" value "8": counted from digital-agency/web/src/lib/tools/registry.ts — 8 entries in the tools array.
// icon "📚" value "10": counted blog category page.tsx files in src/app/blog/ (excluding [category]/[slug]).
// icon "⚖️" value "6": counted services listed in src/app/services/page.tsx services array.
// icon "⏱️" value "24hr": claimed verbatim on services page ("24-hour response guarantee") and homepage keyStats.
export const siteStats: StatItemConfig[] = [
  { icon: "🧮", value: "8", label: "Free calculators" },
  { icon: "📚", value: "10", label: "Founder guides" },
  { icon: "⚖️", value: "6", label: "Service areas" },
  { icon: "⏱️", value: "24hr", label: "Response guarantee" },
];
