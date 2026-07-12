import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// 2026/27 statutory constants
// NLW: https://www.gov.uk/national-minimum-wage-rates (verified 2026-07-12)
// Employer NIC: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 (verified 2026-07-12)
export const NLW_2026 = 12.71;
export const EMPLOYER_NIC_RATE = 0.15;
export const EMPLOYER_NIC_THRESHOLD_ANNUAL = 5000;
export const PENSION_RATE = 0.03;
export const PENSION_LOWER_LIMIT = 6240;
export const PENSION_UPPER_LIMIT = 50270;

// Sector benchmark: staffing cost as % of fee income
// Source: Care England / LaingBuisson sector data; typically 55-65% for residential care
export const STAFFING_BENCHMARK_PCT = 60;

export interface CareStaffingMarginResult {
  weeklyStaffWage: number;
  weeklyAgencyCost: number;
  weeklyEmployerNic: number;
  weeklyPension: number;
  weeklyTotalStaffCost: number;
  weeklyRevenue: number;
  staffingPercent: number;
  benchmarkVariance: number;
  staffCostPerBed: number;
  revenuePerBed: number;
}

export interface RosterEntry {
  count: number;
  hourlyRate: number;
  hoursPerWeek: number;
}

export function calcCareStaffingMargin(
  nurses: RosterEntry,
  carers: RosterEntry,
  nightStaff: RosterEntry,
  agencyHoursPerWeek: number,
  agencyRatePerHour: number,
  occupiedBeds: number,
  averageWeeklyFeePerBed: number,
): CareStaffingMarginResult {
  function rosterCost(r: RosterEntry) {
    const weeklyWage = r.count * r.hourlyRate * r.hoursPerWeek;
    const annualWage = weeklyWage * 52;
    const nicPerPerson = Math.max(0, (annualWage / r.count - EMPLOYER_NIC_THRESHOLD_ANNUAL) * EMPLOYER_NIC_RATE);
    const weeklyNic = r.count > 0 ? (r.count * nicPerPerson) / 52 : 0;
    const annualPensionable = Math.max(
      0,
      Math.min(annualWage / Math.max(1, r.count), PENSION_UPPER_LIMIT) - PENSION_LOWER_LIMIT,
    );
    const weeklyPension = (r.count * annualPensionable * PENSION_RATE) / 52;
    return { weeklyWage, weeklyNic, weeklyPension };
  }

  const n = nurses.count > 0 ? rosterCost(nurses) : { weeklyWage: 0, weeklyNic: 0, weeklyPension: 0 };
  const c = rosterCost(carers);
  const ns = nightStaff.count > 0 ? rosterCost(nightStaff) : { weeklyWage: 0, weeklyNic: 0, weeklyPension: 0 };

  const weeklyStaffWage = n.weeklyWage + c.weeklyWage + ns.weeklyWage;
  const weeklyAgencyCost = agencyHoursPerWeek * agencyRatePerHour;
  const weeklyEmployerNic = n.weeklyNic + c.weeklyNic + ns.weeklyNic;
  const weeklyPension = n.weeklyPension + c.weeklyPension + ns.weeklyPension;

  const weeklyTotalStaffCost = weeklyStaffWage + weeklyAgencyCost + weeklyEmployerNic + weeklyPension;
  const weeklyRevenue = occupiedBeds * averageWeeklyFeePerBed;

  const staffingPercent = weeklyRevenue > 0 ? (weeklyTotalStaffCost / weeklyRevenue) * 100 : 0;
  const benchmarkVariance = staffingPercent - STAFFING_BENCHMARK_PCT;
  const staffCostPerBed = occupiedBeds > 0 ? weeklyTotalStaffCost / occupiedBeds : 0;
  const revenuePerBed = occupiedBeds > 0 ? weeklyRevenue / occupiedBeds : 0;

  return {
    weeklyStaffWage,
    weeklyAgencyCost,
    weeklyEmployerNic,
    weeklyPension,
    weeklyTotalStaffCost,
    weeklyRevenue,
    staffingPercent,
    benchmarkVariance,
    staffCostPerBed,
    revenuePerBed,
  };
}

