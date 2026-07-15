import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// Reuse the 2026/27 band constants from the sister tool to keep the estate consistent.
// Source: docs/ecommerce/rates_ledger.json (verified 2026-07-15)
import {
  PERSONAL_ALLOWANCE,
  BASIC_BAND_CEILING,   // £50,270 — the top of the basic-rate band (taxable income)
  BASIC_RATE,
  HIGHER_RATE,
  CLASS4_LOWER,         // £12,570
  CLASS4_UPPER,         // £50,270
  CLASS4_MAIN,          // 6 %
  CLASS4_UPPER_RATE,    // 2 %
} from "./sole-trader-vs-ltd-sellers";

// Additional rate threshold (taxable income): £125,140 = £12,570 + £112,570
const ADDITIONAL_RATE_THRESHOLD = 125140;
const ADDITIONAL_RATE = 0.45;

// Width of the basic-rate band in taxable-income terms (£50,270 - £12,570 = £37,700)
const BASIC_BAND_WIDTH = BASIC_BAND_CEILING - PERSONAL_ALLOWANCE;

export const TRADING_ALLOWANCE = 1000; // ledger key: trading_allowance

export type SideHustleVerdict =
  | "within_allowance"
  | "loss"
  | "taxable";

export interface SideHustleResult {
  verdict: SideHustleVerdict;
  /** Which deduction the engine chose: "allowance" | "actual" */
  deductionRoute: "allowance" | "actual" | "none";
  deductionUsed: number;
  grossIncome: number;
  costs: number;
  taxableSideProfit: number;
  employmentIncome: number;
  incomeTax: number;
  /** Breakdown: how much of side profit falls in each band */
  taxAtBasic: number;
  taxAtHigher: number;
  taxAtAdditional: number;
  class4Nic: number;
  totalTax: number;
  effectiveRate: number; // as a decimal (0–1)
}

/**
 * Compute side-hustle tax liability.
 *
 * @param grossIncome  Gross side-hustle receipts (before any deduction).
 * @param costs        Actual allowable costs incl. COGS.
 * @param employmentIncome  Other income already taxed (day-job salary etc.).
 * @param includeClass4   Whether to include Class 4 NIC.
 */
