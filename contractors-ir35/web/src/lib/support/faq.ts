/**
 * FAQ set for the Contractor Tax Accountants SpecialistWidget.
 *
 * 12 Q&As: 3 GENERIC (shown when no topic) + 9 BY_TOPIC.
 * Every answer is short, HP-traced with 2026/27 tax-year tags, and points
 * to the relevant calculator where one exists. No em-dashes. No DJH.
 * No chartered/qualified/MLR-supervised claim. The firm is faceless.
 *
 * HP references:
 *   §1  = outside vs inside IR35 take-home
 *   §2  = IR35 status test + CEST
 *   §4  = Chapter 10 off-payroll (fee-payer operates PAYE, no 5% allowance)
 *   §5  = dividend rates 2026/27
 *   §6  = NIC rates / Employment Allowance
 *   §7  = corporation tax + marginal relief
 *   §8  = salary fork (LEL vs PA, EA eligibility)
 *   §12 = umbrella deductions + JSL reform
 *   §14 = section 455 charge
 *   §17 = hedge statements (no universal optimal salary, CEST not binding)
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

/** Generic Q&As shown when no topic is known. */
export const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually sooner. Leave your email and a one-line question and a contractor tax specialist will come back to you personally.",
  },
  {
    q: "Is the first conversation free?",
    a: "Yes. The first call to understand your situation and point you in the right direction is free, with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: your day rate, whether you are currently inside or outside IR35, whether you use an umbrella or a limited company, and your approximate annual billable days. If you are not sure, we will guide you.",
  },
];

/** Topic-specific Q&As (HP-traced). */
export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  ir35: [
    {
      q: "How much better off am I outside IR35?",
      a: "On the same day rate, the gap is typically a few thousand pounds a year, and it widens as rates rise. The outside figure comes from paying yourself a salary and dividends from a limited company (taxed at 10.75% in the basic band from 6 April 2026, HP §5), rather than a straight PAYE salary via an umbrella. The like-for-like calculator shows your exact gap at your rate.",
    },
    {
      q: "What decides my IR35 status?",
      a: "The case-law whole-picture test, not the contract. The three main indicators are control (how, when and where you work), personal service and substitution (can a genuine substitute step in), and mutuality of obligation (is there an obligation to offer and accept work). Working practices outweigh contract wording every time (Ready Mixed Concrete 1968, Atholl House 2022, PGMOL 2023, HP §2).",
    },
    {
      q: "Is a CEST outside result a guarantee?",
      a: "No. HMRC stands behind an accurate CEST result and will not challenge a position derived from a complete and accurate tool run, but CEST does not bind an employment tribunal or court. Its treatment of mutuality of obligation has also been narrower than the case law in some decisions. Use it as a first screen and audit document, not as the final word (HP §2, §17.A).",
    },
  ],
  structure: [
    {
      q: "Umbrella or limited company: which is better?",
      a: "A limited company usually keeps more of the day rate, because salary and dividends are taxed more efficiently than PAYE. But it carries running costs (accountant, filings), admin time and the obligation to assess IR35 for each engagement. An umbrella is simpler and often more economic for genuinely inside-IR35 work. The mix of engagements drives the answer (HP §17.C).",
    },
    {
      q: "What changed for umbrellas in April 2026?",
      a: "The joint and several liability (JSL) rules took effect under the Finance Act 2026. Where an umbrella fails to account for PAYE and NIC, the liability can transfer to the agency or (as a last resort) the end client. Use a compliant FCSA or APSCo member umbrella. If an umbrella is offering above-market take-home by avoiding employer NIC, that is a disguised remuneration risk (HP §12).",
    },
  ],
  "pay-planning": [
    {
      q: "What is the most tax-efficient salary for 2026/27?",
      a: "There is no single universal answer. For a single-director company that cannot claim the Employment Allowance (EA), the choice is typically the lower earnings limit of GBP6,396 (state pension accrual only, no NIC) or the primary threshold of GBP12,570 (no employee NIC, state pension entitlement, but employer NIC of 15% above GBP5,000 applies). If your company can claim EA, a higher salary may be more efficient. Model both before deciding (HP §8, §17).",
    },
    {
      q: "How are my dividends taxed in 2026/27?",
      a: "From 6 April 2026, dividend tax rates are 10.75% (basic rate band), 35.75% (higher rate band) and 39.35% (additional rate band), under Finance Act 2026 section 4. The first GBP500 of dividends above the personal allowance is tax-free (the dividend allowance). Dividends sit on top of salary when working out which band applies (HP §5).",
    },
  ],
  "company-tax": [
    {
      q: "How much corporation tax will my company pay?",
      a: "For the financial year starting 1 April 2025: 19% on profits up to GBP50,000 (small profits rate), 25% on profits above GBP250,000 (full rate), and marginal relief between GBP50,000 and GBP250,000 (roughly 26.5% on the marginal pound). Both thresholds are divided by the number of associated companies. The Finance Act 2026 left these rates unchanged (HP §7).",
    },
    {
      q: "What is a section 455 charge?",
      a: "An overdrawn director's loan account that is still outstanding nine months and one day after the company's accounting year end triggers a section 455 charge. The rate is 35.75% on loans made from 6 April 2026. The charge is repayable once you clear the loan, but the relief is deferred by at least nine months. A loan over GBP10,000 is also a benefit in kind (HP §14).",
    },
  ],
  "basics-expenses": [
    {
      q: "What expenses can I claim as a contractor?",
      a: "Costs that are wholly and exclusively for business: professional indemnity insurance, relevant subscriptions and memberships, equipment and software (capital allowances or annual investment allowance), mileage between workplaces at 55p per mile for the first 10,000 business miles from 6 April 2026, and accountancy fees. Travel from home to a regular workplace is commuting and is not allowable. The 24-month temporary workplace rule governs site-based contractors.",
    },
  ],
};

/** Returns topic-specific Q&As, or GENERIC when none are defined. */
export function faqForTopic(topic: TopicKey | null | undefined): Faq[] {
  if (!topic) return GENERIC;
  return BY_TOPIC[topic] ?? GENERIC;
}