function pct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export const careStaffingMarginTool: GenericTool = {
  kind: "generic",
  slug: "care-staffing-cost-margin-calculator",
  name: "Care Staffing Cost and Margin Calculator",
  category: "Payroll and Workforce Costs",
  oneLiner:
    "Enter your care home roster (nurses, carers, night staff), agency hours, occupancy and average weekly fee to see total staffing cost per occupied bed and staffing as a percentage of fee income vs the 60% sector benchmark.",
  metaTitle: "Care Home Staffing Cost Calculator | Staffing % of Fee Income 2026/27",
  metaDescription:
    "Calculate total weekly care home staffing costs including employer NIC 15%, pension 3% and agency cover. See staffing cost per occupied bed and as a percentage of fee income vs the 60% sector benchmark. 2026/27 NLW £12.71 rates.",
  intro:
    "Staffing is the largest cost in a care home, typically 55-65% of fee income. Enter your roster mix, agency usage, occupancy and average weekly fee to see your true staffing cost per bed and how it compares to sector benchmarks. NLW £12.71 from 1 April 2026.",
  ctaLabel: "Get help with care home financial management",
  embedHeight: 920,
  fields: [
    {
      id: "nurseCount",
      label: "Nurses (headcount)",
      type: "number",
      default: 3,
      step: 1,
      min: 0,
      help: "Registered nurses on your rota. Enter 0 if you are a residential (non-nursing) home.",
    },
    {
      id: "nurseRate",
      label: "Nurse hourly rate",
      type: "currency",
      default: 18.0,
      step: 0.5,
      min: 0,
    },
    {
      id: "nurseHours",
      label: "Nurse hours per week (per person)",
      type: "number",
      default: 37.5,
      step: 0.5,
      min: 0,
    },
    {
      id: "carerCount",
      label: "Care staff (headcount)",
      type: "number",
      default: 12,
      step: 1,
      min: 1,
    },
    {
      id: "carerRate",
      label: "Carer hourly rate",
      type: "currency",
      default: NLW_2026,
      step: 0.25,
      min: 0,
      help: `National Living Wage is £${NLW_2026}/hr from 1 April 2026.`,
    },
    {
      id: "carerHours",
      label: "Carer hours per week (per person)",
      type: "number",
      default: 37.5,
      step: 0.5,
      min: 1,
    },
    {
      id: "nightCount",
      label: "Night staff (headcount)",
      type: "number",
      default: 2,
      step: 1,
      min: 0,
    },
    {
      id: "nightRate",
      label: "Night staff hourly rate",
      type: "currency",
      default: 13.5,
      step: 0.25,
      min: 0,
    },
    {
      id: "nightHours",
      label: "Night staff hours per week (per person)",
      type: "number",
      default: 35,
      step: 0.5,
      min: 0,
    },
    {
      id: "agencyHours",
      label: "Agency hours per week",
      type: "number",
      default: 20,
      step: 1,
      min: 0,
      help: "Total agency hours across all shifts per week. Enter 0 if you use no agency staff.",
    },
    {
      id: "agencyRate",
      label: "Agency charge rate (per hour)",
      type: "currency",
      default: 22.0,
      step: 0.5,
      min: 0,
      help: "The hourly rate the agency charges your home (not the carer's take-home pay).",
    },
    {
      id: "occupiedBeds",
      label: "Occupied beds",
      type: "number",
      default: 30,
      step: 1,
      min: 1,
      max: 500,
    },
    {
      id: "averageWeeklyFee",
      label: "Average weekly fee per occupied bed",
      type: "currency",
      default: 1100,
      step: 50,
      help: "Blended average across self-funders, LA-funded and FNC-eligible residents.",
    },
  ],
  compute: (v) => {
    const r = calcCareStaffingMargin(
      { count: Math.max(0, Number(v.nurseCount)), hourlyRate: Math.max(0, Number(v.nurseRate)), hoursPerWeek: Math.max(0, Number(v.nurseHours)) },
      { count: Math.max(1, Number(v.carerCount)), hourlyRate: Math.max(0, Number(v.carerRate)), hoursPerWeek: Math.max(1, Number(v.carerHours)) },
      { count: Math.max(0, Number(v.nightCount)), hourlyRate: Math.max(0, Number(v.nightRate)), hoursPerWeek: Math.max(0, Number(v.nightHours)) },
      Math.max(0, Number(v.agencyHours)),
      Math.max(0, Number(v.agencyRate)),
      Math.max(1, Number(v.occupiedBeds)),
      Math.max(0, Number(v.averageWeeklyFee)),
    );

    const tone = r.staffingPercent > 70 ? "warn" : r.staffingPercent <= 60 ? "good" : "default";
    const overUnder = r.benchmarkVariance >= 0 ? "over" : "under";
    const absVar = Math.abs(r.benchmarkVariance);

    return {
      headline: {
        label: "Staffing cost as % of fee income",
        value: pct(r.staffingPercent),
        sub: `${pct(absVar)} ${overUnder} the 60% sector benchmark. Cost per occupied bed: ${gbp(r.staffCostPerBed)}/week`,
        tone,
      },
      rows: [
        { label: "Weekly staff wages (all grades)", value: gbp(r.weeklyStaffWage) },
        { label: "Weekly agency cost", value: gbp(r.weeklyAgencyCost) },
        { label: "Weekly employer NIC (15%)", value: gbp(r.weeklyEmployerNic), strong: true },
        { label: "Weekly employer pension (3%)", value: gbp(r.weeklyPension) },
        { label: "Total weekly staffing cost", value: gbp(r.weeklyTotalStaffCost), strong: true },
        { label: "Weekly fee revenue", value: gbp(r.weeklyRevenue) },
        { label: "Staffing % of fee income", value: pct(r.staffingPercent), strong: true },
        { label: "vs 60% benchmark", value: `${r.benchmarkVariance >= 0 ? "+" : ""}${pct(r.benchmarkVariance)}` },
        { label: "Staffing cost per occupied bed/week", value: gbp(r.staffCostPerBed), strong: true },
        { label: "Revenue per occupied bed/week", value: gbp(r.revenuePerBed) },
      ],
      note:
        r.staffingPercent > 70
          ? "Staffing above 70% of fee income is a financial viability warning. Review roster efficiency, agency dependency and whether fees need renegotiating with commissioners."
          : r.staffingPercent > 60
            ? "Staffing between 60% and 70% of fee income. Within the range many homes operate, but watch agency costs and any NLW increase impact."
            : "Staffing at or below the 60% benchmark. Good cost control, but ensure quality and safe staffing ratios are maintained.",
    };
  },
  explainer: {
    heading: "Understanding staffing costs in a care home",
    paragraphs: [
      `Staffing is the dominant cost in a care home, typically accounting for 55-65% of total fee income according to LaingBuisson and Care England data. For a 30-bed home on £1,100 per week average fees, that is £18,000-£21,000 per week in staffing costs alone.`,
      `The National Living Wage rose to £${NLW_2026} per hour on 1 April 2026, and employer National Insurance increased to 15% on earnings above £5,000 per year from April 2025. Together these changes have added significantly to per-employee costs. A carer on the NLW working 37.5 hours per week costs the employer roughly £2,000-£2,200 per year more than two years ago.`,
      "Agency staffing is the most expensive way to fill rota gaps, typically costing 60-100% more per hour than direct employment. Agency dependency above 10-15% of total hours is a financial risk as well as a CQC quality concern. Many inspectors flag high agency use as a continuity-of-care risk.",
      "Pension auto-enrolment requires employer contributions of 3% on qualifying earnings between £6,240 and £50,270 per year. For a 30-bed home with 15-20 care staff, this adds £10,000-£15,000 per year to the staffing bill.",
      "The staffing percentage benchmark of 60% is a guide, not a rule. Nursing homes with high-dependency residents and a higher ratio of registered nurses will naturally run at 62-68%. Residential homes with a lower-acuity population can aim for 55-60%. The key metric is whether the fee income is high enough to sustain a safe staffing level.",
    ],
  },
  faqs: [
    {
      question: "What is a typical staffing cost percentage for a care home?",
      answer:
        "55-65% of fee income is the typical range according to LaingBuisson and sector data. Nursing homes with higher registered nurse ratios often run at 62-68%. Residential homes with lower-acuity residents can target 55-60%. Above 70% is a financial viability warning sign.",
    },
    {
      question: "How does the 2025 employer NIC increase affect care homes?",
      answer:
        "Employer NIC rose from 13.8% to 15% and the secondary threshold was cut from £9,100 to £5,000 per year from April 2025. For a care home with 20 direct employees, the combined effect adds roughly £20,000-£30,000 per year in NIC costs compared to 2024/25. The Employment Allowance (£10,500 from April 2025) partially offsets this for eligible employers.",
    },
    {
      question: "Does the Employment Allowance apply to care homes?",
      answer:
        "Yes, if the employer's total Class 1 NIC liability in the previous tax year was under £100,000. The Employment Allowance for 2025/26 and 2026/27 is £10,500 per year, offsetting employer NIC. Larger care groups with multiple PAYE schemes may not qualify if any connected company's NIC bill exceeds the threshold.",
    },
    {
      question: "How should agency costs be managed?",
      answer:
        "Target agency usage below 10-15% of total rota hours. Build a pool of regular bank workers who can be offered consistent shifts rather than booking through an agency each time. Agency costs at £22-£30/hr compared to direct employment at £13-£18/hr represent a 50-100% premium that directly reduces care home margin.",
    },
  ],
};