export function calcSideHustle(
  grossIncome: number,
  costs: number,
  employmentIncome: number,
  includeClass4 = true
): SideHustleResult {
  const safeGross = Math.max(0, grossIncome);
  const safeCosts = Math.max(0, costs);
  const safeEmp = Math.max(0, employmentIncome);

  // Step 1: trading-allowance gate — gross income £1,000 or less: normally nothing to report.
  if (safeGross <= TRADING_ALLOWANCE) {
    return {
      verdict: "within_allowance",
      deductionRoute: "none",
      deductionUsed: 0,
      grossIncome: safeGross,
      costs: safeCosts,
      taxableSideProfit: 0,
      employmentIncome: safeEmp,
      incomeTax: 0,
      taxAtBasic: 0,
      taxAtHigher: 0,
      taxAtAdditional: 0,
      class4Nic: 0,
      totalTax: 0,
      effectiveRate: 0,
    };
  }

  // Step 2: pick the better of trading allowance (£1,000) vs actual costs.
  let deductionRoute: "allowance" | "actual";
  let deductionUsed: number;
  if (safeCosts > TRADING_ALLOWANCE) {
    deductionRoute = "actual";
    deductionUsed = safeCosts;
  } else {
    deductionRoute = "allowance";
    deductionUsed = TRADING_ALLOWANCE;
  }

  const rawProfit = safeGross - deductionUsed;

  // Step 3: handle loss.
  if (rawProfit <= 0) {
    return {
      verdict: "loss",
      deductionRoute,
      deductionUsed,
      grossIncome: safeGross,
      costs: safeCosts,
      taxableSideProfit: 0,
      employmentIncome: safeEmp,
      incomeTax: 0,
      taxAtBasic: 0,
      taxAtHigher: 0,
      taxAtAdditional: 0,
      class4Nic: 0,
      totalTax: 0,
      effectiveRate: 0,
    };
  }

  const taxableSideProfit = rawProfit;

  // Step 4: income tax on side profit.
  // Personal allowance (£12,570) applies to the combined income picture.
  // When employment < PA, the unused portion shelters the start of side profit.
  //
  // Taxable employment income (after PA applied to employment first):
  const taxableEmp = Math.max(0, safeEmp - PERSONAL_ALLOWANCE);

  // Any unused personal allowance after absorbing employment income:
  const unusedPA = Math.max(0, PERSONAL_ALLOWANCE - safeEmp);

  // Effective taxable side profit after the unused PA is applied:
  const effectiveTaxableSideProfit = Math.max(0, taxableSideProfit - unusedPA);

  // How much of the basic-rate band (0 to £37,700 taxable) is already used by employment:
  const empUsedInBasic = Math.min(taxableEmp, BASIC_BAND_WIDTH);
  const basicRemaining = Math.max(0, BASIC_BAND_WIDTH - empUsedInBasic);

  // How much of the higher-rate band (£37,700 to £112,570 taxable) is used by employment:
  const higherBandWidth = ADDITIONAL_RATE_THRESHOLD - PERSONAL_ALLOWANCE - BASIC_BAND_WIDTH; // = 112,570
  const empInHigher = Math.max(0, taxableEmp - BASIC_BAND_WIDTH);
  const empUsedInHigher = Math.min(empInHigher, higherBandWidth);
  const higherRemaining = Math.max(0, higherBandWidth - empUsedInHigher);

  // Allocate the effective taxable side profit (after any unused PA) across remaining band space:
  const profitInBasic = Math.min(effectiveTaxableSideProfit, basicRemaining);
  const profitAfterBasic = effectiveTaxableSideProfit - profitInBasic;
  const profitInHigher = Math.min(profitAfterBasic, higherRemaining);
  const profitInAdditional = Math.max(0, profitAfterBasic - profitInHigher);

  const taxAtBasic = profitInBasic * BASIC_RATE;
  const taxAtHigher = profitInHigher * HIGHER_RATE;
  const taxAtAdditional = profitInAdditional * ADDITIONAL_RATE;
  const incomeTax = taxAtBasic + taxAtHigher + taxAtAdditional;

  // Step 5: Class 4 NIC on self-employment profits (standalone; not stacked with employment).
  // Class 4 applies to the SE profit itself vs the profit limits.
  let class4Nic = 0;
  if (includeClass4) {
    const c4Main = Math.max(0, Math.min(taxableSideProfit, CLASS4_UPPER) - CLASS4_LOWER) * CLASS4_MAIN;
    const c4Upper = Math.max(0, taxableSideProfit - CLASS4_UPPER) * CLASS4_UPPER_RATE;
    class4Nic = c4Main + c4Upper;
    // ponytail: Class 4 is computed on SE profits alone (not combined with employment).
    // HMRC aggregates NIC across jobs in some edge cases but that's an edge for individual assessment.
  }

  const totalTax = incomeTax + class4Nic;
  const effectiveRate = safeGross > 0 ? totalTax / safeGross : 0;

  return {
    verdict: "taxable",
    deductionRoute,
    deductionUsed,
    grossIncome: safeGross,
    costs: safeCosts,
    taxableSideProfit,
    employmentIncome: safeEmp,
    incomeTax,
    taxAtBasic,
    taxAtHigher,
    taxAtAdditional,
    class4Nic,
    totalTax,
    effectiveRate,
  };
}

