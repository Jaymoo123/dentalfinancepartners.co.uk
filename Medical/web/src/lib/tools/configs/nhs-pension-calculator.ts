import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcNHSPension, type TaxBand } from "@/lib/tools/compute/nhs-pension";

export const nhsPensionTool: GenericTool = {
  kind: "generic",
  slug: "nhs-pension-annual-allowance",
  name: "NHS Pension Annual Allowance Calculator",
  category: "NHS Pension",
  oneLiner:
    "Threshold income and pension growth in, tapered allowance and tax charge out. 2026/27 limits, unchanged from 2025/26.",
  embedHeight: 520,
  metaTitle: "NHS Pension Annual Allowance Calculator 2026/27 | Taper",
  metaDescription:
    "Free NHS pension annual allowance calculator for doctors. Work out your 2026/27 tapered annual allowance and any annual allowance tax charge from threshold income and pension growth.",
  intro:
    "The standard UK pension annual allowance is £60,000 for 2026/27, and it tapers to as little as £10,000 once threshold income passes £200,000 and adjusted income passes £260,000. Enter your threshold income, the pension growth shown on your NHS pension savings statement, and your tax band to see your allowance and any annual allowance tax charge.",
  fields: [
    {
      id: "thresholdIncome",
      label: "Threshold income",
      type: "currency",
      default: 150000,
      min: 0,
      max: 500000,
      step: 5000,
      help: "Total taxable income from every source, less your own member contributions. Threshold income for annual allowance purposes leaves employer contributions out",
    },
    {
      id: "pensionGrowth",
      label: "Annual pension growth (pension input amount)",
      type: "currency",
      default: 40000,
      min: 0,
      max: 200000,
      step: 1000,
      help: "The pension input amount on your NHS pension savings statement. It is growth in the value of your pension over the year, not what you paid in",
    },
    {
      id: "taxBand",
      label: "Your income tax band",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
    },
  ],
  compute(values) {
    const thresholdIncome = Number(values.thresholdIncome);
    const pensionGrowth = Number(values.pensionGrowth);
    const taxBand = String(values.taxBand) as TaxBand;
    const r = calcNHSPension({ thresholdIncome, pensionGrowth, taxBand });

    const rows = [
      { label: "Threshold income", value: gbp(thresholdIncome) },
      { label: "Pension input amount (growth from statement)", value: gbp(pensionGrowth) },
      { label: "Adjusted income", value: gbp(r.adjustedIncome) },
      {
        label: "Annual allowance 2026/27",
        value: `${gbp(r.annualAllowance)}${r.isTapered ? " (tapered)" : " (standard)"}`,
        strong: true as const,
      },
      ...(r.excess > 0
        ? [
            { label: "Excess pension growth", value: gbp(r.excess) },
            { label: "Annual allowance tax charge (estimate)", value: gbp(r.taxCharge), strong: true as const },
            { label: "Effective cost as % of growth", value: pct(r.effectiveCost) },
          ]
        : []),
    ];

    return {
      headline: r.excess > 0
        ? {
            label: "Annual allowance charge",
            value: gbp(r.taxCharge),
            sub: `Allowance: ${gbp(r.annualAllowance)} · Excess: ${gbp(r.excess)}`,
            tone: "warn" as const,
          }
        : {
            label: "Annual allowance",
            value: gbp(r.annualAllowance),
            sub: r.isTapered ? "Tapered, no excess charge" : "Standard allowance, no excess charge",
            tone: "good" as const,
          },
      note: r.isTapered
        ? "Your allowance is tapered because threshold income exceeds £200,000 and adjusted income exceeds £260,000. Allowance reduces by £1 for every £2 above £260,000, with a floor of £10,000. The charge shown is an estimate at the single marginal rate you selected, before carry forward."
        : "Tapering only applies when threshold income exceeds £200,000 AND adjusted income exceeds £260,000. Your position does not currently meet both tests.",
      rows,
    };
  },
  explainer: {
    heading: "How the pension annual allowance taper works",
    paragraphs: [
      "The annual allowance is the most your pension can grow in a tax year before a tax charge applies, and for 2026/27 it is £60,000, unchanged from 2025/26. The annual allowance calculation for a defined benefit scheme like the NHS Pension Scheme measures pension growth, not money paid in, so the annual allowance on pension contributions you actually see leaving your payslip is the wrong number to use. The pension input amount calculation compares the capitalised value of your entitlement at the end of the year with its value at the start, uplifted for inflation, and the difference is what this calculator wants in the second field.",
      "The pension annual allowance taper reduces that £60,000 for high earners, and both of its tests have to be met. Threshold income must exceed £200,000, and adjusted income, which is threshold income with the pension input amount added back, must exceed £260,000. Above £260,000 the pensions tapered annual allowance falls by £1 for every £2 of adjusted income, stopping at a floor of £10,000. That floor is reached at adjusted income of 260,000 plus 2 x (60,000 minus 10,000), which is £360,000. Meeting only one test means no taper at all, which is why a doctor with high pension growth and modest other income often keeps the full allowance.",
      "NHS doctors are exposed to the pension tapered annual allowance for a structural reason rather than a personal one. The employer contribution to the NHS Pension Scheme is 23.7% of pensionable pay, applicable from 1 April 2024 and current for 2026/27, and it is due to be re-set for four years from 1 April 2027 by the 2024 valuation. That employer money never reaches your bank account, but the growth it buys sits in your pension input amount and so inflates adjusted income. On an Agenda for Change band 8a salary the taper rarely bites; on a salary of £120,000 with private practice on top, the threshold income annual allowance test is often the only thing keeping you out of it.",
      "If your NHSBSA pension savings statement shows figures in brackets, that is negative pension growth for the year, usually where inflation uplift on your opening value outran the benefit you actually accrued. Negative growth in the 1995 or 2008 sections can offset positive growth in the 2015 section in the same year, which is why a statement showing a bracketed figure may still produce no charge. Enter a bracketed figure as zero growth for that section here and get the offset checked properly, because this tool does not net sections against each other.",
      "Standard annual allowance by tax year: 2022/23 £40,000; 2023/24 £60,000; 2024/25 £60,000; 2025/26 £60,000; 2026/27 £60,000. Minimum tapered annual allowance by tax year: 2022/23 £4,000; 2023/24 to 2026/27 £10,000. The tapered annual allowance 2025 26 minimum was £10,000 and it is unchanged for 2026/27. That annual allowance history matters because carry forward reaches back three tax years, so a 2026/27 calculation can use a historic pension annual allowance figure from as far back as 2023/24. Anyone assembling a pension annual allowance history for a carry forward claim needs the year each figure applied to, not just the current one.",
      "Two limits on this tool, stated plainly. It applies one marginal rate to the whole excess, so a charge that straddles the higher and additional rate bands will be approximated. And it treats adjusted income as threshold income plus pension growth, which is right for a member whose only scheme is the NHS one and wrong for anyone with employer contributions to a separate arrangement. For the statutory position HMRC publishes its own annual allowance calculator, and the HMRC annual allowance calculator handles multiple schemes; use the annual allowance calculator HMRC provides alongside this one if your position spans more than the NHS scheme.",
    ],
  },
  faqs: [
    {
      question: "What is pension annual allowance?",
      answer:
        "The annual allowance is a cap on how much your pension can grow in a tax year before an income tax charge applies. What is annual allowance in the NHS context is growth in a defined benefit entitlement, not contributions paid. For 2026/27 the UK pensions annual allowance is £60,000, unchanged from 2025/26, and it covers every registered scheme you hold added together, not the NHS scheme alone. Exceed it and the excess is taxed at your marginal rate.",
    },
    {
      question: "Where do I find my annual pension growth figure?",
      answer:
        "On the pension savings statement issued by the NHS Business Services Authority. NHSBSA must issue one where your pension growth exceeds the standard £60,000 allowance, and you can request one otherwise, which matters because tapered members are often below £60,000 and so never receive a statement automatically. The figure to use is the pension input amount for the pension input period, which runs 6 April to 5 April in line with the tax year.",
    },
    {
      question: "What do the figures in brackets mean on an NHSBSA annual allowance statement?",
      answer:
        "Brackets mean a negative pension input amount for that section, so the value of your entitlement fell in real terms over the year once the opening value was uplifted for inflation. It happens most often in the 1995 and 2008 sections in a year of low pay growth and high CPI. Negative growth in a legacy section can be offset against positive growth in the 2015 section for the same tax year, which can remove a charge entirely, so a bracketed figure is worth checking rather than ignoring.",
    },
    {
      question: "What is the difference between threshold income and adjusted income?",
      answer:
        "Threshold income is your total taxable income from every source, including private practice and investments, less your own member contributions, and it excludes anything your employer puts in. Adjusted income takes threshold income and adds back the pension input amount, which for a defined benefit member is the growth figure rather than a cash contribution. Most of the tapering bite for doctors comes from that add-back, because the employer contribution to the NHS scheme is 23.7% of pensionable pay from 1 April 2024.",
    },
    {
      question: "Do employer contributions count towards annual allowance?",
      answer:
        "Yes, for both tests. Everything paid in on your behalf counts towards the £60,000 allowance for 2026/27, and in a defined benefit scheme it is captured through the pension input amount rather than as a cash figure. Employer money is also what pushes adjusted income above £260,000 while leaving threshold income unaffected, which is exactly why the two income measures exist. It never counts towards threshold income.",
    },
    {
      question: "What is Scheme Pays and when can I use it?",
      answer:
        "Scheme Pays means the NHS Pension Scheme settles your annual allowance charge with HMRC and permanently reduces your pension to recover it. Mandatory Scheme Pays requires two things: the charge must exceed £2,000, and the NHS scheme's own pension input amount must exceed the standard £60,000 allowance. A charge caused only by the taper, where growth is below £60,000, is voluntary Scheme Pays and the scheme is not obliged to offer it. The election deadline is 31 July in the year after the tax year ends, so a 2026/27 charge runs to 31 July 2028.",
    },
    {
      question: "Can I use carry-forward to reduce my charge?",
      answer:
        "Yes. Unused allowance from the three previous tax years can be carried forward, current year used first and then oldest year first, provided you were a member of a registered pension scheme in each year you carry from. The NHS Pension Scheme qualifies. Carry forward must be assessed across every scheme you hold, and it uses each year's own allowance, so 2023/24 onwards carries £60,000 while 2022/23 carried £40,000. Reporting any remaining annual allowance HMRC charge is done through self assessment.",
    },
    {
      question: "When does a revised statement move my Scheme Pays deadline?",
      answer:
        "Where NHSBSA issues a revised pension savings statement on or after 2 May, the election deadline extends to the earlier of three months from the date of that statement or six years from the end of the tax year. Late and revised NHS statements are common rather than exceptional, so this limb is the one members most often need. The deadline is brought forward instead where you are about to take all your benefits, because no election is possible once they are in payment.",
    },
  ],
};
