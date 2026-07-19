import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

// ponytail: figures sourced only from rates_ledger.json and niche.config.json;
// no invented numbers.

export const serviceTiers: ServiceTier[] = [
  {
    name: "Compliance",
    description:
      "Independent operators and small venues that need the annual numbers filed correctly and their payroll and VAT obligations handled without fuss.",
    features: [
      "Annual accounts and corporation tax return",
      "Personal self assessment for owner-operators",
      "Food and drink VAT split (standard, zero-rated, reduced-rate)",
      "Payroll for variable-hours teams with RTI submissions",
      "Employer NIC at 15% from April 2025 with Employment Allowance check",
      "Tips and gratuities review under the Employment (Allocation of Tips) Act",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Growth",
    description:
      "Expanding venues and small groups that want monthly management accounts, tronc scheme compliance, and proactive VAT and tax planning across the year.",
    features: [
      "Everything in Compliance",
      "Tronc scheme setup and troncmaster support (NIC-exempt allocation)",
      "Monthly P&L with wet vs dry vs food vs accommodation splits",
      "Flat Rate Scheme review (6.5% pubs, 12.5% catering, 10.5% hotels)",
      "Seasonal cash flow forecasting for quieter trading periods",
      "Corporation tax planning: small profits rate 19%, main rate 25%",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Specialist",
    description:
      "Multi-site operators, lease assignments and venue sales needing advisory depth: licence and duty compliance, MTD for Income Tax, and exit planning.",
    features: [
      "Everything in Growth",
      "MTD for Income Tax readiness (sole traders over £50,000 income from April 2026)",
      "Alcohol duty and draught relief reconciliation",
      "Tour Operators Margin Scheme (TOMS) for accommodation packages",
      "Business rates relief review (SBRR up to £12,000 rateable value)",
      "Priority same-day response",
    ],
    cta: "Book a free scoping call",
    ctaHref: "/contact",
    featured: false,
  },
];
