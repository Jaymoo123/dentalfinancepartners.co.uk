/**
 * Capital Gains Tax PREMIUM tool config — the flagship on-page interactive tool
 * for the Capital Gains category.
 *
 * Headline value: a full CGT calculation on selling a buy-to-let or second
 * property — the gain after purchase price, buying/selling costs AND capital
 * improvements, the £3,000 annual exempt amount, Private Residence Relief where
 * the property was once a main home (with the always-qualifying final 9 months),
 * and the 18%/24% split across the unused basic-rate band.
 *
 * Scenario comparison that adds real value: SOLE ownership versus JOINT 50/50
 * ownership with a spouse or civil partner. Joint ownership gives the household
 * two annual exemptions and two basic-rate bands to soak up the gain, so the CGT
 * is often materially lower. This is a genuine, much-used planning lever (a
 * no-gain/no-loss spousal transfer before sale, s.58 TCGA 1992), grounded in the
 * same math, so the comparison is honest rather than decorative.
 *
 * All math comes from lib/cgtPlanner.ts, which itself delegates the rates, the
 * annual exemption and the band split to computeCgt() in lib/cgt.ts — the SAME
 * engine the existing Capital Gains Tax Calculator uses. The tool, the Excel
 * model and the live calculator therefore cannot disagree.
 */
import type {
  PremiumToolConfig,
  PremiumComputeContext,
  ScenarioResult,
} from "../types";
import { computeCgtPlanner, gbp, type CgtPlannerInputs } from "@/lib/cgtPlanner";

const OWNERSHIP_OPTIONS = [
  { value: "sole", label: "You alone" },
  { value: "joint", label: "Jointly 50/50 with spouse/partner" },
];

/** Build the planner inputs for one OWNER's share of the property. */
function shareInputs(
  v: PremiumComputeContext["values"],
  share: number,
): CgtPlannerInputs {
  const wasMainResidence = Boolean(v.wasMainResidence);
  return {
    salePrice: (Number(v.salePrice) || 0) * share,
    purchasePrice: (Number(v.purchasePrice) || 0) * share,
    buyingSellingCosts: (Number(v.buyingSellingCosts) || 0) * share,
    improvements: (Number(v.improvements) || 0) * share,
    // For a joint owner the relevant band is filled by THAT person's income; we
    // assume the second owner has the same other income unless modelled apart.
    // A 50/50 split keeps the model honest without over-claiming precision.
    otherIncome: share === 1 ? Number(v.otherIncome) || 0 : Number(v.spouseIncome) || 0,
    aeaUsed: Boolean(v.aeaUsed),
    wasMainResidence,
    totalMonthsOwned: wasMainResidence ? Number(v.totalMonthsOwned) || 0 : 0,
    monthsAsMainResidence: wasMainResidence ? Number(v.monthsAsMainResidence) || 0 : 0,
  };
}

function scenarioRows(
  res: ReturnType<typeof computeCgtPlanner>,
  wasMainResidence: boolean,
  owners: number,
): { headline: ScenarioResult["headline"]; rows: ScenarioResult["rows"] } {
  const rows: NonNullable<ScenarioResult["rows"]> = [
    { label: "Sale proceeds (your share)", value: gbp(resProceeds(res)) },
    { label: "Less total allowable costs", value: `- ${gbp(res.totalCosts)}` },
    { label: "Gain before relief", value: gbp(res.grossGain), strong: true },
  ];
  if (wasMainResidence && res.prr > 0) {
    rows.push({ label: `Private Residence Relief (${res.prrMonths} qualifying months)`, value: `- ${gbp(res.prr)}` });
    rows.push({ label: "Gain after PRR", value: gbp(res.gainAfterPrr) });
  }
  rows.push({ label: `Annual exempt amount${owners > 1 ? " (×" + owners + ")" : ""}`, value: res.aea > 0 ? `- ${gbp(res.aea * owners)}` : gbp(0) });
  rows.push({ label: "Taxable gain", value: gbp(res.taxableGain * owners) });
  if (res.atBasic > 0) rows.push({ label: "Taxed at 18%", value: gbp(res.taxAtBasic * owners) });
  if (res.atHigher > 0) rows.push({ label: "Taxed at 24%", value: gbp(res.taxAtHigher * owners) });
  rows.push({ label: "Capital Gains Tax due", value: gbp(res.tax * owners), strong: true });
  return {
    headline: { label: "Capital Gains Tax due", value: gbp(res.tax * owners) },
    rows,
  };
}

