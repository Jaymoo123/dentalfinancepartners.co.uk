import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";
import { gbpRange } from "../format";
import {
  DIVORCE_APPLICATION_FEE,
  CONSENT_ORDER_FEE,
  CONTESTED_FINANCIAL_ORDER_FEE,
  ONLINE_DIVORCE_SERVICE,
  SOLICITOR_UNCONTESTED_DIVORCE,
  SOLICITOR_NEGOTIATED_SETTLEMENT,
  CONTESTED_PROCEEDINGS,
  CONSENT_ORDER_ONLINE,
  CONSENT_ORDER_SOLICITOR,
  MIAM_FEE,
  MEDIATION_SESSION_PER_PERSON,
  MEDIATION_VOUCHER,
  withVat,
  bandPlus,
  type CostBand,
} from "../divorce-finance";

// Route cost bands for the DIVORCE PROCESS itself (excl. financial order),
// per person, court fee added separately so Help with Fees can zero it.
const ROUTE_BANDS: Record<string, { band: CostBand; label: string; vat: boolean }> = {
  diy: { band: [0, 0], label: "DIY (you file the application yourself)", vat: false },
  online: { band: ONLINE_DIVORCE_SERVICE, label: "Online divorce service", vat: true },
  solicitor: { band: SOLICITOR_UNCONTESTED_DIVORCE, label: "Solicitor-managed divorce", vat: true },
};

