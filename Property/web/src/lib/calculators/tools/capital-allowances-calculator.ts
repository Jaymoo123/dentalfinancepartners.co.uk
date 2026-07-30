import type { GenericTool, CalcResultRow } from "../types";
import { gbp } from "../format";

// Sector embedded-allowance midpoints (share of purchase price / fit-out spend that
// is typically claimable plant, integral features and fixtures). Source: cluster
// anti-sameness matrix, docs/_engines specialist-tax brief, 2026-07-30.
const SECTOR_PCT: Record<string, number> = {
  industrial: 0.08,
  hotels: 0.30,
  dental: 0.35,
  care: 0.30,
  offices: 0.20,
  gp: 0.25,
  hospitality: 0.30,
  student: 0.10,
  pubs: 0.32,
  other: 0.20,
};

const SECTOR_LABEL: Record<string, string> = {
  industrial: "industrial units",
  hotels: "hotels",
  dental: "dental practices",
  care: "care homes",
  offices: "offices",
  gp: "GP surgeries",
  hospitality: "hospitality (cafes, QSR, bars, leisure)",
  student: "student accommodation",
  pubs: "pubs and restaurants",
  other: "other commercial property",
};

const AIA_CAP = 1_000_000;
const MAIN_POOL_SHARE = 0.6;
const SPECIAL_RATE_SHARE = 0.4;

