import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { calcClientAccountInterest } from "@/lib/tools/compute/client-account-interest";

/** pence-accurate GBP (shared gbp() rounds to whole pounds, too coarse here) */
const gbp2 = (n: number) =>
  `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const clientAccountInterestTool: GenericTool = {
  kind: "generic",
  slug: "client-account-interest",
  name: "Client Account Interest Estimator",
  category: "SRA Compliance",
  oneLiner:
    "Estimate the fair sum of interest due to clients under SRA Accounts Rule 7.1, and sense-check your de minimis policy.",
  embedHeight: 560,
  metaTitle: "Client Account Interest Calculator | SRA Rule 7.1 Fair Sum Estimator",
  metaDescription:
    "Free client account interest calculator for SRA-regulated firms. Estimate fair interest due to clients under Rule 7.1, test your policy rate against a benchmark, and sense-check your de minimis threshold.",
  intro:
    "Rule 7.1 of the SRA Accounts Rules requires firms to account to clients for a fair sum of interest on client money held. This tool models a representative matter (balance and holding period), compares your interest-policy rate against a benchmark instant-access rate, and scales the result to an indicative annual interest liability. It complements our SRA Client Account Reserve calculator: that tool sizes the firm's operational buffer, this one estimates what clients are entitled to receive.",
  fields: [
    {
      id: "typicalBalance",
      label: "Typical client money balance per matter",
      type: "currency",
      default: 250000,
      min: 0,
      max: 5000000,
      step: 5000,
      help: "A representative balance. Conveyancing completions commonly sit in the £100,000 to £500,000 range.",
    },
    {
      id: "holdingDays",
      label: "Typical holding period (days)",
      type: "number",
      default: 21,
      min: 1,
      max: 730,
      step: 1,
      help: "How long the money typically sits in the client account. Conveyancing is often 1 to 4 weeks; probate can be months.",
    },
    {
      id: "mattersPerYear",
      label: "Matters holding client money per year",
      type: "number",
      default: 120,
      min: 1,
      max: 10000,
      step: 5,
    },
    {
      id: "policyRate",
      label: "Your interest-policy rate",
      type: "number",
      default: 1.0,
      min: 0,
      max: 10,
      step: 0.05,
      suffix: "% p.a.",
      help: "The rate your written interest policy credits to clients.",
    },
    {
      id: "benchmarkRate",
      label: "Benchmark instant-access rate",
      type: "number",
      default: 3.0,
      min: 0,
      max: 10,
      step: 0.05,
      suffix: "% p.a.",
      help: "A rate the client could reasonably have obtained on an instant-access account. Update this to current market rates.",
    },
    {
      id: "deMinimis",
      label: "De minimis threshold (no interest paid below this)",
      type: "currency",
      default: 50,
      min: 0,
      max: 500,
      step: 5,
      advanced: true,
      help: "Most firms set £20 to £50. Higher thresholds need clear justification.",
    },
  ],
  compute(values) {
    const r = calcClientAccountInterest({
      typicalBalance: Number(values.typicalBalance),
      holdingDays: Number(values.holdingDays),
      mattersPerYear: Number(values.mattersPerYear),
      policyRate: Number(values.policyRate),
      benchmarkRate: Number(values.benchmarkRate),
      deMinimis: Number(values.deMinimis),
    });

    const underpaying = r.annualShortfall > 0;

    const notes: string[] = [];
    if (r.deMinimisSwallowsFairSum) {
      notes.push(
        "Your de minimis threshold exceeds the fair interest on this matter profile, so no interest would be paid at all. That is defensible for small, short-held balances, but risky if it routinely extinguishes material fair sums."
      );
    }
    if (r.deMinimisAboveTypicalRange) {
      notes.push(
        "Your de minimis threshold sits above the £20 to £50 range most firms adopt. The SRA expects the policy to produce a fair outcome; be ready to justify a higher figure."
      );
    }
    notes.push(
      "Indicative only. Rule 7.1 requires a fair sum in all the circumstances, not a fixed formula. Review your written interest policy with your COFA and reporting accountant."
    );

    return {
      headline: {
        label: "Indicative annual fair interest due to clients",
        value: gbp2(r.annualFairInterest),
        sub: underpaying
          ? `Your policy pays ${gbp2(r.annualPolicyInterest)} a year, an indicative shortfall of ${gbp2(r.annualShortfall)} against the benchmark.`
          : "Your policy rate meets or exceeds the benchmark on this matter profile.",
        tone: underpaying ? ("warn" as const) : ("good" as const),
      },
      rows: [
        { label: "Fair interest per matter (benchmark rate)", value: gbp2(r.fairInterestPerMatter), strong: true as const },
        { label: "Interest per matter under your policy", value: gbp2(r.policyInterestPerMatter) },
        { label: "Shortfall per matter", value: gbp2(r.shortfallPerMatter) },
        { label: "Annual interest payable under your policy", value: gbp2(r.annualPolicyInterest) },
        { label: "Annual shortfall vs benchmark", value: gbp2(r.annualShortfall), strong: true as const },
      ],
      note: notes.join(" "),
    };
  },
  explainer: {
    heading: "How the fair sum is estimated",
    paragraphs: [
      "Rule 7.1 of the SRA Accounts Rules 2019 says a firm must account to clients or third parties for a fair sum of interest on client money held on their behalf. The rules deliberately do not prescribe a rate or a formula. The common approach, and the one this tool uses, is to benchmark against what the client could reasonably have earned in an instant-access account over the same period: balance multiplied by the benchmark rate, pro-rated for the days held.",
      "The calculator compares that fair sum against what your written interest policy would actually credit, then multiplies both by your annual matter volume to show the aggregate position. A policy rate well below prevailing instant-access rates produces a growing gap between what clients receive and what a court or the SRA might consider fair, particularly on large conveyancing balances.",
      "Rule 7.2 permits a different arrangement only by written agreement with informed consent. A de minimis threshold, below which no interest is paid, is standard practice because processing tiny payments costs more than the interest itself. Most firms set it between £20 and £50 per matter. A threshold that routinely extinguishes material interest on typical matters is unlikely to produce a fair outcome.",
      "Worked example 1, conveyancing: a firm holds £250,000 of completion money for 21 days. At a 3.0% benchmark the fair sum is £250,000 x 3.0% x 21/365 = £431.51. The firm's policy pays 1.0%, crediting £143.84, an indicative shortfall of £287.67 on a single matter. Across 120 similar matters a year, clients are collectively due around £51,781 at the benchmark against £17,260 under the policy.",
      "Worked example 2, probate: an estate holds £60,000 for nine months (roughly 274 days). Fair sum at 3.0% is £60,000 x 3.0% x 274/365 = £1,351.23; a 1.5% policy rate credits £675.62. By contrast, £5,000 held for 14 days generates just £5.75 at the benchmark, comfortably below a £50 de minimis, so paying nothing on that matter is defensible.",
      "This estimator addresses the client-side entitlement. For the firm-side question, how large an operational buffer to hold against client account risk, use our SRA Client Account Reserve calculator alongside this tool.",
    ],
  },
  faqs: [
    {
      question: "Does the SRA set a rate of interest firms must pay on client money?",
      answer:
        "No. Rule 7.1 only requires a fair sum of interest in all the circumstances. Firms must have a written interest policy and apply it consistently. Benchmarking against instant-access savings rates for comparable amounts and periods is the widely accepted way to evidence fairness.",
    },
    {
      question: "Can we keep the interest our client account actually earns?",
      answer:
        "The firm may retain any margin between what the bank pays on the general client account and the fair sum credited to clients, provided clients still receive a fair sum. If money is held in a designated deposit account for a specific client, all interest earned on it belongs to that client.",
    },
    {
      question: "Is a de minimis threshold allowed, and how high can it be?",
      answer:
        "Yes, a sensible de minimis is standard because administering trivial payments costs more than the interest. Typical thresholds are £20 to £50 per matter. There is no fixed cap, but the higher the threshold, the harder it is to argue the overall outcome is fair, especially if it wipes out interest on your typical matter profile.",
    },
    {
      question: "Can clients agree to receive no interest at all?",
      answer:
        "Rule 7.2 allows a different arrangement by written agreement, but only where the client gives informed consent and the arrangement is fair. Burying a blanket waiver in standard terms without explanation is unlikely to satisfy the informed-consent requirement.",
    },
    {
      question: "How is interest paid to clients treated for tax?",
      answer:
        "Interest paid to clients under Rule 7.1 is normally paid gross, and it is the client's responsibility to declare it as savings income. For the firm, interest credited to clients is a deductible expense against any interest income the client account generates. Take specific advice on your own structure.",
    },
    {
      question: "How does this differ from the SRA Client Account Reserve calculator?",
      answer:
        "The reserve calculator sizes a prudent firm-side buffer against client account risks such as reconciliation shortfalls and residual balances. This estimator works the other direction: it quantifies what clients are entitled to receive as interest under Rule 7.1. Together they cover both sides of the client money position.",
    },
  ],
  related: [
    { label: "SRA Client Account Reserve calculator", href: "/calculators/sra-client-account-reserve" },
  ],
};
