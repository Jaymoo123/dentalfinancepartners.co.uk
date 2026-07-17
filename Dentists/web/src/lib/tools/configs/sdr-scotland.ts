import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

/**
 * Scotland SDR Remuneration Calculator
 *
 * NHS Scotland pays GDS dentists per item of service under the Statement of
 * Dental Remuneration (SDR, Determination I), plus capitation (children) and
 * continuing care (adults) payments — not UDAs. This tool estimates monthly
 * and annual gross NHS Scotland fees from a treatment mix and registered list,
 * and compares against an England UDA-equivalent gross.
 *
 * FEE DATA — dated config constants. SDR item fees are amended several times
 * a year via SDR amendment numbers published by NHS National Services
 * Scotland. Values below are REPRESENTATIVE of the simplified post-November
 * 2023 SDR item list and MUST be verified against the current Determination I
 * before any fee is relied on. All figures flagged for verification in the
 * build report.
 */

// ponytail: flat representative fees, not the full ~45-item Determination I schedule.
// Upgrade path: replace with a generated table from the current SDR PDF if item-level accuracy is requested.
export const SDR_FEES_AS_AT = "November 2025 SDR (representative values)";

const SDR_ITEM_FEES = {
  exam: 18.2, // comprehensive oral health assessment — VERIFY
  xray: 5.2, // intraoral radiograph, per film — VERIFY
  fillingSmall: 16.6, // permanent filling, one surface — VERIFY
  fillingLarge: 26.9, // permanent filling, two+ surfaces — VERIFY
  extraction: 15.4, // routine extraction, per tooth — VERIFY
  endo: 92.0, // molar root canal treatment — VERIFY
  crown: 132.0, // full crown, excluding lab element — VERIFY
  perio: 14.9, // scale/polish + periodontal maintenance — VERIFY
} as const;

// Continuing care (adults) and capitation (children) — per registered patient per month
const ADULT_CONTINUING_CARE_MONTHLY = 1.35; // VERIFY
const CHILD_CAPITATION_MONTHLY = 5.3; // VERIFY (varies by age band; blended value used)

export type SdrScotlandInput = {
  exam: number;
  xray: number;
  fillingSmall: number;
  fillingLarge: number;
  extraction: number;
  endo: number;
  crown: number;
  perio: number;
  adults: number;
  children: number;
  udas: number;
  udaRate: number;
};

export type SdrScotlandResult = {
  itemOfServiceMonthly: number;
  capitationMonthly: number;
  scotlandMonthly: number;
  scotlandAnnual: number;
  englandMonthly: number;
  englandAnnual: number;
  differenceAnnual: number;
};

export function calcSdrScotland(v: SdrScotlandInput): SdrScotlandResult {
  const itemOfServiceMonthly =
    v.exam * SDR_ITEM_FEES.exam +
    v.xray * SDR_ITEM_FEES.xray +
    v.fillingSmall * SDR_ITEM_FEES.fillingSmall +
    v.fillingLarge * SDR_ITEM_FEES.fillingLarge +
    v.extraction * SDR_ITEM_FEES.extraction +
    v.endo * SDR_ITEM_FEES.endo +
    v.crown * SDR_ITEM_FEES.crown +
    v.perio * SDR_ITEM_FEES.perio;
  const capitationMonthly =
    v.adults * ADULT_CONTINUING_CARE_MONTHLY + v.children * CHILD_CAPITATION_MONTHLY;
  const scotlandMonthly = itemOfServiceMonthly + capitationMonthly;
  const englandMonthly = v.udas * v.udaRate;
  return {
    itemOfServiceMonthly,
    capitationMonthly,
    scotlandMonthly,
    scotlandAnnual: scotlandMonthly * 12,
    englandMonthly,
    englandAnnual: englandMonthly * 12,
    differenceAnnual: scotlandMonthly * 12 - englandMonthly * 12,
  };
}

const countField = (id: string, label: string, def: number, help?: string) => ({
  id,
  label,
  type: "number" as const,
  default: def,
  min: 0,
  max: 2000,
  step: 1,
  help,
});

