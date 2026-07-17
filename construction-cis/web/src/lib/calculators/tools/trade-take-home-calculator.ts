import type { GenericTool } from "@accounting-network/web-shared/tools";
import { gbp } from "../format";
import {
  PERSONAL_ALLOWANCE,
  BASIC_RATE_LIMIT,
  CLASS4_NI,
  INCOME_TAX_RATES,
} from "../cis-tax";

// ---------------------------------------------------------------------------
// Trade expense presets (2026/27 typical allowable business expenses per trade)
// Figures are annual estimates for a sole-trader working full-time.
// ---------------------------------------------------------------------------

const TRADE_PRESETS: Record<string, { expenses: number; label: string }> = {
  builder:       { expenses: 3500, label: "General builder" },
  roofer:        { expenses: 4500, label: "Roofer" },
  electrician:   { expenses: 4200, label: "Electrician" },
  plumber:       { expenses: 3800, label: "Plumber" },
  bricklayer:    { expenses: 3000, label: "Bricklayer" },
  joiner:        { expenses: 3200, label: "Joiner / Carpenter" },
  plasterer:     { expenses: 2800, label: "Plasterer" },
  painter:       { expenses: 2600, label: "Painter / Decorator" },
  groundworker:  { expenses: 5500, label: "Groundworker" },
  scaffolder:    { expenses: 4800, label: "Scaffolder" },
  other:         { expenses: 3500, label: "Other trade" },
};

// ---------------------------------------------------------------------------
// PA taper for incomes above £100,000 (2026/27)
// PA reduces £1 per £2 of income over £100,000; reaches £0 at £125,140.
// The higher-rate band widens as PA shrinks, so we compute it from actual PA.
// ---------------------------------------------------------------------------

function paAfterTaper(income: number): number {
  if (income <= 100000) return PERSONAL_ALLOWANCE;
  const taper = Math.floor((income - 100000) / 2);
  return Math.max(0, PERSONAL_ALLOWANCE - taper);
}

// ponytail: inline taper avoids touching cis-tax.ts (integrator note: extend
// cis-tax.ts with paAfterTaper + higherBandWidth when NEW 4 is built so both share one engine)

function incomeTaxOnProfit(profit: number): number {
  const pa = paAfterTaper(profit);
  const taxable = Math.max(0, profit - pa);
  const basic = Math.min(taxable, BASIC_RATE_LIMIT) * INCOME_TAX_RATES.basic;
  // Higher band widens as PA shrinks: width = (125140 - pa) - 37700
  const higherBandWidth = Math.max(0, 125140 - pa - BASIC_RATE_LIMIT);
  const higher = Math.min(Math.max(0, taxable - BASIC_RATE_LIMIT), higherBandWidth) * INCOME_TAX_RATES.higher;
  const additional = Math.max(0, taxable - BASIC_RATE_LIMIT - higherBandWidth) * INCOME_TAX_RATES.additional;
  return basic + higher + additional;
}

export const tradeAlgoKey = "trade-take-home-calculator";

