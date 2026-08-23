import type { CalcResultRow, GenericTool } from "../types";
import { gbp, pct } from "../format";
import { computeCgt } from "@/lib/cgt";

/**
 * Cost of selling a house, England, with an optional CGT estimate.
 *
 * Wave 12 Cluster A calculator (plan A2, direct target `estate agent fees
 * calculator uk`). Two things make it not-a-clone of the twenty other
 * cost-of-selling calculators on this SERP:
 *
 *  1. It SPLITS the itemised bill into costs that reduce a capital gain and
 *     costs that do not. Ground truth: docs/property/house_positions.md §5.B.
 *     TCGA 1992 s.38(1)(c) with the s.38(2) list is EXHAUSTIVE (CG15250: "The
 *     definition is exhaustive"), so agent commission, sale conveyancing,
 *     advertising to find a buyer (s.38(2)(b)) and the EPC are in, and
 *     removals, storage, cleaning, mortgage redemption and ERCs are OUT.
 *     s.38(3) rules out interest expressly. That correction is the whole
 *     differentiator, per §5.B: "the single most useful line the
 *     cost-of-selling cluster can carry".
 *  2. VAT: CG14300 allows the expense INCLUSIVE of VAT where no set-off is
 *     available in the vendor's VAT account, so a private seller deducts the
 *     GROSS agent fee. Every fee figure on this tool is therefore inc-VAT.
 *
 * CHAINING, not duplicating: the deductible subtotal is surfaced as the figure
 * to type into capital-gains-tax-calculator's single combined "Buying, selling
 * & improvement costs" field. The CGT estimate here runs the SAME computeCgt
 * engine that tool runs, so the two surfaces can never disagree, and the
 * capital-gains-tax-calculator file is not touched (it is a live experiment).
 *
 * ponytail: no region select. The briefs carry sourced figures for England
 * only, and a select that changes no number is worse than a stated scope; the
 * note states the scope and the related links carry Scotland and Wales.
 *
 * Register: briefs/property/wave12/_language_spec.md, calculator-landing row.
 * Hard rule 4 of that spec bans statutory references from body prose, so every
 * citation in this file lives in comments and never in a user-facing string.
 */

/**
 * HomeOwners Alliance, 2026 average sole-agency fee, including VAT.
 *
 * Exported because `components/property/cost-of-selling-figures.tsx` derives
 * every money figure on /cost-of-selling-a-property from these two constants
 * rather than typing them, so the page's visuals cannot drift from the tool it
 * sends the reader to. Same posture as `SdltMarketValue` over `lib/sdlt.ts`.
 */
export const DEFAULT_AGENT_FEE_PCT = 1.42;

/** HM Land Registry UK HPI, England average, June 2026 (£293,262), rounded. */
export const DEFAULT_SALE_PRICE = 293_000;

