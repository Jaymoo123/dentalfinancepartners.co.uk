import type { GenericTool } from "../types";
import { gbp } from "../format";

const RATES: Record<string, number> = { basic: 0.2, higher: 0.4, additional: 0.45 };

export const rentalIncomeTaxCalculator: GenericTool = {
  kind: "generic",
  slug: "rental-income-tax-calculator",
  name: "Tax on Rental Income Calculator",
  category: "Income tax",
  oneLiner:
    "See how much tax you pay on your rental income, what the mortgage interest credit gives back, and what you keep.",
  metaTitle: "Tax on Rental Income Calculator | UK Landlord Tax",
  metaDescription:
    "A rental income tax calculator for UK landlords. Enter your rent, costs and mortgage interest to see the tax bill, the interest credit and your take-home.",
  intro:
    "Rent of £18,000 with £6,000 of mortgage interest leaves a higher-rate landlord £4,200. This rental income tax calculator works out the tax on the profit, the credit the interest earns back, and the cash you keep.",
  ctaLabel: "Want to pay less tax on your rentals? →",
  embedHeight: 640,
  fields: [
    { id: "rentalIncome", label: "Annual rental income", type: "currency", default: 18_000 },
    {
      id: "expenses",
      label: "Allowable expenses",
      type: "currency",
      default: 3_000,
      help: "Repairs, letting fees, insurance, ground rent etc. Do not include mortgage interest here.",
    },
    { id: "mortgageInterest", label: "Annual mortgage interest", type: "currency", default: 6_000 },
    {
      id: "band",
      label: "Your income tax band",
      type: "select",
      default: "higher",
      options: [
        { value: "basic", label: "Basic rate (20%)" },
        { value: "higher", label: "Higher rate (40%)" },
        { value: "additional", label: "Additional rate (45%)" },
      ],
    },
  ],
  compute: (v) => {
    const rate = RATES[String(v.band)] ?? 0.4;
    const profit = Math.max(0, Number(v.rentalIncome) - Number(v.expenses));
    const taxBeforeCredit = profit * rate;
    const s24Credit = Number(v.mortgageInterest) * 0.2;
    const tax = Math.max(0, taxBeforeCredit - s24Credit);
    const takeHome = profit - Number(v.mortgageInterest) - tax;
    return {
      headline: {
        label: "Income tax on your rental profit",
        value: gbp(tax),
        sub: `On £${Math.round(profit).toLocaleString("en-GB")} of profit`,
      },
      rows: [
        { label: "Rental profit (before mortgage interest)", value: gbp(profit) },
        { label: "Tax before relief", value: gbp(taxBeforeCredit) },
        { label: "Section 24 credit (20% of interest)", value: `−${gbp(s24Credit)}` },
        { label: "Take-home after tax & mortgage", value: gbp(takeHome), strong: true },
      ],
      note: "Your mortgage interest is not taken off the profit. You get a credit worth 20% of it instead, rising to 22% for 2027/28, when property income in England, Wales and Northern Ireland is taxed at 22%, 42% and 47% instead of 20%, 40% and 45%. This tool answers 2026/27. The whole profit is taxed at the one band you picked, so a profit that straddles two bands lands between the two answers. The credit cannot be worth more than 20% of your rental profit either, so a very large mortgage can leave part of it unused and carried forward. Companies are taxed differently, and this is an estimate rather than a filed return.",
    };
  },
  explainer: {
    heading: "How much tax do you pay on rental income?",
    paragraphs: [
      "Start with the rent, take off what it costs you to run the let, and what is left is your rental profit. That profit sits on top of your other income and is taxed at your top rate. The calculator's own default figures show the whole sum. Rent of £18,000 less £3,000 of running costs leaves a profit of £15,000. At the 40% higher rate that is £6,000 of tax. You then get a credit worth 20% of your £6,000 of mortgage interest, which is £1,200, so the bill falls to £4,800. Take the interest and the tax off the profit and you keep £4,200.",
      "The mortgage step is the part that catches landlords out. You cannot take the interest off the rent as a running cost. Section 24 swapped that for a credit worth 20% of the interest, whatever rate you pay. If you pay tax at 20%, the credit gives back exactly what the old deduction did. If you pay 40% or 45%, you are taxed on money you never see, because the interest still leaves your account in full.",
      "The costs you can claim are the ones that keep the let running: repairs, letting agent and management fees, insurance, ground rent, service charges and accountancy. Making the property better than it was is a different thing. Replacing a tired kitchen with a similar one is a repair and comes off your rent now. Adding an extension is capital, so it waits and cuts your gain when you sell. Rent of £1,000 a year or less is usually covered by the £1,000 property allowance, with nothing to report at all. You cannot mix that allowance with the interest credit though, so it is one or the other.",
      "Know where this answer is soft. It taxes your whole profit at the single band you choose, so a profit that pushes you from one band into the next really sits between the two figures. And it prices you as an individual, because a company pays corporation tax on its profit and still takes its interest off in full. Wondering whether the company route would leave you better off? That turns on how long you plan to hold, how much you owe and how much you draw out. Send us your figures and we will run both sides.",
    ],
  },
  faqs: [
    {
      question: "Can I deduct my mortgage interest from my rental income?",
      answer:
        "Not as a cost, no. You add the full profit to your income first, then take a credit worth 20% of the interest off the tax. On £6,000 of interest that credit is £1,200, and it is £1,200 whether your top rate is 20%, 40% or 45%. A company still takes its interest off in full before tax, which is why the company question comes up so often once a mortgage gets large.",
    },
    {
      question: "How much tax will I pay on my rental income?",
      answer:
        "It turns on four things, and you can move three of them. Your top rate of tax, because the rental profit stacks on your salary rather than starting fresh. The costs you claim, since every pound you claim is a pound nobody taxes. Your mortgage interest, which only ever buys you a credit worth 20%. And who owns the property, because a share in a lower-rate partner's name is taxed at their rate. On £15,000 of profit with £6,000 of interest, a higher-rate landlord pays £4,800.",
    },
    {
      question: "What costs can I claim against my rental income?",
      answer:
        "Anything you spend keeping the let going. Repairs and maintenance, letting agent and management fees, landlord insurance, ground rent and service charges, accountancy fees, and replacing the furniture or white goods you provided. Mileage to and from the property counts as well. What you cannot claim is money spent making the property better than it was. The capital part of a repayment mortgage is out too, because only the interest half of that payment is a cost.",
    },
    {
      question: "Does owning the property with my spouse cut the tax?",
      answer:
        "Often, yes, and it is the easiest saving most couples miss. Rent from a property you own jointly with a husband, wife or civil partner is split 50/50 for tax by default, however the deeds read. If one of you pays 40% and the other 20%, that default is costing you real money every year. Moving the split takes two steps: change the beneficial shares by deed, then formally declare the new split within 60 days of signing. If you own as joint tenants you have to change that to tenants in common first, because a joint tenancy cannot hold unequal shares. It only counts from the date you sign, so it will not rescue a tax year that has already ended.",
    },
    {
      question: "What happens if my rental made a loss?",
      answer:
        "You pay nothing this year, and the loss is not wasted. A property loss is carried forward and set against the profit of the same property business in a later year, so it reduces a future bill instead. You cannot set it against your salary. This calculator floors the tax at zero rather than showing you a refund, because a refund is not what happens.",
    },
  ],
  workedExamples: [
    {
      // Derived by hand from compute() above with band = basic (rate 0.2):
      //   profit = 12000 - 2400 = 9600
      //   taxBeforeCredit = 9600 * 0.2 = 1920
      //   s24Credit = 4200 * 0.2 = 840
      //   tax = 1920 - 840 = 1080
      //   takeHome = 9600 - 4200 - 1080 = 4320
      // Cross-check on the closing step: a full deduction would tax
      //   (9600 - 4200) * 0.2 = 1080, the same figure, so the credit is neutral here.
      heading: "A basic-rate landlord with one let flat",
      inputs:
        "Annual rental income £12,000, running costs £2,400, mortgage interest £4,200, basic rate band",
      steps: [
        "Rental profit = £12,000 of rent less £2,400 of running costs = £9,600",
        "Tax before the credit = £9,600 x 20% = £1,920",
        "Mortgage interest credit = 20% of £4,200 = £840",
        "Tax to pay = £1,920 - £840 = £1,080",
        "Take-home = £9,600 less £4,200 of interest less £1,080 of tax = £4,320",
        "At the basic rate the credit hands back exactly what taking the interest off would have, so the mortgage rule costs you nothing here",
      ],
    },
    {
      // Derived by hand from compute() above with band = higher (rate 0.4):
      //   profit = 24000 - 4000 = 20000
      //   taxBeforeCredit = 20000 * 0.4 = 8000
      //   s24Credit = 14000 * 0.2 = 2800
      //   tax = 8000 - 2800 = 5200
      //   takeHome = 20000 - 14000 - 5200 = 800
      // Cash before tax = 20000 - 14000 = 6000, so tax takes 5200/6000 = 86.7%.
      // A full deduction would tax (20000 - 14000) * 0.4 = 2400, so the credit
      //   rule costs 5200 - 2400 = 2800, which is 20% of the 14000 interest.
      heading: "A higher-rate landlord with a large mortgage",
      inputs:
        "Annual rental income £24,000, running costs £4,000, mortgage interest £14,000, higher rate band",
      steps: [
        "Rental profit = £24,000 less £4,000 = £20,000",
        "Tax before the credit = £20,000 x 40% = £8,000",
        "Mortgage interest credit = 20% of £14,000 = £2,800",
        "Tax to pay = £8,000 - £2,800 = £5,200",
        "Cash left before tax = £20,000 of profit less £14,000 of interest = £6,000",
        "Take-home = £6,000 less £5,200 of tax = £800, so the tax takes roughly 87% of the cash",
        "Had the interest come off before tax, the bill would have been £2,400, so the credit rule costs this landlord £2,800 a year",
      ],
    },
  ],
  related: [
    { label: "Section 24 calculator: what the interest rule costs you", href: "/calculators/section-24-calculator" },
    { label: "Buy-to-let mortgage calculator", href: "/calculators/buy-to-let-mortgage-calculator" },
    { label: "Rental yield calculator, gross and net", href: "/calculators/rental-yield-calculator" },
    { label: "Buy-to-let cashflow calculator", href: "/calculators/buy-to-let-cashflow-calculator" },
    { label: "Property allowance checker: is your £1,000 covered?", href: "/calculators/property-allowance-checker" },
  ],
};
