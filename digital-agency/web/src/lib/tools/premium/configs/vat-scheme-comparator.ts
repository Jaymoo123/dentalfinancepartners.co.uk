/**
 * Tool 3: VAT scheme comparator (standard vs flat rate) (premium).
 *
 * toolId: vat-scheme-comparator-premium
 * topic: compliance-vat
 *
 * Composes calcVatScheme from compute/vat-scheme.ts. NO maths forked.
 *
 * RATES (HP §6):
 *   Standard VAT: 20% on turnover; reclaim input VAT; net = VAT collected - inputs.
 *   Flat Rate marketing: 12.5% of VAT-inclusive turnover.
 *   Flat Rate LCT:       16.5% (goods < 2% of VAT-inclusive turnover or < £1,000/yr).
 *   Registration: £90,000 / deregistration £88,000 (HP §6).
 *   MTD for VAT: mandatory since April 2022.
 *
 * GOLDEN (executed 2026-07-06, defaults turnover=180000, vatInputs=8000, goodsSpend=500):
 *   vatCollected=36000, grossInclusive=216000, standardNet=28000
 *   lctApplies=true, flatRate=0.165, flatPayment=35640, flatKeep=360
 *   bestScheme="Standard", saving=7640
 *
 * High-goods case (vatInputs=3000, goodsSpend=10000):
 *   lctApplies=false, flatRate=0.125, flatPayment=27000, bestScheme="Flat Rate"
 */
import type { PremiumToolConfig, PremiumResult } from "../types";
import { calcVatScheme } from "@/lib/tools/compute/vat-scheme";

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number): string {
  return (n * 100).toFixed(1) + "%";
}

export const vatSchemeComparatorConfig: PremiumToolConfig = {
  id: "vat-scheme-comparator-premium",
  topic: "compliance-vat",
  title: "VAT scheme comparator: standard vs flat rate (2026/27)",
  intro: "Compare what you actually pay to HMRC under the standard scheme versus the Flat Rate Scheme, and see which is cheaper on your numbers. Most agencies are limited-cost traders, which means the flat rate is 16.5% and usually a worse deal.",
  fields: [
    {
      id: "turnover",
      label: "Annual turnover (ex-VAT)",
      type: "currency",
      default: 180000,
      min: 0,
      max: 5000000,
      step: 5000,
    },
    {
      id: "vatInputs",
      label: "Input VAT you could reclaim (standard scheme)",
      type: "currency",
      default: 8000,
      min: 0,
      max: 500000,
      step: 500,
      help: "Input VAT you could reclaim on the standard scheme: VAT on software, equipment, professional fees and other business purchases.",
    },
    {
      id: "goodsSpend",
      label: "Annual spend on goods (not services)",
      type: "currency",
      default: 500,
      min: 0,
      max: 100000,
      step: 100,
      help: "Annual spend on goods, not services. The limited-cost-trader test is goods under 2% of VAT-inclusive turnover or under £1,000 a year (HP §6). Most agencies spend very little on goods.",
    },
  ],
  compute({ values }): PremiumResult {
    const turnover = Number(values.turnover) || 0;
    const vatInputs = Number(values.vatInputs) || 0;
    const goodsSpend = Number(values.goodsSpend) || 0;

    const r = calcVatScheme({ turnover, vatInputs, goodsSpend });

    const flatRateLabel = r.lctApplies
      ? `${pct(r.flatRate)} (limited-cost trader)`
      : `${pct(r.flatRate)} (marketing agency)`;

    const standardBest = r.bestScheme === "Standard";

    return {
      headline: {
        label: "Better VAT scheme",
        value: r.bestScheme,
        sub: `Annual difference ${gbp(r.saving)}`,
        tone: "default",
      },
      breakdown: [
        { label: "VAT collected (20% of turnover)", value: gbp(r.vatCollected) },
        { label: "Input VAT reclaimed (standard)", value: gbp(vatInputs) },
        { label: "Standard scheme net payment", value: gbp(r.standardNet) },
        { label: "Flat rate applied", value: flatRateLabel },
        { label: "Flat rate payment", value: gbp(r.flatPayment) },
        { label: "Best scheme", value: r.bestScheme, strong: true },
        { label: "Annual difference", value: gbp(r.saving), strong: true },
      ],
      scenarioResults: [
        {
          id: "standard",
          label: "Standard scheme",
          headline: {
            label: "VAT to pay",
            value: gbp(r.standardNet),
            tone: standardBest ? "good" : "default",
          },
          rows: [
            { label: "VAT collected", value: gbp(r.vatCollected) },
            { label: "Input VAT reclaimed", value: `-${gbp(vatInputs)}` },
            { label: "VAT to pay", value: gbp(r.standardNet), strong: true },
          ],
          best: standardBest,
        },
        {
          id: "flat-rate",
          label: "Flat Rate scheme",
          headline: {
            label: "VAT to pay",
            value: gbp(r.flatPayment),
            tone: !standardBest ? "good" : "default",
          },
          rows: [
            { label: "Flat rate", value: flatRateLabel },
            { label: "Applied to gross takings", value: gbp(r.grossInclusive) },
            { label: "VAT to pay", value: gbp(r.flatPayment), strong: true },
          ],
          best: !standardBest,
        },
      ],
      chart: {
        data: [
          { name: "Standard", vatToPay: Math.round(r.standardNet) },
          { name: "Flat Rate", vatToPay: Math.round(r.flatPayment) },
        ],
      },
      note: "VAT registration threshold £90,000; deregistration £88,000 (HP §6). Most agencies are limited-cost traders (goods spend below 2% of VAT-inclusive turnover or below £1,000 a year), which forces the 16.5% flat rate on gross takings. After reclaiming input VAT on software, equipment and professional fees, the standard scheme is usually cheaper for a typical agency. The 1% first-year FRS discount applies in the first year of VAT registration. MTD for VAT has been mandatory since April 2022. For overseas clients, the place-of-supply rules (reverse charge on B2B services to business customers outside the UK) may take the turnover outside the scope of UK VAT; take specialist advice on your specific client base.",
    };
  },
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    series: [
      { dataKey: "vatToPay", label: "VAT to pay", color: "var(--ink)" },
    ],
  },
  explainer: {
    heading: "How the VAT scheme comparator works",
    paragraphs: [
      "The Flat Rate Scheme sounds simpler, but almost every agency is a limited-cost trader, which forces the 16.5% rate on your gross takings. Here is what each scheme actually costs you on your numbers. The comparison is balanced: the calculator does not assume one scheme is always better.",
      "Under the standard scheme you collect 20% VAT from clients, reclaim input VAT on qualifying business purchases, and pay HMRC the net. Under the Flat Rate Scheme you collect the same 20% from clients but pay HMRC a fixed percentage of your gross (VAT-inclusive) turnover, keeping the difference. The flat rate for your category depends on whether you are a limited-cost trader.",
      "The limited-cost-trader test compares your goods spend to 2% of your VAT-inclusive turnover (or £1,000 a year, whichever is higher). Agencies typically spend very little on physical goods (as distinct from software, labour and professional services, which are excluded from the goods test), so they almost always fail the test and are stuck at 16.5%. Once your input VAT on software, subscriptions and professional fees adds up, the standard scheme usually wins.",
    ],
  },
};
