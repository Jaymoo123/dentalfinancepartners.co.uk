/**
 * Tool 10: Consultant private-vs-NHS marginal-rate modeller.
 *
 * toolId: consultant-private-vs-nhs
 * topic: nhs-pension
 *
 * Models the marginal net of one extra private session AFTER the AA-taper
 * interaction. A consultant near the £200k threshold can find a single
 * additional session triggers taper and is effectively taxed well above 60%
 * once the lost allowance charge is included.
 *
 * COMPUTE RULES (per TOOL_ROSTER.md Tool 10 + §5 income-tax band rule):
 *
 * 1. Threshold income = nhsPensionablePay + existingPrivateIncome + extraSessionValue
 *    + otherIncome. (Own pension contributions not captured here; stated in note.)
 *
 * 2. Adjusted income = threshold income + the pension input amount for the year
 *    (FA 2004 s.228ZA), taken from the member's annual allowance statement.
 *    Corrected 2026-09-12: this tool previously added 23.7% of NHS pensionable
 *    pay, which is the scheme's total contribution rate and not the statutory
 *    measure. compute/nhs-pension.ts has always used the pension input amount.
 *
 * 3. Taper: BOTH conditions must hold:
 *      threshold income > £200,000
 *      adjusted income  > £260,000
 *    Reduction = (adjustedIncome - £260,000) / 2, floored at MIN_ALLOWANCE.
 *
 * 4. AA charge impact of extra session = (AA before - AA after) * marginalRate.
 *    This models the cost of the allowance lost, not the whole AA charge, which
 *    depends on whether total pension input would otherwise have stayed within
 *    the allowance. Stated clearly in the note.
 *
 * 5. Income-tax band rule (LOCKED, §5):
 *    PA = 12,570 tapered £1 per £2 above £100,000, fully gone at £125,140.
 *    Basic band: fixed £37,700.
 *    Higher band width: (125,140 - PA) - 37,700.
 *    Additional: above £125,140.
 *    The ~60% effective zone (£100k-£125,140) is handled by the taper itself.
 *
 * 6. NI on private income (self-employed overlay on top of NHS PAYE):
 *    Class 4: 6% on £12,570-£50,270, 2% above (2026/27).
 *    The consultant pays Class 1 on NHS salary through PAYE; Class 4 applies
 *    only to the self-employed private income above the lower profits limit.
 *
 * WORKED EXAMPLE (from TOOL_ROSTER.md Tool 10):
 *    NHS pensionable £150k, existing private £70k, extra session £15k, other £0.
 *    Pension input amount £35k (example assumption, from the AA statement).
 *    Threshold income (with extra): £150k + £70k + £15k = £235k  (>£200k)
 *    Adjusted income: £235k + £35k = £270,000  (>£260k -- taper fires)
 *    AA = £60,000 - (£270,000 - £260,000) / 2 = £60,000 - £5,000 = £55,000
 *    Without extra: threshold £220k, adjusted £255,000 -- adjusted < £260k, NO taper.
 *    AA reduction caused by extra session: £60,000 - £55,000 = £5,000
 *    AA charge impact: £5,000 * 45% = £2,250 (additional-rate band)
 *    Income tax on extra £15k: all at 45% (income already £235k) = £6,750
 *    Class 4 NI on extra £15k: all at 2% (private income £85k total, above £50,270) = £300
 *    Total cost of extra session: £6,750 + £300 + £2,250 = £9,300
 *    Net income from extra session: £15,000 - £9,300 = £5,700
 *    Effective marginal rate: 62.0%
 *
 * No chart: single marginal-outcome output, comparison is before/after inline.
 *
 */
import type { PremiumToolConfig, PremiumResult } from "../types";

const STANDARD_AA = 60_000;
const MIN_AA = 10_000;
const THRESHOLD_LIMIT = 200_000;
const ADJUSTED_LIMIT = 260_000;

const PA_FULL = 12_570;
const BASIC_BAND = 37_700; // fixed
const HIGHER_TOP = 125_140; // AA fully gone here

const CLASS4_LPL = 12_570;
const CLASS4_UPL = 50_270;
const CLASS4_MAIN = 0.06; // 2026/27
const CLASS4_UPPER = 0.02;

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number, dp = 1): string {
  return n.toFixed(dp) + "%";
}

/** Personal allowance after taper. Fully gone at £125,140. */
function calcPA(totalIncome: number): number {
  if (totalIncome <= 100_000) return PA_FULL;
  const reduction = Math.floor((totalIncome - 100_000) / 2);
  return Math.max(0, PA_FULL - reduction);
}

