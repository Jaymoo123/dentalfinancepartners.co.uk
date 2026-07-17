import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import { calcP11D } from "@/lib/tools/compute/p11d-bik";

export const p11dBikTool: GenericTool = {
  kind: "generic",
  slug: "p11d-bik-calculator",
  name: "P11D & Benefit in Kind Calculator",
  category: "Employment Taxes",
  oneLiner:
    "Work out the taxable value of company cars, fuel, vans, beneficial loans and private medical cover for 2026/27, plus the employee tax and employer Class 1A NIC due.",
  embedHeight: 760,
  metaTitle: "P11D & BIK Calculator 2026/27 | Company Car Benefit in Kind Tax",
  metaDescription:
    "Free P11D benefit in kind calculator for 2026/27. Company car BIK from CO2 and list price, car fuel, van benefit, beneficial loans and private medical. Employee tax plus employer Class 1A NIC at 15%.",
  intro:
    "A P11D reports the cash value of benefits in kind (BIKs) an employee or director receives on top of salary: a company car, employer-paid fuel, a van with private use, a cheap loan, private medical insurance. The employee pays income tax on that value at their marginal rate, and the employer pays Class 1A National Insurance at 15%. Enter your benefits below to see the 2026/27 taxable value and both tax bills.",
  ctaLabel: "Talk to us about payrolling benefits",
  fields: [
    {
      id: "carListPrice",
      label: "Company car list price (P11D value)",
      type: "currency",
      default: 32000,
      min: 0,
      max: 250000,
      step: 500,
      help: "The manufacturer's list price when new, including VAT, delivery and factory options, not what was actually paid. Enter 0 if there is no company car.",
    },
    {
      id: "carCo2",
      label: "Car CO2 emissions",
      type: "number",
      default: 0,
      min: 0,
      max: 300,
      step: 1,
      suffix: "g/km",
      help: "0 for a pure electric car. Shown on the V5C or the manufacturer's spec sheet.",
    },
    {
      id: "carElectricRange",
      label: "Electric-only range (hybrids)",
      type: "number",
      default: 0,
      min: 0,
      max: 200,
      step: 1,
      suffix: "miles",
      advanced: true,
      help: "Only matters for plug-in hybrids emitting 1 to 50 g/km. Longer electric range means a lower BIK percentage.",
    },
    {
      id: "carDieselNonRde2",
      label: "Diesel not meeting RDE2 standard (+4% supplement)",
      type: "toggle",
      default: false,
      advanced: true,
    },
    {
      id: "capitalContribution",
      label: "Capital contribution towards the car",
      type: "currency",
      default: 0,
      min: 0,
      max: 5000,
      step: 250,
      advanced: true,
      help: "Money you personally put towards the cost of the car reduces the list price for the benefit calculation, capped at £5,000.",
    },
    {
      id: "employerPaysCarFuel",
      label: "Employer pays for private fuel (car fuel benefit)",
      type: "toggle",
      default: false,
    },
    {
      id: "van",
      label: "Company van with private use",
      type: "select",
      default: "none",
      options: [
        { value: "none", label: "No van" },
        { value: "van", label: "Petrol / diesel van (flat-rate benefit)" },
        { value: "electricVan", label: "Electric van (nil benefit)" },
      ],
    },
    {
      id: "vanFuel",
      label: "Employer pays for private van fuel",
      type: "toggle",
      default: false,
      advanced: true,
    },
    {
      id: "loanBalance",
      label: "Employer loan outstanding (average balance)",
      type: "currency",
      default: 0,
      min: 0,
      max: 200000,
      step: 1000,
      help: "Interest-free or cheap loans, including an overdrawn director's loan account. No benefit arises if the balance stays at £10,000 or below all year.",
    },
    {
      id: "medicalCost",
      label: "Private medical insurance (cost to employer)",
      type: "currency",
      default: 0,
      min: 0,
      max: 20000,
      step: 50,
      help: "The premium your employer pays for your cover. The taxable value is simply the cost to the employer.",
    },
    {
      id: "marginalRate",
      label: "Your marginal income tax rate",
      type: "select",
      default: "0.4",
      options: [
        { value: "0.2", label: "Basic rate (20%)" },
        { value: "0.4", label: "Higher rate (40%)" },
        { value: "0.45", label: "Additional rate (45%)" },
      ],
    },
  ],
  compute(values) {
    const r = calcP11D({
      carListPrice: Number(values.carListPrice),
      carCo2: Number(values.carCo2),
      carElectricRange: Number(values.carElectricRange),
      carDieselNonRde2: Boolean(values.carDieselNonRde2),
      capitalContribution: Number(values.capitalContribution),
      employerPaysCarFuel: Boolean(values.employerPaysCarFuel),
      van: String(values.van) as "none" | "van" | "electricVan",
      vanFuel: Boolean(values.vanFuel),
      loanBalance: Number(values.loanBalance),
      medicalCost: Number(values.medicalCost),
      marginalRate: Number(values.marginalRate),
    });
    const rows = [
      ...(r.carBenefit > 0
        ? [{ label: `Company car benefit (${pct(r.carPct * 100)} of list price)`, value: gbp(r.carBenefit) }]
        : []),
      ...(r.carFuelBenefit > 0 ? [{ label: "Car fuel benefit", value: gbp(r.carFuelBenefit) }] : []),
      ...(r.vanBenefit > 0 ? [{ label: "Van benefit (flat rate)", value: gbp(r.vanBenefit) }] : []),
      ...(r.vanFuelBenefit > 0 ? [{ label: "Van fuel benefit (flat rate)", value: gbp(r.vanFuelBenefit) }] : []),
      ...(r.loanBenefit > 0 ? [{ label: "Beneficial loan (official rate)", value: gbp(r.loanBenefit) }] : []),
      ...(r.medicalBenefit > 0 ? [{ label: "Private medical insurance", value: gbp(r.medicalBenefit) }] : []),
      { label: "Total taxable benefits (P11D value)", value: gbp(r.totalTaxable), strong: true as const },
      { label: "Employee income tax on benefits", value: gbp(r.employeeTax) },
      { label: "Employer Class 1A NIC (15%)", value: gbp(r.employerClass1A) },
    ];
    return {
      headline: {
        label: "Your annual tax on benefits",
        value: gbp(r.employeeTax),
        sub: `${gbp(r.totalTaxable)} total taxable value · employer pays ${gbp(r.employerClass1A)} Class 1A`,
        tone: r.totalTaxable === 0 ? "good" : "default",
      },
      rows,
      note: "Benefits are reported on a P11D by 6 July after the tax year, or taxed in real time through payroll if the employer has registered to payroll benefits. Payrolling most benefits becomes mandatory from April 2027, so employers still on P11Ds should plan the switch now.",
    };
  },
  explainer: {
    heading: "How benefit in kind tax is calculated in 2026/27",
    paragraphs: [
      "Each benefit has its own valuation rule. A company car is the list price multiplied by an appropriate percentage set by its CO2 emissions (and electric range for plug-in hybrids), from 4% for a pure electric car up to a 37% cap. Car fuel uses the same percentage applied to a fixed multiplier (£29,200). Vans use flat rates: £4,170 for the van and £798 for private fuel, with electric vans at nil. A loan over £10,000 is taxed on the interest saved against HMRC's official rate (3.75%), and private medical insurance is taxed on what it costs the employer. The employee pays income tax on the total at their marginal rate; the employer pays Class 1A NIC at 15% on the same total.",
      "Worked example 1: an employee has a £48,000 electric company car (0 g/km). The appropriate percentage is 4%, so the taxable benefit is £1,920. A higher-rate taxpayer pays 40% of that, £768 a year (£64 a month), and the employer pays Class 1A of £288. This is why salary-sacrifice electric cars remain one of the most tax-efficient benefits available.",
      "Worked example 2: a £32,000 petrol car emitting 128 g/km sits in the 32% band, a taxable benefit of £10,240. If the employer also pays for private fuel, the fuel benefit is 32% of £29,200, another £9,344, taking total taxable benefits to £19,584. A higher-rate taxpayer pays £7,834 a year in tax and the employer pays £2,938 in Class 1A. Unless private mileage is very high, paying for your own fuel and claiming business mileage back is usually cheaper than the fuel benefit.",
    ],
  },
  faqs: [
    {
      question: "What is a P11D?",
      answer:
        "A P11D is the form employers use to report taxable benefits in kind, such as company cars, private medical insurance and cheap loans, to HMRC for each employee or director who received them. It must be filed by 6 July following the end of the tax year, and the employee's tax code is then adjusted to collect the tax due. If the employer payrolls benefits instead, no P11D is needed for those benefits.",
    },
    {
      question: "What is a P11D(b)?",
      answer:
        "The P11D(b) is the employer's summary return. It declares the total value of benefits provided across all employees and calculates the employer's Class 1A National Insurance, charged at 15% for 2026/27. It is due by 6 July, with the Class 1A payment due by 22 July (19 July if paying by post). A P11D(b) is still required even when benefits are payrolled.",
    },
    {
      question: "What does benefit in kind (BIK) mean?",
      answer:
        "A benefit in kind is anything of value an employee receives from their job other than cash pay: a company car, employer-paid fuel, private medical cover, an interest-free loan, gym membership. Because it is a reward for work, it is taxed like income. Each benefit has a valuation rule that converts it into a cash-equivalent figure, which is then taxed at the employee's marginal rate.",
    },
    {
      question: "How is company car tax calculated?",
      answer:
        "Multiply the car's list price when new (including VAT and options) by an appropriate percentage based on its CO2 emissions. For 2026/27 a pure electric car is 4%, plug-in hybrids emitting 1 to 50 g/km range from 4% to 16% depending on electric-only range, and petrol cars run from 17% up to a cap of 37%. Non-RDE2 diesels add a 4% supplement. You then pay income tax on that figure at your marginal rate.",
    },
    {
      question: "Do I pay tax on a company van?",
      answer:
        "Only if you use it privately beyond ordinary commuting and insignificant private use. If you do, a flat-rate benefit of £4,170 applies regardless of the van's value, plus £798 if the employer also pays for private fuel. Fully electric vans have a nil benefit, so an electric company van with unrestricted private use currently costs the employee nothing in tax.",
    },
    {
      question: "When does a director's loan become a taxable benefit?",
      answer:
        "When the total loans outstanding exceed £10,000 at any point in the tax year. Once over that threshold, the whole balance (not just the excess) is treated as a beneficial loan, and the taxable benefit is the interest you saved compared with HMRC's official rate, less any interest you actually paid. Overdrawn director's loan accounts are the most common way this catches owner-managers out.",
    },
    {
      question: "What is payrolling benefits, and when does it become mandatory?",
      answer:
        "Payrolling means taxing benefits in real time through the payroll each month instead of reporting them on a P11D after year end, so employees pay the right tax as they go rather than through tax-code adjustments. HMRC has confirmed that payrolling most benefits in kind becomes mandatory from April 2027, so 2026/27 is the last full year employers can rely on the P11D route by default.",
    },
  ],
  related: [
    { label: "Employer NI calculator", href: "/calculators/employer-ni-calculator" },
    { label: "Take-home pay calculator", href: "/calculators/take-home-pay-calculator" },
  ],
};
