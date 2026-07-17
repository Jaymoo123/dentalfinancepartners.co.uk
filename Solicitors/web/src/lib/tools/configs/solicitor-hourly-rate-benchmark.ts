import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp, pct } from "@accounting-network/web-shared/tools/format";
import {
  calcRateBenchmark,
  type Grade,
  type GhrBand,
} from "@/lib/tools/compute/solicitor-hourly-rate-benchmark";

export const solicitorHourlyRateBenchmarkTool: GenericTool = {
  kind: "generic",
  slug: "solicitor-hourly-rate-benchmark",
  name: "Hourly Rate & Salary Benchmarker",
  category: "Practice Finance",
  oneLiner:
    "Compare your charge-out rate against the Guideline Hourly Rates and check your salary against the rule of thirds.",
  embedHeight: 560,
  metaTitle: "Solicitor Hourly Rate Benchmark | GHR Comparison & Salary Check 2026/27",
  metaDescription:
    "Free solicitor hourly rate benchmarker. Compare your charge-out rate against the current Guideline Hourly Rates by grade (A-D) and region, and benchmark salary against billings using the rule of thirds.",
  intro:
    "The Guideline Hourly Rates (GHR) published by the Civil Justice Council are the reference point courts use when assessing costs, and the closest thing UK law firms have to a public rate card. This tool compares your charge-out rate against the current GHR for your grade and region, then works out what your billings imply about salary using the rule of thirds and 2026/27 employer NIC (15% above £5,000). Useful for annual rate reviews, salary negotiations, and sense-checking whether a fee earner covers their cost.",
  fields: [
    {
      id: "grade",
      label: "Fee earner grade",
      type: "select",
      default: "C",
      options: [
        { value: "A", label: "Grade A (solicitors 8+ years PQE)" },
        { value: "B", label: "Grade B (solicitors 4-8 years PQE)" },
        { value: "C", label: "Grade C (solicitors up to 4 years PQE)" },
        { value: "D", label: "Grade D (trainees, paralegals, fee earners of equivalent experience)" },
      ],
    },
    {
      id: "band",
      label: "GHR region band",
      type: "select",
      default: "national-1",
      options: [
        { value: "london-1", label: "London 1 (very heavy commercial and corporate work)" },
        { value: "london-2", label: "London 2 (City and central London)" },
        { value: "london-3", label: "London 3 (outer London)" },
        { value: "national-1", label: "National 1 (major regional centres)" },
        { value: "national-2", label: "National 2 (rest of England and Wales)" },
      ],
    },
    {
      id: "chargeRate",
      label: "Current charge-out rate (per hour)",
      type: "currency",
      default: 185,
      min: 0,
      max: 2000,
      step: 5,
    },
    {
      id: "salary",
      label: "Gross salary (or notional salary for partners)",
      type: "currency",
      default: 48000,
      min: 0,
      max: 1000000,
      step: 1000,
    },
    {
      id: "chargeableHours",
      label: "Chargeable hours per year",
      type: "number",
      default: 1100,
      min: 100,
      max: 2500,
      step: 50,
      help: "UK private practice typically records 1,000-1,400 chargeable hours per year.",
    },
  ],
  compute(values) {
    const grade = String(values.grade) as Grade;
    const band = String(values.band) as GhrBand;
    const chargeRate = Number(values.chargeRate);
    const salary = Number(values.salary);
    const chargeableHours = Number(values.chargeableHours);
    const r = calcRateBenchmark({ grade, band, chargeRate, salary, chargeableHours });
    const aboveBelow = r.rateGap >= 0 ? "above" : "below";
    return {
      headline: {
        label: "Your rate vs Guideline Hourly Rate",
        value: `${pct(r.rateVsGhrPct, 0)} of GHR`,
        sub: `GHR for Grade ${grade}: ${gbp(r.ghrRate)}/hr. You charge ${gbp(Math.abs(r.rateGap))}/hr ${aboveBelow} guideline.`,
        tone: r.rateVsGhrPct >= 100 ? ("good" as const) : ("warn" as const),
      },
      rows: [
        { label: "Guideline Hourly Rate (your grade and band)", value: `${gbp(r.ghrRate)}/hr` },
        { label: "Annual billings at your rate and hours", value: gbp(r.annualBillings), strong: true as const },
        { label: "Employer NIC (15% above £5,000, 2026/27)", value: gbp(r.employerNic) },
        { label: "Total employment cost", value: gbp(r.totalEmploymentCost) },
        {
          label: "Cost coverage multiple (rule-of-thirds target: 3.0x)",
          value: `${r.costCoverageMultiple.toFixed(2)}x`,
          strong: true as const,
        },
        { label: "Rule-of-thirds salary benchmark (billings ÷ 3)", value: gbp(r.ruleOfThirdsSalary) },
      ],
      verdict: {
        text:
          r.costCoverageMultiple >= 3
            ? "This fee earner covers their cost at or above the rule-of-thirds benchmark."
            : "Billings fall short of the 3x rule-of-thirds benchmark. Review rate, chargeable hours, or recovery before reviewing salary.",
        positive: r.costCoverageMultiple >= 3,
      },
      note: "GHR figures are the rates effective from 1 January 2026 (Civil Justice Council). GHR are court cost-assessment guidelines, not a cap on what firms may charge their own clients. Salary benchmark uses the rule-of-thirds convention, not survey data.",
    };
  },
  explainer: {
    heading: "How the benchmark works, with worked examples",
    paragraphs: [
      "The Guideline Hourly Rates are published by the Civil Justice Council and adopted by the courts as the starting point for summary cost assessment. They are set by fee earner grade (A to D, broadly by post-qualification experience) and by region band (London 1 to 3 and National 1 to 2). Since 2024 they have been uprated annually in line with the SPPI inflation index, with the current table effective from 1 January 2026.",
      "The salary side uses the rule of thirds, the oldest profitability convention in private practice: a fee earner's billings should split roughly one third to their salary, one third to overhead, and one third to profit. Equivalently, billings should be about three times total employment cost, which for 2026/27 means salary plus employer National Insurance at 15% on earnings above £5,000.",
      "Worked example 1: a Grade C solicitor (2 years PQE) in a major regional centre (National 1) charges £185 per hour, earns £48,000, and records 1,100 chargeable hours. The National 1 Grade C guideline rate is £201 per hour, so she is charging 92% of GHR, £16 per hour below guideline. Annual billings are £185 x 1,100 = £203,500. Employer NIC is 15% of (£48,000 - £5,000) = £6,450, giving a total employment cost of £54,450. Her cost coverage multiple is £203,500 / £54,450 = 3.74x, comfortably above the 3.0x rule-of-thirds target, and the billings-derived salary benchmark is £203,500 / 3 = £67,833. The data supports both a rate rise to at least guideline and headroom in salary negotiation.",
      "Worked example 2: a Grade A partner in central London (London 2) charges £450 per hour against a notional salary of £130,000, recording 1,000 chargeable hours. The London 2 Grade A guideline is £422 per hour, so the partner charges 107% of GHR, £28 per hour above guideline, which is common on solicitor-own-client terms. Billings are £450,000; employer NIC on the notional salary is £18,750, total cost £148,750, and the coverage multiple is 3.03x, right on the rule-of-thirds line. The rule-of-thirds salary benchmark is £150,000.",
      "Treat the outputs as a triage, not a verdict. A fee earner below 3.0x may still be profitable if they generate work for others, and a rate above GHR is entirely legitimate between solicitor and own client. But a rate materially below guideline with a coverage multiple under 3.0x is the clearest signal in practice finance that pricing, not people, is the problem.",
    ],
  },
  faqs: [
    {
      question: "Are the Guideline Hourly Rates a cap on what I can charge?",
      answer:
        "No. GHR apply to between-the-parties cost assessment, where the losing party pays. What you charge your own client is a contractual matter, and many firms, particularly in commercial work, charge well above guideline on solicitor-own-client terms. Courts can also allow above-guideline rates on assessment where the case justifies it, such as heavy commercial litigation.",
    },
    {
      question: "Which region band should I use?",
      answer:
        "The bands follow the location of the fee earner's office, not the client. London 1 covers very heavy commercial and corporate work by centrally based London firms; London 2 is other central London work; London 3 is outer London. National 1 covers the major regional centres (for example Manchester, Leeds, Birmingham, Bristol) and National 2 covers the rest of England and Wales. If in doubt, check the current table on judiciary.uk, which lists the postcodes and court areas for each band.",
    },
    {
      question: "How often do the Guideline Hourly Rates change?",
      answer:
        "After a long freeze between 2010 and 2021, the rates were overhauled in 2021, revised again in January 2024, and are now uprated each January in line with the SPPI (Services Producer Price Index). This tool uses the table effective from 1 January 2026. Check judiciary.uk for the most recent uprating before relying on a figure in a costs schedule.",
    },
    {
      question: "Is the rule of thirds still a realistic salary benchmark?",
      answer:
        "It is a starting point, not a law. Modern firms with high leverage and low overhead can pay above a third of billings; firms with expensive premises or heavy support ratios may sit below it. The more reliable use is directional: if a fee earner's billings are less than three times their total employment cost, either the rate, the recorded hours, or the recovery rate needs attention before the salary conversation does.",
    },
    {
      question: "Why does the tool add employer National Insurance to salary?",
      answer:
        "Because the firm's true cost of employing a fee earner is salary plus employer NIC (15% on earnings above £5,000 for 2026/27), plus pension and benefits which this tool leaves out for simplicity. Benchmarking billings against salary alone flatters the coverage multiple and can make an unprofitable fee earner look fine on paper.",
    },
    {
      question: "What counts as chargeable hours, and what is a realistic target?",
      answer:
        "Chargeable hours are time recorded to client matters, before any write-offs. UK private practice targets typically sit between 1,000 and 1,400 hours per year outside the largest City firms; the widely quoted 1,100 hours works out at roughly 4.5 recorded hours per working day. Remember that recovery (the proportion of recorded time actually billed and collected) further reduces the cash the firm sees, so the multiple here is an upper bound.",
    },
  ],
  related: [
    { label: "PII Premium Estimator", href: "/calculators/indemnity-premium-estimator" },
  ],
};