/** Income tax on a slice of income given prior income already taxed. */
function calcIncomeTax(totalIncome: number): number {
  const pa = calcPA(totalIncome);
  if (totalIncome <= pa) return 0;

  // Basic band: PA to PA+37,700
  const basicTop = pa + BASIC_BAND;
  // Higher band: basicTop to HIGHER_TOP (125,140)
  const higherTop = HIGHER_TOP;

  let tax = 0;
  const taxable = totalIncome - pa;

  // Basic-rate slice
  const inBasic = Math.max(0, Math.min(taxable, BASIC_BAND));
  tax += inBasic * 0.2;

  // Higher-rate slice (from basicTop to higherTop, relative to PA)
  const higherWidth = Math.max(0, higherTop - basicTop);
  const inHigher = Math.max(0, Math.min(taxable - BASIC_BAND, higherWidth));
  tax += inHigher * 0.4;

  // Additional-rate slice (above 125,140)
  const inAdditional = Math.max(0, totalIncome - higherTop);
  tax += inAdditional * 0.45;

  return tax;
}

/** Class 4 NI on self-employed private income (overlay on top of NHS PAYE). */
function calcClass4(privateIncome: number): number {
  // Consultant already has NHS PAYE eating Class 1 NI; Class 4 applies on
  // self-employed private income above the lower profits limit.
  // For simplicity: apply Class 4 on the private income total ignoring
  // NHS income overlap (conservative; stated in note).
  const inMain = Math.max(0, Math.min(privateIncome, CLASS4_UPL) - CLASS4_LPL);
  const inUpper = Math.max(0, privateIncome - CLASS4_UPL);
  return inMain * CLASS4_MAIN + inUpper * CLASS4_UPPER;
}

/** Annual allowance after taper, given threshold and adjusted income. */
function calcAA(thresholdIncome: number, adjustedIncome: number): number {
  if (thresholdIncome <= THRESHOLD_LIMIT || adjustedIncome <= ADJUSTED_LIMIT) {
    return STANDARD_AA;
  }
  const reduction = (adjustedIncome - ADJUSTED_LIMIT) / 2;
  return Math.max(MIN_AA, STANDARD_AA - reduction);
}

/** Marginal income-tax rate at a given total income level. */
function marginalRate(totalIncome: number): number {
  if (totalIncome > HIGHER_TOP) return 0.45;
  const pa = calcPA(totalIncome);
  if (totalIncome > pa + BASIC_BAND) return 0.4;
  // £100k-£125,140 effective ~60% zone handled by PA taper
  if (totalIncome > 100_000) return 0.6; // effective rate in the PA-taper zone
  if (totalIncome > pa) return 0.2;
  return 0;
}

