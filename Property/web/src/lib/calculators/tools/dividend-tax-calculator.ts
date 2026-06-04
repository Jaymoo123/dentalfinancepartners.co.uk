import type { GenericTool, CalcResultRow } from "../types";
import { gbp } from "../format";
import { computeDividendTax } from "@/lib/dividendTax";

export const dividendTaxCalculator: GenericTool = {
  kind: "generic",
  slug: "dividend-tax-calculator",
  name: "Dividend Tax Calculator",
  category: "Incorporation",
  oneLiner:
    "The tax on dividends drawn from your property company, with the £500 allowance and 8.75% / 33.75% / 39.35% rates.",
  metaTitle: "Dividend Tax Calculator | Property Company Dividends (UK 2026/27)",
  metaDescription:
    "Free dividend tax calculator. Work out the tax on dividends from your property company, with the £500 dividend allowance and the 8.75%, 33.75% and 39.35% rates. 2026/27.",
  intro:
    "Work out the tax on dividends you draw from your property company, on top of your other income.",
  ctaLabel: "Extracting profit tax-efficiently? Ask us →",
  embedHeight: 640,
  fields: [
    {
      id: "otherIncome",
      label: "Your other income",
      type: "currency",
      default: 30_000,
      help: "Salary and any other non-dividend income for the year. Sets which band your dividends fall into.",
    },
    { id: "dividends", label: "Dividends drawn", type: "currency", default: 20_000 },
  ],
  compute: (v) => {
    const r = computeDividendTax({
      otherIncome: Number(v.otherIncome),
      dividends: Number(v.dividends),
    });
    const rows: CalcResultRow[] = [
      { label: "Tax-free (allowances)", value: gbp(r.taxFree) },
    ];
    if (r.atBasic > 0) rows.push({ label: "Taxed at 8.75%", value: gbp(r.atBasic * 0.0875) });
    if (r.atHigher > 0) rows.push({ label: "Taxed at 33.75%", value: gbp(r.atHigher * 0.3375) });
    if (r.atAdditional > 0) rows.push({ label: "Taxed at 39.35%", value: gbp(r.atAdditional * 0.3935) });
    rows.push({ label: "Dividends after tax", value: gbp(Number(v.dividends) - r.tax), strong: true });
    return {
      headline: { label: "Dividend tax to pay", value: gbp(r.tax) },
      rows,
      note: "The £500 dividend allowance is tax-free but still uses band space. Dividends stack on top of your other income, so the rate depends on the band they fall into. Ignores the personal-allowance taper above £100,000.",
    };
  },
  explainer: {
    heading: "How dividends from a property company are taxed",
    paragraphs: [
      "When you take profit out of your property company as dividends, you pay dividend tax personally, on top of the Corporation Tax the company already paid. The first £500 of dividends each year is covered by the dividend allowance and taxed at 0%, though it still uses up part of your tax band.",
      "Above the allowance, dividends are taxed at 8.75% in the basic-rate band, 33.75% in the higher-rate band and 39.35% in the additional-rate band. Dividends are treated as the top slice of your income, so your salary and other income are counted first, and the dividends are then taxed in whichever band they reach.",
      "This two-layer charge, Corporation Tax then dividend tax, is why a company is not automatically cheaper than personal ownership. For a landlord who keeps profits in the company to reinvest, the deferral can be valuable; for one who needs all the income now, the combined rate can be close to personal tax.",
      "There are usually more efficient ways to extract profit than dividends alone, for example a modest salary, pension contributions, or splitting shares with a spouse. We model the mix that leaves you with the most after tax.",
    ],
  },
  faqs: [
    {
      question: "What is the dividend allowance for 2026/27?",
      answer:
        "£500. The first £500 of dividends each year is taxed at 0%, although it still counts towards your basic, higher or additional-rate band when working out the rate on the rest.",
    },
    {
      question: "What are the dividend tax rates?",
      answer:
        "8.75% for dividends in the basic-rate band, 33.75% in the higher-rate band and 39.35% in the additional-rate band. Dividends sit on top of your other income, so the band depends on your total income.",
    },
    {
      question: "Is it better to take salary or dividends from a property company?",
      answer:
        "It depends on your wider position. A small salary can be efficient, dividends avoid National Insurance but carry their own tax after Corporation Tax, and pension contributions or splitting shares with a spouse can help. The best mix is specific to you.",
    },
  ],
};
