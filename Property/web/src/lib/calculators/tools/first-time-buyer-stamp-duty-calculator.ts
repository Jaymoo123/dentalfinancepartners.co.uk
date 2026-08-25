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
    "Free first-time buyer stamp duty calculator for England & NI: first-time-buyer relief (0% to £300k, 5% to £500k) and what it saves versus standard rates.",
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
        : "First-time-buyer relief: 0% on the first £300,000 and 5% on £300,001 to £500,000. Both buyers must be first-time buyers. England & NI only; Scotland and Wales differ.",
    };
  },
  explainer: {
    heading: "First-time buyer stamp duty relief, explained",
    paragraphs: [
      "In England and Northern Ireland, first-time buyers pay a reduced rate of Stamp Duty Land Tax. There is no SDLT on the first £300,000, then 5% on the portion between £300,000 and £500,000. Compared with the standard residential rates, that is a saving of up to £5,000.",
      "The relief is all-or-nothing above a ceiling. If the price is more than £500,000, the relief is withdrawn entirely and you pay standard rates on the whole purchase, so a property at £505,000 is taxed very differently from one at £500,000.",
      "To qualify, every buyer must be a first-time buyer, meaning none of you has ever owned a residential property anywhere in the world, and you must intend to live in the property as your only or main home. Buying with someone who already owns, or has owned, a home means the relief is lost for the whole purchase.",
      "Scotland and Wales have their own systems. Scotland's first-time-buyer relief raises the nil band to £175,000 (worth up to £600), and Wales has no separate first-time-buyer relief because its nil band is already £225,000.",
      "In 2026/27 the relief is worth £5,000 to you once your price passes £300,000, and less below that. Buy your first home at £300,000 and you pay nothing, where a buyer without the relief pays £5,000. Buy at £400,000 and you pay £5,000 instead of £10,000. Buy at £500,000 and you pay £10,000 instead of £15,000. Under £125,000 nobody pays stamp duty, first-time buyer or not, so the relief adds nothing there.",
      "Previous ownership is wider than most people expect. You are not a first-time buyer if you have ever owned a home anywhere in the world, if you inherited one, or if you held a share of one through a trust, and it makes no difference that you sold it years ago. Buying with someone who owns or has owned a home costs you the relief on the whole purchase, and if they still own that property you also pay the 5% additional dwellings surcharge on top, so the bill can be far higher than you planned. If it is workable for the two of you, buying in the first-time buyer's sole name is the version that keeps the relief.",
      "Northern Ireland is not devolved for property purchase tax, so an NI purchase runs on the same Stamp Duty Land Tax bands and the same first-time buyer relief as England and this calculator applies to it in full. The one extra thing to watch there is a property straddling the border with the Republic, where Irish stamp duty can come into play as well.",
      "Relief from stamp duty is not only a first-time buyer thing. If you inherit a property there is no purchase, so no stamp duty is due, though the inheritance does end your first-time buyer status for any later purchase. Companies transferring property inside a 75% group can claim group relief and pay nothing on the transfer. Buyers taking six or more dwellings in one transaction are treated as buying non-residential property, which drops the surcharge and uses the lower non-residential rates. Multiple dwellings relief no longer exists in England and Northern Ireland: it was abolished for purchases completing on or after 1 June 2024, so ignore any guide that still offers it to you.",
    ],
  },
  faqs: [
    {
      question: "How much stamp duty does a first-time buyer pay?",
      answer:
        "In England and Northern Ireland, nothing on the first £300,000 and 5% on the portion from £300,000 to £500,000. Above £500,000 the relief is withdrawn and standard rates apply to the whole price. The relief is not automatic: it is claimed on the SDLT return your conveyancer files, normally within 14 days of completion.",
    },
    {
      question: "Who counts as a first-time buyer for stamp duty?",
      answer:
        "Someone who has never owned a residential property anywhere in the world, buying a home to live in as their only or main residence. Any past ownership counts against you, however long ago it was and however you came by it, including inheritance and a share held through a trust.",
    },
    {
      question: "Do first-time buyers pay stamp duty over £500,000?",
      answer:
        "Yes. Once the price exceeds £500,000 the relief no longer applies at all, and the purchase is taxed at the standard residential SDLT rates.",
    },
    {
      question: "What is first-time buyer stamp duty relief worth?",
      answer:
        "£5,000 at most, and you get the full £5,000 on any qualifying purchase above £300,000. Below that the saving is smaller, because the standard rates you are being spared start at 2% from £125,000, and below £125,000 there is nothing to save.",
    },
    {
      question: "Do first-time buyers pay stamp duty in Northern Ireland?",
      answer:
        "Northern Ireland is identical to England: nothing on the first £300,000, 5% up to £500,000, and no relief at all above £500,000. Stamp duty was never devolved to Stormont, so an NI purchase runs on the same Stamp Duty Land Tax rules and the figures this calculator gives you apply in full.",
    },
    {
      question: "Do you lose first-time buyer relief if buying with someone who owns a home?",
      answer:
        "Yes, the relief is lost on the whole purchase, even though you personally have never owned a property. Every buyer named on the purchase has to pass the test. If your co-buyer is keeping their existing home you also pick up the 5% additional dwellings surcharge, so run both figures before you decide whose name goes on the title.",
    },
  ],
};
