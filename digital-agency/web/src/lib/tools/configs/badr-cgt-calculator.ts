/**
 * BADR CGT Calculator — GenericTool config.
 * 2025/26 rates (14%) and 2026/27 rates (18%).
 */

import type { GenericTool, CalcValues } from "@accounting-network/web-shared/tools/types";
import { calcBadrCgt, type BadrYear } from "../compute/badr-cgt";

const fmt = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;

export const badrCgtTool: GenericTool = {
  kind: "generic",
  slug: "badr-cgt-calculator",
  name: "BADR CGT Calculator",
  category: "Growth and exit",
  oneLiner:
    "Work out your CGT bill on an agency sale under Business Asset Disposal Relief. Models the 2025/26 14% rate and 2026/27 18% rate.",
  metaTitle: "BADR CGT Calculator 2025/26 | Business Asset Disposal Relief",
  metaDescription:
    "Free BADR CGT calculator for UK agency founders. Models 14% (2025/26) and 18% (2026/27) rates with £1m lifetime allowance. No sign-up.",
  intro:
    "Calculate your capital gains tax on an agency sale using Business Asset Disposal Relief. Models both the current 2026/27 rate (18%) and the 2025/26 rate (14%), with a £1,000,000 lifetime BADR allowance.",
  embedHeight: 400,
  fields: [
    {
      id: "saleProceeds",
      label: "Sale proceeds",
      type: "currency",
      default: 2500000,
      min: 0,
      max: 50000000,
      step: 50000,
    },
    {
      id: "originalCost",
      label: "Original cost / base cost",
      type: "currency",
      default: 100,
      min: 0,
      max: 10000000,
      step: 100,
      help: "What you paid for the shares (typically £100 for a founder-owned Ltd).",
    },
    {
      id: "previousBadrUsed",
      label: "Previous BADR used",
      type: "currency",
      default: 0,
      min: 0,
      max: 1000000,
      step: 10000,
      help: "How much of your £1m lifetime BADR allowance have you already used?",
    },
    {
      id: "year",
      label: "Tax year of disposal",
      type: "select",
      default: "2026/27",
      options: [
        { value: "2025/26", label: "2025/26 (14% BADR rate)" },
        { value: "2026/27", label: "2026/27 (18% BADR rate)" },
      ],
    },
    {
      id: "meetsEligibility",
      label: "Meets BADR eligibility criteria",
      type: "toggle",
      default: true,
      help: "5%+ shareholding, officer/employee for 2+ years, shares held 2+ years. Untick if ineligible.",
    },
  ],
  compute: (values: CalcValues) => {
    const out = calcBadrCgt({
      saleProceeds: Number(values.saleProceeds) || 0,
      originalCost: Number(values.originalCost) || 0,
      previousBadrUsed: Number(values.previousBadrUsed) || 0,
      year: (values.year as BadrYear) || "2026/27",
      meetsEligibility: Boolean(values.meetsEligibility),
    });
    return {
      headline: {
        label: "Total CGT",
        value: fmt(out.totalTax),
        sub: `Net proceeds after tax: ${fmt(out.netProceeds)} | Effective rate: ${pct(out.effectiveRate)}`,
        tone: out.totalTax > 0 ? "warn" : "default",
      },
      rows: [
        { label: "Total gain", value: fmt(out.gain) },
        { label: "BADR-eligible gain", value: fmt(out.eligibleForBadr) },
        { label: "BADR tax", value: fmt(out.badrTax) },
        { label: "Standard CGT (on overflow)", value: fmt(out.standardTax) },
        { label: "Total CGT", value: fmt(out.totalTax), strong: true },
        { label: "Net proceeds after tax", value: fmt(out.netProceeds), strong: true },
        { label: "Effective CGT rate", value: pct(out.effectiveRate) },
      ],
      note: "Does not model annual CGT exemption, BADR anti-avoidance rules, or deferred consideration. Not personal tax advice.",
    };
  },
  explainer: {
    heading: "How BADR works",
    paragraphs: [
      "Business Asset Disposal Relief (formerly Entrepreneurs Relief) reduces the CGT rate on qualifying business disposals. For 2025/26 disposals the rate is 14%; from 6 April 2026 it rises to 18%. The lifetime limit is £1,000,000 of gains.",
      "To qualify: you must hold at least 5% of shares and voting rights, have been an officer or employee of the company for the last 2 years, and have held the shares for at least 2 years.",
    ],
  },
  faqs: [
    {
      question: "What is the BADR rate in 2025/26?",
      answer:
        "14% for qualifying disposals in the 2025/26 tax year (on/after 6 April 2025). This rises to 18% from 6 April 2026.",
    },
    {
      question: "What happens above the £1m lifetime limit?",
      answer:
        "Gains above the lifetime BADR allowance are subject to the standard CGT rate. For higher-rate taxpayers selling business assets this is currently 24%.",
    },
  ],
};
