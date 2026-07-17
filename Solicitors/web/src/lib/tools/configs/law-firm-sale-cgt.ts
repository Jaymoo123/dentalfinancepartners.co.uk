import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";
import { calcPracticeSaleCgt } from "@/lib/tools/compute/practice-sale-cgt";

/**
 * Practice Sale CGT / Net Proceeds calculator (law-firm-sale-cgt).
 *
 * TOOL_ROSTER.md #3, premium (gated result detail). Compute reuses the
 * golden-tested calcPracticeSaleCgt lib (BADR 18% from 6 Apr 2026, £1m
 * lifetime limit, CGT 18%/24%, AEA £3,000).
 *
 * Structure handling:
 * - Partnership / LLP interest: goodwill + tangibles are the capital
 *   consideration; WIP is an income receipt (ITTOIA 2005 ss.182 to 185) and is
 *   EXCLUDED from the gain. Shown separately so sellers see the split.
 * - Ltd company share sale: the whole price (goodwill + WIP + tangibles value)
 *   is consideration for the shares, so it is ALL capital, including the WIP
 *   element.
 *
 * ponytail: tangibles are treated as chargeable consideration in the
 * partnership case. Plant sold at or below cost produces no chargeable gain
 * (and balancing charges are income, not CGT); the note discloses this.
 */
