import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calculatePartnerTaxReserve } from "@/lib/tools/compute/partner-tax-reserve";

export const partnerTaxReserveTool: GenericTool = {
  kind: "generic",
  slug: "partner-tax-reserve",
  name: "Partner Tax Reserve Calculator",
  category: "LLP / Partnership",
  oneLiner:
    "Monthly reserve percentage for a self-employed solicitor partner: income tax, Class 4 NIC, payments on account, and pension annual allowance charge risk.",
  embedHeight: 560,
  metaTitle: "Partner Tax Reserve Calculator 2026/27 | Solicitor Equity Partners",
  metaDescription:
    "Calculate how much to reserve monthly for your self-assessment tax bill as a solicitor equity partner. Covers 2026/27 income tax, Class 4 NIC, payments on account schedule and pension annual allowance charge.",
  intro:
    "Equity partners pay their income tax and National Insurance contributions via self-assessment, typically in three instalments each year. Getting the monthly reserve right from day one prevents a cash crisis at January and July. This calculator shows your estimated 2026/27 tax liability, the payment dates and amounts, and the percentage of your monthly drawings you should be setting aside.",
  fields: [
    {
      id: "profitShare",
      label: "Annual profit share (2026/27)",
      type: "currency",
      default: 120_000,
      min: 0,
      max: 1_000_000,
      step: 5_000,
      help: "Your share of partnership/LLP profits for the tax year ending 5 April 2027.",
    },
    {
      id: "priorYearLiability",
      label: "Prior year self-assessment liability",
      type: "currency",
      default: 0,
      min: 0,
      max: 500_000,
      step: 1_000,
      help: "Your total income tax + Class 4 NIC from the previous self-assessment return. Enter 0 if this is your first year as a partner.",
    },
    {
      id: "annualDrawings",
      label: "Annual drawings",
      type: "currency",
      default: 120_000,
      min: 0,
      max: 1_000_000,
      step: 5_000,
      help: "Total cash drawn from the firm during the year. Used to calculate the reserve as a percentage of what you actually receive.",
    },
    {
      id: "totalPensionContributions",
      label: "Total pension contributions (optional)",
      type: "currency",
      default: 0,
      min: 0,
      max: 200_000,
      step: 1_000,
      help: "Combined personal and employer (firm) pension contributions for the year. If this exceeds £60,000 (the 2026/27 annual allowance), an annual allowance charge applies.",
      advanced: true,
    },
  ],
  compute(values) {
    const profitShare = Number(values.profitShare);
    const priorYearLiability = Number(values.priorYearLiability);
    const annualDrawings = Number(values.annualDrawings);
    const totalPensionContributions = Number(values.totalPensionContributions);

    const r = calculatePartnerTaxReserve({
      profitShare,
      priorYearLiability,
      annualDrawings,
      totalPensionContributions,
    });

    const tone = r.monthlyReservePct > 0.35 ? ("warn" as const) : ("default" as const);

    const rows = [
      { label: "Income tax (2026/27)", value: gbp(r.incomeTax) },
      { label: "Class 4 NIC (2026/27)", value: gbp(r.class4Nic) },
      { label: "Total self-assessment liability", value: gbp(r.totalLiability), strong: true as const },
      { label: "Effective rate on profit share", value: pct(r.effectiveRate * 100) },
      ...r.paymentSchedule.map((p) => ({ label: p.label, value: `${gbp(p.amount)} (${p.date})` })),
      ...(r.pensionAACharge > 0
        ? [{ label: "Pension annual allowance charge", value: gbp(r.pensionAACharge) }]
        : []),
    ];

    const firstYearNote = r.isFirstYear
      ? " First year in partnership: you owe the full year 1 liability plus the first payment on account for year 2 on the same January date. Plan for this double payment."
      : "";

    const pensionNote = r.pensionAACharge > 0
      ? ` Your pension contributions exceed the £60,000 annual allowance by £${(totalPensionContributions - 60_000).toLocaleString("en-GB")}; an estimated annual allowance charge of ${gbp(r.pensionAACharge)} applies.`
      : "";

    return {
      headline: {
        label: "Recommended monthly reserve",
        value: gbp(r.monthlyReserveAmount),
        sub: `${pct(r.monthlyReservePct * 100)} of monthly drawings (includes 5% buffer)`,
        tone,
      },
      rows,
      note:
        `2026/27 rates: income tax (basic 20% / higher 40% / additional 45%), Class 4 NIC (6% / 2%). Figures assume profit share equals taxable trading income; partnership basis period adjustments, overlap relief and any PAYE income are excluded.${firstYearNote}${pensionNote}`,
    };
  },
  explainer: {
    heading: "How the reserve is calculated",
    paragraphs: [
      "Solicitor equity partners are self-employed for tax purposes. The firm does not deduct PAYE, so the full income tax and Class 4 National Insurance bill lands on the partner personally via self-assessment.",
      "Income tax in 2026/27 is charged at 20% on taxable income up to £37,700 (after the £12,570 personal allowance), 40% on the next £87,440, and 45% on taxable income above £125,140. The personal allowance tapers to zero at income above £125,140, which means partners earning over that figure pay an effective 60% marginal rate on income between £100,000 and £125,140.",
      "Class 4 NIC applies to trading profits: 6% on profits between £12,570 and £50,270, then 2% on profits above that. There is no upper earnings limit equivalent for self-employed NIC, so high earners continue to pay the 2% upper rate on the full excess.",
      "Payments on account (POA) are advance payments towards the following year's liability, each equal to 50% of the prior year's self-assessment bill. POA 1 falls on 31 January in the tax year; POA 2 on 31 July after it. A balancing payment (or refund) is due the following 31 January.",
      "The monthly reserve figure adds a 5% buffer over the raw effective rate to account for year-on-year profit growth and timing differences between drawings and profit allocation.",
    ],
  },
  faqs: [
    {
      question: "Why do I owe so much in January in my first year as a partner?",
      answer:
        "In the first year of self-employment, HMRC collects the full year 1 liability on 31 January after the tax year ends. At the same time, it requires the first payment on account for year 2 (50% of year 1's bill) on the same date. This double payment can be £30,000 to £80,000 or more for a newly promoted equity partner, and it arrives within months of joining the equity. Setting aside a monthly reserve from day one of partnership is the only reliable way to avoid borrowing to meet it.",
    },
    {
      question: "What happens if my profit this year is much higher than last year?",
      answer:
        "Your payments on account are calculated using last year's liability, so if profits rise sharply, the two POAs will under-cover the actual bill. The difference is payable as a balancing payment on 31 January after the tax year ends, alongside the first POA for the following year. The calculator shows this balancing payment separately so you can see the cash requirement in advance. Consider voluntarily increasing your POAs if you know profits are up significantly.",
    },
    {
      question: "Does Class 4 NIC apply above the upper profits limit?",
      answer:
        "Yes, though at a reduced rate. The main Class 4 rate of 6% applies on profits between £12,570 and £50,270. Above £50,270 the rate drops to 2%, but it continues without a ceiling. A partner on £200,000 profit therefore pays 2% on the £149,730 above the upper limit, adding nearly £3,000 on top of the main-rate charge.",
    },
    {
      question: "What is the pension annual allowance charge and how do I avoid it?",
      answer:
        "The annual allowance (AA) is £60,000 for 2026/27. It covers all pension inputs in the tax year: your personal contributions, any salary sacrifice, and employer (firm) contributions to your pension. If the combined total exceeds £60,000, the excess is added back into your taxable income and taxed at your marginal rate. You can avoid or reduce the charge by using carry-forward: if your AA was unused in the three preceding tax years, you can bring that unused amount forward and stack it on top of the current year's £60,000. Speak to a pension adviser before breaching the allowance.",
    },
    {
      question: "Should I draw less to reduce my tax bill?",
      answer:
        "Drawings do not affect the tax calculation. Your tax liability is based on your share of the partnership's taxable profits, not on how much cash you withdraw. Drawing less simply leaves money in the firm. What does reduce the bill is genuine deductible expenditure: professional subscriptions, a proportion of home office costs, business mileage, and pension contributions (within the annual allowance). A specialist solicitors accountant can identify all allowable deductions for your specific circumstances.",
    },
    {
      question: "Can I reduce my payments on account if I expect lower profits this year?",
      answer:
        "Yes. You can apply to HMRC to reduce your POAs if you expect your current year liability to be lower than the prior year. This is done via form SA303 or through your HMRC online account. Be conservative: if your revised estimate turns out to be too low, you will owe interest on the shortfall from the original due dates. Do not reduce unless you have good evidence that profits are materially down.",
    },
  ],
  related: [
    { label: "LLP Profit Share Allocation Calculator", href: "/calculators/llp-profit-share-allocation" },
    { label: "FA 2014 Salaried Member Test", href: "/calculators/fa2014-salaried-member" },
    { label: "Solicitor Take-Home Calculator", href: "/calculators/solicitor-take-home" },
  ],
};
