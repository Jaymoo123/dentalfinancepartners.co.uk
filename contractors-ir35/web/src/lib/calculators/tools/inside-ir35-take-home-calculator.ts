import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { umbrellaTakeHome } from "../tax2026";
import { gbp, pct } from "../format";

/**
 * Inside-IR35 / umbrella take-home for 2026/27 (rUK). All tax maths runs through
 * the verified tax2026 primitive (umbrellaTakeHome); no rate is inlined here.
 * Employer NIC, the Apprenticeship Levy and the umbrella margin come out of the
 * assignment rate before PAYE is charged on the resulting gross salary.
 */
export const insideIr35TakeHomeCalculator: GenericTool = {
  kind: "generic",
  slug: "inside-ir35-take-home-calculator",
  name: "Inside IR35 Take-Home Pay Calculator",
  category: "IR35 and take-home",
  oneLiner:
    "Work out your annual net take-home on an inside-IR35 or umbrella contract for 2026/27, after employer NIC, the Apprenticeship Levy, the umbrella margin and PAYE.",
  metaTitle: "Inside IR35 Take-Home Calculator 2026/27 | Umbrella",
  metaDescription:
    "Free inside IR35 umbrella take-home calculator for 2026/27. See your net pay after employer NIC, Apprenticeship Levy, umbrella margin, income tax and employee NIC.",
  intro:
    "Enter your day rate and billable days to see what you take home on an inside-IR35 or umbrella assignment for 2026/27, once the employer costs and the umbrella margin come out of the rate.",
  ctaLabel: "Want this checked by a specialist contractor accountant? Talk to us →",
  embedHeight: 660,
  fields: [
    {
      id: "dayRate",
      label: "Assignment day rate",
      type: "currency",
      default: 500,
      step: 25,
      help: "The umbrella or assignment rate quoted to you. Employer NIC, the Apprenticeship Levy and the umbrella margin are funded from this rate, not added on top.",
    },
    {
      id: "billableDays",
      label: "Billable days per year",
      type: "number",
      default: 240,
      step: 5,
      min: 0,
      max: 260,
      help: "Days you expect to be paid for across the year. Assignment income is your day rate multiplied by these days.",
    },
    {
      id: "umbrellaMargin",
      label: "Umbrella margin (annual)",
      type: "currency",
      default: 1200,
      step: 100,
      advanced: true,
      help: "The umbrella company's retained fee for the year (often quoted weekly, around £20 to £30). A compliant umbrella sets this out clearly in your Key Information Document.",
    },
  ],
  compute: (v) => {
    const dayRate = Number(v.dayRate);
    const billableDays = Number(v.billableDays);
    const margin = Number(v.umbrellaMargin);
    const assignmentIncome = dayRate * billableDays;

    const r = umbrellaTakeHome({ assignmentIncome, umbrellaMargin: margin });

    return {
      headline: {
        label: "Net annual take-home",
        value: gbp(r.netTakeHome),
        sub: `You keep ${pct(r.retentionPct)} of ${gbp(assignmentIncome)} assignment income after all deductions`,
        tone: "default",
      },
      rows: [
        { label: "Assignment income", value: gbp(assignmentIncome) },
        { label: "Umbrella margin", value: `−${gbp(r.umbrellaMargin)}` },
        { label: "Employer NIC (15% above £5,000)", value: `−${gbp(r.employerNI)}` },
        { label: "Apprenticeship Levy (0.5%)", value: `−${gbp(r.apprenticeshipLevy)}` },
        { label: "Gross salary (PAYE)", value: gbp(r.grossSalary) },
        { label: "Income tax", value: `−${gbp(r.incomeTax)}` },
        { label: "Employee NIC (8% then 2%)", value: `−${gbp(r.employeeNI)}` },
        { label: "Net annual take-home", value: gbp(r.netTakeHome), strong: true },
      ],
      note: "On an inside-IR35 or umbrella assignment the employer NIC (15% above the £5,000 secondary threshold), the Apprenticeship Levy (0.5%) and the umbrella margin are all funded from the assignment rate before your gross salary is set, then PAYE income tax and employee NIC come off your salary. This is why an umbrella day rate is not comparable to a limited-company day rate. Holiday pay must be paid (not unlawfully retained) and a compliant umbrella gives you a Key Information Document showing the rate, deductions and expected take-home. Inside-IR35 home-to-client travel is generally not deductible.",
    };
  },
  explainer: {
    heading: "How inside-IR35 and umbrella take-home pay works for 2026/27",
    paragraphs: [
      "When a contract is inside IR35, or you take an assignment through an umbrella company, you are taxed broadly like an employee. There is no tax-efficient salary-and-dividend split: the income is paid as a salary subject to full PAYE income tax and employee National Insurance. The key thing to understand is that the assignment rate has to cover the employer's costs too. Employer NIC at 15% on pay above the £5,000 secondary threshold, the Apprenticeship Levy at 0.5%, and the umbrella's own margin all come out of the assignment rate before your gross salary is even set. That is why a £500 umbrella day rate leaves you with far less than a £500 outside-IR35 limited-company rate.",
      "This calculator solves the employer-cost circularity properly rather than approximating it. From the assignment income it first removes the umbrella margin, then works out the gross salary that, once employer NIC and the Apprenticeship Levy are added back, exactly uses up the remaining pot. Income tax and employee NIC are then charged on that gross salary using the 2026/27 figures: personal allowance £12,570, basic rate 20% to £50,270, higher rate 40% to £125,140, additional rate 45% above, employee NIC at 8% between the £12,570 primary threshold and the £50,270 upper earnings limit, then 2%. The net result is your real take-home.",
      "From 6 April 2026, Finance Act 2026 introduced a joint and several liability so that the recruitment agency contracting with the end client (or the end client where there is no agency) becomes jointly and severally liable with the umbrella for any PAYE and NIC the umbrella fails to remit. The umbrella remains your legal employer; what changes is that HMRC can pursue the agency or client for unpaid umbrella PAYE. The practical effect is that agencies and clients are far more careful which umbrellas they use, so you should insist on a compliant, accredited umbrella with a transparent Key Information Document and steer clear of any provider promising take-home rates that imply tax is not being properly deducted.",
    ],
  },
  faqs: [
    {
      question: "Why is my umbrella take-home so much lower than the day rate suggests?",
      answer:
        "Because the assignment rate has to fund the employer's costs before you are paid. Employer National Insurance at 15% above the £5,000 secondary threshold, the Apprenticeship Levy at 0.5% and the umbrella's margin all come out of the rate first, leaving the gross salary on which your PAYE income tax and employee NIC are then charged. For 2026/27 this commonly leaves an umbrella worker keeping somewhere around 55% to 60% of the assignment income, depending on the rate. A limited-company day rate is not directly comparable because those employer costs are structured differently.",
    },
    {
      question: "Should the employer NIC really come out of my rate?",
      answer:
        "On an umbrella assignment, yes, and a compliant umbrella will show this transparently. The assignment rate is an uplifted rate intended to cover the cost of employing you, so the employer NIC (15% for 2026/27), the Apprenticeship Levy and the margin are legitimately funded from it rather than from your gross salary. What is not acceptable is an umbrella deducting these without disclosure, retaining your holiday pay, or skimming through inflated expenses. Your Key Information Document should make every deduction clear before you start.",
    },
    {
      question: "What changed for umbrella companies on 6 April 2026?",
      answer:
        "From 6 April 2026, Finance Act 2026 (section 24, inserting Chapter 11 into ITEPA 2003) made the recruitment agency that contracts with the end client, or the end client itself where there is no agency, jointly and severally liable with the umbrella for PAYE and NIC the umbrella fails to pay over. The umbrella stays your legal employer, so your day-to-day relationship does not change, but HMRC can now pursue the agency or client for unpaid umbrella PAYE. It is a tax-compliance measure aimed at the non-compliant umbrella market, which makes agencies and clients far more careful which umbrellas they will use.",
    },
    {
      question: "Can I claim travel and other expenses inside IR35?",
      answer:
        "Generally not for home-to-client travel. Where an engagement is caught by the off-payroll rules, or is inside IR35, each assignment is treated as a separate employment so the client site is a permanent workplace and ordinary commuting is not deductible. This is the post-April-2016 restriction on travel and subsistence relief for workers under supervision, direction or control through an intermediary. Outside-IR35 contractors keep the temporary-workplace relief, subject to the 24-month rule, which is one reason outside-IR35 take-home is higher.",
    },
    {
      question: "Are these the correct 2026/27 figures?",
      answer:
        "Yes. The calculator uses the locked 2026/27 rates: personal allowance £12,570, income tax 20% / 40% / 45% across the £50,270 and £125,140 thresholds, employee NIC 8% (between £12,570 and £50,270) then 2%, employer NIC 15% above the £5,000 secondary threshold, and the Apprenticeship Levy at 0.5%. These reflect the position for the year 6 April 2026 to 5 April 2027.",
    },
  ],
};
