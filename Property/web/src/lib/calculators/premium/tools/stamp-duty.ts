/**
 * Stamp Duty (SDLT) PREMIUM tool config — the flagship on-page interactive tool
 * for the stamp-duty category.
 *
 * Headline value: a BUYER-TYPE comparison for one price. For a single purchase
 * price it shows the SDLT four ways side by side —
 *   • Standard           (replacement main home, no surcharge),
 *   • Additional property (buy-to-let / second home / company: + 5% surcharge),
 *   • Non-resident BTL    (a non-UK resident buy-to-let: + 2% AND + 5%),
 *   • First-time buyer    (relief: 0% to £300k, 5% to £500k, withdrawn above),
 * so a landlord can see exactly what the additional-dwelling and non-resident
 * surcharges add over a plain purchase, and how far first-time-buyer relief sits
 * below standard rates.
 *
 * All math comes from lib/sdltScenarios.ts, which itself is built on lib/sdlt.ts
 * (the SAME bands, 5% surcharge and FTB relief the existing StampDutyCalculator
 * uses). The tool, the existing calculator, the Excel model and the guide therefore
 * cannot disagree on a single figure.
 */
import type { PremiumToolConfig, PremiumComputeContext } from "../types";
import {
  computeSdltScenarios,
  gbp,
  type SdltScenarioResult,
} from "@/lib/sdltScenarios";

/** Map an SdltScenarioResult to the side-by-side ScenarioResult column. */
function toColumn(s: SdltScenarioResult, best: boolean) {
  const rows = [
    { label: "Band SDLT (standard rates)", value: gbp(s.baseSdlt) },
  ];
  if (s.additionalSurcharge > 0) {
    rows.push({ label: "Additional-dwelling surcharge (5%)", value: gbp(s.additionalSurcharge) });
  }
  if (s.nonResidentSurcharge > 0) {
    rows.push({ label: "Non-resident surcharge (2%)", value: gbp(s.nonResidentSurcharge) });
  }
  rows.push({ label: "Total SDLT", value: gbp(s.total) });
  rows.push({ label: "Effective rate", value: `${s.effectiveRate.toFixed(1)}%` });

  return {
    id: s.id,
    label: s.label,
    best,
    headline: { label: "SDLT due", value: gbp(s.total) },
    rows: rows.map((r) =>
      r.label === "Total SDLT" ? { ...r, strong: true } : r,
    ),
  };
}

function compute(ctx: PremiumComputeContext) {
  const price = Number(ctx.values.price) || 0;
  const nonResidentIsAdditional = String(ctx.values.nonResidentType ?? "additional") === "additional";

  const [standard, additional, nonResident, ftb] = computeSdltScenarios({
    price,
    nonResidentIsAdditional,
  });

  // Cheapest scenario wins the "best" tick (first-time buyers and main-home
  // buyers will tie at £0 on small prices; lowest total wins, FTB preferred
  // on a tie because relief is the more favourable status).
  const all = [ftb, standard, additional, nonResident];
  const minTotal = Math.min(...all.map((s) => s.total));
  const bestId = all.find((s) => s.total === minTotal)?.id;

  // The surcharge "cost" a landlord is really asking about: additional − standard.
  const surchargeCost = additional.total - standard.total;
  // What a non-resident investor pays on top of a UK-resident investor.
  const nonResExtra = nonResident.total - additional.total;

  const ftbNote = ftb.ftbReliefApplied
    ? `First-time-buyer relief saves ${gbp(standard.total - ftb.total)} versus standard rates at this price.`
    : `First-time-buyer relief is fully withdrawn above £500,000, so a first-time buyer pays the standard ${gbp(ftb.total)} here.`;

  return {
    headline: {
      label: "The additional-property surcharge adds",
      value: gbp(surchargeCost),
      sub: "5% of the price, on top of standard SDLT — the buy-to-let / second-home cost",
      tone: "warn" as const,
    },
    scenarioResults: [
      toColumn(standard, standard.id === bestId),
      toColumn(additional, additional.id === bestId),
      toColumn(nonResident, nonResident.id === bestId),
      toColumn(ftb, ftb.id === bestId),
    ],
    breakdown: [
      { label: "Standard purchase (main home)", value: gbp(standard.total) },
      { label: "As an additional property (+5%)", value: gbp(additional.total), strong: true },
      { label: "Extra cost of the 5% surcharge", value: `+ ${gbp(surchargeCost)}` },
      { label: "Extra again if buying as a non-UK resident (+2%)", value: `+ ${gbp(nonResExtra)}` },
    ],
    chart: {
      data: [
        {
          name: "SDLT due",
          standard: standard.total,
          additional: additional.total,
          nonResident: nonResident.total,
          firstTimeBuyer: ftb.total,
        },
      ],
    },
    note:
      `${ftbNote} ` +
      "These are estimates for residential property in England and Northern Ireland at current rates. " +
      "They assume a single dwelling at a straightforward price; mixed-use property, six or more dwellings in one deal, " +
      "uninhabitable property, linked transactions, leasehold premiums and reliefs can all change the figure. " +
      "Scotland (LBTT) and Wales (LTT) are separate taxes with different bands and surcharges. " +
      "Multiple Dwellings Relief was abolished for transactions on or after 1 June 2024. " +
      "This is general guidance, not advice for your specific purchase.",
  };
}

