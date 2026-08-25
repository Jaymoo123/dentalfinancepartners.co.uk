import type { GenericTool } from "../types";
import { gbp } from "../format";

export const buyToLetCashflowCalculator: GenericTool = {
  kind: "generic",
  slug: "buy-to-let-cashflow-calculator",
  name: "Buy-to-Let ROI and Cashflow Calculator",
  category: "Portfolio",
  oneLiner:
    "See the cash a rental leaves you each month and each year, and what that cash returns on the money you put in.",
  metaTitle: "Rental Property ROI Calculator | Buy-to-Let Cashflow",
  metaDescription:
    "Work out the monthly and annual cashflow on a rental from the rent, mortgage and running costs, then turn it into a cash-on-cash ROI on your money in.",
  intro:
    "Most landlords know the rent and know the mortgage payment, and have never put the two next to the running costs. Do that here and you get the cash the property leaves you each month and each year, before tax. Fill in the cash you put in as well, deposit plus buying costs, and you get that as a percentage return.",
  ctaLabel: "Not sure the deal works after tax? →",
  embedHeight: 660,
  fields: [
    { id: "monthlyRent", label: "Monthly rent", type: "currency", default: 1_200, step: 50 },
    {
      id: "monthlyMortgage",
      label: "Monthly mortgage payment",
      type: "currency",
      default: 600,
      step: 50,
      help: "Whatever actually leaves your account. On a repayment mortgage only the interest half matters for tax, and the tax calculator handles that.",
    },
    {
      id: "monthlyCosts",
      label: "Other monthly costs",
      type: "currency",
      default: 250,
      step: 25,
      help: "Management, insurance, maintenance, service charge, and an allowance for void periods.",
    },
    {
      id: "cashInvested",
      label: "Cash you put in (optional)",
      type: "currency",
      default: 0,
      step: 1_000,
      help: "Deposit plus stamp duty, legal fees and survey. Leave at 0 to skip the return-on-investment row.",
    },
  ],
  compute: (v) => {
    const rent = Number(v.monthlyRent);
    const mortgage = Number(v.monthlyMortgage);
    const costs = Number(v.monthlyCosts);
    const invested = Number(v.cashInvested);
    const monthly = rent - mortgage - costs;
    const annual = monthly * 12;
    const rows = [
      { label: "Annual cashflow", value: gbp(annual), strong: true },
      { label: "Monthly rent", value: gbp(rent) },
      { label: "Mortgage", value: `−${gbp(mortgage)}` },
      { label: "Other costs", value: `−${gbp(costs)}` },
    ];
    if (invested > 0) {
      rows.push({
        label: "Cash-on-cash return, before tax",
        value: `${((annual / invested) * 100).toFixed(1)}%`,
        strong: true,
      });
    }
    return {
      headline: {
        label: "Monthly cashflow",
        value: gbp(monthly),
        tone: monthly >= 0 ? "good" : "warn",
        sub: monthly >= 0 ? "Positive cashflow" : "Negative cashflow",
      },
      rows,
      note: "This is the cash figure, before tax. Fill in the cash you put in and the calculator turns the annual number into your cash-on-cash return. The tax is heavier than the cashflow suggests, because your mortgage interest is not taken off before the tax is worked out.",
    };
  },
  explainer: {
    heading: "How do you work out cashflow and ROI on a rental property?",
    paragraphs: [
      "Cashflow is the simplest number in property and the one that decides whether you sleep. Take the rent, take off the mortgage payment, then take off everything else the property costs you to run. £1,200 of rent, less a £600 mortgage payment, less £250 of other costs, leaves £350 a month. Twelve months of that is £4,200 a year. A £130,000 interest-only loan at 5.5% costs about £600 a month, which is where that middle figure comes from.",
      "Return on investment turns the £4,200 into a percentage, and the figure you divide by is the cash you actually put in, not the price of the property. Say you bought at £200,000 with a £70,000 deposit, and stamp duty, legal fees and the survey came to £10,000. Put £80,000 in the cash box and the calculator does the rest: £4,200 divided by £80,000 is 5.25%, which the row prints as 5.3%. That is your cash-on-cash return, and it is the number to hold against whatever else that £80,000 could have been doing.",
      "Cashflow, yield and profit are three different things and they get mixed up constantly. Yield measures the rent against the value of the property and ignores your mortgage completely. It tells you how good the asset is rather than how good your deal is. Cashflow measures what survives the mortgage, so it is the one that pays your bills. Profit is what your tax is worked out on, and it matches neither, because the interest you pay is not taken off before the tax is calculated.",
      "Voids do more damage than anything else you can control. One empty month costs you a twelfth of the year's rent, and the mortgage carries on regardless. The interest rate comes next: one percentage point on a £130,000 loan is £1,300 a year, which is a third of the £4,200 above. Then the repairs, which arrive in lumps and not in monthly instalments. Then tax, which is not in the figure at all. The tax on rental income calculator picks up where this one stops. Send us both sets of figures and we will tell you what the deal returns.",
    ],
  },
  faqs: [
    {
      question: "How do you work out ROI on a rental property?",
      answer:
        "Divide the annual cashflow by the cash you put in, then multiply by 100. If a property clears £4,200 a year and you funded it with a £70,000 deposit plus £10,000 of buying costs, that is £4,200 divided by £80,000, which the calculator shows as 5.3%. Investors call this the cash-on-cash return. It leaves out capital growth and it leaves out tax, so it is one of three numbers, and on its own it will mislead you.",
    },
    {
      question: "Is a cashflow-positive rental making money after tax?",
      answer:
        "Not always, because cashflow is worked out before tax and the tax on a mortgaged rental is heavier than most landlords expect. Your mortgage interest is not taken off the rent before the tax is calculated; you get a credit worth 20% of it instead. On the second worked example below, £17,400 of rent, £3,960 of costs and £8,640 of interest, a higher-rate landlord clears £4,800 in cash and hands £3,648 of it back in tax. Check the after-tax number before you decide the property works.",
    },
    {
      question: "Should I use my interest-only payment or my repayment figure?",
      answer:
        "Use whatever actually leaves your account, because that is what cashflow means. The two behave differently after that. On a repayment mortgage part of every payment is buying you equity rather than disappearing, so your wealth grows faster than the cashflow suggests. For tax, only the interest half counts, so a repayment landlord has to split the payment before working out what is owed.",
    },
    {
      question: "What is a good ROI on a buy-to-let?",
      answer:
        "Your own borrowing rate is the floor. A cash-on-cash return below what your mortgage costs you is not a return, it is a subsidy. Above that, the bar is yours to set: what the same cash would earn somewhere safer and quieter, whether you are buying for income or for growth, and how much work the property is, because a six-bed HMO returning 9% is a job and not an investment.",
    },
  ],
  workedExamples: [
    {
      // Derived by hand from compute() above:
      //   monthly = 950 - 700 - 300 = -50  (tone = "warn", sub = "Negative cashflow")
      //   annual  = -50 * 12 = -600
      // Rate step: 1% of a 150,000 loan = 1,500, so the annual cost moves
      //   600 + 1,500 = 2,100. The 700 payment is 150,000 at about 5.6%.
      heading: "A flat that costs you money every month",
      inputs: "Monthly rent £950, monthly mortgage payment £700, other monthly costs £300",
      steps: [
        "Monthly cashflow = £950 - £700 - £300 = minus £50",
        "Annual cashflow = minus £50 x 12 = minus £600, and the calculator flags it as negative",
        "You are topping this property up by £600 a year, so there is no positive return to work out",
        "The £700 payment is a £150,000 interest-only loan at roughly 5.6%",
        "One percentage point on that loan is £1,500 a year, which would take your annual cost from £600 to £2,100",
        "The case for holding rests entirely on capital growth, and growth is the one number nobody can calculate for you",
      ],
    },
    {
      // Cashflow derived by hand from compute() above:
      //   monthly = 1450 - 720 - 330 = 400  (tone = "good")
      //   annual  = 400 * 12 = 4,800
      // Tax step derived from rental-income-tax-calculator.ts compute() at higher rate:
      //   rent 1450*12 = 17,400; costs 330*12 = 3,960; interest 720*12 = 8,640
      //   profit = 17,400 - 3,960 = 13,440
      //   taxBeforeCredit = 13,440 * 0.4 = 5,376
      //   credit = 8,640 * 0.2 = 1,728;  tax = 5,376 - 1,728 = 3,648
      //   takeHome = 13,440 - 8,640 - 3,648 = 1,152, which ties to 4,800 - 3,648
      // ROI: 4,800 / 75,000 = 6.4%;  1,152 / 75,000 = 1.5%
      heading: "A stronger flat, and what the tax does to the return",
      inputs:
        "Monthly rent £1,450, monthly mortgage payment £720 on interest only, other monthly costs £330",
      steps: [
        "Monthly cashflow = £1,450 - £720 - £330 = £400",
        "Annual cashflow = £400 x 12 = £4,800",
        "Cash in was a £65,000 deposit plus £10,000 of buying costs, so £75,000",
        "Cash-on-cash return before tax = £4,800 / £75,000 = 6.4%",
        "Now the tax. Annual rent £17,400 less £3,960 of running costs is £13,440 of profit",
        "A higher-rate landlord pays 40% of that, £5,376, less a credit worth 20% of the £8,640 of interest, £1,728, so £3,648 of tax",
        "You keep £4,800 - £3,648 = £1,152, and the return on your £75,000 drops from 6.4% to 1.5%",
      ],
    },
  ],
  related: [
    { label: "Tax on rental income calculator", href: "/calculators/rental-income-tax-calculator" },
    { label: "Rental yield calculator, gross and net", href: "/calculators/rental-yield-calculator" },
    { label: "Buy-to-let mortgage calculator", href: "/calculators/buy-to-let-mortgage-calculator" },
    {
      label: "Buy-to-let rental stress test calculator",
      href: "/calculators/buy-to-let-rental-stress-test-calculator",
    },
    { label: "Section 24 calculator: what the interest rule costs you", href: "/calculators/section-24-calculator" },
  ],
};
