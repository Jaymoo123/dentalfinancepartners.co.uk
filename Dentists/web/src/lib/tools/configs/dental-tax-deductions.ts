import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

/**
 * Dental Tax Deduction Planner (checklist calculator).
 *
 * Sums the standard deductible expense categories for a self-employed
 * associate or principal, converts business miles between practices to an
 * AMAP claim at 2026/27 rates (55p first 10,000 miles, 25p after), then
 * estimates the tax and Class 4 NI saved at the user's marginal band.
 *
 * 2026/27 bands (rUK): PA £12,570 tapering above £100,000; basic 20% to
 * £50,270; higher 40% to £125,140; additional 45%. Class 4 NI 6% between
 * £12,570 and £50,270, 2% above.
 */

// ponytail: single marginal rate applied to the whole deduction total.
// A deduction large enough to cross a band boundary saves at a blended
// rate; the note under the result flags this rather than modelling it.
function marginalRates(profit: number): { tax: number; ni: number; band: string } {
  if (profit > 125140) return { tax: 0.45, ni: 0.02, band: "additional rate (45%)" };
  if (profit > 100000) return { tax: 0.6, ni: 0.02, band: "60% effective band (personal allowance taper)" };
  if (profit > 50270) return { tax: 0.4, ni: 0.02, band: "higher rate (40%)" };
  if (profit > 12570) return { tax: 0.2, ni: 0.06, band: "basic rate (20%)" };
  return { tax: 0, ni: 0, band: "below the personal allowance" };
}

function amap(miles: number): number {
  return Math.min(miles, 10000) * 0.55 + Math.max(miles - 10000, 0) * 0.25;
}

