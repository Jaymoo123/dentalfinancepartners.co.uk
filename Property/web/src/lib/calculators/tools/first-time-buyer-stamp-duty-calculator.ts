import type { GenericTool } from "../types";
import { gbp } from "../format";
import { firstTimeBuyerSdlt, marginalSdlt, STANDARD_SDLT_BANDS } from "@/lib/sdlt";

export const firstTimeBuyerStampDutyCalculator: GenericTool = {
  kind: "generic",
  slug: "first-time-buyer-stamp-duty-calculator",
  name: "First-Time Buyer Stamp Duty Calculator",
  category: "Stamp duty",
  oneLiner:
    "The SDLT a first-time buyer pays in England & NI, and how much the relief saves versus standard rates.",
  metaTitle: "First-Time Buyer Stamp Duty Calculator | SDLT Relief (England & NI)",
  metaDescription:
    "Free first-time buyer stamp duty calculator for England & NI. See the SDLT you pay with first-time-buyer relief (0% to £300k, 5% to £500k) and how much it saves versus standard rates.",
  intro:
    "See the stamp duty a first-time buyer pays in England and Northern Ireland, and how much the relief saves.",
  ctaLabel: "Planning your first purchase? Ask us →",
  embedHeight: 540,
  fields: [{ id: "price", label: "Property price", type: "currency", default: 350_000, step: 5000 }],
  compute: (v) => {
    const price = Number(v.price);
    const ftb = firstTimeBuyerSdlt(price);
    const standard = marginalSdlt(price, STANDARD_SDLT_BANDS);
    const saving = Math.max(0, standard - ftb);
    const reliefLost = price > 500_000;
    return {
      headline: {
        label: "Stamp duty as a first-time buyer",
        value: gbp(ftb),
        sub: price > 0 ? `Effective rate ${((ftb / price) * 100).toFixed(1)}%` : undefined,
      },
      rows: [
        { label: "Standard SDLT (no relief)", value: gbp(standard) },
        { label: "First-time-buyer saving", value: gbp(saving), strong: true },
      ],
      note: reliefLost
        ? "Above £500,000 first-time-buyer relief is fully withdrawn, so you pay standard SDLT. England & NI only."
        : "First-time-buyer relief: 0% on the first £300,000 and 5% on £300,001–£500,000. Both buyers must be first-time buyers. England & NI only; Scotland and Wales differ.",
    };
  },
  explainer: {
    heading: "First-time buyer stamp duty relief, explained",
    paragraphs: [
      "In England and Northern Ireland, first-time buyers pay a reduced rate of Stamp Duty Land Tax. There is no SDLT on the first £300,000, then 5% on the portion between £300,000 and £500,000. Compared with the standard residential rates, that is a saving of up to £6,250.",
      "The relief is all-or-nothing above a ceiling. If the price is more than £500,000, the relief is withdrawn entirely and you pay standard rates on the whole purchase, so a property at £505,000 is taxed very differently from one at £500,000.",
      "To qualify, every buyer must be a first-time buyer, meaning none of you has ever owned a residential property anywhere in the world, and you must intend to live in the property as your only or main home. Buying with someone who already owns, or has owned, a home means the relief is lost for the whole purchase.",
      "Scotland and Wales have their own systems. Scotland's first-time-buyer relief raises the nil band to £175,000 (worth up to £600), and Wales has no separate first-time-buyer relief because its nil band is already £225,000.",
    ],
  },
  faqs: [
    {
      question: "How much stamp duty does a first-time buyer pay?",
      answer:
        "In England and Northern Ireland, nothing on the first £300,000 and 5% on the portion from £300,000 to £500,000. Above £500,000 the relief is withdrawn and standard rates apply to the whole price.",
    },
    {
      question: "Who counts as a first-time buyer for stamp duty?",
      answer:
        "Someone who has never owned a residential property anywhere in the world, buying a home to live in as their only or main residence. If you buy jointly, every buyer must meet the test, or the relief is lost for the whole purchase.",
    },
    {
      question: "Do first-time buyers pay stamp duty over £500,000?",
      answer:
        "Yes. Once the price exceeds £500,000 the relief no longer applies at all, and the purchase is taxed at the standard residential SDLT rates.",
    },
  ],
};
