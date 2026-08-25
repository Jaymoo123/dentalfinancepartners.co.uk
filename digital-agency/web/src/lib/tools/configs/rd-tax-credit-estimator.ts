/**
 * R&D Tax Credit Estimator — GenericTool config.
 * Merged scheme (APs beginning on/after 1 April 2024). 2026/27.
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
    "Directional estimate of your R&D tax credit under the merged scheme (accounting periods beginning on or after 1 April 2024), including ERIS for loss-making R&D-intensive SMEs.",
  metaTitle: "R&D Tax Credit Estimator 2026/27 | Free UK Calculator",
  metaDescription:
    "Free R&D tax credit estimator for UK agencies. Merged scheme from April 2024. 20% credit, ERIS worth up to ~27p per £1 net. No sign-up.",
  intro:
    "Estimate your R&D tax credit under HMRC's merged scheme (accounting periods beginning on or after 1 April 2024). The standard rate is a 20% taxable credit; loss-making R&D-intensive SMEs (30%+ of total expenditure on qualifying R&D) can instead claim ERIS, worth up to ~27p per £1 of qualifying spend. This is a directional estimate only.",
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
      help: "UK subcontractor invoices for R&D work. HMRC allows 65% of each unconnected payment; modelled here on the total.",
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
        sub: out.usedEris
          ? `ERIS payable credit: ${fmt(out.grossCredit)} (~27p per £1 qualifying)`
          : `Gross credit: ${fmt(out.grossCredit)} at ${pct(out.creditRate)} rate`,
        tone: out.grossCredit > 0 ? "good" : "default",
      },
      rows: [
        { label: "Qualifying expenditure", value: fmt(out.qualifying) },
        { label: "R&D intensity ratio", value: pct(out.intensityRatio) },
        {
          label: "R&D intensive SME?",
          value: out.isIntensive ? "Yes (ERIS, if loss-making)" : "No (20% credit)",
        },
        {
          label: out.usedEris ? "ERIS payable credit" : "Gross above-the-line credit",
          value: fmt(out.grossCredit),
          strong: true,
        },
        {
          label: out.usedEris ? "Est. net benefit (payable credit)" : "Est. net benefit (after 25% CT)",
          value: fmt(out.netBenefit),
          strong: true,
        },
      ],
      note: "Directional estimate only. ERIS applies only to loss-making SMEs; profit-makers claim the 20% merged credit instead. Net benefit assumes the 25% main CT rate (19% small-profits payers keep ~16.2p per £1). Does not model the PAYE-NI cap, contractor restrictions in detail, or consumables/software apportionment rules. Get a scoping call for an accurate claim.",
    };
  },
  explainer: {
    heading: "How R&D tax credits work",
    paragraphs: [
      "Under the merged RDEC scheme (accounting periods beginning on or after 1 April 2024), companies get an above-the-line credit of 20% on qualifying expenditure. The credit is taxable income, so the net benefit is roughly 15p per £1 of qualifying spend at the 25% main corporation tax rate, or about 16.2p at the 19% small-profits rate.",
      "Loss-making R&D-intensive SMEs (where qualifying R&D is 30%+ of total spend, lowered from 40% for accounting periods beginning on or after 1 April 2024) can instead claim ERIS: an extra 86% deduction plus a payable credit of 14.5% of the surrenderable loss, worth up to ~27p per £1 of qualifying spend. 27% is not a credit rate applied to your costs.",
      "Qualifying expenditure includes staff time on R&D, 65% of each unconnected subcontractor payment, consumables and software/cloud used for R&D. Actual claims involve detailed scoping and HMRC-specific rules not fully modelled here.",
    ],
  },
  faqs: [
    {
      question: "What is the merged RDEC scheme?",
      answer:
        "For accounting periods beginning on or after 1 April 2024, HMRC merged the SME and RDEC schemes into a single scheme for most companies. The headline rate is a 20% above-the-line credit on qualifying expenditure. Loss-making R&D-intensive SMEs (30%+ intensity) can instead claim ERIS: an 86% extra deduction plus 14.5% of the surrenderable loss, worth up to ~27p per £1 net.",
    },
    {
      question: "Why is only 65% of subcontractor cost claimable?",
      answer:
        "HMRC restricts claims to 65% of each unconnected UK subcontractor payment. For overseas subcontractors the rules are different and generally more restrictive.",
    },
  ],
};
