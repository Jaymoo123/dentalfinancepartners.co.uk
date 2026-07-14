import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// HP1: merged scheme 20% above-the-line taxable expenditure credit (periods from 1 Apr 2024)
const HP1_MERGED_CREDIT_RATE = 0.20;
// HP2: ERIS 86% additional deduction + 14.5% payable credit; intensity threshold 30%
const HP2_ERIS_DEDUCTION_RATE = 0.86;
const HP2_ERIS_PAYABLE_CREDIT_RATE = 0.145;
const HP2_ERIS_INTENSITY_THRESHOLD = 0.30;
// HP21: CT 25% main rate, 19% small profits rate
const HP21_CT_MAIN_RATE = 0.25;
const HP21_CT_SMALL_RATE = 0.19;

// HP2: ERIS payable credit = Q * (1 + HP2_ERIS_DEDUCTION_RATE) * HP2_ERIS_PAYABLE_CREDIT_RATE = Q * 0.2697
function computeErisCredit(q: number): number {
  return q * (1 + HP2_ERIS_DEDUCTION_RATE) * HP2_ERIS_PAYABLE_CREDIT_RATE;
}

// HP1: gross = Q * 20%; net = gross * (1 - ctRate)
function computeMergedNet(q: number, ctRate: number): { gross: number; net: number } {
  const gross = q * HP1_MERGED_CREDIT_RATE;
  return { gross, net: gross * (1 - ctRate) };
}

