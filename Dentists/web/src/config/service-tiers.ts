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
      "Direct line to the adviser handling the sale",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: false,
  },
];

// Stat verification. Every value below is a count of something in this repo or a figure
// from docs/dentists/house_positions.md. None of them is a claim about client volume,
// turnaround or performance.
//
// 13 calculators    = entries in `src/lib/tools/configs/` (re-derived 2026-09-11: `ls` -> 13)
// 5 topic guides    = named category pages under `src/app/blog/` (associate-tax,
//                     buying-a-practice, practice-accounting, practice-finance,
//                     vat-and-compliance); re-derived 2026-09-11
// 5 service pages   = SERVICE_SLUGS in `src/app/services/[slug]/data.ts`. This replaces the
//                     old "6 service areas covered": that counted the presentational
//                     `services` array in `app/services/page.tsx` and broke silently if the
//                     array changed, and "areas covered" read as a scope claim. The new stat
//                     counts real published pages the reader can open.
// 96% UDA line      = HP §3.A. Below 96% delivery the commissioner recovers the
//                     overpayment; 96-100% is carry-forward, not clawback.
export const siteStats: StatItemConfig[] = [
  { icon: "🧮", value: "13", label: "Free dental calculators" },
  { icon: "📚", value: "5", label: "Specialist topic guides" },
  { icon: "⚙️", value: "5", label: "Specialist service pages" },
  { icon: "📋", value: "96%", label: "UDA delivery clawback line" },
];
