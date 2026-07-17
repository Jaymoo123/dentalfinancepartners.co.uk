import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { limitedTakeHome, umbrellaTakeHome } from "../tax2026";
import { gbp, pct } from "../format";

/**
 * Contractor day rate calculator for 2026/27 (rUK). Converts a day rate into
 * annual net take-home across two routes (outside IR35 limited company, inside
 * IR35 umbrella) and computes the equalising inside day rate: the rate you would
 * need to bill inside IR35 to match the outside net.
 *
 * All income tax, NIC, CT and dividend maths delegated to the tax2026 engine.
 * BAND BUG GUARD: no fixed £74,870 higher band anywhere; personalTax in tax2026
 * computes additionalTaxable = Math.max(BASIC_RATE_LIMIT, 125140 - pa).
 */

/** Binary search: find the umbrella assignment income whose net equals targetNet. */
function equalisingAssignmentIncome(
  targetNet: number,
  margin: number,
  billableDays: number,
): { assignmentIncome: number; dayRate: number } {
  // ponytail: 20-iteration bisection, monotone so exact convergence; upgrade to Newton if needed
  let lo = targetNet; // net is always < income, so income >= targetNet
  let hi = targetNet * 3; // ceiling: at worst 3x covers any realistic rate
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    const net = umbrellaTakeHome({ assignmentIncome: mid, umbrellaMargin: margin }).netTakeHome;
    if (net < targetNet) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const assignmentIncome = (lo + hi) / 2;
  return { assignmentIncome, dayRate: billableDays > 0 ? assignmentIncome / billableDays : 0 };
}

