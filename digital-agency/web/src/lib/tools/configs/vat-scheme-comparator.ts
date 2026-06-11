/**
 * VAT Scheme Comparator — GenericTool config.
 * Standard vs Flat Rate (with Limited Cost Trader test).
 */

import type { GenericTool, CalcValues } from "@accounting-network/web-shared/tools/types";
import { calcVatScheme } from "../compute/vat-scheme";

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export const vatSchemeTool: GenericTool = {
  kind: "generic",
  slug: "vat-scheme-comparator",
  name: "VAT Scheme Comparator",
  category: "Tax planning",
  oneLiner:
    "Compare Standard VAT against the Flat Rate Scheme. Includes the Limited Cost Trader test that catches most agencies out.",
  metaTitle: "VAT Scheme Comparator | Standard vs Flat Rate for Agencies",
  metaDescription:
    "Free VAT scheme comparator for UK agencies. Standard vs Flat Rate with the Limited Cost Trader test. See which scheme saves you most.",
  intro:
    "Compare Standard VAT and the Flat Rate Scheme for your agency. Automatically applies the Limited Cost Trader test (most agencies fail it and must use the 16.5% rate, making flat rate unattractive).",
  embedHeight: 380,
  fields: [
    {
      id: "turnover",
      label: "Annual VAT-exclusive turnover",
      type: "currency",
      default: 180000,
      min: 0,
      max: 5000000,
      step: 5000,
      help: "Your net (ex-VAT) invoiced revenue.",
    },
    {
      id: "vatInputs",
      label: "Input VAT claimable",
      type: "currency",
      default: 8000,
      min: 0,
      max: 500000,
      step: 500,
      help: "VAT you pay on business purchases that you can reclaim on the standard scheme.",
    },
    {
      id: "goodsSpend",
      label: "Annual goods spend (incl. VAT)",
      type: "currency",
      default: 500,
      min: 0,
      max: 100000,
      step: 100,
      help: "Physical goods bought for the business. Most agencies spend very little here, triggering the Limited Cost Trader 16.5% flat rate.",
    },
  ],
  compute: (values: CalcValues) => {
    const out = calcVatScheme({
      turnover: Number(values.turnover) || 0,
      vatInputs: Number(values.vatInputs) || 0,
      goodsSpend: Number(values.goodsSpend) || 0,
    });
    return {
      headline: {
        label: `Best scheme: ${out.bestScheme}`,
        value: `Save ${fmt(out.saving)}`,
        sub: `Standard: pays ${fmt(out.standardNet)} | Flat Rate: pays ${fmt(out.flatPayment)} (${pct(out.flatRate)} rate)`,
        tone: "good",
      },
      rows: [
        { label: "VAT collected from clients", value: fmt(out.vatCollected) },
        { label: "Standard scheme (pay HMRC)", value: fmt(out.standardNet) },
        { label: "Limited Cost Trader?", value: out.lctApplies ? "Yes — 16.5% flat rate" : "No — 12.5% marketing rate" },
        { label: "Flat Rate scheme (pay HMRC)", value: fmt(out.flatPayment) },
        { label: "Flat Rate keep/extra", value: `${out.flatKeep >= 0 ? "Keep " : "Extra "}${fmt(Math.abs(out.flatKeep))}` },
        { label: "Best scheme", value: out.bestScheme, strong: true },
        { label: "Annual saving", value: fmt(out.saving), strong: true },
      ],
      note: "Flat Rate Scheme is typically unfavourable for agencies that fail the Limited Cost Trader test. Verify with your accountant before switching.",
    };
  },
  explainer: {
    heading: "Standard vs Flat Rate for agencies",
    paragraphs: [
      "On the Standard scheme you charge 20% VAT and can reclaim input VAT on purchases. On the Flat Rate Scheme you charge 20% to clients but pay HMRC a flat percentage of your VAT-inclusive turnover instead of tracking input/output separately.",
      "Most agencies trigger the Limited Cost Trader (LCT) test because their goods spend is low (below 2% of VAT-inclusive turnover or £1,000/year). LCT companies must use the 16.5% flat rate, which usually makes the Flat Rate Scheme more expensive than standard.",
    ],
  },
  faqs: [
    {
      question: "What is the Limited Cost Trader test?",
      answer:
        "If your VAT-inclusive goods spend is below £1,000/year OR below 2% of your VAT-inclusive turnover, you are a Limited Cost Trader and must use the 16.5% flat rate. Services, software and staff costs do not count as goods for this test.",
    },
  ],
};
