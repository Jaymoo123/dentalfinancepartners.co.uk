/**
 * R&D Tax Credit Estimator — GenericTool config.
 * Post-April 2023 merged scheme. 2025/26.
 */

import type { GenericTool, CalcValues } from "@accounting-network/web-shared/tools/types";
import { calcRdTaxCredit } from "../compute/rd-tax-credit";

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const pct = (n: number) => `${(n * 100).toFixed(0)}%`;

export const rdTaxCreditTool: GenericTool = {
  kind: "generic",
  slug: "rd-tax-credit-estimator",
  name: "R&D Tax Credit Estimator",
  category: "Tax planning",
  oneLiner:
    "Directional estimate of your R&D tax credit under the post-April 2023 merged scheme, including the R&D-intensive enhanced rate.",
  metaTitle: "R&D Tax Credit Estimator 2025/26 | Free UK Calculator",
  metaDescription:
    "Free R&D tax credit estimator for UK agencies. Post-April 2023 merged scheme. Standard 20% and intensive 27% rates. No sign-up.",
  intro:
    "Estimate your R&D tax credit under HMRC's merged scheme. Standard rate is 20%; R&D-intensive SMEs (40%+ of total expenditure on qualifying R&D) get 27%. This is a directional estimate only.",
  embedHeight: 420,
  fields: [
    {
      id: "totalExpenditure",
      label: "Total business expenditure",
      type: "currency",
      default: 800000,
      min: 0,
      max: 5000000,
      step: 10000,
      help: "All expenditure for the year. Used to test R&D intensity.",
    },
    {
      id: "staffCost",
      label: "Staff time on R&D (gross cost)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 3000000,
      step: 1000,
      help: "Gross salary + employer NI + pension for staff doing qualifying R&D, apportioned.",
    },
    {
      id: "subcontractorCost",
      label: "Subcontractor R&D cost",
      type: "currency",
      default: 40000,
      min: 0,
      max: 1000000,
      step: 1000,
      help: "UK subcontractor invoices for R&D work. HMRC caps claim at 65% of this.",
    },
    {
      id: "consumablesCost",
      label: "Consumables for R&D",
      type: "currency",
      default: 15000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Materials, prototypes, items consumed in the R&D process.",
    },
    {
      id: "softwareCost",
      label: "Software and cloud for R&D",
      type: "currency",
      default: 25000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Software licences and cloud costs used for qualifying R&D work.",
    },
  ],
  compute: (values: CalcValues) => {
    const out = calcRdTaxCredit({
      totalExpenditure: Number(values.totalExpenditure) || 0,
      staffCost: Number(values.staffCost) || 0,
      subcontractorCost: Number(values.subcontractorCost) || 0,
      consumablesCost: Number(values.consumablesCost) || 0,
      softwareCost: Number(values.softwareCost) || 0,
    });
    return {
      headline: {
        label: "Estimated net benefit",
        value: fmt(out.netBenefit),
        sub: `Gross credit: ${fmt(out.grossCredit)} at ${pct(out.creditRate)} rate`,
        tone: out.grossCredit > 0 ? "good" : "default",
      },
      rows: [
        { label: "Qualifying expenditure", value: fmt(out.qualifying) },
        { label: "R&D intensity ratio", value: pct(out.intensityRatio) },
        { label: "R&D intensive SME?", value: out.isIntensive ? "Yes (27% rate)" : "No (20% rate)" },
        { label: "Gross above-the-line credit", value: fmt(out.grossCredit), strong: true },
        { label: "Est. net benefit (after 25% CT)", value: fmt(out.netBenefit), strong: true },
      ],
      note: "Directional estimate only. Does not model the PAYE-NI cap, contractor restrictions in detail, or consumables/software apportionment rules. Get a scoping call for an accurate claim.",
    };
  },
  explainer: {
    heading: "How R&D tax credits work",
    paragraphs: [
      "Under the merged RDEC scheme (April 2023+), companies get an above-the-line credit of 20% on qualifying expenditure. For R&D-intensive SMEs (where qualifying R&D is 40%+ of total spend), the rate rises to 27%. The credit is taxable income, so the net benefit is approximately 75% of the gross credit for a company paying 25% corporation tax.",
      "Qualifying expenditure includes staff time on R&D, 65% of subcontractor costs, consumables and software/cloud used for R&D. Actual claims involve detailed scoping and HMRC-specific rules not fully modelled here.",
    ],
  },
  faqs: [
    {
      question: "What is the merged RDEC scheme?",
      answer:
        "From April 2023, HMRC merged the SME and RDEC schemes into a single scheme for most companies. The headline rate is 20% above-the-line credit on qualifying expenditure. R&D-intensive SMEs (40%+ intensity) get a higher 27% rate.",
    },
    {
      question: "Why is only 65% of subcontractor cost claimable?",
      answer:
        "HMRC restricts claims on UK subcontractor invoices to 65% of the cost. For overseas subcontractors the rules are different and generally more restrictive.",
    },
  ],
};