export const consultantPrivateVsNhsConfig: PremiumToolConfig = {
  id: "consultant-private-vs-nhs",
  topic: "nhs-pension",
  title: "Consultant private-vs-NHS marginal-rate modeller",
  intro:
    "See the true net value of one extra private session once income tax, NI and the NHS Pension annual allowance taper are all counted. For consultants near the £200k threshold, a single extra session can trigger taper and push the effective marginal rate well above 45%.",
  fields: [
    {
      id: "nhsPensionablePay",
      label: "NHS pensionable pay",
      type: "currency",
      default: 150_000,
      min: 0,
      max: 400_000,
      step: 5_000,
      help: "Your NHS salary or sessional pay that counts as pensionable. Counts toward threshold income.",
    },
    {
      id: "pensionInputAmount",
      label: "Pension input amount for the year",
      type: "currency",
      default: 35_000,
      min: 0,
      max: 200_000,
      step: 1_000,
      help: "The growth in the value of your pension this year across every registered scheme, as shown on your annual allowance statement. This is the figure adjusted income adds back, and it is not the same as the contributions paid in.",
    },
    {
      id: "existingPrivateIncome",
      label: "Existing private income (this year so far)",
      type: "currency",
      default: 70_000,
      min: 0,
      max: 500_000,
      step: 5_000,
      help: "Private practice income already earned or committed for the year, before the extra session in question.",
    },
    {
      id: "extraSessionValue",
      label: "Extra session value",
      type: "currency",
      default: 15_000,
      min: 0,
      max: 100_000,
      step: 1_000,
      help: "The gross income from the single additional private session you are considering.",
    },
    {
      id: "otherIncome",
      label: "Other income (rental, savings, etc.)",
      type: "currency",
      default: 0,
      min: 0,
      max: 200_000,
      step: 1_000,
      advanced: true,
      help: "Any other taxable income that counts toward the threshold income test. Leave at zero if none.",
    },
  ],

  compute({ values }): PremiumResult {
    const nhsPensionablePay = Math.max(0, Number(values.nhsPensionablePay) || 0);
    const existingPrivateIncome = Math.max(0, Number(values.existingPrivateIncome) || 0);
    const extraSessionValue = Math.max(0, Number(values.extraSessionValue) || 0);
    const otherIncome = Math.max(0, Number(values.otherIncome) || 0);
    const pensionInputAmount = Math.max(0, Number(values.pensionInputAmount) || 0);

    // --- WITHOUT extra session ---
    const totalIncomeBase =
      nhsPensionablePay + existingPrivateIncome + otherIncome;
    const adjustedIncomeBase = totalIncomeBase + pensionInputAmount;
    const aaBase = calcAA(totalIncomeBase, adjustedIncomeBase);

    // --- WITH extra session ---
    const totalIncomeWith = totalIncomeBase + extraSessionValue;
    const adjustedIncomeWith = totalIncomeWith + pensionInputAmount;
    const aaWith = calcAA(totalIncomeWith, adjustedIncomeWith);

    const aaTapered = aaWith < aaBase;
    const aaReduction = Math.max(0, aaBase - aaWith);

    // Income tax delta
    const taxBase = calcIncomeTax(totalIncomeBase);
    const taxWith = calcIncomeTax(totalIncomeWith);
    const incomeTaxOnSession = Math.max(0, taxWith - taxBase);

    // Class 4 NI delta (on private income only)
    const privateBase = existingPrivateIncome + otherIncome;
    const privateWith = privateBase + extraSessionValue;
    const niBase = calcClass4(privateBase);
    const niWith = calcClass4(privateWith);
    const niOnSession = Math.max(0, niWith - niBase);

    // AA charge impact: AA reduction * marginal rate at the income level with extra session.
    // We use the income-tax marginal rate as the charge rate (conservative model; stated).
    const margRateWith = marginalRate(totalIncomeWith);
    const aaChargeImpact = aaReduction * margRateWith;

    const totalCost = incomeTaxOnSession + niOnSession + aaChargeImpact;
    const netFromSession = extraSessionValue - totalCost;
    const effectiveMarginalRate =
      extraSessionValue > 0 ? (totalCost / extraSessionValue) * 100 : 0;

    const taperNote = aaTapered
      ? `The extra session pushes adjusted income to ${gbp(adjustedIncomeWith)}, triggering the AA taper. Your annual allowance falls from ${gbp(aaBase)} to ${gbp(aaWith)} (a ${gbp(aaReduction)} reduction). The resulting AA charge impact is ${gbp(aaChargeImpact)}.`
      : adjustedIncomeBase > ADJUSTED_LIMIT
      ? `Your adjusted income is already ${gbp(adjustedIncomeBase)} before this session and your AA is already tapered to ${gbp(aaBase)}. The extra session reduces it further to ${gbp(aaWith)}.`
      : `The extra session does not trigger the AA taper here (adjusted income stays at or below ${gbp(ADJUSTED_LIMIT)}). The effective marginal rate reflects income tax and NI only.`;

    const tone = effectiveMarginalRate > 60 ? "warn" : effectiveMarginalRate > 50 ? "warn" : "default";

    return {
      headline: {
        label: `Net from the extra session (${gbp(extraSessionValue)} gross)`,
        value: gbp(netFromSession),
        sub: `Effective marginal rate: ${pct(effectiveMarginalRate)}`,
        tone,
      },
      breakdown: [
        {
          label: "Gross extra session value",
          value: gbp(extraSessionValue),
        },
        {
          label: "Income tax on the session",
          value: gbp(incomeTaxOnSession),
        },
        {
          label: "Class 4 NI on the session",
          value: gbp(niOnSession),
        },
        {
          label: "AA charge impact (taper)",
          value: aaTapered || aaReduction > 0 ? gbp(aaChargeImpact) : "£0 (no taper triggered)",
          strong: aaTapered,
        },
        {
          label: "Total cost",
          value: gbp(totalCost),
          strong: true,
        },
        {
          label: "Net income from extra session",
          value: gbp(netFromSession),
          strong: true,
        },
        {
          label: "Effective marginal rate",
          value: pct(effectiveMarginalRate),
          strong: true,
        },
        {
          label: "AA position (without extra session)",
          value: `Threshold ${gbp(totalIncomeBase)}, adjusted ${gbp(adjustedIncomeBase)}, AA ${gbp(aaBase)}`,
        },
        {
          label: "AA position (with extra session)",
          value: `Threshold ${gbp(totalIncomeWith)}, adjusted ${gbp(adjustedIncomeWith)}, AA ${gbp(aaWith)}`,
        },
        {
          label: "Pension input amount added to reach adjusted income",
          value: `${gbp(pensionInputAmount)} (from your annual allowance statement)`,
        },
      ],
      note: taperNote +
        " 2026/27 basis. Threshold income is the sum of NHS pay, private income and other income (own pension contributions reduce threshold income but are not captured here, so this may be conservative). Adjusted income adds back the pension input amount you entered, per FA 2004 s.228ZA. The AA charge impact is modelled as the AA reduction multiplied by the marginal income-tax rate; your actual charge depends on whether your total pension input this year would otherwise have stayed within the allowance. Carry-forward of unused allowance from the prior three tax years may eliminate the charge entirely. Class 4 NI is computed on the private income element only. These are estimates, not advice." +
        " " + (
          effectiveMarginalRate >= 60
            ? `At an effective marginal rate of ${pct(effectiveMarginalRate)}, the extra session keeps only ${gbp(netFromSession)} of every ${gbp(extraSessionValue)} earned. Before accepting the session, check whether carry-forward allowance removes the AA charge, which could materially improve the net. A specialist medical accountant can model the carry-forward position.`
            : effectiveMarginalRate >= 50
            ? `At an effective marginal rate of ${pct(effectiveMarginalRate)}, the extra session is still taxed heavily. The AA taper ${aaTapered ? "is triggered" : "is not triggered"} at these income levels. Carry-forward of unused annual allowance may reduce the charge.`
            : `At an effective marginal rate of ${pct(effectiveMarginalRate)}, the session is taxed at the normal high-income rate. The AA taper is not triggered at these income levels.`
        ),
    };
  },

  explainer: {
    heading: "Why the marginal rate on a private session can exceed 60%",
    paragraphs: [
      "A hospital consultant with a significant NHS salary and growing private practice income faces three separate deductions on each extra private session: income tax at the marginal rate (40% or 45% once total income is above £50,270 or £125,140 respectively), Class 4 National Insurance on the self-employed private income (6% up to £50,270, 2% above, for 2026/27), and potentially an NHS Pension annual allowance charge if the extra income pushes adjusted income above the taper threshold.",
      "The annual allowance taper is the subtlest and most damaging interaction. The NHS Pension standard annual allowance is £60,000. It tapers downward where BOTH of the following apply: threshold income (broadly all your taxable income) exceeds £200,000, AND adjusted income (threshold income plus your pension input amount for the year, the figure on your annual allowance statement) exceeds £260,000. For every £2 of adjusted income above £260,000, the allowance shrinks by £1, down to a minimum of £10,000. A consultant on £150,000 NHS pay and £70,000 existing private income, with a £35,000 pension input amount, has an adjusted income of £255,000 before any extra session. A single extra session worth £15,000 pushes adjusted income to £270,000, triggering the taper and reducing the annual allowance from £60,000 to £55,000. If total pension input for the year exceeds the tapered allowance, the reduction in allowance is charged to income tax at the marginal rate, which at these income levels is 45%. The session that looked like £15,000 gross nets £5,700.",
      "The personal allowance taper adds a further complication between £100,000 and £125,140 of total income. In that band the personal allowance reduces by £1 for every £2 of additional income, creating an effective income-tax rate close to 60% on income in that range. This tool models that interaction correctly by computing the personal allowance and income-tax bands dynamically rather than using a fixed higher-rate band width. Above £125,140 the effective rate drops back to 45%, but the AA taper and Class 4 NI can still push the combined effective marginal rate materially higher. The example worked through in this tool illustrates a combined effective rate of 62%.",
      "Before declining (or accepting) a private session on marginal-rate grounds, check two things with your accountant. First, whether carry-forward of unused annual allowance from the previous three tax years can eliminate or reduce the AA charge entirely. If you had a lower pension input in prior years, your effective annual allowance for this year may be much higher than £60,000, removing the taper sting. Second, whether your actual pension input amount for the year will breach the tapered allowance. The AA charge only crystallises when pension input (not contributions paid) actually exceeds the allowance. These two factors together can change the net materially, and they are outside what any calculator can model without your personal carry-forward history.",
    ],
  },
};
