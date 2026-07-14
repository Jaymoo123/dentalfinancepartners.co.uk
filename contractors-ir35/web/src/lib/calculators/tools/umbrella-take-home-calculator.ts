import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { NI, APPRENTICESHIP_LEVY, personalTax } from "../tax2026";
import { gbp, pct } from "../format";

/**
 * Umbrella company take-home pay calculator 2026/27.
 *
 * Inputs: day rate (or weekly/monthly equivalent) + working weeks + umbrella
 * margin (weekly) + employee pension %. Logic mirrors umbrellaTakeHome() from
 * tax2026 but adds pension: pension is deducted from gross salary before PAYE
 * and employee NIC, as an employer/employee contribution paid into the scheme
 * before tax (salary sacrifice model, which is what most umbrella pensions use).
 *
 * The employer-cost circularity solver (pot / (1 + employerRate + levy) trick)
 * is replicated from tax2026.umbrellaTakeHome so we can inject pension without
 * mutating the shared primitive.
 */
export const umbrellaTakeHomeCalculator: GenericTool = {
  kind: "generic",
  slug: "umbrella-take-home-calculator",
  name: "Umbrella Company Take-Home Pay Calculator",
  category: "IR35 and take-home",
  oneLiner:
    "Calculate your real net pay through an umbrella company for 2026/27 from a day rate, including employer NIC, Apprenticeship Levy, umbrella margin and pension.",
  metaTitle: "Umbrella Company Take-Home Pay Calculator 2026/27",
  metaDescription:
    "Free umbrella take-home pay calculator for 2026/27. Enter your day rate, umbrella margin and pension to see net pay after all deductions. Updated for 2026/27 rates.",
  intro:
    "Enter your umbrella day rate, the number of weeks you work and your umbrella's weekly margin to see exactly what lands in your bank account for 2026/27, after employer NIC, the Apprenticeship Levy, income tax and employee NIC.",
  ctaLabel: "Want this checked by a specialist contractor accountant? Talk to us →",
  embedHeight: 720,
  fields: [
    {
      id: "rateType",
      label: "Rate type",
      type: "select",
      default: "day",
      options: [
        { value: "day", label: "Day rate" },
        { value: "week", label: "Weekly rate" },
        { value: "month", label: "Monthly rate" },
      ],
      help: "Choose how your umbrella rate is quoted. The calculator converts to an annual assignment income.",
    },
    {
      id: "rate",
      label: "Rate",
      type: "currency",
      default: 450,
      step: 25,
      help: "The headline rate quoted by the umbrella or agency. Employer NIC, the Apprenticeship Levy and the margin are funded from this rate.",
    },
    {
      id: "workingWeeks",
      label: "Working weeks per year",
      type: "number",
      default: 46,
      step: 1,
      min: 1,
      max: 52,
      help: "Paid weeks per year. Typically 46-48 once you account for holidays and gaps between contracts.",
    },
    {
      id: "umbrellaMarginWeekly",
      label: "Umbrella margin (per week)",
      type: "currency",
      default: 25,
      step: 5,
      help: "The umbrella's weekly fee shown in your Key Information Document. Usually £20 to £30 per week for a compliant umbrella.",
    },
    {
      id: "pensionPct",
      label: "Pension contribution (%)",
      type: "number",
      default: 5,
      step: 0.5,
      min: 0,
      max: 50,
      advanced: true,
      help: "Employee pension contribution as a percentage of gross salary (salary sacrifice). Reduces your taxable pay and income tax, but also reduces take-home cash.",
    },
    {
      id: "daysPerWeek",
      label: "Days worked per week",
      type: "number",
      default: 5,
      step: 1,
      min: 1,
      max: 7,
      advanced: true,
      help: "Used to convert a day rate to annual income. For week or month rates this field is ignored.",
    },
  ],
  compute: (v) => {
    const rateType = String(v.rateType);
    const rate = Number(v.rate);
    const workingWeeks = Number(v.workingWeeks);
    const marginWeekly = Number(v.umbrellaMarginWeekly);
    const pensionPct = Math.min(Math.max(Number(v.pensionPct), 0), 100) / 100;
    const daysPerWeek = Number(v.daysPerWeek) || 5;

    // Annual assignment income from rate type
    let annualIncome: number;
    if (rateType === "week") {
      annualIncome = rate * workingWeeks;
    } else if (rateType === "month") {
      annualIncome = rate * (workingWeeks / (52 / 12));
    } else {
      annualIncome = rate * daysPerWeek * workingWeeks;
    }

    const annualMargin = marginWeekly * workingWeeks;

    // Employer-cost circularity solver (same as tax2026.umbrellaTakeHome)
    const pot = Math.max(0, annualIncome - annualMargin);
    const grossSalary =
      (pot + NI.employerRate * NI.secondaryThreshold) /
      (1 + NI.employerRate + APPRENTICESHIP_LEVY);

    const employerNIAmt = Math.max(grossSalary - NI.secondaryThreshold, 0) * NI.employerRate;
    const levyAmt = grossSalary * APPRENTICESHIP_LEVY;

    // Pension via salary sacrifice: reduces taxable income
    const pensionContrib = grossSalary * pensionPct;
    const taxableSalary = Math.max(0, grossSalary - pensionContrib);

    const pt = personalTax(taxableSalary, 0);
    const netTakeHome = taxableSalary - pt.incomeTaxOnSalary - pt.employeeNI + pensionContrib;
    // ponytail: netTakeHome includes pension pot (user controls it, still their money)
    const cashInHand = taxableSalary - pt.incomeTaxOnSalary - pt.employeeNI;
    const retentionPct = annualIncome > 0 ? (cashInHand / annualIncome) * 100 : 0;
    const retentionWithPension = annualIncome > 0 ? (netTakeHome / annualIncome) * 100 : 0;

    const weekly = (x: number) => x / workingWeeks;
    const mon = (x: number) => x / 12;

    // Rolled-up holiday pay (12.07%) is a component of gross salary, not an
    // extra deduction from the pot: shown for transparency, per the KID format.
    const holidayPay = grossSalary * (0.1207 / 1.1207);

    return {
      headline: {
        label: "Net annual take-home (cash in hand)",
        value: gbp(cashInHand),
        sub: `${gbp(weekly(cashInHand))} per week · ${gbp(mon(cashInHand))} per month · ${pct(retentionPct)} of assignment income`,
        tone: "default",
      },
      rows: [
        { label: "Annual assignment income", value: gbp(annualIncome) },
        { label: "Umbrella margin", value: `−${gbp(annualMargin)}` },
        { label: "Employer NIC (15% above £5,000)", value: `−${gbp(employerNIAmt)}` },
        { label: "Apprenticeship Levy (0.5%)", value: `−${gbp(levyAmt)}` },
        { label: "Gross salary (includes rolled-up holiday pay)", value: gbp(grossSalary) },
        { label: "of which rolled-up holiday pay (12.07%)", value: gbp(holidayPay) },
        ...(pensionPct > 0
          ? [{ label: `Pension contribution (${pct(pensionPct * 100, 1)})`, value: `−${gbp(pensionContrib)}` }]
          : []),
        { label: "Taxable salary", value: gbp(taxableSalary) },
        { label: "Income tax (PAYE)", value: `−${gbp(pt.incomeTaxOnSalary)}` },
        { label: "Employee NIC", value: `−${gbp(pt.employeeNI)}` },
        { label: "Net cash in hand", value: gbp(cashInHand), strong: true },
        ...(pensionPct > 0
          ? [{ label: "Pension pot added", value: gbp(pensionContrib) }]
          : []),
        { label: "Effective retention (cash)", value: pct(retentionPct) },
        ...(pensionPct > 0
          ? [{ label: "Effective retention (including pension)", value: pct(retentionWithPension) }]
          : []),
      ],
      note: "On an umbrella assignment the employer NIC (15% above the £5,000 secondary threshold), the Apprenticeship Levy (0.5%) and the umbrella margin are all funded from the assignment rate before your gross salary is set. PAYE income tax and employee NIC are then charged on your salary. Rolled-up holiday pay (12.07%) is paid to you as part of your gross salary each period rather than held back, so it is shown as a component of gross pay, not a deduction. Pension figures assume salary sacrifice, which reduces your taxable income. This calculator uses 2026/27 rates. The cash-in-hand figure is your net pay excluding pension; the effective retention including pension counts your pension pot as part of your total return.",
    };
  },
  explainer: {
    heading: "How umbrella company take-home pay is calculated for 2026/27",
    paragraphs: [
      "Your umbrella day rate has to cover more than your take-home pay. Before your gross salary is even set, the umbrella must pay employer National Insurance at 15% on your salary above the £5,000 secondary threshold, the Apprenticeship Levy at 0.5% of your salary, and retain its own weekly margin. These costs are funded from the assignment rate, not added on top, which is why an umbrella rate of £450 a day produces a much lower gross salary than the figure suggests. This calculator solves the employer-cost circularity properly: it works backwards from the assignment income to find the gross salary that, once employer NIC and the levy are added back, exactly uses up the pot remaining after the margin.",
      "Once your gross salary is established, you pay income tax and employee NIC on it just as an employee would. For 2026/27 the personal allowance is £12,570, basic rate income tax is 20% up to £50,270, higher rate 40% up to £125,140 and additional rate 45% above. Employee NIC is 8% between the £12,570 primary threshold and the £50,270 upper earnings limit, then 2% above. Most umbrella workers at a typical contractor rate pay 20% income tax on part of their gross salary and 8% employee NIC, leaving effective retention of roughly 55% to 65% of the assignment income depending on rate and weeks worked.",
      "Pension contributions via salary sacrifice reduce your taxable income before income tax and employee NIC are charged, so they are tax-efficient. If your umbrella operates auto-enrolment, the minimum employer contribution (3% in 2026/27) also comes out of the pot, though many umbrellas frame this as part of the overall cost structure in the Key Information Document. Adding a voluntary pension contribution can meaningfully improve your total return when you count the pension pot alongside the cash-in-hand figure.",
    ],
  },
  related: [
    {
      label: "Guide: turning a contractor day rate into take-home pay",
      href: "/blog/limited-company-tax/contractor-day-rate-to-take-home",
    },
    {
      label: "Umbrella vs limited company calculator",
      href: "/calculators/umbrella-vs-limited-calculator",
    },
  ],
  faqs: [
    {
      question: "Why does so much come out of my umbrella day rate before I see any pay?",
      answer:
        "Because the assignment rate has to fund the cost of employing you. For 2026/27, employer NIC at 15% on pay above £5,000, the Apprenticeship Levy at 0.5% and the umbrella's weekly margin are all deducted from the assignment rate before your gross salary is set. Only then does PAYE income tax and employee NIC come off your salary. At a £450 day rate working 46 weeks this commonly leaves you keeping around 60% of the assignment income as cash in hand.",
    },
    {
      question: "Is the umbrella margin taken weekly or annually?",
      answer:
        "Most umbrellas quote a weekly margin, typically £20 to £30 per week for a compliant provider. This calculator multiplies the weekly margin by your working weeks to get an annual figure. Your Key Information Document from the umbrella must show the margin and all other deductions clearly before you accept an assignment.",
    },
    {
      question: "How does the pension affect my take-home?",
      answer:
        "A pension contribution via salary sacrifice comes off your gross salary before income tax and employee NIC are calculated, so it reduces your tax bill as well as your cash-in-hand pay. At the basic rate a £1 pension contribution costs you about 71p in net pay, with the rest effectively topped up by the tax saving. The calculator shows both the cash-in-hand figure and a combined retention figure that includes the pension pot.",
    },
    {
      question: "What is the difference between a day rate and weekly or monthly rate?",
      answer:
        "Some umbrella assignments are quoted as a weekly or monthly rate rather than a day rate, particularly for part-time or flexible arrangements. This calculator supports all three. If you enter a weekly rate, the annual assignment income is simply your weekly rate multiplied by working weeks. If you enter a monthly rate, it is converted via the weeks-per-year figure you enter. Day rates multiply by days per week then by working weeks.",
    },
    {
      question: "Can I compare umbrella against limited company?",
      answer:
        "Yes. Use the umbrella vs limited company calculator to see how much more you might keep outside IR35 at the same day rate. The comparison only holds if your contract is genuinely outside IR35: if it is inside IR35, the limited-company figure is not available to you regardless of how you are structured.",
    },
    {
      question: "Are these the correct 2026/27 figures?",
      answer:
        "Yes. The calculator uses the locked 2026/27 rates throughout: employer NIC 15% above £5,000, Apprenticeship Levy 0.5%, personal allowance £12,570, income tax 20% to £50,270 then 40% to £125,140 then 45%, employee NIC 8% between £12,570 and £50,270 then 2%.",
    },
  ],
};