export const lawFirmSaleCgtTool: GenericTool = {
  kind: "generic",
  slug: "law-firm-sale-cgt",
  name: "Practice Sale CGT Calculator",
  category: "Succession & Sale",
  oneLiner:
    "Net-of-tax proceeds on selling a law firm or partnership interest: goodwill, BADR at 18%, £1m lifetime limit, partnership vs company share sale. UK 2026/27.",
  embedHeight: 640,
  metaTitle: "Law Firm Sale CGT Calculator 2026/27 | Practice Sale Net Proceeds",
  metaDescription:
    "Free practice sale CGT calculator for solicitors. Goodwill gain, Business Asset Disposal Relief at 18%, £1m lifetime limit, partnership interest vs Ltd share sale, and your net proceeds after tax. UK 2026/27.",
  intro:
    "Selling a firm, retiring from a partnership, or disposing of your shares in an incorporated practice? Enter the price split and your base cost to see the chargeable gain, how much of it Business Asset Disposal Relief covers at 18%, and what lands in your pocket after Capital Gains Tax.",
  ctaLabel: "Plan my exit with a specialist",
  fields: [
    {
      id: "structure",
      label: "What are you selling?",
      type: "select",
      default: "partnership",
      options: [
        { value: "partnership", label: "Partnership / LLP interest" },
        { value: "company", label: "Ltd company shares" },
      ],
      help: "Changes how WIP is taxed. On a share sale the whole price is capital; on a partnership exit, WIP is taxed as income, not capital gain.",
    },
    {
      id: "goodwill",
      label: "Price allocated to goodwill",
      type: "currency",
      default: 500000,
      min: 0,
      max: 3000000,
      step: 10000,
      help: "The goodwill element of the sale agreement (or, for a share sale, the part of the price that reflects goodwill).",
    },
    {
      id: "wip",
      label: "Price allocated to WIP",
      type: "currency",
      default: 80000,
      min: 0,
      max: 1000000,
      step: 5000,
      help: "Unbilled work in progress bought by the purchaser.",
    },
    {
      id: "tangibles",
      label: "Price allocated to tangible assets",
      type: "currency",
      default: 20000,
      min: 0,
      max: 1000000,
      step: 5000,
      help: "Fixtures, equipment and other tangible assets included in the deal.",
    },
    {
      id: "baseCost",
      label: "Your base cost",
      type: "currency",
      default: 100000,
      min: 0,
      max: 2000000,
      step: 5000,
      help: "Partnership: your capital contribution plus any amount paid for your share of goodwill. Company: what you paid (or subscribed) for the shares.",
    },
    {
      id: "otherIncome",
      label: "Your other taxable income this year",
      type: "currency",
      default: 80000,
      min: 0,
      max: 500000,
      step: 5000,
      help: "Profit share, salary and other income in the tax year of sale. Determines whether any non-BADR gain falls in the 18% or 24% CGT band.",
    },
    {
      id: "badrEligible",
      label: "Business Asset Disposal Relief expected to apply (2-year ownership and trading conditions met)",
      type: "toggle",
      default: true,
    },
    {
      id: "badrRemaining",
      label: "BADR lifetime allowance remaining",
      type: "currency",
      default: 1000000,
      min: 0,
      max: 1000000,
      step: 50000,
      advanced: true,
      help: "£1,000,000 lifetime limit, reduced by gains on which you have already claimed BADR (or Entrepreneurs' Relief before 2020).",
    },
    {
      id: "aeaAvailable",
      label: "Annual exempt amount still available",
      type: "currency",
      default: 3000,
      min: 0,
      max: 3000,
      step: 500,
      advanced: true,
      help: "£3,000 for 2026/27, less any already used against other gains this tax year.",
    },
  ],
  compute: (v) => {
    const structure = String(v.structure);
    const goodwill = Number(v.goodwill) || 0;
    const wip = Number(v.wip) || 0;
    const tangibles = Number(v.tangibles) || 0;
    const baseCost = Number(v.baseCost) || 0;
    const otherIncome = Number(v.otherIncome) || 0;
    const badrEligible = Boolean(v.badrEligible);
    const badrRemaining = Math.max(0, Number(v.badrRemaining) || 0);
    const aeaAvailable = Math.max(0, Number(v.aeaAvailable) || 0);

    const isCompany = structure === "company";
    // Share sale: WIP value is inside the share price, so it is capital.
    // Partnership exit: WIP is an income receipt and stays out of the gain.
    const capitalProceeds = isCompany ? goodwill + wip + tangibles : goodwill + tangibles;
    const gain = Math.max(0, capitalProceeds - baseCost);

    const r = calcPracticeSaleCgt({
      gain,
      otherIncome,
      badrEligible,
      aeaAvailable,
      badrLifetimeRemaining: badrRemaining,
    });

    const netCapital = capitalProceeds - r.totalCgt;

    const rows = [
      { label: "Capital consideration", value: gbp(Math.round(capitalProceeds)) },
      { label: "Less: base cost", value: gbp(Math.round(baseCost)) },
      { label: "Chargeable gain", value: gbp(Math.round(gain)) },
      { label: "Less: annual exempt amount", value: gbp(Math.round(Math.min(gain, aeaAvailable))) },
      { label: "Taxable gain", value: gbp(Math.round(r.taxableGain)), strong: true },
      ...(r.gainAtBadr > 0
        ? [{ label: "Taxed at BADR rate (18%)", value: gbp(Math.round(r.gainAtBadr)) }]
        : []),
      ...(r.gainAtBasic > 0
        ? [{ label: "Taxed at CGT basic rate (18%)", value: gbp(Math.round(r.gainAtBasic)) }]
        : []),
      ...(r.gainAtHigher > 0
        ? [{ label: "Taxed at CGT higher rate (24%)", value: gbp(Math.round(r.gainAtHigher)) }]
        : []),
      { label: "Total CGT payable", value: gbp(Math.round(r.totalCgt)), strong: true },
      { label: "Net capital proceeds after CGT", value: gbp(Math.round(netCapital)), strong: true },
      ...(!isCompany && wip > 0
        ? [{ label: "WIP proceeds (taxed as income, not CGT)", value: gbp(Math.round(wip)) }]
        : []),
    ];

    const wipNote = isCompany
      ? "On a share sale the whole price, including the WIP element, is consideration for the shares and taxed as capital gain."
      : "WIP realised on a partnership sale is an income receipt (ITTOIA 2005 ss.182 to 185), taxed at your income tax rates, not CGT. It is excluded from the gain above and shown separately.";

    return {
      headline: {
        label: "Estimated CGT on the sale",
        value: gbp(Math.round(r.totalCgt)),
        sub: `Net capital proceeds after CGT: ${gbp(Math.round(netCapital))}${!isCompany && wip > 0 ? " (plus WIP, taxed as income)" : ""}`,
        tone: badrEligible && r.gainAtHigher > 0 ? ("warn" as const) : ("default" as const),
      },
      rows,
      note: `${wipNote} BADR at 18% assumes the qualifying conditions (2-year ownership, trading business, and for shares at least 5% of votes and economic rights as an officer or employee) are met; salaried LLP members may not qualify. Tangible assets are modelled as chargeable consideration; plant sold at or below cost usually produces no chargeable gain, and capital allowance balancing charges are income. Estimates only, based on 2026/27 rates.`,
    };
  },
  explainer: {
    heading: "How CGT works when you sell a law firm",
    paragraphs: [
      "The starting point is the split of the price in the sale agreement. Goodwill, tangible assets and (in a share sale) work in progress are capital consideration. Your chargeable gain is that capital consideration minus your base cost: for a partner, broadly your capital contribution plus anything you paid for your share of goodwill; for a shareholder, what you paid or subscribed for the shares.",
      "Business Asset Disposal Relief taxes qualifying gains at 18% from 6 April 2026 (it was 14% in 2025/26 and 10% before April 2025), subject to a £1,000,000 lifetime limit. Gains above the remaining limit fall into normal CGT: 18% within your unused basic rate band, 24% above it. Because BADR gains use the basic rate band first, most sellers with partner-level income pay 24% on the excess.",
      "Structure changes the tax on WIP, not the CGT rates. Selling a partnership or LLP interest, the WIP element is an income receipt taxed at income tax rates. Selling company shares, the buyer pays one price for the shares and the whole amount, WIP included, is capital gain. On larger WIP books this difference alone can move the net proceeds by tens of thousands of pounds.",
      "The annual exempt amount (£3,000 in 2026/27) comes off the gain before any tax is charged. The remaining moving parts are eligibility ones: the 2-year ownership and trading conditions for BADR, the 5% shareholding tests on a share sale, and the salaried member rules for LLP members, all of which need checking well before heads of terms are signed.",
      "Worked example: James is a partner at Whitmore Family Law LLP and is retiring after 12 years. The sale agreement allocates £500,000 to goodwill, £80,000 to WIP and £20,000 to tangible assets. His base cost (capital contribution) is £100,000. His other income in the year of sale is £80,000. As a partnership exit, WIP of £80,000 is an income receipt (ITTOIA 2005 ss.182 to 185) and falls outside the CGT calculation. Capital proceeds are £500,000 + £20,000 = £520,000. Gain before AEA: £520,000 minus £100,000 = £420,000. After the £3,000 annual exempt amount, taxable gain = £417,000. BADR applies at 18% (from 6 April 2026) on the full £417,000 within the £1,000,000 lifetime limit, giving CGT of £417,000 x 18% = £75,060. Net capital proceeds after CGT = £520,000 minus £75,060 = £444,940. The £80,000 WIP element is then taxed separately at James's income tax rates.",
    ],
  },
  faqs: [
    {
      question: "What CGT rate applies when I sell my law firm in 2026/27?",
      answer:
        "If Business Asset Disposal Relief applies, qualifying gains are taxed at 18% up to your remaining £1,000,000 lifetime limit. Gains above that limit are taxed at the standard CGT rates: 18% to the extent you have unused basic rate band, and 24% above it. Most equity partners have no basic rate band left after their profit share, so the excess is usually taxed at 24%.",
    },
    {
      question: "Do I still get Business Asset Disposal Relief at 18%?",
      answer:
        "BADR still exists but the rate has risen: 10% before 6 April 2025, 14% in 2025/26, and 18% from 6 April 2026. The £1,000,000 lifetime limit is unchanged. For a partnership interest you generally need to have been a partner in the trading business for at least 2 years. For company shares you generally need at least 5% of the ordinary shares, votes and economic rights, and to be an officer or employee, for the 2 years to the sale.",
    },
    {
      question: "How is WIP taxed when a firm is sold?",
      answer:
        "It depends on what is being sold. On the sale of a partnership or LLP interest, the amount received for unbilled work in progress is an income receipt under ITTOIA 2005 sections 182 to 185, taxed at income tax rates, not as capital gain. On a company share sale, the buyer pays a single price for the shares, so the WIP value inside that price is part of the capital gain and can benefit from BADR.",
    },
    {
      question: "Is selling a partnership interest taxed differently from selling company shares?",
      answer:
        "The CGT rates are the same, but three things differ. First, WIP: income on a partnership exit, capital on a share sale. Second, base cost: a partner's base cost is broadly their capital contribution plus any amount paid for goodwill, while a shareholder's is the price paid or subscribed for the shares. Third, the BADR conditions differ: partnership interests need the 2-year partner-in-a-trading-business test, shares need the 5% personal company tests as well.",
    },
    {
      question: "What if I have already used some of my BADR lifetime limit?",
      answer:
        "The £1,000,000 limit is a lifetime figure covering every disposal on which you have claimed BADR, and Entrepreneurs' Relief claims before 2020 count against it too. Only the unused balance is available at 18%; the rest of the gain falls into normal CGT at 18% or 24%. Use the advanced option in the calculator to enter your remaining allowance.",
    },
    {
      question: "Can I reduce the CGT before selling?",
      answer:
        "The big levers are set before the deal, not after: confirming BADR eligibility for every selling partner or shareholder (including fixing salaried member or sub-5% problems at least 2 years out), the goodwill vs WIP allocation in the sale agreement, timing the completion date against your income and other gains, and spousal transfers to use two annual exempt amounts and two BADR limits. All of these need doing well before exchange, which is why exit planning should start 2 or more years ahead.",
    },
  ],
  related: [
    { label: "Law Firm Valuation Calculator", href: "/calculators/law-firm-valuation" },
    { label: "LLP Profit Share Calculator", href: "/calculators/llp-profit-share-allocation" },
  ],
};
