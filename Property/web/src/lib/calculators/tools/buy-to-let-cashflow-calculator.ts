import type { GenericTool } from "../types";
import { gbp } from "../format";

export const buyToLetCashflowCalculator: GenericTool = {
  kind: "generic",
  slug: "buy-to-let-cashflow-calculator",
  name: "Buy-to-Let Cashflow Calculator",
  category: "Portfolio",
  oneLiner: "Monthly and annual cashflow on a rental, from rent less mortgage and running costs.",
  metaTitle: "Buy-to-Let Cashflow Calculator | Monthly Rental Profit (UK)",
  metaDescription:
    "Free buy-to-let cashflow calculator. Work out the monthly and annual cashflow on a rental property from rent, mortgage payment and running costs. Instant result.",
  intro: "See the monthly and annual cashflow on a rental, from rent less the mortgage and running costs.",
  ctaLabel: "Make your portfolio more profitable →",
  embedHeight: 560,
  fields: [
    { id: "monthlyRent", label: "Monthly rent", type: "currency", default: 1_200, step: 50 },
    {
      id: "monthlyMortgage",
      label: "Monthly mortgage payment",
      type: "currency",
      default: 600,
      step: 50,
      help: "For an interest-only mortgage, the full payment; for repayment, the interest portion is what affects tax.",
    },
    {
      id: "monthlyCosts",
      label: "Other monthly costs",
      type: "currency",
      default: 250,
      step: 25,
      help: "Management, insurance, maintenance, service charge, and an allowance for void periods.",
    },
  ],
  compute: (v) => {
    const rent = Number(v.monthlyRent);
    const mortgage = Number(v.monthlyMortgage);
    const costs = Number(v.monthlyCosts);
    const monthly = rent - mortgage - costs;
    const annual = monthly * 12;
    return {
      headline: {
        label: "Monthly cashflow",
        value: gbp(monthly),
        tone: monthly >= 0 ? "good" : "warn",
        sub: monthly >= 0 ? "Positive cashflow" : "Negative cashflow",
      },
      rows: [
        { label: "Annual cashflow", value: gbp(annual), strong: true },
        { label: "Monthly rent", value: gbp(rent) },
        { label: "Mortgage", value: `−${gbp(mortgage)}` },
        { label: "Other costs", value: `−${gbp(costs)}` },
      ],
      note: "This is cashflow before tax. Because of Section 24, the income tax due can be higher than the cashflow suggests, especially for higher-rate taxpayers with large mortgages. Use the rental income tax calculator to see the tax.",
    };
  },
  explainer: {
    heading: "Reading buy-to-let cashflow",
    paragraphs: [
      "Cashflow is the money a rental actually puts in your pocket each month: the rent, less the mortgage payment and the running costs of management, insurance, maintenance and the inevitable void periods. Positive cashflow means the property pays for itself; negative cashflow means you are topping it up.",
      "Cashflow and profit are not the same thing. On an interest-only mortgage the whole payment is a cost; on a repayment mortgage part of each payment reduces the loan, which helps your wealth but not your monthly cashflow. And the tax position differs again, because Section 24 means the interest is not simply deducted before tax.",
      "That is why a property can be cashflow-positive but, after a higher-rate landlord's tax bill, leave very little, or even cost money once tax is paid. Always look at cashflow, tax and capital growth together rather than any one in isolation.",
    ],
  },
  faqs: [
    {
      question: "Is my buy-to-let profitable if it is cashflow-positive?",
      answer:
        "Not necessarily. Cashflow is before tax. Because Section 24 restricts mortgage interest relief, a higher-rate landlord can have positive monthly cashflow but little left after the income tax bill. Check the after-tax position, not just cashflow.",
    },
    {
      question: "Should I use the interest-only or repayment figure?",
      answer:
        "For cashflow, use your actual monthly payment. For tax, only the interest element matters, since the capital repayment part of a repayment mortgage is not an allowable cost. The rental income tax calculator works on the interest.",
    },
  ],
};
