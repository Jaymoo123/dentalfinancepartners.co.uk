import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "../format";
import { pensionsIht2027Delta, combinedThreshold } from "../estate-tax";

export const pensionsIht2027Estimator: GenericTool = {
  kind: "generic",
  slug: "pensions-iht-2027-estimator",
  name: "Pensions IHT 2027 Estimator",
  category: "Inheritance Tax",
  oneLiner:
    "See how much extra inheritance tax your estate could owe once unused pension pots count towards it from April 2027.",
  metaTitle: "Pensions IHT 2027 Estimator | Extra Tax From April 2027",
  metaDescription:
    "Estimate the extra inheritance tax your estate may owe once unused pension funds are brought into the IHT estate from 6 April 2027. Compare the position now against 2027.",
  intro:
    "From 6 April 2027, most unused pension funds and death benefits will be brought into your estate for inheritance tax purposes. This estimator compares your estate's IHT position today against the position under the 2027 rules, using today's other figures.",
  ctaLabel: "Talk to a specialist about pension and estate planning →",
  embedHeight: 700,
  fields: [
    { id: "estateExPension", label: "Estate value excluding pensions", type: "currency", default: 400_000, step: 10_000 },
    { id: "pensionPot", label: "Unused pension pot(s) at death", type: "currency", default: 300_000, step: 10_000 },
    {
      id: "maritalStatus",
      label: "Marital status",
      type: "select",
      default: "single",
      options: [
        { value: "single", label: "Single / divorced" },
        { value: "married-cp", label: "Married / civil partnership" },
        { value: "widowed-with-transfer", label: "Widowed, with transferable allowance" },
      ],
    },
    { id: "homeToDescendants", label: "Home left to children/grandchildren", type: "toggle", default: true },
    {
      id: "widowedTransferPct",
      label: "% of late spouse's allowance unused and transferable",
      type: "number",
      default: 100,
      min: 0,
      max: 100,
      suffix: "%",
      advanced: true,
      help: "Only relevant if widowed. 100% means the late spouse left everything to you and used none of their own nil-rate band.",
    },
  ],
  compute: (v) => {
    const estateExPension = Number(v.estateExPension);
    const pensionPot = Number(v.pensionPot);
    const maritalStatus = v.maritalStatus as string;
    const homeToDescendants = Boolean(v.homeToDescendants);
    const widowedTransferPct = Number(v.widowedTransferPct);

    const married = maritalStatus === "married-cp";
    const transferPct = maritalStatus === "widowed-with-transfer" ? widowedTransferPct : 0;

    const result = pensionsIht2027Delta({
      estateExPension,
      pensionPot,
      married,
      widowedTransferPct: transferPct,
      homeToDescendants,
    });

    const thresholdNow = combinedThreshold({
      married,
      widowedTransferPct: transferPct,
      homeToDescendants,
      estateValue: estateExPension,
    });
    const threshold2027 = combinedThreshold({
      married,
      widowedTransferPct: transferPct,
      homeToDescendants,
      estateValue: estateExPension + pensionPot,
    });

    return {
      headline: {
        label: "Extra IHT from 6 April 2027",
        value: gbp(result.delta),
        sub: `IHT now: ${gbp(result.ihtNow)} → IHT under 2027 rules: ${gbp(result.iht2027)}`,
        tone: result.delta > 0 ? "warn" : "default",
      },
      rows: [
        { label: "Threshold available now", value: gbp(thresholdNow.total) },
        { label: "Taxable estate now (pension excluded)", value: gbp(Math.max(0, estateExPension - thresholdNow.total)) },
        { label: "IHT due now", value: gbp(result.ihtNow), strong: true },
        { label: "Threshold available from 2027", value: gbp(threshold2027.total) },
        { label: "Taxable estate from 2027 (pension included)", value: gbp(Math.max(0, estateExPension + pensionPot - threshold2027.total)) },
        { label: "IHT due from 2027", value: gbp(result.iht2027), strong: true },
        ...(result.rnrbLostByPensionInclusion > 0
          ? [{ label: "Residence nil-rate band lost to taper", value: gbp(result.rnrbLostByPensionInclusion) }]
          : []),
        { label: "Effective marginal rate on the pension pot", value: pct(result.effectiveMarginalRate) },
      ],
      note:
        "This is an estimate only, for defined contribution pensions with an unused pot at death. It is based on the rules announced to commence 6 April 2027 and does not account for estate growth between now and then. Where the residence nil-rate band tapers away because the pension inflates the estate over £2,000,000, the effective marginal rate on that pension money can reach around 60%. This is not product or investment advice. Speak to a specialist about pension and estate planning before making decisions.",
      workedExamples: [
        {
          title: "Estate under £2m, pension pushes it into higher tax",
          inputs: { estateExPension: gbp(400_000), pensionPot: gbp(300_000), maritalStatus: "Single" },
          result: { ihtNow: "IHT on £400k estate alone", iht2027: "IHT once £300k pension is added" },
        },
        {
          title: "Married couple, home to children, large pension",
          inputs: { estateExPension: gbp(700_000), pensionPot: gbp(500_000), maritalStatus: "Married" },
          result: { note: "Transferable NRB/RNRB softens the impact but the pension is still newly taxable from 2027" },
        },
      ],
    };
  },
  explainer: {
    heading: "What changes for pensions and inheritance tax from April 2027",
    paragraphs: [
      "Currently, most unused defined contribution pension funds fall outside your estate for inheritance tax purposes, which is why pensions have become a popular tool for passing wealth down generations tax-efficiently. From 6 April 2027, most unused pension funds and death benefits will instead be included in the value of your estate when working out inheritance tax, subject to the normal spouse and charity exemptions.",
      "HMRC estimates this change will bring around 10,500 additional estates into inheritance tax each year, and increase the tax bill for a further estimated 38,500 estates that were already liable, by around £34,000 on average (HMRC policy paper, 21 July 2025). Personal representatives, not pension scheme administrators, will be liable for reporting and paying the tax, and death in service benefits from registered pension schemes are excluded. Treat any figure here as directional.",
      "A pension pot brought into the estate can also interact badly with the residence nil-rate band. Because the RNRB tapers away by £1 for every £2 an estate sits over £2,000,000, an estate that was comfortably under that line today can be tipped over it once the pension is added, losing some or all of the RNRB on top of the tax on the pension itself. In that band, the effective marginal rate on the pension money can approach 60%, well above the headline 40% inheritance tax rate.",
      "If your estate includes a significant unused pension pot, it is worth reviewing your wider estate plan, including who you have named as beneficiaries, whether drawing down the pension during your lifetime now makes more sense, and how the change interacts with any existing will or trust arrangements. Speak to a specialist about pension and estate planning to review your position before April 2027.",
    ],
  },
  faqs: [
    {
      question: "Which pensions are affected by the 2027 change?",
      answer:
        "The change is aimed at unused defined contribution pension funds and certain lump sum death benefits. Most workplace and personal pensions where money remains undrawn at death fall into scope. Death in service benefits payable from registered pension schemes are excluded, and the State Pension has no capital value and is unaffected. The detailed scope was set out in draft legislation and technical guidance; check the latest HMRC position closer to April 2027.",
    },
    {
      question: "Will spouse and civil partner exemptions still apply?",
      answer:
        "Yes. Pension funds left to a surviving spouse or civil partner remain exempt from inheritance tax in the same way other assets do. The change affects pensions left to other beneficiaries, such as children, where the fund previously sat outside the estate altogether.",
    },
    {
      question: "How many estates does this actually affect?",
      answer:
        "HMRC's own estimate is that around 10,500 additional estates a year will become liable for inheritance tax for the first time because of this change, with a further roughly 38,500 already-liable estates facing a higher bill, on average around £34,000 more.",
    },
    {
      question: "Can I do anything before April 2027?",
      answer:
        "Some people choose to draw down pension funds during their lifetime, use other assets first, or restructure gifting and trust arrangements ahead of the change. What is right depends heavily on your income needs, health and wider estate. This is not something to decide from a calculator alone, speak to a specialist.",
    },
    {
      question: "Does this estimator account for my estate growing between now and 2027?",
      answer:
        "No. It compares the IHT position on your figures today under the current rules against the same figures under the 2027 rules. If your estate is likely to grow (or shrink) before then, the real 2027 figure will differ from this estimate.",
    },
  ],
};
