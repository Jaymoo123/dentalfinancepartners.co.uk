import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import {
  calcAaTaper,
  STANDARD_AA,
  MIN_TAPERED_AA,
} from "@/lib/tools/compute/nhs-pension-aa-taper";

/**
 * PREMIUM roster tool 6: nhs-pension-aa-taper.
 * Built as a GenericTool config per the roster pattern ("Same as solicitors:
 * GenericTool configs, builders don't touch registry"). Integrator wires the
 * registry entry after review.
 */
export const nhsPensionAaTaperTool: GenericTool = {
  kind: "generic",
  slug: "nhs-pension-aa-taper",
  name: "NHS Pension Annual Allowance Taper Calculator for Dentists",
  category: "NHS Pension",
  oneLiner:
    "Your tapered annual allowance and projected AA charge from practice profit share, superannuable earnings and 2015-scheme pension growth.",
  embedHeight: 640,
  metaTitle: "NHS Pension Annual Allowance Taper Calculator | Dentists 2026/27",
  metaDescription:
    "Work out your tapered annual allowance and projected NHS Pension AA charge for 2026/27 from practice profit share, superannuable earnings and pension input amount. Includes carry-forward and scheme pays.",
  intro:
    "Enter your practice profit share or associate fee income, other taxable income and NHS Pension contributions. The calculator works out your threshold and adjusted income, applies the taper (annual allowance reduced from £60,000 towards £10,000 once adjusted income passes £260,000), and projects any annual allowance charge at your marginal rate. If you do not have your pension input amount to hand, it will estimate one from your superannuable earnings, clearly labelled as an estimate.",
  ctaLabel: "Calculate my tapered allowance",
  fields: [
    {
      id: "practiceProfit",
      label: "Practice profit share or associate fee income (taxable)",
      type: "currency",
      default: 130000,
      min: 0,
      max: 1000000,
      step: 5000,
      help: "Your taxable profit for the year: NHS and private, before personal tax.",
    },
    {
      id: "otherIncome",
      label: "Other taxable income",
      type: "currency",
      default: 10000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Rental income, dividends, savings interest, spouse-unrelated income in your name.",
    },
    {
      id: "employeeConts",
      label: "NHS Pension employee contributions this year",
      type: "currency",
      default: 14000,
      min: 0,
      max: 100000,
      step: 500,
      help: "Your own tiered contributions (up to 12.5% of pensionable pay). Deducted before tax, so they reduce threshold income.",
    },
    {
      id: "pia",
      label: "2015-scheme pension input amount (from TRS/NHSBSA)",
      type: "currency",
      default: 0,
      min: 0,
      max: 300000,
      step: 1000,
      help: "The pension input amount on your Total Reward Statement or NHSBSA pension savings statement. Leave at 0 to estimate it from your superannuable earnings instead.",
    },
    {
      id: "superannuable",
      label: "Superannuable (pensionable) earnings this year",
      type: "currency",
      default: 120000,
      min: 0,
      max: 500000,
      step: 5000,
      help: "Only used when the pension input amount above is 0. For associates this is your net pensionable earnings; for principals, your certified pensionable profit.",
    },
    {
      id: "openingPension",
      label: "2015-scheme annual pension already built up",
      type: "currency",
      default: 0,
      min: 0,
      max: 100000,
      step: 500,
      advanced: true,
      help: "Your accrued 2015-scheme pension per year at the start of the year (from your TRS). Only used for the estimate: in-service revaluation runs at CPI + 1.5%, and the 1.5% above CPI counts towards pension growth.",
    },
    {
      id: "carryForward",
      label: "Unused annual allowance carried forward (3 prior years)",
      type: "currency",
      default: 0,
      min: 0,
      max: 180000,
      step: 1000,
      advanced: true,
      help: "Total unused allowance from the three previous tax years, earliest first. Check prior-year pension savings statements before relying on this.",
    },
  ],
  compute(values) {
    const r = calcAaTaper({
      practiceProfit: Number(values.practiceProfit) || 0,
      otherIncome: Number(values.otherIncome) || 0,
      employeeConts: Number(values.employeeConts) || 0,
      pia: Number(values.pia) || 0,
      superannuable: Number(values.superannuable) || 0,
      openingPension: Number(values.openingPension) || 0,
      carryForward: Number(values.carryForward) || 0,
    });

    const piaLabel = r.piaEstimated
      ? "Pension input amount (ESTIMATE from superannuable pay)"
      : "Pension input amount (your statement figure)";

    return {
      headline:
        r.excess > 0
          ? {
              label: "Projected annual allowance charge",
              value: gbp(r.charge),
              sub: `on ${gbp(r.excess)} of pension growth above your ${gbp(r.taperedAa)} allowance, at an effective ${(r.effectiveRate * 100).toFixed(0)}% marginal rate`,
              tone: "warn",
            }
          : {
              label: "Projected annual allowance charge",
              value: "£0",
              sub: `pension growth of ${gbp(r.piaUsed)} sits within your ${gbp(r.taperedAa)} allowance${r.carryForwardUsed > 0 ? " plus carry-forward" : ""}`,
              tone: "good",
            },
      rows: [
        { label: "Threshold income", value: gbp(r.thresholdIncome) },
        { label: piaLabel, value: gbp(r.piaUsed) },
        { label: "Adjusted income", value: gbp(r.adjustedIncome) },
        {
          label: "Your annual allowance",
          value: gbp(r.taperedAa),
          strong: true,
        },
        ...(r.taperApplies
          ? [
              {
                label: "Taper applied",
                value: `£1 reduction per £2 of adjusted income above £260,000 (minimum ${gbp(MIN_TAPERED_AA)})`,
              },
            ]
          : [
              {
                label: "Taper applied",
                value:
                  r.thresholdIncome <= 200000
                    ? "No: threshold income is £200,000 or below"
                    : "No: adjusted income is £260,000 or below",
              },
            ]),
        ...(r.carryForwardUsed > 0
          ? [{ label: "Carry-forward used", value: gbp(r.carryForwardUsed) }]
          : []),
        { label: "Excess over allowance", value: gbp(r.excess) },
        {
          label: "Scheme pays",
          value: r.mandatorySchemePays
            ? `Mandatory scheme pays available (charge above £2,000 and NHS pension growth above ${gbp(STANDARD_AA)})`
            : r.charge > 0
              ? "Mandatory scheme pays conditions not met; voluntary scheme pays may still be available (taper cases)"
              : "Not needed",
        },
      ],
      note: r.piaEstimated
        ? "The pension input amount shown is an ESTIMATE (1/54th of superannuable pay, valued at 16x, plus the 1.5%-above-CPI revaluation on accrued pension). The real figure on your Total Reward Statement or NHSBSA pension savings statement can differ materially, especially in high-CPI years or with 1995-section legacy membership. Request the statement before acting. Charge assumes rUK income tax bands; Scottish rates differ."
        : "Charge is projected at rUK income tax rates on the excess as top-slice income. Scottish rates differ. Carry-forward should be verified against prior-year pension savings statements. These are estimates, not advice.",
    };
  },
  explainer: {
    heading: "How the taper works for dentists, with worked examples",
    paragraphs: [
      "The annual allowance is the amount your pension savings can grow in a tax year before a tax charge applies. For 2026/27 the standard allowance is £60,000. The taper switches on only when BOTH tests are failed: threshold income above £200,000 AND adjusted income above £260,000. For a dentist, threshold income is essentially your total taxable income (practice profit share or associate fees plus other income) minus your own NHS Pension contributions. Adjusted income is threshold income plus your pension input amount, the deemed value of one year's pension growth. Once adjusted income passes £260,000, the allowance falls by £1 for every £2 of excess, down to a floor of £10,000 at adjusted income of £360,000.",
      "The pension input amount is the awkward number. In the 2015 CARE scheme you earn 1/54th of pensionable pay as annual pension each year, and the growth is valued at 16 times for the allowance test. If you do not have your figure, the calculator estimates it as 16 x (superannuable earnings / 54), plus 16 x 1.5% of your accrued pension, because in-service revaluation runs at CPI + 1.5% while the allowance test only discounts CPI. This is an approximation: the exact CPI figures, part-year membership, added benefits and any 1995-section legacy input all move the real number. Always confirm against your Total Reward Statement or an NHSBSA pension savings statement before paying or reporting a charge.",
      "Worked example 1, an associate. Fee income £115,000, other income £5,000, employee contributions £13,750, superannuable earnings £110,000, accrued 2015 pension £20,000, no statement figure. Threshold income is £115,000 + £5,000 - £13,750 = £106,250, below £200,000, so no taper and the full £60,000 allowance applies. The estimated pension input amount is 16 x (£110,000 / 54) = £32,593, plus 16 x 1.5% x £20,000 = £4,800, giving £37,393. That is comfortably inside £60,000, so the projected charge is £0.",
      "Worked example 2, a principal. Practice profit share £230,000, other income £20,000, employee contributions £26,000, and a statement pension input amount of £70,000. Threshold income is £230,000 + £20,000 - £26,000 = £224,000, above £200,000. Adjusted income is £224,000 + £70,000 = £294,000, which is £34,000 over the £260,000 limit, so the allowance falls by £17,000 to £43,000. With £5,000 of carry-forward, the excess is £70,000 - £43,000 - £5,000 = £22,000. At £224,000 of income every pound of excess sits in the 45% band, so the projected charge is £9,900. Because the charge exceeds £2,000 and the NHS pension input amount (£70,000) exceeds the standard £60,000 allowance, mandatory scheme pays is available: the scheme pays the charge now and reduces the pension later, instead of a cash payment through self assessment.",
      "What this calculator does not do: it does not model salary sacrifice add-backs or lump-sum death benefits in threshold income, exact scheme-year CPI, Scottish income tax bands, or 1995/2008 legacy-section input amounts (including McCloud remedy adjustments). If any of those apply, treat the output as a first pass and get the NHSBSA statement plus specialist advice before the 31 January self assessment deadline or the scheme pays election deadline (31 July following the year after the tax year).",
    ],
  },
  faqs: [
    {
      question: "What counts as threshold income for a dentist?",
      answer:
        "Broadly, your total taxable income for the year: practice profit share or associate fee income, plus rental, dividend and other income, minus your own NHS Pension contributions (they are deducted before tax under the net pay arrangement). If threshold income is £200,000 or below, the taper cannot apply regardless of how large your pension growth is, and you keep the full £60,000 allowance.",
    },
    {
      question: "Where do I find my actual pension input amount?",
      answer:
        "On your Total Reward Statement (TRS) or, if your growth exceeded the allowance, on the pension savings statement NHSBSA must send by 6 October following the tax year. If you have not received one you can request it from NHSBSA. Do not rely on an estimate to pay or report a charge: the statement figure reflects the exact CPI uplift, your actual membership and any legacy-section input.",
    },
    {
      question: "How does the CARE estimate in this calculator work?",
      answer:
        "The 2015 scheme credits 1/54th of pensionable pay as new annual pension each year, and the annual allowance test values pension growth at 16 times the increase. In-service revaluation is CPI + 1.5%, while the test uplifts your opening pension by CPI only, so roughly 1.5% of your accrued pension also counts as growth. The estimate is 16 x (superannuable pay / 54 + 1.5% x accrued pension). It is labelled as an estimate in the results because scheme-year timing, exact CPI and legacy membership can move the true figure by thousands of pounds either way.",
    },
    {
      question: "Can the NHS scheme pay the charge for me?",
      answer:
        "Yes. Mandatory scheme pays applies where your charge exceeds £2,000 and your NHS pension input amount alone exceeds the standard £60,000 allowance: the scheme pays HMRC and your pension is reduced actuarially. Where the charge arises only because of the taper, mandatory scheme pays does not strictly apply but NHSBSA operates voluntary scheme pays for those cases. You still report the charge on your self assessment return, and the scheme pays election has its own deadline (31 July in the second year after the tax year for mandatory elections).",
    },
    {
      question: "How does carry-forward work?",
      answer:
        "You can add unused annual allowance from the three previous tax years, earliest year first, provided you were a pension scheme member in those years. The unused amount in a tapered year is the tapered allowance minus that year's pension input amount, so high earners often have less carry-forward than they expect. Check each prior year's pension savings statement rather than assuming three full allowances.",
    },
    {
      question: "Does NHS versus private income mix change the calculation?",
      answer:
        "Only through the inputs. All taxable income, NHS and private, counts towards threshold and adjusted income, but only superannuable NHS earnings build 2015-scheme pension and drive the pension input amount. A dentist shifting towards private work can see taxable income rise while pension growth falls, which changes both sides of the taper test. Personal pension contributions for private earnings have their own input amounts and would need adding to the statement figure.",
    },
  ],
};
