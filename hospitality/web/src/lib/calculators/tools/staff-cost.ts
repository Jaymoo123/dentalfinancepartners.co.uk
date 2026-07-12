import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// 2026/27 constants
// Source: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
// Source: https://www.gov.uk/national-minimum-wage-rates
export const NLW_2026 = 12.71; // £/hr, 21+, from 1 Apr 2026
export const EMPLOYER_NIC_RATE = 0.15; // 15% above secondary threshold
export const EMPLOYER_NIC_THRESHOLD = 5000; // £5,000/yr annual secondary threshold
export const PENSION_RATE = 0.03; // auto-enrolment minimum employer contribution
export const PENSION_LOWER_LIMIT = 6240; // qualifying earnings lower limit 2026/27
export const PENSION_UPPER_LIMIT = 50270; // qualifying earnings upper limit 2026/27
export const LABOUR_BENCHMARK_PCT = 30; // hospitality industry rule of thumb

export interface StaffCostResult {
  annualWage: number;
  employerNic: number;
  pensionableEarnings: number;
  employerPension: number;
  annualTroncCost: number;
  trueTotalAnnualCost: number;
  trueHourlyCost: number;
  annualRevenue: number;
  labourPercent: number;
  benchmarkVariance: number;
}

export function calcStaffCost(
  hourlyWage: number,
  hoursPerWeek: number,
  weeklyRevenue: number,
  troncHourlyEquivalent: number = 0,
  weeksPerYear: number = 52,
): StaffCostResult {
  const annualWage = hourlyWage * hoursPerWeek * weeksPerYear;
  const employerNic = Math.max(0, (annualWage - EMPLOYER_NIC_THRESHOLD) * EMPLOYER_NIC_RATE);
  const pensionableEarnings = Math.max(0, Math.min(annualWage, PENSION_UPPER_LIMIT) - PENSION_LOWER_LIMIT);
  const employerPension = pensionableEarnings * PENSION_RATE;
  // Tronc: no NIC or pension on these amounts
  const annualTroncCost = troncHourlyEquivalent * hoursPerWeek * weeksPerYear;
  const trueTotalAnnualCost = annualWage + employerNic + employerPension + annualTroncCost;
  const trueHourlyCost = trueTotalAnnualCost / (hoursPerWeek * weeksPerYear);
  const annualRevenue = weeklyRevenue * weeksPerYear;
  const labourPercent = annualRevenue > 0 ? (trueTotalAnnualCost / annualRevenue) * 100 : 0;
  const benchmarkVariance = labourPercent - LABOUR_BENCHMARK_PCT;

  return {
    annualWage,
    employerNic,
    pensionableEarnings,
    employerPension,
    annualTroncCost,
    trueTotalAnnualCost,
    trueHourlyCost,
    annualRevenue,
    labourPercent,
    benchmarkVariance,
  };
}

