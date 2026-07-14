import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

/**
 * SEIS / EIS investor relief calculator.
 *
 * Rates anchored to house_positions.md (HP8, HP10, HP30).
 * HP8:  SEIS 50% IT relief on <= £200,000/yr; 50% CGT reinvestment exemption.
 *       https://www.gov.uk/guidance/seed-enterprise-investment-scheme-background
 * HP10: EIS  30% IT relief on <= £1,000,000/yr (£2m where excess is in KIC).
 *       https://www.gov.uk/guidance/venture-capital-schemes-tax-relief-for-investors
 * HP11: Advance assurance CTA.
 *       https://www.gov.uk/guidance/venture-capital-schemes-apply-for-advance-assurance
 * HP30: IT bands 2026/27 — basic 20% to £50,270; higher 40% to £125,140; additional 45% above.
 *       https://www.gov.uk/income-tax-rates
 *
 * Regulated-advice boundary: every result carries the not-advice disclaimer.
 * This tool is a general tax illustration only, not investment advice.
 */

// HP8 / HP10 investor annual caps
const SEIS_CAP = 200_000;  // HP8
const EIS_CAP  = 1_000_000; // HP10 (base; £2m KIC extension flagged as note, not auto-applied)
const SEIS_RATE = 0.50; // HP8
const EIS_RATE  = 0.30; // HP10

function computeRelief(I: number, isSeis: boolean): { relief: number; capped: boolean } {
  const cap   = isSeis ? SEIS_CAP : EIS_CAP;
  const rate  = isSeis ? SEIS_RATE : EIS_RATE;
  const capped = I > cap;
  const relief = Math.round(Math.min(I, cap) * rate);
  return { relief, capped };
}