/** Reconstruct this share's proceeds for display (proceeds = costs + gain). */
function resProceeds(res: ReturnType<typeof computeCgtPlanner>): number {
  return res.totalCosts + res.grossGain;
}

function compute(ctx: PremiumComputeContext) {
  const v = ctx.values;
  const wasMainResidence = Boolean(v.wasMainResidence);

  // Sole ownership: the whole property is one person's.
  const soleRes = computeCgtPlanner(shareInputs(v, 1));

  // Joint 50/50: each spouse owns half, each with their own AEA + bands; the
  // household total is twice one half-share's tax.
  const halfRes = computeCgtPlanner(shareInputs(v, 0.5));
  const jointTax = halfRes.tax * 2;

  const soleScenario = scenarioRows(soleRes, wasMainResidence, 1);
  const jointScenario = scenarioRows(halfRes, wasMainResidence, 2);

  const jointSaves = soleRes.tax - jointTax;
  const jointIsBetter = jointSaves > 0;

  const scenarioResults: ScenarioResult[] = [
    {
      id: "sole",
      label: "Owned by you alone",
      best: !jointIsBetter,
      headline: soleScenario.headline,
      rows: soleScenario.rows,
    },
    {
      id: "joint",
      label: "Owned 50/50 with spouse/partner",
      best: jointIsBetter,
      headline: { label: "Capital Gains Tax due (household)", value: gbp(jointTax) },
      rows: jointScenario.rows,
    },
  ];

  const sixtyDay = soleRes.sixtyDayReportingDue;

  const headlineNote = jointIsBetter
    ? `Holding the property 50/50 with a spouse or civil partner could save the household around ${gbp(jointSaves)} of CGT on this sale, by using two annual exemptions and two basic-rate bands.`
    : "On these figures, joint ownership does not reduce the CGT (the gain is small enough, or both owners are already higher-rate, so the second allowance and band make little difference).";

  const prrNote = wasMainResidence
    ? "Private Residence Relief is apportioned straight-line over your ownership, plus the final 9 months. Letting Relief (now only where you shared the home with the tenant) and other deemed-occupation periods are NOT added here. "
    : "";

  return {
    headline: {
      label: "Capital Gains Tax on this sale",
      value: gbp(soleRes.tax),
      sub: `Effective rate ${soleRes.effectiveRate.toFixed(1)}% of the gain · owned by you alone`,
      tone: (soleRes.tax > 0 ? "warn" : "good") as "warn" | "good",
    },
    scenarioResults,
    breakdown: [
      { label: "Net cash after CGT (sole owner)", value: gbp(soleRes.netAfterTax), strong: true },
      { label: "60-day report-and-pay needed?", value: sixtyDay ? "Yes — within 60 days of completion" : "No CGT due, so no 60-day return" },
    ],
    chart: {
      data: [
        {
          name: "CGT due",
          sole: soleRes.tax,
          joint: jointTax,
        },
        {
          name: "Net cash after CGT",
          sole: soleRes.netAfterTax,
          joint: soleRes.netAfterTax + jointSaves,
        },
      ],
    },
    note:
      headlineNote +
      " " +
      prrNote +
      "Joint figures assume an equal beneficial split and that the gain divides equally; a Form 17 election and a declaration of trust are needed to depart from the default 50/50 split on jointly held property. " +
      "Spousal transfers before sale are no-gain/no-loss (s.58 TCGA 1992) but must be genuine and completed before exchange. These are estimates from the figures entered, not advice for your situation.",
  };
}

