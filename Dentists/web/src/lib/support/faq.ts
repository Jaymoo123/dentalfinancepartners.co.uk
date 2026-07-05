/**
 * FAQ set for the Dental Finance Partners SpecialistWidget.
 *
 * 11 Q&As: 3 GENERIC (shown when no topic) + 8 BY_TOPIC.
 * Every answer is short, accurate, HP-traced with tax-year tags, and points
 * to the matching calculator. No em-dashes. No Reflex/DJH mention.
 * No chartered/qualified claim. The firm is not a named qualified expert.
 *
 * HP references:
 *   §1 = associate self-employment status
 *   §1.B = DFT year
 *   §2.C = NHS Pension incorporation trap
 *   §3 = NHS contracts / UDA reconciliation
 *   §3.A = UDA under-delivery
 *   §4 = CGT / BADR
 *   §4.A = s.28 disposal timing + earn-outs
 *   §5 = extraction / CT / dividend / s.455
 *   §5.A = s.455 date band
 *   §6 = VAT
 *   §7 = buying / fixtures
 *   §8 = NIC / mileage
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

/** Generic Q&As shown when no topic is known. */
export const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually sooner. Leave your email and a one-line question and a specialist dental accountant will come back to you personally.",
  },
  {
    q: "Is the first conversation free?",
    a: "Yes. The first call to understand your situation and point you in the right direction is free, with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: whether you are an associate, a principal or a locum, whether your income is NHS, private or mixed, and your approximate annual profit or fees. If you are not sure, we will guide you.",
  },
];

/** Topic-specific Q&As (HP-traced). */
export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  associate: [
    {
      q: "Am I self-employed as a dental associate?",
      a: "Usually yes, but it turns on the substance of the arrangement, not the contract label. The BDA model agreement supports self-employed status and is good evidence, but HMRC weighs control, personal service, financial risk and integration. A rostered, practice-supplied, no-autonomy arrangement carries real status risk.",
    },
    {
      q: "What can I claim as an associate?",
      a: "Costs wholly and exclusively for your work: indemnity, your GDC retention fee (but not restoration fees), List 3 subscriptions, relevant CPD, loupes and instruments via capital allowances, and mileage between practices at 55p a mile for the first 10,000 business miles from 6 April 2026. Home to your first practice is commuting and is not allowable.",
    },
    {
      q: "Do I still pay Class 2 National Insurance?",
      a: "No. Class 2 liability was removed from 6 April 2024. If your profits are above the small profits threshold you are treated as having paid and keep your state pension entitlement. You pay Class 4 at 6% between £12,570 and £50,270, then 2% above.",
    },
  ],
  principal: [
    {
      q: "Should I incorporate my practice?",
      a: "Sometimes, but it is a calculation, not a default. At typical dental profits the pure tax saving is small, and the 2026/27 dividend rise (10.75% and 35.75%) narrows it further. The bigger factor is usually the NHS Pension. Model both before deciding.",
    },
    {
      q: "Does a limited company cost me NHS pension?",
      a: "For an incorporated associate or an officer-route principal, dividends are not pensionable, so you accrue only on the salary you draw. Over a 10 to 15 year run to retirement that lost accrual can outweigh the headline tax saving. An incorporated contract-holding provider can pension drawn income up to the net pensionable earnings ceiling, but not retained profit.",
    },
    {
      q: "What happens if I overdraw my director's loan account?",
      a: "A dental company is a close company, so an overdrawn loan still outstanding nine months and one day after the year end triggers a section 455 charge at 33.75% on 2025/26 loans and 35.75% on loans made from 6 April 2026. It is repayable once you clear the loan, but the relief is deferred. A loan over £10,000 is also a benefit in kind.",
    },
  ],
  buying: [
    {
      q: "How is a dental practice valued?",
      a: "Mainly as normalised EBITDA times a market multiple, with goodwill usually 60 to 80% of the price. Multiples are ranges, not a single number, and depend on the NHS or private mix, region and buyer demand. Treat any figure as indicative until a specialist reviews the accounts.",
    },
    {
      q: "What should I check before buying a practice?",
      a: "The NHS contract and whether it novates on an asset sale (some commissioners cut the value 5 to 10% at that point), the CQC registration history, the lease or freehold, the goodwill and fixtures split, and a section 198 fixtures election so you do not lose the capital allowances. A specialist runs the financial due diligence with you.",
    },
  ],
  selling: [
    {
      q: "How much tax will I pay when I sell my practice?",
      a: "Business Asset Disposal Relief gives a reduced Capital Gains Tax rate on qualifying gains up to a £1m lifetime limit: 14% for disposals to 5 April 2026, then 18% from 6 April 2026. Gains above the limit are taxed at 24%. Completing each side of that date can change the bill, so the timing matters.",
    },
    {
      q: "Can I fix the 14% rate if I sell around April 2026?",
      a: "An unconditional exchange of contracts on or before 5 April 2026 fixes the 14% rate even if completion follows later. A contract conditional on something like NHS contract novation does not, because the disposal date is when the condition is met. This is a live planning lever, so take advice on the wording.",
    },
  ],
  nhs: [
    {
      q: "Is there a standard UDA value?",
      a: "No. There is no national UDA value. Each contract's per-UDA value was set at a 2006 baseline and uplifted since, so it varies widely, often £25 to £35 in England. Patient charges go towards the contract value, not on top of it. Use your own contract's value, and our UDA calculator shows where it sits against the regional benchmark.",
    },
    {
      q: "What happens if I under-deliver my UDAs?",
      a: "Deliver 96% to 100% of your target and the shortfall of up to 4% carries forward into next year, it is not clawed back as cash. Deliver below 96% and the commissioner recovers the overpayment for the activity you did not deliver. Track your UDAs against target monthly so there are no year-end surprises.",
    },
    {
      q: "Can I pension my dividends as an incorporated dentist?",
      a: "Generally no. For an incorporated associate, only your PAYE salary is pensionable and dividends are not, which is the incorporation pension trap. A contract-holding provider can pension drawn income up to the net pensionable earnings ceiling, but not retained profit. Always weigh the tax saving against the pension you would lose.",
    },
  ],
  // compliance and uda-calc: no BY_TOPIC block; faqForTopic returns GENERIC.
};

/** Returns topic-specific Q&As, or GENERIC when none are defined. */
export function faqForTopic(topic: TopicKey | null | undefined): Faq[] {
  if (!topic) return GENERIC;
  return BY_TOPIC[topic] ?? GENERIC;
}
