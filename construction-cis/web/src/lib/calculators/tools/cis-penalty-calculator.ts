import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";

// CIS300 late-filing penalty regime (FA 2009 Sch 55 as applied to CIS).
// No rate change in 2026/27; these amounts are fixed statutory penalties.
//
// Per overdue CIS300 monthly return:
//   day 1:       £100 fixed
//   2 months:    £200 fixed (cumulative £300)
//   6 months:    greater of £300 or 5% of CIS deductions due (cumulative £600 fixed for nil)
//   12 months:   greater of £300 or 5% of CIS deductions due (cumulative £900 fixed for nil)
//
// ponytail: compute is pure arithmetic, no external helpers needed.

const PENALTY_INITIAL = 100;    // day 1
const PENALTY_2M     = 200;    // +2 months (additional, not replacement)
const PENALTY_FIXED_6M  = 300; // fixed floor at 6 months
const PENALTY_FIXED_12M = 300; // fixed floor at 12 months
const PENALTY_PCT    = 0.05;   // 5% of CIS deductions due (tax-geared element)
const NEW_CONTRACTOR_FIXED_CAP = 3000; // aggregate cap on fixed penalties for a new contractor (CISR65080)

/**
 * Compute penalty for ONE CIS300 return given months overdue and the CIS
 * deductions that were due on it (0 for a nil return).
 *
 * The £100 and £200 fixed penalties are separated from the 6/12-month
 * tax-geared element because HMRC's new-contractor cap (CISR65080) applies to
 * the aggregate of the FIXED penalties only, and for a new contractor the £300
 * minimum floor on the tax-geared element does not apply.
 */
function penaltyForReturn(
  monthsLate: number,
  cisDeductionsDue: number,
  newContractor: boolean,
): {
  fixed: number;      // £100 + £200 fixed element (subject to the new-contractor cap)
  taxGeared: number;  // 6m + 12m tax-geared element (never capped)
  total: number;
} {
  const initial  = monthsLate >= 0 ? PENALTY_INITIAL : 0;  // day 1
  const twoMonth = monthsLate >= 2 ? PENALTY_2M : 0;
  const fixed = initial + twoMonth;

  // For a new contractor the £300 floor does not apply, so the tax-geared
  // element is simply 5% of the deductions due (which is £0 for a nil return).
  const sixMonthGeared = newContractor
    ? cisDeductionsDue * PENALTY_PCT
    : Math.max(PENALTY_FIXED_6M, cisDeductionsDue * PENALTY_PCT);
  const twelveMonthGeared = newContractor
    ? cisDeductionsDue * PENALTY_PCT
    : Math.max(PENALTY_FIXED_12M, cisDeductionsDue * PENALTY_PCT);

  const sixMonth    = monthsLate >= 6  ? sixMonthGeared    : 0;
  const twelveMonth = monthsLate >= 12 ? twelveMonthGeared : 0;
  const taxGeared = sixMonth + twelveMonth;

  return { fixed, taxGeared, total: fixed + taxGeared };
}

