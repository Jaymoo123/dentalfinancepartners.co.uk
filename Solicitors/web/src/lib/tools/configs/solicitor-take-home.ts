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
    "Whether you are a salaried partner, locum solicitor, or freelance consultant, your structure affects your annual net take-home more than most people realise. Enter your annual profit or day rate to see how sole trader, partnership/LLP and limited company compare on a like-for-like basis.",
  fields: [
    {
      id: "mode",
      label: "Input mode",
      type: "select",
      default: "annual",
      options: [
        { value: "annual", label: "Annual profit" },
        { value: "dayRate", label: "Day rate (locum / consultant)" },
      ],
      help: "Switch between entering a known annual profit or a day rate with days worked",
    },
    {
      id: "profit",
      label: "Profit available for extraction",
      type: "currency",
      default: 150000,
      min: 0,
      max: 2000000,
      step: 1000,
      help: "Annual pre-extraction profit (used when input mode is Annual profit)",
    },
    {
      id: "dayRate",
      label: "Day rate",
      type: "currency",
      default: 350,
      min: 0,
      max: 5000,
      step: 25,
      help: "Your charge-out day rate (used when input mode is Day rate)",
    },
    {
      id: "daysWorked",
      label: "Days worked per year",
      type: "number",
      default: 180,
      min: 1,
      max: 365,
      step: 5,
      help: "Billable days in the year (used when input mode is Day rate)",
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
    const mode = String(values.mode ?? "annual");
    const profit =
      mode === "dayRate"
        ? Number(values.dayRate) * Number(values.daysWorked)
        : Number(values.profit);
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
      note: `UK 2026/27 (FA 2026 dividend rates from 6 April 2026: 10.75% basic / 35.75% higher / 39.35% additional). Partnership and LLP are tax-transparent (identical result). Ltd assumes £12,570 salary + dividend, £2,500 admin cost, no Employment Allowance.${mode === "dayRate" ? ` Gross annual income: ${gbp(Math.round(profit))} (${gbp(Number(values.dayRate))}/day x ${Number(values.daysWorked)} days).` : ""}`,
    };
  },
  explainer: {
    heading: "How this calculator works",
    paragraphs: [
      "For sole trader and partnership/LLP, profit is taxed as personal income (income tax at 20%/40%/45% plus Class 4 NI at 6%/2%). Both structures are tax-transparent so they produce the same result.",
      "For a limited company, the calculation applies corporation tax on profits (19% small/25% main rate), employer NI on the minimum salary (£12,570), then dividend tax on the remaining distributable profit. A fixed £2,500 annual admin cost is included.",
      "The headline tax efficiency of Ltd over partnership/LLP has narrowed at 2026/27 rates following the FA 2026 dividend rise (basic rate 10.75%, higher rate 35.75%). The real reasons to incorporate (retained earnings, multiple shareholders, future share sale) usually matter more than the marginal tax saving.",
      "Locum and consultant example: a solicitor billing £350/day for 180 days earns £63,000 gross. As a sole trader the net take-home is approximately £47,851 (income tax £12,632, Class 4 NI £2,517). Through a limited company it is approximately £45,328 (corporation tax £9,366, dividend tax £4,671, £2,500 admin cost). At this income level the sole trader route wins; the Ltd saving only turns positive above roughly £80,000 to £100,000 annual profit.",
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
      question: "I am a locum solicitor. Which structure is usually best?",
      answer:
        "At typical locum income levels (£50,000 to £90,000 gross) the sole trader route usually produces a higher net take-home than a limited company once corporation tax, dividend tax, and the annual admin cost are factored in. The Ltd advantage only becomes material above roughly £100,000 gross profit and grows if you intend to retain earnings inside the company rather than extract them immediately. Use the day-rate mode to see your specific position.",
    },
    {
      question: "What pension contribution should I enter?",
      answer:
        "Enter your planned annual personal pension contribution. This reduces your taxable income for all three structures (sole trader, partnership/LLP, and the Ltd salary/dividend split). The annual allowance is £60,000 (2026/27), tapering for high earners.",
    },
  ],
};
