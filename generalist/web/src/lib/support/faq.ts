/**
 * Curated, topic-aware FAQ for the SpecialistWidget (WS6).
 * 10 Q&As total: 3 generic + 7 by-topic (2 per flagship topic).
 *
 * Every answer is short, accurate, points to the matching calculator when
 * relevant, and ends the deep cases at "ask a specialist for your numbers".
 * Figures follow the LOCKED house positions (docs/generalist/house_positions.md).
 *
 * Safety rules (LOCKED):
 * - No em-dashes in any copy.
 * - Never claim the firm is chartered, qualified or MLR-supervised.
 * - Faceless (no named expert).
 * - No surveillance framing ("we noticed you're struggling...").
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually much sooner. Leave your email and a one-line question and an accountant will come back to you personally.",
  },
  {
    q: "Is the first conversation free?",
    a: "Yes. The first call to understand your situation and point you in the right direction is free, with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: your business structure (sole trader, partnership or company), your approximate profit or turnover, and what is prompting the question. If you are not sure, we will guide you.",
  },
];

const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  "director-pay": [
    {
      q: "What is the most tax-efficient way to pay myself?",
      a: "Usually a modest salary plus dividends. From 6 April 2026 dividends are taxed at 10.75% (basic), 35.75% (higher) and 39.35% (additional), with a £500 allowance. The salary and dividend planner shows the split; we then confirm it for your company.",
    },
    {
      q: "What salary should a director take?",
      a: "With no Employment Allowance, a one-director company often sets salary at the £5,000 secondary threshold to avoid employer NIC, or at £12,570 to use the full personal allowance. With a genuine second employee the £10,500 Employment Allowance usually makes £12,570 better. We model both.",
    },
  ],
  "limited-company": [
    {
      q: "What is the most tax-efficient way to pay myself?",
      a: "Usually a modest salary plus dividends. From 6 April 2026 dividends are taxed at 10.75% (basic), 35.75% (higher) and 39.35% (additional), with a £500 allowance. The salary and dividend planner shows the split; we then confirm it for your company.",
    },
    {
      q: "What salary should a director take?",
      a: "With no Employment Allowance, a one-director company often sets salary at the £5,000 secondary threshold to avoid employer NIC, or at £12,570 to use the full personal allowance. With a genuine second employee the £10,500 Employment Allowance usually makes £12,570 better. We model both.",
    },
  ],
  incorporation: [
    {
      q: "Should I set up a limited company?",
      a: "Sometimes, but it is a calculation, not a default. A company can be efficient if you retain profit, but adds accounts, a Companies House filing and payroll, and the 2026/27 dividend rise narrows the gap. The comparison tool shows the after-tax gap.",
    },
    {
      q: "Does incorporating trigger a tax charge?",
      a: "It can. Transferring a business can crystallise Capital Gains Tax, though s.162 incorporation relief may defer the gain into the shares. Goodwill and Stamp Duty need handling too. A specialist checks whether the reliefs apply to you.",
    },
  ],
  "sole-trader": [
    {
      q: "Should I set up a limited company?",
      a: "Sometimes, but it is a calculation, not a default. A company can be efficient if you retain profit, but adds accounts, a Companies House filing and payroll, and the 2026/27 dividend rise narrows the gap. The comparison tool shows the after-tax gap.",
    },
    {
      q: "Does incorporating trigger a tax charge?",
      a: "It can. Transferring a business can crystallise Capital Gains Tax, though s.162 incorporation relief may defer the gain into the shares. Goodwill and Stamp Duty need handling too. A specialist checks whether the reliefs apply to you.",
    },
  ],
  "vat-mtd": [
    {
      q: "When do I have to register for VAT?",
      a: "When your taxable turnover passes £90,000 in any rolling 12 months, or you expect to pass it in the next 30 days. You can also register voluntarily to reclaim input VAT.",
    },
    {
      q: "Is the Flat Rate Scheme worth it?",
      a: "Often not for service businesses. If your goods cost under 2% of turnover or under £1,000 a year you are a limited-cost trader on a 16.5% flat rate, which usually wins nothing. The VAT scheme tool checks it for your numbers.",
    },
  ],
  payroll: [
    {
      q: "What does it really cost to employ someone?",
      a: "More than the salary. Add employer NIC at 15% above £5,000, the 3% minimum auto-enrolment pension on qualifying earnings above £6,240, payroll running costs and on-costs. The cost-of-hire tool builds the full loaded figure.",
    },
    {
      q: "Can I claim the Employment Allowance?",
      a: "Only if you have at least one genuine non-director employee. A single-director company with no other staff cannot claim the £10,500 allowance.",
    },
  ],
  rnd: [
    {
      q: "Can my company claim R&D tax relief?",
      a: "Possibly, for accounting periods from 1 April 2024 under the merged scheme (a 20% expenditure credit), or the more generous ERIS route if you are R&D-intensive (qualifying R&D at least 30% of total spend). The estimator gives a directional figure; a specialist scopes a real claim.",
    },
    {
      q: "What counts as qualifying R&D spend?",
      a: "Staff, consumables, software and 65% of subcontractor cost on genuine advances in science or technology. The PAYE cap, grants and connected parties all affect the number, so we review the detail.",
    },
  ],
  "exit-cgt": [
    {
      q: "How much CGT will I pay when I sell my business?",
      a: "Business Asset Disposal Relief gives a reduced rate up to a £1m lifetime limit: 14% for disposals to 5 April 2026, then 18% from 6 April 2026. Gains above the limit are taxed at 24%. Completing each side of that date can change the bill.",
    },
    {
      q: "Is an asset sale or a share sale better?",
      a: "They tax very differently. A share sale is one CGT layer with BADR potentially available; an asset sale taxes gains inside the company, then again on extraction. Buyers usually prefer assets, sellers usually prefer shares. Model both before you agree.",
    },
  ],
  compliance: [
    {
      q: "When are my tax returns and payments due?",
      a: "A company files its CT600 and pays 9 months and 1 day after the period end. Self Assessment is 31 January online, with payments on account on 31 January and 31 July. We can map your deadlines so nothing is missed.",
    },
    {
      q: "Do I need to worry about Making Tax Digital?",
      a: "MTD for Income Tax starts on 6 April 2026 for landlords and sole traders with qualifying income over £50,000 (over £30,000 from April 2027). It means digital records and quarterly updates. We can get you set up.",
    },
  ],
};

/** Returns topic-specific Q&As if available, otherwise the 3 generic ones. */
export function faqForTopic(topic: string | null): Faq[] {
  return (topic && BY_TOPIC[topic as TopicKey]) || GENERIC;
}
