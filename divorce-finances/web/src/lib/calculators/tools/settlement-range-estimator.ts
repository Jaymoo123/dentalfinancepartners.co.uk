import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbpRange } from "../format";
import { pct } from "../format";
import { settlementRange, type IncomeDisparity } from "../divorce-finance";

export const settlementRangeEstimator: GenericTool = {
  kind: "generic",
  slug: "settlement-range-estimator",
  name: "Divorce Financial Settlement Range Estimator",
  category: "Financial Settlement",
  oneLiner:
    "An indicative range, never a single figure, for how matrimonial assets might be divided, built on the section 25 factors and the sharing principle with every assumption stated.",
  metaTitle: "Divorce Settlement Calculator UK | Indicative Range Estimator",
  metaDescription:
    "Estimate an indicative range for your divorce financial settlement. Based on the section 25 MCA 1973 factors, the sharing principle and needs, with all assumptions stated. Information only, not advice.",
  intro:
    "There is no formula for a divorce settlement in England and Wales. The court weighs the factors in section 25 of the Matrimonial Causes Act 1973, starting from an equal division of matrimonial assets and adjusting mainly for needs, especially housing children. Any tool that gives you a single entitlement figure is guessing. This one is honest about that: it applies the published principles to your inputs and returns a range, with every assumption stated. It is indicative only and is not legal or financial advice.",
  ctaLabel: "Discuss your settlement with a specialist →",
  embedHeight: 760,
  fields: [
    {
      id: "netAssets",
      label: "Total net matrimonial assets (excluding pensions)",
      type: "currency",
      default: 300000,
      step: 10000,
      help: "House equity plus savings and investments, minus joint debts. Pensions are dealt with separately (usually by a pension sharing order) and are deliberately excluded here.",
    },
    {
      id: "marriageYears",
      label: "Length of the marriage in years (including cohabitation that led straight into it)",
      type: "number",
      default: 12,
      min: 0,
      max: 60,
    },
    {
      id: "childrenUnder18",
      label: "Children under 18",
      type: "number",
      default: 1,
      min: 0,
      max: 8,
    },
    {
      id: "lowerEarnerPrimaryCarer",
      label: "Will the children live mainly with the lower earner?",
      type: "toggle",
      default: true,
    },
    {
      id: "incomeDisparity",
      label: "Gap between your incomes and earning capacities",
      type: "select",
      default: "moderate",
      options: [
        { value: "similar", label: "Similar: both earn roughly the same" },
        { value: "moderate", label: "Moderate: one earns noticeably more" },
        { value: "large", label: "Large: one earns little or nothing" },
      ],
    },
  ],
  compute: (v) => {
    const r = settlementRange({
      netAssets: Math.max(0, Number(v.netAssets)),
      marriageYears: Math.max(0, Number(v.marriageYears)),
      childrenUnder18: Math.max(0, Number(v.childrenUnder18)),
      incomeDisparity: String(v.incomeDisparity) as IncomeDisparity,
      lowerEarnerPrimaryCarer: Boolean(v.lowerEarnerPrimaryCarer),
    });

    return {
      headline: {
        label: "Indicative range for the lower-earning party's share",
        value: gbpRange(Math.round(r.amountLow), Math.round(r.amountHigh)),
        sub: `${pct(r.shareLow * 100, 0)} to ${pct(r.shareHigh * 100, 0)} of net assets. Indicative only, not advice, and not a prediction of any court outcome.`,
      },
      rows: [
        {
          label: "Share of net assets (lower earner)",
          value: `${pct(r.shareLow * 100, 0)} to ${pct(r.shareHigh * 100, 0)}`,
          strong: true,
        },
        ...r.adjustments.map((a) => ({ label: "Assumption applied", value: a })),
      ],
      note:
        "INDICATIVE ONLY. This model applies the sharing principle and broad needs-based adjustments drawn from section 25 MCA 1973 and reported case law. It cannot weigh the things that actually decide real cases: mortgage capacity, specific housing needs, health, non-matrimonial assets, conduct in rare cases, or the terms you might trade (for example more capital instead of pension sharing). Pensions are excluded and often change the picture materially; pension sharing is information we cover separately, and pension decisions may need regulated financial advice. This tool does not provide legal or financial advice.",
    };
  },
  explainer: {
    heading: "How courts actually decide financial settlements",
    paragraphs: [
      "Section 25 of the Matrimonial Causes Act 1973 lists what the court must consider: the parties' resources and earning capacities, their needs, the standard of living during the marriage, its length, the parties' ages and health, contributions (including as homemaker), and, first of all, the welfare of any child under 18. Since White v White (2000), the court checks its outcome against a yardstick of equality: departures from a 50/50 division of matrimonial assets need justifying.",
      "In most cases the deciding principle is needs. Where there is not enough to house both parties comfortably, the assets go where the needs are, and the parent with whom the children mainly live usually needs the larger share of the capital, sometimes well above half. In bigger-money cases, where needs are met with room to spare, the sharing principle dominates and outcomes cluster nearer to equality.",
      "Marriage length matters at the short end. After a short childless marriage the court gives more weight to what each party brought in, and the financially weaker party may receive less than half. After a long marriage, distinguishing who brought what becomes artificial and equality is the strong default.",
      "Pensions are part of the pot but are divided by their own mechanisms: pension sharing orders, offsetting against other assets, or (rarely now) attachment. Valuing pensions fairly often needs an actuarial report rather than simple arithmetic on the cash equivalent values, which is why this estimator deliberately keeps them out of its inputs.",
      "Remember the range you get here is a modelling exercise on stated assumptions. Real settlements are negotiated: most couples settle by agreement, through solicitors or mediation, and record the deal in a consent order rather than asking a judge to decide.",
    ],
  },
  workedExamples: [
    {
      heading: "Medium-length marriage, one child with the lower earner",
      inputs:
        "Net assets £300,000 excluding pensions, 12 year marriage, one child under 18 living mainly with the lower earner, moderate income gap",
      steps: [
        "Starting point: sharing principle, 45% to 55% band around an equal split",
        "One child housed by the lower earner: needs adjustment moves the band up to 50% to 65%",
        "Indicative range for the lower earner: £150,000 to £195,000 of the £300,000",
        "Pensions excluded: a pension sharing order would be negotiated on top of this",
      ],
    },
    {
      heading: "Short marriage, no children, similar incomes",
      inputs: "Net assets £150,000, 3 year marriage, no children, similar earning capacities",
      steps: [
        "Short childless marriage: contributions carry more weight, band extends below equality",
        "Similar incomes: no needs-based uplift",
        "Indicative range for the financially weaker party: 35% to 50%, so £52,500 to £75,000",
        "In practice the outcome would lean heavily on who contributed what to the £150,000",
      ],
    },
    {
      heading: "Long marriage, large income gap, children with the lower earner",
      inputs:
        "Net assets £500,000, 20 year marriage, two children under 18 with the lower earner, large income gap",
      steps: [
        "Long marriage: strong equality default, 45% to 55% band",
        "Children housed by the lower earner plus a large earning gap: needs push the top of the band to 70%",
        "Indicative range for the lower earner: 50% to 70%, so £250,000 to £350,000",
        "A real outcome here would turn on housing costs, mortgage capacity and pension values",
      ],
    },
  ],
  faqs: [
    {
      question: "Is there a formula for divorce settlements in the UK?",
      answer:
        "No. England and Wales use judicial discretion guided by the section 25 factors, not a formula. The nearest thing to a rule is the yardstick of equality from White v White: start at 50/50 for matrimonial assets and justify any departure, most commonly by needs. That is why this tool outputs a range rather than a figure.",
    },
    {
      question: "Is my spouse automatically entitled to half of everything?",
      answer:
        "No. Equality is the starting point for matrimonial assets, not a rule, and it is routinely departed from. Needs (especially housing children) push outcomes one way; short marriages, non-matrimonial assets such as inheritances or pre-marital wealth, and similar earning capacities pull them back the other.",
    },
    {
      question: "Do pensions count in a settlement?",
      answer:
        "Yes, pensions built up during the marriage are matrimonial assets and are often one of the largest. They are usually divided by a pension sharing order or offset against other assets. Fair pension division frequently needs an actuarial (PODE) report because cash equivalent values can mislead, particularly for defined benefit schemes. This estimator excludes pensions for exactly that reason, and decisions about them may need regulated financial advice.",
    },
    {
      question: "Does it matter whose name the assets are in?",
      answer:
        "Much less than people expect. Assets built up during the marriage are generally matrimonial regardless of legal ownership, including a family home held in one name. Non-matrimonial assets (inheritances, pre-marital property) have more protection, but even they can be invaded to meet needs.",
    },
    {
      question: "Does behaviour or adultery affect the settlement?",
      answer:
        "Almost never. Conduct is only relevant where it would be inequitable to disregard it, a deliberately high bar reserved for extreme cases (for example serious violence affecting earning capacity, or dissipating the assets). Adultery and everyday relationship conduct do not move the financial outcome.",
    },
    {
      question: "How do we turn an agreement into something binding?",
      answer:
        "Through a consent order approved by the court, usually with a clean break clause closing future claims. Until an order is made, financial claims stay open no matter what you have agreed informally. See our consent order cost calculator for what that costs.",
    },
    {
      question: "Can this tool tell me what I will get?",
      answer:
        "No, and be wary of anything that claims to. It applies published principles to five inputs; a real outcome depends on full financial disclosure and factors no calculator sees. Use the range to sense-check proposals and to prepare for a conversation with a specialist, not as a prediction.",
    },
  ],
  related: [
    { label: "Consent order cost calculator", href: "/calculators/consent-order-cost-calculator" },
    { label: "Mediation vs solicitor cost comparison", href: "/calculators/mediation-vs-solicitor-costs" },
    { label: "Divorce cost calculator", href: "/calculators/divorce-cost-calculator" },
  ],
};
