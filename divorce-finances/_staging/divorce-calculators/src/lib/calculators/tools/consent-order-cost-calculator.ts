import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, gbpRange } from "../format";
import {
  CONSENT_ORDER_FEE,
  CONSENT_ORDER_ONLINE,
  CONSENT_ORDER_SOLICITOR,
  withVat,
  type CostBand,
} from "../divorce-finance";

const DRAFTING: Record<string, { band: CostBand; vat: boolean; label: string }> = {
  diy: { band: [0, 0], vat: false, label: "DIY drafting (court fee only, risky)" },
  online: { band: CONSENT_ORDER_ONLINE, vat: true, label: "Online fixed-fee drafting service" },
  solicitor: { band: CONSENT_ORDER_SOLICITOR, vat: true, label: "Solicitor drafting" },
};

export const consentOrderCostCalculator: GenericTool = {
  kind: "generic",
  slug: "consent-order-cost-calculator",
  name: "Consent Order and Clean Break Order Cost Calculator",
  category: "Divorce Costs",
  oneLiner:
    "Work out the cost of a consent order or clean break order: the £62 court fee plus realistic drafting costs for DIY, online fixed-fee and solicitor routes.",
  metaTitle: "Consent Order Cost Calculator UK 2026 | Clean Break Order Costs",
  metaDescription:
    "How much does a consent order or clean break order cost? Court fee £62 from 13 July 2026 plus drafting. Compare DIY, online fixed-fee services and solicitor drafting with realistic ranges.",
  intro:
    "A consent order turns your financial agreement into a binding court order; a clean break order goes further and permanently closes financial claims between you. Both use the same process and the same £62 court fee (from 13 July 2026). The real cost variable is the drafting. This calculator gives you a realistic total for each route.",
  ctaLabel: "Get your consent order handled properly →",
  embedHeight: 640,
  fields: [
    {
      id: "draftingRoute",
      label: "Who will draft the order?",
      type: "select",
      default: "online",
      options: [
        { value: "diy", label: "Ourselves (DIY, court fee only)" },
        { value: "online", label: "Online fixed-fee drafting service" },
        { value: "solicitor", label: "High-street solicitor" },
      ],
    },
    {
      id: "cleanBreak",
      label: "Do you want a clean break (closing all future claims)?",
      type: "toggle",
      default: true,
      help: "A clean break clause is usually drafted within the same order for the same or a similar price. Without it, income claims can stay open.",
    },
    {
      id: "bothRepresented",
      label: "Will the other party take independent advice on the draft?",
      type: "toggle",
      default: false,
      help: "Recommended and often expected by the court. Typically adds a one-off review cost for the other party.",
    },
  ],
  compute: (v) => {
    const route = String(v.draftingRoute);
    const cleanBreak = Boolean(v.cleanBreak);
    const bothRepresented = Boolean(v.bothRepresented);

    const d = DRAFTING[route] ?? DRAFTING.online;
    const drafting = d.vat ? withVat(d.band) : d.band;
    // Independent review of a drafted order for the other party, typical
    // fixed cost £250 to £500 + VAT (estimate, queued for verification).
    const review: CostBand = bothRepresented ? withVat([250, 500]) : [0, 0];

    const low = CONSENT_ORDER_FEE + drafting[0] + review[0];
    const high = CONSENT_ORDER_FEE + drafting[1] + review[1];

    const rows = [
      { label: "Court fee (from 13 July 2026)", value: gbp(CONSENT_ORDER_FEE) },
      { label: d.label + (d.vat ? " (incl. VAT)" : ""), value: gbpRange(drafting[0], drafting[1]) },
    ];
    if (bothRepresented) {
      rows.push({
        label: "Independent review for the other party (incl. VAT)",
        value: gbpRange(review[0], review[1]),
      });
    }
    rows.push({ label: "Estimated total", value: gbpRange(low, high), strong: true } as never);

    const diyWarning =
      route === "diy"
        ? " DIY drafting is the cheapest route but also the most commonly rejected: judges refuse orders that are unclear, unfair on their face or missing required clauses, and a rejected order means starting again. Most people at least have a professional draft checked."
        : "";

    return {
      headline: {
        label: cleanBreak ? "Estimated clean break order cost" : "Estimated consent order cost",
        value: gbpRange(low, high),
        sub: "Court fee plus typical drafting costs. Drafting figures are market ranges, not quotes.",
      },
      rows,
      note:
        "The £62 court fee is the published HMCTS amount from 13 July 2026 (previously £60). Drafting costs are typical published fixed fees and vary by provider and complexity; pension sharing or property transfer clauses usually sit at the top of the range or above it." +
        diyWarning +
        " This is general information, not legal advice.",
    };
  },
  explainer: {
    heading: "Consent orders and clean break orders explained",
    paragraphs: [
      "A consent order is a financial order the court makes because you both agree to it, rather than after a contested hearing. It records who keeps what: the house, savings, pensions, any ongoing maintenance. Once sealed by the court it is binding and enforceable. You can only apply for one once your divorce has reached the conditional order stage.",
      "A clean break order is a consent order that includes clauses dismissing all future financial claims between you: capital, income and (on death) claims against each other's estates. Without those clauses, an ex-spouse can come back years later, even after the final order; the courts have allowed claims decades after separation where no order was ever made. If you have no ongoing maintenance, a clean break is usually what you want, and it costs little or nothing extra to include.",
      "The court fee is £62 from 13 July 2026. The drafting is where costs vary: online fixed-fee services typically charge a few hundred pounds, high-street solicitors more, and complex orders involving pension sharing annexes or property transfers more again. The judge reviewing the order does not just rubber-stamp it; a statement of information (Form D81) about both parties' finances must accompany it, and orders that look unfair or are badly drafted get rejected.",
      "One order covers both of you. It is normal for one side to pay for the drafting and the other to take independent advice on the draft, which is cheaper than both instructing solicitors from scratch.",
    ],
  },
  workedExamples: [
    {
      title: "Online fixed-fee clean break order",
      description:
        "A couple with no ongoing maintenance agree a straightforward split and use an online fixed-fee service for a clean break consent order.",
      inputs: { draftingRoute: "online", cleanBreak: true, bothRepresented: false },
      result: {
        courtFee: "£62",
        drafting: "£279 to £799 plus VAT (£335 to £959 incl. VAT)",
        total: "Roughly £397 to £1,021",
      },
    },
    {
      title: "Solicitor-drafted order with independent review",
      description:
        "One party's solicitor drafts an order including a pension sharing clause; the other party pays for an independent review of the draft.",
      inputs: { draftingRoute: "solicitor", cleanBreak: true, bothRepresented: true },
      result: {
        courtFee: "£62",
        drafting: "£500 to £1,500 plus VAT (£600 to £1,800 incl. VAT)",
        review: "£250 to £500 plus VAT (£300 to £600 incl. VAT)",
        total: "Roughly £962 to £2,462 across both parties",
      },
    },
  ],
  faqs: [
    {
      question: "How much does a consent order cost in total?",
      answer:
        "The court fee is £62 from 13 July 2026. On top of that, online fixed-fee drafting services typically charge around £279 to £799 plus VAT, and high-street solicitors around £500 to £1,500 plus VAT for a straightforward order. Complex orders with pension sharing or property transfers cost more.",
    },
    {
      question: "What is the difference between a consent order and a clean break order?",
      answer:
        "A clean break order is a type of consent order. Every clean break order is a consent order, but a consent order only delivers a clean break if it contains clauses dismissing all future claims. If you see the two priced separately, the process and court fee are identical; the difference is in the drafting.",
    },
    {
      question: "Can we write our own consent order?",
      answer:
        "You can, but the court applies the same scrutiny to a DIY order as to a professionally drafted one, and drafting financial orders is technical. Missing dismissal clauses, defective pension sharing annexes and unclear property terms are common reasons for rejection. Given the drafting cost relative to what the order protects, DIY is rarely the economical choice in practice.",
    },
    {
      question: "When can we apply for a consent order?",
      answer:
        "After the conditional order (formerly decree nisi) in your divorce, and ideally before the final order. You submit the agreed draft, the D81 statement of information and the £62 fee. Most consent orders are approved on paper without a hearing, typically within a few weeks depending on court workload.",
    },
    {
      question: "Do we need a consent order if we have nothing to split?",
      answer:
        "It is still worth considering a clean break order. Financial claims survive the divorce itself, so a future inheritance, lottery win or business success could be claimed against by an ex-spouse years later. A clean break order closes that door permanently, which is precisely why it matters most when there is nothing to argue about today.",
    },
    {
      question: "Does Help with Fees apply to the consent order fee?",
      answer:
        "Yes. The £62 fee is covered by the Help with Fees scheme on the same income and capital tests as the divorce application fee. Use our Help with Fees checker to see if you qualify.",
    },
  ],
  related: [
    { label: "Divorce cost calculator", href: "/calculators/divorce-cost-calculator" },
    { label: "Help with Fees (EX160) remission checker", href: "/calculators/help-with-fees-checker" },
    { label: "Financial settlement range estimator", href: "/calculators/settlement-range-estimator" },
  ],
};
