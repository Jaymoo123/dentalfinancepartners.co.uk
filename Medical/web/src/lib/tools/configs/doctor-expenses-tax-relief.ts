/**
 * Doctor Expenses Tax Relief Calculator — tool config + inline compute.
 *
 * Tool 9: doctor-expenses-tax-relief (P2, premium: no).
 *
 * Covers: allowable professional expenses (GMC, indemnity, royal college, CPD,
 * journals) + AMAP mileage (55p/10k then 25p from 6 Apr 2026), all at the user's
 * chosen marginal rate.
 *
 * This is NOT a take-home / income-tax computation tool. Marginal rate is
 * a user-supplied select, not derived from a full band calculation.
 * The income-tax band rule (from the roster spec §5) therefore applies only
 * to the note explaining the 60% effective zone, not to any compute path here.
 *
 * Tax year: 2026/27.
 *
 * NOTE ON HMRC FLAT-RATE EXPENSES: there is NO doctor-specific flat-rate expense
 * in HMRC's agreed table (EIM32712). The £185 figure sometimes quoted is the
 * "ambulance staff on active service" rate, not a doctors' rate. Nurses and
 * several allied roles have £125; doctors are absent from the table. Doctors
 * therefore claim ACTUAL professional subscriptions (GMC, defence body, royal
 * college — all on HMRC's approved List 3) rather than a flat rate. The old
 * flat-rate field/toggle has been removed for this reason.
 *
 * Annual-variable figures (must be re-checked each year):
 *   AMAP_RATE_1   55p — car/van first 10,000 miles from 6 Apr 2026 (FA 2026 ground truth).
 *   AMAP_RATE_2   25p — above 10,000 miles.
 *   GMC_FEE       NOT STATED. house_positions section 8 flags the GMC retention fee
 *                 UNVERIFIED as at 2026-08-26: the GMC fee regulations and the fees
 *                 page both return HTTP 403 to automated fetches, so the figure this
 *                 file used to carry (£481) had no primary source. The rule there is
 *                 explicit: no page may state a GMC fee until a human reads the
 *                 regulations. The input defaults to 0 and the reader enters their own.
 *   BMA_RELIEF_FRACTION  0.85 — HMRC List 3 restricts BMA relief to 85% of the
 *                 annual subscription. house_positions section 12.
 *
 * ponytail: compute is inline — a separate compute file would add zero reuse value
 * at this tool's complexity level.
 */

import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// ponytail: annual-variable knobs — update each year, not baked in as magic numbers
// HMRC List 3, "Approved professional organisations and learned societies",
// verbatim entry: "British Medical Association (J) (tax relief restricted to
// 85% of annual subscription)". house_positions section 12.
const BMA_RELIEF_FRACTION = 0.85;

const AMAP_RATE_1 = 0.55; // £/mile, first 10,000 miles, 2026/27
const AMAP_RATE_2 = 0.25; // £/mile, above 10,000 miles, 2026/27
const AMAP_THRESHOLD = 10000; // miles

function calcAmap(miles: number): number {
  if (miles <= 0) return 0;
  if (miles <= AMAP_THRESHOLD) return miles * AMAP_RATE_1;
  return AMAP_THRESHOLD * AMAP_RATE_1 + (miles - AMAP_THRESHOLD) * AMAP_RATE_2;
}

const MARGINAL_RATES: Record<string, number> = {
  basic: 0.2,
  higher: 0.4,
  additional: 0.45,
};