export const divorceCostCalculator: GenericTool = {
  kind: "generic",
  slug: "divorce-cost-calculator",
  name: "Divorce Cost Calculator UK",
  category: "Divorce Costs",
  oneLiner:
    "Estimate the full cost of your divorce by route: DIY, online service, solicitor or mediation, including the £628 court fee that applies from 13 July 2026.",
  metaTitle: "Divorce Cost Calculator UK 2026 | Court Fees + Route Costs",
  metaDescription:
    "Work out how much your divorce will cost in England and Wales. Compares DIY, online service and solicitor routes, includes the £628 application fee from 13 July 2026 and the cost of sorting finances.",
  intro:
    "The court fee for a divorce application in England and Wales is £628 from 13 July 2026 (it was £612 before). Everything on top of that depends on the route you take and whether you also formalise your finances. This calculator builds a realistic total for your situation, from a fee-only DIY divorce to solicitor-negotiated finances, and flags where Help with Fees or mediation could cut the bill.",
  ctaLabel: "Talk to a divorce finances specialist →",
  embedHeight: 700,
  fields: [
    {
      id: "route",
      label: "How will you handle the divorce application?",
      type: "select",
      default: "online",
      options: [
        { value: "diy", label: "DIY: file it myself on gov.uk (court fee only)" },
        { value: "online", label: "Online divorce service handles the paperwork" },
        { value: "solicitor", label: "Solicitor manages the divorce" },
      ],
    },
    {
      id: "finances",
      label: "How will you sort out the finances?",
      type: "select",
      default: "consent",
      options: [
        { value: "none", label: "No financial order (not recommended, claims stay open)" },
        { value: "consent", label: "We agree: consent order (£62 court fee + drafting)" },
        { value: "mediation", label: "Mediation first, then a consent order" },
        { value: "negotiated", label: "Solicitors negotiate a settlement for us" },
        { value: "contested", label: "Contested court proceedings (£321 court fee)" },
      ],
    },
    {
      id: "hwfLikely",
      label: "Do you expect to qualify for Help with Fees (EX160)?",
      type: "toggle",
      default: false,
      help: "If your income and savings are low enough, the court fees can be reduced to nil. Use our Help with Fees checker to find out.",
    },
  ],
  compute: (v) => {
    const route = String(v.route);
    const finances = String(v.finances);
    const hwfLikely = Boolean(v.hwfLikely);

    const routeInfo = ROUTE_BANDS[route] ?? ROUTE_BANDS.diy;
    const routeBand = routeInfo.vat ? withVat(routeInfo.band) : routeInfo.band;

    const applicationFee = hwfLikely ? 0 : DIVORCE_APPLICATION_FEE;

    let financeBand: CostBand = [0, 0];
    let financeFee = 0;
    let financeLabel = "No financial order";
    if (finances === "consent") {
      financeFee = hwfLikely ? 0 : CONSENT_ORDER_FEE;
      financeBand = withVat([CONSENT_ORDER_ONLINE[0], CONSENT_ORDER_SOLICITOR[1]]);
      financeLabel = "Consent order (drafting + court fee)";
    } else if (finances === "mediation") {
      financeFee = hwfLikely ? 0 : CONSENT_ORDER_FEE;
      const mediation: CostBand = [
        MIAM_FEE[0] + MEDIATION_SESSION_PER_PERSON[0] * 3,
        MIAM_FEE[1] + MEDIATION_SESSION_PER_PERSON[1] * 5,
      ];
      const drafting = withVat([CONSENT_ORDER_ONLINE[0], CONSENT_ORDER_SOLICITOR[1]]);
      financeBand = [
        Math.max(0, mediation[0] - MEDIATION_VOUCHER) + drafting[0],
        mediation[1] + drafting[1],
      ];
      financeLabel = "Mediation + consent order (low end assumes the £500 voucher)";
    } else if (finances === "negotiated") {
      financeFee = hwfLikely ? 0 : CONSENT_ORDER_FEE;
      financeBand = withVat(SOLICITOR_NEGOTIATED_SETTLEMENT);
      financeLabel = "Solicitor-negotiated settlement + consent order fee";
    } else if (finances === "contested") {
      financeFee = hwfLikely ? 0 : CONTESTED_FINANCIAL_ORDER_FEE;
      financeBand = withVat(CONTESTED_PROCEEDINGS);
      financeLabel = "Contested financial proceedings (your costs only)";
    }

    const totalLow = applicationFee + routeBand[0] + financeFee + financeBand[0];
    const totalHigh = applicationFee + routeBand[1] + financeFee + financeBand[1];

    const rows = [
      {
        label: hwfLikely
          ? "Divorce application court fee (Help with Fees assumed: £0)"
          : "Divorce application court fee (from 13 July 2026)",
        value: gbp(applicationFee),
      },
      { label: routeInfo.label + (routeInfo.vat ? " (incl. VAT)" : ""), value: gbpRange(routeBand[0], routeBand[1]) },
    ];
    if (finances !== "none") {
      rows.push({
        label: hwfLikely ? "Financial order court fee (Help with Fees assumed: £0)" : "Financial order court fee",
        value: gbp(financeFee),
      });
      rows.push({ label: financeLabel, value: gbpRange(financeBand[0], financeBand[1]) });
    }
    rows.push({ label: "Estimated total", value: gbpRange(totalLow, totalHigh), strong: true } as never);

    const noFinanceWarning =
      finances === "none"
        ? " Without a financial order, financial claims between you remain open indefinitely, even after the final order. A clean break consent order is usually the cheapest way to close them."
        : "";

    return {
      headline: {
        label: "Estimated total cost of your divorce",
        value: gbpRange(totalLow, totalHigh),
        sub: "Your costs only. Solicitor and service figures are typical market ranges, not quotes.",
        tone: finances === "contested" ? "warn" : "default",
      },
      rows,
      note:
        "Court fees are the published HMCTS amounts from 13 July 2026. All other figures are typical market ranges including VAT and vary by firm, region and complexity." +
        noFinanceWarning +
        " This is general information, not legal advice. A specialist can quote precisely for your circumstances.",
    };
  },
  explainer: {
    heading: "What a divorce actually costs in England and Wales",
    paragraphs: [
      "There are two separate bills in a divorce: the divorce itself (ending the marriage) and the financial settlement (dividing what you own). The divorce application carries a fixed court fee of £628 from 13 July 2026, paid by the applicant (or split on a joint application by agreement). If you file yourself on gov.uk and your finances are simple, that fee can be the entire cost.",
      "Most of the variation comes from the finances. A consent order, where you both agree and ask the court to approve the deal, costs a £62 court fee plus drafting, typically a few hundred pounds through an online fixed-fee service or more through a solicitor. Solicitor-negotiated settlements commonly run to several thousand pounds each. Fully contested proceedings to a final hearing routinely cost each side £10,000 to £30,000 or more, which is why courts and mediators push hard for agreement.",
      "Two schemes can cut the bill. Help with Fees (form EX160) can reduce the court fees to nil if your income and savings are low enough. The Family Mediation Voucher Scheme contributes £500 towards mediation where a child dispute is involved. Both are covered by their own tools on this site.",
      "Legal aid is not generally available for divorce or financial proceedings since LASPO 2012, except in limited cases such as evidenced domestic abuse. For most people the realistic cost levers are the route you choose and how quickly you can reach agreement.",
    ],
  },
  workedExamples: [
    {
      title: "DIY divorce with an agreed consent order",
      description:
        "A couple agree everything between themselves. One files the divorce application on gov.uk and they use an online fixed-fee service to draft the consent order.",
      inputs: { route: "diy", finances: "consent", hwfLikely: false },
      result: {
        courtFees: "£628 application + £62 consent order = £690",
        drafting: "Online drafting typically £279 to £1,500 plus VAT depending on provider",
        total: "Roughly £1,025 to £2,490 all in",
      },
    },
    {
      title: "Solicitor-managed divorce with negotiated finances",
      description:
        "One party instructs a solicitor for both the divorce and a negotiated financial settlement, sealed with a consent order.",
      inputs: { route: "solicitor", finances: "negotiated", hwfLikely: false },
      result: {
        courtFees: "£628 + £62 = £690",
        solicitor: "Divorce management £500 to £1,500 plus settlement negotiation £2,000 to £8,000, plus VAT",
        total: "Roughly £3,690 to £12,090",
      },
    },
    {
      title: "Low income applicant using Help with Fees",
      description:
        "An applicant on Universal Credit with savings under £4,250 qualifies for full fee remission and handles the divorce DIY with a consent order.",
      inputs: { route: "diy", finances: "consent", hwfLikely: true },
      result: {
        courtFees: "£0 (both the £628 and £62 fees remitted under EX160)",
        total: "Only the consent order drafting cost remains, from around £335 including VAT online",
      },
    },
  ],
  faqs: [
    {
      question: "How much is the divorce court fee in 2026?",
      answer:
        "The fee for a divorce or dissolution application in England and Wales is £628 from 13 July 2026. Before that date it was £612. The fee is the same whether you apply solely or jointly, and whether or not you use a solicitor.",
    },
    {
      question: "Who pays the divorce fee?",
      answer:
        "On a sole application, the applicant pays. On a joint application, applicant one pays by default but you can agree to split it between you. The court does not automatically order the other party to reimburse the fee, although you can ask for a costs order in some circumstances.",
    },
    {
      question: "Do I need a solicitor to get divorced?",
      answer:
        "No. Since no-fault divorce arrived in April 2022 the application itself is straightforward and many people file on gov.uk without a solicitor. Where professional help earns its keep is on the finances: a badly drawn or missing financial order can leave claims open for years. Many people do the divorce DIY and pay only for help with the consent order.",
    },
    {
      question: "Why is a contested divorce so much more expensive?",
      answer:
        "Under no-fault divorce the divorce itself can no longer really be contested. The expensive fights are about money. Contested financial remedy proceedings involve a £321 court application, compulsory disclosure on Form E, up to three court hearings and often barristers. Each side commonly spends £10,000 to £30,000 or more to reach a final hearing, which is why the great majority of cases settle before one.",
    },
    {
      question: "Can I get help paying the court fees?",
      answer:
        "Possibly. The Help with Fees scheme (form EX160) remits some or all of a court fee if your savings are below the capital limit and your income is below the threshold for your household size, or you receive a qualifying benefit. Our Help with Fees checker works through the current thresholds for you.",
    },
    {
      question: "Is a financial order really necessary if we agree on everything?",
      answer:
        "An informal agreement does not bind either of you. Until a court order is made, each of you keeps the right to make financial claims against the other, and that right survives the divorce itself. A consent order with a clean break clause is the only way to close those claims permanently, and at a £62 court fee plus drafting it is inexpensive insurance.",
    },
  ],
  related: [
    { label: "Help with Fees (EX160) remission checker", href: "/calculators/help-with-fees-checker" },
    { label: "Consent order cost calculator", href: "/calculators/consent-order-cost-calculator" },
    { label: "Mediation vs solicitor cost comparison", href: "/calculators/mediation-vs-solicitor-costs" },
  ],
};
