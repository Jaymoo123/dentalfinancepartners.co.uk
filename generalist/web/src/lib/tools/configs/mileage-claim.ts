import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcMileage, type MileageMode, type Vehicle } from "@/lib/tools/compute/mileage-claim";

export const mileageClaimTool: GenericTool = {
  kind: "generic",
  slug: "mileage-claim",
  name: "Mileage Reimbursement Calculator",
  category: "Expenses",
  oneLiner:
    "Work out your 2026/27 mileage claim at the new 55p AMAP rate, including Mileage Allowance Relief if your employer pays less and the taxable excess if they pay more.",
  embedHeight: 620,
  metaTitle: "Mileage Claim Calculator 2026/27 | New 55p AMAP Rate",
  metaDescription:
    "Free UK mileage calculator for the new 55p per mile AMAP rate from 6 April 2026. Self-employed deductions, Mileage Allowance Relief, and tax on above-rate reimbursement.",
  intro:
    "The approved mileage rate for cars and vans rose from 45p to 55p per mile for the first 10,000 business miles on 6 April 2026, the first increase since 2011. Miles above 10,000 stay at 25p, motorcycles at 24p and bicycles at 20p. Enter your business miles to see what you can claim in 2026/27, whether you are self-employed or an employee, and what happens if your employer still reimburses at the old 45p rate.",
  ctaLabel: "Get help claiming your mileage",
  fields: [
    {
      id: "mode",
      label: "How do you drive for work?",
      type: "select",
      default: "employee",
      options: [
        { value: "employee", label: "Employee (reimbursed by employer)" },
        { value: "selfEmployed", label: "Self-employed (claiming on Self Assessment)" },
      ],
    },
    {
      id: "vehicle",
      label: "Vehicle",
      type: "select",
      default: "car_van",
      options: [
        { value: "car_van", label: "Car or van (55p / 25p)" },
        { value: "motorcycle", label: "Motorcycle (24p)" },
        { value: "bicycle", label: "Bicycle (20p)" },
      ],
    },
    {
      id: "miles",
      label: "Business miles this tax year",
      type: "number",
      default: 12000,
      min: 0,
      max: 100000,
      step: 500,
      help: "Ordinary commuting between home and a permanent workplace does not count.",
    },
    {
      id: "reimbursedPence",
      label: "Employer pays per mile",
      type: "number",
      default: 45,
      min: 0,
      max: 100,
      step: 1,
      suffix: "p",
      help: "Ignored if you are self-employed. Many employers are still paying the old 45p rate in 2026/27.",
    },
    {
      id: "marginalRate",
      label: "Your income tax band",
      type: "select",
      default: "0.2",
      options: [
        { value: "0.2", label: "Basic rate (20%)" },
        { value: "0.4", label: "Higher rate (40%)" },
        { value: "0.45", label: "Additional rate (45%)" },
      ],
    },
  ],
  compute(values) {
    const mode = String(values.mode) as MileageMode;
    const vehicle = String(values.vehicle) as Vehicle;
    const miles = Number(values.miles);
    const r = calcMileage(mode, vehicle, miles, Number(values.reimbursedPence), Number(values.marginalRate));

    const upliftRow =
      r.upliftVsOld > 0
        ? [{ label: "Extra vs the old 45p rate (pre April 2026)", value: gbp(r.upliftVsOld) }]
        : [];

    if (mode === "selfEmployed") {
      return {
        headline: {
          label: "Mileage deduction you can claim",
          value: gbp(r.amap),
          sub: `Estimated tax saving ${gbp(r.taxAtMarginal)} at your marginal rate`,
          tone: "good",
        },
        rows: [
          { label: "Approved mileage allowance (2026/27)", value: gbp(r.amap), strong: true },
          ...upliftRow,
          { label: "Estimated income tax saving", value: gbp(r.taxAtMarginal) },
        ],
        note: "Using the simplified mileage method means you cannot also claim actual vehicle costs (fuel, insurance, servicing, capital allowances). For expensive or heavily used vehicles the actual-cost method can beat 55p a mile, but once you choose a method for a vehicle you must stick with it while you own it. Class 4 NIC savings come on top of the income tax figure shown.",
      };
    }

    if (r.shortfall > 0) {
      return {
        headline: {
          label: "Mileage Allowance Relief you can claim",
          value: gbp(r.taxAtMarginal),
          sub: `Your employer paid ${gbp(r.paid)}, ${gbp(r.shortfall)} below the approved ${gbp(r.amap)}`,
          tone: "good",
        },
        rows: [
          { label: "Approved mileage allowance (2026/27)", value: gbp(r.amap) },
          ...upliftRow,
          { label: "Employer reimbursement", value: gbp(r.paid) },
          { label: "Shortfall (MAR claim)", value: gbp(r.shortfall) },
          { label: "Tax relief at your marginal rate", value: gbp(r.taxAtMarginal), strong: true },
        ],
        note: "Claim Mileage Allowance Relief through Self Assessment or HMRC's online P87 service. Relief is on the shortfall, not a cash refund of it: a basic-rate taxpayer gets back 20p per £1 of shortfall.",
      };
    }

    if (r.excess > 0) {
      return {
        headline: {
          label: "Taxable excess above AMAP",
          value: gbp(r.excess),
          sub: `Roughly ${gbp(r.taxAtMarginal)} income tax plus ${gbp(r.nicOnExcess)} employee NIC`,
          tone: "warn",
        },
        rows: [
          { label: "Employer reimbursement", value: gbp(r.paid) },
          { label: "Approved mileage allowance (2026/27)", value: gbp(r.amap) },
          ...upliftRow,
          { label: "Taxable excess", value: gbp(r.excess), strong: true },
          { label: "Estimated income tax on excess", value: gbp(r.taxAtMarginal) },
          { label: "Estimated employee Class 1 NIC (8%)", value: gbp(r.nicOnExcess) },
        ],
        note: "Anything paid above the approved rate is earnings: it goes through payroll (or a P11D) with income tax and Class 1 NIC for you, plus 15% employer NIC for your employer. The NIC estimate uses the 8% main rate; 2% applies to earnings above the upper earnings limit.",
      };
    }

    return {
      headline: {
        label: "Reimbursed exactly at the approved rate",
        value: gbp(r.paid),
        sub: "Nothing to claim and nothing taxable",
        tone: "good",
      },
      rows: [
        { label: "Approved mileage allowance (2026/27)", value: gbp(r.amap) },
        ...upliftRow,
        { label: "Employer reimbursement", value: gbp(r.paid) },
      ],
      note: "Your employer is paying the full approved amount tax-free. If you carry a colleague on business journeys, your employer can also pay 5p per passenger mile tax-free, though you cannot claim relief if they choose not to.",
    };
  },
  explainer: {
    heading: "How the 2026/27 mileage rates work",
    paragraphs: [
      "From 6 April 2026 the approved mileage allowance payment (AMAP) rate for cars and vans is 55p per mile for the first 10,000 business miles in the tax year, then 25p per mile above that. This is the first change to the headline rate since 2011, when it was set at 45p. Motorcycles (24p) and bicycles (20p) are unchanged, as is the 5p per mile passenger rate an employer can add when you carry a colleague on a business journey.",
      "If you are self-employed, the approved amount is a deduction from your trading profits. If you are employed and your employer reimburses less than the approved amount, the difference qualifies for Mileage Allowance Relief: you claim it via Self Assessment or form P87 and get tax back at your marginal rate. If your employer pays more than the approved amount, the excess is taxed as earnings with Class 1 NIC on top. The rate change matters here: an employer still paying 45p in 2026/27 is now underpaying by 10p a mile, which creates a relief claim that did not exist last year.",
      "Worked example 1: an employed care worker drives 8,000 business miles in 2026/27 and her employer reimburses 45p per mile (£3,600). The approved amount is 8,000 × 55p = £4,400, so the shortfall is £800. As a basic-rate taxpayer she claims Mileage Allowance Relief and gets £160 back. Under the old 45p rate she would have had no claim at all.",
      "Worked example 2: a self-employed consultant drives 14,000 business miles in his own car. The approved amount is 10,000 × 55p (£5,500) plus 4,000 × 25p (£1,000), £6,500 in total. As a higher-rate taxpayer that deduction saves £2,600 in income tax, £400 more than the £5,500 the same mileage was worth in 2025/26, before any Class 4 NIC saving.",
    ],
  },
  faqs: [
    {
      question: "What is the mileage rate for 2026/27?",
      answer:
        "55p per mile for the first 10,000 business miles in a car or van, then 25p per mile above 10,000. The 55p rate applies from 6 April 2026 and replaced the 45p rate that had been in place since 2011. Motorcycles are 24p and bicycles 20p per mile, both unchanged.",
    },
    {
      question: "My employer still pays 45p per mile. Can I claim the difference?",
      answer:
        "Yes. From 6 April 2026 the approved rate is 55p, so a 45p reimbursement leaves a 10p per mile shortfall on your first 10,000 miles. You claim Mileage Allowance Relief on the shortfall through Self Assessment or HMRC's P87 service and receive tax back at your marginal rate, so 20%, 40% or 45% of the shortfall.",
    },
    {
      question: "Can my employer just pay 55p per mile tax-free?",
      answer:
        "Yes. Employers can reimburse up to the approved amount with no tax, no NIC and no reporting. Many internal expense policies were written around 45p, so it is worth asking your employer to update theirs; anything up to 55p (25p above 10,000 miles) costs them nothing extra in tax.",
    },
    {
      question: "What if my employer pays more than the approved rate?",
      answer:
        "The excess over the approved amount is treated as earnings. It is subject to income tax and employee Class 1 NIC through payroll, and your employer pays 15% employer NIC on it. For example, 70p per mile on 5,000 miles is £750 above the approved amount, and that £750 is taxed like salary.",
    },
    {
      question: "Should the self-employed use mileage or actual costs?",
      answer:
        "The 55p simplified rate covers fuel, insurance, repairs, servicing and depreciation in one figure with minimal record keeping. Claiming actual costs plus capital allowances can produce a bigger deduction for expensive vehicles or low business-use ratios, but you must apportion every cost between business and private use. Whichever method you pick for a vehicle, you must keep using it for as long as you use that vehicle in the business.",
    },
    {
      question: "Do commuting miles count as business miles?",
      answer:
        "No. Ordinary commuting between home and a permanent workplace never qualifies. Business miles are journeys in the performance of your duties or travel to a temporary workplace, such as client visits, site inspections or travel between two workplaces.",
    },
  ],
};
