import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";
import { PROBATE_FEE, PROBATE_FEE_THRESHOLD, GRANT_COPY_FEE } from "../estate-tax";

export const probateCostCalculator: GenericTool = {
  kind: "generic",
  slug: "probate-cost-calculator",
  name: "Probate Cost Calculator",
  category: "Probate Process",
  oneLiner:
    "Get an itemised estimate of what probate is likely to cost, whether you go DIY, fixed-fee or use a solicitor.",
  metaTitle: "Probate Cost Calculator | DIY vs Solicitor Fees 2026/27",
  metaDescription:
    "Estimate the total cost of probate, including the court fee, valuations and professional fees, across DIY, fixed-fee, hourly and percentage-based routes.",
  intro:
    "Probate costs range from a few hundred pounds if you handle it yourself to several thousand for a full solicitor service. This calculator gives an itemised low-high estimate based on the estate value, complexity and route you choose.",
  ctaLabel: "Get a fixed-fee probate quote →",
  embedHeight: 700,
  fields: [
    { id: "estateValue", label: "Total estate value", type: "currency", default: 350_000, step: 10_000 },
    {
      id: "route",
      label: "Who is handling probate",
      type: "select",
      default: "fixed-fee",
      options: [
        { value: "diy", label: "DIY: you apply yourself" },
        { value: "fixed-fee", label: "Fixed-fee probate service" },
        { value: "hourly", label: "Solicitor charging hourly" },
        { value: "percentage", label: "Solicitor charging a % of the estate" },
      ],
    },
    { id: "propertyInEstate", label: "Property in the estate needing a valuation", type: "toggle", default: true },
    { id: "iht400Needed", label: "Full IHT400 account required", type: "toggle", default: false },
    { id: "foreignAssets", label: "Foreign assets involved", type: "toggle", default: false, advanced: true },
  ],
  compute: (v) => {
    const estateValue = Number(v.estateValue);
    const route = v.route as string;
    const propertyInEstate = Boolean(v.propertyInEstate);
    const iht400Needed = Boolean(v.iht400Needed);
    const foreignAssets = Boolean(v.foreignAssets);

    const probateFee = estateValue > PROBATE_FEE_THRESHOLD ? PROBATE_FEE : 0;
    const copiesCost = probateFee > 0 ? GRANT_COPY_FEE * 4 : 0; // a handful of extra sealed copies ordered with the application
    const valuationLow = propertyInEstate ? 150 : 0;
    const valuationHigh = propertyInEstate ? 800 : 0;

    const complexityUp = (iht400Needed ? 1 : 0) + (foreignAssets ? 1 : 0);

    let profLow = 0;
    let profHigh = 0;
    let label = "";

    if (route === "diy") {
      label = "Court fee, copies and valuations only";
    } else if (route === "fixed-fee") {
      profLow = complexityUp > 0 ? 3000 : 1500;
      profHigh = complexityUp > 0 ? 6000 : 3000;
      label = "Fixed-fee probate service";
    } else if (route === "hourly") {
      const hoursLow = 8 + complexityUp * 6;
      const hoursHigh = 20 + complexityUp * 15;
      profLow = hoursLow * 200;
      profHigh = hoursHigh * 300;
      label = `Solicitor hourly (est. ${hoursLow} to ${hoursHigh} hrs at £200 to £300/hr)`;
    } else {
      profLow = estateValue * 0.01;
      profHigh = estateValue * 0.05;
      label = "Solicitor % of estate (1% to 5%)";
    }

    const totalLow = probateFee + copiesCost + valuationLow + profLow;
    const totalHigh = probateFee + copiesCost + valuationHigh + profHigh;

    return {
      headline: {
        label: "Estimated total probate cost",
        value: `${gbp(totalLow)} to ${gbp(totalHigh)}`,
        sub: label,
      },
      rows: [
        { label: `Probate application fee (estates over ${gbp(PROBATE_FEE_THRESHOLD)})`, value: probateFee > 0 ? gbp(probateFee) : "£0, exempt" },
        ...(probateFee > 0 ? [{ label: "Extra sealed copies of the grant", value: gbp(copiesCost) }] : []),
        ...(propertyInEstate ? [{ label: "Property valuation", value: `${gbp(valuationLow)} to ${gbp(valuationHigh)}` }] : []),
        ...(route !== "diy" ? [{ label: label, value: `${gbp(profLow)} to ${gbp(profHigh)}` }] : []),
        { label: "Total estimated cost", value: `${gbp(totalLow)} to ${gbp(totalHigh)}`, strong: true },
      ],
      note:
        route === "percentage"
          ? "Percentage-based fees scale directly with the estate value, so they can become disproportionately expensive on larger, simple estates, worth comparing against a fixed-fee quote."
          : "Costs vary by provider and region. Figures exclude any costs of selling property, tracing missing beneficiaries, or resolving disputes, which are charged separately.",
      workedExamples: [
        {
          title: "DIY probate, no property, simple estate",
          inputs: { estateValue: gbp(200_000), route: "DIY", propertyInEstate: "No" },
          result: { note: "Cost is mostly the court fee alone" },
        },
        {
          title: "Fixed-fee service, property and IHT400 needed",
          inputs: { estateValue: gbp(500_000), route: "Fixed-fee", propertyInEstate: "Yes", iht400Needed: "Yes" },
          result: { note: "Falls into the higher fixed-fee band due to added complexity" },
        },
      ],
    };
  },
  explainer: {
    heading: "What probate actually costs, by route",
    paragraphs: [
      "The court itself charges a single probate application fee, £526 from 13 July 2026 (previously £300), for estates worth more than £5,000, plus a small charge per extra sealed copy of the grant that you will usually want for banks, pension providers and the Land Registry. On top of this, most estates that include a property need a formal or informal valuation, typically £150 to £800 depending on whether that is an estate agent appraisal or a RICS valuation.",
      "Beyond the court fee, the biggest cost variable is who does the work. Handling probate yourself keeps costs to the court fee and valuations, but takes real time and carries the risk of errors on the IHT forms. A fixed-fee probate service typically charges £1,500 to £3,000 for a simple estate and £3,000 to £6,000 or more where a full IHT400 or foreign assets are involved, with the price agreed upfront.",
      "Solicitors charging by the hour typically bill £200 to £300 an hour and the total depends heavily on how many hours the estate actually takes, while percentage-based fees, commonly 1% to 5% of the estate, scale with estate value regardless of how much work is actually involved, and can end up considerably more expensive than a fixed fee on a large, straightforward estate.",
    ],
  },
  faqs: [
    {
      question: "Do I have to pay the probate fee upfront?",
      answer:
        "Yes, the £526 application fee is normally paid when you submit the application, usually from the estate's own funds via a bank arrangement for probate, or reimbursed to the person paying it once the grant is issued and accounts are accessible.",
    },
    {
      question: "Is DIY probate a false economy?",
      answer:
        "For a simple estate, one bank account, one beneficiary, no property, DIY probate can work well and save several thousand pounds. For anything with a property, multiple beneficiaries, or an IHT400 requirement, the time and error risk usually make a fixed-fee service worthwhile.",
    },
    {
      question: "Why do percentage fees vary so much between firms?",
      answer:
        "There's no regulated cap on solicitor probate fees, so percentage rates on the estate value (commonly 1% to 5%, sometimes plus VAT) differ by firm and region. On a £600,000 estate, a 4% fee is £24,000, several times a typical fixed fee, which is why comparing quotes matters.",
    },
    {
      question: "Are these costs on top of inheritance tax?",
      answer:
        "Yes. Probate fees and professional fees are entirely separate from any inheritance tax due on the estate, and neither reduces the other, though professional fees for the estate administration are sometimes deductible when working out the estate's own tax position in limited circumstances.",
    },
    {
      question: "What extra costs might come up later?",
      answer:
        "Selling a property, tracing a missing beneficiary, obtaining a foreign grant, or resolving a dispute between beneficiaries are all charged on top of standard probate fees and can add significantly to the total.",
    },
  ],
};