export const cisPenaltyCalculator: GenericTool = {
  kind: "generic",
  slug: "cis-penalty-calculator",
  name: "CIS Late Filing Penalty and Appeal Estimator",
  category: "CIS Compliance",
  oneLiner:
    "Find out your CIS300 late-filing penalty exposure and whether you have grounds to appeal, including the £3,000 new-contractor cap and nil-return treatment.",
  metaTitle: "CIS Late Filing Penalty Calculator 2026/27 | Appeal Estimator",
  metaDescription:
    "Calculate your CIS300 late-filing penalty for one or more overdue monthly returns. See the fixed penalty ladder, the £3,000 new-contractor cap, nil-return treatment and whether an appeal is likely to succeed.",
  intro:
    "HMRC charges a fixed penalty for every CIS300 monthly return filed late, and the amount rises the longer it remains outstanding. This tool works out your total penalty exposure, applies the £3,000 new-contractor cap where it is due, shows you the per-return breakdown and flags whether an appeal on reasonable-excuse or nil-return grounds is worth making.",
  ctaLabel: "Get specialist CIS penalty appeal support →",
  embedHeight: 700,
  fields: [
    {
      id: "monthsLate",
      label: "How many months overdue is each return?",
      type: "select",
      default: "3",
      options: [
        { value: "1",  label: "Less than 2 months (£100 penalty)" },
        { value: "2",  label: "2 months (£300 penalty)" },
        { value: "3",  label: "3 to 5 months (£300 penalty)" },
        { value: "6",  label: "6 to 11 months (£600 or tax-geared if higher)" },
        { value: "12", label: "12 months or more (£900 or tax-geared if higher)" },
      ],
    },
    {
      id: "numberOfReturns",
      label: "Number of late monthly returns",
      type: "number",
      default: 1,
      min: 1,
      max: 48,
      help: "Each overdue CIS300 monthly return carries its own penalty. Enter the total number of returns that were filed late.",
    },
    {
      id: "isNilReturn",
      label: "Were all returns nil returns (no CIS deductions made)?",
      type: "toggle",
      default: false,
      help: "A nil return is one where you had no subcontractors to pay in that month. The 5% tax-geared penalties do not apply to nil returns, capping each return at the fixed ladder.",
    },
    {
      id: "cisDeductionsDue",
      label: "CIS deductions due per return (if not nil)",
      type: "currency",
      default: 0,
      step: 100,
      help: "The total CIS amounts you should have deducted from subcontractors in each month. Leave at £0 if nil return is toggled on.",
    },
    {
      id: "firstDefault",
      label: "Is this your first CIS late-filing default?",
      type: "toggle",
      default: true,
      help: "First defaults with a reasonable excuse are frequently reduced or cancelled on appeal. A history of late filing weakens the appeal position.",
    },
    {
      id: "newContractor",
      label: "Are these your first ever CIS monthly returns (new contractor)?",
      type: "toggle",
      default: false,
      help: "A new contractor is one who has never filed a CIS300 monthly return before. HMRC caps the total of the £100 and £200 fixed penalties across those first returns at £3,000, and the £300 minimum on the 5% tax-geared penalties does not apply during the capping period (HMRC CISR65080).",
    },
  ],
  compute: (v) => {
    const monthsLate       = Number(v.monthsLate);
    const numberOfReturns  = Math.max(1, Math.floor(Number(v.numberOfReturns)));
    const isNilReturn      = Boolean(v.isNilReturn);
    const cisDeductionsDue = isNilReturn ? 0 : Math.max(0, Number(v.cisDeductionsDue));
    const firstDefault     = Boolean(v.firstDefault);
    const newContractor    = Boolean(v.newContractor);

    const perReturn = penaltyForReturn(monthsLate, cisDeductionsDue, newContractor);

    // Aggregate across all late returns.
    const fixedTotalUncapped = perReturn.fixed * numberOfReturns;
    const taxGearedTotal     = perReturn.taxGeared * numberOfReturns;
    // New-contractor cap (CISR65080): the aggregate of the £100/£200 fixed
    // penalties is capped at £3,000. Tax-geared penalties are never capped.
    const fixedTotal = newContractor
      ? Math.min(fixedTotalUncapped, NEW_CONTRACTOR_FIXED_CAP)
      : fixedTotalUncapped;
    const capApplied = newContractor && fixedTotalUncapped > NEW_CONTRACTOR_FIXED_CAP;
    const totalPenalty = fixedTotal + taxGearedTotal;

    // Appeal flag: reasonable excuse is most viable when:
    // - first default, OR
    // - nil returns (disproportionality argument), OR
    // - both (strongest case)
    const appealLikely = firstDefault || isNilReturn;
    const appealStrength =
      firstDefault && isNilReturn ? "strong" :
      firstDefault ? "moderate" :
      isNilReturn  ? "moderate" : "weak";

    const breakdown: { label: string; value: string }[] = [];

    if (perReturn.fixed > 0)
      breakdown.push({
        label: monthsLate >= 2
          ? "Fixed penalties per return (£100 day 1 + £200 at 2 months)"
          : "Fixed penalty per return (£100 day 1)",
        value: gbp(perReturn.fixed),
      });
    if (monthsLate >= 6) {
      const sixMonth = newContractor
        ? cisDeductionsDue * PENALTY_PCT
        : Math.max(PENALTY_FIXED_6M, cisDeductionsDue * PENALTY_PCT);
      const label = isNilReturn && newContractor
        ? "6-month penalty per return (nil return, new contractor: 5% of £0 = £0)"
        : isNilReturn
        ? "6-month penalty per return (nil return: £300 fixed floor, 5% element is £0)"
        : newContractor
        ? `6-month penalty per return (5% of ${gbp(cisDeductionsDue)}, no £300 floor for new contractors)`
        : `6-month penalty per return (greater of ${gbp(300)} or 5% of ${gbp(cisDeductionsDue)})`;
      breakdown.push({ label, value: gbp(sixMonth) });
    }
    if (monthsLate >= 12) {
      const twelveMonth = newContractor
        ? cisDeductionsDue * PENALTY_PCT
        : Math.max(PENALTY_FIXED_12M, cisDeductionsDue * PENALTY_PCT);
      const label = isNilReturn && newContractor
        ? "12-month penalty per return (nil return, new contractor: 5% of £0 = £0)"
        : isNilReturn
        ? "12-month penalty per return (nil return: £300 fixed floor, 5% element is £0)"
        : newContractor
        ? `12-month penalty per return (5% of ${gbp(cisDeductionsDue)}, no £300 floor for new contractors)`
        : `12-month penalty per return (greater of ${gbp(300)} or 5% of ${gbp(cisDeductionsDue)})`;
      breakdown.push({ label, value: gbp(twelveMonth) });
    }

    const appealNote =
      appealStrength === "strong"
        ? "Appeal grounds are strong: first default and nil returns. HMRC will often cancel or reduce penalties for nil returns on first default, as the fixed penalty can be disproportionate to a zero-deduction obligation. File an appeal on form SA370 (or via the HMRC portal) citing both grounds."
        : appealStrength === "moderate" && firstDefault
        ? "Appeal grounds are reasonable: first default. A clear reasonable-excuse letter (illness, bereavement, software failure, or genuinely not knowing a return was due because no subcontractors were paid) is worth filing. Success is not guaranteed but HMRC's own guidance acknowledges first-default discretion."
        : appealStrength === "moderate" && isNilReturn
        ? "Appeal grounds are reasonable: nil returns create a disproportionality argument even without a first-default position. The £100/£200/£300 fixed penalties are significant relative to zero CIS deductions owed. An appeal citing disproportionality and any underlying reason for the late filing is worth making."
        : "Appeal prospects are limited. A history of late filing and non-nil returns reduces HMRC's discretion. A specialist can review whether any penalty period has procedural defects or whether the underlying obligation was correctly assessed.";

    return {
      headline: {
        label: "Total estimated penalty",
        value: gbp(totalPenalty),
        sub: `${numberOfReturns} return${numberOfReturns > 1 ? "s" : ""} at ${gbp(perReturn.total)} per return${capApplied ? ", fixed penalties capped at £3,000" : ""}${appealLikely ? " (appeal flag: ON)" : ""}`,
      },
      rows: [
        ...breakdown.map(r => ({ label: r.label, value: r.value })),
        {
          label: `Penalty per return (${monthsLate < 2 ? "< 2" : monthsLate}+ months late)`,
          value: gbp(perReturn.total),
          strong: true,
        },
        {
          label: `Number of late returns`,
          value: String(numberOfReturns),
        },
        {
          label: capApplied
            ? "Fixed penalties (capped at £3,000 for a new contractor)"
            : "Fixed penalties (£100 / £200 element)",
          value: gbp(fixedTotal),
        },
        {
          label: "6 and 12 month penalties (not subject to the new-contractor cap)",
          value: gbp(taxGearedTotal),
        },
        {
          label: "Total estimated penalty",
          value: gbp(totalPenalty),
          strong: true,
        },
        {
          label: "Appeal recommended?",
          value: appealStrength === "strong" ? "Yes, strong grounds" :
                 appealStrength === "moderate" ? "Yes, reasonable grounds" :
                 "Limited grounds",
        },
      ],
      note: capApplied
        ? `${appealNote} The new-contractor cap has been applied: the aggregate of the £100 and £200 fixed penalties across your first returns is limited to £3,000 (HMRC CISR65080). Any 6 and 12 month tax-geared penalties are added on top and are not capped.`
        : appealNote,
    };
  },
  explainer: {
    heading: "How CIS300 late-filing penalties work",
    paragraphs: [
      "Every contractor registered under CIS must file a CIS300 monthly return by the 19th of the month following the tax month it covers. If you made no payments to subcontractors, you must still file a nil return by that date. A late return, whether nil or not, triggers an automatic fixed penalty that escalates the longer the return remains outstanding.",
      "The penalty ladder is: £100 from day one, an additional £200 at two months (£300 in total), then at six months the greater of £300 or 5% of the CIS deductions that were due on that return, and the same again at 12 months. For a nil return, the 5% element is always £0 because no CIS deductions were due, so the maximum fixed penalty per nil return is £900 if it remains outstanding for a full year.",
      "Penalties stack per return. Three months of late returns each attract their own penalty independently. A contractor who misses three consecutive months and files nothing will face three separate sets of penalties, not one combined charge. This is why even short gaps can accumulate quickly.",
      "There is an important relief for new contractors. If you are filing CIS monthly returns for the first time and earlier returns are also late, HMRC caps the total of the £100 and £200 fixed penalties across those first returns at £3,000 (set out in HMRC guidance CISR65080). During that first-filing period the £300 minimum on the 6 and 12 month penalties also falls away, so those penalties can be as low as 5% of the deductions due, or nil for a nil return. The cap covers only the fixed £100 and £200 penalties; any 6 and 12 month tax-geared penalties are charged on top and are not capped. Toggle the new-contractor option to apply this treatment.",
      "The 12-month tier includes a further band for deliberate and concealed withholding: HMRC can charge the greater of 100% of the CIS deductions due or £3,000. This tool does not assume deliberate withholding; if you believe HMRC is applying that charge, take specialist advice immediately.",
    ],
  },
  workedExamples: [
    {
      title: "Three nil returns, each 3 months late, first default",
      description:
        "A sole-trader contractor had no subcontractors for three months and did not realise nil returns were still required. Each return was filed three months late. No CIS deductions were due.",
      inputs: {
        monthsLate: 3,
        numberOfReturns: 3,
        isNilReturn: true,
        cisDeductionsDue: 0,
        firstDefault: true,
      },
      result: {
        perReturn: "£100 (day 1) + £200 (2 months) = £300 (no tax-geared element on nil returns at 3 months)",
        total: "3 × £300 = £900",
        appeal: "Strong grounds: first default and nil returns. HMRC regularly cancels or reduces these penalties on appeal.",
      },
    },
    {
      title: "Two returns, 7 months late, £2,000 CIS deductions each",
      description:
        "A contractor was under investigation and delayed filing for seven months. Each return carried £2,000 of CIS deductions due. Not the first default.",
      inputs: {
        monthsLate: 6,
        numberOfReturns: 2,
        isNilReturn: false,
        cisDeductionsDue: 2000,
        firstDefault: false,
      },
      result: {
        perReturn:
          "£100 + £200 + max(£300, 5% of £2,000 = £100) = £100 + £200 + £300 = £600 (fixed floor applies because £100 < £300)",
        total: "2 × £600 = £1,200",
        appeal: "Limited grounds. No first default and non-nil returns. A specialist can assess whether any procedural defects apply.",
      },
    },
    {
      title: "New contractor, 20 nil returns each 2 months late (cap applies)",
      description:
        "A contractor registered but never realised nil returns were due, then filed 20 outstanding nil monthly returns at once, each already 2 months late. These are their first ever CIS300 returns.",
      inputs: {
        monthsLate: 2,
        numberOfReturns: 20,
        isNilReturn: true,
        cisDeductionsDue: 0,
        firstDefault: true,
        newContractor: true,
      },
      result: {
        perReturn: "£100 (day 1) + £200 (2 months) = £300 fixed per return",
        total: "Uncapped fixed penalties: 20 × £300 = £6,000, capped at £3,000 for a new contractor. No 6 or 12 month penalties apply at 2 months late. Total = £3,000.",
        appeal: "Strong grounds: first default, nil returns and the new-contractor cap. HMRC frequently reduces these further on appeal.",
      },
    },
  ],
  faqs: [
    {
      question: "Do I have to file a CIS300 if I made no payments to subcontractors?",
      answer:
        "Yes. A nil return must be filed by the 19th of the following month even if you made no payments to subcontractors in that period. Failing to file attracts the same £100 day-one penalty as a non-nil return. You can contact HMRC to be removed from the monthly filing obligation if you expect to have no subcontractors for an extended period, but this requires advance notification.",
    },
    {
      question: "I have never filed a CIS return before. Is my penalty capped?",
      answer:
        "Possibly. HMRC operates a new-contractor cap. If you are filing CIS monthly returns for the first time and several earlier returns are also late, the total of the £100 and £200 fixed penalties across those first returns is capped at £3,000 (HMRC guidance CISR65080). A new contractor here means someone who has never filed a CIS300 monthly return before. During that first-filing period the £300 minimum on the 6 and 12 month penalties also does not apply, so those penalties are just 5% of the deductions due, or nil for a nil return. The cap covers only the fixed penalties; any 6 and 12 month tax-geared penalties are added on top and are not capped. Toggle the new-contractor option in the calculator to apply this.",
    },
    {
      question: "Can I appeal a CIS late-filing penalty?",
      answer:
        "Yes. You can appeal any fixed CIS penalty if you have a reasonable excuse. HMRC accepts appeals within 30 days of the penalty notice, but late appeals can be considered in appropriate circumstances. Common reasonable excuses include serious illness, bereavement of a close family member, software failure, or a genuine and reasonable misunderstanding of the filing obligation. A history of compliance strengthens an appeal.",
    },
    {
      question: "What is the nil-return penalty argument?",
      answer:
        "Where a return is nil (no CIS deductions were due), the penalty is the same fixed amount as a non-nil return, but there is no underlying tax at risk. Many tax professionals argue this is disproportionate, and HMRC's First-tier Tribunal has accepted disproportionality as a factor in penalty appeals in certain circumstances. Nil-return late penalties, especially on a first default, are among the most frequently reduced or cancelled on appeal.",
    },
    {
      question: "What counts as a reasonable excuse?",
      answer:
        "HMRC's guidance (CH160000 series) lists: serious or life-threatening illness, death of a close relative, fire, flood or other natural disaster affecting your records, and postal delays outside your control. Lack of awareness of the obligation is generally not accepted unless you took reasonable steps to find out. If you relied on an agent who failed to file, the excuse may rest on the agent's conduct rather than your own.",
    },
    {
      question: "How do I appeal a CIS penalty?",
      answer:
        "Write to HMRC within 30 days of the penalty notice, or use HMRC's online services. Your letter should state the return period, the penalty reference, the specific reasonable excuse and the date the excuse arose and ended. If HMRC rejects the appeal, you can request a review or appeal directly to the First-tier Tribunal (Tax Chamber). Specialist representation is advisable for penalties above £500 or where a deliberate-withholding charge has been raised.",
    },
    {
      question: "Can HMRC charge more than the fixed penalty amounts?",
      answer:
        "Yes, at the 12-month stage. Where HMRC determines that a failure was deliberate, or deliberate and concealed, the charge rises to the greater of 100% of the CIS deductions due or £3,000 per return. This tool does not assume deliberate withholding. If you have received a notice citing deliberate withholding, take specialist advice before responding.",
    },
    {
      question: "Will the penalty show on a compliance record?",
      answer:
        "Late-filing defaults are recorded on your compliance record and can affect your ability to hold or apply for Gross Payment Status. HMRC's annual Tax Treatment Qualification Test considers compliance history. If you currently hold GPS, an upheld penalty for a late return may trigger a review of your status.",
    },
  ],
};
