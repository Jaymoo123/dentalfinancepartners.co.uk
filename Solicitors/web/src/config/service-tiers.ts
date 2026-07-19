import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

/**
 * Stats verified from codebase:
 * - 13 calculators: count of entries in src/lib/tools/registry.ts (all kind: "generic")
 * - 10 pillar guides: count of .md files in content/solicitor-guides/
 * - 6 service areas: count of SERVICES array entries in src/app/services/page.tsx
 * - "Same-day regulatory": verbatim from services/page.tsx INCLUDED list
 */
export const siteStats: StatItemConfig[] = [
  { icon: "🧮", value: "13", label: "Free calculators" },
  { icon: "📖", value: "10", label: "Pillar guides" },
  { icon: "⚖️", value: "6", label: "Service specialisms" },
  { icon: "✓", value: "Same-day", label: "Response on regulatory questions" },
];

/**
 * Three engagement tiers derived from PRICING_TIERS in services/page.tsx.
 * DIY CTA points to /calculators (verifiable tools route).
 * Assisted CTA points to /contact.
 * Done-for-you CTA points to /contact.
 */
export const serviceTiers: ServiceTier[] = [
  {
    name: "Self-serve",
    description:
      "Use our free calculators and pillar guides to understand your firm's position before speaking to anyone.",
    features: [
      "13 free law firm calculators (valuation, take-home, FA 2014 test, SRA reserve and more)",
      "10 long-form pillar guides (SRA Accounts Rules, partnership vs LLP, COFA, succession)",
      "UK solicitor tax rates reference (2025/26)",
      "Free firm health check diagnostic",
    ],
    cta: "Open the calculators",
    ctaHref: "/calculators",
  },
  {
    name: "Essentials",
    description:
      "Compliance floor for sole practitioners and small firms. SRA Accountant's Report, statutory accounts, partnership and personal self-assessment, basic tax planning.",
    features: [
      "Statutory accounts and SA800 / personal SA",
      "SRA Accountant's Report (where applicable)",
      "Basic VAT returns",
      "Quarterly check-in with your accountant",
      "Fixed monthly fee from £180/mo",
    ],
    cta: "Book a scoping call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Growth and Specialist",
    description:
      "For scaling LLPs, multi-partner firms, and complex transactions including practice sale, acquisition and post-merger integration.",
    features: [
      "Everything in Essentials, plus:",
      "Monthly management accounts and KPI dashboard",
      "Salaried Member Rules quarterly audit (FA 2014)",
      "COFA compliance support and breach review",
      "Practice valuation and pre-sale planning (BADR timing)",
      "Bespoke pricing based on firm size and complexity",
    ],
    cta: "Discuss your firm",
    ctaHref: "/contact",
  },
];
