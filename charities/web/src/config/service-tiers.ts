import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

// ponytail: tiers shaped around the three natural charity income bands that
// drive scrutiny obligations: under £25k (no external scrutiny), £25k-£1m
// (independent examination), over £1m (audit). All thresholds sourced from
// docs/charities/rates_ledger.json; no invented figures.

export const serviceTiers: ServiceTier[] = [
  {
    name: "Foundations",
    description:
      "Smaller charities and CICs below the independent examination threshold (under £25,000 gross income) that need accurate SORP accounts and basic compliance in order.",
    features: [
      "Annual accounts prepared under Charities SORP",
      "Receipts and payments or accruals basis as appropriate",
      "Annual return filing within 10-month deadline",
      "Gift Aid claim preparation and submission",
      "Trustee report drafting support",
      "Email support between year ends",
    ],
    cta: "Ask about your charity",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Examination",
    description:
      "Charities and CICs with gross income above £25,000 that require external scrutiny and want Gift Aid, fund accounting and VAT handled properly throughout the year.",
    features: [
      "Everything in Foundations",
      "Independent examination by a qualified examiner",
      "Restricted and unrestricted fund accounting",
      "Gift Aid and GASDS claims (up to £8,000 in small donations per year)",
      "Charity VAT review (registration threshold £90,000 taxable turnover)",
      "Payroll and Employment Allowance (£10,500 for eligible charities)",
      "Quarterly finance pack for trustee meetings",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Audit Ready",
    description:
      "Larger charities approaching or above £1m gross income where a statutory audit is required or anticipated, alongside ongoing advisory for complex structures.",
    features: [
      "Everything in Examination",
      "Statutory audit preparation and liaison",
      "Audit threshold monitoring (income £1m, OR income £250k and assets £3.26m)",
      "Trading subsidiary accounting and gift of profits planning",
      "Small trading exemption review and documentation",
      "Board-level finance reporting and governance support",
      "Priority response on Charity Commission queries",
    ],
    cta: "Discuss your requirements",
    ctaHref: "/contact",
    featured: false,
  },
];
