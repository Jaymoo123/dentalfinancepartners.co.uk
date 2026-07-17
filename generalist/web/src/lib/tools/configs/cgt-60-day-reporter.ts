import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcCgt60Day } from "@/lib/tools/compute/cgt-60-day";

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const cgt60DayTool: GenericTool = {
  kind: "generic",
  slug: "cgt-60-day-reporter",
  name: "Residential CGT 60-Day Reporting Calculator",
  category: "Capital Gains",
  oneLiner:
    "Work out the capital gains tax due on a UK residential property sale, your exact 60-day reporting deadline from completion, and whether you need to file a return at all.",
  embedHeight: 640,
  metaTitle: "CGT 60-Day Reporting Calculator 2026/27 | Residential Property",
  metaDescription:
    "Free 60-day CGT calculator for UK residential property sales. Gain after private residence relief, tax at 18% and 24%, your reporting deadline from completion, and whether a return is needed.",
  intro:
    "Sell a UK residential property at a gain and, if tax is due, you must report it and pay CGT on account within 60 days of completion. This calculator works out your gain after buying and selling costs, applies private residence relief for any period you lived there (plus the final 9 months), deducts the £3,000 annual exempt amount, taxes the rest at 18% and 24% based on your other income, and gives you the exact deadline date. It also tells you when no 60-day return is needed at all.",
  fields: [
    {
      id: "proceeds",
      label: "Sale price",
      type: "currency",
      default: 320000,
      min: 0,
      max: 5000000,
      step: 5000,
    },
    {
      id: "saleCosts",
      label: "Selling costs",
      type: "currency",
      default: 5400,
      min: 0,
      max: 200000,
      step: 100,
      help: "Estate agent fees, legal fees and other costs of the sale.",
    },
    {
      id: "purchasePrice",
      label: "Purchase price",
      type: "currency",
      default: 210000,
      min: 0,
      max: 5000000,
      step: 5000,
    },
    {
      id: "purchaseCosts",
      label: "Buying costs",
      type: "currency",
      default: 8600,
      min: 0,
      max: 200000,
      step: 100,
      help: "Stamp duty, legal fees and survey fees when you bought the property.",
    },
    {
      id: "improvements",
      label: "Capital improvements",
      type: "currency",
      default: 14000,
      min: 0,
      max: 1000000,
      step: 500,
      help: "Extensions, loft conversions and other capital works still reflected in the property. Not repairs, redecoration or maintenance.",
    },
    {
      id: "ownershipMonths",
      label: "Months owned in total",
      type: "number",
      default: 120,
      min: 1,
      max: 900,
      step: 1,
    },
    {
      id: "occupationMonths",
      label: "Months lived in as your main home",
      type: "number",
      default: 0,
      min: 0,
      max: 900,
      step: 1,
      help: "Enter 0 for a pure buy-to-let or second home. The final 9 months of ownership are added automatically if you ever lived there.",
    },
    {
      id: "otherIncome",
      label: "Your taxable income for the year",
      type: "currency",
      default: 38000,
      min: 0,
      max: 1000000,
      step: 1000,
      help: "Salary, self-employment profit, rental profit and other income for 2026/27. This sets how much of the gain is taxed at 18% rather than 24%.",
    },
    {
      id: "completionDay",
      label: "Completion date: day",
      type: "number",
      default: 29,
      min: 1,
      max: 31,
      step: 1,
      help: "The 60 days run from legal completion, not exchange of contracts.",
    },
    {
      id: "completionMonth",
      label: "Completion date: month",
      type: "select",
      default: "5",
      options: MONTHS.map((m, i) => ({ value: String(i + 1), label: m })),
    },
    {
      id: "completionYear",
      label: "Completion date: year",
      type: "select",
      default: "2026",
      options: [
        { value: "2026", label: "2026" },
        { value: "2027", label: "2027" },
        { value: "2028", label: "2028" },
      ],
    },
    {
      id: "aeaAlreadyUsed",
      label: "Annual exempt amount already used this year",
      type: "currency",
      default: 0,
      min: 0,
      max: 3000,
      step: 100,
      advanced: true,
      help: "If other gains this tax year have used some of your £3,000 exemption.",
    },
  ],
  compute(values) {
    const r = calcCgt60Day(
      Number(values.proceeds),
      Number(values.saleCosts),
      Number(values.purchasePrice),
      Number(values.purchaseCosts),
      Number(values.improvements),
      Number(values.ownershipMonths),
      Number(values.occupationMonths),
      Number(values.otherIncome),
      Number(values.aeaAlreadyUsed),
      Number(values.completionDay),
      Number(values.completionMonth),
      Number(values.completionYear),
    );
    const deadlineStr = fmtDate(r.deadline);
    if (!r.returnNeeded) {
      return {
        headline: {
          label: "CGT to pay within 60 days",
          value: gbp(0),
          sub: "No 60-day return needed",
          tone: "good",
        },
        rows: [
          { label: r.grossGain < 0 ? "Loss on disposal" : "Gain before reliefs", value: gbp(Math.abs(r.grossGain)) },
          ...(r.prrRelief > 0 ? [{ label: "Private residence relief", value: `- ${gbp(r.prrRelief)}` }] : []),
          ...(r.aeaUsed > 0 ? [{ label: "Annual exempt amount used", value: `- ${gbp(r.aeaUsed)}` }] : []),
          { label: "Chargeable gain", value: gbp(r.chargeableGain), strong: true },
        ],
        verdict: { text: "No 60-day return needed", positive: true },
        note: r.reason,
      };
    }
    return {
      headline: {
        label: "CGT to pay on account within 60 days",
        value: gbp(r.taxDue),
        sub: `Report and pay by ${deadlineStr}`,
        tone: "warn",
      },
      rows: [
        { label: "Gain before reliefs", value: gbp(r.grossGain) },
        ...(r.prrRelief > 0
          ? [{ label: `Private residence relief (${r.prrMonths} of ${Number(values.ownershipMonths)} months)`, value: `- ${gbp(r.prrRelief)}` }]
          : []),
        { label: "Annual exempt amount", value: `- ${gbp(r.aeaUsed)}` },
        { label: "Chargeable gain", value: gbp(r.chargeableGain), strong: true },
        ...(r.taxedAt18 > 0 ? [{ label: "Taxed at 18% (basic-rate band)", value: gbp(r.taxedAt18) }] : []),
        ...(r.taxedAt24 > 0 ? [{ label: "Taxed at 24%", value: gbp(r.taxedAt24) }] : []),
        { label: "Payment on account due", value: gbp(r.taxDue), strong: true },
        { label: "Filing and payment deadline", value: deadlineStr, strong: true },
      ],
      note: "The 60-day clock starts at completion. The payment is on account: your final CGT position is settled through Self Assessment, where the rate split can change if your income for the year turns out differently. Non-UK residents must file a 60-day return even when no tax is due.",
    };
  },
  explainer: {
    heading: "How the 60-day rule and this calculation work",
    paragraphs: [
      "Since 27 October 2021, UK residents who sell a UK residential property and have CGT to pay must file a property return through HMRC's real-time CGT on UK Property service and pay the tax on account within 60 days of completion. Miss the deadline and HMRC charges an automatic £100 penalty, further penalties from 6 months late, and interest on unpaid tax.",
      "The gain is your sale price less selling costs, less what you paid for the property, buying costs (including stamp duty) and capital improvements. If the property was ever your only or main home, private residence relief exempts the gain for the months you lived there plus the final 9 months of ownership, apportioned over your total ownership period. The first £3,000 of remaining gains in 2026/27 is covered by the annual exempt amount. What is left is taxed at 18% up to the top of your basic-rate band (£50,270 of taxable income) and 24% above it.",
      "Worked example 1: a landlord sells a buy-to-let for £320,000 with £5,400 selling costs, having bought it for £210,000 with £8,600 buying costs and spent £14,000 on an extension. The gain is £82,000. No private residence relief applies, so after the £3,000 exemption the chargeable gain is £79,000. With other taxable income of £38,000, £12,270 of basic-rate band remains: £12,270 is taxed at 18% (£2,208.60) and £66,730 at 24% (£16,015.20), a payment on account of £18,223.80. Completion on 29 May 2026 means the return and payment are due by 28 July 2026.",
      "Worked example 2: a seller owned a house for 240 months and lived in it as their main home for the first 180. Sale price £410,000 with £6,200 costs, purchase £195,000 with £3,800 costs, improvements £25,000, giving a gain of £180,000. Private residence relief covers 189 of 240 months (180 lived in plus the final 9), exempting £141,750. After the £3,000 exemption the chargeable gain is £35,250. With income of £60,000 the whole gain is taxed at 24%: £8,460 due. Completion on 12 September 2026 sets the deadline at 11 November 2026.",
    ],
  },
  faqs: [
    {
      question: "When do I not need to file a 60-day return?",
      answer:
        "UK residents only file when CGT is actually due. If the sale makes a loss, private residence relief covers the whole gain, or the gain is within your annual exempt amount, there is nothing to file within 60 days. You may still need to include the disposal on your Self Assessment return, for example where proceeds exceed £50,000 and you already file. Non-UK residents are different: they must file a 60-day return for any UK property disposal, even at a loss.",
    },
    {
      question: "Does the 60 days run from exchange or completion?",
      answer:
        "The filing and payment deadline is 60 days from completion. The date of disposal for working out which tax year the gain falls in is the date of unconditional exchange of contracts, which matters for rates and the annual exempt amount if exchange and completion straddle 5 April.",
    },
    {
      question: "What counts as a capital improvement?",
      answer:
        "Capital expenditure that adds value and is still reflected in the property at sale: extensions, loft or garage conversions, a new conservatory. Repairs, redecoration and like-for-like replacements are revenue costs and cannot be deducted from the gain (though landlords may have already claimed them against rental profits).",
    },
    {
      question: "How does private residence relief work if I let the property after living in it?",
      answer:
        "You get full relief for the months you occupied it as your only or main home, plus the final 9 months of ownership regardless of use. The rest of the gain, covering the let period, is chargeable. Lettings relief was restricted from April 2020 and now only applies where you shared occupation with your tenant, so most departing owner-occupiers who later let the property cannot claim it.",
    },
    {
      question: "Is the 60-day payment my final CGT bill?",
      answer:
        "No, it is a payment on account based on a reasonable estimate of your income and gains at the time. The final position is settled through Self Assessment after the tax year ends. If your income was lower than estimated, more of the gain falls in the 18% band and you get a repayment; if higher, you pay the difference.",
    },
    {
      question: "What are the CGT rates on residential property in 2026/27?",
      answer:
        "18% on gains within your unused basic-rate band and 24% above it. The annual exempt amount is £3,000. These residential rates now match the main CGT rates, but the 60-day reporting obligation applies only to residential property disposals.",
    },
  ],
  related: [
    {
      label: "Selling a business instead? BADR CGT Calculator (Business Asset Disposal Relief)",
      href: "/calculators/badr-cgt-calculator",
    },
  ],
};
