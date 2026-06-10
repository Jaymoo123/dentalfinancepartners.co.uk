import type { GenericTool, CalcResultRow } from "../types";
import { gbp } from "../format";
import { computeLbtt } from "@/lib/lbtt";

export const lbttCalculator: GenericTool = {
  kind: "generic",
  slug: "lbtt-calculator-scotland",
  name: "LBTT Calculator (Scotland)",
  category: "Stamp duty",
  oneLiner:
    "Land and Buildings Transaction Tax for Scotland, including the 8% Additional Dwelling Supplement on second homes and buy-to-lets.",
  metaTitle: "LBTT Calculator Scotland | incl. 8% ADS (2026/27)",
  metaDescription:
    "Free LBTT calculator for Scotland. Work out Land and Buildings Transaction Tax, including the 8% Additional Dwelling Supplement on buy-to-lets and second homes, and first-time-buyer relief.",
  intro:
    "Work out the Land and Buildings Transaction Tax on a Scottish property purchase, including the 8% Additional Dwelling Supplement.",
  ctaLabel: "Buying in Scotland? We'll handle the tax →",
  embedHeight: 640,
  fields: [
    { id: "price", label: "Property price", type: "currency", default: 250_000, step: 5000 },
    {
      id: "additional",
      label: "Additional property (buy-to-let or second home) — adds the 8% ADS",
      type: "toggle",
      default: true,
    },
    {
      id: "firstTimeBuyer",
      label: "First-time buyer — relief raises the nil band to £175,000",
      type: "toggle",
      default: false,
    },
  ],
  compute: (v) => {
    const r = computeLbtt({
      price: Number(v.price),
      additional: Boolean(v.additional),
      firstTimeBuyer: Boolean(v.firstTimeBuyer),
    });
    const rows: CalcResultRow[] = [{ label: "LBTT (main rates)", value: gbp(r.main), strong: true }];
    if (r.ads > 0) rows.push({ label: "Additional Dwelling Supplement (8%)", value: gbp(r.ads) });
    return {
      headline: {
        label: "Total LBTT to pay",
        value: gbp(r.total),
        sub: `Effective rate ${r.effectiveRate.toFixed(1)}%`,
      },
      rows,
      note: "Scotland only (LBTT via Revenue Scotland). The ADS is 8% of the whole price, not just the slice above a threshold, and applies to any additional dwelling worth £40,000 or more. First-time-buyer relief does not apply to an additional property.",
    };
  },
  explainer: {
    heading: "How LBTT works in Scotland",
    paragraphs: [
      "Scotland does not use Stamp Duty Land Tax. Property purchases there are subject to Land and Buildings Transaction Tax (LBTT), collected by Revenue Scotland, with its own bands: nothing on the first £145,000, 2% to £250,000, 5% to £325,000, 10% to £750,000 and 12% above. Each rate applies only to the part of the price within that band.",
      "If you are buying an additional dwelling, a buy-to-let or a second home, the Additional Dwelling Supplement adds 8% on top. Crucially the ADS is charged on the entire purchase price, not just the slice above a threshold, so on a £200,000 second home the ADS alone is £16,000. It applies where the property bought is worth £40,000 or more.",
      "First-time buyers get a relief that raises the zero-rate band to £175,000, worth up to £600. It only applies when you are not also buying an additional property. There is no non-resident surcharge in Scotland.",
      "If you sell your previous main home within 36 months of buying the new one, ADS paid can be reclaimed. The rules around replacement of a main residence and joint buyers are easy to get wrong, so it is worth checking before completion.",
    ],
  },
  faqs: [
    {
      question: "What is the ADS in Scotland?",
      answer:
        "The Additional Dwelling Supplement is an 8% charge on the whole purchase price when you buy an additional residential property (a buy-to-let or second home) worth £40,000 or more. It is the Scottish equivalent of the SDLT additional-dwelling surcharge, but at a higher rate and on the entire price.",
    },
    {
      question: "Is LBTT the same as stamp duty?",
      answer:
        "No. LBTT is a separate, fully devolved tax for Scotland with its own bands and rates, collected by Revenue Scotland. Stamp Duty Land Tax applies in England and Northern Ireland, and Land Transaction Tax applies in Wales.",
    },
    {
      question: "Can I reclaim the ADS?",
      answer:
        "Yes, if the additional property was bought to replace your main residence and you sell the previous main home within 36 months of the new purchase, you can reclaim the ADS from Revenue Scotland.",
    },
  ],
};