export const costOfSellingCalculator: GenericTool = {
  kind: "generic",
  slug: "cost-of-selling-calculator",
  name: "Cost of Selling a House Calculator",
  category: "Capital gains tax",
  oneLiner:
    "Work out what selling your house will cost you, and which of those costs come off a capital gain if it was let.",
  metaTitle: "Cost of Selling a House Calculator | Agent Fees UK",
  metaDescription:
    "Work out the cost of selling your house: agent fees at 1.42% inc VAT, conveyancing, EPC and removals, plus a capital gains tax estimate if it was let.",
  intro:
    "How much will it cost you to sell your house? Fill in the boxes and you get the full breakdown in under a minute. It prices the estate agent fee including VAT, the sale conveyancing, the EPC and the removal van. Was the property let out, or a second home? Tick one box and you get an estimate of the capital gains tax too. Every figure is a starting point you can edit.",
  ctaLabel: "Sold a let property? Get the CGT figure checked →",
  embedHeight: 1020,
  fields: [
    {
      id: "salePrice",
      label: "What you expect to sell for",
      type: "currency",
      default: DEFAULT_SALE_PRICE,
      step: 5_000,
      help: "The average home in England was worth £293,262 in June 2026 on the Land Registry house price index. Put your own asking price in.",
    },
    {
      id: "agentFeePct",
      label: "Estate agent fee, including VAT",
      type: "number",
      default: DEFAULT_AGENT_FEE_PCT,
      step: 0.05,
      suffix: "%",
      help: "The HomeOwners Alliance puts the 2026 average at 1.42% including VAT, with sole agency deals running from 1.2% to 1.8%. Use the quote you have been given, and check it includes VAT.",
    },
    {
      id: "conveyancing",
      label: "Conveyancing for the sale",
      type: "currency",
      default: 700,
      step: 50,
      help: "About £700 for a freehold sale on the HomeOwners Alliance figures. A leasehold sale costs more because of the management pack.",
    },
    {
      id: "epc",
      label: "Energy performance certificate",
      type: "currency",
      default: 80,
      step: 10,
      help: "Our own EPC cost page puts a domestic certificate at £35 to £120, so £80 sits in the middle. Enter nothing if yours is still valid.",
    },
    {
      id: "advertising",
      label: "Advertising to find a buyer",
      type: "currency",
      default: 0,
      step: 100,
      help: "Leave this at zero if your agent's fee covers the marketing. Fill it in if you are paying a portal listing or a photographer yourself.",
    },
    {
      id: "removals",
      label: "Removals",
      type: "currency",
      default: 550,
      step: 100,
      help: "The HomeOwners Alliance publishes £334 for a one-bedroom local move and £731 for a three-bedroom one, so £550 sits between them. Distance, volume and packing move it a long way.",
    },
    {
      id: "letOrSecond",
      label: "This was a let property or a second home, not my main home",
      type: "toggle",
      default: false,
      help: "Tick this and the tool adds a capital gains tax estimate. Leave it clear and there is no tax line, because private residence relief covers a main home.",
    },
    {
      id: "purchasePrice",
      label: "What you paid for it",
      type: "currency",
      default: 200_000,
      step: 5_000,
      help: "Only used for the tax estimate. If you inherited it, use the value at the date of death.",
    },
    {
      id: "otherIncome",
      label: "Your other taxable income this year",
      type: "currency",
      default: 50_000,
      step: 1_000,
      help: "Only used for the tax estimate. Salary and rental profit before the sale. It decides how much of the gain is taxed at 18% and how much at 24%.",
    },
  ],
  compute: (v) => {
    const salePrice = Math.max(0, Number(v.salePrice));
    const feePct = Math.max(0, Number(v.agentFeePct));
    const conveyancing = Math.max(0, Number(v.conveyancing));
    const epc = Math.max(0, Number(v.epc));
    const advertising = Math.max(0, Number(v.advertising));
    const removals = Math.max(0, Number(v.removals));
    const letOrSecond = Boolean(v.letOrSecond);

    const agentFee = (salePrice * feePct) / 100;

    // s.38(1)(c) + s.38(2), exhaustive. Agent commission (gross of VAT for a
    // private seller, CG14300), transfer/conveyancing costs, and advertising
    // to find a buyer. The EPC rides in on the s.38(2)(b) MARKETING limb only
    // (it is required before marketing under SI 2012/3118 reg 6), and §5.B's
    // 08-21 wave-close position requires a one-clause hedge on every surface
    // that includes it: a domestic energy assessor is not one of the six
    // named professions and HMRC nowhere lists the EPC expressly. Never a
    // bare assertion. The note strings and the FAQ carry that hedge.
    const deductible = agentFee + conveyancing + epc + advertising;
    // Not on the s.38(2) list at either end. §5.B: never write that removals
    // come off the gain.
    const nonDeductible = removals;
    const total = deductible + nonDeductible;
    const share = salePrice > 0 ? (total / salePrice) * 100 : 0;

    const rows: CalcResultRow[] = [
      { label: `Estate agent fee at ${feePct}% including VAT`, value: gbp(agentFee) },
      { label: "Conveyancing for the sale", value: gbp(conveyancing) },
      { label: "Energy performance certificate", value: gbp(epc) },
      ...(advertising > 0
        ? [{ label: "Advertising to find a buyer", value: gbp(advertising) }]
        : []),
      { label: "Costs that come off a capital gain", value: gbp(deductible), strong: true },
      { label: "Removals, which get no tax relief", value: gbp(nonDeductible) },
      { label: "Total cost of selling", value: gbp(total), strong: true },
    ];

    const sourcesNote =
      "Every figure here is a starting point, so replace them with your own quotes. The agent fee starts at 1.42% including VAT, the HomeOwners Alliance average for 2026, and the sale conveyancing starts at £700 from the same source. The EPC starts at £80, the middle of the £35 to £120 range on our own EPC cost page. Removals start at £550, between the HomeOwners Alliance figures of £334 for a one-bedroom local move and £731 for a three-bedroom one. The figures are for England: Scotland and Wales run a different conveyancing process and charge the buyer a different tax.";

    if (!letOrSecond) {
      return {
        headline: {
          label: "Total cost of selling",
          value: gbp(total),
          sub: `On a ${gbp(salePrice)} sale that is ${pct(share)} of the price, with no tax to pay`,
        },
        rows,
        note: `Your main home is covered by private residence relief, so there is no capital gains tax line here and the total above is the whole bill. Tick the let or second property box if that is not your position. ${sourcesNote}`,
      };
    }

    // Same engine the capital-gains-tax-calculator runs, so the chained figure
    // and the full tool can never disagree.
    const r = computeCgt({
      salePrice,
      purchasePrice: Math.max(0, Number(v.purchasePrice)),
      costs: deductible,
      otherIncome: Math.max(0, Number(v.otherIncome)),
      aeaUsed: false,
    });

    rows.push({ label: "Gain before allowances", value: gbp(r.gain) });
    rows.push({ label: "Less the £3,000 annual allowance", value: `−${gbp(r.aea)}` });
    rows.push({ label: "Taxable gain", value: gbp(r.taxableGain) });
    if (r.atBasic > 0) rows.push({ label: "Taxed at 18%", value: gbp(r.taxAtBasic) });
    if (r.atHigher > 0) rows.push({ label: "Taxed at 24%", value: gbp(r.taxAtHigher) });
    rows.push({ label: "Capital gains tax, estimated", value: gbp(r.tax), strong: true });
    rows.push({
      label: "Figure for the CGT calculator's costs box",
      value: `${gbp(deductible)} plus your buying and improvement costs`,
    });

    return {
      headline: {
        label: "Total cost of selling",
        value: gbp(total + r.tax),
        sub: `${gbp(total)} of selling costs plus about ${gbp(r.tax)} of capital gains tax`,
        tone: r.tax > 0 ? "warn" : "default",
      },
      rows,
      note: `The tax figure is an estimate. It takes the gain, knocks off the £3,000 annual allowance, then charges 18% on what fits in your unused basic-rate band and 24% on the rest. It assumes no relief applies, and that you have not already used your £3,000 allowance on another sale this tax year. Removals are kept out of the deductible total on purpose, because they are not on the list of costs that reduce a gain, and neither is anything you spent tidying the place up. Your EPC is counted in, as part of the cost of marketing the property, though the official list does not name it outright. Take the ${gbp(deductible)} of deductible selling costs into our capital gains tax calculator, add what you paid to buy the property and anything you spent improving it, and check the reliefs before you rely on the number. ${sourcesNote}`,
    };
  },
  explainer: {
    heading: "How much does it cost to sell a house?",
    paragraphs: [
      "Selling a house in England costs most people about £5,500, on a sale at £293,000. The Land Registry house price index put the average English home at that in June 2026. Your estate agent takes the biggest slice by far. The HomeOwners Alliance puts the 2026 average fee at 1.42% including VAT, so on a £293,000 sale your agent bill is about £4,161. Your solicitor takes about £700, and the EPC and the removal van take the rest.",
      "The agent fee is the one number worth arguing about. Sole agency deals run from 1.2% to 1.8% including VAT. Three things move you up or down that range: how many agents you sign, how easy your house is to sell, and how hard you push. So get three quotes, ask for 1.2%, and say you have a cheaper quote elsewhere. On a £293,000 sale the gap between 1.8% and 1.2% is about £1,760, which is more than your solicitor costs.",
      "Now the part that decides how much of this you get back. Was the house let out, or was it a second home? Then you may owe capital gains tax on the sale. Some of what you just spent comes off that gain and some of it does not. The agent fee comes off, and so does the sale conveyancing and any advertising you paid for yourself. Your EPC usually goes in too, as part of the cost of marketing the property, though the official list does not name it. The removal van does not. Nor does storage, cleaning, new carpets or the fee for paying your mortgage off early. The list is a fixed one, and it is shorter than most sellers assume.",
      "Is the house your main home? Then you can stop at the cost total. Private residence relief covers the gain, so you have no tax line to worry about. If it was let, tick the box and you get an estimate of your bill at 18% and 24%, after the £3,000 allowance. Treat that as a rough shape rather than a return. The deductible figure the tool hands you is the one to carry into our capital gains tax calculator. There you add what you paid for the property and anything you spent improving it, and work through your reliefs properly.",
    ],
  },
  faqs: [
    {
      question: "How much does it cost to sell a house in the UK?",
      answer:
        "About £5,500 on a £293,000 sale in England, which is roughly 1.9% of your price. That buys you an estate agent at about £4,161, £700 of conveyancing, an £80 EPC and a £550 removal van. Selling a leasehold flat costs you more, because the management pack adds to your legal bill. If you have no chain and nothing to move, it costs less. If the property was let out, add your capital gains tax, which is usually bigger than all of it put together.",
    },
    {
      question: "How much are estate agent fees?",
      answer:
        "The average is 1.42% including VAT in 2026. Sole agency deals sit between 1.2% and 1.8%. A multi-agency deal costs you more, because more than one firm is chasing your sale. On a £293,000 house, 1.42% is about £4,161, so every 0.1% you shave off is worth £293 to you. Always check whether your quote includes VAT: a fee quoted as 1.2% plus VAT is really 1.44%.",
    },
    {
      question: "Can you negotiate estate agent fees?",
      answer:
        "Yes, and your agent expects you to. Three quotes gives you something to quote back. Aim for 1.2% including VAT on sole agency, and negotiate the tie-in as hard as the rate. A shorter tie-in lets you walk away from an agent who is not selling your house, and that is often worth more to you than the rate is.",
    },
    {
      question: "Which selling costs come off a capital gain?",
      answer:
        "Your agent's commission, your conveyancing on the sale, and any advertising you paid for to find a buyer. Fees you paid a surveyor, valuer or auctioneer count too. The EPC you had to buy before you could market the house normally goes in as part of the cost of advertising for a buyer, though the official list does not name it. Deduct your agent fee including the VAT, because you cannot reclaim that VAT anywhere else. The calculator adds all of it into one subtotal for you, and that subtotal is what our capital gains tax calculator asks you for.",
    },
    {
      question: "Can I deduct removal costs from my gain?",
      answer:
        "No, and this is the most common wrong answer on the subject. The list of costs that come off a gain is a fixed one, and removals are not on it. Nor is your storage, your cleaning, your redecorating, or the charge you pay for redeeming your mortgage early. Your mortgage interest is ruled out too. Claiming any of it puts you at real risk, which is why the tool keeps those costs on a line of their own.",
    },
    {
      question: "Do I need an EPC to sell my house?",
      answer:
        "Yes, and you need it before your house goes on the market rather than at the point of sale. You have to make it available to anyone who asks about the property or comes to view it, and your buyer gets a copy free of charge. One lasts ten years, so check whether you already hold a valid one before you pay for another. Our EPC cost page puts a new one at £35 to £120.",
    },
    {
      question: "Do these figures work for Scotland and Wales?",
      answer:
        "The cost figures are for England. Your agent's fee works much the same across the UK, but Scotland runs a different sale process with home reports, and your legal costs differ. Your capital gains tax is the same wherever the property sits, because it is a UK-wide tax. If you are buying in Scotland or Wales next, we have a separate calculator for each of those purchase taxes.",
    },
  ],
  workedExamples: [
    {
      heading: "An average English home sold through a high street agent",
      inputs:
        "£293,000 sale price, 1.42% agent fee including VAT, £700 conveyancing, £80 EPC, no separate advertising, £550 removals, main home",
      steps: [
        "Estate agent fee = £293,000 × 1.42% = £4,160.60",
        "Conveyancing for the sale = £700",
        "Energy performance certificate = £80",
        "Costs that would come off a capital gain = £4,160.60 + £700 + £80 = £4,940.60, which the tool rounds to £4,941",
        "Removals = £550, which get no tax relief at either end",
        "Total cost of selling = £4,940.60 + £550 = £5,490.60, rounded to £5,491, which is 1.9% of the sale price",
        "This is a main home, so private residence relief covers the gain and there is no tax line",
      ],
    },
    {
      heading: "The same sale where the property had been let out",
      inputs:
        "£293,000 sale price, bought for £200,000, 1.42% agent fee including VAT, £700 conveyancing, £80 EPC, £550 removals, £50,000 of other income, let property",
      steps: [
        "Selling costs are the same: £4,941 deductible and £550 not deductible",
        "Gain = £293,000 - £200,000 - £4,941 = £88,059",
        "Less the £3,000 annual allowance = £85,059 taxable",
        "£50,000 of income leaves £270 of the basic-rate band unused, so £270 is taxed at 18% and £84,789 at 24%",
        "Capital gains tax = £49 + £20,349 = £20,398",
        "Total to budget for = £5,491 of selling costs plus £20,398 of tax = £25,889",
        "Had the £550 of removals been added to the deductible costs by mistake, the gain would have been understated by £550 and the tax by £132",
      ],
    },
  ],
  related: [
    {
      label: "Capital gains tax calculator: take your deductible costs straight into it",
      href: "/calculators/capital-gains-tax-calculator",
    },
    {
      label: "Capital gains tax on UK property: the complete guide",
      href: "/blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk",
    },
    {
      label: "CGT record keeping for property sales: what to save and for how long",
      href: "/blog/capital-gains-tax/cgt-record-keeping-property-sales-what-to-save-how-long",
    },
    {
      label: "EPC certificate cost UK: what you will pay",
      href: "/blog/landlord-tax-essentials/epc-certificate-cost-uk",
    },
    {
      label: "Buying in Scotland instead? LBTT calculator",
      href: "/calculators/lbtt-calculator-scotland",
    },
    {
      label: "Buying in Wales instead? LTT calculator",
      href: "/calculators/ltt-calculator-wales",
    },
  ],
};