export const rdReliefEstimator: GenericTool = {
  kind: "generic",
  slug: "rd-relief-estimator",
  name: "R&D Relief Estimator 2026/27",
  category: "R&D Tax Relief",
  oneLiner: "Estimate your R&D merged-scheme credit or ERIS payable credit on qualifying expenditure.",
  metaTitle: "R&D Tax Credits Calculator UK 2026/27",
  metaDescription: "Estimate UK R&D tax relief under the merged scheme (20% taxable credit) or ERIS for R&D-intensive loss-making SMEs. 2026/27 rates, no sign-up required.",
  intro: "Enter your qualifying R&D expenditure and company position. The tool shows your merged-scheme net benefit and, where you qualify, the ERIS payable credit. Speak to a specialist before filing.",
  embedHeight: 560,
  fields: [
    {
      id: "qualifyingExpenditure",
      label: "Qualifying R&D expenditure (£)",
      type: "currency",
      default: 100000,
      min: 0,
      help: "Total qualifying R&D costs for the period: staff, subcontractors or externally provided workers (EPW), software, consumables.",
    },
    {
      id: "staffCost",
      label: "Qualifying staff cost within that spend (£)",
      type: "currency",
      default: 60000,
      min: 0,
      help: "The R&D-qualifying fraction of payroll only. Must be no more than total qualifying expenditure above.",
    },
    {
      id: "profitPosition",
      label: "Profit / loss position",
      type: "select",
      options: [
        { value: "profitable", label: "Profit-making" },
        { value: "loss", label: "Loss-making" },
      ],
      default: "profitable",
      help: "Loss-making companies with 30%+ R&D intensity may qualify for the higher ERIS payable credit.",
    },
    {
      id: "totalExpenditure",
      label: "Total company expenditure for the period (£)",
      type: "currency",
      default: 200000,
      min: 1,
      help: "Used for the 30% R&D-intensity test (ERIS). Must be greater than zero.",
    },
    {
      id: "ctRate",
      label: "Corporation tax rate",
      type: "select",
      options: [
        { value: "25", label: "25% main rate (profits £250,000+)" },
        { value: "19", label: "19% small profits rate (profits up to £50,000)" },
        { value: "marginal", label: "Marginal / not sure (profits £50,000 to £250,000)" },
      ],
      default: "25",
      help: "25% main rate, 19% small profits rate. Only affects the net value of the merged-scheme taxable credit.",
    },
  ],
  compute(v) {
    const q = Math.max(0, Number(v.qualifyingExpenditure));
    const s = Math.max(0, Math.min(Number(v.staffCost), q));
    const e = Math.max(1, Number(v.totalExpenditure));
    const profitPosition = String(v.profitPosition);
    const ctRateKey = String(v.ctRate);
    const isLoss = profitPosition === "loss";

    // HP2: intensity ratio for ERIS routing
    const intensityRatio = q / e;
    const qualifiesEris = isLoss && intensityRatio >= HP2_ERIS_INTENSITY_THRESHOLD;

    // HP1: merged-scheme gross and net (always computed)
    const mergedGross = q * HP1_MERGED_CREDIT_RATE;
    let mergedNet25 = 0;
    let mergedNet19 = 0;
    let mergedNetDisplay = "";
    if (ctRateKey === "25") {
      mergedNet25 = computeMergedNet(q, HP21_CT_MAIN_RATE).net;
      mergedNetDisplay = gbp(mergedNet25);
    } else if (ctRateKey === "19") {
      mergedNet19 = computeMergedNet(q, HP21_CT_SMALL_RATE).net;
      mergedNetDisplay = gbp(mergedNet19);
    } else {
      // marginal: show range HP21
      mergedNet25 = computeMergedNet(q, HP21_CT_MAIN_RATE).net;
      mergedNet19 = computeMergedNet(q, HP21_CT_SMALL_RATE).net;
      mergedNetDisplay = `${gbp(mergedNet25)} to ${gbp(mergedNet19)}`;
    }

    // HP2: ERIS payable credit
    const erisPayable = computeErisCredit(q);
    const erisEnhanced = q * (1 + HP2_ERIS_DEDUCTION_RATE);

    // PAYE-cap flag: heuristic only, not the real cap formula (ponytail: flag only, upgrade if ever used as a filing tool)
    const payeCapFlag = isLoss && s < q * 0.5
      ? "A PAYE/NIC cap may restrict the payable credit where qualifying staff cost is low relative to total R&D spend. We check this before filing."
      : undefined;

    // Route logic (HP1, HP2)
    if (qualifiesEris) {
      const rows: { label: string; value: string; strong?: boolean }[] = [
        { label: "Qualifying expenditure", value: gbp(q) },
        { label: "Additional deduction (86%)", value: gbp(q * HP2_ERIS_DEDUCTION_RATE) },
        { label: "Enhanced expenditure total", value: gbp(erisEnhanced) },
        { label: "ERIS payable credit (14.5% of enhanced)", value: gbp(erisPayable), strong: true },
        { label: "Merged-scheme alternative (20% gross)", value: gbp(mergedGross) },
        { label: "Merged-scheme net (after CT)", value: mergedNetDisplay },
      ];
      const notes = [
        "ERIS route: your qualifying R&D spend is at least 30% of total expenditure and the company is loss-making. The payable credit assumes the full enhanced expenditure is surrenderable. The real cap is the lower of the enhanced R&D spend and the total unrelieved trading loss.",
        "First-time claimants (or those who have not claimed in the prior three years) must notify HMRC within 6 months of the accounting period end, or the claim is invalid (HP3).",
        ...(payeCapFlag ? [payeCapFlag] : []),
        "These are estimates, not a filed claim. Speak to a specialist before filing.",
      ];
      return {
        headline: { label: "Estimated ERIS payable credit", value: gbp(erisPayable), tone: "good" },
        rows,
        note: notes.join(" "),
      };
    }

    // Merged-scheme route (profit-making OR loss-making below 30% intensity)
    const rows: { label: string; value: string; strong?: boolean }[] = [
      { label: "Qualifying expenditure", value: gbp(q) },
      { label: "Merged-scheme gross credit (20%)", value: gbp(mergedGross) },
      { label: "Net benefit after corporation tax", value: mergedNetDisplay, strong: true },
    ];

    const intensityShortfall = isLoss
      ? ` Your R&D spend is ${(intensityRatio * 100).toFixed(1)}% of total expenditure, below the 30% threshold for ERIS. You would need to reach ${gbp(e * HP2_ERIS_INTENSITY_THRESHOLD)} qualifying R&D spend to qualify.`
      : "";

    const notes = [
      `Merged-scheme route: the 20% credit is above-the-line and taxable, so the net benefit is reduced by your CT rate.${intensityShortfall}`,
      "First-time claimants (or those who have not claimed in the prior three years) must notify HMRC within 6 months of the accounting period end, or the claim is invalid (HP3).",
      ...(payeCapFlag ? [payeCapFlag] : []),
      "These are estimates, not a filed claim. Speak to a specialist before filing.",
    ];

    return {
      headline: {
        label: ctRateKey === "marginal"
          ? "Estimated merged-scheme net benefit (range)"
          : "Estimated merged-scheme net benefit",
        value: mergedNetDisplay,
      },
      rows,
      note: notes.join(" "),
    };
  },
  explainer: {
    heading: "How this R&D relief estimator works",
    paragraphs: [
      "From 1 April 2024, the merged R&D scheme gives a 20% above-the-line taxable expenditure credit on qualifying R&D spend. Because the credit is taxable, the net benefit is the gross credit reduced by your corporation tax rate: 15% effective at 25% CT, or 16.2% at 19% CT.",
      "Loss-making companies with qualifying R&D spend of at least 30% of total expenditure keep access to the Enhanced R&D Intensive Support route (ERIS). ERIS gives an 86% additional deduction on qualifying spend, producing enhanced expenditure of 186% of the original spend, then a payable credit at 14.5% of that enhanced amount. On £100,000 qualifying spend, that produces £26,970.",
      "The estimator applies the 30% intensity test automatically from your inputs. Where ERIS applies, it shows the ERIS payable credit as the headline and the merged-scheme net benefit as an alternative, since a company can elect the merged route instead.",
      "Every estimate assumes full loss surrender and does not model the real PAYE/NIC cap or the subcontractor/externally-provided-worker restrictions. Flag these with a specialist before filing.",
    ],
  },
  faqs: [
    {
      question: "How much is R&D tax relief worth under the merged scheme?",
      answer: "The merged scheme gives a 20% above-the-line taxable credit. The net benefit after corporation tax is about 15% of qualifying spend at the 25% main rate, or 16.2% at the 19% small profits rate.",
    },
    {
      question: "What is ERIS and how do I know if my company qualifies?",
      answer: "Enhanced R&D Intensive Support applies to loss-making SMEs whose qualifying R&D spend is at least 30% of total expenditure. It gives an 86% additional deduction and a 14.5% payable credit on the enhanced total.",
    },
    {
      question: "Why is the merged credit taxable?",
      answer: "The 20% credit is included in taxable profits (above the line), so a company with a 25% CT rate sees its net benefit reduced to 15% of qualifying spend. The gross credit settles the CT bill first, with the remainder retained.",
    },
    {
      question: "What is the 30% R&D-intensity test?",
      answer: "ERIS requires that qualifying R&D expenditure makes up at least 30% of total company expenditure for the period. Enter your total expenditure in field 4 and the tool applies the test.",
    },
    {
      question: "What is the claim-notification deadline?",
      answer: "First-time claimants (or those who have not claimed in the prior three years) must notify HMRC within 6 months of the accounting period end. Missing this window makes the claim invalid.",
    },
    {
      question: "Does the estimator account for the PAYE cap?",
      answer: "No. The estimator flags a potential PAYE/NIC cap where staff cost is low relative to total R&D spend, but does not compute the capped figure. A specialist should check this before filing.",
    },
  ],
  related: [
    { label: "R&D tax claims service", href: "/services/rd-tax-claims" },
    { label: "Merged R&D scheme explained", href: "/blog/research-and-development/merged-rd-scheme-explained" },
    { label: "ERIS and the 30% intensity test", href: "/blog/research-and-development/eris-rd-intensive-30-percent" },
    { label: "Claim notification deadline", href: "/blog/research-and-development/rd-claim-notification-6-month-deadline" },
  ],
};
