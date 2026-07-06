/**
 * FAQ set for Trade Tax Specialists (construction-cis) SpecialistWidget.
 *
 * 12 Q&As: 3 GENERIC (shown when no topic) + 9 BY_TOPIC.
 * Every answer is short, HP-traced with tax-year tags, and points to the
 * matching calculator. No em-dashes. No "DJH". No chartered/qualified claim.
 * The firm is a faceless brand (HP §12.A).
 *
 * HP references (house_positions.md):
 *   §1  = CIS deduction rates + labour-only base
 *   §2  = GPS three tests + corrected turnover table
 *   §3  = GPS April 2026 regime (Finance Act 2026)
 *   §9  = Refund entry service; sole-trader SA route; limited-company EPS route
 *   §11a = Rates 2026/27 (PA, Class 4, employee Class 1, dividends)
 *   §12.A = Faceless brand: no credential claim
 *   §12.B = Refund framed as entry service, no guaranteed amount
 *   §13  = Market averages caveat "for content, not guaranteed"
 *
 * UK English. No em-dashes. Storage prefix: bfp (FROZEN).
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

/** Generic Q&As shown when no topic is known (reply time / free call / what to have ready). */
export const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually sooner. Leave your email and a one-line question and a specialist will come back to you personally.",
  },
  {
    q: "Is the first call free?",
    a: "Yes. The initial conversation to understand your situation and point you in the right direction is free, with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: whether you are a sole trader or limited company, whether you are registered, unregistered or on gross payment status, and your approximate annual CIS turnover. If you are not sure, we will guide you.",
  },
];

/** Topic-specific Q&As (HP-traced). */
export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  "cis-refund": [
    {
      q: "Am I owed a CIS refund?",
      a: "Most registered subcontractors are, because CIS is deducted at 20 per cent on the labour element before you claim expenses and your personal allowance. Once those are applied your effective rate is usually lower, so the advance becomes an overpayment. The refund is claimed through Self Assessment after year-end. It is an entry service, not a rebate factory: the exact amount depends on your figures.",
    },
    {
      q: "How do I claim a CIS refund?",
      a: "Sole traders claim via a Self Assessment tax return after the tax year ends (5 April). HMRC credits the CIS withheld against your income tax and Class 4 NIC bill, and refunds any overpayment. Limited companies can reclaim CIS deductions in-year by offsetting them against PAYE and NIC on the Employer Payment Summary, rather than waiting for a year-end return.",
    },
    {
      q: "How much is the average CIS refund?",
      a: "A typical refund for a registered sole trader is in the range of £2,000 to £3,000 per year. This is for general information only and is not guaranteed: your refund depends on your gross payments, materials, allowable expenses and personal allowance. Use the estimator for a figure based on your own numbers.",
    },
  ],

  "cis-deductions": [
    {
      q: "How much CIS is deducted from my pay?",
      a: "The rate depends on your registration status. Gross payment status: 0 per cent (no deduction). Registered subcontractor: 20 per cent. Unregistered or unverified: 30 per cent. The deduction applies to the labour element only. Materials you pass on to the client are excluded from the deduction base (HP §1).",
    },
    {
      q: "Is CIS deducted on materials?",
      a: "No. The CIS deduction is on the labour element only. If your invoice is £1,000 with £600 labour and £400 materials, the contractor deducts 20 per cent on the £600 labour (£120), not on the full £1,000. Your materials costs are deducted from gross income when calculating your taxable profit in Self Assessment.",
    },
  ],

  "gross-payment-status": [
    {
      q: "How do I qualify for gross payment status?",
      a: "You must pass three tests. Business test: you carry out construction operations. Compliance test: satisfactory tax record (no late returns or unpaid amounts). Turnover test: net CIS turnover in the past 12 months excluding VAT and materials. Thresholds: sole trader £30,000; partnership or limited company £30,000 per partner or director, OR £100,000 for the whole business (pass either route); closely controlled company £30,000 per controller.",
    },
    {
      q: "What changed for GPS in April 2026?",
      a: "Finance Act 2026 (Royal Assent 18 March 2026, in force 6 April 2026) tightened the GPS regime. The reapplication ban after loss of status rose from 1 year to 5 years. HMRC now applies a 'knew or should have known' standard: failure to carry out due diligence on your own supply chain is itself grounds for revocation. Subcontractors and companies must re-verify, run Companies House checks and confirm bank-name matches on their own supply chain.",
    },
    {
      q: "How much is GPS worth?",
      a: "GPS means the 20 per cent deduction is no longer withheld at source, so you keep the full payment throughout the year. On a CIS turnover of £500,000 the cash-flow benefit is roughly £100,000 per year that stays in your business rather than sitting with HMRC until your refund is processed.",
    },
  ],

  "limited-company": [
    {
      q: "Am I better off as a CIS sole trader or on PAYE?",
      a: "Self-employment usually leaves more on the same gross because you pay Class 4 NIC (6 per cent to £50,270, then 2 per cent) rather than employee Class 1 (8 per cent to £50,270, then 2 per cent), and you can deduct allowable business expenses. The trade-off is you carry the CIS deduction timing rather than getting a regular payslip, and you have no holiday pay, sick pay or employer pension contributions. Rates are for 2026/27.",
    },
    {
      q: "Can my limited company reclaim CIS in-year?",
      a: "Yes. A CIS-registered limited company can offset CIS deductions against its PAYE and NIC liability each month using the Employer Payment Summary. If deductions exceed the monthly liability, HMRC carries the credit forward. At year-end, any remaining excess is claimed as a Corporation Tax refund or credit.",
    },
  ],

  // self-assessment and vat-reverse-charge: no BY_TOPIC block; faqForTopic returns GENERIC.
};

/** Returns topic-specific Q&As, or GENERIC when none are defined. */
export function faqForTopic(topic: TopicKey | null | undefined): Faq[] {
  if (!topic) return GENERIC;
  return BY_TOPIC[topic] ?? GENERIC;
}
