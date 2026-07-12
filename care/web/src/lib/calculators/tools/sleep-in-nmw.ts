import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// NLW/NMW from 1 Apr 2026
// Source: https://www.gov.uk/national-minimum-wage-rates (verified 2026-07-12)
// Mencap ruling: R (Mencap) v Tomlinson-Blake [2021] UKSC 8
// Sleep-in hours where the worker is permitted to sleep are NOT working time for NMW
// UNLESS the worker is awake for work. Only awake-for-work hours count.
export const NLW_2026 = 12.71; // 21+ from 1 Apr 2026
export const NMW_18_20 = 10.85; // 18-20 from 1 Apr 2026
export const NMW_UNDER_18 = 8.0; // under 18 from 1 Apr 2026

export type AgeGroup = "21plus" | "18to20" | "under18";

export function nmwForAgeGroup(ageGroup: AgeGroup): number {
  if (ageGroup === "18to20") return NMW_18_20;
  if (ageGroup === "under18") return NMW_UNDER_18;
  return NLW_2026;
}

export interface SleepInNmwResult {
  applicableNmw: number;
  // Waking night (all hours count)
  isWakingNight: boolean;
  // For sleep-in: only awake-for-work hours count for NMW
  nmwHours: number; // hours that count toward NMW
  totalShiftHours: number;
  flatRatePaid: number;
  effectiveHourlyRate: number; // flat rate / total shift hours (informational)
  nmwHourlyEquivalent: number; // flat rate / NMW hours (the rate that matters for compliance)
  isCompliant: boolean;
  shortfallPerShift: number; // 0 if compliant
  requiredMinimumPay: number; // nmwHours * applicableNmw
}

export function calcSleepInNmw(
  shiftType: "sleep-in" | "waking-night",
  shiftHours: number,
  awakeForWorkHours: number, // only relevant for sleep-in
  flatRatePaid: number, // total pay for the shift
  ageGroup: AgeGroup,
): SleepInNmwResult {
  const applicableNmw = nmwForAgeGroup(ageGroup);
  const isWakingNight = shiftType === "waking-night";

  // Per Mencap ruling: sleep-in shifts — only awake-for-work hours count for NMW
  // Waking night shifts — all hours count for NMW
  const nmwHours = isWakingNight ? shiftHours : awakeForWorkHours;

  const requiredMinimumPay = nmwHours * applicableNmw;
  const isCompliant = flatRatePaid >= requiredMinimumPay;
  const shortfallPerShift = isCompliant ? 0 : requiredMinimumPay - flatRatePaid;

  const effectiveHourlyRate = shiftHours > 0 ? flatRatePaid / shiftHours : 0;
  const nmwHourlyEquivalent = nmwHours > 0 ? flatRatePaid / nmwHours : 0;

  return {
    applicableNmw,
    isWakingNight,
    nmwHours,
    totalShiftHours: shiftHours,
    flatRatePaid,
    effectiveHourlyRate,
    nmwHourlyEquivalent,
    isCompliant,
    shortfallPerShift,
    requiredMinimumPay,
  };
}