function pct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export const staffCostTool: GenericTool = {
  kind: "generic",
  slug: "staff-cost-rota-margin-calculator",
  name: "Staff Cost and Rota Margin Calculator",
  category: "Margins and Cost Control",
  oneLiner:
    "Enter hourly wage, hours worked and weekly revenue to see the true all-in staff cost (NLW £12.71, employer NIC 15%, pension 3%, tronc) and labour percentage vs the 30% hospitality benchmark.",
  metaTitle: "Staff Cost Calculator | True Hourly Cost and Labour % 2026/27",
  metaDescription:
    "Calculate the real cost of a hospitality employee: wage + employer NIC (15% above £5,000 threshold) + auto-enrolment pension (3%) + tronc. Shows true hourly cost and labour as a % of revenue vs the 30% industry benchmark. 2026/27 rates.",
  intro:
    "The headline wage is never the full cost. Add employer NIC at 15% (above the £5,000 secondary threshold), auto-enrolment pension at 3%, and any tronc contribution to see what each employee actually costs per hour and what that means for your labour percentage.",
  ctaLabel: "Get help with payroll and rota planning",
  embedHeight: 780,
  fields: [
    {
      id: "hourlyWage",
      label: "Hourly wage",
      type: "currency",
      default: NLW_2026,
      step: 0.25,
      min: 0,
      help: `The National Living Wage from 1 April 2026 is £${NLW_2026}/hr for workers aged 21+.`,
    },
    {
      id: "hoursPerWeek",
      label: "Hours per week",
      type: "number",
      default: 40,
      step: 1,
      min: 1,
      max: 60,
      help: "Average contracted or rota hours per week for this employee.",
    },
    {
      id: "weeklyRevenue",
      label: "Weekly revenue (your venue)",
      type: "currency",
      default: 15000,
      step: 500,
      help: "Total weekly revenue for your site, used to calculate labour as a percentage of revenue.",
    },
    {
      id: "troncHourlyEquivalent",
      label: "Tronc per hour (optional)",
      type: "currency",
      default: 0,
      step: 0.25,
      min: 0,
      help: "If the employee receives tronc, enter the effective hourly equivalent. No employer NIC or pension is payable on tronc via an independent troncmaster.",
      advanced: true,
    },
    {
      id: "weeksPerYear",
      label: "Weeks per year (usually 52)",
      type: "number",
      default: 52,
      step: 1,
      min: 1,
      max: 52,
      advanced: true,
      help: "Adjust if the role is seasonal (e.g. 26 weeks for a summer venue).",
    },
  ],
  compute: (v) => {
    const r = calcStaffCost(
      Math.max(0, Number(v.hourlyWage)),
      Math.max(1, Number(v.hoursPerWeek)),
      Math.max(0, Number(v.weeklyRevenue)),
      Math.max(0, Number(v.troncHourlyEquivalent ?? 0)),
      Math.max(1, Number(v.weeksPerYear ?? 52)),
    );

    const overUnder = r.benchmarkVariance >= 0 ? "over" : "under";
    const absVariance = Math.abs(r.benchmarkVariance);

    return {
      headline: {
        label: "True hourly cost to the business",
        value: gbp(r.trueHourlyCost),
        sub: `Labour at ${pct(r.labourPercent)} of revenue (${pct(absVariance)} ${overUnder} the 30% benchmark)`,
        tone: r.labourPercent > 35 ? "warn" : r.labourPercent <= 30 ? "good" : "default",
      },
      rows: [
        { label: "Annual wage", value: gbp(r.annualWage) },
        { label: "Employer NIC (15% above £5,000 threshold)", value: gbp(r.employerNic), strong: true },
        { label: "Pensionable earnings", value: gbp(r.pensionableEarnings) },
        { label: "Employer pension (3%)", value: gbp(r.employerPension) },
        ...(r.annualTroncCost > 0
          ? [{ label: "Annual tronc (no NIC/pension)", value: gbp(r.annualTroncCost) }]
          : []),
        { label: "Total annual cost", value: gbp(r.trueTotalAnnualCost), strong: true },
        { label: "True hourly cost", value: gbp(r.trueHourlyCost), strong: true },
        { label: "Labour as % of revenue", value: pct(r.labourPercent), strong: true },
        {
          label: `vs 30% benchmark`,
          value: `${r.benchmarkVariance >= 0 ? "+" : ""}${pct(r.benchmarkVariance)}`,
        },
      ],
      note:
        r.labourPercent > 35
          ? "Labour cost is above the 35% danger zone for most hospitality sites. Check rota hours, wage mix and revenue per cover."
          : r.labourPercent > 30
            ? "Labour is between 30% and 35% of revenue. Within manageable range but worth monitoring against covers and revenue growth."
            : "Labour is at or below the 30% benchmark. Good rota efficiency.",
    };
  },
  explainer: {
    heading: "True staff cost in hospitality: beyond the headline wage",
    paragraphs: [
      `The National Living Wage for workers aged 21 and over rose to £${NLW_2026} per hour on 1 April 2026. But that figure understates the real cost of employment by 20% or more once employer NIC and pension are included.`,
      "Employer National Insurance is charged at 15% on earnings above the secondary threshold of £5,000 per year (2026/27). A full-time employee on the NLW costs roughly £1,300 to £1,500 per year in employer NIC alone. The 2025 Budget raised the employer NIC rate from 13.8% to 15% and cut the secondary threshold from £9,100 to £5,000, significantly increasing the per-employee cost for hospitality businesses.",
      "Auto-enrolment requires employer contributions of at least 3% on qualifying earnings between £6,240 and £50,270 per year (2026/27). For a full-time NLW worker, that adds roughly £350 to £400 per year.",
      "Tronc tips, distributed via an independent troncmaster, are exempt from both employer and employee NIC. The tronc amount therefore costs the employer at face value, with no NIC uplift, making it a genuinely lower-cost way to reward staff. This calculator separates tronc from wages so the true blended hourly cost reflects reality.",
      "The 30% labour cost benchmark is a widely used rule of thumb in hospitality. Labour above 35% of net revenue is typically unsustainable for most venue types. Kitchen-heavy operations (fine dining, hotels) often run at 28-32%; wet-led pubs can go lower; high-service restaurants closer to 34-36%.",
    ],
  },
  faqs: [
    {
      question: "What is the National Living Wage from April 2026?",
      answer: `£${NLW_2026} per hour for workers aged 21 and over, from 1 April 2026. The rate for 18-20 year olds is £10.85 and for under-18s and apprentices is £8.00.`,
    },
    {
      question: "What is the employer NIC rate for 2026/27?",
      answer:
        "15% on earnings above the secondary threshold of £5,000 per year (£96 per week). The rate was increased from 13.8% and the threshold cut from £9,100, both effective from April 2025.",
    },
    {
      question: "What pension contribution does the employer have to make?",
      answer:
        "Auto-enrolment minimum employer contribution is 3% on qualifying earnings between £6,240 and £50,270 per year (2026/27). The employee contributes at least 5%. New starters aged 22-66 earning above £10,000 per year are auto-enrolled.",
    },
    {
      question: "Does tronc reduce employer NIC?",
      answer:
        "Yes. Tronc distributed via an independent troncmaster is exempt from employer NIC (and employee NIC). No pension contribution is required on tronc payments either. PAYE income tax still applies.",
    },
    {
      question: "What is a healthy labour cost percentage for a hospitality business?",
      answer:
        "30% of net revenue is the industry benchmark. Above 35% is a warning level for most venue types. The right number varies: a bar with automated ordering can run at 20%; a fine-dining kitchen may need 34%. Track it weekly against covers and revenue.",
    },
  ],
};