export const stampDutyPremiumTool: PremiumToolConfig = {
  id: "stamp-duty-premium",
  topic: "stamp-duty",
  title: "Stamp Duty (SDLT) by buyer type",
  intro:
    "Enter a purchase price and see the Stamp Duty Land Tax four ways at once — a standard main-home purchase, an additional property (the 5% buy-to-let / second-home surcharge), a non-UK-resident buy-to-let (the extra 2%), and first-time-buyer relief — so you can see exactly what each surcharge adds. England and Northern Ireland.",
  fields: [
    {
      id: "price",
      label: "Purchase price",
      type: "currency",
      default: 350000,
      step: 5000,
      help: "The price paid / chargeable consideration for the property.",
    },
    {
      id: "nonResidentType",
      label: "The non-resident buyer is…",
      type: "select",
      default: "additional",
      options: [
        { value: "additional", label: "Buying a buy-to-let / second home (+2% and +5%)" },
        { value: "main", label: "Buying their only / main home (+2% only)" },
      ],
      help: "A non-UK resident buying an additional property pays both the 2% non-resident surcharge and the 5% additional-dwelling surcharge.",
    },
  ],
  // No scenario switcher: compute always returns all four buyer-type columns
  // side by side, so a tab toggle would be dead UI (mirrors the Section 24 tool).
  compute,
  chart: {
    kind: "groupedBar",
    valueFormat: "currency",
    valueAxisLabel: "£ SDLT",
    series: [
      { dataKey: "standard", label: "Standard", color: "#10b981" },
      { dataKey: "additional", label: "Additional (+5%)", color: "#f59e0b" },
      { dataKey: "nonResident", label: "Non-resident", color: "#ef4444" },
      { dataKey: "firstTimeBuyer", label: "First-time buyer", color: "#3b82f6" },
    ],
  },
  explainer: {
    heading: "How the surcharges stack up",
    paragraphs: [
      "Standard SDLT is charged in slices: nothing on the first £125,000, 2% on £125,001–£250,000, 5% on £250,001–£925,000, 10% on £925,001–£1.5m and 12% above that. Each rate applies only to the part of the price that falls in its band, so the effective rate is always lower than the top band you reach.",
      "If the property is an additional dwelling — a buy-to-let, a second home, or any purchase by a company — a 5% surcharge is added to the whole price on top of those standard rates. That single flat 5% is usually the largest part of an investor's bill, and it is why the additional-property column jumps so far above a main-home purchase.",
      "A non-UK resident buyer pays a further 2% surcharge on the whole price. A non-resident buying a buy-to-let therefore carries both the 5% and the 2%. First-time buyers go the other way: relief removes SDLT on the first £300,000 and charges 5% on £300,000–£500,000, but it is withdrawn completely once the price tops £500,000, and it never applies to an additional property.",
      "This is England and Northern Ireland only. Scotland charges LBTT (with an 8% Additional Dwelling Supplement) and Wales charges LTT, both with their own bands. Mixed-use property, deals of six or more dwellings, uninhabitable property and linked transactions can all move the figure, so treat this as a fast first pass and get the exact position confirmed before you exchange.",
    ],
  },
};