export const sideHustleTaxCheckerTool: GenericTool = {
  kind: "generic",
  slug: "side-hustle-tax-checker",
  name: "Side Hustle Tax Checker",
  category: "Making Tax Digital and Self Assessment",
  oneLiner:
    "Check whether your side-hustle income is within the £1,000 trading allowance, and estimate how much income tax and Class 4 NIC you owe on top of your day-job salary. 2026/27 rates.",
  metaTitle: "Side Hustle Tax Calculator UK: Do You Owe Tax? 2026/27",
  metaDescription:
    "Free UK side hustle tax calculator. See if the £1,000 trading allowance covers you, or how much tax your second income owes on top of your job. 2026/27 rates.",
  intro:
    `There is no new side-hustle tax-free limit. The 2024 change was platform <em>reporting</em> (digital-platform operators now share seller data with HMRC), not a new tax threshold. The figure that matters for tax is the long-standing <a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">£1,000 trading allowance</a>: gross side-hustle income of £1,000 or less may not need to be reported. Above that level, your taxable side profit stacks on top of any salaried income, which means the first pound of profit is often taxed at 20 per cent or 40 per cent, not at zero. This checker applies the correct rules so you can see where you stand for the 2026/27 tax year.`,
  ctaLabel: "Talk to an accountant about your side-hustle tax position",
  embedHeight: 600,
  fields: [
    {
      id: "grossIncome",
      label: "Side-hustle gross income (annual)",
      type: "currency",
      default: 5000,
      step: 500,
      min: 0,
      help: "Total receipts from your side activity before any deductions. Use your gross income, not the net payout after platform fees (platform fees are a cost you deduct separately).",
    },
    {
      id: "costs",
      label: "Side-hustle costs (annual)",
      type: "currency",
      default: 500,
      step: 100,
      min: 0,
      help: "Allowable costs including cost of goods sold, postage, packaging and other direct costs. The calculator automatically picks the better of your actual costs or the £1,000 trading allowance.",
    },
    {
      id: "employmentIncome",
      label: "Employment or other taxed income (annual)",
      type: "currency",
      default: 35000,
      step: 1000,
      min: 0,
      help: "Your day-job salary or other income already being taxed through PAYE. This determines which tax band your side profit falls into. If you have no other income, enter 0.",
    },
    {
      id: "includeClass4",
      label: "Include Class 4 National Insurance",
      type: "toggle",
      default: true,
      help: "Class 4 NIC applies to self-employment profits above £12,570. Toggle off to see the income tax estimate alone.",
    },
  ],
  compute: (v) => {
    const r = calcSideHustle(
      Math.max(0, Number(v.grossIncome)),
      Math.max(0, Number(v.costs)),
      Math.max(0, Number(v.employmentIncome)),
      Boolean(v.includeClass4 ?? true)
    );

    if (r.verdict === "within_allowance") {
      return {
        headline: {
          label: "Within the £1,000 trading allowance",
          value: "You normally have nothing to report",
          sub: "Gross income £1,000 or less: the trading allowance means you may not need to register for Self Assessment or pay tax on this income.",
          tone: "good" as const,
        },
        rows: [
          { label: "Gross side-hustle income", value: gbp(r.grossIncome) },
          { label: "Trading allowance (2026/27)", value: gbp(TRADING_ALLOWANCE) },
          { label: "Estimated income tax", value: "£0" },
          { label: "Estimated Class 4 NIC", value: "£0" },
        ],
        note: `The £1,000 trading allowance means gross trading income of £1,000 or less may not need to be reported. HMRC's wording is "may not be required": if you receive other income or are already registered for Self Assessment, you may still need to declare it. See <a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">gov.uk trading allowance</a>.`,
      };
    }

    if (r.verdict === "loss") {
      return {
        headline: {
          label: "A loss this year",
          value: "No income tax on this side hustle",
          sub: `Your ${r.deductionRoute === "actual" ? "actual costs" : "£1,000 trading allowance"} exceed your income, so there is no taxable profit.`,
          tone: "default" as const,
        },
        rows: [
          { label: "Gross side-hustle income", value: gbp(r.grossIncome) },
          { label: r.deductionRoute === "actual" ? "Actual costs deducted" : "Trading allowance deducted", value: gbp(r.deductionUsed) },
          { label: "Taxable side profit", value: "£0 (loss)" },
          { label: "Estimated income tax", value: "£0" },
          { label: "Estimated Class 4 NIC", value: "£0" },
        ],
        note: "A trading loss may be carried forward against future profits from the same trade. Loss relief rules are complex, so speak to an accountant before assuming a loss can offset other income.",
      };
    }

    // taxable verdict
    const deductionLabel =
      r.deductionRoute === "actual"
        ? `Actual costs (${gbp(r.deductionUsed)}, better than the £1,000 allowance)`
        : `Trading allowance (£1,000, better than actual costs of ${gbp(r.costs)})`;

    const marginalNote =
      r.taxAtAdditional > 0
        ? "Some of your side profit falls in the 45% additional rate."
        : r.taxAtHigher > 0 && r.taxAtBasic > 0
        ? "Your side profit straddles the basic and higher rate. The first portion is taxed at 20% and the remainder at 40%."
        : r.taxAtHigher > 0
        ? "Your employment income already uses the basic-rate band. Every pound of side profit is taxed at 40%."
        : "Your side profit is fully within the basic-rate band at 20%.";

    const rows = [
      { label: "Gross side-hustle income", value: gbp(r.grossIncome) },
      { label: "Deduction used", value: deductionLabel },
      { label: "Taxable side profit", value: gbp(r.taxableSideProfit), strong: true },
      { label: "Employment income (for band stacking)", value: gbp(r.employmentIncome) },
      ...(r.taxAtBasic > 0 ? [{ label: "Income tax at 20% (basic rate)", value: gbp(r.taxAtBasic) }] : []),
      ...(r.taxAtHigher > 0 ? [{ label: "Income tax at 40% (higher rate)", value: gbp(r.taxAtHigher) }] : []),
      ...(r.taxAtAdditional > 0 ? [{ label: "Income tax at 45% (additional rate)", value: gbp(r.taxAtAdditional) }] : []),
      { label: "Total income tax on side profit", value: gbp(r.incomeTax), strong: true },
      { label: "Class 4 NIC on side profit", value: gbp(r.class4Nic) },
      { label: "Total estimated tax", value: gbp(r.totalTax), strong: true },
      { label: "Effective rate on gross income", value: `${(r.effectiveRate * 100).toFixed(1)}%` },
    ];

    return {
      headline: {
        label: "You likely owe tax on this side hustle",
        value: `Estimated total tax: ${gbp(r.totalTax)}`,
        sub: marginalNote,
        tone: "default" as const,
      },
      rows,
      note: `This is an estimate only. It assumes you are a UK resident sole trader in 2026/27 and does not account for pension contributions, gift aid, or personal-allowance tapering above £100,000. Class 4 NIC is on the side-hustle profit alone. If you owe tax, you need to register for <a href="https://www.gov.uk/register-for-self-assessment">Self Assessment</a> by 5 October after the end of the tax year in which the income arose. If a platform-reporting letter prompted this check, see our <a href="/services/hmrc-letter-online-sales">HMRC letter service</a>. If your gross income is approaching £90,000, check the <a href="/calculators/vat-threshold-tracker">VAT threshold tracker</a>.`,
    };
  },
  explainer: {
    heading: "How the side-hustle tax estimate works",
    paragraphs: [
      `The checker runs three steps. First, it checks whether your gross side-hustle income is £1,000 or less. If it is, the <a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">trading allowance</a> means you may not need to file a return or pay any tax.`,
      `If your income exceeds £1,000, the engine compares your actual allowable costs with the £1,000 trading allowance and uses whichever produces the lower taxable profit. Goods sellers with real stock costs often do better using actual costs. The two are mutually exclusive: you cannot deduct the allowance and your costs in the same year.`,
      `Your taxable side profit then stacks on top of your employment income to determine the correct tax band. This is the key point: if your day-job salary already fills some or all of the basic-rate band (£12,571 to £50,270 of taxable income), your side profit is pushed into the higher rate at 40 per cent. It is not automatically taxed at 20 per cent simply because the profit is small. Class 4 NIC at <a href="https://www.gov.uk/self-employed-national-insurance-rates">6 per cent</a> applies to self-employment profits above £12,570, rising to 2 per cent above £50,270.`,
      `This tool covers sole-trader income only. If you are considering a limited company, the <a href="/calculators/sole-trader-vs-ltd-sellers">sole-trader vs limited-company calculator</a> compares both structures at your profit level.`,
    ],
  },
  faqs: [
    {
      question: "Was there a new side-hustle tax-free limit introduced in 2024?",
      answer: `No. What changed in 2024 was <em>platform reporting</em>: digital platforms (eBay, Vinted, Etsy and others) are now required to share seller data with HMRC annually. This is a reporting obligation on the platforms, not a new tax limit on sellers. The tax-free figure for trading income remains the long-standing £1,000 <a href="https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income">trading allowance</a>. See our guide to <a href="/blog/platform-reporting-and-hmrc-letters/platform-reporting-rules">platform reporting rules</a> and the <a href="/blog/making-tax-digital-and-self-assessment/trading-allowance-online-sellers">trading allowance explainer</a> for the full picture.`,
    },
    {
      question: "Does the £1,000 trading allowance apply on top of the personal allowance?",
      answer: `The trading allowance and the personal allowance are separate and work differently. The trading allowance (£1,000) is a deduction against gross trading income at the bottom of the calculation: if your gross income is £1,000 or less, you may not need to report it at all. The personal allowance (£12,570 in 2026/27) is then applied to taxable income. However, if you have employment income, your personal allowance is usually already used against your salary. That means your side-hustle profit is taxed from the first pound at your marginal rate, not sheltered by a second personal allowance.`,
    },
    {
      question: "Do I have to pay tax on my side hustle if I earn under £12,570?",
      answer: `It depends on whether you have other income. If you have no other income and your side-hustle profit (after the trading allowance or actual costs) is below £12,570, no income tax is due. However, Class 4 NIC applies to profits above £12,570, so at very low profit levels NIC is also zero. If you have a day job, your personal allowance is already used by your salary: the first pound of taxable side profit is taxed at your marginal rate (20 per cent if you are in the basic band, 40 per cent in the higher band).`,
    },
    {
      question: "Does selling personal belongings online count as a side hustle?",
      answer: `Not usually. Selling personal possessions you already own (second-hand clothes, unwanted gifts) is generally not trading and falls outside income tax. What matters is whether you are trading: buying goods to resell, making items to sell or carrying on a commercial activity with a view to profit. HMRC's badges of trade (set out in their Business Income Manual from BIM20205 onward) guide this judgement. There is no single sales count or income threshold that defines trading. If you are genuinely just decluttering, you are unlikely to owe tax. If you are sourcing and reselling regularly for profit, you almost certainly are trading.`,
    },
    {
      question: "What is the Self Assessment registration deadline for side-hustle income?",
      answer: `You must notify HMRC by <strong>5 October</strong> following the end of the tax year in which the income arose. For example, for income earned in the 2026/27 tax year (ending 5 April 2027), the registration deadline is 5 October 2027. Registering late can result in penalties. See <a href="https://www.gov.uk/register-for-self-assessment">gov.uk Self Assessment registration</a>.`,
    },
    {
      question: "When do I need to think about VAT on my side hustle?",
      answer: `VAT registration is required once your gross taxable turnover exceeds the <a href="https://www.gov.uk/vat-registration">£90,000 VAT threshold</a> in a rolling 12-month period. The threshold is based on gross sales, not profit or net payout. If you are approaching that level, use the <a href="/calculators/vat-threshold-tracker">VAT threshold tracker</a> to monitor your position. This income tax checker does not cover VAT.`,
    },
  ],
};