export const sdrScotlandTool: GenericTool = {
  kind: "generic",
  slug: "sdr-scotland",
  name: "Scotland SDR Remuneration Calculator",
  category: "NHS contracts",
  oneLiner:
    "Estimate your gross NHS Scotland fees from a monthly SDR treatment mix, plus capitation and continuing care, compared against an England UDA-equivalent.",
  embedHeight: 760,
  metaTitle: "Scotland SDR Remuneration Calculator | NHS Dental Fees Estimator",
  metaDescription:
    "Estimate gross NHS Scotland dental income under the Statement of Dental Remuneration. Enter your monthly item-of-service mix and registered list, then compare against England UDA earnings.",
  intro:
    `NHS Scotland pays general dental practitioners per item of service under the Statement of Dental Remuneration (SDR), plus continuing care payments for registered adults and capitation for registered children. There are no UDAs in Scotland. Enter a typical month of NHS treatment and your registered list size, and this calculator estimates your gross NHS Scotland fees. Add an England UDA count and rate to see the equivalent gross under the English contract. Fee values are representative of the ${SDR_FEES_AS_AT}; the SDR is amended several times a year, so always check the current Determination I published by NHS National Services Scotland before relying on any single figure.`,
  fields: [
    countField("exam", "Examinations / oral health assessments per month", 120),
    countField("xray", "Intraoral radiographs per month", 60),
    countField("fillingSmall", "Fillings, one surface, per month", 50),
    countField("fillingLarge", "Fillings, two or more surfaces, per month", 30),
    countField("extraction", "Routine extractions per month", 12),
    countField("endo", "Molar root canal treatments per month", 4),
    countField("crown", "Crowns per month (fee element, excluding lab)", 5),
    countField("perio", "Scale and polish / periodontal visits per month", 90),
    countField(
      "adults",
      "Registered adults (continuing care)",
      1400,
      "Adults on your NHS list attract a monthly continuing care payment.",
    ),
    countField(
      "children",
      "Registered children (capitation)",
      400,
      "Children attract a monthly capitation payment that varies by age; a blended rate is used here.",
    ),
    {
      id: "udas",
      label: "England comparison: UDAs delivered per month",
      type: "number",
      default: 250,
      min: 0,
      max: 5000,
      step: 10,
      advanced: true,
      help: "Roughly 3,000 UDAs a year is a typical full-time associate allocation, about 250 a month.",
    },
    {
      id: "udaRate",
      label: "England comparison: UDA rate (£)",
      type: "currency",
      default: 30,
      min: 0,
      max: 100,
      step: 1,
      advanced: true,
      help: "Typical English GDS contract UDA values run roughly £25 to £35.",
    },
  ],
  compute(values) {
    const n = (id: keyof SdrScotlandInput) => Number(values[id]) || 0;
    const r = calcSdrScotland({
      exam: n("exam"),
      xray: n("xray"),
      fillingSmall: n("fillingSmall"),
      fillingLarge: n("fillingLarge"),
      extraction: n("extraction"),
      endo: n("endo"),
      crown: n("crown"),
      perio: n("perio"),
      adults: n("adults"),
      children: n("children"),
      udas: n("udas"),
      udaRate: n("udaRate"),
    });
    return {
      headline: {
        label: "Estimated gross NHS Scotland fees",
        value: gbp(r.scotlandAnnual),
        sub: `${gbp(r.scotlandMonthly)} per month, item of service plus capitation and continuing care`,
      },
      rows: [
        { label: "Item-of-service fees (monthly)", value: gbp(r.itemOfServiceMonthly) },
        { label: "Capitation and continuing care (monthly)", value: gbp(r.capitationMonthly) },
        { label: "NHS Scotland gross (monthly)", value: gbp(r.scotlandMonthly), strong: true },
        { label: "England UDA-equivalent gross (annual)", value: gbp(r.englandAnnual) },
        {
          label:
            r.differenceAnnual >= 0
              ? "Scotland ahead of England equivalent by"
              : "Scotland behind England equivalent by",
          value: gbp(Math.abs(r.differenceAnnual)),
          strong: true,
        },
      ],
      note: `Estimate only, using representative fee values as at the ${SDR_FEES_AS_AT}. Actual SDR fees are set per item code in Determination I and are amended during the year. Crown and laboratory items attract separate lab fees not modelled here, and the calculation is gross fees before superannuation, laboratory costs and practice expenses.`,
    };
  },
  explainer: {
    heading: "How NHS Scotland SDR remuneration works",
    paragraphs: [
      "Scotland never adopted the 2006 English UDA contract. NHS general dental services in Scotland are still paid per item of service under the Statement of Dental Remuneration (SDR). Every treatment has an item code and a fee set out in Determination I of the SDR, published and amended by NHS National Services Scotland. From November 2023 the item list was simplified to around 45 items with enhanced fees, but the item-of-service principle is unchanged: the more clinically necessary treatment you deliver, the more you gross.",
      "On top of item fees, practices receive monthly continuing care payments for every registered adult and capitation payments for every registered child (rates vary by the child's age). A practice with a large, stable registered list earns a meaningful baseline before any treatment is delivered. This calculator adds your item-of-service month to that registration income to estimate total gross NHS fees.",
      "Worked example 1, an established mixed-list associate. 120 exams, 60 radiographs, 50 one-surface fillings, 30 larger fillings, 12 extractions, 4 molar root canals, 5 crowns and 90 periodontal visits generates roughly £6,700 of item-of-service fees in the month at representative fee levels. A registered list of 1,400 adults and 400 children adds roughly £4,000 of continuing care and capitation, giving a monthly NHS gross of around £10,700 and an annual gross of around £128,000.",
      "Worked example 2, the England comparison. The same clinician delivering 250 UDAs a month at a £30 UDA rate would gross £7,500 a month, £90,000 a year, under the English contract. Against the Scottish figure above, the item-of-service model is roughly £38,000 a year ahead for this treatment mix, which is why high-activity, high-registration Scottish practices often compare favourably with mid-range English UDA contracts. Change the mix and the comparison can easily flip: a low-registration list doing mostly examinations narrows the gap quickly.",
      `Fees shown are representative values as at the ${SDR_FEES_AS_AT}. The SDR is a live document: amendment numbers are issued through the year and fee uplifts are negotiated annually. Use this tool for planning and comparison, then verify individual item fees against the current Determination I before quoting or budgeting on them.`,
    ],
  },
  faqs: [
    {
      question: "What is the Statement of Dental Remuneration (SDR)?",
      answer:
        "The SDR is the document that sets out how NHS Scotland pays general dental practitioners. Determination I lists every treatment item and its fee, and other Determinations cover allowances, capitation and continuing care rates. It is published by NHS National Services Scotland and amended several times a year, so practitioners should always work from the current amendment number.",
    },
    {
      question: "Does Scotland use UDAs like England?",
      answer:
        "No. UDAs only exist under the English and Welsh GDS contracts introduced in 2006. Scotland retained a fee-per-item model, so a Scottish NHS dentist is paid for each examination, filling, extraction or crown individually, plus registration-based capitation and continuing care payments. That makes Scottish NHS gross income activity-sensitive in a way English UDA contracts are not.",
    },
    {
      question: "What changed in the November 2023 SDR reform?",
      answer:
        "From 1 November 2023 the Scottish Government simplified the SDR from several hundred item codes to a list of around 45 items, with enhanced fees intended to better reflect the cost of delivering care. The item-of-service principle was retained. Because fees were rebased at that point, any pre-2023 fee schedule you have saved is out of date.",
    },
    {
      question: "How do continuing care and capitation payments work?",
      answer:
        "Practices receive a small monthly payment for every patient registered with them: continuing care payments for adults and capitation payments for children, with child rates varying by age band. Individually the amounts look modest, but across a list of one or two thousand registered patients they form a stable monthly income floor independent of treatment activity.",
    },
    {
      question: "Is the Scotland versus England comparison in this tool exact?",
      answer:
        "No, it is a planning comparison. The English figure is simply UDAs multiplied by your UDA rate, and the Scottish figure uses representative SDR fees rather than the exact current Determination I values. It also ignores differences in patient charge revenue collection, laboratory fees, superannuation treatment and practice allowances. It is designed to show the shape of the difference between the two models for your treatment mix, not to reconcile to a schedule payment.",
    },
    {
      question: "Are these the current SDR fees?",
      answer:
        "The fee values in this calculator are representative of the SDR as at the date shown on the page. The SDR is amended several times a year and annual fee uplifts are negotiated, so individual item fees will drift from the values used here. Check the current Determination I on the NHS National Services Scotland Scottish Dental website before relying on any specific item fee, and speak to a dental accountant about what your gross means for take-home pay.",
    },
  ],
  related: [
    { label: "UDA Value Calculator", href: "/calculators/uda-value" },
    { label: "Associate Take-Home Calculator", href: "/calculators/associate-take-home" },
  ],
};
