import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// House position 31 / rates_ledger key disclosure_years_by_behaviour: the number
// of past years is 4 / 6 / 20 by behaviour. HP31 also says penalty percentages
// must be presented as ranges sourced to HMRC's penalty guidance and that an
// exact percentage must NOT be asserted without re-verification at build time,
// so this tool states the penalty position in words and links out. It does not
// compute a penalty figure.
const HMRC_PENALTY_GUIDANCE = "https://www.gov.uk/guidance/tell-hmrc-about-unpaid-tax-on-cryptoassets";

const BANDS = [
  {
    value: "reasonable",
    label: "Reasonable care (no penalty)",
    years: 4,
    penalty: "No penalty where you genuinely took reasonable care. Tax and interest are still due.",
  },
  {
    value: "careless",
    label: "Careless",
    years: 6,
    penalty: "A percentage of the tax due, lowest where the disclosure is unprompted.",
  },
  {
    value: "deliberate",
    label: "Deliberate",
    years: 20,
    penalty: "A higher percentage of the tax due, higher again where the error was concealed.",
  },
];

export const cryptoDisclosureEstimator: GenericTool = {
  kind: "generic",
  slug: "crypto-disclosure-estimator",
  name: "Crypto Disclosure Scope Estimator",
  category: "HMRC Disclosure",
  oneLiner: "Illustrate the scope of an HMRC crypto disclosure: how many past years are assessable, and the tax at stake, by behaviour band.",
  metaTitle: "Crypto HMRC Disclosure Estimator | Crypto Tax Partners",
  metaDescription: "Estimate the scope of an HMRC cryptoasset disclosure: assessable years (4, 6 or 20) and the total unpaid tax by behaviour band. Penalties are set by HMRC and shown as a described position, not a figure.",
  intro: "Select your HMRC behaviour band and enter an estimate of annual unpaid tax. The tool shows how many past years HMRC can assess and the total tax at stake. Penalties are charged separately as a percentage of that tax, so the tool describes the penalty position rather than putting a figure on it.",
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

    return {
      headline: { label: "Estimated total tax exposure", value: gbp(totalTax), sub: `Over ${band.years} assessable years (${band.label} band)` },
      rows: [
        { label: "Behaviour band", value: band.label },
        { label: "Years HMRC can assess", value: `${band.years} years`, strong: true },
        { label: "Estimated tax per year", value: gbp(annualTax) },
        { label: "Total estimated tax", value: gbp(totalTax), strong: true },
      ],
      note: `This figure is tax only. Interest accrues on unpaid tax from the original due date, and any penalty is charged separately as a percentage of the tax due. ${band.penalty} The exact percentage depends on behaviour, on whether the disclosure is unprompted or prompted, and on cooperation, so this tool does not estimate one. HMRC's current rates are set out at ${HMRC_PENALTY_GUIDANCE}.`,
    };
  },
  explainer: {
    heading: "How HMRC assesses underpaid crypto tax",
    paragraphs: [
      "HMRC has published a Cryptoassets Manual and regularly issues nudge letters to individuals identified through exchange data sharing. The assessable window depends on behaviour: 4 years for reasonable care, 6 years for careless, and 20 years for deliberate behaviour.",
      "Penalties are charged separately, as a percentage of the unpaid tax. The percentage depends on behaviour, on whether the disclosure was unprompted or prompted, and on cooperation. Because HMRC sets and revises those percentages, this tool does not estimate one: check the current rates in HMRC's guidance on telling HMRC about unpaid tax on cryptoassets.",
      "This tool gives an illustrative scope, not a filing figure. A specialist will calculate the actual exposure from your transaction history and advise on the best disclosure route.",
    ],
  },
  faqs: [
    { question: "What triggers an HMRC crypto nudge letter?", answer: "HMRC receives data from UK and international exchanges under existing tax information exchange agreements and, from 2027, under CARF. They match that data against Self Assessment records and issue nudge letters to individuals who appear to have unreported gains." },
    { question: "Is it better to disclose voluntarily?", answer: "Yes. An unprompted disclosure, made before HMRC contacts you, attracts the lowest penalty rates. Once HMRC opens an enquiry the disclosure is prompted and the penalty rates are higher. Where you genuinely took reasonable care, no penalty arises on the error at all, although the tax and interest remain due." },
  ],
};
