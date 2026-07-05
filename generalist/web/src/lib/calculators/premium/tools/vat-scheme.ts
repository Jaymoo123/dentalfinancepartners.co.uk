/**
 * Premium Tool 3 — VAT scheme chooser: Standard vs Flat Rate (vat-scheme-premium)
 *
 * Topic: vat-mtd.
 * Reuses: compareVATSchemes from compute/vat-scheme.ts.
 * Premium value: standard vs flat rate side-by-side with the limited-cost-trader
 * verdict and the annual pound-difference.
 */

import type { PremiumToolConfig, PremiumComputeFn } from "../types";
import { compareVATSchemes } from "@/lib/tools/compute/vat-scheme";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";

const compute: PremiumComputeFn = ({ values }) => {
  const turnover = Number(values.turnover) || 0;
  const vatInputs = Number(values.vatInputs) || 0;
  const goodsSpend = Number(values.goodsSpend) || 0;

  const res = compareVATSchemes(turnover, vatInputs, goodsSpend);

  const verdict = {
    text: res.bestScheme === "Standard"
      ? "Standard VAT accounting wins here"
      : "The Flat Rate Scheme wins here",
    positive: true,
  };

  const lctNote = res.lctApplies
    ? " Your goods spend is below the limited-cost-trader threshold, so the flat rate is 16.5%. " +
      "This is why the Flat Rate Scheme is usually unattractive for service businesses and contractors."
    : "";

  return {
    verdict,
    headline: {
      label: `Annual saving with ${res.bestScheme}`,
      value: gbp(res.saving),
      tone: "good",
    },
    scenarioResults: [
      {
        label: "Standard VAT",
        value: gbp(res.standardNet),
        best: res.bestScheme === "Standard",
        rows: [
          { label: "VAT collected", value: gbp(res.vatCollected) },
          { label: "VAT on purchases reclaimed", value: gbp(vatInputs) },
          { label: "Net VAT payable", value: gbp(res.standardNet), strong: true },
        ],
      },
      {
        label: "Flat Rate Scheme",
        value: gbp(res.flatNet),
        best: res.bestScheme === "Flat Rate",
        rows: [
          { label: "Flat rate applied", value: pct(res.flatRate * 100) },
          { label: "Flat rate payment", value: gbp(res.flatNet) },
          { label: "Amount kept", value: gbp(res.flatKeep), strong: true },
        ],
      },
    ],
    note:
      `The VAT registration threshold is £90,000 (from 1 April 2024).` +
      lctNote +
      " Figures are estimates based on the inputs above; actual VAT liability depends on your specific purchases, exempt supplies and accounting method.",
  };
};

export const vatSchemePremium: PremiumToolConfig = {
  id: "vat-scheme-premium",
  name: "VAT scheme chooser: Standard vs Flat Rate",
  topic: "vat-mtd",
  description:
    "Enter three numbers and see, in pounds, which VAT scheme leaves your business better off, " +
    "including the limited-cost-trader trap most contractors fall into.",
  fields: [
    {
      id: "turnover",
      label: "VAT-taxable turnover (excluding VAT)",
      type: "currency",
      default: 100000,
      min: 0,
      max: 500000,
      step: 5000,
      help: "Your VAT-taxable turnover for the year, excluding VAT.",
    },
    {
      id: "vatInputs",
      label: "VAT on business purchases (reclaimable)",
      type: "currency",
      default: 2000,
      min: 0,
      max: 100000,
      step: 500,
      help: "The VAT you pay on business purchases and could reclaim under Standard VAT.",
    },
    {
      id: "goodsSpend",
      label: "Annual spend on goods (not services)",
      type: "currency",
      default: 500,
      min: 0,
      max: 100000,
      step: 500,
      help:
        "Annual spend on goods (not services). Under 2% of turnover or under £1,000 makes you " +
        "a limited-cost trader at the 16.5% flat rate.",
    },
  ],
  compute,
  ctaLabel: "Get advice on the right VAT scheme for your business",
};
