import type { ServiceTier } from "@accounting-network/web-shared/components/ServiceTiers";

// ponytail: facts sourced only from niche.config.json + docs/care/rates_ledger.json + care-services.ts copy
// No invented figures; all monetary values traceable to rates_ledger entries above.

export const serviceTiers: ServiceTier[] = [
  {
    name: "Compliance",
    description:
      "New and smaller care providers that need the compliance fundamentals: CQC financial paperwork, correct payroll from day one, and annual accounts filed on time.",
    features: [
      "Annual accounts and corporation tax return",
      "CQC financial viability statement prepared on CQC template",
      "Care payroll: sleep-in, inter-call travel time and holiday accrual",
      "VAT welfare-exemption position confirmed",
      "Employer NIC and Employment Allowance review (£10,500 offset)",
      "Quarterly review call",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: false,
  },
  {
    name: "Growth",
    description:
      "Established care homes and agencies looking for monthly management accounts, NMW compliance monitoring, and fee-rate modelling that reflects the real cost base.",
    features: [
      "Everything in Compliance",
      "Monthly management accounts with fee-stream breakdown",
      "True cost-per-care-hour modelling (NLW at £12.71, employer NIC at 15%, travel time)",
      "Staffing margin analysis and rota cost review",
      "FNC income tracking (standard £267.68 / higher £368.24 per week)",
      "Capital allowances: AIA, 40% FYA and 14% WDA sequencing",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: true,
  },
  {
    name: "Advisory",
    description:
      "Multi-site operators, buyers, sellers and groups who need deal-grade numbers: acquisition due diligence, exit tax planning and propco/opco structure advice, not just filed accounts.",
    features: [
      "Everything in Growth",
      "Acquisition financial due diligence: fee mix, occupancy and cost base",
      "Pre-sale BADR review (18% from 6 April 2026) and CGT modelling",
      "Propco/opco structure: CT threshold and BADR eligibility assessment",
      "Structures and Buildings Allowance (3% SBA) on new builds",
      "Priority response",
    ],
    cta: "Get in touch",
    ctaHref: "/contact",
    featured: false,
  },
];
