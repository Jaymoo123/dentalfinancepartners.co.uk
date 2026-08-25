import type { GenericTool, CalcResultRow } from "../types";
import { gbp } from "../format";

// Merged scheme (periods beginning on/after 1 Apr 2024): 20% above-the-line credit,
// taxed as income, so the net cash benefit depends on the company's Corporation Tax
// rate. Presented as a range across the 19% small-profits and 25% main rate bands.
const MERGED_CREDIT_RATE = 0.20;
const CT_SMALL_RATE = 0.19;
const CT_MAIN_RATE = 0.25;

// ERIS (Enhanced R&D Intensive Support): loss-making SME, qualifying R&D >= 30% of
// total expenditure. 86% uplift on qualifying spend, then a 14.5% payable credit on
// the surrenderable loss. This is a cash payment, not adjusted by the CT rate.
const ERIS_UPLIFT = 1.86; // spend + 86% uplift
const ERIS_CREDIT_RATE = 0.145;

export const rdTaxCreditCalculator: GenericTool = {
  kind: "generic",
  slug: "rd-tax-credit-calculator",
  name: "R&D Tax Credit Calculator",
  category: "Specialist Tax",
  oneLiner:
    "Estimated R&D tax relief under the merged scheme or ERIS, from your qualifying R&D spend.",
  metaTitle: "R&D Tax Credit Calculator | Merged Scheme & ERIS (UK 2026/27)",
  metaDescription:
    "Free R&D tax credit calculator. Estimate your benefit under the merged 20% scheme or the ERIS rate for loss-making, R&D-intensive SMEs.",
  intro:
    "Estimate the R&D tax relief a company could claim under the merged scheme, or the ERIS rate if it is loss-making and R&D-intensive.",
  ctaLabel: "Get a specialist to validate this and prepare the claim →",
  embedHeight: 620,
  fields: [
    {
      id: "profitStatus",
      label: "Is the company profit-making or loss-making?",
      type: "select",
      default: "profit",
      options: [
        { value: "profit", label: "Profit-making" },
        { value: "loss", label: "Loss-making" },
      ],
    },
    {
      id: "rdIntensive",
      label: "R&D-intensive (qualifying R&D spend is 30% or more of total expenditure)?",
      type: "toggle",
      default: false,
      help: "Only relevant if loss-making. Meeting the intensity test opens the more generous ERIS rate instead of the merged scheme.",
    },
    {
      id: "qualifyingSpend",
      label: "Qualifying R&D expenditure (£)",
      type: "currency",
      default: 100_000,
      help: "Staff costs, subcontractors, consumables and software directly attributable to qualifying R&D activity.",
    },
  ],
  compute: (v) => {
    const spend = Number(v.qualifyingSpend);
    const lossmaking = String(v.profitStatus) === "loss";
    const erisEligible = lossmaking && Boolean(v.rdIntensive);

    const credit = spend * MERGED_CREDIT_RATE;
    const netAtMain = credit * (1 - CT_MAIN_RATE);
    const netAtSmall = credit * (1 - CT_SMALL_RATE);

    const rows: CalcResultRow[] = [{ label: "Qualifying R&D spend", value: gbp(spend) }];

    if (erisEligible) {
      const uplifted = spend * ERIS_UPLIFT;
      const erisCredit = uplifted * ERIS_CREDIT_RATE;
      rows.push(
        { label: "Enhanced expenditure (86% uplift)", value: gbp(uplifted) },
        { label: "ERIS payable credit (14.5%)", value: gbp(erisCredit), strong: true },
        { label: "Alternative: merged scheme net benefit", value: `${gbp(netAtMain)} to ${gbp(netAtSmall)}` },
      );
      return {
        headline: {
          label: "Estimated ERIS payable credit",
          value: gbp(erisCredit),
          sub: `About ${((erisCredit / spend) * 100).toFixed(1)}% of qualifying spend`,
        },
        rows,
        note: "Estimates only. ERIS is a cash payment even where the company has no tax to pay, but the qualifying conditions (loss-making, the 30% R&D-intensity test, connected-party and subcontractor restrictions) are detailed. Confirm eligibility and prepare the claim with a specialist before relying on these figures.",
      };
    }

    rows.push(
      { label: "20% above-the-line credit", value: gbp(credit) },
      { label: "Net benefit at 25% Corporation Tax (main rate)", value: gbp(netAtMain) },
      { label: "Net benefit at 19% Corporation Tax (small profits)", value: gbp(netAtSmall), strong: true },
    );
    return {
      headline: {
        label: "Estimated net benefit (merged scheme)",
        value: `${gbp(netAtMain)} to ${gbp(netAtSmall)}`,
        sub: "The range depends on your Corporation Tax rate",
      },
      rows,
      note: "Estimates only, for periods beginning on or after 1 April 2024 under the merged R&D scheme. The credit is taxable, so the net cash benefit is roughly 15% to 16.2% of qualifying spend depending on your CT rate band. Figures are estimates, confirm with a specialist before submitting a claim.",
    };
  },
  explainer: {
    heading: "How R&D tax credits work under the merged scheme",
    paragraphs: [
      "Since accounting periods beginning on or after 1 April 2024, most companies claim R&D relief through a single merged scheme rather than the old separate SME and RDEC rules. The merged scheme gives an above-the-line credit worth 20% of qualifying R&D expenditure. That credit is itself taxable, so the cash benefit you actually keep depends on your Corporation Tax rate, roughly 15% of spend at the 25% main rate and up to about 16.2% at the 19% small-profits rate.",
      "A loss-making company that is also R&D-intensive, meaning qualifying R&D spend is 30% or more of total expenditure, can instead claim under Enhanced R&D Intensive Support (ERIS). ERIS uplifts qualifying spend by 86% and pays out 14.5% of the resulting surrenderable loss as a cash credit, worth up to around 27% of the original spend. Unlike the merged scheme credit, the ERIS payment is not reduced by Corporation Tax, which is why it is significantly more generous for qualifying loss-making SMEs.",
      "Qualifying expenditure covers staff costs, subcontractor and externally provided worker costs (subject to restrictions), consumables, software and some data and cloud computing costs, where the work resolves genuine scientific or technological uncertainty as set out in the DSIT/BIS Guidelines. Every claim must also be supported by an Additional Information Form submitted to HMRC before the CT600L return.",
      "The rules on qualifying activity, subcontractor restrictions, connected-party rules and the intensity test are detailed, and getting them wrong risks an HMRC enquiry. This calculator gives a rough estimate only; a specialist R&D adviser will confirm what actually qualifies and prepare the claim.",
    ],
  },
  faqs: [
    {
      question: "How is the R&D credit calculated under the merged scheme?",
      answer:
        "The credit is 20% of qualifying R&D expenditure, paid above the line and taxed as income. After Corporation Tax, the net cash benefit works out at roughly 15% of spend at the 25% main rate, up to about 16.2% at the 19% small-profits rate.",
    },
    {
      question: "What is ERIS and do I qualify?",
      answer:
        "Enhanced R&D Intensive Support (ERIS) is a more generous rate for loss-making SMEs whose qualifying R&D spend is 30% or more of total expenditure. It uplifts qualifying spend by 86% and pays 14.5% of the resulting loss as cash, worth up to around 27% of the original spend.",
    },
    {
      question: "Is this the SME or RDEC scheme now?",
      answer:
        "Neither, on its own. For accounting periods beginning on or after 1 April 2024, the old separate SME and RDEC schemes were replaced by a single merged scheme, with ERIS as a targeted top-up for loss-making, R&D-intensive SMEs.",
    },
    {
      question: "What counts as qualifying R&D spend?",
      answer:
        "Staff costs, subcontractor and externally provided worker costs (subject to restrictions), consumables, software, and some data and cloud computing costs, where they relate directly to work resolving a genuine scientific or technological uncertainty.",
    },
    {
      question: "Do I need the Additional Information Form?",
      answer:
        "Yes. HMRC requires an Additional Information Form to be submitted before your Corporation Tax return for every R&D claim, setting out the qualifying projects and costs. A claim submitted without one will be rejected.",
    },
    {
      question: "How accurate is this estimate?",
      answer:
        "It is a rough guide only, based on the headline merged-scheme and ERIS rates applied to your qualifying spend. It does not check subcontractor restrictions, connected-party rules or whether your activity actually qualifies. A specialist review confirms the real figure before you claim.",
    },
  ],
};
