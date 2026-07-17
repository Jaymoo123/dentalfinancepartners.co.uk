import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import {
  calcCapitalAllowances,
  type AssetType,
  type CarCO2,
  type Structure,
} from "@/lib/tools/compute/capital-allowances-vehicle";

export const capitalAllowancesVehicleTool: GenericTool = {
  kind: "generic",
  slug: "capital-allowances-vehicle",
  name: "Van & Equipment Capital Allowance Calculator",
  category: "Business Tax",
  oneLiner:
    "See the year-one and four-year tax saving on a van, car, or equipment purchase under the FA 2026 rules: AIA, the new 40% first-year allowance, and writing down allowances at 14% or 6%.",
  embedHeight: 640,
  metaTitle: "Van & Equipment Capital Allowance Calculator 2026/27 | AIA, FYA & WDA",
  metaDescription:
    "Free UK capital allowances calculator for vans, cars and equipment. Compare AIA 100%, the FA 2026 40% first-year allowance and writing down allowances (14% main, 6% special). Year-one and four-year tax savings for companies and sole traders.",
  intro:
    "Buying a van, car, or piece of equipment for the business? The tax relief varies enormously depending on what you buy and how you buy it. A £40,000 van can be written off in full in year one, while a £40,000 high-emission car gets just 6% a year. This calculator applies the FA 2026 rules (14% main-rate writing down allowance, the new 40% first-year allowance for companies) and shows your year-one and four-year tax saving at your marginal rate.",
  fields: [
    {
      id: "assetType",
      label: "What are you buying?",
      type: "select",
      default: "van",
      options: [
        { value: "van", label: "Van (or other commercial vehicle)" },
        { value: "car", label: "Car" },
        { value: "equipment", label: "Plant & equipment (tools, machinery, computers)" },
      ],
    },
    {
      id: "cost",
      label: "Purchase cost (ex VAT if you reclaim it)",
      type: "currency",
      default: 40000,
      min: 0,
      max: 2000000,
      step: 1000,
    },
    {
      id: "isNew",
      label: "Bought new and unused (not second-hand)",
      type: "toggle",
      default: true,
      help: "The AIA covers new and used assets alike, but first-year allowances (100% zero-emission car, 40% company FYA) only apply to new, unused assets.",
    },
    {
      id: "carCO2",
      label: "Car CO2 emissions",
      type: "select",
      default: "zero",
      options: [
        { value: "zero", label: "Zero emission (fully electric)" },
        { value: "upTo50", label: "1 to 50 g/km" },
        { value: "over50", label: "Over 50 g/km" },
      ],
      help: "Only used when the asset is a car. Vans and equipment ignore this.",
    },
    {
      id: "structure",
      label: "Who is buying?",
      type: "select",
      default: "ltd",
      options: [
        { value: "ltd", label: "Limited company" },
        { value: "soleTrader", label: "Sole trader / partnership" },
      ],
    },
    {
      id: "marginalRate",
      label: "Marginal tax rate on profits",
      type: "select",
      default: "25",
      options: [
        { value: "19", label: "19% · company, profits under £50k" },
        { value: "26.5", label: "26.5% · company, profits £50k to £250k (marginal band)" },
        { value: "25", label: "25% · company, profits over £250k" },
        { value: "26", label: "26% · sole trader, basic rate (20% + 6% Class 4 NI)" },
        { value: "42", label: "42% · sole trader, higher rate (40% + 2% Class 4 NI)" },
        { value: "47", label: "47% · sole trader, additional rate (45% + 2% Class 4 NI)" },
      ],
      help: "The rate the allowance saves tax at. Companies in the £50k to £250k band save at an effective 26.5% on each marginal pound.",
    },
    {
      id: "businessUsePct",
      label: "Business use",
      type: "number",
      default: 100,
      min: 1,
      max: 100,
      step: 5,
      suffix: "%",
      help: "Sole traders and partnerships must restrict the claim for private use. Companies claim in full; a director's private use is taxed as a benefit in kind instead.",
    },
  ],
  compute(values) {
    const r = calcCapitalAllowances(
      String(values.assetType) as AssetType,
      Number(values.cost),
      Boolean(values.isNew),
      String(values.carCO2) as CarCO2,
      String(values.structure) as Structure,
      Number(values.businessUsePct),
      Number(values.marginalRate) / 100,
    );
    const restricted = r.claimFraction < 1;
    const rows = [
      { label: "Relief route", value: r.primary.name },
      {
        label: restricted
          ? `Year-1 allowance (after ${pct(r.claimFraction * 100, 0)} business use)`
          : "Year-1 allowance",
        value: gbp(r.primary.year1Allowance * r.claimFraction),
      },
      { label: "Year-1 tax saving", value: gbp(r.year1Saving), strong: true as const },
      {
        label: restricted ? "4-year cumulative allowance (restricted)" : "4-year cumulative allowance",
        value: gbp(r.primary.cumulative4Allowance * r.claimFraction),
      },
      { label: "4-year cumulative tax saving", value: gbp(r.cumulative4Saving) },
      ...(r.unrelievedAfter4 > 0.5
        ? [{ label: "Cost still unrelieved after 4 years", value: gbp(r.unrelievedAfter4) }]
        : []),
      ...r.alternatives.map((a) => ({
        label: `Compare: ${a.name}, year 1`,
        value: gbp(a.year1Allowance * r.claimFraction),
      })),
    ];
    return {
      headline: {
        label: "Year-1 tax saving",
        value: gbp(r.year1Saving),
        sub: `${gbp(r.cumulative4Saving)} saved over 4 years via ${r.primary.name.toLowerCase()}`,
        tone: r.primary.year1Allowance >= Number(values.cost) && Number(values.cost) > 0 ? "good" : "default",
      },
      rows,
      note: r.note,
    };
  },
  explainer: {
    heading: "How capital allowances work from April 2026",
    paragraphs: [
      "Capital allowances are how the tax system gives you relief for money spent on assets. Which allowance applies depends on the asset. The Annual Investment Allowance (AIA) gives 100% relief in year one on up to £1 million of qualifying spend per year, and it covers vans, machinery, tools, and computers, whether new or second-hand. Cars are specifically excluded from the AIA by statute.",
      "Finance Act 2026 changed two things from April 2026. The main-rate writing down allowance fell from 18% to 14% a year (FA 2026 s.28), so relief through the main pool is now noticeably slower. In exchange, companies (not sole traders) get a new 40% first-year allowance on new, unused main-rate plant and machinery (FA 2026 s.29). In practice the AIA still beats the 40% FYA whenever you have AIA headroom, so the FYA mainly matters for companies spending over £1 million a year.",
      "Cars follow their own CO2-based rules. A new, unused zero-emission car qualifies for a 100% first-year allowance. Cars with emissions of 1 to 50 g/km (and used electric cars) go into the main pool at 14% a year. Cars above 50 g/km go into the special rate pool at just 6% a year, which means less than a quarter of the cost is relieved even after four years.",
      "Worked example 1: a limited company paying the 26.5% marginal rate buys a new van for £40,000. The AIA relieves the full £40,000 in year one, a tax saving of £10,600. Via the 40% FYA the year-one allowance would be only £16,000 (saving £4,240), and via the 14% writing down allowance just £5,600 (saving £1,484). Same van, same cost, a £9,116 difference in year-one tax depending on the route.",
      "Worked example 2: a higher-rate sole trader buys a £30,000 petrol car with 120 g/km emissions, used 80% for business. It sits in the special rate pool at 6%: the year-one allowance is £1,800, restricted to £1,440 for business use, saving £605 at 42%. Over four years the cumulative saving is only about £2,210. Had they bought a new electric car for the same money, the 100% first-year allowance would save £10,080 in year one, more than four times the petrol car's four-year total.",
    ],
  },
  faqs: [
    {
      question: "Why don't cars qualify for the Annual Investment Allowance?",
      answer:
        "Cars are excluded from the AIA by statute (CAA 2001 s.38B). Instead they get relief through first-year allowances or writing down allowances based on CO2 emissions: 100% first-year allowance for new zero-emission cars, 14% a year in the main pool for cars at 50 g/km or below, and 6% a year in the special rate pool above 50 g/km. Vans, however, count as plant and machinery and get the full AIA.",
    },
    {
      question: "Is a double-cab pickup a van or a car?",
      answer:
        "From April 2025, double-cab pickups are treated as cars for capital allowances and benefit-in-kind purposes, following the Court of Appeal decision in the Coca-Cola case and the Autumn 2024 Budget. That means no AIA and CO2-based writing down allowances instead. Vehicles bought before the change kept their old treatment under transitional rules. Single-cab pickups and genuine panel vans remain plant and machinery.",
    },
    {
      question: "Should I use the AIA or the new 40% first-year allowance?",
      answer:
        "If you have AIA headroom, always the AIA: it relieves 100% of the cost in year one against the FYA's 40%. The 40% first-year allowance (FA 2026 s.29) exists for companies whose total qualifying spend in the year exceeds the £1 million AIA limit. It only applies to new, unused main-rate assets bought by companies, never to cars, and is not available to sole traders or partnerships.",
    },
    {
      question: "Does buying second-hand change the relief?",
      answer:
        "For vans and equipment, no: the AIA applies to new and used assets alike. For cars, yes: the 100% first-year allowance is limited to new, unused zero-emission cars, so a used electric car drops into the main pool at 14% a year. The company 40% first-year allowance is also new-assets-only.",
    },
    {
      question: "How does private use affect the claim?",
      answer:
        "Sole traders and partners must restrict their claim to the business proportion: 70% business use means 70% of the allowance. Limited companies claim the full allowance regardless of who drives the vehicle, but a director or employee with private use of a company vehicle is taxed on a benefit in kind, which for high-emission cars can outweigh the corporation tax relief.",
    },
    {
      question: "What happens when I sell the asset?",
      answer:
        "Sale proceeds are deducted from the relevant pool, and if you claimed 100% relief up front (AIA or a first-year allowance), the proceeds are typically taxed as a balancing charge. In effect, HMRC claws back relief on the part of the cost you recovered by selling. The allowances accelerate relief; over the asset's whole life you get relief on the true net cost.",
    },
  ],
  related: [
    { label: "Employer NI & Cost-to-Hire Calculator", href: "/calculators/employer-ni-calculator" },
    { label: "Salary & Dividend Optimiser", href: "/calculators/salary-dividend-optimiser" },
  ],
};
