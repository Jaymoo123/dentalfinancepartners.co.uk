import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcSolicitorTakeHome } from "@/lib/tools/compute/solicitor-take-home";

export const solicitorTakeHomeTool: GenericTool = {
  kind: "generic",
  slug: "partnership-vs-llp-take-home",
  name: "Solicitor Take-Home Calculator",
  category: "Income Tax",
  oneLiner:
    "Compare sole trader, partnership/LLP and limited company on annual net take-home. UK 2026/27 rates.",
  embedHeight: 520,
  metaTitle: "Solicitor Take-Home Calculator 2026/27 | Sole Trader vs LLP vs Ltd",
  metaDescription:
    "Free solicitor take-home calculator. Compare sole trader, partnership/LLP and limited company structures on net annual income. UK 2026/27 income tax and NI.",
  intro:
    "Choosing the right structure affects your annual net take-home more than most solicitors realise. Enter your profit and pension contribution to see how sole trader, partnership/LLP and limited company compare on a like-for-like basis.",
  fields: [
    {
      id: "profit",
      label: "Profit available for extraction",
      type: "currency",
      default: 150000,
      min: 0,
      max: 2000000,
      step: 1000,
      help: "Annual pre-extraction profit from your practice",
    },
    {
      id: "pensionContrib",
      label: "Personal pension contribution",
      type: "currency",
      default: 0,
      min: 0,
      max: 60000,
      step: 500,
      help: "Annual pension contribution (reduces taxable income)",
    },
  ],
  compute(values) {
    const profit = Number(values.profit);
    const pensionContrib = Number(values.pensionContrib);
    const r = calcSolicitorTakeHome({ profit, pensionContrib });
    const structures = [
      { name: "Sole Trader", net: r.soleTrader.net },
      { name: "Partnership / LLP", net: r.partnership.net },
      { name: "Limited Company", net: r.ltd.net },
    ];
    const winner = structures.reduce((a, b) => (b.net > a.net ? b : a));
    const rows = structures.map((s) => ({
      label: s.name,
      value: gbp(Math.round(s.net)),
      strong: s.name === winner.name ? (true as const) : undefined,
    }));
    return {
      headline: {
        label: `${winner.name} wins`,
        value: gbp(Math.round(winner.net)),
        sub: "Annual net take-home under the best structure",
        tone: "good" as const,
      },
      rows,
      note: "UK 2026/27 (FA 2026 dividend rates from 6 April 2026: 10.75% basic / 35.75% higher / 39.35% additional). Partnership and LLP are tax-transparent (identical result). Ltd assumes £12,570 salary + dividend, £2,500 admin cost, no Employment Allowance.",
    };
  },
  explainer: {
    heading: "How this calculator works",
    paragraphs: [
      "For sole trader and partnership/LLP, profit is taxed as personal income (income tax at 20%/40%/45% plus Class 4 NI at 6%/2%). Both structures are tax-transparent so they produce the same result.",
      "For a limited company, the calculation applies corporation tax on profits (19% small/25% main rate), employer NI on the minimum salary (£12,570), then dividend tax on the remaining distributable profit. A fixed £2,500 annual admin cost is included.",
      "The headline tax efficiency of Ltd over partnership/LLP has narrowed at 2026/27 rates following the FA 2026 dividend rise (basic rate 10.75%, higher rate 35.75%). The real reasons to incorporate (retained earnings, multiple shareholders, future share sale) usually matter more than the marginal tax saving.",
    ],
  },
  faqs: [
    {
      question: "Are partnership and LLP really treated the same for tax?",
      answer:
        "Yes. Both are tax-transparent: each member is taxed personally on their share of profits (income tax plus Class 4 National Insurance). The legal distinction between partnership and LLP does not affect income tax or NI treatment for individual members.",
    },
    {
      question: "Should I incorporate my solicitor practice?",
      answer:
        "It depends on your income level, plans to retain earnings in the business, future exit route, and whether you intend to bring in shareholders. At profits below roughly £80,000-£100,000 the tax saving from a limited company is modest or zero after admin costs. Above that level the saving grows, but must be weighed against the complexity and running cost of a company.",
    },
    {
      question: "What pension contribution should I enter?",
      answer:
        "Enter your planned annual personal pension contribution. This reduces your taxable income for all three structures (sole trader, partnership/LLP, and the Ltd salary/dividend split). The annual allowance is £60,000 (2026/27), tapering for high earners.",
    },
  ],
};
