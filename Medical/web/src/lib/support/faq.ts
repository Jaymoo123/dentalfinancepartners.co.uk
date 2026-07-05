/**
 * FAQ set for the Medical Accountants UK SpecialistWidget.
 *
 * 11 Q&As: 3 GENERIC (shown when no topic) + 8 BY_TOPIC across 4 topic blocks.
 * gp-practice has no BY_TOPIC block; faqForTopic returns GENERIC.
 *
 * Every answer is short, accurate (no personal calculations), HP-traced with
 * tax-year tags, points to the matching calculator, and ends the deep cases at
 * "ask a specialist for your practice's numbers". No em-dashes. No Reflex/DJH
 * mention. No chartered/qualified/MLR claim.
 *
 * NHS pension / annual allowance / incorporation and the salaried-vs-partner-vs-locum
 * distinction are front and centre (highest-intent, highest-value questions).
 *
 * HP references:
 *   section 1   = GP/consultant/locum self-employment and tax status
 *   section 1.A = IR35 off-payroll rules
 *   section 2.A = McCloud remedy
 *   section 2.B = Annual allowance and taper
 *   section 2.C = NHS pension incorporation trap
 *   section 2.D = Scheme Pays
 *   section 4   = NHS goodwill (cannot be sold)
 *   section 5   = incorporation, CT, dividends, s.455
 *   section 8   = Class 4 NIC, mileage, student loan
 *   section 9   = MTD for ITSA
 */
import type { TopicKey } from "@/lib/intent/taxonomy";

export type Faq = { q: string; a: string };

/** Generic Q&As shown when no topic is known. */
export const GENERIC: Faq[] = [
  {
    q: "How quickly will a specialist reply?",
    a: "Within one working day, and usually sooner. Leave your email and a one-line question and a specialist medical accountant will come back to you personally.",
  },
  {
    q: "Is the first conversation free?",
    a: "Yes. The first call to understand your situation and point you in the right direction is free, with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: whether you are a GP partner, a salaried GP, a consultant or a locum, whether your income is NHS, private or mixed, and your approximate annual profit or pensionable pay. If you are not sure, we will guide you.",
  },
];

/** Topic-specific Q&As (HP-traced). */
export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  "nhs-pension": [
    {
      q: "How does the NHS pension annual allowance work?",
      a: "Your pension savings can grow by up to £60,000 a year (2025/26) before an income tax charge applies. For the NHS scheme the measure is the growth in your benefits, the pension input amount, not the contributions you paid. The taper reduces the £60,000 where your threshold income is over £200,000 and your adjusted income is over £260,000, down to a £10,000 floor. Our annual allowance calculator estimates your position.",
    },
    {
      q: "What is Scheme Pays and when can I use it?",
      a: "Scheme Pays lets the NHS scheme settle your annual allowance charge for a permanent reduction in your pension. Mandatory Scheme Pays is available where the charge is over £2,000 and your NHS scheme growth alone exceeds £60,000. The election deadline is 31 July in the tax year after the charge, so a 2025/26 charge must be elected by 31 July 2027. Before choosing it, check whether carry-forward from the previous three years removes the charge entirely.",
    },
    {
      q: "Does incorporating my private work cost me NHS pension?",
      a: "Yes, on the incorporated portion. A limited company cannot hold a GMS or PMS contract and company dividends are not NHS pensionable, so private income taken as dividends builds no NHS benefits. For a consultant, only the NHS employment is pensionable, never the private work. Over years to retirement that lost accrual can outweigh the headline tax saving, so we model both sides before you decide.",
    },
  ],
  "incorporation-private": [
    {
      q: "Should I incorporate my private practice?",
      a: "Sometimes, but it is a calculation, not a default, and it applies to private work only. At typical private-income levels the pure tax saving is modest, and the 2026/27 dividend rise to 10.75% and 35.75% narrows it further. The bigger factor is usually the NHS Pension you give up on dividends. Model both before deciding.",
    },
    {
      q: "What happens if I overdraw my director's loan account?",
      a: "A medical company is a close company, so an overdrawn director's loan still outstanding nine months and one day after the year end triggers a section 455 charge at 33.75% on loans made in 2025/26 and 35.75% on loans made from 6 April 2026. It is repaid under section 458 once you clear the loan, but the relief is deferred. A loan over £10,000 is also a benefit in kind.",
    },
    {
      q: "Can a limited company hold my NHS contract?",
      a: "No. A GMS or PMS contract cannot be held by a company, and NHS income is not pensionable through a company. Incorporation is only ever about your private work: insurance medicals, medico-legal, occupational health, cosmetic or self-pay clinics, and PSC locum work that is outside IR35. We keep the NHS side out of the company.",
    },
  ],
  locum: [
    {
      q: "Do I still pay Class 2 National Insurance as a locum?",
      a: "No. Class 2 stopped being a required payment from 6 April 2024. If your profits are above the small profits threshold you are treated as having paid and keep your state pension entitlement. You pay Class 4 at 6% between £12,570 and £50,270, then 2% above. Our take-home calculator shows the full deduction.",
    },
    {
      q: "Does IR35 decide my status, or do I?",
      a: "It depends on the hirer. For an NHS Trust or other public body, the Trust or the fee-payer in the chain decides your status and operates PAYE on inside-IR35 work. For a medium or large private hospital, the hirer decides and issues a Status Determination Statement. Only a small private client leaves the decision to your own company. A locum across several hirers can hold a mix of inside and outside determinations.",
    },
  ],
  "gp-tax": [
    {
      q: "Am I taxed differently as a salaried GP, a partner or a locum?",
      a: "Yes. A GP partner is self-employed and taxed on their profit share, not drawings, through the partnership return and Class 4 NIC. A salaried GP is an employee taxed under PAYE with Class 1 NIC. A locum is usually a sole trader on the self-assessment return, or occasionally through a company. Many doctors hold more than one of these at once, which changes how the bands stack.",
    },
    {
      q: "Will I need to use Making Tax Digital?",
      a: "If your gross self-employed or property income is over £50,000 you are in Making Tax Digital for Income Tax from 6 April 2026, with £30,000 from April 2027 and £20,000 from April 2028. Limited companies are out, and GP partnerships are deferred with no confirmed date. Most full-time locums and unincorporated private GPs are caught from April 2026, so it is worth getting your digital records ready now.",
    },
  ],
  // gp-practice: no BY_TOPIC block; faqForTopic returns GENERIC.
};

/** Returns topic-specific Q&As, or GENERIC when none are defined. */
export function faqForTopic(topic: TopicKey | null | undefined): Faq[] {
  if (!topic) return GENERIC;
  return BY_TOPIC[topic] ?? GENERIC;
}