export const tradeTakeHomeCalculator: GenericTool = {
  kind: "generic",
  slug: "trade-take-home-calculator",
  name: "Trade Take-Home & Expenses Estimator",
  category: "CIS Basics",
  oneLiner:
    "Estimate your annual take-home pay as a CIS subcontractor. Choose your trade to pre-load typical allowable expenses, then see your tax, NI, CIS position and estimated refund.",
  metaTitle: "Trade Take-Home Calculator | Roofer, Builder, Plumber Tax 2026/27",
  metaDescription:
    "Estimate your annual take-home pay as a CIS tradesperson in 2026/27. Choose your trade (roofer, builder, electrician, plumber and more) to load trade-typical expenses, then enter your income, materials and mileage to see your net pay and likely tax refund.",
  intro:
    "This calculator estimates your annual take-home pay as a sole-trader CIS subcontractor for 2026/27. Select your trade and it pre-loads a typical allowable expense figure for that trade, which you can adjust to match your own records. Enter your gross CIS income, materials, mileage and deduction rate to see your net pay, income tax, Class 4 National Insurance and estimated year-end refund or balance.",
  ctaLabel: "Get a specialist trade tax return filed →",
  embedHeight: 820,
  fields: [
    {
      id: "trade",
      label: "Your trade",
      type: "select",
      default: "builder",
      options: Object.entries(TRADE_PRESETS).map(([value, { label }]) => ({
        value,
        label,
      })),
      help: "Selecting your trade pre-loads a typical allowable expense figure for that trade. You can override it in the expenses field below.",
    },
    {
      id: "grossIncome",
      label: "Annual gross CIS income",
      type: "currency",
      default: 48000,
      step: 1000,
      help: "Your total CIS income before any deductions, as shown on your payment and deduction statements. Include the full gross figure, not the net amount you actually received.",
    },
    {
      id: "materials",
      label: "Materials you supplied",
      type: "currency",
      default: 6000,
      step: 500,
      help: "Materials you personally purchased and supplied on jobs. CIS is not deducted on materials, and they also reduce your taxable profit.",
    },
    {
      id: "expenses",
      label: "Allowable business expenses (excluding mileage)",
      type: "currency",
      default: 4500,
      step: 250,
      help: "Tools, PPE, van running costs (insurance, servicing, fuel if not claiming mileage), work phone, public liability insurance, accountancy fees and any work clothing that is protective. Pre-filled with a typical figure for your trade; adjust to your actual costs.",
    },
    {
      id: "miles",
      label: "Annual business mileage",
      type: "number",
      default: 8000,
      min: 0,
      step: 500,
      help: "Miles driven for work: travelling to sites, collecting materials and any other business journeys. Commuting from home to a permanent workplace does not count. The AMAP rate is 55p per mile for the first 10,000 miles and 25p above that from April 2026.",
    },
    {
      id: "cisRate",
      label: "CIS deduction rate",
      type: "select",
      default: "20",
      options: [
        { value: "0", label: "0% (Gross Payment Status)" },
        { value: "20", label: "20% (registered subcontractor)" },
        { value: "30", label: "30% (unregistered subcontractor)" },
      ],
    },
  ],
  compute: (v) => {
    const gross = Math.max(0, Number(v.grossIncome));
    const materials = Math.max(0, Number(v.materials));
    const expenses = Math.max(0, Number(v.expenses));
    const miles = Math.max(0, Number(v.miles));
    const cisRate = Number(v.cisRate) / 100;

    // AMAP 55p first 10,000 miles, 25p above (AMAP 2026/27, 55p from 6 Apr 2026)
    const mileageAllowance = Math.min(miles, 10000) * 0.55 + Math.max(0, miles - 10000) * 0.25;

    // Profit = gross - materials - expenses - mileage allowance
    const profit = Math.max(0, gross - materials - expenses - mileageAllowance);

    // Income tax with PA taper (safe above £100k; for most tradespeople PA is £12,570)
    const pa = paAfterTaper(profit);
    const taxable = Math.max(0, profit - pa);
    const incomeTax = incomeTaxOnProfit(profit);

    // Class 4 NI: 6% on (12570 to 50270), 2% above
    const c4Lower =
      Math.min(
        Math.max(0, profit - CLASS4_NI.lowerLimit),
        CLASS4_NI.upperLimit - CLASS4_NI.lowerLimit
      ) * CLASS4_NI.main;
    const c4Upper = Math.max(0, profit - CLASS4_NI.upperLimit) * CLASS4_NI.upper;
    const class4Ni = c4Lower + c4Upper;

    const totalTax = incomeTax + class4Ni;
    const takeHome = Math.max(0, profit - totalTax);

    // CIS deducted on labour base (gross minus materials)
    const labourBase = Math.max(0, gross - materials);
    const cisDeducted = labourBase * cisRate;

    // SA refund (+) or balance owed (-) vs CIS deducted
    const saBalance = cisDeducted - totalTax;

    const effectivePct =
      gross > 0 ? ((takeHome / gross) * 100).toFixed(1) : "0.0";

    return {
      headline: {
        label: "Estimated annual take-home",
        value: gbp(takeHome),
        sub: `${effectivePct}% of gross income after tax, NI and expenses`,
      },
      rows: [
        { label: "Gross CIS income", value: gbp(gross) },
        { label: "Less materials", value: `−${gbp(materials)}` },
        { label: "Less allowable expenses", value: `−${gbp(expenses)}` },
        { label: `Less mileage allowance (${miles.toLocaleString()} miles)`, value: `−${gbp(mileageAllowance)}` },
        { label: "Taxable profit", value: gbp(profit), strong: true },
        {
          label: `Personal allowance${profit > 100000 ? " (tapered)" : ""}`,
          value: `−${gbp(Math.min(pa, profit))}`,
        },
        { label: "Taxable income", value: gbp(taxable) },
        { label: "Income tax", value: gbp(incomeTax) },
        { label: "Class 4 NI (6% / 2%)", value: gbp(class4Ni) },
        { label: "Total tax and NI", value: gbp(totalTax), strong: true },
        { label: "Estimated take-home (profit after tax)", value: gbp(takeHome), strong: true },
        { label: "CIS deducted at source (on labour base)", value: gbp(cisDeducted) },
        {
          label:
            saBalance >= 0
              ? "Estimated SA refund from HMRC"
              : "Estimated balance to pay on SA return",
          value: `${saBalance >= 0 ? "" : "−"}${gbp(Math.abs(saBalance))}`,
          strong: true,
        },
      ],
      note:
        "2026/27 rates: AMAP 55p per mile (first 10,000 miles), PA £12,570 (tapering above £100,000), basic rate 20% on £37,700, higher rate 40%, additional rate 45%, Class 4 NI 6% (£12,570 to £50,270) and 2% above. CIS deducted on the labour base (gross minus materials). Expenses are indicative; your actual costs may differ. This is an estimate only and not tax advice.",
    };
  },
  explainer: {
    heading: "How trade take-home and expenses work for CIS subcontractors",
    paragraphs: [
      "As a sole-trader CIS subcontractor your take-home is not simply your gross income minus the CIS deduction. Three sets of costs reduce your taxable profit before tax is calculated: materials you personally supply, other allowable business expenses (tools, PPE, insurance, van running costs), and your mileage allowance under the Approved Mileage Allowance Payments (AMAP) rules. From April 2026 the AMAP rate is 55p per mile for the first 10,000 business miles and 25p above that.",
      "Once your taxable profit is established, income tax is charged at 20% on profit between your personal allowance (£12,570) and the basic-rate limit (£50,270 combined), 40% on income above that up to £125,140, and 45% on income above £125,140. For most tradespeople on typical construction earnings all profit falls in the basic band, so the rate is 20% on profit above £12,570. Class 4 National Insurance is charged separately on your profit at 6% between £12,570 and £50,270 and 2% above that.",
      "The refund figure in this calculator is the difference between the CIS deducted at source across the year and your actual tax plus NI liability calculated via Self Assessment. Because your contractors deduct CIS at 20% or 30% on your full labour base with no personal allowance factored in, most tradespeople are owed a refund when they file their return, particularly at lower income levels or with significant expenses.",
      "Different trades have different typical expense profiles. Roofers and scaffolders tend to have higher PPE, specialist equipment and access costs. Groundworkers often have higher plant hire and mileage. Electricians carry testing and certification costs. Painters and plasterers typically have lower tool costs but regular material outlay. This calculator pre-loads a realistic starting figure for your trade, but your actual costs should be based on your own records and receipts.",
      "Worked example (roofer, 2026/27): gross CIS income £48,000, materials supplied £6,000, allowable expenses £4,500, business mileage 8,000 miles. Mileage allowance: 8,000 x 55p = £4,400. Taxable profit: £48,000 minus £6,000 minus £4,500 minus £4,400 = £33,100. Personal allowance £12,570 leaves taxable income of £20,530. Income tax at 20%: £4,106. Class 4 NI at 6% on £20,530: £1,231.80. Total tax and NI: £5,337.80. Estimated take-home: £27,762.20. CIS deducted at source at 20% on the £42,000 labour base (gross minus materials): £8,400. Estimated Self Assessment refund: £3,062.20. This refund arises because the contractor deducted CIS on the full labour base with no allowance for expenses, mileage or the personal allowance.",
    ],
  },
  faqs: [
    {
      question: "Why does my trade choice affect the expenses field?",
      answer:
        "Different trades have different typical running costs. A roofer will typically spend more on PPE, specialist ladders and access equipment than a painter, while a groundworker will spend more on plant hire and site mileage. The trade selector pre-loads a realistic starting point so you get a meaningful estimate without having to calculate your total expenses from scratch. You should override the figure with your actual annual costs once you have your receipts.",
    },
    {
      question: "What counts as an allowable business expense for a tradesperson?",
      answer:
        "Tools and equipment used solely for work, replacement of trade-specific tools, PPE and safety gear, van insurance and servicing (or fuel if you are not claiming mileage allowance separately), a dedicated work phone, public liability and professional indemnity insurance, accountancy fees, and work clothing that is protective or a uniform. General clothing you could wear outside work, food and drink (unless staying away overnight) and travel from home to a permanent workplace are not allowable.",
    },
    {
      question: "What is the AMAP mileage rate from April 2026?",
      answer:
        "The Approved Mileage Allowance Payment (AMAP) rate for cars and vans increased to 55p per mile for the first 10,000 business miles from 6 April 2026, up from 45p. Above 10,000 miles the rate remains 25p. Business miles include travelling between sites, collecting materials and any other journey with a genuine business purpose. Commuting from your home to a single permanent workplace does not qualify.",
    },
    {
      question: "How is CIS deducted and why am I usually owed a refund?",
      answer:
        "Your contractor withholds CIS at 20% (or 30% if you are unregistered) on the labour element of each invoice, which is your gross income minus any materials you supply. This deduction is made with no allowance for your personal allowance, expenses or mileage. When you file your Self Assessment return, your actual tax liability is calculated on your profit after all expenses, and the personal allowance of £12,570 is applied. Because the deductions ignore those reductions, most tradespeople overpay during the year and are owed a refund.",
    },
    {
      question: "What is Class 4 National Insurance and how is it different from income tax?",
      answer:
        "Class 4 NI is a self-employed contribution charged on your trading profit at 6% between £12,570 and £50,270 and 2% above £50,270. It is calculated alongside income tax on your Self Assessment return but is a separate charge. Both figures together make up your total tax and NI liability for the year, which is what is offset against your CIS deductions to produce your refund or balance owed.",
    },
    {
      question: "Do I need to file a Self Assessment even if HMRC owes me a refund?",
      answer:
        "Yes. Every sole-trader CIS subcontractor must file a Self Assessment tax return, regardless of whether the result is a refund or a balance owed. You cannot claim a CIS refund without filing. The online filing deadline is 31 January following the end of the tax year (so 31 January 2028 for 2026/27). From April 2026 you must also file quarterly updates under Making Tax Digital for Income Tax Self Assessment if your gross income exceeds £50,000.",
    },
    {
      question: "Are materials I supply excluded from CIS?",
      answer:
        "Yes. CIS is only deducted on the labour element of a payment. Materials you personally supply are excluded from the CIS deduction base, so your contractor should only withhold 20% (or 30%) on the gross amount minus the materials. You should clearly split labour and materials on every invoice or payment and deduction statement. This exclusion also means your taxable profit is reduced by the cost of the materials, giving you a saving in both income tax and National Insurance.",
    },
    {
      question: "Does the personal allowance taper affect me?",
      answer:
        "Only if your taxable profit exceeds £100,000. Below that level the full personal allowance of £12,570 applies. Above £100,000 the allowance reduces by £1 for every £2 of additional income, reaching zero at £125,140. At that point all income above £12,570 up to £125,140 is effectively taxed at a combined rate of 60% (40% income tax plus loss of 20p of allowance per £2 earned). This calculator applies the taper correctly for high earners.",
    },
  ],
};
