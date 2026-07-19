import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

// ponytail: facts only from niche.config.json, rates_ledger.json and existing services copy.
// No invented figures. No em-dashes in user-facing copy.

export const serviceTiers: ServiceTier[] = [
  {
    name: "Compliance",
    description:
      "Independent pharmacy owners and locums who need year-end accounts, personal tax and NHS income reconciliation handled by people who understand dispensing economics.",
    features: [
      "Annual accounts and corporation tax return",
      "Personal self assessment",
      "NHS dispensing income reconciliation (FP34 cash flow)",
      "VAT retail scheme compliance",
      "Locum self-employment and MTD ITSA set-up",
      "Unlimited email support",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Growth",
    description:
      "Established pharmacy owners who want monthly management accounts, payroll support for dispensing staff, and proactive tax planning across the year.",
    features: [
      "Everything in Compliance",
      "Monthly management accounts",
      "Pharmacy payroll (PAYE, RTI, auto-enrolment)",
      "Employer NIC planning (15% rate, £5,000 threshold, £10,500 Employment Allowance)",
      "Salary and dividend extraction modelling",
      "Capital allowances on pharmacy fit-out (AIA up to £1,000,000)",
    ],
    cta: "Book a free call",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Specialist",
    description:
      "Pharmacy buyers, sellers and group operators who need transaction-level advisory: goodwill valuation, acquisition due diligence, incorporation, and CGT/BADR planning on exit.",
    features: [
      "Everything in Growth",
      "Buy-side financial due diligence and goodwill review",
      "Sell-side valuation and CGT/BADR planning (18% BADR rate, £1m lifetime limit)",
      "SDLT and stamp duty advice (asset vs share purchase)",
      "Incorporation and business structure modelling",
      "Group and multi-site reporting",
    ],
    cta: "Book a free call",
    ctaHref: "/contact",
    featured: false,
  },
];