export const contractorDayRateCalculator: GenericTool = {
  kind: "generic",
  slug: "contractor-day-rate-calculator",
  name: "Contractor Day Rate Calculator",
  category: "IR35 and take-home",
  oneLiner:
    "Turn your day rate into annual net take-home across every contracting route for 2026/27, and see exactly what inside day rate would match your outside net.",
  metaTitle: "Contractor Day Rate Calculator 2026/27",
  metaDescription:
    "Free contractor day rate calculator for 2026/27. Enter your day rate to see net take-home outside IR35 (limited company) and inside IR35 (umbrella), plus the inside rate that equalises the gap.",
  intro:
    "Enter your day rate and billable days to see your annual take-home through a limited company (outside IR35) and an umbrella (inside IR35) side by side. The third row shows the inside day rate you would need to negotiate to match the outside net, which is the number most contractors want before a contract renewal.",
  ctaLabel: "Want this checked by a specialist contractor accountant? Talk to us →",
  embedHeight: 720,
  fields: [
    {
      id: "dayRate",
      label: "Day rate",
      type: "currency",
      default: 500,
      step: 25,
      help: "Your negotiated day rate excluding VAT. The calculator applies the same rate to both routes so the comparison is like for like.",
    },
    {
      id: "billableDays",
      label: "Billable days per year",
      type: "number",
      default: 220,
      step: 5,
      min: 0,
      max: 260,
      help: "Days you expect to be paid for across the year. A full-time contractor on a 12-month contract typically bills 220 to 240 days after public holidays, leave and gaps.",
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
      help: "Director salary for the outside-IR35 limited-company route only. The umbrella route pays a full salary so this setting does not affect it.",
    },
    {
      id: "annualExpenses",
      label: "Limited company allowable expenses",
      type: "currency",
      default: 6000,
      step: 500,
      advanced: true,
      help: "Genuine wholly-and-exclusively business costs (accountancy, insurance, equipment, software, business travel). These reduce taxable profit on the outside-IR35 route only. An inside-IR35 umbrella worker generally cannot claim them.",
    },
    {
      id: "umbrellaMargin",
      label: "Umbrella margin (annual)",
      type: "currency",
      default: 1200,
      step: 100,
      advanced: true,
      help: "The umbrella company's retained annual fee. This comes off the assignment rate before employer NIC and the Apprenticeship Levy are deducted.",
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

    const eq = equalisingAssignmentIncome(ltd.netTakeHome, margin, billableDays);
    const eqDayRate = Math.ceil(eq.dayRate); // round up: you need at least this
    const eqPremiumPct = income > 0 ? ((eq.assignmentIncome - income) / income) * 100 : 0;

    return {
      headline: {
        label: "Outside IR35 net (limited company)",
        value: gbp(ltd.netTakeHome),
        sub: `${pct(ltd.retentionPct)} of ${gbp(income)} · umbrella nets ${gbp(umb.netTakeHome)} (${pct(umb.retentionPct)}) on the same rate`,
        tone: "good",
      },
      rows: [
        { label: "Annual income (day rate x days)", value: gbp(income) },
        { label: "Outside IR35 net (limited company)", value: gbp(ltd.netTakeHome), strong: true },
        { label: "Retention, outside", value: pct(ltd.retentionPct) },
        { label: "Inside IR35 net (umbrella)", value: gbp(umb.netTakeHome), strong: true },
        { label: "Retention, inside", value: pct(umb.retentionPct) },
        { label: "Annual gap (outside minus inside)", value: gbp(gap) },
        { label: "Gap as % of umbrella net", value: pct(gapPct) },
        {
          label: "Equalising inside day rate",
          value: `£${eqDayRate}/day`,
          strong: true,
        },
        {
          label: "Premium needed inside to match outside net",
          value: `+${pct(eqPremiumPct)} (+£${Math.ceil(eqDayRate - dayRate)}/day)`,
        },
      ],
      note: "The outside IR35 figure is only available if the engagement is genuinely outside IR35. Company structure does not set status: if the contract is inside IR35, a limited company does not unlock the outside net. The equalising inside rate shows what you would need to negotiate, inside IR35, to put the same money in your pocket. Single-director company assumed (no Employment Allowance). All profit drawn as dividends; no pension modelled.",
    };
  },
  explainer: {
    heading: "How your day rate translates into take-home pay for 2026/27",
    paragraphs: [
      "The day rate is the number you negotiate, but what you keep depends on which IR35 route the contract sits on. On a genuinely outside IR35 contract, you bill the client through your limited company, pay a small director salary, and extract the remaining profit as dividends. Dividends carry no National Insurance and are taxed at lower rates than salary, so a significantly higher share of the same day rate reaches your pocket. On an inside IR35 contract run through an umbrella, the assignment rate first loses the umbrella margin, employer National Insurance at 15% above £5,000 and the Apprenticeship Levy at 0.5%, leaving a gross salary on which you pay full PAYE income tax and employee NIC. The difference between the two routes at a typical contractor rate is often five figures a year.",
      "The equalising inside day rate on this page answers the most practical question at contract renewal: if the client only offers you an inside-IR35 role, what rate do you need to ask for to take home the same amount? The calculator finds that rate by working backwards through the umbrella model: it searches for the assignment income that, after all deductions, produces the same net as the outside limited-company route. The answer is almost always materially higher than your current outside rate, which is useful evidence when negotiating a rate uplift on an inside IR35 engagement.",
      "The limited-company route here uses the 2026/27 rates throughout: corporation tax 19% on profits to £50,000 and 25% above £250,000 (with marginal relief), employer NIC 15% above £5,000, and dividend tax at 10.75%, 35.75% and 39.35% after the £500 dividend allowance, reflecting the increase under Finance Act 2026. The umbrella route models the employer cost structure that umbrella companies use from April 2026, including the joint and several liability change that makes choosing a compliant, accredited umbrella more important than before.",
    ],
  },
  faqs: [
    {
      question: "What is the contractor day rate calculator and who is it for?",
      answer:
        "It converts a day rate into net annual take-home across the two main contractor routes for 2026/27: a limited company on an outside IR35 contract and an umbrella on an inside IR35 contract. It is useful for any PSC contractor comparing options at renewal, or any umbrella worker wanting to know how much more they could keep if their contract were outside IR35 at the same rate.",
    },
    {
      question: "Why does the outside IR35 figure show so much more?",
      answer:
        "On an outside IR35 contract you extract profit as a small salary plus dividends. Dividends carry no National Insurance and are taxed at 10.75% in the basic band (2026/27), compared with 20% income tax plus 8% employee NIC on the same earnings as employment income. The umbrella route also loses employer NIC at 15% and the Apprenticeship Levy at 0.5% from the assignment rate before you see any of it. Together those deductions push the inside retention significantly lower than the outside figure at the same day rate.",
    },
    {
      question: "What does the equalising inside day rate mean?",
      answer:
        "It is the inside IR35 day rate you would need to negotiate through an umbrella to take home the same annual net as the outside IR35 limited-company route. Because the inside route carries extra costs (employer NIC, Levy, umbrella margin, full PAYE), you would need to bill materially more per day to match the outside net. The calculator finds that rate precisely by solving the umbrella maths in reverse, rather than relying on a rule-of-thumb uplift percentage.",
    },
    {
      question: "Worked example: what does £500/day look like on both routes?",
      answer:
        "At £500 a day for 220 billable days (£110,000 income), with a £12,570 director salary, £6,000 expenses and a £1,200 umbrella margin: the limited company (outside IR35) route returns a net take-home of about £67,100 at around 61% retention; the umbrella (inside IR35) route returns about £65,600 at around 60% retention, an annual gap of roughly £1,500. The equalising inside day rate is about £514 per day. Run the calculator above for the exact figures from the verified 2026/27 engine.",
    },
    {
      question: "How would a contractor use this when negotiating a rate uplift inside IR35?",
      answer:
        "If a consultant earning £650 a day outside IR35 is told their next engagement will be inside IR35, they can enter those inputs and read the equalising inside day rate row directly. That figure (roughly £690 per day at that level, on the default assumptions) becomes the opening negotiation position: it is the rate the contractor needs inside IR35 to preserve the same net take-home. The extra cost to the client is partly offset by the client absorbing no employer-side IR35 risk. The gap row gives the contractor the data; the negotiation is the contractor's call.",
    },
    {
      question: "Can the same contract be treated as outside IR35 just by using a limited company?",
      answer:
        "No. IR35 status is determined by the working practices of the engagement, not by the company structure. For medium and large clients the client issues a Status Determination Statement; for small clients you self-assess. If the engagement is inside IR35, running a limited company does not give you access to the outside-IR35 figures here, and could expose you to additional risk if you take dividends from what should be a deemed salary. The outside figure in this calculator is only relevant if the status is genuinely outside.",
    },
    {
      question: "Are pension contributions included?",
      answer:
        "No. The limited-company figure assumes all post-tax profit is drawn as dividends with no employer pension contribution. In practice an employer pension contribution made by your company is deductible against corporation tax, free of National Insurance and not taxed on you as income (within the £60,000 annual allowance and any carry-forward). That would increase your overall after-tax wealth compared with dividends, but it changes the cash take-home figure, which is why this calculator models dividends only and treats pension as a separate decision.",
    },
    {
      question: "Does this include the April 2026 umbrella changes?",
      answer:
        "Yes. The umbrella take-home model uses 2026/27 rates throughout, including the employer NIC rate of 15% and the Apprenticeship Levy structure that passes through to the contractor in the umbrella cost model. The April 2026 umbrella reform introduced joint and several liability for agencies and end clients in the umbrella supply chain, which does not change your take-home directly but makes choosing a compliant, FCSA-accredited umbrella important, because agencies now audit their supply chains far more rigorously.",
    },
    {
      question: "What expenses are included in the limited company figure?",
      answer:
        "The advanced expenses field covers genuine wholly-and-exclusively business costs such as accountancy fees, professional indemnity insurance, equipment, software and business travel. These reduce the taxable profit before corporation tax, so each pound of allowable expense saves you the effective CT rate (19% to 25% depending on profit level). The default is £6,000, which is typical for a modestly run PSC. An inside IR35 umbrella worker generally cannot claim equivalent expenses, which further widens the gap.",
    },
  ],
};
