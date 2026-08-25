import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, gbpRange } from "../format";
import {
  MIAM_FEE,
  MEDIATION_SESSION_PER_PERSON,
  MEDIATION_VOUCHER,
  SOLICITOR_NEGOTIATED_SETTLEMENT,
  CONSENT_ORDER_ONLINE,
  CONSENT_ORDER_SOLICITOR,
  CONSENT_ORDER_FEE,
  withVat,
} from "../divorce-finance";

export const mediationVsSolicitorCosts: GenericTool = {
  kind: "generic",
  slug: "mediation-vs-solicitor-costs",
  name: "Mediation vs Solicitor Cost Comparison",
  category: "Divorce Costs",
  oneLiner:
    "Compare the realistic cost of reaching a financial agreement through family mediation, including the £500 voucher scheme, against solicitor-led negotiation.",
  metaTitle: "Divorce Mediation vs Solicitor Costs UK 2026 | Comparison",
  metaDescription:
    "Mediation or solicitors for your divorce finances? Compare realistic total costs side by side, including MIAM fees, the £500 Family Mediation Voucher and consent order costs for each route.",
  intro:
    "Both routes end in the same place: a financial agreement sealed by a consent order. The difference is what it costs to get there. Mediation typically resolves finances for hundreds of pounds per person; solicitor-led negotiation typically costs thousands. This comparison prices both routes on your numbers, including the £500 Family Mediation Voucher where it applies, so you can see the gap before choosing.",
  ctaLabel: "Get help choosing your route →",
  embedHeight: 720,
  fields: [
    {
      id: "sessions",
      label: "Expected number of mediation sessions",
      type: "number",
      default: 4,
      min: 1,
      max: 10,
      help: "Financial cases typically settle in 3 to 5 joint sessions.",
    },
    {
      id: "sessionCost",
      label: "Mediator's fee per person, per session",
      type: "currency",
      default: 150,
      step: 10,
      help: "Typical private rates are £100 to £200 per person per session. Some services charge per couple; halve the figure if so.",
    },
    {
      id: "childDispute",
      label: "Does your case involve arrangements for a child?",
      type: "toggle",
      default: false,
      help: "The £500 Family Mediation Voucher Scheme applies to cases involving a child dispute (with or without financial issues). Confirm current availability with an accredited mediator.",
    },
    {
      id: "solicitorDrafting",
      label: "Use a solicitor (rather than an online service) to draft the consent order?",
      type: "toggle",
      default: false,
    },
  ],
  compute: (v) => {
    const sessions = Math.max(1, Math.floor(Number(v.sessions)));
    const sessionCost = Math.max(0, Number(v.sessionCost));
    const childDispute = Boolean(v.childDispute);
    const solicitorDrafting = Boolean(v.solicitorDrafting);

    // Mediation route, YOUR costs only (each party pays their own share).
    const miam = withVat(MIAM_FEE);
    const sessionsCost = sessionCost * sessions;
    const voucher = childDispute ? MEDIATION_VOUCHER : 0;
    // The voucher is per family; assume it halves between you (conservative).
    const voucherYourShare = voucher / 2;
    const drafting = solicitorDrafting ? withVat(CONSENT_ORDER_SOLICITOR) : withVat(CONSENT_ORDER_ONLINE);

    const mediationLow = Math.max(0, miam[0] + sessionsCost - voucherYourShare) + drafting[0] + CONSENT_ORDER_FEE;
    const mediationHigh = Math.max(0, miam[1] + sessionsCost - voucherYourShare) + drafting[1] + CONSENT_ORDER_FEE;

    // Solicitor route, YOUR costs only.
    const negotiation = withVat(SOLICITOR_NEGOTIATED_SETTLEMENT);
    const solicitorLow = negotiation[0] + drafting[0] + CONSENT_ORDER_FEE;
    const solicitorHigh = negotiation[1] + drafting[1] + CONSENT_ORDER_FEE;

    const savingLow = solicitorLow - mediationHigh;
    const savingHigh = solicitorHigh - mediationLow;

    return {
      headline: {
        label: "Typical saving with mediation",
        value: gbpRange(Math.max(0, savingLow), Math.max(0, savingHigh)),
        sub: "Your costs only, both routes ending in a sealed consent order.",
        tone: "good",
      },
      rows: [
        {
          label: `Mediation route: MIAM + ${sessions} sessions at ${gbp(sessionCost)}${childDispute ? ", less your £250 share of the £500 voucher" : ""}, plus consent order`,
          value: gbpRange(Math.round(mediationLow), Math.round(mediationHigh)),
          strong: true,
        },
        {
          label: "Solicitor route: negotiated settlement plus consent order",
          value: gbpRange(Math.round(solicitorLow), Math.round(solicitorHigh)),
          strong: true,
        },
        { label: "Consent order court fee (both routes)", value: gbp(CONSENT_ORDER_FEE) },
        ...(childDispute
          ? [
              {
                label: "Family Mediation Voucher applied (per family)",
                value: gbp(MEDIATION_VOUCHER),
              },
            ]
          : []),
      ],
      note:
        "Both figures are your own costs; your ex-partner pays their own share separately. Solicitor negotiation figures are typical ranges (£2,000 to £8,000 plus VAT per person) and rise sharply if matters become contested. The £500 Family Mediation Voucher covers cases involving a child dispute and has been extended into 2026/27, but funding is periodically reviewed, so confirm availability with an accredited mediator before relying on it. Mediation is not suitable in every case, for example where there has been domestic abuse or where one party will not disclose finances honestly. This is general information, not legal advice.",
    };
  },
  explainer: {
    heading: "Mediation and solicitors: what you are actually paying for",
    paragraphs: [
      "Family mediation is a structured negotiation run by a trained neutral mediator, usually across three to five joint sessions for financial cases. It starts with a MIAM (Mediation Information and Assessment Meeting), typically £90 to £120 plus VAT per person, which is in any case a legal prerequisite before most court applications about finances or children. Sessions commonly cost £100 to £200 plus VAT per person each. The outcome is a memorandum of understanding, which a solicitor or online service then converts into a binding consent order.",
      "The Family Mediation Voucher Scheme contributes up to £500 per family towards mediation costs where the case involves a dispute about a child (whether or not finances are also in issue). The scheme has been extended into 2026/27 and is claimed by the mediator on your behalf; you simply pay the reduced balance. Purely financial cases with no child dispute do not qualify.",
      "Solicitor-led negotiation replaces the joint sessions with correspondence and voluntary disclosure between two firms. It typically costs each party £2,000 to £8,000 plus VAT to reach an agreed settlement, more where disclosure is fought over, and far more if it proceeds to contested court proceedings. What you buy for that is advice in your corner: a mediator must stay neutral and cannot tell either of you whether a proposed deal is a good one.",
      "The routes are not mutually exclusive, and combining them is often the best value: mediate the deal, then pay a solicitor a fixed fee to advise on it and draft the consent order. Whichever route you take, the agreement only becomes binding once the court seals the consent order, with its £62 fee.",
    ],
  },
  workedExamples: [
    {
      heading: "Financial-only case, four sessions, online drafting",
      inputs:
        "4 mediation sessions at £150 per person, no child dispute (no voucher), online consent order drafting",
      steps: [
        "Mediation: MIAM £108 to £144 incl. VAT plus 4 sessions at £150 = £600, so £708 to £744",
        "Consent order: £335 to £959 incl. VAT drafting + £62 court fee",
        "Mediation route total: roughly £1,105 to £1,765",
        "Solicitor route: £2,400 to £9,600 incl. VAT negotiation + the same consent order costs, roughly £2,797 to £10,621",
        "Typical saving with mediation: roughly £1,032 to £9,516",
      ],
    },
    {
      heading: "Child arrangements plus finances, voucher applies",
      inputs:
        "4 sessions at £150 per person, child dispute involved so the £500 voucher applies (£250 your share), online drafting",
      steps: [
        "Mediation: £708 to £744 less £250 voucher share = £458 to £494",
        "Plus consent order: £335 to £959 drafting + £62 fee",
        "Mediation route total: roughly £855 to £1,515",
        "The voucher effectively covers around two of the four sessions per family",
      ],
    },
  ],
  faqs: [
    {
      question: "Is the £500 mediation voucher still available?",
      answer:
        "The Family Mediation Voucher Scheme has been extended into 2026/27 and the Ministry of Justice has indicated continued funding, but it is reviewed periodically and is only claimable through accredited mediators while funding lasts. It applies to cases involving a dispute about a child, with or without financial issues; purely financial cases do not qualify. Confirm current availability with your mediator before budgeting for it.",
    },
    {
      question: "Do I have to try mediation before going to court?",
      answer:
        "Almost always you must attend a MIAM before applying to court about finances or children, unless an exemption applies (such as domestic abuse or urgency). You are not forced to mediate after the MIAM, but courts increasingly expect a good reason for refusing, and can take unreasonable refusal into account on costs.",
    },
    {
      question: "Is a mediated agreement legally binding?",
      answer:
        "Not by itself. Mediation produces a memorandum of understanding, which is deliberately not binding so you can take advice on it. It becomes binding when converted into a consent order and sealed by the court, which is why both routes in this comparison include the consent order cost.",
    },
    {
      question: "When is mediation not appropriate?",
      answer:
        "Where there has been domestic abuse or coercive control, where one party hides assets or refuses honest disclosure, where there is urgency (such as assets being dissipated), or where one party simply will not engage. Mediators screen for these at the MIAM. In those cases solicitor-led negotiation or a court application protects you better, whatever the cost difference.",
    },
    {
      question: "Can I still use a solicitor if we mediate?",
      answer:
        "Yes, and it is usually wise. Many people take fixed-fee advice between mediation sessions and have a solicitor review the final memorandum before it becomes a consent order. A mediator is neutral and cannot advise either of you individually, so independent advice is the safety check on the deal.",
    },
    {
      question: "What does legal aid cover here?",
      answer:
        "Legal aid can still cover mediation itself (and the MIAM) if you qualify financially, and if one party qualifies, the MIAM and first session can be free for both. Legal aid for solicitor negotiation in finance cases was almost entirely removed by LASPO 2012, with a narrow exception for evidenced domestic abuse.",
    },
  ],
  related: [
    { label: "Divorce cost calculator", href: "/calculators/divorce-cost-calculator" },
    { label: "Consent order cost calculator", href: "/calculators/consent-order-cost-calculator" },
    { label: "Help with Fees (EX160) remission checker", href: "/calculators/help-with-fees-checker" },
  ],
};