export const doctorExpensesTaxReliefTool: GenericTool = {
  kind: "generic",
  slug: "doctor-expenses-tax-relief",
  name: "Doctor Expenses Tax Relief Calculator",
  category: "Expenses",
  oneLiner:
    "Allowable professional expenses, GMC and royal college fees, CPD and business mileage relief at your marginal tax rate. 2026/27.",
  embedHeight: 680,
  metaTitle: "Doctor Expenses Tax Relief Calculator 2026/27 | GMC, CPD, Mileage",
  metaDescription:
    "Free calculator: estimate tax relief on doctor expenses including GMC fees, indemnity, CPD courses, royal college subscriptions and business mileage. 2026/27 AMAP rates (55p/mile).",
  intro:
    "Doctors can claim tax relief on a range of professional expenses, from GMC registration fees and medical indemnity to CPD courses, royal college subscriptions and business mileage. This calculator adds up your allowable costs, applies the correct 2026/27 AMAP mileage rate (55p per mile for the first 10,000 miles), and shows the pounds of relief at your marginal income tax rate.",
  fields: [
    {
      id: "marginalRate",
      label: "Your income tax band",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
    },
    {
      id: "gmcFees",
      label: "GMC registration / retention fees",
      type: "currency",
      default: 0,
      min: 0,
      max: 2000,
      step: 1,
      help: "Your annual GMC retention fee. Take it from your own GMC receipt or gmc-uk.org: this site does not state a figure, because the GMC fee regulations could not be read at source (house_positions section 8, UNVERIFIED)."
    },
    {
      id: "indemnity",
      label: "Medical indemnity (MDU, MPS, MDDUS)",
      type: "currency",
      default: 4000,
      min: 0,
      max: 30000,
      step: 100,
    },
    {
      id: "royalCollege",
      label: "Royal college / specialist society fees",
      type: "currency",
      default: 500,
      min: 0,
      max: 5000,
      step: 50,
      help: "Enter your BMA subscription separately below: it has its own List 3 restriction.",
    },
    {
      id: "bmaSubscription",
      label: "BMA subscription",
      type: "currency",
      default: 0,
      min: 0,
      max: 5000,
      step: 50,
      help: "HMRC's List 3 restricts tax relief on the BMA subscription to 85% of the amount paid, so the calculator claims 85% of whatever you enter here.",
    },
    {
      id: "cpdCourses",
      label: "CPD courses, conferences and study days",
      type: "currency",
      default: 1200,
      min: 0,
      max: 20000,
      step: 100,
      help: "Wholly and exclusively for your professional role",
    },
    {
      id: "journalsEquipment",
      label: "Medical journals, textbooks and equipment",
      type: "currency",
      default: 0,
      min: 0,
      max: 5000,
      step: 50,
    },
    {
      id: "businessMileage",
      label: "Business miles driven",
      type: "number",
      default: 3000,
      min: 0,
      max: 50000,
      step: 100,
      help: "Mileage not reimbursed by your employer. AMAP: 55p/mile (first 10,000), then 25p/mile.",
    },
  ],
  compute(values) {
    const rate = MARGINAL_RATES[String(values.marginalRate)] ?? 0.4;
    const gmcFees = Math.max(0, Number(values.gmcFees));
    const indemnity = Math.max(0, Number(values.indemnity));
    const royalCollege = Math.max(0, Number(values.royalCollege));
    const bmaSubscription = Math.max(0, Number(values.bmaSubscription));
    // HMRC List 3: "British Medical Association (J) (tax relief restricted to
    // 85% of annual subscription)". Claiming the full amount is a wrong number
    // on a tax return, so the restriction is applied here, not just described.
    const bmaAllowable = bmaSubscription * BMA_RELIEF_FRACTION;
    const cpdCourses = Math.max(0, Number(values.cpdCourses));
    const journalsEquipment = Math.max(0, Number(values.journalsEquipment));
    const businessMileage = Math.max(0, Number(values.businessMileage));

    const amapRelief = calcAmap(businessMileage);
    const itemisedTotal =
      gmcFees + indemnity + royalCollege + bmaAllowable + cpdCourses + journalsEquipment;

    const totalAllowable = itemisedTotal + amapRelief;
    const taxRelief = totalAllowable * rate;

    const rows = [
      { label: "GMC registration / retention fees", value: gbp(gmcFees) },
      { label: "Medical indemnity", value: gbp(indemnity) },
      { label: "Royal college / specialist fees", value: gbp(royalCollege) },
      {
        label: "BMA subscription (85% allowable per HMRC List 3)",
        value:
          bmaSubscription > 0
            ? `${gbp(bmaAllowable)} of ${gbp(bmaSubscription)} paid`
            : gbp(0),
      },
      { label: "CPD courses and conferences", value: gbp(cpdCourses) },
      { label: "Journals, textbooks and equipment", value: gbp(journalsEquipment) },
      {
        label: `Business mileage (${businessMileage.toLocaleString()} miles at AMAP)`,
        value: gbp(amapRelief),
      },
      { label: "Total allowable expenses", value: gbp(totalAllowable), strong: true as const },
      {
        label: `Tax relief at ${String(values.marginalRate) === "basic" ? "20%" : String(values.marginalRate) === "higher" ? "40%" : "45%"}`,
        value: gbp(taxRelief),
        strong: true as const,
      },
    ];

    return {
      headline: {
        label: "Tax relief estimate",
        value: gbp(taxRelief),
        sub: `On ${gbp(totalAllowable)} allowable expenses`,
        tone: "good" as const,
      },
      rows,
      note:
        "Salaried doctors claim via a P87 form (or self-assessment if also filing a return). Partners and locums claim via the self-assessment return as a deduction against trading profit, which also reduces Class 4 NI. AMAP applies to car/van mileage not reimbursed by your employer at the approved rate. Cycle mileage has a separate AMAP rate (not included).",
    };
  },
  explainer: {
    heading: "What expenses can doctors claim tax relief on?",
    paragraphs: [
      "HMRC allows doctors to deduct costs that are wholly and exclusively incurred for professional purposes. The main categories are: GMC registration and annual retention fees, medical defence organisation subscriptions (MDU, MPS, MDDUS), royal college membership, BMA membership (relief on which List 3 restricts to 85% of the subscription), CPD courses, conferences and study days directly related to your clinical practice, medical journals and textbooks, and business mileage where you are not reimbursed.",
      "Salaried doctors and hospital consultants can claim relief on employee expenses by submitting a P87 to HMRC, or by including them in a self-assessment return. GP partners and locums deduct these costs directly from trading profit on the self-assessment return, which reduces both income tax and Class 4 National Insurance.",
      "A common myth is that doctors have an HMRC flat-rate expense (often quoted as £185). They do not. HMRC's agreed flat-rate table (EIM32712) has no entry for doctors: the £185 figure belongs to ambulance staff on active service, and nurses and several allied roles get £125. Doctors instead claim their actual professional costs. GMC fees, defence body subscriptions and royal college fees are all on HMRC's approved List 3 of professional bodies, so they are deductible on the actual amount paid. The BMA is the exception worth knowing: its List 3 entry restricts tax relief to 85% of the annual subscription, so a doctor claiming the full amount is overclaiming.",
      "Business mileage relief uses the HMRC Approved Mileage Allowance Payment (AMAP) rates. From 6 April 2026 the car and van rate for the first 10,000 business miles rises to 55p per mile, then drops to 25p per mile above that. Salaried GPs doing home visits or travelling between sites can claim for miles not reimbursed by their employer at the approved rate.",
      "Worked example 1 (higher-rate GP): indemnity £4,000, royal college £500, CPD £1,200, 3,000 business miles at 55p per mile (£1,650). Total allowable on those four: £7,350, and tax relief at 40% is £2,940. Add your own GMC retention fee to both figures.",
      "Worked example 2 (basic-rate salaried GP, low mileage): indemnity £2,500, BMA £250 (of which 85%, or £212.50, is allowable), CPD £600, no itemised mileage. Total allowable on those three: £3,312.50, and tax relief at 20% is £662.50. If mileage to home visits adds 2,000 miles (£1,100 AMAP), the allowable rises to £4,412.50 and relief to £882.50. Add your own GMC retention fee to whichever applies.",
    ],
  },
  faqs: [
    {
      question: "Can a salaried GP claim mileage for visiting patients at home?",
      answer:
        "Yes, if you use your own car and your employer does not reimburse you at the full AMAP rate. You can claim the difference between the AMAP rate (55p per mile for the first 10,000 miles from 6 April 2026) and any amount your employer does pay. Travel from home to your regular place of work is ordinary commuting and is not allowable.",
    },
    {
      question: "Is there an HMRC flat-rate expense for doctors?",
      answer:
        "No. HMRC operates a flat-rate job expense scheme for many professions, but doctors are not in the agreed table (EIM32712). Nurses, midwives and several allied health roles have a £125 flat rate, and ambulance staff on active service have £185, but there is no doctors' rate. This is why the £185 figure sometimes quoted for doctors is wrong. Doctors claim their actual costs instead: GMC fees, defence body subscriptions and royal college fees are all deductible because those bodies are on HMRC's approved List 3. Check the List 3 entry for each body, because some carry a restriction: the BMA's entry limits relief to 85% of the annual subscription.",
    },
    {
      question: "Is CPD tax deductible?",
      answer:
        "Yes, provided the course or conference is directly and wholly related to your existing professional role. CPD required for revalidation, clinical skills directly used in your current post, and mandatory training all qualify. Courses aimed at career change, initial qualification, or interests outside your current role generally do not qualify for a deduction.",
    },
    {
      question: "Do GMC fees qualify for tax relief?",
      answer:
        "Yes. GMC registration and annual retention fees are a professional subscription allowable for tax relief, because GMC registration is a legal requirement to practise as a doctor in the UK. We do not quote the fee here: take the figure from your own GMC receipt or from gmc-uk.org. Reduced rates apply on lower incomes, so the amount is not the same for every doctor.",
    },
    {
      question: "Can GP partners claim the same expenses?",
      answer:
        "Yes, with one key difference: partners and locums deduct expenses from their self-employed trading profit on the self-assessment return, rather than via a P87. This means the relief also reduces Class 4 National Insurance (6% on profits between £12,570 and £50,270, then 2% above), making the total saving slightly higher for self-employed doctors than for salaried employees at the same income.",
    },
    {
      question: "What is the 60% effective tax zone and does it affect my relief calculation?",
      answer:
        "When your adjusted net income is between £100,000 and £125,140, HMRC tapers away your personal allowance at a rate of £1 for every £2 of income over £100,000. This creates an effective marginal rate of approximately 60% in that zone. This calculator lets you select 'higher rate (40%)' as your band, but if your income sits in this zone you are effectively paying 60% on marginal pounds. In that case the relief on your expenses is also worth closer to 60p per pound, not 40p. Speak to your accountant if you are in this position, as the actual benefit will be higher than what this calculator shows at 40%.",
    },
  ],
};
