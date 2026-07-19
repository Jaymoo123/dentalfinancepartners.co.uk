import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";
import type { StatItemConfig } from "@accounting-network/web-shared/components/StatsBar";

// ponytail: tiers mirror the page's existing Essentials/Growth/Specialist shape;
// stats are code-verifiable counts only (no invented figures).

export const serviceTiers: ServiceTier[] = [
  {
    name: "Essentials",
    description:
      "Associates, locums and single-handed practices that need the compliance basics sorted and a specialist eye on their numbers.",
    features: [
      "Annual accounts and corporation tax return",
      "Personal self assessment",
      "Allowable expenses review for associates",
      "IR35 status check for NHS engagements",
      "Quarterly review call",
      "Unlimited email support",
    ],
    cta: "Run the free calculators first",
    ctaHref: "/calculators",
    featured: false,
  },
  {
    name: "Growth",
    description:
      "Multi-associate practices and principals who want monthly management accounts plus proactive tax planning across the year.",
    features: [
      "Everything in Essentials",
      "Monthly P&L split NHS / private / plan income",
      "Salary, dividend and NHS Pension modelling",
      "Capital allowances on dental equipment",
      "Cash flow forecast and seasonal modelling",
      "Practice valuation refresh annually",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Specialist",
    description:
      "Multi-site groups, partnership restructures, and principals planning a sale who need advisory depth alongside full compliance.",
    features: [
      "Everything in Growth",
      "Pre-sale BADR and Section 162 planning",
      "Holding company and group structure modelling",
      "Buy-side financial due diligence",
      "Goodwill methodology and asset split",
      "Priority same-day response",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: false,
  },
];

// Stat verification:
// 13 calculators — count of entries in Dentists/web/src/lib/tools/registry.ts `tools` array
// 5 topic guides  — count of named category pages under src/app/blog/ (associate-tax,
//                   buying-a-practice, practice-accounting, practice-finance, vat-and-compliance)
// 6 service areas — count of entries in services array in src/app/services/page.tsx
// 24hr response   — stated in services page copy (included[1].body + CTA section)
export const siteStats: StatItemConfig[] = [
  { icon: "🧮", value: "13", label: "Free dental calculators" },
  { icon: "📚", value: "5", label: "Specialist topic guides" },
  { icon: "⚙️", value: "6", label: "Service areas covered" },
  { icon: "⏱️", value: "24hr", label: "Response commitment" },
];
