import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcAssociatedCT } from "@/lib/tools/compute/associated-companies-ct";

export const associatedCompaniesCTTool: GenericTool = {
  kind: "generic",
  slug: "associated-companies-ct",
  name: "Associated Companies CT Calculator",
  category: "Corporation Tax",
  oneLiner:
    "See how associated companies divide the £50,000 and £250,000 corporation tax thresholds, what marginal relief you get, your effective CT rate, and whether quarterly instalments apply.",
  embedHeight: 560,
  metaTitle: "Associated Companies Corporation Tax Calculator 2026/27",
  metaDescription:
    "Free calculator: divide the £50k and £250k corporation tax limits by your associated companies, apply marginal relief (3/200), see your effective rate and whether quarterly instalment payments are triggered. 2026/27.",
  intro:
    "Since 1 April 2023 the corporation tax limits (£50,000 small profits, £250,000 main rate) are divided by one plus the number of your associated companies, and pro-rated for accounting periods shorter than 12 months. Two associated companies can push a £60,000-profit company from 19% straight into marginal relief territory. Enter your profits, associated company count, and period length to see your divided limits, marginal relief, effective rate, and whether the £1.5 million quarterly instalment threshold is triggered. Figures apply for 2026/27 (rates unchanged since FY2023).",
  fields: [
    {
      id: "taxableProfits",
      label: "Taxable total profits for the period",
      type: "currency",
      default: 80000,
      min: 0,
      max: 5000000,
      step: 1000,
      help: "Profits chargeable to corporation tax after all deductions and reliefs.",
    },
    {
      id: "associatedCompanies",
      label: "Number of associated companies (excluding this one)",
      type: "number",
      default: 1,
      min: 0,
      max: 50,
      step: 1,
      help: "Companies under common control at any point in the period. Dormant companies and certain passive holding companies do not count.",
    },
    {
      id: "months",
      label: "Length of accounting period (months)",
      type: "number",
      default: 12,
      min: 1,
      max: 12,
      step: 1,
      advanced: true,
      help: "Limits are pro-rated for periods shorter than 12 months.",
    },
    {
      id: "exemptDividends",
      label: "Exempt dividends received from non-group companies",
      type: "currency",
      default: 0,
      min: 0,
      max: 1000000,
      step: 1000,
      advanced: true,
      help: "Added to taxable profits to give 'augmented profits', which are measured against the limits. Dividends from 51% subsidiaries are excluded.",
    },
  ],
  compute(values) {
    const r = calcAssociatedCT(
      Number(values.taxableProfits),
      Number(values.exemptDividends),
      Number(values.associatedCompanies),
      Number(values.months),
    );
    const bandLabel =
      r.band === "small"
        ? "Small profits rate (19%)"
        : r.band === "main"
          ? "Main rate (25%)"
          : "Marginal relief band";
    const rows = [
      { label: "Companies sharing the limits", value: String(r.divisor) },
      { label: "Your lower limit (19% up to here)", value: gbp(r.lowerLimit) },
      { label: "Your upper limit (25% from here)", value: gbp(r.upperLimit) },
      { label: "Augmented profits (measured against limits)", value: gbp(r.augmentedProfits) },
      { label: "Band", value: bandLabel },
      ...(r.band === "marginal"
        ? [
            { label: "CT at main rate before relief", value: gbp(r.ctBeforeRelief) },
            { label: "Marginal relief (3/200 fraction)", value: gbp(r.marginalRelief) },
          ]
        : []),
      { label: "Corporation tax payable", value: gbp(r.ctPayable), strong: true as const },
      { label: "Quarterly instalment threshold (divided)", value: gbp(r.qipLimit) },
      {
        label: "Quarterly instalments (QIPs)",
        value: r.qipTriggered ? "Likely required" : "Not triggered",
      },
    ];
    return {
      headline: {
        label: "Corporation tax payable",
        value: gbp(r.ctPayable),
        sub: `${pct(r.effectiveRate * 100)} effective rate on taxable profits`,
        tone: r.qipTriggered ? "warn" : "default",
      },
      rows,
      note: r.qipTriggered
        ? "Your augmented profits exceed the divided £1.5m 'large company' threshold, so quarterly instalment payments are likely required. A one-year grace period can apply the first time you become large if profits are £10m or less (also divided by associates). Take advice before your first instalment date."
        : "Associated company status is tested at any point in the accounting period, and control includes rights of certain relatives and business partners where there is 'substantial commercial interdependence'. This is an estimate, not advice.",
    };
  },
  explainer: {
    heading: "How associated companies change your corporation tax",
    paragraphs: [
      "From 1 April 2023, corporation tax is 19% on profits up to £50,000 (the small profits rate) and 25% above £250,000 (the main rate), with marginal relief tapering the bill in between. The catch is that both limits are divided by one plus the number of companies associated with yours at any time in the accounting period, and pro-rated if the period is shorter than 12 months. A company with two associates works with limits of £16,667 and £83,333, not £50,000 and £250,000.",
      "Marginal relief uses the standard statutory formula: 3/200 multiplied by the gap between your upper limit and your augmented profits, multiplied by taxable profits divided by augmented profits. Augmented profits are taxable profits plus exempt dividends received (excluding dividends from 51% subsidiaries). The relief is deducted from tax calculated at the full 25%, which produces an effective marginal rate of 26.5% on profits inside the band.",
      "The same division applies to the £1.5 million 'large company' threshold for quarterly instalment payments. With three associates, instalments can be triggered at augmented profits above £375,000, so companies in a group can be pulled into paying corporation tax early even at modest profit levels.",
      "Worked example 1: a company with one associated company has taxable profits of £80,000 in a 12-month period, no exempt dividends. Two companies share the limits, so the lower limit is £25,000 and the upper limit is £125,000. Profits sit in the marginal band. Tax at 25% is £20,000; marginal relief is 3/200 of (£125,000 minus £80,000), which is £675. Corporation tax payable is £19,325, an effective rate of about 24.2%. With no associates the bill would have been £17,450 (£20,000 at 25% less £2,550 of marginal relief), so the single associate costs £1,875.",
      "Worked example 2: a company with three associated companies draws up a 9-month accounting period with taxable profits of £60,000. Four companies share the limits and the period is pro-rated by 9/12: the lower limit becomes £9,375 and the upper limit £46,875. Profits of £60,000 exceed the upper limit, so the whole amount is taxed at the main rate: £15,000, a flat 25%. The quarterly instalment threshold is £281,250 (£1.5m times 9/12, divided by 4), which is not breached, so no instalments are due.",
    ],
  },
  faqs: [
    {
      question: "What counts as an associated company?",
      answer:
        "Two companies are associated if one controls the other, or both are under the control of the same person or persons, at any point in the accounting period. Control broadly means holding more than 50% of the share capital, voting power, or rights to income or assets on a winding up. The rights of 'associates' (spouses, civil partners, parents, children, siblings, and business partners) can be attributed to you, but for relatives other than a spouse or minor child this attribution generally only applies where there is substantial commercial interdependence between the companies (financial, economic, or organisational links).",
    },
    {
      question: "Do dormant companies count as associated?",
      answer:
        "No. A company that has not carried on a trade or business at any time in the accounting period is excluded. A company that was dormant for only part of the period does count. Non-trading holding companies can also be excluded if they meet the passive conditions.",
    },
    {
      question: "Does a holding company count?",
      answer:
        "A passive holding company is excluded if it carries on no trade, has one or more 51% subsidiaries, only receives and pays out dividends in full to shareholders, has no other income, no chargeable assets, and no management expense or group relief entitlement. Fail any condition and it counts as an associate.",
    },
    {
      question: "Do overseas companies count?",
      answer:
        "Yes. Association is based on control, not residence. A non-UK resident company under common control counts when dividing the limits, even though it pays no UK corporation tax itself.",
    },
    {
      question: "Is being associated the same as being in a group?",
      answer:
        "No. Group relief needs a 75% relationship, but association only needs control (over 50%) and can arise through individuals. Two companies owned separately by the same person are associated even though they are not a group for any other tax purpose.",
    },
    {
      question: "When do quarterly instalment payments apply?",
      answer:
        "A company is 'large' and normally pays corporation tax in quarterly instalments when augmented profits exceed £1.5 million, divided by one plus the number of associated companies (for instalment purposes, counted as related 51% group companies plus associates under the post-2023 rules) and pro-rated for short periods. A one-year grace period usually applies the first time you become large, provided augmented profits are £10 million or less (also divided). 'Very large' companies above the divided £20 million threshold pay earlier still.",
    },
  ],
  related: [
    { label: "Employer NI Calculator", href: "/calculators/employer-ni-calculator" },
    { label: "Salary vs Dividend Optimiser", href: "/calculators/salary-dividend-optimiser" },
  ],
};
