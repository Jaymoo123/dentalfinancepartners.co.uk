import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

// ponytail: facts only from niche.config.json, rates_ledger.json and existing services copy.
// No invented figures. No em-dashes in user-facing copy.

export const serviceTiers: ServiceTier[] = [
  {
    name: "Dispensary",
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
    name: "Ownership",
    description:
      "Established pharmacy owners who want monthly numbers that track the FP34 payment lag, payroll for dispensing staff, and extraction planning that fits NHS income timing.",
    features: [
      "Everything in Dispensary",
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
    name: "Deals and Exit",
    description:
      "Pharmacy buyers, sellers and group operators who need transaction-level advisory: goodwill valuation, acquisition due diligence, incorporation, and CGT/BADR planning on exit.",
    features: [
      "Everything in Ownership",
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
