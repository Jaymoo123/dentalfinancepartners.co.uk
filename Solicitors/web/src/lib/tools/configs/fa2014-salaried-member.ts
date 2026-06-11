import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { calcFA2014SalariedMember } from "@/lib/tools/compute/fa2014-salaried-member";

export const fa2014SalariedMemberTool: GenericTool = {
  kind: "generic",
  slug: "fa-2014-salaried-member",
  name: "FA 2014 Salaried Member Test",
  category: "LLP / Partnership",
  oneLiner:
    "Three-condition Finance Act 2014 test: confirms whether an LLP member is partner-for-tax or a deemed employee.",
  embedHeight: 500,
  metaTitle: "FA 2014 Salaried Member Test | LLP Fixed-Share Member Calculator",
  metaDescription:
    "Free Finance Act 2014 Salaried Member Rules calculator. Enter your total reward, fixed pay and capital contribution to test all three conditions instantly.",
  intro:
    "Since 2014, HMRC can deem an LLP member an employee for tax purposes if all three conditions (A, B and C) are met. Use this tool to test your position and see what it would take to break each condition.",
  fields: [
    {
      id: "totalReward",
      label: "Total annual reward from the LLP",
      type: "currency",
      default: 105000,
      min: 0,
      max: 2000000,
      step: 1000,
      help: "Fixed + variable + benefits",
    },
    {
      id: "fixedReward",
      label: "Fixed / non-profit-dependent reward",
      type: "currency",
      default: 90000,
      min: 0,
      max: 2000000,
      step: 1000,
      help: "Reward not contingent on profit (the 'disguised salary')",
    },
    {
      id: "capitalContribution",
      label: "Capital contribution to the LLP",
      type: "currency",
      default: 20000,
      min: 0,
      max: 2000000,
      step: 1000,
      help: "Your capital account balance",
    },
    {
      id: "hasInfluence",
      label: "I have meaningful influence over LLP decisions",
      type: "toggle",
      default: false,
      help: "Management committee, voting on substantive matters",
    },
  ],
  compute(values) {
    const totalReward = Number(values.totalReward);
    const fixedReward = Number(values.fixedReward);
    const capitalContribution = Number(values.capitalContribution);
    const hasInfluence = Boolean(values.hasInfluence);
    const r = calcFA2014SalariedMember({ totalReward, fixedReward, capitalContribution, hasInfluence });
    const condALabel = r.conditionA_met ? "Met (fails test)" : "Not met (passes)";
    const condBLabel = r.conditionB_met ? "Met (fails test)" : "Not met (passes)";
    const condCLabel = r.conditionC_met ? "Met (fails test)" : "Not met (passes)";
    const rows = [
      { label: `Condition A: disguised salary ratio`, value: `${r.conditionA_ratio.toFixed(1)}% — ${condALabel}` },
      { label: `Condition B: limited influence`, value: condBLabel },
      { label: `Condition C: capital < 25% of fixed reward`, value: `${r.conditionC_ratio.toFixed(1)}% — ${condCLabel}` },
    ];
    if (r.all_met && r.additionalCapitalNeeded > 0) {
      rows.push({
        label: "Fix Condition C: additional capital needed",
        value: `£${r.additionalCapitalNeeded.toLocaleString("en-GB")} (total ${r.capitalToFixCondC.toLocaleString("en-GB")})`,
      });
    }
    return {
      headline: {
        label: "Verdict",
        value: r.verdict,
        sub: r.all_met ? "All three conditions met — PAYE treatment applies" : "At least one condition fails — partner-for-tax",
        tone: r.all_met ? ("warn" as const) : ("good" as const),
      },
      rows,
      note: "Finance Act 2014 Salaried Member Rules. All three conditions must be met for deemed employee status. Failing any single condition keeps partner-for-tax treatment.",
    };
  },
  explainer: {
    heading: "How the FA 2014 test works",
    paragraphs: [
      "HMRC introduced the Salaried Member Rules in Finance Act 2014 to prevent LLP members from benefiting from partnership tax treatment when they are economically more like employees. The test has three conditions (A, B and C); ALL three must be met for a member to be taxed as an employee.",
      "Condition A: at least 80% of total reward is fixed and not contingent on the LLP's profits. Condition B: the member has no significant influence over the LLP's affairs. Condition C: the member's capital contribution is less than 25% of their fixed reward.",
      "Condition C is the most commonly used defensive lever. Increasing your capital account above 25% of your fixed pay breaks Condition C — and therefore the test — even if A and B are met. Qualifying loan interest under ITA 2007 s.398 makes the cost of borrowing to fund the capital contribution tax-deductible.",
    ],
  },
  faqs: [
    {
      question: "What happens if all three conditions are met?",
      answer:
        "The LLP must operate PAYE on the member's drawings. The member pays income tax and employee NI on their fixed-pay element as if it were a salary. The LLP also pays employer NI. This typically increases the combined tax cost materially versus genuine partner-for-tax treatment.",
    },
    {
      question: "How can I break Condition C?",
      answer:
        "Increase your capital contribution to at least 25% of your disguised salary (fixed reward). The calculator shows the target amount. If you need to borrow to fund the contribution, interest on a qualifying loan is deductible under ITA 2007 s.398. Legal advice on the structure of the capital account is recommended.",
    },
    {
      question: "Does this apply to traditional partnerships (not LLPs)?",
      answer:
        "No. The FA 2014 Salaried Member Rules apply only to Limited Liability Partnerships. Traditional partnerships use the existing employment vs self-employment test for any individual member. Fixed-share partners in a traditional partnership may still face IR35-style scrutiny on disguised employment grounds.",
    },
  ],
};
