import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

// ponytail: figures sourced strictly from docs/startups-tech/rates_ledger.json
// and existing services page copy; nothing invented.

export const serviceTiers: ServiceTier[] = [
  {
    name: "Foundations",
    description:
      "Pre-seed and early-stage founders who need their company correctly set up, compliant, and investor-ready before the first round.",
    features: [
      "Incorporation and company structure advice",
      "Annual accounts and corporation tax return",
      "Founder salary and dividend modelling (19% / 25% CT rates)",
      "Pre-trading expenditure review (7-year lookback)",
      "SEIS advance assurance application (up to £250,000 raise)",
      "Unlimited email support",
    ],
    cta: "Speak to a startup accountant",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Growth",
    description:
      "Funded and scaling startups that need R&D claims filed correctly, investor scheme compliance managed, and ongoing tax planning as headcount grows.",
    features: [
      "Everything in Foundations",
      "R&D tax credit claim (RDEC 20% / ERIS 14.5% payable credit)",
      "EIS advance assurance and compliance (30% investor relief)",
      "EMI scheme setup and option grant compliance (up to £250,000 per employee)",
      "Employment Allowance and employer NIC planning (15% / £5,000 threshold)",
      "Quarterly management accounts and board-pack numbers",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Scale",
    description:
      "Post-Series A companies, acqui-hire targets, and founders planning an exit who need advisory depth across share schemes, group structures, and disposal planning.",
    features: [
      "Everything in Growth",
      "CSOP as EMI fallback once gross assets approach £30m limit",
      "s431 election management and restricted securities compliance",
      "Group structure and holding company modelling",
      "BADR eligibility review on exit (18% CGT rate, £1m lifetime limit)",
      "Annual ERS return filing and EMI grant notifications (due 6 July)",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: false,
  },
];
