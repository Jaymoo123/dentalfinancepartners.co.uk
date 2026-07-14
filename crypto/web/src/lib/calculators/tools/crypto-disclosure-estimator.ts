import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

const BANDS = [
  { value: "reasonable", label: "Reasonable care (non-deliberate)", years: 4, penaltyMin: 0, penaltyMax: 0.3 },
  { value: "careless", label: "Careless", years: 6, penaltyMin: 0, penaltyMax: 0.3 },
  { value: "deliberate", label: "Deliberate", years: 20, penaltyMin: 0.2, penaltyMax: 0.7 },
];

export const cryptoDisclosureEstimator: GenericTool = {
  kind: "generic",
  slug: "crypto-disclosure-estimator",
  name: "Crypto Disclosure Scope Estimator",
  category: "HMRC Disclosure",
  oneLiner: "Illustrate the scope of an HMRC crypto disclosure: years assessable and indicative penalty range, by behaviour band.",
  metaTitle: "Crypto HMRC Disclosure Estimator | Digital Asset Tax Partners",
  metaDescription: "Estimate the scope of an HMRC cryptoasset disclosure: assessable years (4, 6 or 20), unpaid tax total and indicative penalty range by behaviour band.",
  intro: "Select your HMRC behaviour band and enter an estimate of annual unpaid tax. The tool shows how many years can be assessed and the indicative penalty range. Voluntary disclosure reduces penalties significantly.",
  embedHeight: 460,
  fields: [
    { id: "behaviour", label: "HMRC behaviour band", type: "select", default: "reasonable", options: BANDS.map(b => ({ value: b.value, label: b.label })), help: "HMRC classifies underpayments as reasonable care, careless or deliberate. The band determines how far back HMRC can assess." },
    { id: "annualTaxUnpaid", label: "Estimated unpaid tax per year (£)", type: "currency", default: 2000, min: 0, help: "A rough estimate of the tax underpaid each year. Used to illustrate the total exposure." },
  ],
  compute(v) {
    const behaviourValue = String(v.behaviour ?? "reasonable");
    const annualTax = Math.max(0, Number(v.annualTaxUnpaid));
    const band = BANDS.find(b => b.value === behaviourValue) ?? BANDS[0];

    const totalTax = annualTax * band.years;
    const penaltyMin = Math.round(totalTax * band.penaltyMin);
    const penaltyMax = Math.round(totalTax * band.penaltyMax);

    return {
      headline: { label: "Estimated total tax exposure", value: gbp(totalTax), sub: `Over ${band.years} assessable years (${band.label} band)` },
      rows: [
        { label: "Behaviour band", value: band.label },
        { label: "Years HMRC can assess", value: `${band.years} years`, strong: true },
        { label: "Estimated tax per year", value: gbp(annualTax) },
        { label: "Total estimated tax", value: gbp(totalTax), strong: true },
        { label: "Penalty range (min)", value: gbp(penaltyMin) },
        { label: "Penalty range (max)", value: gbp(penaltyMax), strong: true },
      ],
      note: "Interest on unpaid tax accrues from the original due date. Voluntary and prompted disclosure both reduce penalties. This is an illustrative range only.",
    };
  },
  explainer: {
    heading: "How HMRC assesses underpaid crypto tax",
    paragraphs: [
      "HMRC has published a Cryptoassets Manual and regularly issues nudge letters to individuals identified through exchange data sharing. The assessable window depends on behaviour: 4 years for reasonable care, 6 for careless, and up to 20 for deliberate concealment.",
      "Penalties are charged as a percentage of the unpaid tax. The rate depends on behaviour, whether disclosure was unprompted or prompted, and cooperation. Voluntary disclosure before HMRC raises an enquiry can reduce penalties significantly or to zero.",
      "This tool gives an illustrative range. A specialist will calculate the actual exposure from your transaction history and advise on the best disclosure route.",
    ],
  },
  faqs: [
    { question: "What triggers an HMRC crypto nudge letter?", answer: "HMRC receives data from UK and international exchanges under existing tax information exchange agreements and, from 2027, under CARF. They match that data against Self Assessment records and issue nudge letters to individuals who appear to have unreported gains." },
    { question: "Is it better to disclose voluntarily?", answer: "Yes. Voluntary unprompted disclosure attracts the lowest penalty rates, and in the reasonable care band can result in zero penalty. Once HMRC opens an enquiry, the disclosure is prompted and penalties are higher." },
  ],
};
