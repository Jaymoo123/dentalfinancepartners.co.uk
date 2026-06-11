import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcLocumStructure } from "@/lib/tools/compute/locum-structure";

export const locumStructureTool: GenericTool = {
  kind: "generic",
  slug: "locum-structure",
  name: "Locum Structure Comparison",
  category: "Associate tax",
  oneLiner: "Sole trader vs limited company vs umbrella on your day rate. Annual net comparison with the winning structure highlighted. 2025/26 rates.",
  embedHeight: 520,
  metaTitle: "Dental Locum Structure Calculator UK 2025/26 | Sole Trader vs Ltd vs Umbrella",
  metaDescription:
    "Compare sole trader, limited company and umbrella net take-home for UK dental locums at 2025/26 tax rates. Day rate, days per year and expenses.",
  intro:
    "Enter your day rate, days worked per year and annual deductible expenses. The calculator compares sole-trader, limited company and umbrella structures side by side and highlights the winning option on current-year net take-home.",
  fields: [
    {
      id: "dailyRate",
      label: "Day rate (£)",
      type: "currency",
      default: 450,
      min: 0,
      max: 2000,
      step: 10,
    },
    {
      id: "daysPerYear",
      label: "Days worked per year",
      type: "number",
      default: 180,
      min: 0,
      max: 260,
      step: 5,
    },
    {
      id: "expenses",
      label: "Annual deductible expenses (indemnity, GDC, CPD, accountancy) (£)",
      type: "currency",
      default: 6000,
      min: 0,
      max: 50000,
      step: 250,
    },
  ],
  compute(values) {
    const dailyRate = Number(values.dailyRate);
    const daysPerYear = Number(values.daysPerYear);
    const expenses = Number(values.expenses);
    const r = calcLocumStructure(dailyRate, daysPerYear, expenses);

    const structures = [
      { name: "Sole Trader", net: r.soleTrader.net },
      { name: "Limited Company", net: r.ltd.net },
      { name: "Umbrella", net: r.umbrella.net },
    ];
    const winner = structures.reduce((a, b) => (a.net >= b.net ? a : b));

    return {
      headline: {
        label: `${winner.name} wins on your figures`,
        value: gbp(winner.net),
        sub: `Annual net take-home under the winning structure`,
        tone: "good" as const,
      },
      rows: [
        { label: "Gross income", value: gbp(r.grossIncome) },
        { label: "Sole trader net", value: gbp(r.soleTrader.net), strong: winner.name === "Sole Trader" },
        { label: "Sole trader total tax", value: gbp(r.soleTrader.tax) },
        { label: "Limited company net", value: gbp(r.ltd.net), strong: winner.name === "Limited Company" },
        { label: "Limited company total tax and admin", value: gbp(r.ltd.tax) },
        { label: "Umbrella net", value: gbp(r.umbrella.net), strong: winner.name === "Umbrella" },
        { label: "Umbrella total deductions", value: gbp(r.umbrella.tax) },
      ],
      note: "Indicative UK 2025/26 model. Ltd-co assumes £12,570 salary plus remainder as dividend, £1,800 admin cost, no Employment Allowance. Umbrella assumes 5% margin. NHS Pension and IR35 implications not modelled.",
    };
  },
  explainer: {
    heading: "How this works",
    paragraphs: [
      "The sole-trader model applies income tax and Class 2/4 NI directly to trading profit (gross income minus expenses).",
      "The limited company model pays a £12,570 director salary (at the NI threshold), then extracts remaining post-CT profit as dividends. A fixed £1,800 admin cost covers accountancy and filing. Employment Allowance is excluded as most single-director locum companies do not qualify.",
      "The umbrella model assumes the umbrella company retains 5% of gross income and processes the remainder through PAYE, deducting employer NI, income tax and employee NI.",
    ],
  },
  faqs: [
    {
      question: "Which structure is best for a dental locum?",
      answer: `On headline net pay at typical rates, sole trader or limited company usually wins depending on income level. At lower incomes (gross under £50,000) the difference is small. At higher incomes the Ltd advantage grows but is partially offset by NHS Pension restrictions and admin costs. Umbrella is rarely the optimal structure on net pay alone but suits locums who want simplicity and no filing obligations.`,
    },
    {
      question: "Does IR35 affect dental locums?",
      answer: "IR35 applies if the engaging practice issues a Status Determination Statement concluding you are inside IR35 for that engagement. If inside IR35, the Ltd company receives net of PAYE deductions and dividend extraction on that income is unavailable. The comparison shifts towards umbrella or sole trader for that engagement.",
    },
    {
      question: "Can I access the NHS Pension as a locum?",
      answer: "Sole-trader locums can generally join the NHS Pension Scheme via the practitioner arrangement. Ltd-company locums have more restrictive access, and umbrella locums are typically limited to their employer's auto-enrolment scheme. The NHS Pension value can outweigh headline tax differences for longer-term locums.",
    },
  ],
};
