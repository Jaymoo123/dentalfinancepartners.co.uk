import type { GenericTool } from "@accounting-network/web-shared/tools";
import { gbp } from "../format";

export const cisBackYearsCalculator: GenericTool = {
  kind: "generic",
  slug: "cis-back-years-calculator",
  name: "CIS Back Years Tax Refund Calculator",
  category: "CIS Refunds",
  oneLiner:
    "Estimate your CIS tax refund for up to four previous tax years. HMRC allows claims going back four years from the current tax year.",
  metaTitle: "CIS Back Years Refund Calculator | Up to 4 Tax Years",
  metaDescription:
    "Calculate how much CIS tax you could reclaim for up to four previous tax years. Enter your figures for each year to see your cumulative refund estimate.",
  intro:
    "You can claim back overpaid CIS deductions for up to four tax years. Each year needs a separate Self Assessment return or amendment. Enter your figures for each year to see the estimated refund across all open years.",
  ctaLabel: "Claim your back-years CIS refund →",
  embedHeight: 820,
  fields: [
    // YEAR 1 — 2025/26
    {
      id: "y1_gross",
      label: "2025/26 — Gross CIS income",
      type: "currency",
      default: 42000,
      step: 1000,
      help: "Total gross CIS income from all deduction statements for this tax year.",
    },
    {
      id: "y1_expenses",
      label: "2025/26 — Total expenses (materials + allowable costs)",
      type: "currency",
      default: 9000,
      step: 500,
      help: "Materials supplied, mileage, tools, PPE and other allowable expenses for this year.",
    },
    {
      id: "y1_otherIncome",
      label: "2025/26 — Other income",
      type: "currency",
      default: 0,
      step: 500,
    },
    {
      id: "y1_cisDeducted",
      label: "2025/26 — CIS deducted at source",
      type: "currency",
      default: 6600,
      step: 100,
      help: "Total CIS withheld from your payments this year, from all your deduction statements.",
    },
    {
      id: "y1_include",
      label: "Include 2025/26 in calculation",
      type: "toggle",
      default: true,
    },
    // YEAR 2 — 2024/25
    {
      id: "y2_gross",
      label: "2024/25 — Gross CIS income",
      type: "currency",
      default: 38000,
      step: 1000,
    },
    {
      id: "y2_expenses",
      label: "2024/25 — Total expenses (materials + allowable costs)",
      type: "currency",
      default: 8000,
      step: 500,
    },
    {
      id: "y2_otherIncome",
      label: "2024/25 — Other income",
      type: "currency",
      default: 0,
      step: 500,
    },
    {
      id: "y2_cisDeducted",
      label: "2024/25 — CIS deducted at source",
      type: "currency",
      default: 6000,
      step: 100,
    },
    {
      id: "y2_include",
      label: "Include 2024/25 in calculation",
      type: "toggle",
      default: true,
    },
    // YEAR 3 — 2023/24
    {
      id: "y3_gross",
      label: "2023/24 — Gross CIS income",
      type: "currency",
      default: 35000,
      step: 1000,
    },
    {
      id: "y3_expenses",
      label: "2023/24 — Total expenses (materials + allowable costs)",
      type: "currency",
      default: 7000,
      step: 500,
    },
    {
      id: "y3_otherIncome",
      label: "2023/24 — Other income",
      type: "currency",
      default: 0,
      step: 500,
    },
    {
      id: "y3_cisDeducted",
      label: "2023/24 — CIS deducted at source",
      type: "currency",
      default: 5600,
      step: 100,
    },
    {
      id: "y3_include",
      label: "Include 2023/24 in calculation",
      type: "toggle",
      default: false,
    },
    // YEAR 4 — 2022/23
    {
      id: "y4_gross",
      label: "2022/23 — Gross CIS income",
      type: "currency",
      default: 30000,
      step: 1000,
    },
    {
      id: "y4_expenses",
      label: "2022/23 — Total expenses (materials + allowable costs)",
      type: "currency",
      default: 6000,
      step: 500,
    },
    {
      id: "y4_otherIncome",
      label: "2022/23 — Other income",
      type: "currency",
      default: 0,
      step: 500,
    },
    {
      id: "y4_cisDeducted",
      label: "2022/23 — CIS deducted at source",
      type: "currency",
      default: 4800,
      step: 100,
    },
    {
      id: "y4_include",
      label: "Include 2022/23 in calculation",
      type: "toggle",
      default: false,
    },
  ],
  compute: (v) => {
    function calcYear(
      gross: number,
      expenses: number,
      otherIncome: number,
      cisDeducted: number
    ) {
      const pa = 12570;
      const basicBand = 37700;
      const niLower = 12570;
      const niUpper = 50270;
      const profit = Math.max(0, gross - expenses);
      const totalIncome = profit + otherIncome;
      const taxable = Math.max(0, totalIncome - pa);
      const incomeTax =
        Math.min(taxable, basicBand) * 0.2 +
        Math.max(0, taxable - basicBand) * 0.4;
      const class4 =
        Math.min(Math.max(0, profit - niLower), niUpper - niLower) * 0.06 +
        Math.max(0, profit - niUpper) * 0.02;
      const liability = incomeTax + class4;
      return cisDeducted - liability;
    }

    const years = [
      {
        label: "2025/26",
        gross: Number(v.y1_gross),
        exp: Number(v.y1_expenses),
        other: Number(v.y1_otherIncome),
        deducted: Number(v.y1_cisDeducted),
        include: Boolean(v.y1_include),
      },
      {
        label: "2024/25",
        gross: Number(v.y2_gross),
        exp: Number(v.y2_expenses),
        other: Number(v.y2_otherIncome),
        deducted: Number(v.y2_cisDeducted),
        include: Boolean(v.y2_include),
      },
      {
        label: "2023/24",
        gross: Number(v.y3_gross),
        exp: Number(v.y3_expenses),
        other: Number(v.y3_otherIncome),
        deducted: Number(v.y3_cisDeducted),
        include: Boolean(v.y3_include),
      },
      {
        label: "2022/23",
        gross: Number(v.y4_gross),
        exp: Number(v.y4_expenses),
        other: Number(v.y4_otherIncome),
        deducted: Number(v.y4_cisDeducted),
        include: Boolean(v.y4_include),
      },
    ];

    const activeYears = years.filter((y) => y.include);
    let totalRefund = 0;
    const rows: { label: string; value: string; strong?: boolean }[] = [];

    for (const y of activeYears) {
      const result = calcYear(y.gross, y.exp, y.other, y.deducted);
      totalRefund += result;
      rows.push({
        label: `${y.label} — estimated ${result >= 0 ? "refund" : "balance to pay"}`,
        value:
          result >= 0 ? gbp(result) : `(${gbp(Math.abs(result))})`,
      });
    }

    rows.push({
      label: "Total estimated refund across selected years",
      value: gbp(Math.max(0, totalRefund)),
      strong: true,
    });

    return {
      headline: {
        label:
          totalRefund >= 0
            ? "Total estimated back-years refund"
            : "Net balance across selected years",
        value: gbp(Math.abs(totalRefund)),
        sub: `Across ${activeYears.length} selected tax year${activeYears.length !== 1 ? "s" : ""}`,
      },
      rows,
      note: "Each year uses 2026/27 personal allowance and rate structure as an approximation. Actual rates may differ for earlier years. This is an estimate only. Each year requires a separate Self Assessment return or amendment. Claims must be made within 4 years of the end of the relevant tax year. You will need your deduction statements for every year you claim.",
    };
  },
  explainer: {
    heading: "How CIS back-years refund claims work",
    paragraphs: [
      "HMRC allows you to claim a CIS refund for up to four tax years before the current one. Claims must be made via a Self Assessment return (if you have not yet filed for that year) or an amendment (if you have already filed but missed expenses or deductions). The deadline for each year is four years after 31 January following the end of that tax year; for example, the deadline for 2022/23 is 31 January 2028. Miss that date and the right to a refund for that year is lost.",
      "For each year you intend to claim, you will need your CIS payment and deduction statements from every contractor you worked for in that year, receipts for all allowable expenses including materials, mileage and tools, and details of any other income you received. Without the deduction statements you cannot confirm how much CIS was withheld, and HMRC will not process the refund without that evidence. Contractors are legally required to keep CIS records for three years and must provide statements on request.",
      "If a Self Assessment return has not been filed for a given year, you file it now, even if it is late. If the return has already been filed and you missed expenses or deductions, you submit an amendment online through your HMRC Personal Tax Account or via a paper SA100 with the corrected figures. HMRC typically processes repayments within 10 working days of a completed online submission. Where the repayment is for a year more than 12 months old, HMRC also pays repayment supplement (interest) on the amount refunded.",
    ],
  },
  faqs: [
    {
      question: "How far back can I claim a CIS refund?",
      answer:
        "You can claim for up to four tax years from the current date. The 2026/27 tax year opened on 6 April 2026, so the earliest open year is currently 2022/23. Claims for 2021/22 and earlier are out of time and cannot be made.",
    },
    {
      question: "Does HMRC charge interest on back-year refunds?",
      answer:
        "HMRC pays repayment supplement (interest) on refunds for years more than 12 months old. The supplement is calculated from the later of the date the tax was paid and the filing deadline for that year, through to the date of repayment. The rate is the Bank of England base rate minus 1%, applied for the period in question.",
    },
    {
      question:
        "What if I have not filed a Self Assessment return for previous years?",
      answer:
        "You can still file late. HMRC charges an automatic £100 late-filing penalty, plus daily penalties if the return is more than three months late. However, if a refund is due, it will usually exceed any penalties by a significant margin. A specialist accountant can handle the late filing and apply for penalty mitigation where appropriate.",
    },
    {
      question: "Can HMRC come after me for tax if I file old returns?",
      answer:
        "Yes. Filing a Self Assessment return opens the year for an HMRC enquiry for 12 months from the date of filing. If the return reveals unpaid tax rather than a refund, you will owe that amount plus interest. Only file if you have reviewed your figures carefully and are confident a refund is due, or if you have professional support to manage the process.",
    },
    {
      question: "What records do I need for each year?",
      answer:
        "You will need CIS payment and deduction statements from every contractor you worked for in that year, receipts for all allowable expenses, bank statements, any P60 or P45 from employment in the same year, and details of any other income received. Contractors are required to retain CIS records for three years and should provide statements on request.",
    },
    {
      question: "Can I claim back-years as a limited company?",
      answer:
        "Limited companies do not use Self Assessment for CIS reclaims. Instead, they offset CIS deductions suffered against PAYE liabilities via the Employer Payment Summary submitted to HMRC each month. For older years where the EPS offset mechanism was not used, the company can seek to amend its PAYE position. This differs significantly from the sole-trader Self Assessment process and requires specialist handling.",
    },
  ],
};