export const sleepInNmwTool: GenericTool = {
  kind: "generic",
  slug: "sleep-in-shift-nmw-compliance-calculator",
  name: "Sleep-in Shift NMW Compliance Calculator",
  category: "Payroll and Workforce Costs",
  oneLiner:
    "Check whether your sleep-in flat rate meets National Minimum Wage after the Mencap ruling: only hours awake for work count for NMW on a sleep-in shift. NLW £12.71 from 1 April 2026.",
  metaTitle: "Sleep-in Shift NMW Calculator | Mencap Ruling 2026/27",
  metaDescription:
    "Calculate NMW compliance for sleep-in shifts after the Supreme Court Mencap ruling: only hours spent awake for work count toward the NMW minimum. Enter your flat rate and shift pattern to get an immediate compliance verdict. NLW £12.71 from 1 April 2026.",
  intro:
    "The Supreme Court ruled in Mencap v Tomlinson-Blake (2021) that hours during which a worker is permitted to sleep on a sleep-in shift are not working time for National Minimum Wage purposes. Only time the worker is actually awake and working counts. Enter your shift details to check compliance.",
  ctaLabel: "Get help with care sector payroll compliance",
  embedHeight: 740,
  fields: [
    {
      id: "shiftType",
      label: "Shift type",
      type: "select",
      default: "sleep-in",
      options: [
        {
          value: "sleep-in",
          label: "Sleep-in (worker may sleep; NMW applies only to awake-for-work hours)",
        },
        {
          value: "waking-night",
          label: "Waking night (worker expected to be awake throughout; NMW applies to all hours)",
        },
      ],
      help: "A sleep-in shift allows the worker to sleep unless called upon. A waking night requires the worker to be awake throughout.",
    },
    {
      id: "shiftHours",
      label: "Total shift length (hours)",
      type: "number",
      default: 8,
      step: 0.5,
      min: 1,
      max: 16,
      help: "Total duration of the shift from start to end.",
    },
    {
      id: "awakeForWorkHours",
      label: "Hours awake and working (sleep-in only)",
      type: "number",
      default: 1,
      step: 0.5,
      min: 0,
      max: 16,
      help: "For sleep-in shifts: the average hours the worker is awake and required to work per shift (e.g. responding to residents). These are the hours that count for NMW. Ignored for waking-night shifts.",
    },
    {
      id: "flatRatePaid",
      label: "Flat rate paid for the shift",
      type: "currency",
      default: 50,
      step: 5,
      min: 0,
      help: "The total amount paid for the entire shift.",
    },
    {
      id: "ageGroup",
      label: "Worker age group",
      type: "select",
      default: "21plus",
      options: [
        { value: "21plus", label: `21 and over (NLW £${NLW_2026}/hr from 1 Apr 2026)` },
        { value: "18to20", label: `18 to 20 (£${NMW_18_20}/hr from 1 Apr 2026)` },
        { value: "under18", label: `Under 18 (£${NMW_UNDER_18}/hr from 1 Apr 2026)` },
      ],
    },
  ],
  compute: (v) => {
    const shiftType = v.shiftType as "sleep-in" | "waking-night";
    const r = calcSleepInNmw(
      shiftType,
      Math.max(1, Number(v.shiftHours)),
      Math.max(0, Number(v.awakeForWorkHours)),
      Math.max(0, Number(v.flatRatePaid)),
      v.ageGroup as AgeGroup,
    );

    const verdictText = r.isCompliant ? "COMPLIANT" : "NON-COMPLIANT";
    const tone = r.isCompliant ? "good" : "warn";

    const rows = [
      { label: "Shift type", value: r.isWakingNight ? "Waking night (all hours count)" : "Sleep-in (Mencap ruling applies)" },
      { label: "Total shift hours", value: `${r.totalShiftHours}h` },
      { label: "Hours counting for NMW", value: `${r.nmwHours}h`, strong: true },
      { label: "Applicable NMW rate", value: gbp(r.applicableNmw) + "/hr" },
      { label: "Minimum pay required", value: gbp(r.requiredMinimumPay), strong: true },
      { label: "Flat rate paid", value: gbp(r.flatRatePaid) },
      { label: "Effective rate (pay / NMW hours)", value: gbp(r.nmwHourlyEquivalent) + "/hr", strong: true },
    ];

    if (!r.isCompliant) {
      rows.push({ label: "Shortfall per shift", value: gbp(r.shortfallPerShift), strong: true });
    }

    return {
      verdict: { text: verdictText, positive: r.isCompliant },
      headline: {
        label: "NMW compliance verdict",
        value: verdictText,
        sub: r.isCompliant
          ? `Flat rate covers the ${r.nmwHours}h of NMW-qualifying time at ${gbp(r.applicableNmw)}/hr`
          : `Shortfall of ${gbp(r.shortfallPerShift)} per shift. Minimum required: ${gbp(r.requiredMinimumPay)}`,
        tone,
      },
      rows,
      note: r.isWakingNight
        ? "This is classified as a waking night. All hours count for NMW because the worker is expected to remain awake throughout the shift."
        : r.isCompliant
          ? "Sleep-in shifts: only hours actually awake and working count for NMW, per the Supreme Court ruling in Mencap v Tomlinson-Blake [2021] UKSC 8. Your flat rate covers the minimum for the awake-for-work hours entered."
          : "Sleep-in shifts: only hours actually awake and working count for NMW, per the Supreme Court ruling in Mencap v Tomlinson-Blake [2021] UKSC 8. Your flat rate does not cover the minimum for the awake-for-work hours entered. HMRC can pursue up to 6 years of back pay.",
    };
  },
  explainer: {
    heading: "Sleep-in shifts and NMW after the Mencap ruling",
    paragraphs: [
      "The Supreme Court ruling in R (Mencap) v Tomlinson-Blake [2021] UKSC 8 resolved a long-running legal dispute about how the National Minimum Wage applies to sleep-in shifts in the care sector. The court held that hours during which a worker is permitted to sleep are not 'time work' for NMW purposes, even if the worker must remain on the premises and respond if needed.",
      "This means that for a standard sleep-in shift, only the time the worker is actually awake and working (responding to a resident, administering medication, dealing with an emergency) counts as NMW-qualifying time. The flat rate paid for the shift needs to cover only those awake-for-work hours at the applicable NMW rate, not the entire shift duration.",
      `The National Living Wage from 1 April 2026 is £${NLW_2026} per hour for workers aged 21 and over. For an 8-hour sleep-in shift where a worker averages 1 hour awake, the minimum pay required is £${(NLW_2026 * 1).toFixed(2)} (1 hour at NLW). A flat rate of £50 would be compliant. A flat rate of £10 would not be.`,
      "Waking night shifts are different. If the worker is required to remain awake throughout the shift, all hours count as working time and NMW applies to the full shift duration. Misclassifying a waking night as a sleep-in to pay a lower flat rate is an NMW violation.",
      "HMRC can pursue back pay claims for up to 6 years, and the penalty for underpayment is 200% of the arrears (minimum £100, maximum £20,000 per worker). Care providers should document the awake-for-work time on sleep-in shifts and review flat rates annually when NMW rates change.",
    ],
  },
  faqs: [
    {
      question: "What did the Mencap ruling say about sleep-in shifts?",
      answer:
        "The Supreme Court in Mencap v Tomlinson-Blake [2021] UKSC 8 held that hours a worker is permitted to sleep on a sleep-in shift are not 'time work' for NMW purposes. NMW applies only to the hours the worker is actually awake and required to work. This reversed earlier Employment Appeal Tribunal decisions that had caused significant uncertainty and potential back-pay liability for the care sector.",
    },
    {
      question: "Does the entire sleep-in flat rate need to meet NMW for all shift hours?",
      answer:
        "No, after Mencap. The flat rate only needs to meet NMW for the hours the worker is awake and working. If a worker has an 8-hour sleep-in shift and averages 1 hour awake, the flat rate must be at least £12.71 (1 hour at NLW 2026/27). It does not need to be £101.68 (8 hours at NLW).",
    },
    {
      question: "What is the difference between a sleep-in and a waking night?",
      answer:
        "A sleep-in shift allows the worker to sleep during the shift unless called upon. A waking night requires the worker to remain awake throughout. NMW applies to all hours on a waking night. Care providers must ensure job descriptions and contracts correctly classify the shift type, as misclassification can result in NMW enforcement action.",
    },
    {
      question: "How far back can HMRC pursue sleep-in NMW underpayments?",
      answer:
        "HMRC can pursue NMW arrears for up to 6 years. The penalty for underpayment is 200% of the total arrears owed, up to a maximum of £20,000 per worker, with a minimum of £100. Named publication (naming and shaming) applies to underpayments above certain thresholds.",
    },
  ],
};
