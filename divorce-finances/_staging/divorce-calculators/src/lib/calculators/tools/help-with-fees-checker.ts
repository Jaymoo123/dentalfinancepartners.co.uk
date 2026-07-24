import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";
import {
  DIVORCE_APPLICATION_FEE,
  CONSENT_ORDER_FEE,
  CONTESTED_FINANCIAL_ORDER_FEE,
  HWF,
  hwfRemission,
} from "../divorce-finance";

export const helpWithFeesChecker: GenericTool = {
  kind: "generic",
  slug: "help-with-fees-checker",
  name: "Help with Fees (EX160) Remission Checker",
  category: "Divorce Costs",
  oneLiner:
    "Check whether the EX160 Help with Fees scheme will cover your £628 divorce fee or £62 consent order fee, using the current income and capital thresholds.",
  metaTitle: "Help with Fees Checker | EX160 Divorce Fee Remission 2026",
  metaDescription:
    "Find out if you qualify for Help with Fees (EX160) on your divorce application or consent order. Checks the capital limit, income thresholds and qualifying benefits, and estimates any contribution.",
  intro:
    "Court fees for divorce are not automatic. If your savings are below the capital limit and your income is low enough, the Help with Fees scheme (form EX160, or online at gov.uk) can wipe out some or all of the £628 divorce application fee and the £62 consent order fee. This checker applies the two tests, capital first, then income, and estimates any contribution you would still pay.",
  ctaLabel: "Get help with your divorce finances →",
  embedHeight: 720,
  fields: [
    {
      id: "fee",
      label: "Which court fee do you need help with?",
      type: "select",
      default: String(DIVORCE_APPLICATION_FEE),
      options: [
        { value: String(DIVORCE_APPLICATION_FEE), label: `Divorce application (£${DIVORCE_APPLICATION_FEE})` },
        { value: String(CONSENT_ORDER_FEE), label: `Consent order (£${CONSENT_ORDER_FEE})` },
        {
          value: String(CONTESTED_FINANCIAL_ORDER_FEE),
          label: `Contested financial order (£${CONTESTED_FINANCIAL_ORDER_FEE})`,
        },
      ],
    },
    {
      id: "disposableCapital",
      label: "Your savings and investments (joint with your partner if you have one)",
      type: "currency",
      default: 0,
      step: 250,
      help: "Cash, savings accounts, ISAs, stocks and shares. Your home, pension pot and everyday earnings do not count. In divorce cases your (ex) spouse's money is NOT counted even if you still live together.",
    },
    {
      id: "aged66OrOver",
      label: "Are you (or your partner) aged 66 or over?",
      type: "toggle",
      default: false,
      help: `Raises the capital limit from ${gbp(HWF.capitalLimitStandard)} to ${gbp(HWF.capitalLimitOver66)}.`,
    },
    {
      id: "onQualifyingBenefit",
      label: "Do you receive a qualifying benefit?",
      type: "toggle",
      default: false,
      help: "Universal Credit (earning under the scheme limit), income-based JSA or ESA, Income Support, or Guarantee Credit. Passes the income test automatically; the capital test still applies.",
    },
    {
      id: "grossMonthlyIncome",
      label: "Your gross monthly income (before tax)",
      type: "currency",
      default: 1400,
      step: 50,
      help: "Wages, self-employment, rental income, some benefits. In divorce cases you only count your own income, not your (ex) spouse's.",
    },
    {
      id: "hasPartner",
      label: "Do you live with a new partner (not the spouse you are divorcing)?",
      type: "toggle",
      default: false,
      help: "A new partner's income counts and raises the threshold. The spouse you are divorcing never counts as a partner for this form.",
    },
    {
      id: "children",
      label: "Number of dependent children living with you",
      type: "number",
      default: 0,
      min: 0,
      max: 10,
      help: `Each dependent child adds ${gbp(HWF.childPremium)} to your monthly income threshold.`,
    },
  ],
  compute: (v) => {
    const fee = Number(v.fee);
    const result = hwfRemission({
      fee,
      grossMonthlyIncome: Math.max(0, Number(v.grossMonthlyIncome)),
      hasPartner: Boolean(v.hasPartner),
      children: Math.max(0, Number(v.children)),
      onQualifyingBenefit: Boolean(v.onQualifyingBenefit),
      disposableCapital: Math.max(0, Number(v.disposableCapital)),
      aged66OrOver: Boolean(v.aged66OrOver),
    });

    const full = result.eligible && result.contribution === 0;
    const verdictText = full
      ? "Likely full remission: you should not have to pay this fee"
      : result.eligible
        ? `Likely partial remission: you pay around ${gbp(result.contribution)} of the ${gbp(fee)} fee`
        : result.failedTest === "capital"
          ? "Unlikely to qualify: your savings are over the capital limit"
          : "Unlikely to qualify: your income is too high for this fee";

    return {
      headline: {
        label: "Help with Fees estimate",
        value: full ? gbp(0) : gbp(result.contribution),
        sub: `Estimated amount you pay towards the ${gbp(fee)} fee`,
        tone: result.eligible ? "good" : "warn",
      },
      verdict: { text: verdictText, positive: result.eligible },
      rows: [
        { label: "Court fee", value: gbp(fee) },
        {
          label: "Capital limit for this fee",
          value: gbp(result.capitalLimit),
        },
        {
          label: "Capital test",
          value: result.failedTest === "capital" ? "Fail" : "Pass",
        },
        {
          label: "Your monthly income threshold (incl. children)",
          value: gbp(result.incomeThreshold),
        },
        { label: "Fee remitted", value: gbp(result.remission), strong: true },
        { label: "You pay", value: gbp(result.contribution), strong: true },
      ],
      note:
        "Estimate based on the gov.uk Help with Fees rules as at July 2026. Apply online at gov.uk/get-help-with-court-fees or on paper form EX160 BEFORE paying the fee; refunds after payment (EX160C ground) are possible but harder. HMCTS makes the final decision. This is general information, not legal or financial advice.",
    };
  },
  explainer: {
    heading: "How the Help with Fees scheme works",
    paragraphs: [
      "Help with Fees has two tests, applied in order. First the capital test: your savings and investments must be under the limit for the fee you are paying. For every divorce-related fee (all under £1,420) the limit is £4,250, rising to £16,000 if you or your partner are 66 or over. Fail this and income is irrelevant.",
      "Then the income test. If you receive a qualifying benefit (Universal Credit within the scheme's earnings limit, income-based JSA or ESA, Income Support or Guarantee Credit), you pass automatically and pay nothing. Otherwise your gross monthly income is compared to a threshold: £1,420 for a single applicant, £2,145 if you live with a partner, plus £710 per dependent child. At or below the threshold, the whole fee is remitted.",
      "Above the threshold you may still get partial help: broadly, you are asked to contribute 50p towards the fee for every £1 of income over your threshold, up to the full fee. Because divorce fees are small relative to the taper, even a modest excess can erode the remission quickly, but it always remains worth checking before paying £628.",
      "A crucial divorce-specific rule: the spouse or civil partner you are divorcing is never treated as your partner for the form, even if you still live in the same house. You declare only your own income and capital, plus a new partner's if you have one.",
    ],
  },
  workedExamples: [
    {
      title: "Universal Credit claimant, £1,500 savings, divorce fee",
      description: "A single applicant on Universal Credit with £1,500 in savings applies for the £628 divorce fee.",
      inputs: { fee: 628, disposableCapital: 1500, onQualifyingBenefit: true },
      result: {
        capitalTest: "Pass (£1,500 is under the £4,250 limit)",
        incomeTest: "Pass automatically on a qualifying benefit",
        outcome: "Full remission: the £628 fee is not payable",
      },
    },
    {
      title: "Working single parent, two children, £2,900 gross monthly income",
      description:
        "A single parent with two dependent children earns £2,900 gross per month and has £2,000 in savings, applying for the £628 divorce fee.",
      inputs: { fee: 628, grossMonthlyIncome: 2900, children: 2, disposableCapital: 2000 },
      result: {
        threshold: "£1,420 + 2 × £710 = £2,840",
        excess: "£2,900 - £2,840 = £60 over threshold",
        contribution: "50% of £60 = £30",
        outcome: "Partial remission: pays £30 of the £628 fee, £598 remitted",
      },
    },
    {
      title: "Applicant with £6,000 savings",
      description: "An applicant under 66 with £6,000 in savings applies for help with the £62 consent order fee.",
      inputs: { fee: 62, disposableCapital: 6000 },
      result: {
        capitalTest: "Fail (£6,000 is over the £4,250 limit)",
        outcome: "No remission, whatever the income. The full £62 is payable.",
      },
    },
  ],
  faqs: [
    {
      question: "Does my husband's or wife's income count on the EX160?",
      answer:
        "No. In divorce, dissolution and connected financial order applications, the person you are divorcing is not treated as your partner, even if you still share a home. You declare only your own income and capital, and a new partner's if you live with one.",
    },
    {
      question: "What counts as disposable capital?",
      answer:
        "Savings, ISAs, stocks and shares, redundancy payments and second properties. It excludes the home you live in, your pension pot, your household contents and your monthly earnings. For divorce fees the limit is £4,250 (£16,000 if you or your partner are 66 or over).",
    },
    {
      question: "Which benefits qualify automatically?",
      answer:
        "Income-based Jobseeker's Allowance, income-related Employment and Support Allowance, Income Support, Guarantee Credit (Pension Credit) and Universal Credit where your earnings are within the scheme's limit. Receiving one passes the income test, but you must still pass the capital test.",
    },
    {
      question: "Can I apply after I have already paid the fee?",
      answer:
        "Yes, you can apply for a refund within three months of paying, using the EX160 process and explaining the delay if it is longer. It is far cleaner to apply first: apply online, get a Help with Fees reference number and enter it on the divorce application instead of paying.",
    },
    {
      question: "Does Help with Fees cover the consent order fee too?",
      answer:
        "Yes. Each fee needs its own application, but the £62 consent order fee and the £292 contested financial order fee are both covered by the scheme on the same tests as the £628 divorce fee.",
    },
    {
      question: "Is this checker a guarantee?",
      answer:
        "No. It applies the published thresholds to what you enter, but HMCTS assesses the actual application and evidence. Thresholds are revised from time to time, so check the live figures on gov.uk when you apply. This tool is general information, not legal or financial advice.",
    },
  ],
  related: [
    { label: "Divorce cost calculator", href: "/calculators/divorce-cost-calculator" },
    { label: "Consent order cost calculator", href: "/calculators/consent-order-cost-calculator" },
  ],
};