export const capitalAllowancesCalculator: GenericTool = {
  kind: "generic",
  slug: "capital-allowances-calculator",
  name: "Capital Allowances Calculator",
  category: "Specialist Tax",
  oneLiner:
    "Estimated embedded capital allowances in a commercial property, by sector, with year-1 relief and CT saving.",
  metaTitle: "Capital Allowances Calculator | Commercial Property (UK 2026/27)",
  metaDescription:
    "Free capital allowances calculator. Estimate the embedded fixtures pool in a commercial property purchase or fit-out, by sector, and the tax saving.",
  intro:
    "Estimate the capital allowances embedded in a commercial property purchase or fit-out, by sector, with the likely first-year relief.",
  ctaLabel: "A specialist survey confirms the real figure →",
  embedHeight: 700,
  fields: [
    {
      id: "spend",
      label: "Purchase price or fit-out spend (£)",
      type: "currency",
      default: 1_000_000,
    },
    {
      id: "buildingType",
      label: "Building type",
      type: "select",
      default: "offices",
      options: [
        { value: "industrial", label: "Industrial units" },
        { value: "hotels", label: "Hotels" },
        { value: "dental", label: "Dental practices" },
        { value: "care", label: "Care homes" },
        { value: "offices", label: "Offices" },
        { value: "gp", label: "GP surgeries" },
        { value: "hospitality", label: "Hospitality (cafes, QSR, bars, leisure)" },
        { value: "student", label: "Student accommodation" },
        { value: "pubs", label: "Pubs & restaurants" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "priorClaim",
      label: "Have capital allowances already been claimed or pooled on this property?",
      type: "select",
      default: "unknown",
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
        { value: "unknown", label: "Unknown" },
      ],
    },
    {
      id: "ownership",
      label: "Ownership vehicle",
      type: "select",
      default: "ltdco",
      options: [
        { value: "ltdco", label: "Limited company" },
        { value: "partnership", label: "Partnership" },
        { value: "individual", label: "Individual" },
      ],
    },
  ],
  compute: (v) => {
    const spend = Number(v.spend);
    const buildingType = String(v.buildingType);
    const priorClaim = String(v.priorClaim);
    const ownership = String(v.ownership);

    const pct = SECTOR_PCT[buildingType] ?? SECTOR_PCT.other;
    const poolMid = spend * pct;
    const poolLow = poolMid * 0.75;
    const poolHigh = poolMid * 1.25;

    const mainPool = poolMid * MAIN_POOL_SHARE;
    const specialPool = poolMid * SPECIAL_RATE_SHARE;

    // AIA allocated to the special-rate pool first (only 6% WDA otherwise), the
    // remainder of the £1m cap to the main pool (14% WDA / full expensing).
    const aiaToSpecial = Math.min(specialPool, AIA_CAP);
    const aiaToMain = Math.min(mainPool, AIA_CAP - aiaToSpecial);
    const year1Relief = aiaToSpecial + aiaToMain;

    // No rate-band input on this tool: show the tax saving as a range across the
    // relevant band (Corporation Tax 19-25% for a company, income tax 20-45% for a
    // partnership or individual).
    const isCompany = ownership === "ltdco";
    const rateLow = isCompany ? 0.19 : 0.20;
    const rateHigh = isCompany ? 0.25 : 0.45;
    const savingLow = year1Relief * rateLow;
    const savingHigh = year1Relief * rateHigh;

    const rows: CalcResultRow[] = [
      { label: `Estimated embedded pool (${SECTOR_LABEL[buildingType] ?? "commercial property"})`, value: `${gbp(poolLow)} to ${gbp(poolHigh)}` },
      { label: "Main pool (14% WDA / full expensing)", value: gbp(mainPool) },
      { label: "Special rate pool (6% WDA)", value: gbp(specialPool) },
      { label: "Estimated year-1 relief (AIA £1m)", value: gbp(year1Relief) },
      { label: `Estimated tax saving (${isCompany ? "Corporation Tax" : "Income Tax"})`, value: `${gbp(savingLow)} to ${gbp(savingHigh)}`, strong: true },
    ];

    let note =
      "Indicative only. The embedded pool is a rough share of spend based on typical claims for this building type; every property is different and a surveyor-led claim confirms the real figure. Main pool WDA is 14% and special rate pool WDA is 6% from April 2026, with AIA of £1m and full expensing available on new main-rate plant for companies.";
    if (priorClaim === "yes") {
      note +=
        " Because allowances may already have been claimed or pooled, a fresh claim depends on a section 198 election at your purchase and could be smaller than shown, or unavailable, without one.";
    } else if (priorClaim === "unknown") {
      note +=
        " If you are unsure whether the seller already claimed or pooled the fixtures, check the sale contract for a section 198 election before assuming the full estimate is available to you.";
    }

    return {
      headline: {
        label: "Estimated tax saving",
        value: `${gbp(savingLow)} to ${gbp(savingHigh)}`,
        sub: `Embedded pool estimated at ${(pct * 100).toFixed(0)}% of spend for ${SECTOR_LABEL[buildingType] ?? "this building type"}`,
      },
      rows,
      note,
    };
  },
  explainer: {
    heading: "How capital allowances on a commercial property are estimated",
    paragraphs: [
      "Every commercial building contains plant, machinery and integral features embedded in the fabric, wiring, heating, sanitaryware, kitchens, lifts and more, that qualify for capital allowances even though they were never itemised separately on a completion statement. How much is claimable varies hugely by building type: an industrial shed might yield 5% to 15% of its price, while a hotel or dental practice can yield 25% to 45%, because far more of the spend goes on qualifying plant and fittings rather than bare structure.",
      "Once estimated, the pool splits between the main pool, which gets a 14% writing-down allowance (or 100% full expensing on new main-rate plant bought by a company), and the special rate pool, covering integral features such as air conditioning, electrical and cold-water systems, which gets a 6% writing-down allowance. The Annual Investment Allowance gives a 100% deduction on the first £1m of qualifying spend across both pools each year, normally best allocated to the special rate pool first since it otherwise depreciates so slowly.",
      "Buying a second-hand commercial property has a trap: since April 2014, if the seller had already pooled the fixtures, the buyer can only inherit that entitlement if a joint section 198 election is agreed at the point of sale. Skip it, and the fixtures allowance can be lost permanently, however genuinely qualifying the assets are.",
      "This calculator gives a rough, sector-based estimate to size the opportunity. The actual claim depends on a detailed survey of what was bought or built, apportioned on a just and reasonable basis, which is why a specialist capital allowances review is the next step before relying on any figure here.",
    ],
  },
  faqs: [
    {
      question: "How are capital allowances calculated on a commercial property?",
      answer:
        "A surveyor identifies the qualifying plant, machinery and integral features embedded in the building, apportions a fair share of the purchase price or fit-out cost to them, then allocates that between the main pool (14% writing-down allowance) and the special rate pool (6%), after any Annual Investment Allowance or full expensing.",
    },
    {
      question: "What percentage of a purchase price is usually claimable?",
      answer:
        "It depends heavily on building type. Industrial units are often only 5% to 15%, offices and GP surgeries 15% to 25%, and hotels, dental practices, care homes, hospitality venues and pubs are often 25% to 45%, because far more of the spend is on qualifying plant and fittings rather than bare structure.",
    },
    {
      question: "What is the difference between the main and special-rate pool?",
      answer:
        "The main pool covers general plant and machinery and gets a 14% writing-down allowance (or 100% full expensing on new main-rate assets for companies). The special rate pool covers integral features such as electrical, heating, cooling, water and lift systems, and gets a much slower 6% writing-down allowance.",
    },
    {
      question: "Can I still claim on a second-hand building?",
      answer:
        "Usually yes, but if the seller previously pooled the fixtures, since April 2014 you can only inherit that entitlement with a joint section 198 election agreed at the time of sale. Without one, the allowance can be lost entirely even where the assets clearly qualify.",
    },
    {
      question: "Does the Annual Investment Allowance cover my whole claim?",
      answer:
        "The AIA gives a 100% deduction on the first £1m of qualifying expenditure across both pools each year. For smaller commercial purchases this often covers the whole embedded pool; larger purchases carry the excess forward at the ordinary writing-down rates.",
    },
    {
      question: "How accurate is a calculator estimate versus a survey?",
      answer:
        "This tool applies a typical sector percentage to your spend, which is a useful starting estimate but not a claim. A specialist capital allowances survey identifies and values the actual qualifying assets in your specific building, which can be materially higher or lower than the sector average.",
    },
  ],
};
