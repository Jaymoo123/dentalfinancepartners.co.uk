import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// 2026/27 statutory constants
// NLW: https://www.gov.uk/national-minimum-wage-rates (verified 2026-07-12)
// Employer NIC: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 (verified 2026-07-12)
// AMAP mileage 55p/mile from 6 Apr 2026 (estate ground truth; FA 2026 car/van first 10k miles)
// Holiday accrual 12.07% for irregular-hours workers: https://www.gov.uk/holiday-entitlement-rights
export const NLW_2026 = 12.71;
export const EMPLOYER_NIC_RATE = 0.15;
export const EMPLOYER_NIC_THRESHOLD_ANNUAL = 5000;
export const PENSION_RATE = 0.03;
export const PENSION_LOWER_LIMIT = 6240;
export const PENSION_UPPER_LIMIT = 50270;
export const AMAP_RATE = 0.55; // £/mile from 6 Apr 2026
export const HOLIDAY_ACCRUAL = 0.1207; // 12.07% for irregular-hours workers

export interface TrueCostCareHourResult {
  annualWage: number;
  annualTravelPay: number;
  annualMileage: number;
  annualHolidayPay: number;
  employerNic: number;
  employerPension: number;
  annualOverhead: number;
  totalAnnualCost: number;
  totalDeliveredHours: number;
  trueCostPerHour: number;
  chargedRate: number;
  marginPerHour: number;
  marginPercent: number;
}

export function calcTrueCostCareHour(
  hourlyWage: number,
  deliveredHoursPerWeek: number,
  travelMinutesPerHour: number, // paid travel mins per delivered care hour
  mileagePerHour: number, // miles driven per delivered care hour
  overheadPercent: number, // % of wage cost added for training/admin/PPE
  chargedRate: number, // LA or private rate charged per care hour
  weeksPerYear = 52,
): TrueCostCareHourResult {
  const hoursPerWeek = deliveredHoursPerWeek;
  const travelHoursPerWeek = (travelMinutesPerHour / 60) * hoursPerWeek;

  // annualWage = pay for delivered care hours only; annualTravelPay = pay for travel between calls
  const annualWage = hourlyWage * hoursPerWeek * weeksPerYear;
  const annualTravelPay = hourlyWage * travelHoursPerWeek * weeksPerYear;
  const annualMileage = mileagePerHour * hoursPerWeek * weeksPerYear * AMAP_RATE;

  // Holiday pay accrual on all paid hours (wage + travel) — 12.07% for irregular workers
  const totalAnnualPay = annualWage + annualTravelPay;
  const annualHolidayPay = totalAnnualPay * HOLIDAY_ACCRUAL;

  const earningsForNic = totalAnnualPay + annualHolidayPay;
  const employerNic = Math.max(0, (earningsForNic - EMPLOYER_NIC_THRESHOLD_ANNUAL) * EMPLOYER_NIC_RATE);

  const pensionableEarnings = Math.max(
    0,
    Math.min(earningsForNic, PENSION_UPPER_LIMIT) - PENSION_LOWER_LIMIT,
  );
  const employerPension = pensionableEarnings * PENSION_RATE;

  const annualOverhead = totalAnnualPay * (overheadPercent / 100);

  const totalAnnualCost =
    totalAnnualPay + annualMileage + annualHolidayPay + employerNic + employerPension + annualOverhead;

  // Delivered hours only (not travel hours) — true cost per DELIVERED care hour
  const totalDeliveredHours = hoursPerWeek * weeksPerYear;
  const trueCostPerHour = totalDeliveredHours > 0 ? totalAnnualCost / totalDeliveredHours : 0;

  const marginPerHour = chargedRate - trueCostPerHour;
  const marginPercent = chargedRate > 0 ? (marginPerHour / chargedRate) * 100 : 0;

  return {
    annualWage,
    annualTravelPay,
    annualMileage,
    annualHolidayPay,
    employerNic,
    employerPension,
    annualOverhead,
    totalAnnualCost,
    totalDeliveredHours,
    trueCostPerHour,
    chargedRate,
    marginPerHour,
    marginPercent,
  };
}

