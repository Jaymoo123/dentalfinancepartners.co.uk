import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import {
  calcEquipmentCapitalAllowance,
  type BuyerRate,
} from "@/lib/tools/compute/equipment-capital-allowance";

const RATE_LABELS: Record<BuyerRate, string> = {
  ltd19: "Limited company, small profits (19% corporation tax)",
  ltd25: "Limited company, main rate (25% corporation tax)",
  st20: "Sole trader / partnership, basic rate (20%)",
  st40: "Sole trader / partnership, higher rate (40%)",
  st45: "Sole trader / partnership, additional rate (45%)",
};

export const equipmentCapitalAllowanceTool: GenericTool = {
  kind: "generic",
  slug: "equipment-capital-allowance",
  name: "Dental Equipment Capital Allowance Calculator (FA 2026)",
  category: "Practice accounting",
  oneLiner:
    "AIA, the new 40% first-year allowance and the reduced 14% writing-down allowance applied to your equipment spend, with year-1 and 4-year tax savings.",
  embedHeight: 620,
  metaTitle: "Dental Equipment Capital Allowance Calculator 2026/27 | AIA, 40% FYA, 14% WDA",
  metaDescription:
    "Work out year-1 and 4-year tax relief on dental chairs, CBCT, CAD-CAM and surgery fit-outs under FA 2026: £1m AIA, the new 40% first-year allowance and 14% writing-down allowance.",
  intro:
    "Enter your planned spend on dental equipment (chairs, CBCT and imaging, CAD-CAM, decontamination room kit) and on integral features in a fit-out (electrical systems, plumbing, air conditioning). Pick the tax rate that applies to your practice structure. The calculator allocates the spend across the Annual Investment Allowance, the new 40% first-year allowance introduced by FA 2026 and the writing-down allowances, then shows your year-1 and cumulative 4-year tax saving.",
  fields: [
    {
      id: "mainCost",
      label: "Equipment cost: chairs, CBCT, CAD-CAM, decon kit (£)",
      type: "currency",
      default: 80000,
      min: 0,
      max: 5000000,
      step: 1000,
      help: "Main-rate plant and machinery: dental chairs and units, imaging, milling machines, autoclaves, cabinetry and loose fit-out.",
    },
    {
      id: "specialCost",
      label: "Integral features in fit-out (£)",
      type: "currency",
      default: 20000,
      min: 0,
      max: 5000000,
      step: 1000,
      help: "Special-rate expenditure: electrical and lighting systems, hot and cold water, air conditioning and ventilation installed as part of a surgery fit-out.",
    },
    {
      id: "buyerRate",
      label: "Practice structure and tax rate",
      type: "select",
      default: "ltd25",
      options: (Object.entries(RATE_LABELS) as [BuyerRate, string][]).map(([value, label]) => ({
        value,
        label,
      })),
      help: "The marginal rate the allowances save tax at. The 40% first-year allowance is only available to companies.",
    },
    {
      id: "boughtNew",
      label: "Equipment bought new (not second-hand)",
      type: "toggle",
      default: true,
      advanced: true,
      help: "The 40% first-year allowance requires new, unused assets. AIA and writing-down allowances cover second-hand kit too.",
    },
    {
      id: "aiaAvailable",
      label: "Annual Investment Allowance still available this year (£)",
      type: "currency",
      default: 1000000,
      min: 0,
      max: 1000000,
      step: 10000,
      advanced: true,
      help: "£1,000,000 per year, shared across a group and reduced by other qualifying spend already made this year.",
    },
  ],
  compute(values) {
    const mainCost = Number(values.mainCost);
    const specialCost = Number(values.specialCost);
    const buyerRate = String(values.buyerRate) as BuyerRate;
    const boughtNew = Boolean(values.boughtNew);
    const aiaAvailable = Number(values.aiaAvailable);
    const r = calcEquipmentCapitalAllowance(mainCost, specialCost, buyerRate, boughtNew, aiaAvailable);
    const ratePct = `${(r.taxRate * 100).toFixed(0)}%`;
    const rows = [
      { label: "AIA claimed (100%, year 1)", value: gbp(r.aiaTotal) },
      ...(r.aiaOnSpecial > 0
        ? [{ label: "of which against integral features", value: gbp(r.aiaOnSpecial) }]
        : []),
      ...(r.fyaClaim > 0 ? [{ label: "40% first-year allowance (FA 2026)", value: gbp(r.fyaClaim) }] : []),
      ...(r.year1Wda > 0 ? [{ label: "Writing-down allowances, year 1", value: gbp(r.year1Wda) }] : []),
      { label: "Total allowances, year 1", value: gbp(r.year1Allowances), strong: true },
      { label: "Allowances over 4 years", value: gbp(r.fourYearAllowances) },
      { label: `Tax saved over 4 years at ${ratePct}`, value: gbp(r.fourYearTaxSaving), strong: true },
      ...(r.unrelievedAfterFourYears > 0.5
        ? [{ label: "Still unrelieved after 4 years", value: gbp(r.unrelievedAfterFourYears) }]
        : []),
    ];
    let note =
      "AIA is allocated to integral features first (they otherwise get only 6% a year), then to equipment. ";
    if (r.fyaClaim > 0) {
      note +=
        "Equipment above the AIA gets the 40% first-year allowance; the remaining 60% joins the main pool at 14% reducing balance from year 2. ";
    } else if (!r.fyaEligible && mainCost + specialCost > aiaAvailable) {
      note +=
        "The 40% first-year allowance is not available here (companies buying new assets only), so the excess gets 14% writing-down allowance instead. ";
    }
    note +=
      "Assumes a 12-month period, no other pool movements, and sufficient profits to absorb the relief. Companies with profits between £50,000 and £250,000 save at an effective marginal rate of 26.5%, more than either option shown.";
    return {
      headline: {
        label: "Tax saved in year 1",
        value: gbp(r.year1TaxSaving),
        sub: `from ${gbp(r.year1Allowances)} of capital allowances at ${ratePct}`,
        tone: "good",
      },
      rows,
      note,
    };
  },
  explainer: {
    heading: "How FA 2026 changed the maths on dental equipment, with two worked examples",
    paragraphs: [
      "Finance Act 2026 made two changes that matter when a practice buys equipment. The main-rate writing-down allowance fell from 18% to 14% a year (section 28), so anything that misses year-1 relief is now relieved noticeably more slowly. In exchange, section 29 introduced a 40% first-year allowance for companies buying new main-rate assets. The £1,000,000 Annual Investment Allowance and the 6% special rate for integral features are unchanged.",
      "Worked example 1: a limited company practice spends £120,000 on a new chair, CBCT unit and decontamination room kit, plus £30,000 on integral features (electrics, plumbing, air conditioning) in the fit-out. Total spend £150,000 is comfortably within the £1,000,000 AIA, so the whole amount is deducted in year 1. At the 25% main rate of corporation tax that is a £37,500 tax saving in the year of purchase. For most single-practice purchases, AIA does all the work.",
      "Worked example 2: a company doing a multi-surgery refit spends £1,100,000 on equipment and £300,000 on integral features. The AIA is allocated to the £300,000 of integral features first (they would otherwise crawl out at 6% a year), leaving £700,000 of AIA for equipment. The £400,000 of equipment above the AIA qualifies for the new 40% first-year allowance: £160,000 in year 1, with the remaining £240,000 entering the main pool at 14% reducing balance from year 2. Year-1 allowances are £1,160,000, saving £290,000 at 25%. Over 4 years the allowances reach roughly £1,247,000, saving about £311,800.",
      "Sole traders and partnerships cannot claim the 40% first-year allowance, but the AIA still gives 100% year-1 relief at income tax rates of up to 45%, which for spend inside the AIA is worth more per pound than corporation tax relief. The ordering rule is the same for every structure: use AIA against special-rate expenditure first.",
    ],
  },
  faqs: [
    {
      question: "What counts as main-rate equipment and what counts as an integral feature?",
      answer:
        "Dental chairs and units, CBCT and other imaging equipment, CAD-CAM milling machines, autoclaves and washer disinfectors, compressors, suction units, cabinetry and loose furniture are main-rate plant and machinery. Integral features are systems built into the premises during a fit-out: electrical and lighting systems, hot and cold water systems, air conditioning and ventilation. Integral features fall into the special-rate pool at only 6% a year, which is why the calculator uses your AIA against them first.",
    },
    {
      question: "Who can claim the new 40% first-year allowance?",
      answer:
        "Only companies, and only on new, unused main-rate assets. FA 2026 section 29 introduced it alongside the cut in the main writing-down allowance from 18% to 14% (section 28). Sole traders and partnerships are excluded, and second-hand equipment does not qualify. In practice it only matters once your qualifying spend exceeds the available Annual Investment Allowance, because AIA already gives 100% relief and is claimed first.",
    },
    {
      question: "Is it better to lease or buy dental equipment for tax?",
      answer:
        "Buying (including hire purchase, where you commit to ownership) gives capital allowances: up to 100% relief in year 1 through the AIA. With an operating lease you never own the asset, so there are no capital allowances, but the rentals are usually deductible as a trading expense as they fall due, spreading relief over the lease term. Buying front-loads the relief; leasing spreads it and preserves cash. The right answer depends on cash flow, the finance rate and whether your profits can absorb a large year-1 deduction, so model both before signing.",
    },
    {
      question: "What if my profits are too low to use all the relief in year 1?",
      answer:
        "Capital allowances cannot create relief you cannot use, but losses they create can be carried forward, and companies can often carry a loss back 12 months against prior-year profits. You can also claim less than the full AIA or first-year allowance and leave the balance in the pool for future writing-down allowances. If a large purchase would push your taxable profit below the personal allowance or the corporation tax small-profits threshold, a partial claim can be worth more overall.",
    },
    {
      question: "Does the £1,000,000 AIA cover both equipment and fit-out spend?",
      answer:
        "Yes. The AIA covers both main-rate and special-rate expenditure, up to £1,000,000 of total qualifying spend per year, shared across a group of companies or businesses under common control. Because special-rate assets otherwise attract only 6% a year against 14% for main-rate assets, allocating AIA to integral features first is the standard ordering and is what this calculator does.",
    },
    {
      question: "When do these FA 2026 rates apply from?",
      answer:
        "Finance Act 2026 was enacted on 18 March 2026. The reduction of the main writing-down allowance from 18% to 14% and the new 40% first-year allowance apply for the 2026/27 year onwards. The special rate stays at 6% and the AIA stays at £1,000,000. If your accounting period straddles the change, allowances are apportioned, so confirm the exact treatment with your accountant.",
    },
  ],
};