export const seisEisReliefCalculator: GenericTool = {
  kind: "generic",
  slug: "seis-eis-relief-calculator",
  name: "SEIS and EIS Relief Calculator 2026/27",
  category: "SEIS and EIS",
  oneLiner:
    "Estimate the income tax relief, CGT position and worst-case net loss for a SEIS or EIS investment in 2026/27.",
  metaTitle: "SEIS EIS Tax Relief Calculator 2026/27",
  metaDescription:
    "Calculate SEIS (50% on up to £200k) and EIS (30% on up to £1m) income tax relief, net cost and worst-case capital at risk. 2026/27 rates. General illustration only.",
  intro:
    "Enter your investment details below. The tool shows the income tax relief, net cash cost, CGT position, and worst-case net loss if the company fails. This is a general tax illustration, not investment advice.",
  embedHeight: 520,
  fields: [
    {
      id: "investmentAmount",
      label: "Investment amount (£)",
      type: "currency",
      default: 10000,
      min: 0,
      help: "The amount you are investing under SEIS or EIS.",
    },
    {
      id: "scheme",
      label: "Scheme",
      type: "select",
      options: [
        { value: "seis", label: "SEIS (50% relief, up to £200,000/yr)" },
        { value: "eis",  label: "EIS (30% relief, up to £1,000,000/yr)" },
      ],
      default: "seis",
    },
    {
      id: "incomeTaxBand",
      label: "Your income tax band",
      type: "select",
      options: [
        { value: "0.20", label: "Basic rate (20%)" },
        { value: "0.40", label: "Higher rate (40%)" },
        { value: "0.45", label: "Additional rate (45%)" },
      ],
      default: "0.45",
      help:
        "Used only to calculate loss relief on failure. The IT relief rate itself is fixed at 50% (SEIS) or 30% (EIS) regardless of your band.",
    },
    {
      id: "gainReinvested",
      label: "Capital gain being reinvested (£, optional)",
      type: "currency",
      default: 0,
      min: 0,
      help:
        "SEIS: shows the 50% CGT reinvestment exemption on the gain. EIS: shows the CGT deferral available. Leave at 0 if not applicable.",
      advanced: true,
    },
  ],

  compute(v) {
    const I      = Math.max(0, Number(v.investmentAmount));
    const isSeis = String(v.scheme) === "seis";
    const band   = parseFloat(String(v.incomeTaxBand)) || 0.45;
    const G      = Math.max(0, Number(v.gainReinvested));

    // A. Income tax relief (HP8 / HP10) — rate is scheme-fixed, not band-scaled
    const { relief, capped } = computeRelief(I, isSeis);
    const schemeName = isSeis ? "SEIS" : "EIS";
    const reliefRate = isSeis ? "50%" : "30%";
    const cap        = isSeis ? SEIS_CAP : EIS_CAP;

    // B. Net cost after IT relief
    const netCost = I - relief;

    // D. Loss relief on failure (loss relief is on net cost, not gross investment)
    // ponytail: loss relief computed on netCost; do NOT apply band to gross I
    const lossReliefValue  = Math.round(netCost * band);
    const worstCaseNetLoss = Math.round(netCost * (1 - band));

    const bandLabel = band === 0.20 ? "basic rate (20%)" : band === 0.40 ? "higher rate (40%)" : "additional rate (45%)";

    // Build output rows
    const rows: { label: string; value: string; strong?: boolean }[] = [
      { label: "Investment amount", value: gbp(I) },
      {
        label: `${schemeName} income tax relief (${reliefRate})`,
        value: gbp(relief),
        strong: true,
      },
      { label: "Net cash cost after IT relief", value: gbp(netCost) },
    ];

    // C. CGT line — only when gain supplied
    let cgtNote = "";
    if (G > 0) {
      if (isSeis) {
        // HP8: 50% CGT reinvestment exemption on the reinvested gain (up to amount invested)
        const eligibleGain = Math.min(G, I);
        const exemptGain   = Math.round(eligibleGain * 0.50);
        rows.push({
          label: "SEIS CGT reinvestment exemption (50% of gain reinvested)",
          value: gbp(exemptGain),
        });
        cgtNote =
          `Of the ${gbp(G)} gain you are reinvesting, ${gbp(exemptGain)} is exempt from CGT ` +
          `(50% exemption on ${gbp(eligibleGain)} reinvested, capped at the amount invested). ` +
          `This is a reinvestment exemption, not a deferral. The CGT rate on the remaining gain ` +
          `depends on your circumstances (18%/24% on share disposals).`;
      } else {
        // HP10: EIS CGT deferral (not exemption)
        const deferrableGain = Math.min(G, I);
        rows.push({
          label: "EIS CGT deferral available",
          value: gbp(deferrableGain),
        });
        cgtNote =
          `Under EIS, ${gbp(deferrableGain)} of your capital gain can be deferred until the EIS ` +
          `shares are sold. This is a deferral, not an exemption. The deferred gain comes back ` +
          `into charge when the EIS shares are disposed of. EIS does not give a 50% ` +
          `CGT exemption; that mechanism applies to SEIS only.`;
      }
    }

    // D. Worst-case net loss (all reliefs applied on failure)
    rows.push({ label: `Loss relief on failure (${(band * 100).toFixed(0)}% of net cost)`, value: gbp(lossReliefValue) });
    rows.push({
      label: "Worst-case net loss (capital genuinely at risk)",
      value: gbp(worstCaseNetLoss),
      strong: true,
    });

    // Cap flags
    let capFlag = "";
    if (capped) {
      if (isSeis) {
        capFlag = `Your investment of ${gbp(I)} exceeds the SEIS annual investor limit of ${gbp(SEIS_CAP)}. Relief is calculated on ${gbp(SEIS_CAP)} only. The excess ${gbp(I - SEIS_CAP)} does not attract SEIS income tax relief.`;
      } else {
        capFlag = `Your investment of ${gbp(I)} exceeds the EIS base annual investor limit of ${gbp(EIS_CAP)}. Relief is calculated on ${gbp(EIS_CAP)} only. Where the excess is invested in a knowledge-intensive company, relief up to ${gbp(2_000_000)} may be available. Speak to a specialist to confirm KIC status.`;
      }
    }

    // KIC note for EIS (always surfaced for large EIS amounts, or flagged generally)
    const kicNote =
      !isSeis && !capped
        ? `The EIS annual limit rises to £2,000,000 where the amount above £1,000,000 is invested in a knowledge-intensive company. This tool applies the £1,000,000 base cap. Speak to a specialist to confirm KIC status.`
        : "";

    const disclaimerParts = [
      "This is a general tax illustration only, not investment advice, a recommendation to invest, or a financial promotion.",
      "Your actual relief depends on your personal tax position and the company meeting all SEIS/EIS qualifying conditions throughout the hold period.",
      "Income tax relief requires a sufficient income tax liability in the year of investment.",
      "Loss relief assumes the shares are disposed of at a loss and a claim is made. Confirm your position with a qualified tax adviser.",
    ];
    if (capFlag) disclaimerParts.unshift(capFlag);
    if (cgtNote) disclaimerParts.splice(1, 0, cgtNote);
    if (kicNote) disclaimerParts.push(kicNote);

    const note = disclaimerParts.join(" ");

    return {
      headline: {
        label: "Worst-case net loss (capital genuinely at risk)",
        value: gbp(worstCaseNetLoss),
        sub: `On a ${gbp(I)} ${schemeName} investment for a ${bandLabel} taxpayer`,
      },
      rows,
      note,
    };
  },

  explainer: {
    heading: "How SEIS and EIS investor relief works",
    paragraphs: [
      "SEIS gives a 50% income tax relief on investments of up to £200,000 per tax year. If you invest £10,000 under SEIS, you receive a £5,000 reduction in your income tax bill, bringing your net cost to £5,000. The shares must be held for at least three years for the relief to be retained.",
      "EIS gives 30% income tax relief on investments of up to £1,000,000 per tax year, rising to £2,000,000 where the excess above £1,000,000 is in a knowledge-intensive company. A £10,000 EIS investment returns £3,000 in income tax relief, leaving a net cost of £7,000.",
      "If the company fails, the investor can claim loss relief on the net cost (the amount invested minus the income tax relief already received) against their income at their marginal tax rate. For a 45% taxpayer who invested £10,000 under SEIS: the net cost is £5,000, loss relief is £2,250, and the worst-case net loss is £2,750. That figure represents the capital genuinely at risk from a £10,000 investment.",
      "The CGT treatments differ. SEIS provides a 50% reinvestment exemption on any capital gain reinvested: the gain is partially exempt, not merely deferred. EIS provides CGT deferral: the gain is deferred until the EIS shares are sold, not permanently exempt. Do not conflate the two mechanisms.",
      "This calculator shows a general tax illustration. It does not confirm that a company qualifies for SEIS or EIS, and it does not give investment advice. Every result is subject to your personal circumstances and HMRC's assessment of the company.",
    ],
  },

  faqs: [
    {
      question: "How much SEIS income tax relief can I claim?",
      answer:
        "50% of the amount invested, up to a maximum investment of £200,000 per tax year. On a £10,000 investment that is £5,000 relief, reducing your income tax bill by that amount.",
    },
    {
      question: "What is the SEIS annual investor limit?",
      answer:
        "£200,000 per tax year. Investments above this in a single tax year do not attract SEIS income tax relief on the excess.",
    },
    {
      question: "How much EIS relief on a £10,000 investment?",
      answer:
        "£3,000 (30% of £10,000). EIS relief is fixed at 30% regardless of your income tax band. The annual investor limit is £1,000,000, rising to £2,000,000 for knowledge-intensive companies.",
    },
    {
      question: "What is the difference between the SEIS CGT exemption and EIS CGT deferral?",
      answer:
        "Under SEIS, reinvesting a capital gain gives a 50% exemption on that gain; it is permanently extinguished. Under EIS, the gain is deferred until the EIS shares are sold, at which point it comes back into charge. SEIS exempts; EIS defers. The mechanisms are different.",
    },
    {
      question: "If the company fails, do I get loss relief?",
      answer:
        "Yes, in most cases. You can claim loss relief on the net cost of the shares (the amount invested minus the income tax relief already received) against your income at your marginal tax rate. For a 45% taxpayer investing £10,000 under SEIS: net cost £5,000, loss relief £2,250, worst-case net loss £2,750. The exact outcome depends on your personal tax position.",
    },
    {
      question: "Is this calculator investment advice?",
      answer:
        "No. This is a general tax illustration only. It does not confirm that any company qualifies for SEIS or EIS, does not constitute investment advice, and is not a financial promotion. Confirm your position with a qualified tax and investment adviser.",
    },
    {
      question: "What is knowledge-intensive company EIS relief?",
      answer:
        "EIS investors can invest up to £2,000,000 per tax year (instead of £1,000,000) where the amount above £1,000,000 is invested in a knowledge-intensive company. Knowledge-intensive status depends on HMRC criteria relating to R&D spend and skilled employees. This tool applies the £1,000,000 base cap; speak to a specialist to confirm KIC eligibility.",
    },
    {
      question: "How does a founder get SEIS or EIS advance assurance?",
      answer:
        "The company (not the investor) applies to HMRC for advance assurance before the share issue. HMRC pre-clears that the proposed round is likely to qualify. We handle advance assurance applications end to end.",
    },
  ],

  related: [
    { label: "SEIS vs EIS explained",                     href: "/blog/seis-and-eis/seis-vs-eis-explained" },
    { label: "SEIS company eligibility checklist",        href: "/blog/seis-and-eis/seis-company-checklist" },
    { label: "How to apply for SEIS/EIS advance assurance", href: "/blog/seis-and-eis/how-to-apply-for-seis-eis-advance-assurance" },
    { label: "SEIS1 and EIS1 compliance statements",      href: "/blog/seis-and-eis/seis1-eis1-compliance-statements" },
    { label: "SEIS and EIS advance assurance service",    href: "/services/seis-eis-advance-assurance" },
  ],
};