function pct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export const trueCostCareHourTool: GenericTool = {
  kind: "generic",
  slug: "true-cost-care-hour-calculator",
  name: "True Cost of a Care Hour Calculator",
  category: "Payroll and Workforce Costs",
  oneLiner:
    "Enter carer wage, travel time, mileage and overhead to see the true all-in cost per delivered domiciliary care hour vs your charged rate, including employer NIC 15%, pension 3% and holiday accrual 12.07%.",
  metaTitle: "True Cost of a Care Hour Calculator | Domiciliary Care 2026/27",
  metaDescription:
    "Calculate the real cost of delivering a domiciliary care hour: carer wage, paid travel, mileage at 55p/mile, employer NIC 15% above £5,000, auto-enrolment pension 3%, holiday accrual 12.07% and overhead. See your margin vs the charged rate. 2026/27 rates.",
  intro:
    "The hourly wage is only the start. Paid travel time, mileage reimbursement, employer National Insurance, pension contributions and holiday accrual all add to the cost of delivering a care hour. Enter your figures to see the true cost and whether your LA or private rate covers it.",
  ctaLabel: "Get help with care sector payroll and pricing",
  embedHeight: 820,
  fields: [
    {
      id: "hourlyWage",
      label: "Carer hourly wage",
      type: "currency",
      default: NLW_2026,
      step: 0.25,
      min: 0,
      help: `The National Living Wage from 1 April 2026 is £${NLW_2026}/hr for workers aged 21+. Travel time must also be paid at least at NMW.`,
    },
    {
      id: "deliveredHoursPerWeek",
      label: "Delivered care hours per week",
      type: "number",
      default: 30,
      step: 1,
      min: 1,
      max: 60,
      help: "Hours of face-to-face care delivered each week (not including travel).",
    },
    {
      id: "travelMinutesPerHour",
      label: "Paid travel minutes per care hour",
      type: "number",
      default: 15,
      step: 5,
      min: 0,
      max: 60,
      help: "Average travel time paid per delivered care hour. Travel between calls must be paid at least at NMW.",
    },
    {
      id: "mileagePerHour",
      label: "Miles driven per care hour",
      type: "number",
      default: 4,
      step: 0.5,
      min: 0,
      help: "Average miles driven between calls per delivered care hour. Reimbursed at AMAP rate (55p/mile from 6 April 2026).",
    },
    {
      id: "overheadPercent",
      label: "Training and overhead (% of wage cost)",
      type: "number",
      default: 10,
      step: 1,
      min: 0,
      max: 50,
      suffix: "%",
      help: "Percentage to add for training, PPE, DBS checks, management and admin. Typically 8-15% for a domiciliary agency.",
    },
    {
      id: "chargedRate",
      label: "Rate charged per care hour",
      type: "currency",
      default: 22.0,
      step: 0.5,
      min: 0,
      help: "The hourly rate you charge to the local authority or private client.",
    },
  ],
  compute: (v) => {
    const r = calcTrueCostCareHour(
      Math.max(0, Number(v.hourlyWage)),
      Math.max(1, Number(v.deliveredHoursPerWeek)),
      Math.max(0, Number(v.travelMinutesPerHour)),
      Math.max(0, Number(v.mileagePerHour)),
      Math.max(0, Number(v.overheadPercent)),
      Math.max(0, Number(v.chargedRate)),
    );

    const tone = r.marginPercent < 0 ? "warn" : r.marginPercent < 10 ? "default" : "good";

    return {
      headline: {
        label: "True cost per delivered care hour",
        value: gbp(r.trueCostPerHour),
        sub: `Margin ${gbp(r.marginPerHour)} (${pct(r.marginPercent)}) vs charged rate of ${gbp(r.chargedRate)}`,
        tone,
      },
      rows: [
        { label: "Annual wage (incl. paid travel time)", value: gbp(r.annualWage + r.annualTravelPay) },
        { label: "Holiday pay accrual (12.07%)", value: gbp(r.annualHolidayPay) },
        { label: "Employer NIC (15% above £5,000)", value: gbp(r.employerNic), strong: true },
        { label: "Employer pension (3%)", value: gbp(r.employerPension) },
        { label: "Mileage (55p/mile AMAP)", value: gbp(r.annualMileage) },
        { label: "Training and overhead", value: gbp(r.annualOverhead) },
        { label: "Total annual cost", value: gbp(r.totalAnnualCost), strong: true },
        { label: "Delivered care hours per year", value: r.totalDeliveredHours.toFixed(0) },
        { label: "True cost per delivered care hour", value: gbp(r.trueCostPerHour), strong: true },
        { label: "Charged rate", value: gbp(r.chargedRate) },
        {
          label: "Margin per hour",
          value: `${gbp(r.marginPerHour)} (${pct(r.marginPercent)})`,
          strong: true,
        },
      ],
      note:
        r.marginPercent < 0
          ? "The charged rate does not cover the true delivery cost. This is a loss-making rate once all employment costs are included. Local authority rates in many areas do not meet the true cost of care."
          : r.marginPercent < 10
            ? "Margin is below 10%. Any increase in wage, travel time or overhead will push this into loss. Review your rate negotiation position with commissioners."
            : "Margin is above 10%. Keep monitoring: National Living Wage increases and rising mileage costs can erode this quickly.",
    };
  },
  explainer: {
    heading: "Why the headline wage understates the true cost of a care hour",
    paragraphs: [
      `The National Living Wage rose to £${NLW_2026} per hour on 1 April 2026 for workers aged 21 and over. But that figure is only the starting point for a domiciliary care agency. The actual cost of delivering one care hour is typically 35-60% higher once all statutory and operational costs are included.`,
      "Travel time between calls must be paid at least at National Minimum Wage under HMRC working-time rules. If a carer spends 15 minutes travelling for every hour of care delivered, that is 25% more payroll even before any other additions. Agencies that do not pay travel time are exposed to NMW enforcement action and HMRC back-payment orders.",
      "Holiday pay for irregular-hours workers accrues at 12.07% of pay (1/12.07 reflecting 5.6 weeks' statutory leave). From April 2024, this must be calculated using the 52-week average pay reference period for variable-hours workers, which captures paid travel time and any overtime.",
      `Employer National Insurance is charged at 15% on earnings above the secondary threshold of £5,000 per year (2026/27). The Autumn Budget 2024 (effective April 2025) increased the rate from 13.8% and cut the threshold from £9,100, raising per-employee costs significantly. Auto-enrolment pension adds 3% on qualifying earnings between £6,240 and £50,270.`,
      "Mileage reimbursement at the HMRC Approved Mileage Allowance Payment rate of 55p per mile (from 6 April 2026, up from 45p) is a direct cost. For a rural agency where carers drive 5-6 miles per care hour, this alone adds £2.75-£3.30 to the true cost.",
      "Local authority fee rates in many areas have not kept pace with the true cost of care. The Care Quality Commission's 2023 and 2024 State of Care reports noted that below-cost LA rates are a financial viability risk for providers. This calculator gives agencies the data they need when negotiating rates or making the case for uplifts.",
    ],
  },
  faqs: [
    {
      question: "Does travel time count as working time for NMW?",
      answer:
        "Yes. Travel between care calls is working time and must be paid at least at the National Minimum Wage. This includes driving time and any waiting time between calls if the worker cannot use that time freely. HMRC has pursued enforcement action against care agencies that excluded travel time from NMW calculations.",
    },
    {
      question: "What is the holiday accrual rate for irregular-hours care workers?",
      answer:
        "12.07% of pay, calculated using a 52-week average of all remuneration including paid travel time. This is the statutory 5.6 weeks' leave expressed as a fraction of working time (5.6 / 46.4 = 12.07%). From April 2024, the reference period for variable-hours workers is 52 weeks.",
    },
    {
      question: "What is the AMAP mileage rate from April 2026?",
      answer:
        "55p per mile for the first 10,000 miles per year for cars and vans, up from 45p. This increase was made in Finance Act 2026 and took effect from 6 April 2026. Payments at or below the AMAP rate are free of income tax and NIC for the employee.",
    },
    {
      question: "What employer NIC rate applies in 2026/27?",
      answer:
        "15% on earnings above the secondary threshold of £5,000 per year (£96 per week). The rate was increased from 13.8% and the threshold cut from £9,100 per year, both effective from April 2025. These changes significantly increased the per-employee NIC cost for care employers.",
    },
    {
      question: "What is a typical domiciliary care agency margin?",
      answer:
        "Industry bodies suggest a sustainable margin is 10-15% over the true cost of care delivery. Many LA fee rates in England produce margins below 5% or even negative margins once all employment costs are included, which is a financial viability concern flagged repeatedly by CQC and Skills for Care.",
    },
  ],
};
