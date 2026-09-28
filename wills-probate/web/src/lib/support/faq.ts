/**
 * FAQ set for Probate Compass (wills-probate) SpecialistWidget.
 *
 * GENERIC (shown when no topic) + BY_TOPIC. PLACEHOLDER copy — Phase 2
 * rewrites each answer with real, HP-traced probate/IHT figures once the
 * house positions are set and the calculator fleet exists.
 *
 * UK English. No em-dashes. Storage prefix: wpc (FROZEN).
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
    a: "Yes. The initial conversation to understand the estate and point you in the right direction is free, with no obligation.",
  },
  {
    q: "What should I have ready?",
    a: "Roughly: whether there is a will, an approximate value of the estate, and whether you are the named executor or next of kin. If you are not sure, we will guide you.",
  },
];

/** Topic-specific Q&As (PLACEHOLDER — Phase 2 replaces with HP-traced answers). */
export const BY_TOPIC: Partial<Record<TopicKey, Faq[]>> = {
  "probate-cost": [
    {
      q: "How much does probate cost?",
      a: "It depends on the size and complexity of the estate, and whether you do it yourself or use a solicitor. This is placeholder guidance; use the free calculator for an estimate based on the estate's own figures.",
    },
    {
      q: "Are there fixed probate fees?",
      a: "There is a court application fee, and separate professional fees if you use a solicitor or specialist. Placeholder answer, full detail is coming in Phase 2.",
    },
  ],

  "do-i-need-probate": [
    {
      q: "Does every estate need probate?",
      a: "No. Small estates, or assets held entirely in joint names, can sometimes be dealt with without a formal grant. Placeholder answer, use the free checker for a first read on your situation.",
    },
  ],

  "inheritance-tax": [
    {
      q: "Will inheritance tax be due on this estate?",
      a: "Most estates fall under the nil-rate band and residence nil-rate band and pay no inheritance tax. Placeholder answer, use the free threshold calculator for an estimate.",
    },
  ],

  "probate-timeline": [
    {
      q: "How long does probate take?",
      a: "Simple estates can take a few months; complex ones can take a year or more. Placeholder answer, use the free timeline estimator for a rough guide.",
    },
  ],

  "pensions-iht-2027": [
    {
      q: "How do the 2027 pension changes affect inheritance tax?",
      a: "From 6 April 2027, most unused defined contribution pension funds will form part of the estate for inheritance tax purposes. Placeholder answer, full detail is coming in Phase 2.",
    },
  ],

  "diy-vs-solicitor": [
    {
      q: "Should I do probate myself or use a solicitor?",
      a: "It depends on the estate's complexity and how comfortable you are handling the paperwork. Placeholder answer, use the free comparison tool for a first read.",
    },
  ],
};

/** Returns topic-specific Q&As, or GENERIC when none are defined. */
export function faqForTopic(topic: TopicKey | null | undefined): Faq[] {
  if (!topic) return GENERIC;
  return BY_TOPIC[topic] ?? GENERIC;
}
