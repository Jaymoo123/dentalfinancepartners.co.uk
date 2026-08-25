import type { GenericTool } from "../types";
import { gbp, pct } from "../format";

/**
 * Rental yield, gross and net, from the price and the MONTHLY rent.
 *
 * Arithmetic only. There is no tax, no rate table and no market figure in this
 * file, so nothing here needs a ground-truth lock:
 *   gross = (monthly rent x 12) / value x 100
 *   net   = (annual rent - running costs) / value x 100
 *
 * Two deliberate honesty constraints, both from briefs/property/tools:
 *  - No "a good yield is X%" claim anywhere. That figure is data, it belongs on
 *    the benchmarks post (linked in `related`), and it goes stale.
 *  - The warn tone means ONE thing and says so in the note: running costs are
 *    taking more than half the rent. It is not a verdict on the deal.
 *
 * ponytail: void periods are not a field. They are a haircut on the rent, not a
 * cost line, and the note gives the reader the arithmetic (a fortnight empty is
 * about 4% of a year's rent) so they can trim the rent box themselves. Add a
 * voids % input only if the analytics show people asking for one.
 */

/** Costs above this share of the rent trip the warn tone. Stated in the note. */
const COSTS_WARN_SHARE = 0.5;

export const rentalYieldCalculator: GenericTool = {
  kind: "generic",
  slug: "rental-yield-calculator",
  name: "Rental Yield Calculator",
  category: "Portfolio",
  oneLiner:
    "Put in a price and a monthly rent and you get the gross and the net rental yield together, with the arithmetic shown.",
  metaTitle: "Rental Yield Calculator: Gross and Net Yield (UK)",
  metaDescription:
    "Calculate the gross and net rental yield on a UK property from the price, the monthly rent and your running costs. Free, and the arithmetic is shown.",
  intro:
    "A 6% gross yield and a 4.7% net yield can be the same flat. Put in the price, the rent and what the place costs you to run, and this shows you both, plus how long the rent alone would take to pay the price back.",
  ctaLabel: "Reviewing a property deal? Talk to us →",
  embedHeight: 860,
  fields: [
    {
      id: "propertyValue",
      label: "Property value or purchase price",
      type: "currency",
      default: 250_000,
      step: 5_000,
      help: "Use the price you paid if you are judging a purchase, and today's value if you are judging whether to hold.",
    },
    {
      id: "monthlyRent",
      label: "Monthly rent",
      type: "currency",
      default: 1_250,
      step: 25,
      help: "The rent you collect each month. If the property sits empty for part of the year, enter what you expect to average rather than the asking rent.",
    },
    {
      id: "lettingAgentPct",
      label: "Letting agent fee",
      type: "number",
      default: 10,
      step: 0.5,
      suffix: "%",
      advanced: true,
      help: "Management fee as a percentage of the rent. Set it to 0 if you self-manage.",
    },
    {
      id: "maintenancePct",
      label: "Maintenance and repairs",
      type: "number",
      default: 10,
      step: 0.5,
      suffix: "%",
      advanced: true,
      help: "A percentage of the rent set aside for repairs, safety checks and wear. Older stock needs more.",
    },
    {
      id: "insurance",
      label: "Landlord insurance (a year)",
      type: "currency",
      default: 300,
      step: 25,
      advanced: true,
    },
    {
      id: "serviceCharge",
      label: "Service charge and ground rent (a year)",
      type: "currency",
      default: 0,
      step: 100,
      advanced: true,
      help: "Leave at 0 for a house. For a flat this is often the single largest cost, so it is worth looking up before you offer.",
    },
    {
      id: "mortgageInterest",
      label: "Mortgage interest (a year)",
      type: "currency",
      default: 0,
      step: 500,
      advanced: true,
      help: "Optional. Yield is normally quoted before borrowing. Enter the interest to also see what the property returns once the lender is paid.",
    },
  ],
  compute: (v) => {
    const value = Number(v.propertyValue);
    const monthlyRent = Number(v.monthlyRent);
    const agentPct = Number(v.lettingAgentPct);
    const maintenancePct = Number(v.maintenancePct);
    const insurance = Number(v.insurance);
    const serviceCharge = Number(v.serviceCharge);
    const mortgageInterest = Number(v.mortgageInterest);

    const annualRent = monthlyRent * 12;
    const agentFee = annualRent * (agentPct / 100);
    const maintenance = annualRent * (maintenancePct / 100);
    const costs = agentFee + maintenance + insurance + serviceCharge;
    const netIncome = annualRent - costs;
    const netAfterInterest = netIncome - mortgageInterest;

    const yieldOn = (amount: number) => (value > 0 ? (amount / value) * 100 : 0);
    const grossYield = yieldOn(annualRent);
    const netYield = yieldOn(netIncome);

    // Years of net income to earn the price back. Ignores any change in the
    // property's value, which is the whole point of showing it next to a yield.
    const paybackYears = netIncome > 0 ? value / netIncome : 0;

    const costsBiteHard = annualRent > 0 && costs > annualRent * COSTS_WARN_SHARE;

    return {
      headline: {
        label: "Gross rental yield",
        value: pct(grossYield),
        sub: `Net yield ${pct(netYield)}`,
        tone: costsBiteHard ? "warn" : "default",
      },
      rows: [
        { label: "Annual rent", value: gbp(annualRent) },
        { label: `Letting agent at ${pct(agentPct)}`, value: `−${gbp(agentFee)}` },
        { label: `Maintenance at ${pct(maintenancePct)}`, value: `−${gbp(maintenance)}` },
        { label: "Landlord insurance", value: `−${gbp(insurance)}` },
        ...(serviceCharge > 0
          ? [{ label: "Service charge and ground rent", value: `−${gbp(serviceCharge)}` }]
          : []),
        { label: "Total running costs", value: `−${gbp(costs)}` },
        { label: "Net income before tax", value: gbp(netIncome), strong: true },
        { label: "Net income per month", value: gbp(netIncome / 12) },
        ...(mortgageInterest > 0
          ? [
              { label: "Mortgage interest", value: `−${gbp(mortgageInterest)}` },
              {
                label: "Net income after mortgage interest",
                value: gbp(netAfterInterest),
              },
              {
                label: "Net yield after mortgage interest",
                value: pct(yieldOn(netAfterInterest)),
              },
            ]
          : []),
        ...(paybackYears > 0
          ? [
              {
                label: "Years of net income to earn the price back",
                value: `${paybackYears.toFixed(1)} years`,
              },
            ]
          : []),
      ],
      note:
        (costsBiteHard
          ? "The amber flag means one thing only: your running costs are taking more than half the rent. It is not a view on whether the yield is good for the area, and there are properties where that is normal. "
          : "") +
        "Gross yield uses the rent on its own. Net yield takes your running costs off first. Both are worked out before tax, and before any mortgage unless you fill in the interest box, so they measure the property rather than your take-home. Empty weeks are not a field here: a fortnight with no tenant costs you about 4% of a year's rent, so trim the rent figure if you expect gaps.",
    };
  },
  explainer: {
    heading: "How to work out the rental yield on a property",
    paragraphs: [
      "Rental yield turns rent into a percentage of what the property is worth, which is the only fair way to compare a buy-to-let flat in Leeds with a terrace in Cardiff. Start with the gross figure, because it asks you for just two numbers. Take the monthly rent, multiply it by twelve, divide by the price, then multiply by 100. On the figures this page opens with: £1,250 x 12 = £15,000 a year. £15,000 / £250,000 x 100 = 6.0% gross yield.",
      "Gross yield ignores everything it costs you to keep the place let, so the net figure is the one to trust. Strip the running costs out of the rent before you divide. On the same defaults, a letting agent at 10% takes £1,500 and a 10% repairs pot takes another £1,500. Add £300 of landlord insurance and your costs are £3,300. So £15,000 - £3,300 = £11,700 of net income. £11,700 / £250,000 x 100 = 4.7% net yield. The rent never changed. Your return fell by more than a fifth.",
      "Which costs you strip out is your own call, so be consistent when you compare two properties. The usual list is the agent, insurance, repairs, safety checks, and the service charge and ground rent if you are buying a flat. Empty weeks sit outside that list on purpose. They are a haircut on the rent, not a cost line, so lower the rent figure instead of adding a cost. Your borrowing sits outside it too, because yield is normally quoted before any mortgage, which is why the interest box is optional.",
      "The tool also shows how many years of net income it would take to earn the price back. On the defaults that is a little over 21 years, and it counts nothing but the rent. That is the honest limit of any yield figure: some markets pay you monthly and some pay you on the day you sell, and this number only sees the first. If you are buying for a rise in value, the yield tells you whether the property can carry itself while you wait, not whether it was a good buy.",
      "Every figure on this page is worked out before tax, and tax is where two landlords holding the same 4.7% part company, depending on their band and how much they borrowed. Run the same property through the rental income tax calculator below, and if the answer changes your mind about the deal, talk to us before you make an offer.",
    ],
  },
  faqs: [
    {
      question: "How do you calculate rental yield on a property?",
      answer:
        "To calculate the gross yield, take the monthly rent, multiply it by twelve, and you have the annual rent. Divide that by the price you paid or the value today, then multiply by 100. For the net yield, take your running costs off the annual rent first, then divide what is left by the same value. Use the price you paid if you are judging a purchase, and today's value if you are judging whether to keep holding it.",
    },
    {
      question: "What is the difference between gross and net rental yield?",
      answer:
        "Gross yield uses the rent and nothing else, so it is quick and it flatters every property equally. Net yield takes the letting agent, insurance, repairs, safety checks and any service charge off the rent first. The gap between the two is usually wide. On a £250,000 flat at £1,250 a month, gross is 6.0% and net is 4.7%, and nothing about the property changed between those two numbers. Compare on net where you can, and make sure you used the same cost list for both properties.",
    },
    {
      question: "What costs come off the rent before you get to net yield?",
      answer:
        "The costs of keeping the property let: the agent's management fee, landlord insurance, repairs and maintenance, gas and electrical safety checks, and the service charge and ground rent if it is a flat. Set something aside for empty weeks too, because rent you never collect lowers the yield just as surely as a bill does. What does not belong in net yield is the capital part of a mortgage payment or the tax you pay later, because neither is a cost of running the property.",
    },
    {
      question: "Is rental yield the same as return on investment?",
      answer:
        "They answer different questions. Yield measures the rent against the whole value of the property, whether you paid cash for it or borrowed most of it. Return on investment measures what you earn against the money you put in, so your deposit and your buying costs. Buy a £250,000 flat with £250,000 of your own money, and buy one with a £62,500 deposit, and the yield is identical while the return on your cash is not.",
    },
    {
      question: "What counts as a good rental yield?",
      answer:
        "There is no single number, and anyone who hands you one has skipped the question of what you are buying. Location sets the floor: a cheaper entry price lifts the percentage on its own. Property type moves it next, because a room-by-room let earns more and costs more to run. Then how much of the price you borrowed, then how many weeks a year the place stands empty, then whether you want the income now or a bigger figure on the day you sell. Set your bar against those first, then check it against regional benchmarks.",
    },
    {
      question: "Is a high rental yield better than capital growth?",
      answer:
        "It depends on what you need the property to do. Yield pays you every month and keeps the mortgage covered, so it matters most if you lean on the income or you borrowed heavily. Growth pays you once, on the day you sell, and it is worth more to you if you can wait and do not need the cash meanwhile. Few markets hand you both in the same measure. Decide which one your plan needs, then use yield to judge properties inside that plan rather than across both.",
    },
  ],
  workedExamples: [
    {
      // £850 x 12 = £10,200. 10,200 / 180,000 = 0.056666... x 100 = 5.6667%,
      // which pct() renders to 1dp as 5.7%.
      heading: "A £180,000 terrace at £850 a month, gross yield only",
      inputs: "Purchase price £180,000, rent £850 a month, no costs entered yet",
      steps: [
        "Annualise the rent: £850 x 12 = £10,200",
        "Divide by the price: £10,200 / £180,000 = 0.0567",
        "Multiply by 100: 5.7% gross yield",
        "That is the number an agent's listing quotes. It has had nothing taken off it",
      ],
    },
    {
      // £1,600 x 12 = £19,200. Agent 10% = 1,920. Maintenance 10% = 1,920.
      // Insurance 350. Service charge 1,400. Costs = 5,590.
      // Net = 19,200 - 5,590 = 13,610.
      // Gross = 19,200 / 320,000 x 100 = 6.0% exactly.
      // Net   = 13,610 / 320,000 x 100 = 4.2531% -> 4.3% at 1dp.
      // Costs share = 5,590 / 19,200 = 29.1%, so no warn flag.
      // Payback = 320,000 / 13,610 = 23.512... -> 23.5 years.
      heading: "A £320,000 flat at £1,600 a month, with the costs taken off",
      inputs:
        "Purchase price £320,000, rent £1,600 a month, letting agent 10%, maintenance 10%, insurance £350, service charge and ground rent £1,400",
      steps: [
        "Annualise the rent: £1,600 x 12 = £19,200",
        "Gross yield: £19,200 / £320,000 x 100 = 6.0%, the same headline as the terrace above",
        "Letting agent at 10% of £19,200 = £1,920",
        "Maintenance at 10% of £19,200 = £1,920",
        "Add insurance £350 and the service charge and ground rent £1,400: total costs £5,590",
        "Net income: £19,200 - £5,590 = £13,610",
        "Net yield: £13,610 / £320,000 x 100 = 4.3%",
        "Years to earn the price back: £320,000 / £13,610 = 23.5",
        "Two properties on 6.0% gross, and the service charge is most of the difference between them",
      ],
    },
  ],
  related: [
    { label: "Buy-to-let mortgage calculator", href: "/calculators/buy-to-let-mortgage-calculator" },
    { label: "Buy-to-let cashflow calculator", href: "/calculators/buy-to-let-cashflow-calculator" },
    { label: "Rental income tax calculator", href: "/calculators/rental-income-tax-calculator" },
    {
      label: "Buy-to-let rental stress test calculator",
      href: "/calculators/buy-to-let-rental-stress-test-calculator",
    },
    { label: "Section 24 calculator", href: "/calculators/section-24-calculator" },
    {
      label: "What counts as a good rental yield in the UK, by region",
      href: "/blog/portfolio-management/property-investment-benchmarks-uk-2026-good-yield",
    },
  ],
};
