import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcEOTTaxSaving, type IncomeBand } from "@/lib/tools/compute/eot-tax-saving-calculator";

export const eotTaxSavingCalculatorTool: GenericTool = {
  kind: "generic",
  slug: "eot-tax-saving-calculator",
  name: "EOT Tax Saving Calculator",
  category: "Exit and Capital Gains",
  oneLiner:
    "See the CGT on a sale to an Employee Ownership Trust under the current 50% relief rule (from 26 November 2025), contrasted with the old 100% relief position and a straight trade sale using BADR.",
  embedHeight: 680,
  metaTitle: "EOT Tax Saving Calculator | CGT After the 50% Relief Cut",
  metaDescription:
    "Free EOT tax calculator for UK company owners. See the CGT on a sale to an Employee Ownership Trust under the current 50% relief rule (from 26 November 2025), the old 100% position, and a trade sale using BADR.",
  intro:
    "Selling a controlling interest to an Employee Ownership Trust (EOT) is no longer CGT-free. From 26 November 2025, only 50% of the gain is relieved; the other 50% is chargeable now at the standard CGT rate, with BADR and Investors' Relief blocked on that taxable slice. Enter your numbers to see the CGT under the current rule, contrasted with the old (pre-26 Nov 2025) 100% relief position, and with a straight trade sale using BADR.",
  fields: [
    {
      id: "saleValue",
      label: "Sale value (market value of the company, 100% basis)",
      type: "currency",
      default: 4000000,
      min: 0,
      max: 100000000,
      step: 10000,
    },
    {
      id: "baseCost",
      label: "Original base cost of the shares",
      type: "currency",
      default: 200000,
      min: 0,
      max: 20000000,
      step: 1000,
      help: "What you paid for the shares originally. Often nominal for founders who incorporated their own business.",
    },
    {
      id: "ownershipPct",
      label: "Shareholding sold to the EOT",
      type: "number",
      default: 100,
      min: 1,
      max: 100,
      step: 1,
      suffix: "%",
      help: "An EOT must acquire a controlling interest (more than 50%), but you can model any percentage sold.",
    },
    {
      id: "incomeBand",
      label: "Seller's tax band",
      type: "select",
      default: "higher",
      options: [
        { value: "higher", label: "Higher or additional rate (24% on the taxable slice)" },
        { value: "basic", label: "Basic rate, within unused band (18% on the taxable slice)" },
      ],
    },
    {
      id: "badrRemaining",
      label: "BADR lifetime allowance remaining (for the trade-sale comparison only)",
      type: "currency",
      default: 1000000,
      min: 0,
      max: 1000000,
      step: 10000,
      help: "Used only to model the alternative straight trade-sale route with Business Asset Disposal Relief. BADR cannot be claimed on the EOT's taxable 50%.",
    },
  ],
  compute(values) {
    const r = calcEOTTaxSaving(
      Number(values.saleValue),
      Number(values.baseCost),
      Number(values.ownershipPct),
      String(values.incomeBand) as IncomeBand,
      Number(values.badrRemaining),
    );
    const rows = [
      { label: "Total chargeable gain", value: gbp(r.gain) },
      { label: "Chargeable now (50% of the gain)", value: gbp(r.chargeableNow) },
      { label: "CGT payable now (current rule, no BADR/IR available)", value: gbp(r.cgtNew), strong: true as const },
      { label: "Held-over 50% (latent gain, bites the trust's trustees later)", value: gbp(r.heldOver) },
      { label: "Net proceeds now, current rule", value: gbp(r.netProceedsNew) },
      { label: "For contrast: CGT under the old, pre-26-Nov-2025 rule (100% relief)", value: gbp(r.cgtOld) },
      { label: "For comparison: CGT on a straight trade sale using BADR", value: gbp(r.tradeSaleCgt) },
      { label: "For comparison: net proceeds on a straight trade sale using BADR", value: gbp(r.tradeSaleNet) },
    ];
    return {
      headline: {
        label: "CGT payable now on the EOT sale",
        value: gbp(r.cgtNew),
        sub: `Before 26 Nov 2025 this would have been £0. A further ${gbp(r.heldOver)} is held over, latent in the trust.`,
        tone: "warn",
      },
      rows,
      note: "Estimate only, not advice. Assumes the disposal otherwise qualifies for EOT relief (controlling interest, trading company, all-employee benefit) and ignores other reliefs, losses or gains in the same tax year.",
    };
  },
  explainer: {
    heading: "How EOT tax changed on 26 November 2025",
    paragraphs: [
      "Selling a controlling interest in a trading company to an Employee Ownership Trust used to be entirely free of Capital Gains Tax: the relief covered 100% of the gain. At the Autumn Budget on 26 November 2025, the government cut that relief to 50%, with immediate effect for disposals from that date. HMRC's stated reason was cost: the relief had grown to roughly £2 billion a year, about 20 times its original 2013 costing.",
      "Under the current rule, 50% of the gain becomes a chargeable gain at the time of sale, taxed at the ordinary CGT rate for shares, 24% for higher and additional-rate sellers or 18% within any unused basic-rate band, after the £3,000 annual exempt amount. Business Asset Disposal Relief and Investors' Relief cannot be claimed on this taxable slice, so there is no reduced rate available on it. The other 50% of the gain is not chargeable at the time of sale, but it does not disappear: it is effectively held over and becomes chargeable to the trustees on a future disposal of the shares by the trust.",
      "Guides that still describe a sale to an EOT as entirely CGT-free were written before 26 November 2025 and are now out of date. Worked example: an owner sells 100% of a trading company to an EOT for £4,000,000, with an original base cost of £200,000, giving a total gain of £3,800,000. Under the old rule this sale would have triggered £0 CGT. Under the current rule, 50% of the gain (£1,900,000) is chargeable now; after the £3,000 annual exempt amount, CGT of roughly £455,000 is payable at the point of sale, at the higher 24% rate with no BADR available. The remaining £1,900,000 is held over as a latent gain inside the trust, chargeable to the trustees whenever they eventually dispose of the shares.",
    ],
  },
  faqs: [
    {
      question: "Is selling to an EOT still CGT-free?",
      answer:
        "No, not since 26 November 2025. Before that date, a qualifying sale to an Employee Ownership Trust was relieved in full: 0% CGT. From 26 November 2025, only 50% of the gain is relieved. The other 50% is chargeable at the time of sale at the standard CGT rate for shares, with no BADR or Investors' Relief available on that slice.",
    },
    {
      question: "How much CGT will I pay on an EOT sale now?",
      answer:
        "Take 50% of your total gain, deduct the £3,000 annual exempt amount, then apply 24% if you're a higher or additional-rate taxpayer, or 18% within any unused basic-rate band. On a £3.8 million gain this comes to roughly £455,000, compared with £0 under the pre-26-Nov-2025 rule.",
    },
    {
      question: "Can I claim BADR on an EOT sale to reduce the taxable 50%?",
      answer:
        "No. Business Asset Disposal Relief and Investors' Relief are specifically blocked on the taxable 50% of an EOT disposal. The taxable slice is charged at the standard CGT rate for shares (24% or 18%), regardless of how long you've held the shares or your shareholding percentage.",
    },
    {
      question: "What happens to the other 50% of the gain?",
      answer:
        "It is not chargeable to you at the time of sale. Instead it is effectively held over as a latent gain sitting inside the trust structure, and it becomes chargeable to the trust's trustees when they eventually dispose of the shares, for example if the trust sells the company on again in future.",
    },
    {
      question: "Do employees still get a tax-free bonus under an EOT?",
      answer:
        "Yes, that part of the EOT regime is unchanged. Companies owned by a qualifying EOT can pay employees an income-tax-free bonus of up to £3,600 a year each (still subject to National Insurance), separately from the CGT relief on the original sale that this calculator covers.",
    },
    {
      question: "Is an EOT still worth it after the relief cut?",
      answer:
        "It depends on your priorities. An EOT sale still avoids the need to find an external buyer, can preserve company culture and jobs, and allows a phased exit funded from future profits, but it no longer offers a full CGT exemption. Compare the CGT under the current 50% rule against a straight trade sale using BADR (both modelled by this calculator) alongside the non-tax factors before deciding.",
    },
  ],
  related: [
    { label: "Employee Ownership Trust Guide", href: "/blog/exit-and-capital-gains/employee-ownership-trust-guide" },
    { label: "EOT Tax Relief and CGT", href: "/blog/exit-and-capital-gains/eot-tax-relief-and-cgt" },
    { label: "Selling a Business: Tax, CGT and BADR", href: "/blog/exit-and-capital-gains/selling-a-business-tax-cgt-badr" },
  ],
};
