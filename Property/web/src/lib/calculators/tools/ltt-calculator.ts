import type { GenericTool } from "../types";
import { gbp } from "../format";
import { computeLtt } from "@/lib/ltt";

export const lttCalculator: GenericTool = {
  kind: "generic",
  slug: "ltt-calculator-wales",
  name: "LTT Calculator (Wales)",
  category: "Stamp duty",
  oneLiner:
    "Land Transaction Tax for Wales, including the higher rates for buy-to-lets and second homes.",
  metaTitle: "LTT Calculator Wales | Land Transaction Tax (2026/27)",
  metaDescription:
    "Free LTT calculator for Wales. Work out Land Transaction Tax on a property purchase, including the higher residential rates for buy-to-lets and second homes. Current 2026/27 bands.",
  intro:
    "Work out the Land Transaction Tax on a Welsh property purchase, including the higher rates for additional properties.",
  ctaLabel: "Buying in Wales? We'll handle the tax →",
  embedHeight: 580,
  fields: [
    { id: "price", label: "Property price", type: "currency", default: 250_000, step: 5000 },
    {
      id: "additional",
      label: "Additional property (buy-to-let or second home) — uses the higher rates",
      type: "toggle",
      default: true,
    },
  ],
  compute: (v) => {
    const r = computeLtt({ price: Number(v.price), additional: Boolean(v.additional) });
    return {
      headline: {
        label: "Land Transaction Tax to pay",
        value: gbp(r.tax),
        sub: `Effective rate ${r.effectiveRate.toFixed(1)}%`,
      },
      rows: [
        {
          label: Boolean(v.additional) ? "Higher residential rates" : "Main residential rates",
          value: gbp(r.tax),
          strong: true,
        },
      ],
      note: "Wales only (LTT via the Welsh Revenue Authority). For additional properties Wales applies a separate higher-rates table, not a flat surcharge added on top. There is no first-time-buyer relief and no non-resident surcharge in Wales.",
    };
  },
  explainer: {
    heading: "How LTT works in Wales",
    paragraphs: [
      "Wales uses Land Transaction Tax (LTT) rather than Stamp Duty Land Tax, collected by the Welsh Revenue Authority. The main residential rates are nothing on the first £225,000, then 6% to £400,000, 7.5% to £750,000, 10% to £1.5 million and 12% above. The £225,000 nil-rate band is much higher than the SDLT one, so many ordinary purchases pay no LTT at all.",
      "Where Wales differs most is on additional properties. Instead of adding a flat surcharge on top of the main rates, Wales applies an entirely separate higher-rates table that starts at 5% from the first pound and rises to 17%. So a buy-to-let or second home is taxed under that higher schedule throughout, not the main rates plus an extra percentage.",
      "Wales has no first-time-buyer relief, because the generous £225,000 nil band already covers most first purchases, and no non-resident surcharge. Multiple dwellings relief still exists in Wales (unlike England), though it has been tightened, which can matter for portfolio purchases.",
      "Because the higher-rate table is standalone, the Welsh figure for a second home can differ noticeably from the English equivalent at the same price. If you own property across borders, each jurisdiction is assessed on its own rules.",
    ],
  },
  faqs: [
    {
      question: "Is LTT the same as stamp duty?",
      answer:
        "No. Land Transaction Tax is the Welsh equivalent, collected by the Welsh Revenue Authority with its own bands and rates. Stamp Duty Land Tax applies in England and Northern Ireland; Scotland uses Land and Buildings Transaction Tax.",
    },
    {
      question: "What are the higher rates of LTT for a second home in Wales?",
      answer:
        "Wales applies a separate higher-rates table for additional properties, running from 5% on the first £180,000 up to 17% above £1.5 million. Unlike SDLT, it is not the main rates plus a flat surcharge; the whole purchase is taxed under the higher schedule.",
    },
    {
      question: "Is there first-time-buyer relief in Wales?",
      answer:
        "No. Wales does not operate a separate first-time-buyer relief, because the £225,000 nil-rate band already means most first purchases pay no LTT.",
    },
  ],
};
