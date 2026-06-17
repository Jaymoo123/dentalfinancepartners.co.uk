import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { limitedTakeHome, umbrellaTakeHome } from "../tax2026";
import { gbp, pct } from "../format";

/**
 * Umbrella (inside IR35) vs limited company (outside IR35) for the same rate,
 * 2026/27. Runs both verified primitives on the same assignment value and shows
 * the annual gap. No rate is inlined; all maths is in tax2026.
 */
export const umbrellaVsLimitedCalculator: GenericTool = {
  kind: "generic",
  slug: "umbrella-vs-limited-calculator",
  name: "Umbrella vs Limited Company Calculator",
  category: "IR35 and take-home",
  oneLiner:
    "Compare your annual take-home through an umbrella (inside IR35) against a limited company (outside IR35) at the same day rate for 2026/27, and see the difference in pounds.",
  metaTitle: "Umbrella vs Limited Company Calculator 2026/27",
  metaDescription:
    "Free umbrella vs limited company calculator for 2026/27. Compare net take-home at the same day rate and see how much more you keep outside IR35.",
  intro:
    "Enter a day rate and your billable days to compare what you keep through an umbrella (inside IR35) against a limited company (outside IR35) for the 2026/27 tax year.",
  ctaLabel: "Want this checked by a specialist contractor accountant? Talk to us →",
  embedHeight: 660,
  fields: [
    {
      id: "dayRate",
      label: "Day rate",
      type: "currency",
      default: 500,
      step: 25,
      help: "The same headline day rate is applied to both routes so the comparison is like for like.",
    },
    {
      id: "billableDays",
      label: "Billable days per year",
      type: "number",
      default: 240,
      step: 5,
      min: 0,
      max: 260,
      help: "Days you expect to be paid for across the year.",
    },
    {
      id: "salary",
      label: "Limited company director salary",
      type: "select",
      default: "12570",
      options: [
        { value: "12570", label: "£12,570 (personal allowance / primary threshold)" },
        { value: "6708", label: "£6,708 (lower earnings limit)" },
      ],
      advanced: true,
      help: "The director salary used for the limited-company (outside IR35) route only.",
    },
    {
      id: "annualExpenses",
      label: "Limited company allowable expenses",
      type: "currency",
      default: 6000,
      step: 500,
      advanced: true,
      help: "Genuine business expenses claimable on the outside-IR35 limited-company route. An inside-IR35 umbrella worker generally cannot claim these.",
    },
    {
      id: "umbrellaMargin",
      label: "Umbrella margin (annual)",
      type: "currency",
      default: 1200,
      step: 100,
      advanced: true,
      help: "The umbrella's retained annual fee for the inside-IR35 route.",
    },
  ],
  compute: (v) => {
    const dayRate = Number(v.dayRate);
    const billableDays = Number(v.billableDays);
    const salary = Number(v.salary);
    const expenses = Number(v.annualExpenses);
    const margin = Number(v.umbrellaMargin);
    const income = dayRate * billableDays;

    const ltd = limitedTakeHome({ turnover: income, salary, expenses });
    const umb = umbrellaTakeHome({ assignmentIncome: income, umbrellaMargin: margin });
    const gap = ltd.netTakeHome - umb.netTakeHome;
    const gapPct = umb.netTakeHome > 0 ? (gap / umb.netTakeHome) * 100 : 0;

    return {
      headline: {
        label: "Extra kept by going limited (outside IR35)",
        value: gbp(gap),
        sub: `${gbp(income)} a year · about ${pct(gapPct)} more take-home than the umbrella route`,
        tone: "good",
      },
      rows: [
        { label: "Annual income (both routes)", value: gbp(income) },
        { label: "Limited company net (outside IR35)", value: gbp(ltd.netTakeHome), strong: true },
        { label: "Retention, limited", value: pct(ltd.retentionPct) },
        { label: "Umbrella net (inside IR35)", value: gbp(umb.netTakeHome), strong: true },
        { label: "Retention, umbrella", value: pct(umb.retentionPct) },
        { label: "Annual difference", value: gbp(gap), strong: true },
      ],
      note: "This comparison assumes the limited-company route is genuinely OUTSIDE IR35 (so you can pay yourself through salary and dividends and claim the expenses shown), while the inside-IR35 umbrella route cannot use that split and generally cannot claim those expenses. If the same contract is actually inside IR35, running a limited company does not unlock the limited-company figure: status, not company structure, drives the tax. The 2026/27 limited figure also assumes all profit is drawn as dividends with no employer pension contribution, which would change the picture again.",
    };
  },
  explainer: {
    heading: "Umbrella vs limited company: what really drives the difference",
    paragraphs: [
      "The gap between the two routes is almost entirely about IR35 status, not paperwork. An outside-IR35 limited company lets you take a small salary plus dividends, and dividends carry no National Insurance, so for 2026/27 you keep substantially more of the same day rate. An inside-IR35 umbrella assignment is taxed like employment: full PAYE income tax and employee NIC on a salary, after employer NIC (15%), the Apprenticeship Levy (0.5%) and the umbrella margin have already come out of the assignment rate. That is why the comparison above can show a five-figure annual difference at a typical contractor rate.",
      "The crucial caveat is that you do not get to choose the better number. If a contract is genuinely outside IR35, a limited company is usually the more tax-efficient vehicle and the comparison is meaningful. If the same contract is inside IR35, incorporating does not rescue the limited-company figure: the off-payroll rules (or Chapter 8 IR35) tax the engagement as employment regardless of the company in the chain. Status is determined by the working practices and, for medium and large clients, by the client's Status Determination Statement, not by which entity issues the invoice.",
      "There are also non-tax factors. A limited company carries running costs, accountancy, and director responsibilities, and works best with a steady pipeline of genuinely outside-IR35 work. An umbrella is administratively simple, gives you employment rights such as holiday pay, and suits inside-IR35 or short, low-margin assignments. For 2026/27, with the new umbrella joint and several liability from 6 April 2026, choosing a compliant accredited umbrella matters more than ever. The right answer is the one that matches your real status and your volume of work, which is exactly what a specialist review confirms.",
    ],
  },
  faqs: [
    {
      question: "Why does the limited-company route keep so much more?",
      answer:
        "Because outside IR35 you extract profit as a small salary plus dividends, and dividends carry no National Insurance, whereas an inside-IR35 umbrella assignment is taxed as employment with full PAYE and NIC after employer costs come out of the rate. At a typical 2026/27 contractor rate the difference is often well into five figures a year. The comparison only holds, though, if the contract is genuinely outside IR35; otherwise the limited-company figure is not available to you.",
    },
    {
      question: "If I set up a limited company, can I always use the outside-IR35 figure?",
      answer:
        "No. Company structure does not determine IR35 status. If your contract is inside IR35, the off-payroll rules tax the engagement as employment whether or not there is a limited company in the chain, so you would not keep the outside-IR35 amount. For medium and large clients the client decides your status and issues a Status Determination Statement; for small clients you self-assess under the original IR35 (Chapter 8). Always confirm status before assuming the limited-company take-home applies.",
    },
    {
      question: "Why can the umbrella worker not claim the same expenses?",
      answer:
        "Inside IR35 and umbrella assignments are treated as employment, so home-to-client travel and most day-to-day costs are not deductible, and there is no equivalent of the company expense deductions an outside-IR35 contractor enjoys. The 5% administrative expenses allowance that exists under Chapter 8 IR35 was abolished under the Chapter 10 off-payroll rules. This is part of why the inside-IR35 net is lower and the comparison shows a gap.",
    },
    {
      question: "Does this account for the 6 April 2026 umbrella changes?",
      answer:
        "The take-home maths uses the 2026/27 rates throughout. The April 2026 umbrella reform is a joint and several liability change: from 6 April 2026 the agency contracting with the end client, or the client where there is no agency, is jointly and severally liable with the umbrella for unpaid PAYE and NIC. It does not change your umbrella take-home directly, but it makes using a compliant, accredited umbrella important, because agencies and clients now police their supply chains far more tightly.",
    },
    {
      question: "Are pensions included in the comparison?",
      answer:
        "No. The limited-company figure assumes all post-tax profit is taken as dividends with no employer pension contribution. In practice an employer pension contribution is the most tax-efficient extraction route for an outside-IR35 contractor in 2026/27, deductible against corporation tax and free of NIC within the £60,000 annual allowance, which would widen the genuine after-tax advantage of the limited route further. A tailored review models salary, dividends and pension together rather than maximising dividends alone.",
    },
  ],
};