export const capitalGainsPremiumTool: PremiumToolConfig = {
  id: "capital-gains-premium",
  topic: "capital-gains",
  title: "Capital Gains Tax on property: sole vs joint ownership",
  intro:
    "Work out the CGT on selling a buy-to-let or second home — the gain after costs and improvements, your £3,000 allowance, Private Residence Relief for a former home, and the 18%/24% split — then see how holding it jointly with a spouse changes the bill.",
  // All inputs are shown in order; PremiumCalculator caps the inputs panel height
  // and scrolls it on the compact (blog) layout, so a long list never runs tall.
  fields: [
    {
      id: "salePrice",
      label: "Sale price",
      type: "currency",
      default: 320000,
      min: 0,
      max: 1500000,
      step: 5000,
      help: "Completion proceeds for the whole property.",
    },
    {
      id: "purchasePrice",
      label: "Original purchase price",
      type: "currency",
      default: 200000,
      min: 0,
      max: 1500000,
      step: 5000,
    },
    {
      id: "otherIncome",
      label: "Your other taxable income",
      type: "currency",
      default: 50000,
      min: 0,
      max: 200000,
      step: 1000,
      help: "Salary, rental profit etc for the year, before this gain. Sets how much of your share is taxed at 18% vs 24%.",
    },
    {
      id: "buyingSellingCosts",
      label: "Buying & selling costs",
      type: "currency",
      default: 9000,
      min: 0,
      max: 50000,
      step: 1000,      help: "Legal and estate-agent fees, plus the SDLT you paid when you bought.",
    },
    {
      id: "improvements",
      label: "Capital improvements",
      type: "currency",
      default: 8000,
      min: 0,
      max: 100000,
      step: 1000,      help: "Money spent enhancing the property (an extension, a new bathroom where there was none). Repairs and maintenance do NOT count.",
    },
    {
      id: "spouseIncome",
      label: "Spouse / partner's other income",
      type: "currency",
      default: 20000,
      min: 0,
      max: 200000,
      step: 1000,      help: "Only used by the joint-ownership comparison, for their half of the gain.",
    },
    {
      id: "aeaUsed",
      label: "I've already used my £3,000 CGT allowance this year",
      type: "toggle",
      default: false,    },
    {
      id: "wasMainResidence",
      label: "Was this property ever your only/main home?",
      type: "toggle",
      default: false,      help: "Turns on Private Residence Relief. Leave off for a pure investment / second property.",
    },
    {
      id: "totalMonthsOwned",
      label: "Total months you owned it",
      type: "number",
      default: 180,
      min: 0,
      max: 480,
      step: 1,
      suffix: "months",      help: "Only used when the property was once your main home (e.g. 180 = 15 years).",
    },
    {
      id: "monthsAsMainResidence",
      label: "Months you lived in it as your main home",
      type: "number",
      default: 60,
      min: 0,
      max: 480,
      step: 1,
      suffix: "months",      help: "The final 9 months always qualify on top, so you don't add them here.",
    },
  ],
  // Both scenarios (sole vs joint) are always computed and shown side by side,
  // so no scenario tab toggle is needed; a switcher would be dead UI.
  compute,
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    valueAxisLabel: "£",
    series: [
      { dataKey: "sole", label: "Owned alone", color: "#f59e0b" },
      { dataKey: "joint", label: "Owned 50/50", color: "#10b981" },
    ],
  },
  explainer: {
    heading: "How this Capital Gains Tax calculation works",
    paragraphs: [
      "When you sell a residential property that is not your main home, the gain is liable to Capital Gains Tax. The gain is your sale proceeds less the original purchase price, less buying and selling costs (legal and agent fees, the Stamp Duty you paid) and the cost of any capital improvements. Ordinary repairs and maintenance are not deductible against the gain because they are already revenue costs against your rental income.",
      "Each individual has a £3,000 annual exempt amount for 2026/27. Above that, residential gains are taxed at 18% to the extent they fall within your unused basic-rate band and 24% above it, so your other income for the year matters. If the property was ever your only or main home, Private Residence Relief removes the part of the gain relating to the period you lived there, plus the final 9 months of ownership, on a straight-line basis. Letting Relief is now only available where you shared the home with your tenant, so it is not assumed here.",
      "The sole-versus-joint comparison shows a genuine planning lever: a property held jointly with a spouse or civil partner uses two annual exemptions and two basic-rate bands, which often cuts the household CGT. A no-gain/no-loss transfer of a share to a spouse before sale (s.58 TCGA 1992) is how this is usually achieved, but it must be a real transfer completed before exchange, with a declaration of trust and, on jointly held property, a Form 17 election to depart from the default 50/50 income split. Where any CGT is due, you must report and pay it within 60 days of completion through HMRC's CGT on UK property service.",
    ],
  },
};