export const dentalTaxDeductionsTool: GenericTool = {
  kind: "generic",
  slug: "dental-tax-deductions",
  name: "Dental Tax Deduction Planner",
  category: "Associate tax",
  oneLiner:
    "Checklist of the deductible expenses a self-employed dentist can claim, with the tax and NI saved at your marginal band for 2026/27.",
  embedHeight: 760,
  metaTitle: "Dental Tax Deduction Planner UK 2026/27 | Dentist Expense Checklist",
  metaDescription:
    "Work through every deductible expense category for a self-employed associate or principal dentist: GDC, indemnity, CPD, loupes, mileage at 2026/27 AMAP rates. See the tax and NI you save.",
  intro:
    "Typical figures are prefilled for each expense category. Adjust them to your own numbers, add your business miles between practices, and set your expected taxable profit. The planner totals your deductions and estimates the income tax and Class 4 NI saved at your 2026/27 marginal band.",
  ctaLabel: "Get a dental expense review",
  fields: [
    {
      id: "profit",
      label: "Expected taxable profit before these expenses (£/yr)",
      type: "currency",
      default: 75000,
      min: 0,
      max: 300000,
      step: 1000,
      help: "Your self-employment profit for 2026/27 before deducting the items below. This sets the marginal rate used for the saving.",
    },
    {
      id: "gdc",
      label: "GDC annual retention fee (£)",
      type: "currency",
      default: 690,
      min: 0,
      max: 2000,
      step: 10,
      help: "Wholly and exclusively deductible. The dentist ARF is £690.",
    },
    {
      id: "indemnity",
      label: "Indemnity (DDU, MDDUS, Dental Protection) (£/yr)",
      type: "currency",
      default: 3500,
      min: 0,
      max: 20000,
      step: 100,
      help: "Fully deductible for the self-employed. Associates typically pay £2,500 to £5,000 depending on NHS/private mix.",
    },
    {
      id: "cpd",
      label: "CPD courses, exam fees and course travel (£/yr)",
      type: "currency",
      default: 1200,
      min: 0,
      max: 20000,
      step: 100,
      help: "Deductible where it updates existing skills. Courses that qualify you for a new specialty can be treated as capital or personal by HMRC, so flag those with your accountant.",
    },
    {
      id: "equipment",
      label: "Black book, instruments and small equipment (£/yr)",
      type: "currency",
      default: 400,
      min: 0,
      max: 10000,
      step: 50,
      help: "Handpieces, burs, scrubs laundering, small instruments. Deductible where used only for work.",
    },
    {
      id: "loupes",
      label: "Loupes bought this year (£)",
      type: "currency",
      default: 0,
      min: 0,
      max: 10000,
      step: 100,
      help: "Capital equipment, but Annual Investment Allowance gives a 100% deduction in the year of purchase, so enter the full cost if bought in 2026/27.",
    },
    {
      id: "subs",
      label: "Professional subscriptions (BDA, journals) (£/yr)",
      type: "currency",
      default: 550,
      min: 0,
      max: 3000,
      step: 25,
      help: "HMRC-approved professional bodies only. The BDA is on the approved list.",
    },
    {
      id: "homeUse",
      label: "Use of home for admin (£/yr)",
      type: "currency",
      default: 312,
      min: 0,
      max: 5000,
      step: 26,
      help: "£312 is the simplified £6/week rate. A proportionate share of actual household costs is allowed instead if you regularly do admin, CPD records or accounts at home.",
      advanced: true,
    },
    {
      id: "miles",
      label: "Business miles between practices (miles/yr)",
      type: "number",
      default: 2000,
      min: 0,
      max: 40000,
      step: 100,
      suffix: "miles",
      help: "Travel between practices, to domiciliary visits or to courses counts. Ordinary commuting from home to your base practice is NOT claimable. AMAP 2026/27: 55p for the first 10,000 miles, 25p after.",
    },
    {
      id: "staff",
      label: "Staff costs paid personally (principals) (£/yr)",
      type: "currency",
      default: 0,
      min: 0,
      max: 500000,
      step: 1000,
      help: "Principals only: wages, employer NIC and pension for nurses and reception staff paid through your self-employment. Associates should normally leave this at £0.",
      advanced: true,
    },
  ],
  compute(values) {
    const profit = Number(values.profit);
    const mileage = amap(Number(values.miles));
    const cash =
      Number(values.gdc) +
      Number(values.indemnity) +
      Number(values.cpd) +
      Number(values.equipment) +
      Number(values.loupes) +
      Number(values.subs) +
      Number(values.homeUse) +
      Number(values.staff);
    const total = cash + mileage;
    const capped = Math.min(total, profit);
    const { tax, ni, band } = marginalRates(profit);
    const taxSaved = capped * tax;
    const niSaved = capped * ni;
    return {
      headline: {
        label: "Estimated tax and NI saved",
        value: gbp(taxSaved + niSaved),
        sub: `On ${gbp(total)} of deductions at your marginal ${band}`,
        tone: "good" as const,
      },
      rows: [
        { label: "Cash expenses (GDC, indemnity, CPD, equipment, subs, home, staff)", value: gbp(cash) },
        { label: "Mileage claim (55p/25p AMAP)", value: gbp(mileage) },
        { label: "Total deductible", value: gbp(total), strong: true },
        { label: "Income tax saved", value: gbp(taxSaved) },
        { label: "Class 4 NI saved", value: gbp(niSaved) },
      ],
      note:
        total > profit
          ? "Your deductions exceed your stated profit, so the saving is capped at the tax due on that profit. Losses can usually be carried forward or relieved against other income; take advice."
          : "The saving applies your single marginal rate to the whole deduction total. If the deductions drop you into a lower band, part of the saving accrues at the lower band's rate, so treat this as an upper estimate near band boundaries. Excludes Scottish income tax rates.",
    };
  },
  explainer: {
    heading: "How the planner works, with two worked examples",
    paragraphs: [
      "Every field is an expense category HMRC accepts for self-employed dentists, provided the cost is incurred wholly and exclusively for the trade. The planner adds your cash expenses to a mileage claim at 2026/27 approved rates (55p for the first 10,000 business miles, 25p thereafter), then multiplies the total by your combined marginal income tax and Class 4 NI rate.",
      "The contested areas are travel and training. Miles between two practices you work at, or out to a domiciliary visit, are business miles. The daily journey from home to the practice you routinely work at is ordinary commuting and is not claimable, even if you carry equipment. CPD that maintains or updates your existing skills is deductible; a course that gives you a new qualification (an implant diploma, for instance) can be challenged as capital expenditure, so keep that distinction in mind before claiming.",
      "Worked example 1, associate: taxable profit £75,000 before expenses. GDC £690, indemnity £3,500, CPD £1,200, small equipment £400, BDA £550, use of home £312, and 2,000 miles between two practices (£1,100 at 55p). Total deductions £7,752. At the higher-rate margin (40% tax plus 2% Class 4 NI) that saves £3,255.84, cutting the tax bill by roughly 42p in every pound spent.",
      "Worked example 2, principal: taxable profit £140,000 before expenses. GDC £690, indemnity £5,000, CPD £2,500, equipment £1,500, new loupes £1,500 (fully deductible via Annual Investment Allowance), BDA £550, use of home £312, 1,000 business miles (£550), and £30,000 of staff costs. Total deductions £42,602. Profit sits in the additional-rate band, so at 45% plus 2% NI the saving is £20,022.94. Note that the deductions bring profit back below £125,140, so the true blended saving is slightly lower; the planner flags this in the result.",
    ],
  },
  faqs: [
    {
      question: "Can I claim travel from home to my practice?",
      answer:
        "No. Home to your base practice is ordinary commuting and is never deductible, regardless of what you carry. Travel between practices on the same day, to domiciliary visits, to courses and to the lab is claimable at the approved mileage rates: 55p per mile for the first 10,000 business miles in 2026/27 and 25p thereafter.",
    },
    {
      question: "Is my indemnity premium fully deductible?",
      answer:
        "Yes, for a self-employed associate or principal a DDU, MDDUS or Dental Protection subscription is wholly and exclusively a cost of practising, so the full premium is deductible. If your practice reimburses part of it, only the part you actually bear is claimable.",
    },
    {
      question: "Are loupes a deductible expense?",
      answer:
        "Loupes are capital equipment rather than a running cost, but the Annual Investment Allowance gives a 100% deduction in the year you buy them, so in practice the full price reduces that year's taxable profit. The same applies to other equipment you own personally, such as a laptop used for practice admin.",
    },
    {
      question: "Which subscriptions can I deduct?",
      answer:
        "Your GDC annual retention fee and subscriptions to bodies on HMRC's approved list, which includes the BDA, are deductible. General memberships with a social or personal element, gym fees and most magazine subscriptions are not.",
    },
    {
      question: "What can a principal claim that an associate cannot?",
      answer:
        "A principal running the practice as a sole trader also deducts staff wages and employer costs, premises rent, rates, utilities, materials, lab fees, equipment servicing and practice insurance. This planner captures staff costs in the advanced section; a full practice accounts review will pick up the rest.",
    },
    {
      question: "Does the calculator handle Scottish tax rates?",
      answer:
        "No. The marginal rates used are the 2026/27 rates for England, Wales and Northern Ireland. Scottish income tax has different bands and rates, so the tax-saved figure will differ for a Scottish-resident dentist, although the deductible total itself is the same.",
    },
  ],
  related: [
    { label: "Associate Take-Home Calculator", href: "/calculators/associate-take-home" },
  ],
};
