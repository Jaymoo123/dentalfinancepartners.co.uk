import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

/**
 * MTD ITSA mandation thresholds, verified July 2026.
 * Qualifying income = combined GROSS self-employment turnover + gross property
 * income (before any expenses), as reported on the Self Assessment return.
 * Sources: FA 2025 / HMRC MTD ITSA guidance. The April 2028 wave is announced
 * policy (Spring Statement 2025) and not yet in regulations.
 */
const WAVES = [
  { from: "6 April 2026", threshold: 50000, enacted: true, basisYear: "2024/25" },
  { from: "6 April 2027", threshold: 30000, enacted: true, basisYear: "2025/26" },
  { from: "6 April 2028", threshold: 20000, enacted: false, basisYear: "2026/27" },
] as const;

export const mtdItsaTool: GenericTool = {
  kind: "generic",
  slug: "mtd-itsa-readiness",
  name: "MTD ITSA Readiness Checker",
  category: "Self Assessment",
  oneLiner:
    "Enter your self-employment and property income to find your Making Tax Digital start date, what you must file each quarter, and whether an exemption applies.",
  embedHeight: 620,
  metaTitle: "MTD ITSA Readiness Checker | When Does Making Tax Digital Apply to You?",
  metaDescription:
    "Free MTD for Income Tax checker. Enter self-employment and property income to get your mandation date (April 2026, 2027 or 2028), quarterly filing obligations and software checklist.",
  intro:
    "Making Tax Digital for Income Tax replaces the annual Self Assessment tax return with digital record keeping and quarterly updates. It starts in April 2026 for the highest earners and rolls down in two further waves. The threshold is your gross income before expenses, not your profit, which catches many people who assume they are below the line. Enter your income sources below to see when you are mandated, what you will have to file, and whether one of the narrow exemptions applies.",
  ctaLabel: "Get help preparing for MTD",
  fields: [
    {
      id: "seTurnover",
      label: "Self-employment turnover (gross, before expenses)",
      type: "currency",
      default: 40000,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Total sales/fees across ALL sole trader businesses, before deducting any costs. Use the figure from box 15 of your SA103, not your profit.",
    },
    {
      id: "propertyIncome",
      label: "Property income (gross rents, before expenses)",
      type: "currency",
      default: 0,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Total rents received across all UK and overseas properties, before mortgage interest, agent fees or repairs. Your share only, if jointly owned.",
    },
    {
      id: "fosterCarer",
      label: "Are you a foster carer (qualifying care relief)?",
      type: "toggle",
      default: false,
      advanced: true,
      help: "Income within qualifying care relief is excluded from MTD ITSA entirely.",
    },
    {
      id: "noNino",
      label: "Do you have no National Insurance number?",
      type: "toggle",
      default: false,
      advanced: true,
      help: "People without a NINO on 31 January before the tax year are exempt for that year.",
    },
    {
      id: "digitallyExcluded",
      label: "Approved digital exclusion exemption from HMRC?",
      type: "toggle",
      default: false,
      advanced: true,
      help: "Age, disability, location or religion can qualify, but you must APPLY to HMRC and be approved. Not automatic.",
    },
  ],
  compute(values) {
    const se = Number(values.seTurnover) || 0;
    const prop = Number(values.propertyIncome) || 0;
    const qualifying = se + prop;
    const sources = (se > 0 ? 1 : 0) + (prop > 0 ? 1 : 0);

    const exemption = values.fosterCarer
      ? "Foster carers: income within qualifying care relief does not count towards the threshold, so most foster carers are outside MTD ITSA."
      : values.noNino
        ? "No National Insurance number: you are exempt for any tax year where you had no NINO on the preceding 31 January."
        : values.digitallyExcluded
          ? "Digital exclusion: with an approved HMRC exemption you continue filing an annual Self Assessment return instead."
          : null;

    if (exemption) {
      return {
        headline: { label: "MTD ITSA status", value: "Exempt" },
        verdict: { text: "Exempt from MTD ITSA", positive: true },
        rows: [
          { label: "Qualifying income entered", value: gbp(qualifying) },
          { label: "Digital records required", value: "No" },
          { label: "Quarterly updates", value: "None" },
          { label: "You continue to file", value: "Annual Self Assessment return", strong: true },
        ],
        note: exemption + " If your circumstances change, re-check against the thresholds: over £50,000 mandates from April 2026, over £30,000 from April 2027, and over £20,000 from April 2028 (announced).",
      };
    }

    const wave = WAVES.find((w) => qualifying > w.threshold);

    if (!wave) {
      return {
        headline: { label: "MTD ITSA status", value: "Not mandated" },
        verdict: { text: "Not mandated (yet)", positive: true },
        rows: [
          { label: "Your qualifying income", value: gbp(qualifying), strong: true },
          { label: "Lowest announced threshold", value: "£20,000 from April 2028" },
          { label: "Headroom below that threshold", value: gbp(Math.max(0, 20000 - qualifying)) },
          { label: "You continue to file", value: "Annual Self Assessment return" },
        ],
        note: "Your gross income is at or below every announced threshold, so you stay on annual Self Assessment for now. The government has signalled the threshold may fall further, and you can join MTD ITSA voluntarily to spread the admin. Remember the test is GROSS income: a good year that pushes turnover over a threshold mandates you from the April after the relevant return is filed.",
      };
    }

    const quarterly = sources * 4;
    return {
      headline: { label: "Your MTD ITSA start date", value: wave.from },
      verdict: { text: `Mandated from ${wave.from}`, positive: false },
      rows: [
        { label: "Your qualifying income (gross)", value: gbp(qualifying), strong: true },
        { label: "Threshold crossed", value: `over ${gbp(wave.threshold)}` },
        { label: "Income sources in scope", value: String(sources) },
        { label: "Digital records", value: "Required from your start date" },
        { label: "Quarterly updates per year", value: `${quarterly} (4 per source)`, strong: true },
        { label: "Year-end final declaration", value: "1 (replaces the tax return)" },
      ],
      note:
        (wave.enacted
          ? `Mandation is tested against the qualifying income on your ${wave.basisYear} Self Assessment return. `
          : `The ${gbp(wave.threshold)} threshold was announced at Spring Statement 2025 but is not yet in regulations, so treat this date as planned rather than fixed. `) +
        "You will need MTD-compatible software (or bridging software) before your first quarter: standard quarters run to 5 July, 5 October, 5 January and 5 April, each with a filing deadline a month and 2 days later. Late quarterly updates earn penalty points, and 4 points triggers a £200 fine, with further £200 fines for each late submission after that.",
    };
  },
  explainer: {
    heading: "How the checker works, and two worked examples",
    paragraphs: [
      "MTD ITSA applies to sole traders and landlords whose combined gross income from self-employment and property exceeds the mandation threshold. The test uses turnover and gross rents before any expenses, taken from your Self Assessment return, not your taxable profit. The waves are: over £50,000 mandated from 6 April 2026 (tested on the 2024/25 return), over £30,000 from 6 April 2027 (tested on 2025/26), and over £20,000 from 6 April 2028, which is announced government policy but not yet in regulations. Limited companies, and partnerships for now, are outside MTD ITSA.",
      "Once mandated you must keep digital records, send a quarterly update for each income source through MTD-compatible software, and file a year-end final declaration in place of the traditional return. That means a sole trader who also lets a flat files 8 quarterly updates a year plus the final declaration. The quarterly updates are simple totals of income and expenses, not 4 mini tax returns, but they do require software: spreadsheets alone only work with bridging software on top.",
      "Worked example 1: a plumber with £42,000 of turnover and £14,000 of gross rent from one buy-to-let has qualifying income of £56,000. That is over £50,000, so mandation starts 6 April 2026, with 8 quarterly updates a year (4 for the trade, 4 for the property) plus the final declaration. Note the trap: the plumber's combined profit might only be £30,000, but profit is irrelevant, the test is gross.",
      "Worked example 2: a freelance designer with £34,000 of turnover and no property income is under £50,000 but over £30,000, so mandation starts 6 April 2027, tested on the 2025/26 return. Obligations: 4 quarterly updates a year for the single self-employment source, digital records, and the year-end final declaration. If turnover dropped to £19,000, no announced wave would apply and annual Self Assessment continues.",
      "Exemptions are narrow. Foster carers within qualifying care relief are excluded, people without a National Insurance number are exempt year by year, and the digitally excluded (through age, disability, location or religious belief) can apply to HMRC for exemption, but it must be applied for and approved, it is not automatic. Everyone else who crosses a threshold is in.",
    ],
  },
  faqs: [
    {
      question: "Is the MTD ITSA threshold based on profit or turnover?",
      answer:
        "Turnover. The test is your gross qualifying income, meaning self-employment turnover plus gross property income before any expenses are deducted. A landlord with £52,000 of rent and £40,000 of mortgage interest and costs still crosses the £50,000 threshold, even though the profit is £12,000.",
    },
    {
      question: "Do self-employment and property income get added together?",
      answer:
        "Yes. The threshold applies to the combined total across all your sole trader businesses and all your property income. £28,000 of turnover plus £24,000 of rent is £52,000 of qualifying income, which mandates you from April 2026 even though neither source crosses a threshold on its own.",
    },
    {
      question: "What exactly do I have to file each quarter?",
      answer:
        "A quarterly update per income source: cumulative totals of income and expenses for the year to date, sent through MTD-compatible software. Standard quarters end 5 July, 5 October, 5 January and 5 April, with each update due a month and 2 days after the quarter end (7 August, 7 November, 7 February and 7 May). No tax is paid quarterly; payment dates are unchanged.",
    },
    {
      question: "Can I keep using a spreadsheet?",
      answer:
        "Only with bridging software that links the spreadsheet digitally to HMRC. The records themselves must be digital and the transfer to HMRC must happen without manual retyping. Most people find dedicated MTD software (many packages have sub £10 per month tiers, and some free tiers exist for single-source landlords) simpler than maintaining a bridged spreadsheet.",
    },
    {
      question: "What happens if I file a quarterly update late?",
      answer:
        "MTD ITSA uses a points-based penalty system. Each late submission earns one penalty point, and once you reach 4 points HMRC charges a £200 penalty, with a further £200 for every subsequent late submission until a period of full compliance resets the points. Late payment penalties are separate and unchanged.",
    },
    {
      question: "Is the April 2028 £20,000 threshold definite?",
      answer:
        "Not yet. It was announced at Spring Statement 2025 as government policy but the regulations have not been laid, so the date and threshold could still move. The £50,000 (April 2026) and £30,000 (April 2027) waves are legislated and fixed. If your income is between £20,000 and £30,000, plan for April 2028 but watch for confirmation.",
    },
  ],
  related: [
    { label: "Take-home pay calculator", href: "/calculators/take-home-pay-calculator" },
    { label: "VAT scheme comparator", href: "/calculators/vat-scheme-comparator" },
  ],
};
