import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcRDCredit } from "@/lib/tools/compute/rd-credit";

export const rdCreditTool: GenericTool = {
  kind: "generic",
  slug: "rd-tax-credit-estimator",
  name: "R&D Tax Credit Estimator",
  category: "Limited Company",
  oneLiner: "Indicative R&D credit under the 2024 merged scheme. Drop in qualifying spend to see your estimate and whether the intensive SME rate applies.",
  embedHeight: 500,
  metaTitle: "R&D Tax Credit Estimator 2026/27 | UK Merged Scheme Calculator",
  metaDescription:
    "Free R&D tax credit calculator for UK companies under the merged RDEC scheme. Estimates gross credit, net benefit, and whether the R&D-intensive rate applies. 2026/27.",
  intro:
    "The 2024 merged R&D scheme gives a 20% above-the-line credit on qualifying expenditure. Loss-making R&D-intensive companies, where qualifying spend is 30% or more of total expenditure, can instead claim enhanced support (ERIS) worth roughly 27p per £1 of qualifying spend. Enter your spend categories and see your indicative credit and net benefit.",
  fields: [
    {
      id: "totalExpenditure",
      label: "Total business expenditure",
      type: "currency",
      default: 800000,
      min: 0,
      max: 5000000,
      step: 10000,
      help: "All expenditure for the year. Used to test whether you meet the R&D intensive threshold.",
    },
    {
      id: "staffCost",
      label: "Staff time on R&D (gross cost)",
      type: "currency",
      default: 120000,
      min: 0,
      max: 3000000,
      step: 5000,
      help: "Gross salary + employer NI + pension of staff doing qualifying R&D, apportioned by time.",
    },
    {
      id: "subcontractorCost",
      label: "Subcontractor R&D cost",
      type: "currency",
      default: 40000,
      min: 0,
      max: 1000000,
      step: 5000,
      help: "UK subcontractor invoices for R&D work. HMRC caps your claim at 65% of this.",
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
      label: "Software / cloud for R&D",
      type: "currency",
      default: 25000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "SaaS licences and cloud compute (AWS, GCP, GPU rental) used specifically for R&D.",
    },
  ],
  compute(values) {
    const r = calcRDCredit(
      Number(values.totalExpenditure),
      Number(values.staffCost),
      Number(values.subcontractorCost),
      Number(values.consumablesCost),
      Number(values.softwareCost),
    );
    return {
      headline: {
        label: "Estimated R&D credit",
        value: gbp(r.grossCredit),
        sub: `${(r.creditRate * 100).toFixed(0)}% rate · net benefit ${gbp(r.netBenefit)}`,
        tone: "good",
      },
      rows: [
        { label: "Qualifying expenditure", value: gbp(r.qualifying) },
        { label: "R&D intensity", value: pct(r.intensityRatio * 100) },
        {
          label: "Credit rate",
          value: `${(r.creditRate * 100).toFixed(0)}%${r.isIntensive ? " (R&D intensive)" : " (standard)"}`,
        },
        { label: "Gross credit (above-the-line)", value: gbp(r.grossCredit), strong: true },
        { label: "Net benefit (after 25% CT)", value: gbp(r.netBenefit), strong: true },
      ],
      note: "Directional estimate only. Actual claims involve scoping, PAYE/NI cap, staff time apportionment, and specific qualifying-activity tests. Book a free call for a tailored assessment.",
    };
  },
  explainer: {
    heading: "How the merged R&D scheme works",
    paragraphs: [
      "Since 1 April 2024 most UK companies use the merged scheme, which replaced both the old RDEC and the SME scheme. You claim a 20% above-the-line credit on qualifying expenditure. Because it's above-the-line, it reduces your taxable profit first — the net cash benefit after 25% corporation tax is typically around 15p per qualifying pound.",
      "Loss-making R&D-intensive companies (where qualifying R&D spend is 30% or more of total expenditure) can instead use enhanced R&D intensive support (ERIS): an 86% enhanced deduction surrendered for a 14.5% payable credit, worth roughly 27p per qualifying pound — and because the credit is payable rather than taxable, there is no corporation tax haircut. The calculator tests the intensity ratio automatically.",
    ],
  },
  faqs: [
    {
      question: "What counts as qualifying expenditure?",
      answer:
        "Staff costs (salary, employer NI, pension) apportioned to qualifying R&D time; 65% of subcontractor costs for UK-based contractors; consumables used in R&D; software and cloud compute directly used in R&D. Overheads, capital items, and costs for overseas contractors generally fall outside (with limited exceptions).",
    },
    {
      question: "Is this the ERIS scheme for loss-making SMEs?",
      answer:
        "No. The merged scheme described here applies to all companies from April 2024. The separate Enhanced R&D Intensive Support (ERIS) scheme applies to loss-making SMEs with an R&D intensity of 30% or more and offers a payable credit. If you are loss-making, speak to us about whether ERIS applies.",
    },
    {
      question: "What is the PAYE/NI cap?",
      answer:
        "Your R&D credit cannot exceed three times your total PAYE and NI liability for the period, plus £20,000. For companies with significant R&D but a small payroll, this cap can reduce the claim. This calculator does not model the cap — book a call for a full assessment.",
    },
  ],
};
